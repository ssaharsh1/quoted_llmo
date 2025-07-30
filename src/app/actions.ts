'use server';

import { z } from 'zod';
import { auditBlogPost, batchAuditBlogPosts, type AuditBlogPostOutput, type BatchAuditOutput } from '@/ai/flows/audit-blog-post';
import { enhancedLLMOAuditFlow, type EnhancedAuditOutput } from '@/ai/flows/cloudflare-audit';



const FormSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

const EnhancedFormSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  userAgent: z.enum([
    'llm-comprehensive',
    'gptbot', 
    'perplexitybot',
    'claude-web',
    'gemini',
    'chrome',
    'googlebot',
    'bingbot'
  ]).default('llm-comprehensive'),
});

export type AuditState = {
  error?: {
    url?: string[];
  } | null;
  message?: string | null;
  data?: AuditBlogPostOutput | null;
};

export type EnhancedAuditState = {
  error?: {
    url?: string[];
    userAgent?: string[];
  } | null;
  message?: string | null;
  data?: EnhancedAuditOutput | null;
};

export async function auditUrlAction(
  prevState: AuditState,
  formData: FormData,
): Promise<AuditState> {
  const validatedFields = FormSchema.safeParse({
    url: formData.get('url'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid URL provided.',
      data: null,
    };
  }

  try {
    const result = await auditBlogPost({ url: validatedFields.data.url });
    return {
      message: null,
      error: null,
      data: result,
    };
  } catch (error) {
    console.error('Audit Error:', error);
    return {
      message: 'Failed to audit the blog post. Please try again later.',
      error: null,
      data: null,
    };
  }
}

// Batch audit types and actions
const BatchFormSchema = z.object({
  urls: z.string().min(1, { message: 'Please enter at least one URL.' }),
});

export type BatchAuditState = {
  error?: {
    urls?: string[];
  } | null;
  message?: string | null;
  data?: BatchAuditOutput | null;
  isProcessing?: boolean;
};

export async function batchAuditUrlsAction(
  prevState: BatchAuditState,
  formData: FormData,
): Promise<BatchAuditState> {
  const rawUrls = formData.get('urls') as string;
  
  const validatedFields = BatchFormSchema.safeParse({
    urls: rawUrls,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Please provide valid URLs.',
      data: null,
    };
  }

  // Parse URLs from text area (one per line)
  const urlList = rawUrls
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0);

  if (urlList.length === 0) {
    return {
      message: 'Please enter at least one URL.',
      error: null,
      data: null,
    };
  }

  if (urlList.length > 10) {
    return {
      message: 'Maximum 10 URLs allowed per batch.',
      error: null,
      data: null,
    };
  }

  // Validate each URL
  const invalidUrls = urlList.filter(url => {
    try {
      new URL(url);
      return false;
    } catch {
      return true;
    }
  });

  if (invalidUrls.length > 0) {
    return {
      message: `Invalid URLs found: ${invalidUrls.join(', ')}`,
      error: null,
      data: null,
    };
  }

  try {
    const result = await batchAuditBlogPosts({ urls: urlList });
    return {
      message: null,
      error: null,
      data: result,
    };
  } catch (error) {
    console.error('Batch Audit Error:', error);
    return {
      message: 'Failed to process batch audit. Please try again later.',
      error: null,
      data: null,
    };
  }
}

export async function enhancedAuditUrlAction(
  prevState: EnhancedAuditState,
  formData: FormData,
): Promise<EnhancedAuditState> {
  console.log('=== ENHANCED AUDIT ACTION STARTED ===');
  let validatedFields: any = null;
  
  try {
    console.log('Enhanced Audit Action - Form data received');
    
    validatedFields = EnhancedFormSchema.safeParse({
      url: formData.get('url'),
      userAgent: formData.get('userAgent') || 'llm-comprehensive',
    });
    
    console.log('Enhanced Audit Action - Validation result:', validatedFields.success);
    
    if (!validatedFields.success) {
      console.log('Enhanced Audit Action - Validation failed');
      return {
        error: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid form data provided.',
        data: null,
      };
    }

    console.log('Enhanced Audit Action - About to call AI flow with:', validatedFields.data);
    
    const result = await enhancedLLMOAuditFlow({
      url: validatedFields.data.url,
      userAgent: validatedFields.data.userAgent,
    });
    
    console.log('Enhanced Audit Action - AI flow completed successfully');
    console.log('Enhanced Audit Action - Result score:', result.overall_score);
    console.log('Enhanced Audit Action - Result verdict:', result.verdict);

    return {
      message: null,
      error: null,
      data: result,
    };
  } catch (error) {
    console.error('Enhanced Audit Error Details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      validatedFields: validatedFields?.success ? validatedFields.data : 'Validation failed'
    });
    // Check if it's a rate limiting error
    if (error instanceof Error && error.message.includes('Rate limited')) {
      return {
        message: 'The audit service is currently experiencing high traffic. Please wait 2-3 minutes and try again. This is a temporary issue with our Cloudflare Worker rate limits.',
        error: null,
        data: null,
      };
    }
    
    return {
      message: `Failed to perform enhanced audit: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: null,
      data: null,
    };
  }
}
