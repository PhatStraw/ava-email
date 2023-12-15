const nodemailer = require('nodemailer');
const Conversation = require('../models/conversation.model');

const emailUtil = {
  transporter: nodemailer.createTransport({
    service: 'gmail', // INPUT_REQUIRED {Replace with your email provider}
    auth: {
      user: 'help.safemonitor@gmail.com', // INPUT_REQUIRED {Put your email here}
      pass: process.env.EMAIL_PASSWORD, // INPUT_REQUIRED {Put your email password here}
    }
  }),

  async sendEmail(messageId="",to, subject, text, html) {
    try {
      const mailOptions = {
        from: 'help.safemonitor@gmail.com', // Sender address
        to: to, // List of recipients
        subject: `Re: ${subject}`, // Subject line
        text: text, // Plain text body
        html: html, // HTML body content
      };
      
      
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  },
};

module.exports = emailUtil;
