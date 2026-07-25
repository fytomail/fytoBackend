class PromptBuilder {
  static buildRoadmapPrompt(domain, role, level) {
    const systemInstruction = 
      'You are an expert AI learning architect. Your job is to construct a structured professional roadmap. ' +
      'You must respond ONLY with a single JSON block. Do not include markdown code block syntax (like ```json) in your actual string, just return raw JSON text.';

    const prompt = 
      `Create a detailed learning roadmap for becoming a ${level} ${role} in the ${domain} domain. ` +
      `Break down the roadmap into 3-4 progressive chapters. Each chapter must have topics, a short quiz, and a practice question.\n` +
      `Ensure you follow this exact JSON structure:\n` +
      `{\n` +
      `  "title": "Roadmap for ${level} ${role}",\n` +
      `  "description": "A comprehensive guide to master ${role}.",\n` +
      `  "chapters": [\n` +
      `    {\n` +
      `      "title": "Chapter Title",\n` +
      `      "description": "Chapter brief description",\n` +
      `      "topics": ["Topic 1", "Topic 2", "Topic 3"],\n` +
      `      "quiz": {\n` +
      `        "question": "A key question testing this chapter?",\n` +
      `        "options": ["Option A", "Option B", "Option C", "Option D"],\n` +
      `        "correctAnswer": "Option A"\n` +
      `      },\n` +
      `      "practiceQuestion": "Describe a mini-exercise to build here."\n` +
      `    }\n` +
      `  ]\n` +
      `}`;

    return { systemInstruction, prompt };
  }

  static buildEvaluationPrompt(projectTitle, requirements, codeRepoUrl, liveUrl) {
    const systemInstruction = 
      'You are an elite code evaluator. You audit student projects and rank them on scale of 0-100 across metrics. ' +
      'Return a clean JSON format matching the requirements.';

    const prompt = 
      `Evaluate the project submission:\n` +
      `Project Title: ${projectTitle}\n` +
      `Requirements: ${requirements}\n` +
      `Repository: ${codeRepoUrl}\n` +
      `Live URL: ${liveUrl}\n\n` +
      `Produce a report conforming to the following structure:\n` +
      `{\n` +
      `  "scores": {\n` +
      `    "features": 85,\n` +
      `    "ui": 80,\n` +
      `    "ux": 90,\n` +
      `    "performance": 85\n` +
      `  },\n` +
      `  "bugReports": ["Issue 1 discovered", "Issue 2 discovered"],\n` +
      `  "recommendations": ["Suggestion 1", "Suggestion 2"],\n` +
      `  "passed": true\n` +
      `}`;

    return { systemInstruction, prompt };
  }
}

module.exports = PromptBuilder;
