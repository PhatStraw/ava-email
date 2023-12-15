// src/utils/emailListenerUtil.js
const imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');
const { handleNewCustomerMessage } = require('../controllers/conversationController');
const { Readable } = require('stream');

const config = {
  imap: {
    user: 'help.safemonitor@gmail.com', // INPUT_REQUIRED {Your IMAP email}
    password: process.env.EMAIL_PASSWORD, // INPUT_REQUIRED {Your IMAP password}
    host: 'imap.gmail.com', // INPUT_REQUIRED {Your IMAP host, e.g., imap.gmail.com}
    port: 993, // Default IMAP SSL port
    tls: {
      rejectUnauthorized: false
    },
    authTimeout: 3000
  }
};

async function onEmailReceived(email, text) {
  if(email){
    const { from, subject } = email;
    const senderEmail = from[0];
    handleNewCustomerMessage(senderEmail, text); // Pass Message-ID to handleNewCustomerMessage
  }
}

function setupEmailListener() {

return imaps.connect(config).then(function (connection) {
  return connection.openBox('INBOX').then(function () {
    // Set up email listener
    connection.on('mail', function (numNewMail) {
      var searchCriteria = ['UNSEEN'];
      var fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: true };

      connection.search(searchCriteria, fetchOptions).then(function (results) {

        var messages = results.map(function (res) {
          return res.parts.map(function (part) {
            return part.which === 'TEXT' ? simpleParser(part.body) : null;
          });
        });
      
        var body = results.map(function (res) {
          return res.parts[1].body
        });
      
       
        Promise.all(_.flatten(messages)).then(function (mails) {
          mails.forEach(function (mail, index) {
            if (mail) {
              console.log(`Processing email #${index}`);
              const text = mail.text || mail.html;
              let firstString = text.split('\n')[0];
              onEmailReceived(body[index], firstString); // Pass Message-ID to onEmailReceived
            }
          });
        });
      });
    });
  });
}).catch(console.error);
}

module.exports = {
  setupEmailListener
};
