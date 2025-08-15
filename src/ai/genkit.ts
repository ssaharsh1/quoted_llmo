import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Genkit expects GEMINI_API_KEY or GOOGLE_API_KEY
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ GEMINI_API_KEY, GOOGLE_API_KEY, or GOOGLE_AI_API_KEY not found. AI features will fail.');
}

export const ai = genkit({
  // Explicitly pass the key so collaborators can use NEXT_PUBLIC_GOOGLE_AI_API_KEY if needed
  plugins: [googleAI({ apiKey })],
  model: 'googleai/gemini-2.0-flash',
});
