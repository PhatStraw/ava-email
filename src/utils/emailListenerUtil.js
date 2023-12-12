// src/utils/emailListenerUtil.js
const imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');
const { handleNewCustomerMessage } = require('../controllers/conversationController');
const { Readable } = require('stream');
const config = {
  imap: {
    user: 'help.safemonitor@gmail.com', // INPUT_REQUIRED {Your IMAP email}
    password: 'lazn ijdr bmyu tgds', // INPUT_REQUIRED {Your IMAP password}
    host: 'imap.gmail.com', // INPUT_REQUIRED {Your IMAP host, e.g., imap.gmail.com}
    port: 993, // Default IMAP SSL port
    tls: {
      rejectUnauthorized: false
    },
    authTimeout: 3000
  }
};
async function onEmailReceived(email) {
  const { from, subject, text } = email;
  const senderEmail = from[0];
  console.log(`Email received from ${senderEmail}: ${subject}`);
  handleNewCustomerMessage(senderEmail, text);
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

        Promise.all(_.flatten(messages)).then(function (mails) {
          mails.forEach(function (mail) {
            if (mail) {
              // message.parts[1].body.text = mail.text || mail.html;
              // onEmailReceived(message.parts[1].body);
              console.log('New mail:', mail);
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
