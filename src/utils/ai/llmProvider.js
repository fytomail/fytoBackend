const aiConfig = require('../../config/ai.config');
const logger = require('../../middlewares/logger');

class LlmProvider {
  static async generate(systemInstruction, prompt) {
    const { provider, gemini, openai, temperature, maxTokens } = aiConfig;

    logger.info(`Sending AI generation request to Provider: ${provider}`);

    const isGeminiSimulated = provider === 'gemini' && (!gemini.apiKey || gemini.apiKey.startsWith('your_') || gemini.apiKey === '');
    const isOpenAiSimulated = provider === 'openai' && (!openai.apiKey || openai.apiKey.startsWith('your_') || openai.apiKey === '');

    if (isGeminiSimulated || isOpenAiSimulated) {
      return this.getSimulatedResponse(prompt);
    }

    try {
      if (provider === 'gemini') {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${gemini.model}:generateContent?key=${gemini.apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\nUser Prompt: ${prompt}` }]
              }
            ],
            generationConfig: {
              temperature,
              maxOutputTokens: maxTokens
            }
          })
        });

        if (!response.ok) {
          const textErr = await response.text();
          throw new Error(`Gemini status: ${response.status} - ${textErr}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        return {
          text,
          model: gemini.model,
          provider: 'gemini',
          tokens: {
            promptTokens: 0,
            completionTokens: 0,
            totalTokens: 0
          }
        };
      } else {
        const url = 'https://api.openai.com/v1/chat/completions';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openai.apiKey}`
          },
          body: JSON.stringify({
            model: openai.model,
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: prompt }
            ],
            temperature,
            max_tokens: maxTokens
          })
        });

        if (!response.ok) {
          const textErr = await response.text();
          throw new Error(`OpenAI status: ${response.status} - ${textErr}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || '';
        return {
          text,
          model: openai.model,
          provider: 'openai',
          tokens: {
            promptTokens: data.usage?.prompt_tokens || 0,
            completionTokens: data.usage?.completion_tokens || 0,
            totalTokens: data.usage?.total_tokens || 0
          }
        };
      }
    } catch (error) {
      logger.error(`AI API call failed, falling back to simulated output. Error: ${error.message}`);
      return this.getSimulatedResponse(prompt);
    }
  }

  static getSimulatedResponse(prompt) {
    logger.info('Generating simulated LLM response for local testing...');

    if (prompt.includes('roadmap') || prompt.includes('chapters')) {
      const match = prompt.match(/roadmap for becoming a (\w+)\s*([\w\s]+) in the ([\w\s]+) domain/i) || [];
      const level = match[1] || 'Junior';
      const role = match[2] || 'Developer';
      const domain = match[3] || 'Software Engineering';

      const mockRoadmap = {
        title: `${level} ${role} Roadmap`,
        description: `Custom roadmap for mastering ${role} skills under the ${domain} domain.`,
        chapters: [
          {
            title: `Chapter 1: Principles of ${domain}`,
            description: `Understand foundational workflow rules for ${role}.`,
            topics: ["Introduction to core structure", "Development environment setup", "CLI commands"],
            quiz: {
              question: "Which of the following is essential for code management?",
              options: ["Version control (e.g. Git)", "Editing files directly in prod", "Hardcoding secret credentials", "Ignoring lints"],
              correctAnswer: "Version control (e.g. Git)"
            },
            practiceQuestion: "Install Git, configure your username, and initialize an empty repo."
          },
          {
            title: "Chapter 2: Applied Operations",
            description: "Deep dive into building small features.",
            topics: ["Variables & scoping", "Error catching mechanisms", "Integration testing"],
            quiz: {
              question: "Why should we use error boundaries or try-catch?",
              options: ["To prevent server crashes", "To slow down execution", "To hide errors completely", "To use more RAM"],
              correctAnswer: "To prevent server crashes"
            },
            practiceQuestion: "Build a function that reads a file and safely handles file-not-found errors."
          }
        ]
      };

      return {
        text: JSON.stringify(mockRoadmap),
        model: 'simulation-model',
        provider: 'simulation',
        tokens: { promptTokens: 120, completionTokens: 280, totalTokens: 400 }
      };
    }

    const mockEval = {
      scores: {
        features: 92,
        ui: 85,
        ux: 88,
        performance: 90
      },
      bugReports: ["Warning: dependency versions are locked", "Optimization: images lack lazy loading"],
      recommendations: ["Add a gitignore file", "Setup environment configs securely"],
      passed: true
    };

    return {
      text: JSON.stringify(mockEval),
      model: 'simulation-model',
      provider: 'simulation',
      tokens: { promptTokens: 150, completionTokens: 130, totalTokens: 280 }
    };
  }
}

module.exports = LlmProvider;
