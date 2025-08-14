import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Prefer secure server-side var; fall back to public var only if explicitly provided
const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ GOOGLE_AI_API_KEY (or NEXT_PUBLIC_GOOGLE_AI_API_KEY) not found. AI features will fail.');
}

export const ai = genkit({
  // Explicitly pass the key so collaborators can use NEXT_PUBLIC_GOOGLE_AI_API_KEY if needed
  plugins: [googleAI({ apiKey })],
  model: 'googleai/gemini-2.0-flash',
});
