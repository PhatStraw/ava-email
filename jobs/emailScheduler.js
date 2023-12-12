const cron = require('cron');
const emailUtil = require('../utils/emailUtil');
const Conversation = require('../models/conversation.model');

const emailScheduler = new cron.CronJob('0 * * * *', async function() {
  console.log('Cron job started: Checking for emails to send');
  try {
    const conversationsToFollowUp = await Conversation.find({ status: 'active' }).exec();
    conversationsToFollowUp.forEach(conversation => {
      // Placeholder: Implement your logic for sending emails
      // emailUtil.sendEmail(conversation.email, 'Subject', 'MessageText', '<p>MessageHtml</p>');
    });
  } catch (error) {
    console.error('Error running cron job:', error);
  }
}, null, false, 'America/New_York');

module.exports = emailScheduler;
