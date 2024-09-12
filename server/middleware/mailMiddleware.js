const nodemailer = require('nodemailer');

// Debug logging
console.log('Email:', process.env.EMAIL);
console.log('App Password:', process.env.EMAIL_APP_PASSWORD ? '[REDACTED]' : 'Not set');

if (!process.env.EMAIL || !process.env.EMAIL_APP_PASSWORD) {
  console.error('Email credentials are not properly set in environment variables.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use 'gmail' service instead of manual configuration
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD
  },
  debug: true, 
  logger: true 
});

const sendEmail = async (to, subject, html) => {
  if (!to) {
    console.log('No email provided. Skipping email send.');
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html
  };

  try {
    console.log('Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw error;
  }
};

// Verify the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('SMTP connection error:', error);
    console.log('Error details:', JSON.stringify(error, null, 2));
  } else {
    console.log('SMTP connection is ready to take our messages');
  }
});

module.exports = { sendEmail };