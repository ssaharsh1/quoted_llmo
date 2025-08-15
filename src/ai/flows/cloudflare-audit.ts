import { ai } from '../genkit';
import { z } from 'zod';

// Schema for Cloudflare Worker response
const CloudflareWorkerResponseSchema = z.object({
  postUrl: z.string(),
  redirectChain: z.array(z.object({
    url: z.string(),
    status: z.number(),
  })),
  robotsTxt: z.string(),
  llmsStatus: z.enum(['found', 'not_found']),
  metadata: z.object({
    title: z.string(),
    metaDescription: z.string(),
    author: z.string(),
    keywords: z.string().optional(),
    language: z.string().optional(),
    robots: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogType: z.string().optional(),
    twitterCard: z.string().optional(),
    canonical: z.string().optional(),
  }),
  headings: z.object({
    h1: z.array(z.string()),
    h2: z.array(z.string()),
    h3: z.array(z.string()).optional(),
    h4: z.array(z.string()).optional(),
    h5: z.array(z.string()).optional(),
    h6: z.array(z.string()).optional(),
  }),
  schemaTypes: z.array(z.string()),
  contentStructure: z.object({
    wordCount: z.number(),
    paragraphCount: z.number(),
    listCount: z.number(),
    imageCount: z.number(),
    linkCount: z.number(),
    hasTableOfContents: z.boolean(),
    hasFAQ: z.boolean(),
    hasCodeBlocks: z.number(),
  }),
  linkAnalysis: z.object({
    totalLinks: z.number(),
    externalLinks: z.number(),
    citationLinks: z.number(),
    hasReferences: z.boolean(),
    hasBibliography: z.boolean(),
  }),
  aiAccessibility: z.object({
    robotsAllowsAI: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasLLMsTxt: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasStructuredData: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasProperHeadings: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasAuthorInfo: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasMetaDescription: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
  }),
  llmoAnalysis: z.object({
    hasArticleSchema: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasPersonSchema: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasBreadcrumbSchema: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasFAQSchema: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasHowToSchema: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasProperMetaTags: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasCanonical: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasLanguageTag: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    contentReadability: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
    hasCitations: z.any().transform((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') {
        return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
      }
      return Boolean(val);
    }).optional().default(false),
  }),
});

// Enhanced audit input schema
const EnhancedAuditInputSchema = z.object({
  url: z.string().url().describe('The blog post URL to audit'),
  userAgent: z.enum([
    'llm-comprehensive',
    'gptbot', 
    'perplexitybot',
    'claude-web',
    'gemini',
    'chrome',
    'googlebot',
    'bingbot'
  ]).default('llm-comprehensive').describe('User agent for crawling'),
});

