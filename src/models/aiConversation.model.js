const mongoose = require('mongoose');

const aiConversationSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    purpose: { type: String, required: true },
    prompt: { type: String },
    systemInstruction: { type: String },
    rawResponse: { type: String },
    parsedResponse: { type: mongoose.Schema.Types.Mixed },
    provider: { type: String },
    model: { type: String },
    tokensUsed: {
      promptTokens: Number,
      completionTokens: Number,
      totalTokens: Number
    }
  },
  { timestamps: true }
);

const AIConversation = mongoose.model('AIConversation', aiConversationSchema);
module.exports = AIConversation;
