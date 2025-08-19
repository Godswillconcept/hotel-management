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
    
    console.log('Received registration data:', { full_name, email, phone_number, address });
    console.log('Files received:', req.files);
    
    // Validate required fields
    if (!full_name || !password || !phone_number || !email || !address) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required (full_name, password, phone_number, email, address)",
      });
    }

    // Validate ID document is uploaded
    if (!req.files || !req.files.id_document) {
      return res.status(400).json({
        status: "error",
        message: "ID document is required",
      });
    }

    // Validate email format
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

    // Check if there's already a pending registration for this email
    const pendingRegistrationSql = "SELECT * FROM temp_registrations WHERE email = ? AND expires_at > NOW()";
    const pendingRows = await Guest.query(pendingRegistrationSql, [email]);
    
    if (pendingRows.length > 0) {
      // Delete the old pending registration
      await Guest.deleteTempRegistration(email);
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    console.log('Generated OTP:', otp);

    // Handle file upload
    const { id_document } = req.files;
    const fileName = `${Date.now()}-${id_document.name}`;
    const filePath = `uploads/guests/${fileName}`;
    
    // Create directory if it doesn't exist
    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.dirname(filePath);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    try {
      await id_document.mv(filePath);
      console.log('File uploaded successfully to:', filePath);
    } catch (fileError) {
      console.error('File upload error:', fileError);
      return res.status(500).json({
        status: "error",
        message: "Failed to upload ID document",
      });
    }

    // Prepare guest data for temp storage
    const guestData = {
      full_name: full_name.trim(),
      password: hashedPassword,
      phone_number: phone_number.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim(),
      id_document: fileName // Store just the filename, not the full path
    };

    // Save to temporary registration table
    console.log('Saving to temp_registrations...');
    await Guest.saveTempRegistration(guestData, otp);
    console.log('Successfully saved to temp_registrations');

    // Send OTP email
    try {
      console.log('Sending OTP email to:', email);
      await sendEmail({
        to: email.trim(),
        subject: "Email Verification - Lodgix",
        html: createOTPEmailTemplate(full_name, otp),
        text: `Your OTP for email verification is: ${otp}`,
      });
      console.log('OTP email sent successfully');
    } catch (emailError) {
      console.error('OTP email failed:', emailError);
      // Clean up temp registration and uploaded file if email fails
      await Guest.deleteTempRegistration(email);
      
      // Delete uploaded file
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (deleteError) {
        console.error('Error deleting file:', deleteError);
      }
      
      return res.status(500).json({
        status: "error",
        message: "Failed to send verification email. Please try again.",
      });
    }

    res.json({
      status: "success",
      message: "Registration initiated. Please check your email for verification code.",
      data: { 
        email: email.trim(), 
        full_name: full_name.trim() 
      },
    });
    
  } catch (error) {
    console.error('Error in storeGuest:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to initiate registration: " + error.message,
    });
  }
};

const verifyGuestEmail = async (req, res) => {
  const { email, otp } = req.body;
  
  console.log('Verifying OTP:', { email, otp });
  
  if (!email || !otp) {
    return res.status(400).json({
      status: "error",
      message: "Email and OTP are required",
    });
  }
  
  try {
    // Find temp registration
    const tempRegistration = await Guest.findTempRegistration(email.trim().toLowerCase(), otp);
    console.log('Found temp registration:', tempRegistration ? 'Yes' : 'No');
    
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
    console.log('Creating guest account...');
    const guest = Guest.fill({
      full_name: tempRegistration.full_name,
      password: tempRegistration.password, // Already hashed
      phone_number: tempRegistration.phone_number,
      email: tempRegistration.email,
      address: tempRegistration.address,
      id_document: tempRegistration.id_document, // This should now have a value
      email_verified: true,
      otp_verified: true
    });

    await guest.insert();
    console.log('Guest account created successfully');

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
      data: { 
        email: guest.email, 
        full_name: guest.full_name,
        guest_id: guest.id 
      }
    });
    
  } catch (error) {
    console.error('Error in verifyGuestEmail:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to verify email: " + error.message,
    });
  }
};

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
    const rows = await Guest.query(sql, [email.trim().toLowerCase()]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No pending registration found for this email",
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Update the temp registration with new OTP
    const updateSql = "UPDATE temp_registrations SET otp_code = ?, expires_at = ? WHERE email = ?";
    await Guest.query(updateSql, [otp, expiresAt, email.trim().toLowerCase()]);

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
  
  console.log('Guest login attempt:', { email });
  
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email and password are required",
    });
  }
  
  try {
    // Check if the guest exists
    const guest = await Guest.findByEmail(email.trim().toLowerCase());
    if (!guest) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    console.log('Guest found:', guest.email);

    // Check if the password is correct (support both hashed and plain text for now)
    let isValidPassword = false;
    try {
      isValidPassword = await compare(password, guest.password);
    } catch (e) {
      console.log('Password comparison error:', e);
    }
    
    if (!isValidPassword && password !== guest.password) {
      console.log('Invalid password for guest:', email);
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    console.log('Password valid, generating token...');

    // Generate a token with guest object
    const token = jwt.sign(
      {
        guest: {
          id: guest.id, // Use the correct field name (should be 'id' not 'guest_id')
          email: guest.email,
          role: "guest",
        },
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log('Token generated successfully');

    // Return guest data along with token
    res.json({
      status: "success",
      message: "Login successful",
      data: { 
        token,
        guest: {
          id: guest.id,
          email: guest.email,
          full_name: guest.full_name,
          phone_number: guest.phone_number,
          address: guest.address,
          created_at: guest.created_at,
          email_verified: guest.email_verified,
          otp_verified: guest.otp_verified
        }
      },
    });
  } catch (error) {
    console.error('Error in guestLogin:', error);
    res.status(500).json({
      status: "error",
      message: "Login failed: " + error.message,
    });
  }
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