// Enhanced audit output schema
const EnhancedAuditOutputSchema = z.object({
  overall_score: z.number().min(0).max(100).describe('Overall LLMO score out of 100'),
  verdict: z.enum(['Excellent', 'Good', 'Needs Improvement', 'Poor']).describe('Overall verdict based on score'),
  summary: z.string().describe('Executive summary of the enhanced audit results'),
  
  categories: z.object({
    crawl_access: z.object({
      name: z.string().describe('Crawl & Access'),
      score: z.number().min(0).max(100),
      status: z.enum(['pass', 'warning', 'fail']),
      checks: z.array(z.object({
        name: z.string(),
        status: z.enum(['pass', 'warning', 'fail']),
        message: z.string(),
        impact: z.enum(['high', 'medium', 'low']),
      })),
      recommendations: z.array(z.string()),
    }).describe('Technical crawling and access analysis'),
    
    content_schema: z.object({
      name: z.string().describe('Content & Schema'),
      score: z.number().min(0).max(100),
      status: z.enum(['pass', 'warning', 'fail']),
      checks: z.array(z.object({
        name: z.string(),
        status: z.enum(['pass', 'warning', 'fail']),
        message: z.string(),
        impact: z.enum(['high', 'medium', 'low']),
      })),
      recommendations: z.array(z.string()),
    }).describe('Content structure and schema markup analysis'),
    
    eat_readability: z.object({
      name: z.string().describe('E-E-A-T & Readability'),
      score: z.number().min(0).max(100),
      status: z.enum(['pass', 'warning', 'fail']),
      checks: z.array(z.object({
        name: z.string(),
        status: z.enum(['pass', 'warning', 'fail']),
        message: z.string(),
        impact: z.enum(['high', 'medium', 'low']),
      })),
      recommendations: z.array(z.string()),
    }).describe('Expertise, authority, and trust signals analysis'),
    
    offsite_signals: z.object({
      name: z.string().describe('Off-site Signals'),
      score: z.number().min(0).max(100),
      status: z.enum(['pass', 'warning', 'fail']),
      checks: z.array(z.object({
        name: z.string(),
        status: z.enum(['pass', 'warning', 'fail']),
        message: z.string(),
        impact: z.enum(['high', 'medium', 'low']),
      })),
      recommendations: z.array(z.string()),
    }).describe('Off-site signals and citation potential analysis'),
  }).describe('Detailed enhanced audit categories'),
  
  priority_fixes: z.array(z.object({
    title: z.string().describe('Title of the priority fix'),
    description: z.string().describe('Description of what needs to be fixed'),
    impact: z.enum(['high', 'medium', 'low']).describe('Impact of implementing this fix'),
    difficulty: z.enum(['easy', 'medium', 'hard']).describe('Difficulty of implementing this fix'),
    code_example: z.string().optional().describe('Code example if applicable'),
  })).describe('Top priority fixes to implement'),
  
  strengths: z.array(z.string()).describe('What the blog post does well for LLMO'),
  opportunities: z.array(z.string()).describe('Key opportunities for improvement'),
  
  technical_insights: z.object({
    redirects: z.number().describe('Number of redirects in the chain'),
    robots_accessible: z.boolean().describe('Whether robots.txt allows AI crawling'),
    llms_txt_present: z.boolean().describe('Whether llms.txt file exists'),
    schema_types_found: z.array(z.string()).describe('JSON-LD schema types detected'),
    heading_structure: z.object({
      h1_count: z.number(),
      h2_count: z.number(),
      proper_hierarchy: z.boolean(),
    }).describe('Heading structure analysis'),
    contentStructure: z.object({
      wordCount: z.number(),
      paragraphCount: z.number(),
      listCount: z.number(),
      imageCount: z.number(),
      linkCount: z.number(),
      hasTableOfContents: z.boolean(),
      hasFAQ: z.boolean(),
      hasCodeBlocks: z.number(),
    }).describe('Content structure analysis'),
    linkAnalysis: z.object({
      totalLinks: z.number(),
      externalLinks: z.number(),
      citationLinks: z.number(),
      hasReferences: z.boolean(),
      hasBibliography: z.boolean(),
    }).describe('Link analysis'),
    aiAccessibility: z.object({
      robotsAllowsAI: z.boolean(),
      hasLLMsTxt: z.boolean(),
      hasStructuredData: z.boolean(),
      hasProperHeadings: z.boolean(),
      hasAuthorInfo: z.boolean(),
      hasMetaDescription: z.boolean(),
    }).describe('AI accessibility analysis'),
    llmoAnalysis: z.object({
      hasArticleSchema: z.boolean(),
      hasPersonSchema: z.boolean(),
      hasBreadcrumbSchema: z.boolean(),
      hasFAQSchema: z.boolean(),
      hasHowToSchema: z.boolean(),
      hasProperMetaTags: z.boolean(),
      hasCanonical: z.boolean(),
      hasLanguageTag: z.boolean(),
      contentReadability: z.boolean(),
      hasCitations: z.boolean(),
    }).describe('LLMO-specific analysis'),
  }).describe('Technical insights from Cloudflare Worker analysis'),
});

type EnhancedAuditInput = z.infer<typeof EnhancedAuditInputSchema>;
type EnhancedAuditOutput = z.infer<typeof EnhancedAuditOutputSchema>;
type CloudflareWorkerResponse = z.infer<typeof CloudflareWorkerResponseSchema>;

