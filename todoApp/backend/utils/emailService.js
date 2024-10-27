```javascript
const nodemailer = require('nodemailer');
const { User } = require('../models'); // Assume there is a User model that interfaces with the 'users' table

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password',
  },
});

const sendRegistrationEmail = async (email, token) => {
  const mailOptions = {
    from: '"Todo App" <no-reply@todoapp.com>',
    to: email,
    subject: 'Confirm Your Registration',
    text: `Please confirm your registration by clicking the following link: http://localhost:3000/confirm/${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to send email', error };
  }
};

module.exports = { sendRegistrationEmail };
```