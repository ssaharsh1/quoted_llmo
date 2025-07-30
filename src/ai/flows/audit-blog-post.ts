'use server';

/**
 * @fileOverview Comprehensive LLMO (Large Language Model Optimization) audit system.
 *
 * - auditBlogPost - A function that handles comprehensive blog post LLMO audit
 * - AuditBlogPostInput - The input type for the auditBlogPost function  
 * - AuditBlogPostOutput - The comprehensive audit results with detailed scoring
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AuditBlogPostInputSchema = z.object({
  url: z.string().url().describe('The URL of the blog post to audit.'),
});
export type AuditBlogPostInput = z.infer<typeof AuditBlogPostInputSchema>;

const AuditCategorySchema = z.object({
  name: z.string().describe('Name of the audit category'),
  score: z.number().min(0).max(100).describe('Score out of 100 for this category'),
  status: z.enum(['pass', 'warning', 'fail']).describe('Overall status of this category'),
  checks: z.array(z.object({
    name: z.string().describe('Name of the specific check'),
    status: z.enum(['pass', 'warning', 'fail']).describe('Status of this check'),
    message: z.string().describe('Detailed message about this check'),
    impact: z.enum(['high', 'medium', 'low']).describe('Impact level of this issue'),
  })).describe('Individual checks within this category'),
  recommendations: z.array(z.string()).describe('Specific recommendations for this category'),
});

const AuditBlogPostOutputSchema = z.object({
  overall_score: z.number().min(0).max(100).describe('Overall LLMO score out of 100'),
  verdict: z.enum(['Excellent', 'Good', 'Needs Improvement', 'Poor']).describe('Overall verdict based on score'),
  summary: z.string().describe('Executive summary of the audit results'),
  
  categories: z.object({
    technical_setup: AuditCategorySchema.describe('Technical setup checks (robots.txt, llms.txt, etc.)'),
    structured_data: AuditCategorySchema.describe('Structured data and schema markup checks'),
    content_quality: AuditCategorySchema.describe('Content quality and E-E-A-T signals'),
    meta_optimization: AuditCategorySchema.describe('Meta tags and SEO optimization'),
    ai_readability: AuditCategorySchema.describe('AI model readability and citation potential'),
  }).describe('Detailed audit categories'),
  
  priority_fixes: z.array(z.object({
    title: z.string().describe('Title of the priority fix'),
    description: z.string().describe('Description of what needs to be fixed'),
    impact: z.enum(['high', 'medium', 'low']).describe('Impact of implementing this fix'),
    difficulty: z.enum(['easy', 'medium', 'hard']).describe('Difficulty of implementing this fix'),
    code_example: z.string().optional().describe('Code example if applicable'),
  })).describe('Top priority fixes to implement'),
  
  strengths: z.array(z.string()).describe('What the blog post does well for LLMO'),
  opportunities: z.array(z.string()).describe('Key opportunities for improvement'),
});

export type AuditBlogPostOutput = z.infer<typeof AuditBlogPostOutputSchema>;

export async function auditBlogPost(input: AuditBlogPostInput): Promise<AuditBlogPostOutput> {
  return auditBlogPostFlow(input);
}

// Batch audit functionality
const BatchAuditInputSchema = z.object({
  urls: z.array(z.string().url()).min(1).max(10).describe('Array of blog post URLs to audit (max 10)'),
});
export type BatchAuditInput = z.infer<typeof BatchAuditInputSchema>;

const BatchAuditResultSchema = z.object({
  url: z.string().url().describe('The audited URL'),
  result: AuditBlogPostOutputSchema.optional().describe('Audit result if successful'),
  error: z.string().optional().describe('Error message if audit failed'),
});

const BatchAuditOutputSchema = z.object({
  total_urls: z.number().describe('Total number of URLs processed'),
  successful: z.number().describe('Number of successful audits'),
  failed: z.number().describe('Number of failed audits'),
  results: z.array(BatchAuditResultSchema).describe('Individual audit results'),
  summary: z.object({
    average_score: z.number().describe('Average score across successful audits'),
    best_performing_url: z.string().optional().describe('URL with highest score'),
    worst_performing_url: z.string().optional().describe('URL with lowest score'),
    common_issues: z.array(z.string()).describe('Most common issues across all audits'),
  }).describe('Batch audit summary'),
});
export type BatchAuditOutput = z.infer<typeof BatchAuditOutputSchema>;

export async function batchAuditBlogPosts(input: BatchAuditInput): Promise<BatchAuditOutput> {
  const results: BatchAuditOutput['results'] = [];
  
  // Process URLs in parallel with some concurrency control
  const batchSize = 3; // Process 3 at a time to avoid overwhelming the AI service
  for (let i = 0; i < input.urls.length; i += batchSize) {
    const batch = input.urls.slice(i, i + batchSize);
    const batchPromises = batch.map(async (url) => {
      try {
        const result = await auditBlogPost({ url });
        return { url, result };
      } catch (error) {
        return { 
          url, 
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }
  
  // Calculate summary statistics
  const successful = results.filter(r => r.result).length;
  const failed = results.filter(r => r.error).length;
  
  const successfulResults = results.filter(r => r.result);
  const scores = successfulResults.map(r => r.result!.overall_score);
  const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  
  const bestPerforming = successfulResults.reduce((best, current) => 
    current.result!.overall_score > (best?.result?.overall_score || 0) ? current : best
  , null as typeof successfulResults[0] | null);
  
  const worstPerforming = successfulResults.reduce((worst, current) => 
    current.result!.overall_score < (worst?.result?.overall_score || 100) ? current : worst
  , null as typeof successfulResults[0] | null);
  
  // Extract common issues
  const allIssues: string[] = [];
  successfulResults.forEach(r => {
    r.result!.priority_fixes.forEach(fix => allIssues.push(fix.title));
  });
  
  const issueFrequency = allIssues.reduce((acc, issue) => {
    acc[issue] = (acc[issue] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const commonIssues = Object.entries(issueFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([issue]) => issue);
  
  return {
    total_urls: input.urls.length,
    successful,
    failed,
    results,
    summary: {
      average_score: Math.round(averageScore),
      best_performing_url: bestPerforming?.url,
      worst_performing_url: worstPerforming?.url,
      common_issues: commonIssues,
    },
  };
}

const prompt = ai.definePrompt({
  name: 'comprehensiveLLMOAuditPrompt',
  input: {schema: AuditBlogPostInputSchema},
  output: {schema: AuditBlogPostOutputSchema},
  prompt: `You are an expert LLMO (Large Language Model Optimization) auditor. Your job is to comprehensively analyze a blog post's optimization for AI model citation and discovery.

Perform a detailed technical and content audit of the blog post at the given URL: {{{url}}}

## AUDIT FRAMEWORK

Analyze these key categories with specific technical checks:

### 1. TECHNICAL SETUP (25% of score)
- Check if robots.txt allows AI bot crawling (GPTBot, Claude-Bot, etc.)
- Verify presence and configuration of llms.txt file
- Analyze site loading speed and technical performance
- Check mobile responsiveness and accessibility

### 2. STRUCTURED DATA (20% of score)  
- Presence of JSON-LD structured data
- Article schema markup quality
- Author and organization schema
- FAQ schema if applicable
- Breadcrumb navigation markup

### 3. CONTENT QUALITY (25% of score)
- E-E-A-T signals (Expertise, Experience, Authoritativeness, Trustworthiness)
- Author credibility and bio information
- Content depth and comprehensiveness
- Fact-checking and citation quality
- Unique insights and original research

### 4. META OPTIMIZATION (15% of score)
- Title tag optimization for AI discovery
- Meta description clarity and completeness
- Header structure (H1, H2, H3 hierarchy)
- Alt text for images
- Internal and external linking strategy

### 5. AI READABILITY (15% of score)
- Content structure and scanability
- Clear problem-solution format
- Logical information hierarchy
- Quote-worthy passages and statistics
- Concise, factual statements that AI models prefer

## SCORING GUIDELINES
- 90-100: Excellent - AI models highly likely to cite this content
- 70-89: Good - Well optimized with minor improvements needed
- 50-69: Needs Improvement - Several optimization opportunities
- 0-49: Poor - Major LLMO issues that need addressing

## OUTPUT REQUIREMENTS
- Provide specific, actionable recommendations
- Include code examples where applicable
- Prioritize fixes by impact and difficulty
- Highlight both strengths and opportunities
- Give concrete next steps for improvement

Analyze the URL thoroughly and provide comprehensive LLMO audit results.`,
});

const auditBlogPostFlow = ai.defineFlow(
  {
    name: 'comprehensiveLLMOAuditFlow',
    inputSchema: AuditBlogPostInputSchema,
    outputSchema: AuditBlogPostOutputSchema,
  },
  async (input: AuditBlogPostInput) => {
    const {output} = await prompt(input);
    return output!;
  }
);
