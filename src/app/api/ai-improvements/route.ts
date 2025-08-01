import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AIImprovementsSchema = z.object({
  url: z.string().url(),
  userAgent: z.string(),
  auditResult: z.object({
    overall_score: z.number(),
    verdict: z.string(),
    categories: z.record(z.any()),
    priority_fixes: z.array(z.any()),
    strengths: z.array(z.string()),
    opportunities: z.array(z.string()),
  }),
});

const prompt = ai.definePrompt({
  name: 'ai-improvements',
  input: { schema: AIImprovementsSchema },
  output: { schema: z.object({
    improvements: z.object({
      summary: z.string(),
      priorityAreas: z.array(z.object({
        title: z.string(),
        priority: z.enum(['High', 'Medium', 'Low']),
        currentScore: z.number(),
        targetScore: z.number(),
        description: z.string(),
        steps: z.array(z.object({
          title: z.string(),
          description: z.string(),
          file: z.string(),
          action: z.string(),
          codeExample: z.string().optional(),
          expectedImpact: z.string(),
        })),
      })),
      quickWins: z.array(z.object({
        title: z.string(),
        description: z.string(),
        impact: z.string(),
        timeToComplete: z.string(),
      })),
      expectedResults: z.object({
        overallScoreImprovement: z.string(),
        timeToComplete: z.string(),
        keyMetrics: z.array(z.string()),
      }),
    }),
  })},
  prompt: `You are an expert LLMO consultant specializing in Large Language Model Optimization. Your task is to provide structured, actionable improvement recommendations for a blog post based on its audit results.

Analyze the audit results and provide a structured improvement plan. Focus on the lowest scoring areas and provide specific, actionable steps.

Return a structured response with:

1. **Summary**: Brief overview of main issues and expected improvements
2. **Priority Areas**: 3-4 main areas to focus on, each with:
   - Title and priority level (High/Medium/Low)
   - Current vs target scores
   - Description of the issue
   - 3-5 specific steps with file paths, actions, and code examples
3. **Quick Wins**: 2-3 simple, high-impact changes that can be done quickly
4. **Expected Results**: Overall score improvement, time to complete, and key metrics

For each step, provide:
- Clear title and description
- Specific file to modify
- Exact action to take
- Code example if applicable
- Expected impact on score

Be specific and actionable. Focus on technical implementation and provide exact code changes where possible.

Structure the response as a JSON object with the specified schema.`,
});

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GOOGLE_AI_API_KEY) {
      console.error('AI Improvements Error: GOOGLE_AI_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured. Please add GOOGLE_AI_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validatedData = AIImprovementsSchema.parse(body);
    
    console.log('AI Improvements - Generating recommendations for:', validatedData.url);
    
    const result = await prompt(validatedData);
    
    console.log('AI Improvements - Raw result:', JSON.stringify(result, null, 2));
    
    if (!result.output) {
      throw new Error('Failed to generate AI improvements');
    }
    
    // Check if we have the expected structure
    if (!result.output.improvements) {
      console.error('AI Improvements - Missing improvements structure:', result.output);
      throw new Error('Invalid AI response structure');
    }
    
    // Validate the output structure
    const expectedStructure = {
      summary: typeof result.output.improvements?.summary === 'string',
      priorityAreas: Array.isArray(result.output.improvements?.priorityAreas),
      quickWins: Array.isArray(result.output.improvements?.quickWins),
      expectedResults: typeof result.output.improvements?.expectedResults === 'object'
    };
    
    console.log('AI Improvements - Structure validation:', expectedStructure);
    
    // Check if all required fields are present
    if (!expectedStructure.summary || !expectedStructure.priorityAreas || !expectedStructure.quickWins || !expectedStructure.expectedResults) {
      console.error('AI Improvements - Missing required fields:', expectedStructure);
      throw new Error('Incomplete AI response structure');
    }
    
    return NextResponse.json(result.output.improvements);
  } catch (error) {
    console.error('AI Improvements Error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to generate AI improvements';
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'AI service not configured. Please check your API key setup.';
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'AI service is temporarily busy. Please try again in a few minutes.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = `AI service error: ${error.message}`;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 