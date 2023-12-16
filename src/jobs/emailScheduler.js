const Conversation = require('../models/conversation.model');
const emailUtil = require('../utils/emailUtil');
const { getChatGptResponse } = require('../utils/openaiUtil');
const cron = require('cron');
const conversationController = require('../controllers/conversationController'); // Added controller import
const { shouldTerminateConversation } = require('../utils/conversationUtil'); // Added utility import

const emailScheduler = new cron.CronJob('*/1 * * * *', async function() {
  console.log('Cron job started: Checking for conversations to continue');
  
  try {
    const conversationsToFollowUp = await Conversation.find({ status: 'respond' }).exec();
    for (const conversation of conversationsToFollowUp) {
      const lastCustomerMessage = conversation.messages.filter(m => m.sender === 'customer').pop();
      if (!lastCustomerMessage) continue;
      const contextMessages = conversation.messages.map(m => ({ sender: m.sender, message: m.message }));

      if (shouldTerminateConversation(lastCustomerMessage.message)) {
        await conversationController.updateConversationStatus(conversation._id, 'terminated');
        continue;
      }

      try {
        const chatResponse = await getChatGptResponse(lastCustomerMessage.message, contextMessages);
        if (chatResponse) {
          conversation.messages.push({ sender: 'autoconverter', message: chatResponse, timestamp: new Date() });
          conversation.markModified('messages');
          conversation.status = 'active';
          conversation.markModified('status');
          await conversation.save();
          await emailUtil.sendEmail(conversation.email, 'Response from autoconverter', chatResponse, `<p>${chatResponse}</p>`);
        }
      } catch (error) {
        console.error('Error during the ChatGPT API call', error);
        await emailUtil.sendEmail(process.env.OWNER_EMAIL,
          'AutoConverter Error: Unable to Generate Response',
          'There was an error processing the customer inquiry. Manual intervention may be required.',
          `<p>There was an error with the following message ID: ${lastCustomerMessage._id}</p>`
        );
      }
    }
  } catch (error) {
    console.error('Error running cron job:', error);
  }
}, null, false, 'America/New_York');

module.exports = emailScheduler;
