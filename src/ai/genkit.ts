import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Check if API key is configured
const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ GOOGLE_AI_API_KEY not found in environment variables. AI improvements will not work.');
  console.warn('Please add GOOGLE_AI_API_KEY to your .env.local file');
}

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
