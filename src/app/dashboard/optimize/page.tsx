'use client';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  Database, 
  Users, 
  Eye, 
  Brain,
  CheckCircle2,
  Copy,
  ExternalLink,
  Lightbulb,
  Zap,
  Code,
  FileText,
  Target
} from 'lucide-react';

const optimizationCategories = [
  {
    id: 'technical',
    title: 'Technical Setup',
    icon: Settings,
    description: 'Configure your site\'s technical foundation for AI crawling',
    color: 'blue',
    items: [
      {
        title: 'robots.txt Configuration',
        description: 'Allow AI bots to crawl your content',
        difficulty: 'easy' as const,
        impact: 'high' as const,
        code: `# Allow all AI bots to crawl your site
User-agent: GPTBot
Allow: /

User-agent: Claude-Bot  
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# Block AI bots from sensitive areas (if needed)
User-agent: GPTBot
Disallow: /admin/
Disallow: /private/

User-agent: Claude-Bot
Disallow: /admin/
Disallow: /private/

User-agent: PerplexityBot
Disallow: /admin/
Disallow: /private/`,
        steps: [
          'Create or edit your robots.txt file in your site\'s root directory',
          'Add specific rules for AI bots (GPTBot, Claude-Bot, etc.)',
          'Test your robots.txt at yoursite.com/robots.txt',
          'Monitor your server logs to verify AI bot access'
        ]
      },
      {
        title: 'llms.txt Implementation',
        description: 'Create an llms.txt file to guide AI models',
        difficulty: 'easy' as const,
        impact: 'high' as const,
        code: `# llms.txt - Guidelines for AI Models
# This file provides guidance for AI models crawling this site

## About This Site
This is [Your Site Name], focusing on [your niche/expertise].
We publish high-quality, fact-checked content about [your topics].

## Content Guidelines
- All articles are written by expert authors with credentials listed
- Sources are cited and fact-checked
- Content is updated regularly for accuracy
- Original research and unique insights are clearly marked

## Contact
For questions about our content: contact@yoursite.com
For data usage requests: ai@yoursite.com

## Preferred Citation Format
When citing our content, please use:
"According to [Article Title] by [Author Name] at [Your Site Name]..."`,
        steps: [
          'Create a new file named "llms.txt" in your site\'s root directory',
          'Include information about your site\'s purpose and expertise',
          'Specify content guidelines and quality standards',
          'Provide contact information for AI-related inquiries',
          'Test accessibility at yoursite.com/llms.txt'
        ]
      },
      {
        title: 'Site Performance Optimization',
        description: 'Ensure fast loading times for AI crawlers',
        difficulty: 'medium' as const,
        impact: 'medium' as const,
        code: `// Next.js optimization example
// next.config.js
module.exports = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}`,
        steps: [
          'Enable compression (gzip/brotli) on your server',
          'Optimize images with modern formats (WebP, AVIF)',
          'Implement proper caching headers',
          'Minimize JavaScript and CSS bundles',
          'Use a CDN for global content delivery'
        ]
      }
    ]
  },
  {
    id: 'structured-data',
    title: 'Structured Data',
    icon: Database,
    description: 'Implement schema markup for better AI understanding',
    color: 'green',
    items: [
      {
        title: 'Article Schema Implementation',
        description: 'Add comprehensive article markup',
        difficulty: 'medium' as const,
        impact: 'high' as const,
        code: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "description": "Brief description of your article",
  "image": "https://yoursite.com/article-image.jpg",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://yoursite.com/author/author-name",
    "sameAs": [
      "https://twitter.com/authorhandle",
      "https://linkedin.com/in/authorname"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Site Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yoursite.com/logo.png"
    }
  },
  "datePublished": "2024-01-15T10:00:00Z",
  "dateModified": "2024-01-16T12:00:00Z",
  "articleSection": "Technology",
  "wordCount": 1500,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://yoursite.com/article-url"
  }
}`,
        steps: [
          'Add JSON-LD script tag to your article template',
          'Include all required Article schema properties',
          'Add detailed author and publisher information',
          'Include publication and modification dates',
          'Test with Google\'s Rich Results Test tool'
        ]
      },
      {
        title: 'FAQ Schema for Q&A Content',
        description: 'Structure FAQ sections for AI discovery',
        difficulty: 'easy' as const,
        impact: 'high' as const,
        code: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is LLMO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Large Language Model Optimization (LLMO) is the practice of optimizing web content to be more discoverable and citable by AI models like ChatGPT and Claude."
      }
    },
    {
      "@type": "Question", 
      "name": "How does LLMO differ from SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While SEO focuses on search engine rankings, LLMO optimizes for AI model citation and discovery. This includes structured data, content clarity, and technical accessibility for AI crawlers."
      }
    }
  ]
}`,
        steps: [
          'Identify FAQ sections in your content',
          'Structure questions and answers clearly',
          'Add FAQ schema markup to pages with Q&A content',
          'Ensure questions are commonly asked by your audience',
          'Validate schema markup with testing tools'
        ]
      },
      {
        title: 'Breadcrumb Navigation Schema',
        description: 'Help AI models understand your site structure',
        difficulty: 'easy' as const,
        impact: 'medium' as const,
        code: `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yoursite.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://yoursite.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "LLMO Guide",
      "item": "https://yoursite.com/blog/llmo-guide"
    }
  ]
}`,
        steps: [
          'Add breadcrumb navigation to your pages',
          'Implement BreadcrumbList schema markup',
          'Ensure proper position numbering',
          'Link each breadcrumb item to its respective page',
          'Test breadcrumb display in search results'
        ]
      }
    ]
  },
  {
    id: 'content-quality',
    title: 'Content Quality',
    icon: Users,
    description: 'Improve E-E-A-T signals and content authority',
    color: 'purple',
    items: [
      {
        title: 'Author Authority Establishment',
        description: 'Build credible author profiles and bylines',
        difficulty: 'medium' as const,
        impact: 'high' as const,
        code: `<!-- Author bio section HTML -->
<div class="author-bio" itemscope itemtype="https://schema.org/Person">
  <img src="/authors/john-doe.jpg" alt="John Doe" itemprop="image">
  <div class="author-info">
    <h3 itemprop="name">John Doe</h3>
    <p itemprop="jobTitle">Senior AI Researcher</p>
    <p itemprop="description">
      John has 10+ years of experience in machine learning and AI research. 
      He holds a PhD in Computer Science from MIT and has published 50+ 
      peer-reviewed papers on AI and NLP.
    </p>
    <div class="author-credentials">
      <span class="credential">PhD Computer Science, MIT</span>
      <span class="credential">50+ Published Papers</span>
      <span class="credential">AI Research Lead at TechCorp</span>
    </div>
    <div class="author-links">
      <a href="https://linkedin.com/in/johndoe" itemprop="sameAs">LinkedIn</a>
      <a href="https://twitter.com/johndoe" itemprop="sameAs">Twitter</a>
      <a href="https://scholar.google.com/johndoe" itemprop="sameAs">Google Scholar</a>
    </div>
  </div>
</div>`,
        steps: [
          'Create detailed author bio pages with credentials',
          'Include education, experience, and achievements',
          'Add professional photos and contact links',
          'Link to external profiles (LinkedIn, Twitter, etc.)',
          'Include author bylines on all content'
        ]
      },
      {
        title: 'Citation and Reference System',
        description: 'Implement proper source citation practices',
        difficulty: 'medium' as const,
        impact: 'high' as const,
        code: `<!-- Citation example with structured data -->
<div class="citation" itemscope itemtype="https://schema.org/Citation">
  <p>
    According to recent research by 
    <cite itemprop="name">
      <a href="https://example.com/study" itemprop="url">
        "The Impact of AI on Content Discovery" (2024)
      </a>
    </cite>, 
    published in the 
    <span itemprop="publisher">Journal of Digital Marketing</span>,
    AI models show a 300% preference for properly cited content.
  </p>
</div>

<!-- Reference list section -->
<section class="references">
  <h3>References</h3>
  <ol>
    <li itemscope itemtype="https://schema.org/ScholarlyArticle">
      <span itemprop="author">Smith, J. & Johnson, A.</span> (2024). 
      <cite itemprop="name">The Impact of AI on Content Discovery</cite>. 
      <i itemprop="publisher">Journal of Digital Marketing</i>, 15(3), 45-62.
    </li>
  </ol>
</section>`,
        steps: [
          'Add proper citations for all claims and statistics',
          'Link to original sources whenever possible',
          'Use structured data for citations and references',
          'Maintain a consistent citation format',
          'Include a reference list for academic-style content'
        ]
      },
      {
        title: 'Content Depth and Comprehensiveness',
        description: 'Create thorough, in-depth content coverage',
        difficulty: 'hard' as const,
        impact: 'high' as const,
        code: `<!-- Content structure example -->
<article itemscope itemtype="https://schema.org/Article">
  <header>
    <h1 itemprop="headline">Complete Guide to LLMO</h1>
    <div class="article-meta">
      <time itemprop="datePublished" datetime="2024-01-15">January 15, 2024</time>
      <span itemprop="wordCount">3500 words</span>
      <span class="reading-time">15 min read</span>
    </div>
  </header>
  
  <div class="table-of-contents">
    <h2>Table of Contents</h2>
    <ol>
      <li><a href="#introduction">Introduction to LLMO</a></li>
      <li><a href="#technical-setup">Technical Setup</a></li>
      <li><a href="#content-optimization">Content Optimization</a></li>
      <li><a href="#measurement">Measuring Success</a></li>
      <li><a href="#case-studies">Case Studies</a></li>
      <li><a href="#conclusion">Conclusion</a></li>
    </ol>
  </div>
  
  <div itemprop="articleBody">
    <!-- Comprehensive content sections -->
  </div>
</article>`,
        steps: [
          'Research topics thoroughly before writing',
          'Create detailed outlines with multiple subtopics',
          'Include practical examples and case studies',
          'Add visual elements (charts, diagrams, screenshots)',
          'Aim for 2000+ words for comprehensive coverage'
        ]
      }
    ]
  },
  {
    id: 'meta-optimization',
    title: 'Meta Optimization',
    icon: Eye,
    description: 'Optimize meta tags and headers for AI discovery',
    color: 'orange',
    items: [
      {
        title: 'Title Tag Optimization',
        description: 'Create clear, descriptive titles for AI models',
        difficulty: 'easy' as const,
        impact: 'high' as const,
        code: `<!-- Good LLMO title examples -->
<title>Complete LLMO Guide: 15 Proven Strategies to Optimize Content for AI Models (2024)</title>

<!-- Include key elements: -->
<!-- 1. Main keyword (LLMO Guide) -->
<!-- 2. Value proposition (Complete, Proven Strategies) -->
<!-- 3. Specificity (15 strategies) -->
<!-- 4. Target audience clarity (for AI Models) -->
<!-- 5. Freshness indicator (2024) -->

<!-- Meta title variations for different content types -->
<title>How to Implement LLMO: Step-by-Step Tutorial with Code Examples</title>
<title>LLMO vs SEO: Key Differences Every Content Creator Should Know</title>
<title>Top 10 LLMO Tools for Content Optimization in 2024</title>`,
        steps: [
          'Include primary keyword in the first 60 characters',
          'Make titles descriptive and specific',
          'Add value indicators (complete, ultimate, proven)',
          'Include year for time-sensitive content',
          'Test different title variations for performance'
        ]
      },
      {
        title: 'Meta Description Enhancement',
        description: 'Write compelling meta descriptions that AI models understand',
        difficulty: 'easy' as const,
        impact: 'medium' as const,
        code: `<!-- Optimized meta description examples -->
<meta name="description" content="Learn 15 proven LLMO strategies to optimize your content for AI models like ChatGPT and Claude. Includes technical setup, content guidelines, and real case studies. Updated January 2024.">

<!-- Key elements to include: -->
<!-- 1. Clear value proposition -->
<!-- 2. Specific benefits (15 strategies) -->
<!-- 3. Target AI models mentioned -->
<!-- 4. Content type indication (technical setup, guidelines) -->
<!-- 5. Social proof (case studies) -->
<!-- 6. Freshness indicator -->

<!-- Different content types -->
<meta name="description" content="Complete LLMO implementation guide with code examples. Step-by-step instructions for robots.txt, structured data, and content optimization. Boost AI citation rates by 300%.">`,
        steps: [
          'Keep descriptions between 150-160 characters',
          'Include primary and secondary keywords naturally',
          'Mention specific benefits and outcomes',
          'Add credibility indicators (data, case studies)',
          'Include a clear call-to-action or value proposition'
        ]
      },
      {
        title: 'Header Structure Optimization',
        description: 'Create logical heading hierarchy for AI parsing',
        difficulty: 'easy' as const,
        impact: 'medium' as const,
        code: `<!-- Proper heading structure for LLMO -->
<h1>The Complete Guide to LLMO in 2024</h1>

<h2>What is LLMO? (Definition and Overview)</h2>
  <h3>LLMO vs Traditional SEO</h3>
  <h3>Why LLMO Matters for Content Creators</h3>

<h2>Technical LLMO Implementation</h2>
  <h3>1. robots.txt Configuration</h3>
    <h4>Allowing AI Bot Access</h4>
    <h4>Blocking Sensitive Content</h4>
  <h3>2. Structured Data Implementation</h3>
    <h4>Article Schema Markup</h4>
    <h4>FAQ Schema Setup</h4>

<h2>Content Optimization Strategies</h2>
  <h3>Writing for AI Citation</h3>
  <h3>Creating Quote-Worthy Content</h3>

<h2>Measuring LLMO Success</h2>
  <h3>Key Metrics to Track</h3>
  <h3>Tools for LLMO Analysis</h3>`,
        steps: [
          'Use only one H1 tag per page',
          'Create logical hierarchy (H1 > H2 > H3 > H4)',
          'Include keywords in headings naturally',
          'Make headings descriptive and scannable',
          'Use headings to break up long content sections'
        ]
      }
    ]
  },
  {
    id: 'ai-readability',
    title: 'AI Readability',
    icon: Brain,
    description: 'Structure content for optimal AI comprehension',
    color: 'pink',
    items: [
      {
        title: 'Content Structure for AI Models',
        description: 'Format content for easy AI parsing and citation',
        difficulty: 'medium' as const,
        impact: 'high' as const,
        code: `<!-- AI-friendly content structure -->
<article>
  <header>
    <h1>Topic Title with Clear Value Proposition</h1>
    <p class="summary">
      One-sentence summary that clearly states the main point 
      and value readers will get from this content.
    </p>
  </header>
  
  <section class="key-points">
    <h2>Key Takeaways</h2>
    <ul>
      <li><strong>Point 1:</strong> Clear, factual statement with specific data</li>
      <li><strong>Point 2:</strong> Actionable insight with measurable outcome</li>
      <li><strong>Point 3:</strong> Expert opinion with supporting evidence</li>
    </ul>
  </section>
  
  <section class="main-content">
    <h2>Detailed Explanation</h2>
    <p>
      Start with the most important information first. 
      Use short paragraphs (2-3 sentences max) for easy scanning.
    </p>
    
    <blockquote class="highlight-stat">
      "According to XYZ Research, 78% of AI models prefer 
      content with clear statistical claims and proper citations."
    </blockquote>
  </section>
</article>`,
        steps: [
          'Lead with key information and conclusions',
          'Use short paragraphs (2-3 sentences)',
          'Include bullet points and numbered lists',
          'Add blockquotes for important statistics',
          'Structure content with clear sections and headers'
        ]
      },
      {
        title: 'Quote-Worthy Content Creation',
        description: 'Write content that AI models will want to cite',
        difficulty: 'medium' as const,
        impact: 'high' as const,
        code: `<!-- Examples of quote-worthy content formats -->

<!-- Statistical Claims -->
<p class="stat-highlight">
  <strong>Key Statistic:</strong> Websites implementing proper LLMO 
  techniques see an average 300% increase in AI model citations 
  within 6 months, according to our analysis of 500 websites.
</p>

<!-- Expert Definitions -->
<div class="definition-box">
  <h3>Definition: Large Language Model Optimization (LLMO)</h3>
  <p>
    LLMO is a systematic approach to optimizing web content for 
    discovery and citation by AI language models, focusing on 
    technical accessibility, content structure, and authority signals.
  </p>
</div>

<!-- Step-by-Step Instructions -->
<div class="how-to-section">
  <h3>How to Implement robots.txt for LLMO:</h3>
  <ol>
    <li><strong>Step 1:</strong> Create robots.txt file in root directory</li>
    <li><strong>Step 2:</strong> Add "User-agent: GPTBot" and "Allow: /"</li>
    <li><strong>Step 3:</strong> Test accessibility at yoursite.com/robots.txt</li>
  </ol>
</div>

<!-- Comparative Analysis -->
<table class="comparison-table">
  <thead>
    <tr><th>Factor</th><th>Traditional SEO</th><th>LLMO</th></tr>
  </thead>
  <tbody>
    <tr><td>Primary Goal</td><td>Search Rankings</td><td>AI Citation</td></tr>
    <tr><td>Content Focus</td><td>Keywords</td><td>Factual Accuracy</td></tr>
    <tr><td>Technical Setup</td><td>robots.txt</td><td>robots.txt + llms.txt</td></tr>
  </tbody>
</table>`,
        steps: [
          'Include specific statistics with sources',
          'Create clear definitions for key terms',
          'Write step-by-step instructions',
          'Add comparative analyses and tables',
          'Use highlighting for important claims'
        ]
      },
      {
        title: 'Logical Information Hierarchy',
        description: 'Organize information in a logical, scannable format',
        difficulty: 'easy' as const,
        impact: 'medium' as const,
        code: `<!-- Information hierarchy example -->
<article>
  <!-- 1. Introduction: What and Why -->
  <section class="introduction">
    <h2>What is LLMO and Why Does It Matter?</h2>
    <p>Brief overview and importance...</p>
  </section>
  
  <!-- 2. Background: Context and History -->
  <section class="background">
    <h2>The Evolution of AI Content Discovery</h2>
    <p>Historical context and development...</p>
  </section>
  
  <!-- 3. How-To: Practical Implementation -->
  <section class="implementation">
    <h2>How to Implement LLMO (Step-by-Step)</h2>
    <h3>Phase 1: Technical Setup</h3>
    <h3>Phase 2: Content Optimization</h3>
    <h3>Phase 3: Monitoring and Improvement</h3>
  </section>
  
  <!-- 4. Examples: Real-World Applications -->
  <section class="examples">
    <h2>LLMO Success Stories and Case Studies</h2>
    <p>Concrete examples and results...</p>
  </section>
  
  <!-- 5. Conclusion: Summary and Next Steps -->
  <section class="conclusion">
    <h2>Key Takeaways and Action Items</h2>
    <p>Summary and clear next steps...</p>
  </section>
</article>`,
        steps: [
          'Follow the inverted pyramid structure (most important first)',
          'Group related information into clear sections',
          'Use consistent formatting throughout',
          'Add transition sentences between sections',
          'Include a summary or conclusion section'
        ]
      }
    ]
  },
  {
    id: 'ai-specific',
    title: 'AI Model-Specific Optimizations',
    icon: Zap,
    description: 'Advanced optimizations for specific AI models (ChatGPT, Gemini, Perplexity)',
    color: 'pink',
    items: [
      {
        title: 'ChatGPT/OpenAI Optimization',
        description: 'Optimize specifically for ChatGPT citation and discovery',
        difficulty: 'medium' as const,
        impact: 'high' as const,
        code: `<!-- ChatGPT-specific optimizations -->

<!-- 1. Clear, factual content structure -->
<article>
  <h1>Definitive Guide to [Topic]</h1>
  
  <!-- Key facts upfront -->
  <div class="key-facts">
    <h2>Key Takeaways</h2>
    <ul>
      <li><strong>Fact 1:</strong> Clear, specific statement</li>
      <li><strong>Fact 2:</strong> Measurable data with sources</li>
      <li><strong>Fact 3:</strong> Actionable insight</li>
    </ul>
  </div>
  
  <!-- Quote-worthy sections -->
  <section>
    <h2>Expert Analysis</h2>
    <blockquote>
      "According to [authoritative source], [specific finding or insight]"
    </blockquote>
  </section>
</article>

<!-- robots.txt for GPTBot -->
User-agent: GPTBot
Allow: /
Crawl-delay: 1`,
        steps: [
          'Structure content with clear, factual statements',
          'Include expert quotes and authoritative sources',
          'Use specific data points and statistics',
          'Create "Key Takeaways" sections for easy citation',
          'Ensure GPTBot has full access in robots.txt'
        ]
      },
      {
        title: 'Perplexity AI Optimization',
        description: 'Optimize for Perplexity\'s real-time search and citation system',
        difficulty: 'medium' as const,
        impact: 'high' as const,
        code: `<!-- Perplexity-specific optimizations -->

<!-- Real-time, current content -->
<article>
  <header>
    <h1>[Current Year] Guide to [Topic]</h1>
    <time datetime="2024-01-15">Last updated: January 15, 2024</time>
  </header>
  
  <!-- Quick answer format -->
  <section class="quick-answer">
    <h2>Quick Answer</h2>
    <p><strong>In short:</strong> [Direct, concise answer to main question]</p>
  </section>
  
  <!-- Numbered facts for easy citation -->
  <section>
    <h2>Key Points</h2>
    <ol>
      <li><strong>Point 1:</strong> Specific fact with source [1]</li>
      <li><strong>Point 2:</strong> Current data or trend [2]</li>
      <li><strong>Point 3:</strong> Expert opinion with attribution [3]</li>
    </ol>
  </section>
  
  <!-- Sources section -->
  <footer>
    <h3>Sources</h3>
    <ol>
      <li>[Author Name], [Publication], [Date]</li>
      <li>[Study Name], [Institution], [Year]</li>
    </ol>
  </footer>
</article>

<!-- robots.txt for PerplexityBot -->
User-agent: PerplexityBot
Allow: /
Crawl-delay: 0.5`,
        steps: [
          'Include current dates and "last updated" timestamps',
          'Create "Quick Answer" sections at the top',
          'Use numbered lists for easy citation',
          'Include comprehensive source lists',
          'Focus on recent, trending topics',
          'Allow PerplexityBot with minimal crawl delay'
        ]
      },
      {
        title: 'Google Gemini/Bard Optimization',
        description: 'Optimize for Google\'s AI models and featured snippets',
        difficulty: 'medium' as const,
        impact: 'high' as const,
        code: `<!-- Gemini/Bard optimizations -->

<!-- Structured Q&A format -->
<article itemscope itemtype="https://schema.org/Article">
  <h1 itemprop="headline">Complete Guide: [Topic Question]</h1>
  
  <!-- FAQ section for Gemini -->
  <section itemscope itemtype="https://schema.org/FAQPage">
    <h2>Frequently Asked Questions</h2>
    
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">What is [topic]?</h3>
      <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <p itemprop="text">[Clear, comprehensive answer with key facts]</p>
      </div>
    </div>
    
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">How does [topic] work?</h3>
      <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <p itemprop="text">[Step-by-step explanation]</p>
      </div>
    </div>
  </section>
  
  <!-- List format for featured snippets -->
  <section>
    <h2>How to [Action] - Step by Step</h2>
    <ol>
      <li><strong>Step 1:</strong> Clear action with result</li>
      <li><strong>Step 2:</strong> Next logical step</li>
      <li><strong>Step 3:</strong> Final step or outcome</li>
    </ol>
  </section>
</article>

<!-- robots.txt for Google-Extended -->
User-agent: Google-Extended
Allow: /`,
        steps: [
          'Implement comprehensive FAQ schema',
          'Structure content for featured snippets',
          'Use clear question-answer formats',
          'Include step-by-step instructions',
          'Add proper Article schema markup',
          'Allow Google-Extended in robots.txt for AI training'
        ]
      }
    ]
  }
];

