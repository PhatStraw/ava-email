const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true
    },
    messages: [
      {
        sender: {
          type: String,
          required: true,
          enum: ['autoconverter', 'customer']
        },
        message: {
          type: String,
          required: true
        },
        timestamp: {
          type: Date,
          required: true,
          default: Date.now
        },
        messageId: {
          type: String,
          required: false
        }
      }
    ],
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'terminated', 'respond'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Conversation', conversationSchema);
