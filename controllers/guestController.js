require("dotenv").config();
const { hash, compare } = require("bcrypt");
const Guest = require("../models/Guest");
const jwt = require("jsonwebtoken");
const { 
  sendEmail, 
  createWelcomeEmailTemplate, 
  createOTPEmailTemplate, 
  createVerificationSuccessTemplate 
} = require("../services/mailService");
const otpGenerator = require("otp-generator");
const JWT_SECRET = process.env.JWT_SECRET || "what is your name";

const storeGuest = async (req, res) => {
  try {
    let { full_name, password, phone_number, email, address } = req.body;
    
    // Validate email format before processing
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        status: "error",
        message: "Valid email address is required",
      });
    }

    // Check if email already exists in main guests table
    const emailExists = await Guest.emailExists(email);
    if (emailExists) {
      return res.status(409).json({
        status: "error",
        message: "An account with this email already exists",
      });
    }

    // Prepare guest data
    const guestData = {
      full_name,
      password: await hash(password, 10),
      phone_number,
      email,
      address,
      id_document: null
    };
    
    // Handle file upload
    if (req.files?.id_document) {
      const { id_document } = req.files;
      const fileName = `${Date.now()}-${id_document.name}`;
      const filePath = `uploads/guests/${fileName}`;
      await id_document.mv(filePath);
      guestData.id_document = filePath;
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    
    // Save to temporary registration table
    await Guest.saveTempRegistration(guestData, otp);

    // Send OTP email
    try {
      await sendEmail({
        to: email.trim(),
        subject: "Email Verification - Lodgix",
        html: createOTPEmailTemplate(full_name, otp),
        text: `Your OTP for email verification is: ${otp}`,
      });
    } catch (emailError) {
      console.error('OTP email failed:', emailError);
      return res.status(500).json({
        status: "error",
        message: "Failed to send verification email. Please try again.",
      });
    }

    res.json({
      status: "success",
      message: "Please check your email for verification code to complete registration.",
      data: { email, full_name },
    });
    
  } catch (error) {
    console.error('Error in storeGuest:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to initiate registration",
    });
  }
};

const verifyGuestEmail = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      status: "error",
      message: "Email and OTP are required",
    });
  }
  
  try {
    // Find temp registration
    const tempRegistration = await Guest.findTempRegistration(email, otp);
    if (!tempRegistration) {
      return res.status(401).json({
        status: "error",
        message: "Invalid or expired OTP",
      });
    }

    // Check if email already exists in main guests table (double-check)
    const emailExists = await Guest.emailExists(email);
    if (emailExists) {
      // Clean up temp registration
      await Guest.deleteTempRegistration(email);
      return res.status(409).json({
        status: "error",
        message: "An account with this email already exists",
      });
    }

    // Create the actual guest account
    const guest = Guest.fill({
      full_name: tempRegistration.full_name,
      password: tempRegistration.password, // Already hashed
      phone_number: tempRegistration.phone_number,
      email: tempRegistration.email,
      address: tempRegistration.address,
      id_document: tempRegistration.id_document,
      email_verified: true,
      otp_verified: true
    });

    await guest.insert();

    // Clean up temp registration
    await Guest.deleteTempRegistration(email);

    // Send welcome email
    try {
      await sendEmail({
        to: email.trim(),
        subject: "Welcome to Lodgix - Your Account is Ready!",
        html: createWelcomeEmailTemplate(tempRegistration.full_name),
        text: `Hello ${tempRegistration.full_name},\n\nWelcome to Lodgix! Your account has been created successfully.\n\nBest regards,\nLodgix Team`,
      });
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
      // Continue even if welcome email fails
    }

    res.json({
      status: "success",
      message: "Email verified successfully! Your account has been created.",
      data: { email: guest.email, full_name: guest.full_name }
    });
    
  } catch (error) {
    console.error('Error in verifyGuestEmail:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to verify email",
    });
  }
};

// Add a function to resend OTP
const resendOtp = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "Email is required",
    });
  }

  try {
    // Check if there's a pending registration
    const sql = "SELECT * FROM temp_registrations WHERE email = ? AND expires_at > NOW()";
    const rows = await Guest.query(sql, [email]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No pending registration found for this email",
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Update the temp registration with new OTP
    const updateSql = "UPDATE temp_registrations SET otp_code = ?, expires_at = ? WHERE email = ?";
    await Guest.query(updateSql, [otp, expiresAt, email]);

    // Send new OTP email
    await sendEmail({
      to: email.trim(),
      subject: "Email Verification - Lodgix (Resent)",
      html: createOTPEmailTemplate(rows[0].full_name, otp),
      text: `Your new OTP for email verification is: ${otp}`,
    });

    res.json({
      status: "success",
      message: "New verification code sent to your email",
    });

  } catch (error) {
    console.error('Error in resendOtp:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to resend verification code",
    });
  }
};

const getGuests = async (req, res) => {
  const guests = await Guest.fetch();
  res.json({
    status: "success",
    message: "Guests fetched successfully",
    data: guests,
  });
};

const getGuestById = async (req, res) => {
  let { id } = req.params;
  const guest = await Guest.find(id);
  if (!guest) {
    return res.status(404).json({
      status: "error",
      message: "Guest not found",
    });
  }
  res.json({
    status: "success",
    message: "Guest fetched successfully",
    data: guest,
  });
};

const updateGuest = async (req, res) => {
  let { id } = req.params;
  let { full_name, phone_number, email, address } = req.body;
  const guest = await Guest.find(id);
  if (!guest) {
    return res.status(404).json({
      status: "error",
      message: "Guest not found",
    });
  }
  guest.fill({ full_name, phone_number, email, address });

  await guest.update();

  res.json({
    status: "success",
    message: "Guest updated successfully",
    data: guest,
  });
};

const partialGuestUpdate = async (req, res) => {
  let { id } = req.params;
  const guest = await Guest.find(id);
  if (!guest) {
    return res.status(404).json({
      status: "error",
      message: "Guest not found",
    });
  }
  guest.fill(req.body);

  await guest.update();

  res.json({
    status: "success",
    message: "Guest updated successfully",
    data: guest,
  });
};

const deleteGuest = async (req, res) => {
  let { id } = req.params;
  const deleted = await Guest.delete(id);
  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: "Failed to delete guest",
    });
  }

  res.json({
    status: "success",
    message: "Guest deleted successfully",
  });
};

const guestLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email and password are required",
    });
  }
  // Check if the guest exists
  const guest = await Guest.findByEmail(email);
  if (!guest) {
    return res.status(401).json({
      status: "error",
      message: "Invalid email or password",
    });
  }
  // Check if the password is correct (support both hashed and plain text for now)
  let isValidPassword = false;
  try {
    isValidPassword = await compare(password, guest.password);
  } catch (e) {}
  if (!isValidPassword && password !== guest.password) {
    return res.status(401).json({
      status: "error",
      message: "Invalid email or password",
    });
  }
  // Generate a token with guest object
  const token = jwt.sign(
    {
      guest: {
        id: guest.guest_id,
        email: guest.email,
        role: "guest",
      },
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    status: "success",
    message: "Login successful",
    data: { token },
  });
};

module.exports = {
  storeGuest,
  verifyGuestEmail,
  resendOtp,
  getGuests,
  getGuestById,
  updateGuest,
  partialGuestUpdate,
  deleteGuest,
  guestLogin
};
