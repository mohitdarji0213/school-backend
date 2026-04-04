const router = require('express').Router();
const { sendAdminNotification } = require('../config/mailer');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    await sendAdminNotification({
      subject: `📩 New Contact Message - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #1a5276; border-radius: 10px;">
          <div style="background: #1a5276; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2>🏫 LBS School - Contact Message</h2>
          </div>
          <div style="padding: 20px; background: #f8f9fa;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr/>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-left: 4px solid #1a5276;">${message}</p>
          </div>
          <div style="background: #1a5276; color: white; padding: 10px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="font-size: 12px;">© Lal Bahadur Shastri School</p>
          </div>
        </div>
      `,
      text: `Contact from ${name} (${email}): ${message}`
    });
    res.json({ message: 'Message sent successfully! We will respond shortly.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
