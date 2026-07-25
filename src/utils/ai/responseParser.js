class ResponseParser {
  static parseJson(rawText) {
    if (!rawText) {
      throw new Error('Raw response is empty');
    }

    let cleanText = rawText.trim();

    if (cleanText.includes('```')) {
      const jsonStart = cleanText.indexOf('{');
      const jsonEnd = cleanText.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanText = cleanText.slice(jsonStart, jsonEnd + 1);
      } else {
        cleanText = cleanText.replace(/```json/g, '').replace(/```/g, '').trim();
      }
    }

    try {
      return JSON.parse(cleanText);
    } catch (err) {
      throw new Error(`AI response format is invalid: ${err.message}. Raw content was: ${rawText}`);
    }
  }
}

module.exports = ResponseParser;
