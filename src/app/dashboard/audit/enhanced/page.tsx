'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Zap,
  Server,
  Globe,
  ArrowRight,
  Target,
  FileText,
  Database,
  Users,
  Eye
} from 'lucide-react';

function SubmitButton() {
  return (
    <Button type="submit" className="btn-gradient min-w-[160px] group">
      <Brain className="mr-2 h-4 w-4" />
      Enhanced Audit
      <Sparkles className="ml-2 h-3 w-3 group-hover:animate-pulse" />
    </Button>
  );
}

const features = [
  {
    icon: Server,
    title: 'Technical Analysis',
    description: 'Deep crawling analysis via Cloudflare Worker',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Database,
    title: 'Schema Detection',
    description: 'Automatic JSON-LD schema type identification',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'E-E-A-T Signals',
    description: 'Authority and expertise evaluation',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Eye,
    title: 'Meta Optimization',
    description: 'Comprehensive meta tag analysis',
    gradient: 'from-orange-500 to-red-500'
  }
];

interface UserAgent {
  value: string;
  label: string;
  description: string;
  badge?: string;
}

const userAgents = [
  { 
    value: 'llm-comprehensive', 
    label: '🤖 Overall LLM Audit', 
    description: 'Comprehensive analysis across all major AI models (Recommended)',
    badge: 'Most Popular'
  },
  { 
    value: 'gptbot', 
    label: 'GPTBot (OpenAI)', 
    description: 'Specifically optimize for ChatGPT citations' 
  },
  { 
    value: 'perplexitybot', 
    label: 'PerplexityBot', 
    description: 'Perplexity AI crawler for real-time search results' 
  },
  { 
    value: 'claude-web', 
    label: 'Claude-Web (Anthropic)', 
    description: 'Anthropic Claude AI crawler optimization' 
  },
  { 
    value: 'gemini', 
    label: 'Google-Extended (Gemini)', 
    description: 'Google AI models (Bard/Gemini) optimization' 
  },
  { 
    value: 'chrome', 
    label: 'Chrome Browser', 
    description: 'Standard web browser user experience' 
  },
  { 
    value: 'googlebot', 
    label: 'Googlebot', 
    description: 'Traditional SEO crawler (not AI-focused)' 
  },
  { 
    value: 'bingbot', 
    label: 'Bingbot', 
    description: 'Microsoft search crawler (not AI-focused)' 
  }
];

export default function EnhancedAuditPage() {
  const router = useRouter();
  const [selectedUserAgent, setSelectedUserAgent] = useState('llm-comprehensive');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<{url?: string[]}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enhanced Audit Form - Submit clicked', { url, selectedUserAgent });
    
    // Validate URL
    try {
      new URL(url);
      setErrors({});
      console.log('Enhanced Audit Form - URL validation passed');
      
      // Navigate to results page with URL and user agent as search params
      const searchParams = new URLSearchParams({
        url: url,
        userAgent: selectedUserAgent
      });
      
      const targetPath = `/dashboard/audit/enhanced/results?${searchParams.toString()}`;
      console.log('Enhanced Audit Form - Navigating to:', targetPath);
      
      router.push(targetPath);
    } catch (error) {
      console.log('Enhanced Audit Form - URL validation failed:', error);
      setErrors({ url: ['Please enter a valid URL.'] });
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-8 p-4 lg:gap-10 lg:p-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg glow-effect">
            <Zap className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Enhanced LLMO <span className="gradient-text">Audit</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Advanced technical analysis powered by Cloudflare Worker integration. 
          Get deeper insights into your content's AI optimization potential.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="modern-card glass-card hover:glow-effect text-center">
            <CardContent className="pt-6 pb-4">
              <div className={`mx-auto mb-3 p-2 rounded-lg bg-gradient-to-r ${feature.gradient} text-white w-fit`}>
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Audit Form */}
      <Card className="modern-card glass-card max-w-4xl mx-auto w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            Enhanced AI Citation Analysis
          </CardTitle>
          <CardDescription className="text-lg">
            Advanced technical audit with Cloudflare Worker integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Info Alert */}
          <Alert className="border-blue-200 bg-blue-50/50 backdrop-blur-sm">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Enhanced Features:</strong> This audit includes technical crawling analysis, 
              robots.txt/llms.txt verification, schema type detection, and heading structure analysis 
              via our Cloudflare Worker integration.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* URL Input */}
              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Blog Post URL
                </label>
                <div className="relative">
                  <Input
                    id="url"
                    name="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-blog.com/your-awesome-post"
                    required
                    className="modern-input h-12 text-base bg-background/50 backdrop-blur-sm border-2 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                      Required
                    </Badge>
                  </div>
                </div>
              </div>

              {/* User Agent Selection */}
              <div className="space-y-2">
                <label htmlFor="userAgent" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  Crawling User Agent
                </label>
                <Select value={selectedUserAgent} onValueChange={setSelectedUserAgent} name="userAgent">
                  <SelectTrigger className="modern-input h-12 bg-background/50 backdrop-blur-sm border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {userAgents.map((agent: UserAgent) => (
                      <SelectItem key={agent.value} value={agent.value}>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col">
                            <span className="font-medium">{agent.label}</span>
                            <span className="text-sm text-muted-foreground">{agent.description}</span>
                          </div>
                          {agent.badge && (
                            <Badge className="ml-2 bg-primary/10 text-primary border-primary/20 text-xs">
                              {agent.badge}
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose the user agent to simulate different crawlers for technical analysis
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <SubmitButton />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Advanced analysis • Technical insights included</span>
                </div>
              </div>
              
              {/* Error Messages */}
              {errors.url && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {errors.url[0]}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Processing Steps */}
      <div className="text-center space-y-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-sm">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center mx-auto font-bold">1</div>
            <p className="font-medium">Cloudflare Worker</p>
            <p className="text-muted-foreground">Technical data extraction</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center mx-auto font-bold">2</div>
            <p className="font-medium">Schema Analysis</p>
            <p className="text-muted-foreground">JSON-LD detection</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white flex items-center justify-center mx-auto font-bold">3</div>
            <p className="font-medium">AI Processing</p>
            <p className="text-muted-foreground">Enhanced evaluation</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white flex items-center justify-center mx-auto font-bold">4</div>
            <p className="font-medium">Report Generation</p>
            <p className="text-muted-foreground">Technical insights</p>
          </div>
        </div>
      </div>

    </main>
  );
} 