// This utility will help us in determining if a conversation should continue or terminate

// Check if a conversation should be terminate based on a customer's message content
function shouldTerminateConversation(message) {
  const terminationPhrases = ["not interested", "stop", "unsubscribe", "im ok", "im good"];
  return terminationPhrases.some(phrase => message.toLowerCase().includes(phrase));
}

module.exports = {
  shouldTerminateConversation
};