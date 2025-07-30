addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { searchParams } = new URL(request.url);
  const postUrl = searchParams.get('url');
  const userAgentId = searchParams.get('user-agent') || 'chrome';

  if (!postUrl) {
    return jsonError("Missing 'url' parameter", 400);
  }

  /* 1️⃣ — Enhanced AI-aware user agents for LLMO */
  const UA = {
    chrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    googlebot: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.184 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    gptbot: 'GPTBot/1.0 (+https://openai.com/gptbot)',
    bingbot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    perplexitybot: 'PerplexityBot/1.0 (+https://www.perplexity.ai/bot)',
    claude: 'Claude-Web/1.0 (+https://claude.ai)',
    gemini: 'Google-Extended (+https://ai.google.dev/)',
    'llm-comprehensive': 'GPTBot/1.0 (+https://openai.com/gptbot)'
  };

  const headers = {
    'User-Agent': UA[userAgentId] || UA.chrome,
    'Accept': 'text/html,*/*;q=0.9',
    'Cache-Control': 'no-cache'
  };

  try {
    /* 2️⃣ — Follow redirects */
    let current = postUrl;
    const chain = [];
    let res;
    while (true) {
      res = await fetch(current, { headers, redirect: 'manual' });
      chain.push({ url: current, status: res.status });
      if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
        current = new URL(res.headers.get('location'), current).href;
      } else break;
    }
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    /* 3️⃣ — Grab HTML */
    const html = await res.text();
    const origin = new URL(postUrl).origin;

    /* 4️⃣ — Check llms.txt availability */
    const llmsResp = await fetch(`${origin}/llms.txt`, { headers });
    const llmsStatus = llmsResp.ok ? 'found' : 'not_found';

    /* 5️⃣ — Enhanced meta tag extraction */
    const metaTags = {};
    const metaMatches = [...html.matchAll(/<meta[^>]+>/gi)];

    for (const match of metaMatches) {
      const name = match[0].match(/name=['"]([^'"]+)['"]/i)?.[1];
      const property = match[0].match(/property=['"]([^'"]+)['"]/i)?.[1];
      const content = match[0].match(/content=['"]([^'"]+)['"]/i)?.[1];
      
      if (name && content) {
        metaTags[name.toLowerCase()] = content;
      }
      if (property && content) {
        metaTags[property.toLowerCase()] = content;
      }
    }

    const title = (html.match(/<title[^>]*>(.*?)<\/title>/i) || [])[1] || '';
    const metaDescription = (html.match(/<meta[^>]+name=['"]description['"][^>]+content=['"](.*?)['"]/i) || [])[1] || '';

    // Enhanced metadata object
    const metadata = {
      title,
      metaDescription,
      author: metaTags.author || metaTags['article:author'] || 'Unknown',
      keywords: metaTags.keywords || '',
      language: metaTags['content-language'] || metaTags.language || '',
      robots: metaTags.robots || '',
      ogTitle: metaTags['og:title'] || '',
      ogDescription: metaTags['og:description'] || '',
      ogType: metaTags['og:type'] || '',
      twitterCard: metaTags['twitter:card'] || '',
      canonical: (html.match(/<link[^>]+rel=['"]canonical['"][^>]+href=['"]([^'"]+)['"]/i) || [])[1] || ''
    };

    /* 6️⃣ — Enhanced heading analysis */
    const headings = {
      h1: [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gi)].map(m => m[1].trim()),
      h2: [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)].map(m => m[1].trim()),
      h3: [...html.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi)].map(m => m[1].trim()),
      h4: [...html.matchAll(/<h4[^>]*>(.*?)<\/h4>/gi)].map(m => m[1].trim()),
      h5: [...html.matchAll(/<h5[^>]*>(.*?)<\/h5>/gi)].map(m => m[1].trim()),
      h6: [...html.matchAll(/<h6[^>]*>(.*?)<\/h6>/gi)].map(m => m[1].trim())
    };

    /* 7️⃣ — Enhanced JSON-LD schema detection */
    const schemaTypes = [];
    const jsonLdMatches = [...html.matchAll(
      /<script[^>]*type=['"]application\/ld\+json['"][^>]*>([\s\S]*?)<\/script>/gi
    )];

    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        
        // Handle arrays and nested objects
        const extractTypes = (obj) => {
          if (Array.isArray(obj)) {
            obj.forEach(item => extractTypes(item));
          } else if (typeof obj === 'object' && obj !== null) {
            if (obj['@type']) {
              if (Array.isArray(obj['@type'])) {
                schemaTypes.push(...obj['@type']);
              } else {
                schemaTypes.push(obj['@type']);
              }
            }
            // Recursively check nested objects
            Object.values(obj).forEach(value => extractTypes(value));
          }
        };
        
        extractTypes(parsed);
      } catch (e) {
        // ignore JSON parse errors
      }
    }

    /* 8️⃣ — Content structure analysis */
    const contentStructure = {
      wordCount: html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length,
      paragraphCount: (html.match(/<p[^>]*>/gi) || []).length,
      listCount: (html.match(/<(ul|ol)[^>]*>/gi) || []).length,
      imageCount: (html.match(/<img[^>]*>/gi) || []).length,
      linkCount: (html.match(/<a[^>]*>/gi) || []).length,
      hasTableOfContents: html.toLowerCase().includes('table of contents') || html.toLowerCase().includes('toc') || html.toLowerCase().includes('contents'),
      hasFAQ: html.toLowerCase().includes('faq') || html.toLowerCase().includes('frequently asked') || schemaTypes.some(type => type.toLowerCase().includes('faq')),
      hasCodeBlocks: (html.match(/<pre[^>]*>/gi) || []).length + (html.match(/<code[^>]*>/gi) || []).length
    };

    /* 9️⃣ — Link and citation analysis */
    const links = [...html.matchAll(/<a[^>]+href=['"]([^'"]+)['"][^>]*>(.*?)<\/a>/gi)].map(match => ({
      url: match[1],
      text: match[2].replace(/<[^>]*>/g, '').trim(),
      isExternal: !match[1].startsWith('/') && !match[1].startsWith('#'),
      isCitation: match[2].toLowerCase().includes('source') || match[2].toLowerCase().includes('reference')
    }));

    const linkAnalysis = {
      totalLinks: links.length,
      externalLinks: links.filter(l => l.isExternal).length,
      citationLinks: links.filter(l => l.isCitation).length,
      hasReferences: links.some(l => l.text.toLowerCase().includes('reference') || l.text.toLowerCase().includes('source')),
      hasBibliography: html.toLowerCase().includes('bibliography') || html.toLowerCase().includes('references')
    };

    /* 🔟 — AI accessibility analysis */
    const robotsTxt = await safeText(`${origin}/robots.txt`, headers);
    const aiAccessibility = {
      robotsAllowsAI: !robotsTxt.toLowerCase().includes('gptbot') || !robotsTxt.toLowerCase().includes('disallow'),
      hasLLMsTxt: llmsStatus === 'found',
      hasStructuredData: schemaTypes.length > 0,
      hasProperHeadings: headings.h1.length === 1 && headings.h2.length >= 2,
      hasAuthorInfo: metadata.author && metadata.author !== 'Unknown',
      hasMetaDescription: metadata.metaDescription && metadata.metaDescription.length > 50
    };

    /* 1️⃣1️⃣ — LLMO-specific analysis */
    const llmoAnalysis = {
      hasArticleSchema: schemaTypes.some(type => ['Article', 'BlogPosting', 'NewsArticle', 'TechArticle'].includes(type)),
      hasPersonSchema: schemaTypes.some(type => ['Person', 'Organization'].includes(type)),
      hasBreadcrumbSchema: schemaTypes.some(type => type === 'BreadcrumbList'),
      hasFAQSchema: schemaTypes.some(type => type === 'FAQPage' || type === 'Question'),
      hasHowToSchema: schemaTypes.some(type => type === 'HowTo'),
      hasProperMetaTags: !!(metadata.ogTitle && metadata.ogDescription),
      hasCanonical: !!metadata.canonical,
      hasLanguageTag: !!metadata.language,
      contentReadability: contentStructure.wordCount > 500 && contentStructure.paragraphCount > 3,
      hasCitations: linkAnalysis.hasReferences || linkAnalysis.hasBibliography
    };

    /* 1️⃣2️⃣ — Package enhanced JSON response */
    const payload = {
      postUrl,
      redirectChain: chain,
      robotsTxt,
      llmsStatus,
      metadata,
      headings,
      schemaTypes,
      contentStructure,
      linkAnalysis,
      aiAccessibility,
      llmoAnalysis
    };

    return new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json' }});

  } catch (err) {
    return jsonError(err.message, 500);
  }
}

function jsonError(msg, code) {
  return new Response(JSON.stringify({ error: msg }), {
    status: code,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function safeText(url, headers) {
  try {
    const r = await fetch(url, { headers });
    return r.ok ? await r.text() : 'NOT FOUND';
  } catch {
    return 'ERROR';
  }
} 