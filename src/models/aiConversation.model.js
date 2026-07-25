const mongoose = require('mongoose');

const aiConversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    purpose: {
      type: String,
      required: true
    },
    prompt: {
      type: String,
      required: true
    },
    systemInstruction: {
      type: String
    },
    rawResponse: {
      type: String
    },
    parsedResponse: {
      type: mongoose.Schema.Types.Mixed
    },
    provider: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    tokensUsed: {
      promptTokens: { type: Number, default: 0 },
      completionTokens: { type: Number, default: 0 },
      totalTokens: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true
  }
);

const AIConversation = mongoose.model('AIConversation', aiConversationSchema);
module.exports = AIConversation;
