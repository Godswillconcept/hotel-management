const nodemailer = require('nodemailer');
require('dotenv').config();

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS || 'vvkibhyxlzhjiuiu ', // Your email password or app password
    },
    // Add these options to improve deliverability
    tls: {
        rejectUnauthorized: false
    }
});

const createWelcomeEmailTemplate = (fullName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Lodgix</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #1a1a2e;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a2e; padding: 40px 20px;">
            <div style="background-color: #f5f2ed; border-radius: 15px; padding: 40px; text-align: center;">
            
                <!-- Logo Section -->
                      <table align="center" width="80" height="80"
                style="border: 3px solid #b8860b; border-radius: 50%; background-color: #f5f2ed;" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" valign="middle"
                        style="font-size: 36px; color: #b8860b; font-style: italic; font-weight: bold; height: 80px;">
                        L
                    </td>
                </tr>
            </table>

                <!-- Welcome Message -->
                <div style="margin: 40px 0;">
                    <h2 style="color: #333; font-size: 28px; margin-bottom: 20px; font-weight: 400;">Welcome to Lodgix!</h2>
                    <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Hello <strong>${fullName}</strong>,
                    </p>
                    <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Thank you for registering with Lodgix. Your account has been created successfully and you're now part of our exclusive hospitality experience.
                    </p>
                    <p style="color: #555; font-size: 16px; line-height: 1.6;">
                        We look forward to providing you with exceptional service and memorable stays.
                    </p>
                </div>

                <!-- Best Regards -->
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="color: #777; font-size: 14px; margin: 0;">
                        Best regards,<br>
                        <strong style="color: #b8860b;">The Lodgix Team</strong>
                    </p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 20px;">
                <p style="color: #888; font-size: 12px; margin: 5px 0;">
                    <a href="#" style="color: #b8860b; text-decoration: none;">Privacy</a> | 
                    <a href="#" style="color: #b8860b; text-decoration: none;">Terms</a> | 
                    <a href="#" style="color: #b8860b; text-decoration: none;">Help</a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const createOTPEmailTemplate = (fullName, otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification - Lodgix</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #1a1a2e;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a2e; padding: 40px 20px;">
            <div style="background-color: #f5f2ed; border-radius: 15px; padding: 40px; text-align: center;">
                <!-- Security Warning -->
                <div style="background: linear-gradient(135deg, #8b2635, #a0334a); color: white; padding: 20px; border-radius: 10px; margin-bottom: 30px; text-align: left;">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        
                        <h3 style="margin: 0; font-size: 18px; font-weight: bold;">Don't delete or share this email with anyone!</h3>
                    </div>

                    <p style="margin: 5px 0; font-size: 14px; line-height: 1.4;">
                        If the email is shared, your account could be compromised.
                    </p>
                </div>

                <!-- Logo Section -->
                      <table align="center" width="80" height="80"
                style="border: 3px solid #b8860b; border-radius: 50%; background-color: #f5f2ed;" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" valign="middle"
                        style="font-size: 36px; color: #b8860b; font-style: italic; font-weight: bold; height: 80px;">
                        L
                    </td>
                </tr>
            </table>


                <!-- OTP Content -->
                <div style="margin: 40px 0;">
                    <h2 style="color: #333; font-size: 28px; margin-bottom: 20px; font-weight: 400;">Verify Your Email</h2>
                    <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Hello <strong>${fullName}</strong>,
                    </p>
                    <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                        Input this one-time verification code in your Lodgix account to complete your email verification.
                    </p>
                    
                    <div style="margin: 30px 0;">
                        <p style="color: #333; font-size: 18px; font-weight: bold; margin-bottom: 15px;">Verification code:</p>
                        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <span style="font-size: 32px; font-weight: bold; color: #ff6b9d; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</span>
                        </div>
                        <p style="color: #777; font-size: 14px; margin-top: 15px;">
                            This code expires in 15 minutes for security reasons.
                        </p>
                    </div>
                </div>

                <!-- Best Regards -->
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="color: #777; font-size: 14px; margin: 0;">
                        Best regards,<br>
                        <strong style="color: #b8860b;">The Lodgix Team</strong>
                    </p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 20px;">
                <p style="color: #888; font-size: 12px; margin: 5px 0;">
                    <a href="#" style="color: #b8860b; text-decoration: none;">Privacy</a> | 
                    <a href="#" style="color: #b8860b; text-decoration: none;">Terms</a> | 
                    <a href="#" style="color: #b8860b; text-decoration: none;">Help</a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const createVerificationSuccessTemplate = (fullName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification Successful - Lodgix</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #1a1a2e;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a2e; padding: 40px 20px;">
            <div style="background-color: #f5f2ed; border-radius: 15px; padding: 40px; text-align: center;">
             
                <!-- Logo Section -->
                      <table align="center" width="80" height="80"
                style="border: 3px solid #b8860b; border-radius: 50%; background-color: #f5f2ed;" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" valign="middle"
                        style="font-size: 36px; color: #b8860b; font-style: italic; font-weight: bold; height: 80px;">
                        L
                    </td>
                </tr>
            </table>

                <!-- Success Message -->
                <div style="margin: 40px 0;">
                    <div style="background-color: #4caf50; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                        <span style="color: white; font-size: 30px;">✓</span>
                    </div>
                    <h2 style="color: #333; font-size: 28px; margin-bottom: 20px; font-weight: 400;">Email Verified Successfully!</h2>
                    <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Hello <strong>${fullName}</strong>,
                    </p>
                    <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Your email has been successfully verified. Your Lodgix account is now fully activated and ready to use.
                    </p>
                    <p style="color: #555; font-size: 16px; line-height: 1.6;">
                        You can now enjoy all the features and book your perfect stay with us.
                    </p>
                </div>

                <!-- Best Regards -->
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="color: #777; font-size: 14px; margin: 0;">
                        Best regards,<br>
                        <strong style="color: #b8860b;">The Lodgix Team</strong>
                    </p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 20px;">
                <p style="color: #888; font-size: 12px; margin: 5px 0;">
                    <a href="#" style="color: #b8860b; text-decoration: none;">Privacy</a> | 
                    <a href="#" style="color: #b8860b; text-decoration: none;">Terms</a> | 
                    <a href="#" style="color: #b8860b; text-decoration: none;">Help</a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const sendEmail = async (mailOptions) => {
    try {
        // Validate recipient email
        if (!mailOptions.to || !mailOptions.to.trim()) {
            throw new Error('Recipient email is required');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(mailOptions.to.trim())) {
            throw new Error('Invalid email format');
        }

        const info = await transporter.sendMail({
            from: `"Lodgix" <${process.env.SMTP_USER}>`, // Better sender format
            to: mailOptions.to.trim(),
            subject: mailOptions.subject,
            text: mailOptions.text,
            html: mailOptions.html,
            // Add these headers to improve deliverability
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'Importance': 'high',
                'List-Unsubscribe': '<mailto:unsubscribe@lodgix.com>',
                'X-Mailer': 'Lodgix Hotel Management System'
            }
        });

        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendEmail,
    createWelcomeEmailTemplate,
    createOTPEmailTemplate,
    createVerificationSuccessTemplate
};

