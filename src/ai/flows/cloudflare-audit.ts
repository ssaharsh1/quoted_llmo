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
    robotsAllowsAI: z.boolean(),
    hasLLMsTxt: z.boolean(),
    hasStructuredData: z.boolean(),
    hasProperHeadings: z.boolean(),
    hasAuthorInfo: z.boolean(),
    hasMetaDescription: z.boolean(),
  }),
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
      hasTableOfContents: z.preprocess(
        (val) => typeof val === 'string' ? val === 'true' : val,
        z.boolean()
      ),
      hasFAQ: z.preprocess(
        (val) => typeof val === 'string' ? val === 'true' : val,
        z.boolean()
      ),
      hasCodeBlocks: z.number(),
    }).optional(),
    linkAnalysis: z.object({
      totalLinks: z.number(),
      externalLinks: z.number(),
      citationLinks: z.number(),
      hasReferences: z.preprocess(
        (val) => typeof val === 'string' ? val === 'true' : val,
        z.boolean()
      ),
      hasBibliography: z.preprocess(
        (val) => typeof val === 'string' ? val === 'true' : val,
        z.boolean()
      ),
    }).optional(),
    aiAccessibility: z.object({
      robotsAllowsAI: z.preprocess(
        (val) => typeof val === 'string' ? val === 'true' : val,
        z.boolean()
      ),
      hasLLMsTxt: z.preprocess(
        (val) => typeof val === 'string' ? val === 'true' : val,
        z.boolean()
      ),
      hasStructuredData: z.preprocess(
        (val) => typeof val === 'string' ? val === 'true' : val,
        z.boolean()
      ),
      hasProperHeadings: z.preprocess(
        (val) => typeof val === 'string' ? val === 'true' : val,
        z.boolean()
      ),
      hasAuthorInfo: z.preprocess(
        (val) => typeof val === 'string' ? val === 'true' : val,
        z.boolean()
      ),
      hasMetaDescription: z.preprocess(
        (val) => typeof val === 'string' ? val === 'true' : val,
        z.boolean()
      ),
    }).optional(),
    llmoAnalysis: z.object({
      hasArticleSchema: z.boolean().optional().default(false),
      hasPersonSchema: z.boolean().optional().default(false),
      hasBreadcrumbSchema: z.boolean().optional().default(false),
      hasFAQSchema: z.boolean().optional().default(false),
      hasHowToSchema: z.boolean().optional().default(false),
      hasProperMetaTags: z.any().transform((val) => {
        console.log('🔍 Transform hasProperMetaTags:', val, typeof val);
        if (val === undefined || val === null) {
          console.log('  → Value is undefined/null, returning false');
          return false;
        }
        if (typeof val === 'string') {
          console.log('  → Value is string, length:', val.length);
          // If it's a string, check if it's a boolean string first
          if (val === 'true' || val === '1' || val === 'yes') {
            console.log('  → Boolean string detected, returning true');
            return true;
          }
          if (val === 'false' || val === '0' || val === 'no') {
            console.log('  → Boolean string detected, returning false');
            return false;
          }
          // If it's not a boolean string, it's probably the actual meta description
          // In this case, we consider it "true" if it has content
          const result = val.length > 0;
          console.log('  → Meta description string detected, returning:', result);
          return result;
        }
        const result = Boolean(val);
        console.log('  → Non-string value, returning:', result);
        return result;
      }).optional().default(false),
      // Temporary: also handle other fields that might be strings
      hasCanonical: z.any().transform((val) => {
        console.log('🔍 Transform hasCanonical:', val, typeof val);
        if (val === undefined || val === null) return false;
        if (typeof val === 'string') {
          return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
        }
        return Boolean(val);
      }).optional().default(false),
      hasLanguageTag: z.any().transform((val) => {
        console.log('🔍 Transform hasLanguageTag:', val, typeof val);
        if (val === undefined || val === null) return false;
        if (typeof val === 'string') {
          return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
        }
        return Boolean(val);
      }).optional().default(false),
      contentReadability: z.any().transform((val) => {
        console.log('🔍 Transform contentReadability:', val, typeof val);
        if (val === undefined || val === null) return false;
        if (typeof val === 'string') {
          return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
        }
        return Boolean(val);
      }).optional().default(false),
      hasCitations: z.any().transform((val) => {
        console.log('🔍 Transform hasCitations:', val, typeof val);
        if (val === undefined || val === null) return false;
        if (typeof val === 'string') {
          return val === 'true' || val === '1' || val === 'yes' || val.length > 0;
        }
        return Boolean(val);
      }).optional().default(false),
    }).optional(),
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
  console.log('User agent being sent:', actualUserAgent);
  
  // Enhanced retry logic for rate limiting
  const maxRetries = 5; // Increased from 3 to 5
  const baseDelay = 3000; // Increased from 2000 to 3000ms
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Quoted-LLMO-Platform/1.0',
        },
      });
      
      console.log(`Cloudflare Worker response status (attempt ${attempt}):`, response.status);
      
      if (response.status === 429) {
        if (attempt < maxRetries) {
          // Exponential backoff with jitter
          const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
          console.log(`Rate limited (429). Retrying in ${Math.round(delay)}ms... (attempt ${attempt}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        } else {
          throw new Error('Rate limited by Cloudflare Worker. Please wait 2-3 minutes before trying again.');
        }
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Cloudflare Worker error response:', errorText);
        throw new Error(`Cloudflare Worker request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Raw Cloudflare Worker data:', JSON.stringify(data, null, 2));
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Debug: Check the specific field causing issues
      if (data.llmoAnalysis) {
        console.log('llmoAnalysis data:', JSON.stringify(data.llmoAnalysis, null, 2));
        console.log('hasProperMetaTags type:', typeof data.llmoAnalysis.hasProperMetaTags);
        console.log('hasProperMetaTags value:', data.llmoAnalysis.hasProperMetaTags);
      }
      
      // Debug: Check if we have the expected fields
      console.log('=== CLOUDFLARE WORKER DATA VALIDATION ===');
      console.log('Has metadata:', !!data.metadata);
      console.log('Has headings:', !!data.headings);
      console.log('Has schemaTypes:', Array.isArray(data.schemaTypes));
      console.log('Has contentStructure:', !!data.contentStructure);
      console.log('Has linkAnalysis:', !!data.linkAnalysis);
      console.log('Has aiAccessibility:', !!data.aiAccessibility);
      console.log('Has llmoAnalysis:', !!data.llmoAnalysis);
      
      // Validate the data structure
      console.log('🔍 About to validate data with schema...');
      console.log('🔍 Data before validation:', JSON.stringify(data, null, 2));
      const validatedData = CloudflareWorkerResponseSchema.parse(data);
      console.log('✅ Validation successful!');
      console.log('Validated Cloudflare Worker data:', JSON.stringify(validatedData, null, 2));
      
      return validatedData;
    } catch (error) {
      console.error(`Error fetching from Cloudflare Worker (attempt ${attempt}):`, error);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff with jitter)
      const waitTime = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
      console.log(`Retrying in ${Math.round(waitTime)}ms... (attempt ${attempt}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw new Error('Failed to fetch data from Cloudflare Worker after all retries');
}



const prompt = ai.definePrompt({
  name: 'enhancedLLMOAuditPrompt',
  input: { schema: z.object({
    workerData: CloudflareWorkerResponseSchema,
    userAgent: z.string(),
  })},
  output: { schema: EnhancedAuditOutputSchema },
  prompt: `You are an expert LLMO auditor specializing in Large Language Model Optimization. Your task is to analyze blog posts for their effectiveness in being discovered, understood, and cited by AI models like ChatGPT, Gemini, Perplexity, and Claude.

When analyzing the technical data from the Cloudflare Worker, focus on these four key areas:

1. **CRAWL & ACCESS** (25 points max):
   - Check if robots.txt blocks AI bots (gptbot, claude, perplexity)
   - Verify llms.txt exists and allows AI bot access
   - Assess redirect chain length (minimal is better)

2. **CONTENT & SCHEMA** (30 points max):
   - Evaluate author information and credibility
   - Check for Article, BlogPosting, or FAQPage schema
   - Assess meta description quality (120-160 chars optimal)
   - Verify proper heading hierarchy (1 H1, multiple H2s)

3. **E-E-A-T & READABILITY** (25 points max):
   - Evaluate expertise, experience, authoritativeness, trust
   - Check content structure and organization
   - Assess author credibility and content freshness
   - Verify meta description quality

4. **OFF-SITE SIGNALS** (20 points max):
   - Assess citation potential through content structure
   - Evaluate author attribution for credibility
   - Check meta description for visibility

For each category, provide:
- A score out of the maximum points (be consistent and deterministic)
- Status: pass/warning/fail
- Specific checks with status and impact
- Actionable recommendations

IMPORTANT: Use deterministic scoring based on the technical data:
- Crawl & Access (25 max): robots.txt allows AI bots (+10), llms.txt exists (+10), minimal redirects (+5)
- Content & Schema (30 max): has author (+5), has Article schema (+10), good meta description (+5), proper headings (+10)
- E-E-A-T (25 max): proper heading hierarchy (+10), author credibility (+5), content structure (+10)
- Off-site (20 max): Article schema (+10), author attribution (+5), good meta description (+5)

Calculate the exact score based on these criteria and be consistent.

Provide an overall score (0-100) and verdict (Excellent/Good/Needs Improvement/Poor).

For the summary, provide a brief, specific overview of the audit results that includes:
- The overall score and verdict
- 1-2 key findings from the technical analysis
- The primary user agent analyzed (if not comprehensive)
- A brief mention of the most important improvement needed

Example: "This blog post scored 78/100 (Good) for ChatGPT optimization. Technical analysis found proper robots.txt configuration but missing llms.txt file. The content has good heading structure but lacks Article schema markup. Primary improvement needed: Add llms.txt file for AI bot access."

Include prioritized fixes with impact levels and specific recommendations for the user agent specified.

Focus on actionable insights that help content creators optimize for AI model discovery and citation.`,
});

// Simple cache to prevent duplicate calls
const auditCache = new Map<string, EnhancedAuditOutput>();

// Enhanced deterministic result generator for consistent scoring
function generateMockResult(workerData: CloudflareWorkerResponse, userAgent: string): EnhancedAuditOutput {
  console.log('=== GENERATING MOCK RESULT ===');
  console.log('Worker data summary:', {
    url: workerData.postUrl,
    robotsTxt: workerData.robotsTxt.substring(0, 50) + '...',
    llmsStatus: workerData.llmsStatus,
    redirects: workerData.redirectChain.length,
    schemaTypes: workerData.schemaTypes.length,
    headings: {
      h1: workerData.headings.h1.length,
      h2: workerData.headings.h2.length
    },
    author: workerData.metadata.author,
    metaDesc: workerData.metadata.metaDescription?.substring(0, 30) + '...',
    hasArticleSchema: workerData.llmoAnalysis?.hasArticleSchema
  });
  
  // Calculate scores based on enhanced data
  let crawlScore = 0;
  let contentScore = 0;
  let readabilityScore = 0;
  let offsiteScore = 0;
  
  // 1. CRAWL & ACCESS SCORING (25 points max)
  const robotsTxt = workerData.robotsTxt.toLowerCase();
  const blocksLLMs = robotsTxt.includes('gptbot') && robotsTxt.includes('disallow') || 
                     robotsTxt.includes('claude') && robotsTxt.includes('disallow') ||
                     robotsTxt.includes('perplexity') && robotsTxt.includes('disallow');
  
  // Robots.txt analysis (10 points) - More lenient
  console.log('=== CRAWL SCORING DEBUG ===');
  console.log('Robots.txt:', robotsTxt.substring(0, 100) + '...');
  console.log('Blocks LLMs:', blocksLLMs);
  
  if (!blocksLLMs && robotsTxt !== 'not found') {
    crawlScore += 10; // Allows AI bots
    console.log('✅ Robots.txt allows AI bots: +10 points');
  } else if (robotsTxt.includes('allow') && robotsTxt.includes('gptbot')) {
    crawlScore += 8; // Partially allows
    console.log('✅ Robots.txt partially allows: +8 points');
  } else if (robotsTxt === 'not found' || robotsTxt === 'error') {
    crawlScore += 6; // No robots.txt = default allow
    console.log('✅ No robots.txt (default allow): +6 points');
  } else if (blocksLLMs) {
    crawlScore += 2; // Blocks but still accessible
    console.log('⚠️ Robots.txt blocks AI bots: +2 points');
  } else {
    crawlScore += 4; // Basic accessibility
    console.log('⚠️ Basic robots.txt: +4 points');
  }
  
  // LLMs.txt analysis (10 points) - More lenient
  if (workerData.llmsStatus === 'found') {
    crawlScore += 10; // Perfect
    console.log('✅ LLMs.txt found: +10 points');
  } else {
    crawlScore += 5; // Most sites don't have llms.txt yet, give partial credit
    console.log('⚠️ LLMs.txt not found: +5 points');
  }
  
  // Redirect chain analysis (5 points) - More lenient
  if (workerData.redirectChain.length === 1) {
    crawlScore += 5; // Direct access
    console.log('✅ Direct access (no redirects): +5 points');
  } else if (workerData.redirectChain.length <= 2) {
    crawlScore += 4; // Minimal redirects
    console.log('✅ Minimal redirects: +4 points');
  } else if (workerData.redirectChain.length <= 3) {
    crawlScore += 3; // Acceptable redirects
    console.log('⚠️ Acceptable redirects: +3 points');
  } else {
    crawlScore += 2; // Too many but still accessible
    console.log('⚠️ Too many redirects: +2 points');
  }
  
  // 2. CONTENT & SCHEMA SCORING (30 points max)
  const hasAuthor = workerData.metadata.author && workerData.metadata.author.trim().length > 0;
  
  // Author analysis (5 points) - More lenient
  console.log('=== CONTENT SCORING DEBUG ===');
  console.log('Author:', workerData.metadata.author);
  console.log('Has author:', hasAuthor);
  
  if (hasAuthor && workerData.metadata.author.length > 5) {
    contentScore += 5; // Good author name
    console.log('✅ Good author name: +5 points');
  } else if (hasAuthor && workerData.metadata.author.length > 3) {
    contentScore += 4; // Decent author name
    console.log('✅ Decent author name: +4 points');
  } else if (hasAuthor) {
    contentScore += 3; // Short author name
    console.log('⚠️ Short author name: +3 points');
  } else {
    contentScore += 1; // No author but still content
    console.log('⚠️ No author: +1 point');
  }
  
  // Enhanced schema analysis (15 points) - More lenient
  const hasArticleSchema = workerData.llmoAnalysis?.hasArticleSchema || 
                          workerData.schemaTypes.includes('Article') || 
                          workerData.schemaTypes.includes('BlogPosting') || 
                          workerData.schemaTypes.includes('FAQPage');
  const hasPersonSchema = workerData.llmoAnalysis?.hasPersonSchema;
  const hasFAQSchema = workerData.llmoAnalysis?.hasFAQSchema;
  const hasHowToSchema = workerData.llmoAnalysis?.hasHowToSchema;
  
  if (hasArticleSchema) {
    contentScore += 10; // Perfect schema
  } else if (workerData.schemaTypes.length > 0) {
    contentScore += 7; // Has some schema
  } else {
    contentScore += 3; // No schema but still content
  }
  
  // Multiple schema types and enhanced schema (5 points)
  let schemaBonus = 0;
  if (workerData.schemaTypes.length >= 3) schemaBonus += 3;
  else if (workerData.schemaTypes.length >= 2) schemaBonus += 2;
  else if (workerData.schemaTypes.length === 1) schemaBonus += 1;
  
  if (hasPersonSchema) schemaBonus += 1;
  if (hasFAQSchema) schemaBonus += 1;
  if (hasHowToSchema) schemaBonus += 1;
  
  contentScore += Math.min(schemaBonus, 5);
  
  // Enhanced meta description analysis (5 points) - More lenient
  const metaDesc = workerData.metadata.metaDescription;
  const hasOGTags = workerData.metadata.ogTitle && workerData.metadata.ogDescription;
  const hasCanonical = workerData.metadata.canonical;
  
  if (metaDesc && metaDesc.length >= 120 && metaDesc.length <= 160) {
    contentScore += 3; // Optimal length
  } else if (metaDesc && metaDesc.length >= 50 && metaDesc.length < 120) {
    contentScore += 2; // Decent length
  } else if (metaDesc && metaDesc.length > 160) {
    contentScore += 2; // Too long but still descriptive
  } else if (metaDesc && metaDesc.length > 0) {
    contentScore += 1; // Short but present
  } else {
    contentScore += 0; // No meta description
  }
  
  // Social media and canonical (2 points) - More lenient
  if (hasOGTags) contentScore += 1;
  if (hasCanonical) contentScore += 1;
  
  // Enhanced heading hierarchy (5 points) - More lenient
  if (workerData.headings.h1.length === 1 && workerData.headings.h2.length >= 2) {
    contentScore += 5; // Perfect hierarchy
  } else if (workerData.headings.h1.length === 1 && workerData.headings.h2.length > 0) {
    contentScore += 4; // Good hierarchy
  } else if (workerData.headings.h1.length === 1) {
    contentScore += 3; // Has H1 but needs H2s
  } else if (workerData.headings.h1.length > 0 || workerData.headings.h2.length > 0) {
    contentScore += 2; // Has some headings
  } else {
    contentScore += 1; // No headings but still content
  }
  
  // 3. E-E-A-T & READABILITY SCORING (25 points max)
  // Enhanced content structure and hierarchy (10 points) - More lenient
  if (workerData.headings.h1.length === 1 && workerData.headings.h2.length >= 2) {
    readabilityScore += 10; // Perfect hierarchy
  } else if (workerData.headings.h1.length === 1 && workerData.headings.h2.length > 0) {
    readabilityScore += 8; // Good hierarchy
  } else if (workerData.headings.h1.length === 1) {
    readabilityScore += 6; // Has H1 but needs H2s
  } else if (workerData.headings.h1.length > 0 || workerData.headings.h2.length > 0) {
    readabilityScore += 4; // Has some headings
  } else {
    readabilityScore += 2; // No headings but still content
  }
  
  // Enhanced author credibility (5 points) - More lenient
  if (hasAuthor && workerData.metadata.author.length > 5) {
    readabilityScore += 5; // Good author name
  } else if (hasAuthor && workerData.metadata.author.length > 3) {
    readabilityScore += 4; // Decent author name
  } else if (hasAuthor) {
    readabilityScore += 3; // Short author name
  } else {
    readabilityScore += 1; // No author but still content
  }
  
  // Enhanced content structure quality (5 points) - More lenient
  const hasGoodContentStructure = workerData.headings.h1.length > 0 && workerData.headings.h2.length > 0;
  const hasTableOfContents = workerData.contentStructure?.hasTableOfContents;
  const hasFAQ = workerData.contentStructure?.hasFAQ;
  const hasCodeBlocks = workerData.contentStructure?.hasCodeBlocks > 0;
  
  if (hasGoodContentStructure) {
    readabilityScore += 3; // Structured content
  } else if (workerData.headings.h1.length > 0 || workerData.headings.h2.length > 0) {
    readabilityScore += 2; // Some structure
  } else {
    readabilityScore += 1; // Basic content
  }
  
  // Content quality bonuses (2 points) - More lenient
  if (hasTableOfContents) readabilityScore += 1;
  if (hasFAQ || hasCodeBlocks) readabilityScore += 1;
  
  // Enhanced meta description quality (5 points) - More lenient
  if (metaDesc && metaDesc.length >= 120 && metaDesc.length <= 160) {
    readabilityScore += 3; // Optimal meta description
  } else if (metaDesc && metaDesc.length >= 50) {
    readabilityScore += 2; // Decent meta description
  } else if (metaDesc && metaDesc.length > 0) {
    readabilityScore += 1; // Short meta description
  } else {
    readabilityScore += 0; // No meta description
  }
  
  // Language and accessibility (2 points)
  const hasLanguage = workerData.metadata.language;
  const hasKeywords = workerData.metadata.keywords;
  if (hasLanguage) readabilityScore += 1;
  if (hasKeywords) readabilityScore += 1;
  
  // 4. OFF-SITE SIGNALS SCORING (20 points max)
  // Enhanced article schema for citations (10 points) - More lenient
  if (hasArticleSchema) {
    offsiteScore += 10; // Best for citations
  } else if (workerData.schemaTypes.length > 0) {
    offsiteScore += 7; // Has some schema
  } else {
    offsiteScore += 3; // No schema but still content
  }
  
  // Enhanced author attribution (5 points) - More lenient
  if (hasAuthor && workerData.metadata.author.length > 5) {
    offsiteScore += 5; // Good author attribution
  } else if (hasAuthor && workerData.metadata.author.length > 3) {
    offsiteScore += 4; // Decent author attribution
  } else if (hasAuthor) {
    offsiteScore += 3; // Basic author attribution
  } else {
    offsiteScore += 1; // No author but still content
  }
  
  // Enhanced meta description and social signals (5 points) - More lenient
  if (metaDesc && metaDesc.length >= 120 && metaDesc.length <= 160) {
    offsiteScore += 3; // Optimal meta description
  } else if (metaDesc && metaDesc.length >= 50) {
    offsiteScore += 2; // Decent meta description
  } else if (metaDesc && metaDesc.length > 0) {
    offsiteScore += 1; // Short meta description
  } else {
    offsiteScore += 0; // No meta description
  }
  
  // Social media and citation signals (2 points) - More lenient
  const hasCitations = workerData.linkAnalysis?.hasReferences || workerData.linkAnalysis?.hasBibliography;
  const hasExternalLinks = workerData.linkAnalysis?.externalLinks > 0;
  
  if (hasOGTags) offsiteScore += 1;
  if (hasCitations || hasExternalLinks) offsiteScore += 1;
  
  const overallScore = Math.round(crawlScore + contentScore + readabilityScore + offsiteScore);
  
  console.log('=== SCORE BREAKDOWN ===');
  console.log('Crawl Score:', crawlScore, '/25');
  console.log('Content Score:', contentScore, '/30');
  console.log('Readability Score:', readabilityScore, '/25');
  console.log('Offsite Score:', offsiteScore, '/20');
  console.log('Overall Score:', overallScore, '/100');
  
  // Debug: Check if this looks like fallback data
  const isFallbackData = workerData.metadata.title === 'Unknown' && 
                        workerData.headings.h1.length === 0 && 
                        workerData.schemaTypes.length === 0;
  
  if (isFallbackData) {
    console.log('🚨 WARNING: This appears to be FALLBACK data (all zeros)');
    console.log('🚨 Scores will be artificially low (28-41/100)');
  } else {
    console.log('✅ Using REAL Cloudflare Worker data');
  }
  
  return {
    overall_score: overallScore,
    verdict: overallScore >= 90 ? 'Excellent' : overallScore >= 70 ? 'Good' : overallScore >= 50 ? 'Needs Improvement' : 'Poor',
    summary: `This blog post scored ${overallScore}/100 (${overallScore >= 90 ? 'Excellent' : overallScore >= 70 ? 'Good' : overallScore >= 50 ? 'Needs Improvement' : 'Poor'}) for ${userAgent === 'llm-comprehensive' ? 'comprehensive AI model optimization' : `${userAgent} optimization`}. Technical analysis completed with detailed recommendations for improvement.`,
    categories: {
      crawl_access: {
        name: 'Crawl & Access',
        score: crawlScore,
        status: crawlScore >= 20 ? 'pass' : crawlScore >= 15 ? 'warning' : 'fail',
        checks: [
          { name: 'Robots.txt Access', status: !blocksLLMs ? 'pass' : 'fail', message: !blocksLLMs ? 'Robots.txt allows AI bots' : 'Robots.txt blocks AI bots', impact: 'high' },
          { name: 'LLMs.txt Status', status: workerData.llmsStatus === 'found' ? 'pass' : 'fail', message: workerData.llmsStatus === 'found' ? 'LLMs.txt found' : 'LLMs.txt missing', impact: 'high' }
        ],
        recommendations: workerData.llmsStatus === 'found' ? ['LLMs.txt is properly configured'] : ['Add llms.txt file for AI bot access']
      },
      content_schema: {
        name: 'Content & Schema',
        score: contentScore,
        status: contentScore >= 24 ? 'pass' : contentScore >= 18 ? 'warning' : 'fail',
        checks: [
          { name: 'Schema Markup', status: workerData.schemaTypes.length > 0 ? 'pass' : 'fail', message: workerData.schemaTypes.length > 0 ? `Found ${workerData.schemaTypes.length} schema types` : 'No schema markup found', impact: 'medium' }
        ],
        recommendations: workerData.schemaTypes.length > 0 ? ['Schema markup is present'] : ['Add comprehensive schema markup']
      },
      eat_readability: {
        name: 'E-E-A-T & Readability',
        score: readabilityScore,
        status: readabilityScore >= 20 ? 'pass' : readabilityScore >= 15 ? 'warning' : 'fail',
        checks: [
          { name: 'Heading Structure', status: workerData.headings.h1.length === 1 && workerData.headings.h2.length > 0 ? 'pass' : 'warning', message: `H1: ${workerData.headings.h1.length}, H2: ${workerData.headings.h2.length}`, impact: 'high' }
        ],
        recommendations: ['Improve content authority signals']
      },
      offsite_signals: {
        name: 'Off-site Signals',
        score: offsiteScore,
        status: offsiteScore >= 15 ? 'pass' : offsiteScore >= 10 ? 'warning' : 'fail',
        checks: [
          { name: 'Content Structure', status: hasArticleSchema ? 'pass' : 'fail', message: hasArticleSchema ? 'Article schema present' : 'No article schema found', impact: 'high' },
          { name: 'Author Attribution', status: hasAuthor ? 'pass' : 'fail', message: hasAuthor ? 'Author information present' : 'Author information missing', impact: 'medium' }
        ],
        recommendations: hasArticleSchema ? ['Content structure supports citations'] : ['Add article schema for better citation potential']
      }
    },
         priority_fixes: [
       ...(workerData.llmsStatus === 'not_found' ? [{
         title: 'Add llms.txt file for AI bot access',
         impact: 'high' as const,
         description: 'Create a llms.txt file to explicitly allow AI bot access',
         difficulty: 'easy' as const,
         code_example: 'User-agent: GPTBot\nAllow: /'
       }] : []),
       ...(blocksLLMs ? [{
         title: 'Update robots.txt to allow AI bots',
         impact: 'high' as const,
         description: 'Remove blocks for GPTBot, Claude, and Perplexity from robots.txt',
         difficulty: 'easy' as const,
         code_example: 'User-agent: GPTBot\nAllow: /'
       }] : []),
       ...(!hasArticleSchema ? [{
         title: 'Add Article schema markup',
         impact: 'high' as const,
         description: 'Add Article, BlogPosting, or FAQPage schema for better AI understanding',
         difficulty: 'medium' as const
       }] : []),
       ...(!hasAuthor ? [{
         title: 'Add author information',
         impact: 'medium' as const,
         description: 'Include author name and credentials for better E-E-A-T signals',
         difficulty: 'easy' as const
       }] : []),
       {
         title: userAgent === 'llm-comprehensive' ? 'Optimize for all major AI models' : `Optimize specifically for ${userAgent}`,
         impact: 'high' as const,
         description: userAgent === 'llm-comprehensive' ? 'Implement recommendations for ChatGPT, Perplexity, Claude, and Gemini' : `Focus on ${userAgent}-specific optimizations`,
         difficulty: 'medium' as const
       }
     ],
    strengths: [
      !blocksLLMs ? 'robots.txt allows AI bot access' : 'Basic robots.txt configuration',
      workerData.llmsStatus === 'found' ? 'llms.txt properly configured' : 'Basic accessibility in place',
      workerData.redirectChain.length <= 2 ? 'Minimal redirect chain' : 'Redirects handled',
      hasArticleSchema ? 'Article schema markup present' : 'Basic content structure',
      hasAuthor ? 'Author information included' : 'Content structure in place',
      metaDesc && metaDesc.length >= 120 ? 'Good meta description length' : 'Meta description present',
      workerData.headings.h1.length === 1 ? 'Proper H1 structure' : 'Content structure present',
      workerData.headings.h2.length >= 2 ? 'Good heading hierarchy' : 'Basic content organization',
      hasArticleSchema ? 'Content structure supports citations' : 'Basic content format'
    ],
    opportunities: [
      workerData.llmsStatus === 'not_found' ? 'Add llms.txt file for AI bot access' : 'Enhance llms.txt configuration',
      blocksLLMs ? 'Update robots.txt to allow AI bots' : 'Optimize robots.txt for AI models',
      !hasArticleSchema ? 'Add Article schema markup' : 'Expand schema markup',
      !hasAuthor ? 'Add author information and credentials' : 'Enhance author attribution',
      workerData.headings.h1.length !== 1 ? 'Fix heading hierarchy' : 'Optimize heading structure'
    ],
    technical_insights: {
      redirects: workerData.redirectChain.length,
      robots_accessible: workerData.robotsTxt.includes('GPTBot') || workerData.robotsTxt.includes('Claude'),
      llms_txt_present: workerData.llmsStatus === 'found',
      schema_types_found: workerData.schemaTypes,
      heading_structure: {
        h1_count: workerData.headings.h1.length,
        h2_count: workerData.headings.h2.length,
        proper_hierarchy: workerData.headings.h1.length === 1 && workerData.headings.h2.length > 0
      },
      contentStructure: workerData.contentStructure,
      linkAnalysis: workerData.linkAnalysis,
      aiAccessibility: workerData.aiAccessibility,
      llmoAnalysis: workerData.llmoAnalysis
    }
  };
}

export const enhancedLLMOAuditFlow = async (input: EnhancedAuditInput): Promise<EnhancedAuditOutput> => {
  console.log('=== ENHANCED AUDIT FLOW STARTED ===');
  console.log('Enhanced Audit - Input received:', input);
  
  // Check environment variables
  console.log('Enhanced Audit - Environment check:', {
    GOOGLE_GENAI_API_KEY: process.env.GOOGLE_GENAI_API_KEY ? 'SET' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
  });
  
  // Normalize URL for consistent caching (remove www if present)
  const normalizedUrl = input.url.replace(/^https?:\/\/(www\.)?/, 'https://');
  console.log('Enhanced Audit - Normalized URL:', normalizedUrl, 'from original:', input.url);
  
  // Create cache key with normalized URL
  const cacheKey = `${normalizedUrl}-${input.userAgent}`;
  
  // Check cache first
  if (auditCache.has(cacheKey)) {
    console.log('Enhanced Audit - Returning cached result');
    console.log('Enhanced Audit - Cache key:', cacheKey);
    return auditCache.get(cacheKey)!;
  }
  
  console.log('Enhanced Audit - No cached result, performing fresh audit');
  console.log('Enhanced Audit - Cache key:', cacheKey);
  
  // For debugging: Clear cache to force fresh results
  auditCache.clear();
  console.log('Enhanced Audit - Cache cleared for debugging');
  
  try {
    console.log('Enhanced Audit - Starting for URL:', input.url, 'with user agent:', input.userAgent);
    
    // Fetch technical data from Cloudflare Worker using normalized URL
    console.log('Enhanced Audit - Calling Cloudflare Worker...');
    console.log('Enhanced Audit - Original URL:', input.url);
    console.log('Enhanced Audit - Normalized URL:', normalizedUrl);
    let workerData: CloudflareWorkerResponse;
    
    try {
      workerData = await fetchCloudflareWorkerData(normalizedUrl, input.userAgent);
      console.log('Enhanced Audit - ✅ REAL Cloudflare Worker data received successfully');
      console.log('Enhanced Audit - Worker data source: REAL CLOUDFLARE WORKER');
      console.log('Enhanced Audit - Worker data:', JSON.stringify(workerData, null, 2));
    } catch (error) {
      console.error('Enhanced Audit - ❌ Cloudflare Worker failed:', error);
      console.error('Enhanced Audit - Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        type: error instanceof Error ? error.constructor.name : 'Unknown'
      });
      
      // Provide user-friendly error messages based on the type of failure
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('403')) {
        throw new Error(`This site appears to be blocking automated analysis. This is common for government sites, financial institutions, or sites with strict security settings. Try a different URL or contact the site administrator if you need to analyze this specific page.`);
      } else if (errorMessage.includes('402')) {
        throw new Error(`This site requires payment or subscription to access its content. Paywall sites cannot be analyzed by our automated system. Try a different URL that doesn't require payment.`);
      } else if (errorMessage.includes('404')) {
        throw new Error(`The page you're trying to analyze doesn't exist or has been moved. Please check the URL and try again.`);
      } else if (errorMessage.includes('429')) {
        throw new Error(`We're receiving too many requests from this site. Please wait a moment and try again.`);
      } else {
        throw new Error(`Unable to analyze this site at the moment. This could be due to temporary network issues or the site being temporarily unavailable. Please try again in a few minutes.`);
      }
    }
    
    // Always use deterministic scoring for consistent results
    console.log('Enhanced Audit - Using deterministic scoring for consistent results');
    const deterministicResult = generateMockResult(workerData, input.userAgent);
    auditCache.set(cacheKey, deterministicResult);
    return deterministicResult;
  } catch (error) {
    console.error('Enhanced LLMO Audit Error Details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      url: input.url,
      userAgent: input.userAgent,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown'
    });
    
    // Check if it's a rate limiting error
    if (error instanceof Error && error.message.includes('Rate limited')) {
      throw new Error('Our servers are a bit busy right now. Please try again in a few minutes.');
    }
    
    // Check if it's a network error
    if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('network'))) {
      throw new Error('We\'re having trouble connecting to our analysis service. Please check your internet connection and try again.');
    }
    
    // If it's already a user-friendly error, just re-throw it
    if (error instanceof Error && (
      error.message.includes('blocking automated analysis') ||
      error.message.includes('requires payment') ||
      error.message.includes('doesn\'t exist') ||
      error.message.includes('too many requests') ||
      error.message.includes('Unable to analyze this site')
    )) {
      throw error;
    }
    
    throw new Error('We encountered an unexpected issue while analyzing this site. Please try again in a moment.');
  }
};

// Export types for use in other files
export type { EnhancedAuditInput, EnhancedAuditOutput, CloudflareWorkerResponse }; 