// Function to fetch data from Cloudflare Worker
async function fetchCloudflareWorkerData(url: string, userAgent: string): Promise<CloudflareWorkerResponse> {
  const workerUrl = 'https://audit.saharsh-sriram1.workers.dev/';
  
  // For comprehensive LLM audit, use GPTBot as primary crawler but analyze for all AI models
  const actualUserAgent = userAgent === 'llm-comprehensive' ? 'gptbot' : userAgent;
  
  const params = new URLSearchParams({
    url: url,
    'user-agent': actualUserAgent,
  });
  
  const fullUrl = `${workerUrl}?${params}`;
  console.log('Fetching from Cloudflare Worker:', fullUrl);
  console.log('URL being sent:', url);
  console.log('User agent being used:', actualUserAgent);
  
  let retries = 3;
  let lastError: Error | null = null;
  
  while (retries > 0) {
    try {
      console.log(`Attempt ${4 - retries}/3: Fetching from Cloudflare Worker...`);
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });
      
      console.log('Cloudflare Worker response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage += `: ${errorData.error}`;
          }
        } catch (e) {
          // If we can't parse the error JSON, just use the status
        }
        
        if (response.status === 429) {
          errorMessage = 'Rate limited by Cloudflare Worker. Please try again in a few minutes.';
        } else if (response.status === 403) {
          errorMessage = 'Access denied. The site may be blocking automated requests.';
        } else if (response.status === 404) {
          errorMessage = 'The page you\'re trying to analyze doesn\'t exist or has been moved. Please check the URL and try again.';
        } else if (response.status === 402) {
          errorMessage = 'Payment required. The target site may have a paywall or subscription requirement.';
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Cloudflare Worker raw response:', data);
      
      // Validate the response against our schema
      const validatedData = CloudflareWorkerResponseSchema.parse(data);
      console.log('Cloudflare Worker validated response:', validatedData);
      
      return validatedData;
      
    } catch (error) {
      lastError = error as Error;
      console.error(`Attempt ${4 - retries}/3 failed:`, error);
      
      if (retries > 1) {
        // Add exponential backoff with jitter
        const delay = Math.random() * 1000 + 1000 * (4 - retries);
        console.log(`Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      retries--;
    }
  }
  
  // If we get here, all retries failed
  throw new Error(`Failed to fetch data from Cloudflare Worker after multiple attempts: ${lastError?.message || 'Unknown error'}`);
}

// Enhanced LLMO audit flow
const enhancedLLMOAuditFlow = ai.defineFlow(
  {
    name: 'enhancedLLMOAuditFlow',
    inputSchema: EnhancedAuditInputSchema,
    outputSchema: EnhancedAuditOutputSchema,
  },
  async (input: EnhancedAuditInput) => {
    const { url, userAgent } = input;
    console.log('=== ENHANCED LLMO AUDIT FLOW STARTED ===');
    console.log('Input:', { url, userAgent });
    
    try {
      // Step 1: Fetch data from Cloudflare Worker
      console.log('Step 1: Fetching data from Cloudflare Worker...');
      const workerData = await fetchCloudflareWorkerData(url, userAgent);
      console.log('Cloudflare Worker data received:', workerData);
      
      // Step 2: Analyze the data with AI
      console.log('Step 2: Analyzing data with AI...');
      
      const prompt = ai.definePrompt({
        name: 'enhancedLLMOAuditPrompt',
        input: { schema: z.object({ workerData: CloudflareWorkerResponseSchema }) },
        output: { schema: EnhancedAuditOutputSchema },
        prompt: `You are an expert LLMO (Large Language Model Optimization) auditor. Analyze the technical data from a Cloudflare Worker crawl and provide comprehensive optimization recommendations.

## TECHNICAL DATA ANALYSIS
Analyze this crawled data: {{{workerData}}}

## AUDIT FRAMEWORK
Evaluate these key areas:

### 1. CRAWL & ACCESS (25% of score)
- robots.txt accessibility for AI bots
- llms.txt presence and configuration
- Redirect chain analysis
- Server response status and headers

### 2. CONTENT & SCHEMA (30% of score)
- JSON-LD structured data presence
- Schema type diversity and quality
- Content structure analysis (headings, paragraphs, lists)
- Meta tag optimization

### 3. E-E-A-T & READABILITY (25% of score)
- Author information and credibility
- Content depth and comprehensiveness
- Readability metrics and structure
- Trust signals and expertise indicators

### 4. OFF-SITE SIGNALS (20% of score)
- External link quality and relevance
- Citation potential and references
- Social media optimization
- Backlink analysis

## SCORING GUIDELINES
- 90-100: Excellent - Highly optimized for AI discovery
- 70-89: Good - Well optimized with minor improvements
- 50-69: Needs Improvement - Several optimization opportunities
- 0-49: Poor - Major LLMO issues requiring attention

## OUTPUT REQUIREMENTS
- Provide specific, actionable recommendations
- Include code examples where applicable
- Prioritize fixes by impact and difficulty
- Highlight both strengths and opportunities
- Give concrete next steps for improvement

Analyze the technical data thoroughly and provide comprehensive LLMO audit results.`,
      });
      
      const result = await prompt({ workerData });
      console.log('AI analysis completed:', result);
      
      return result.output!;
      
    } catch (error) {
      console.error('Enhanced LLMO Audit Flow failed:', error);
      
      // Provide user-friendly error messages
      let errorMessage = 'Failed to perform enhanced LLMO audit.';
      
      if (error instanceof Error) {
        if (error.message.includes('Rate limited')) {
          errorMessage = 'The service is currently experiencing high traffic. Please try again in a few minutes.';
        } else if (error.message.includes('Access denied')) {
          errorMessage = 'The website is blocking automated analysis. This may be due to security settings or rate limiting.';
        } else if (error.message.includes('doesn\'t exist') || error.message.includes('moved')) {
          errorMessage = 'The page you\'re trying to analyze doesn\'t exist or has been moved. Please check the URL and try again.';
        } else if (error.message.includes('Payment required')) {
          errorMessage = 'The target website requires payment or subscription to access this content.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'The analysis is taking longer than expected. This may be due to the website being slow or having complex content.';
        } else {
          errorMessage = `Analysis failed: ${error.message}`;
        }
      }
      
      throw new Error(errorMessage);
    }
  }
);

export { enhancedLLMOAuditFlow, type EnhancedAuditInput, type EnhancedAuditOutput, type CloudflareWorkerResponse }; 