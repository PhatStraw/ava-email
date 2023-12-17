const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

router.post('/message/new', async (req, res) => {
  try {
    const { email, message } = req.body;
    if (!email || !message) {
      return res.status(400).send('Email and message are required.');
    }
    await conversationController.handleNewCustomerMessage(email, message);
    res.status(200).send('Message received and processed.');
  } catch (error) {
    res.status(500).send('Server error while processing message.');
  }
});

router.post('/email/init', async (req, res) => {
  try {
    const { emails, message } = req.body;
    if (!emails || !message) {
      return res.status(400).send('Emails and message are required.');
    }
    for (let email of emails) {
      await conversationController.sendInitialEmail(email, message);
    }
    res.status(200).send('Initial emails sent.');
  } catch (error) {
    res.status(500).send('Server error while sending initial emails.');
  }
});

module.exports = router;
