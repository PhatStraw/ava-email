const openaiUtil = require('../utils/openaiUtil');
const Conversation = require('../models/conversation.model');
const emailUtil = require('../utils/emailUtil');
const { shouldTerminateConversation } = require('../utils/conversationUtil'); // Added utility import

async function updateConversationStatus(conversationId, status) {
  await Conversation.findByIdAndUpdate(conversationId, { status: status });
}

async function handleNewCustomerMessage(email, message) {
    let conversation = await Conversation.findOne({ email: email });

    if (!conversation) {
        conversation = new Conversation({ email: email });
    }

    if (shouldTerminateConversation(message)) {
        await updateConversationStatus(conversation._id, 'terminated');
        return;
    }

    conversation.messages.push({
        sender: 'customer',
        message: message,
        timestamp: new Date(),
    });

    const contextMessages = conversation.messages.map(m => ({ sender: m.sender, message: m.message }));

    try {
        const responseMessage = await openaiUtil.getChatGptResponse(message, contextMessages);

        conversation.messages.push({
            sender: 'autoconverter',
            message: responseMessage,
            timestamp: new Date(),
        });

        await conversation.save();

        await emailUtil.sendEmail(conversation.email, 'Reply from AutoConverter', responseMessage, `<p>${responseMessage}</p>`);

    } catch (error) {
        console.error('Failed to get a response from OpenAI', error);
        await conversation.save();
    }
}

module.exports = {
    handleNewCustomerMessage,
    updateConversationStatus
};