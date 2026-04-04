const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS  // Use Gmail App Password
  }
});

const sendAdminNotification = async ({ subject, html, text }) => {
  try {
    await transporter.sendMail({
      from: `"LBS School System" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject,
      html,
      text
    });
    console.log('📧 Admin notification sent');
  } catch (err) {
    console.error('Email error:', err);
  }
};

module.exports = { transporter, sendAdminNotification };
