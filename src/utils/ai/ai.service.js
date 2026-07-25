const PromptBuilder = require('./promptBuilder');
const LlmProvider = require('./llmProvider');
const ResponseParser = require('./responseParser');
const AIConversation = require('../../models/aiConversation.model');
const logger = require('../../middlewares/logger');

class AIService {
  async generateLearningRoadmap(userId, domain, role, level) {
    logger.info(`[AI Gateway] Generating roadmap. User: ${userId}, Domain: ${domain}, Role: ${role}, Level: ${level}`);

    const { systemInstruction, prompt } = PromptBuilder.buildRoadmapPrompt(domain, role, level);
    const response = await LlmProvider.generate(systemInstruction, prompt);
    const parsedResponse = ResponseParser.parseJson(response.text);

    await AIConversation.create({
      user: userId,
      purpose: 'roadmap',
      prompt,
      systemInstruction,
      rawResponse: response.text,
      parsedResponse,
      provider: response.provider,
      model: response.model,
      tokensUsed: {
        promptTokens: response.tokens.promptTokens,
        completionTokens: response.tokens.completionTokens,
        totalTokens: response.tokens.totalTokens
      }
    });

    return parsedResponse;
  }

  async evaluateProject(userId, projectTitle, requirements, codeRepoUrl, liveUrl) {
    logger.info(`[AI Gateway] Evaluating project submission. User: ${userId}, Project: ${projectTitle}`);

    const { systemInstruction, prompt } = PromptBuilder.buildEvaluationPrompt(
      projectTitle,
      requirements,
      codeRepoUrl,
      liveUrl
    );
    const response = await LlmProvider.generate(systemInstruction, prompt);
    const parsedResponse = ResponseParser.parseJson(response.text);

    await AIConversation.create({
      user: userId,
      purpose: 'project_evaluation',
      prompt,
      systemInstruction,
      rawResponse: response.text,
      parsedResponse,
      provider: response.provider,
      model: response.model,
      tokensUsed: {
        promptTokens: response.tokens.promptTokens,
        completionTokens: response.tokens.completionTokens,
        totalTokens: response.tokens.totalTokens
      }
    });

    return parsedResponse;
  }
}

module.exports = new AIService();
