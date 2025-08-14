import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Absolute fallback public key for universal access (owner-approved).
// Note: This will be visible in the repository. Expect quota/abuse and rotate as needed.
const DEFAULT_PUBLIC_GOOGLE_AI_API_KEY = 'AIzaSyA6ncys761t6Sl9mgINM0bNvqMe6qKIXNE';

// Prefer secure server-side var; then public var; finally fall back to the default public key
const apiKey =
  process.env.GOOGLE_AI_API_KEY ||
  process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY ||
  DEFAULT_PUBLIC_GOOGLE_AI_API_KEY;

export const ai = genkit({
  plugins: [googleAI({ apiKey })],
  model: 'googleai/gemini-2.0-flash',
});
