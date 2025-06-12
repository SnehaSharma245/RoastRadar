import nodemailer from "nodemailer";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL, // Your email
    pass: process.env.SMTP_PASSWORD, // App password
  },
});

// Utility function for sending emails
const sendEmail = async (
  email: string,
  subject: string,
  message: string,
  attachment = null
) => {
  const mailOptions = {
    from: `"RoastRadar" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: subject,
    text: message, // Plain text version
    html: message, // HTML version
    attachments: attachment ? [attachment] : [], // Add attachment if provided
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
