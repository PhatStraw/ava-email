SafeMonitor Email Service

This repository contains the code for SafeMonitor's email service. It uses nodemailer for sending emails and imap-simple for listening to incoming emails.
Setup

1. Clone the repository.
2. Install the dependencies using npm install.
3. Create a .env file in the root directory and add your email password as EMAIL_PASSWORD.

Listening to Emails

The setupEmailListener function in src/utils/emailListenerUtil.js sets up an email listener that listens to new emails in the inbox. When a new email is received, it calls the onEmailReceived function with the email and its text as parameters.
;

Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
License

MIT