const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800 border-green-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'hard': return 'bg-red-100 text-red-800 border-red-300';
  }
};

const getImpactColor = (impact: 'low' | 'medium' | 'high') => {
  switch (impact) {
    case 'low': return 'bg-gray-100 text-gray-800 border-gray-300';
    case 'medium': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'high': return 'bg-purple-100 text-purple-800 border-purple-300';
  }
};

const getCategoryColor = (color: string) => {
  const colors = {
    blue: 'border-blue-200 bg-blue-50',
    green: 'border-green-200 bg-green-50',
    purple: 'border-purple-200 bg-purple-50',
    orange: 'border-orange-200 bg-orange-50',
    pink: 'border-pink-200 bg-pink-50',
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export default function OptimizePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-w-full overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">LLMO Optimization Guide</h1>
          <p className="text-muted-foreground">
            Comprehensive implementation guide for Large Language Model Optimization
          </p>
        </div>
      </div>

      {/* Overview Card */}
      <Card className="shadow-lg border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-primary" />
            LLMO Implementation Roadmap
          </CardTitle>
          <CardDescription>
            Follow this systematic approach to optimize your content for AI model discovery and citation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
            {optimizationCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={category.id} className={`p-4 rounded-lg border-2 ${getCategoryColor(category.color)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="h-5 w-5" />
                    <span className="font-semibold text-sm">{category.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {category.items.length} guides
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="technical" className="w-full max-w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
          {optimizationCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs sm:text-sm px-2 py-1">
              <span className="hidden sm:inline">{category.title}</span>
              <span className="sm:hidden">
                {category.title.split(' ')[0]}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {optimizationCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6 max-w-full">
            <div className="grid gap-6 max-w-full">
              {category.items.map((item, index) => (
                <Card key={index} className="shadow-md w-full max-w-full overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl flex items-center gap-3">
                          <Target className="h-5 w-5 text-primary" />
                          {item.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {item.description}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
                          {item.difficulty}
                        </Badge>
                        <Badge variant="outline" className={getImpactColor(item.impact)}>
                          {item.impact} impact
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="w-full max-w-full overflow-hidden">
                    <div className="space-y-6 w-full max-w-full">
                      {/* Implementation Steps */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Implementation Steps
                        </h4>
                        <ol className="space-y-2">
                          {item.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                                {stepIndex + 1}
                              </span>
                              <span className="text-sm">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Code Example */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            Code Example
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(item.code)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-muted p-4 rounded-lg text-sm border max-w-full overflow-hidden">
                          <pre className="whitespace-pre-wrap break-words overflow-wrap-anywhere text-xs sm:text-sm max-h-96 overflow-y-auto">
                            <code className="break-words font-mono">{item.code}</code>
                          </pre>
                        </div>
                      </div>

                      {/* Quick Tips */}
                      <Alert className="border-blue-200 bg-blue-50">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          <strong>Pro Tip:</strong> Test your implementation using tools like Google's Rich Results Test, 
                          Schema Markup Validator, and your browser's developer tools to ensure everything works correctly.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Additional Resources */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileText className="h-5 w-5" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Testing Tools</h4>
              <ul className="space-y-1 text-sm">
                <li>• Google Rich Results Test</li>
                <li>• Schema Markup Validator</li>
                <li>• robots.txt Tester</li>
                <li>• PageSpeed Insights</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Documentation</h4>
              <ul className="space-y-1 text-sm">
                <li>• Schema.org Guidelines</li>
                <li>• OpenAI GPTBot Documentation</li>
                <li>• Google Search Central</li>
                <li>• Web.dev Best Practices</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Community</h4>
              <ul className="space-y-1 text-sm">
                <li>• LLMO Community Forum</li>
                <li>• AI Content Creators Group</li>
                <li>• Technical SEO Discord</li>
                <li>• Schema Markup Slack</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
