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

  async sendEmail(to, subject, text, html) {
    try {
      await this.transporter.sendMail({
        from: 'help.safemonitor@gmail.com', // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text, // Plain text body
        html: html, // HTML body content
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  },
};

module.exports = emailUtil;
