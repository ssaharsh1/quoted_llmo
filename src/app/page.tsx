'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Brain, 
  Zap, 
  BarChart3,
  CheckCircle2,
  ArrowRight,
  LogIn,
  Sparkles,
  Target,
  TrendingUp,
  X
} from 'lucide-react';

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="modern-card glass-card w-full max-w-md mx-4">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
                    <LogIn className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">Login</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50/50">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Coming Soon!</strong> Authentication is being developed. For now, you can access all features without logging in.
                </AlertDescription>
              </Alert>
              <div className="flex gap-3">
                <Button asChild className="btn-gradient flex-1">
                  <Link href="/dashboard/audit/enhanced">
                    <Brain className="mr-2 h-4 w-4" />
                    Start Analysis
                  </Link>
                </Button>
                <Button variant="outline" onClick={closeModal} className="border-2">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">Quoted</span>
          </Link>
          
          <Button onClick={handleLoginClick} className="btn-gradient group">
            <LogIn className="mr-2 h-4 w-4" />
            Login
            <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered LLMO Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Optimize Your Content for{' '}
            <span className="gradient-text">AI Discovery</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The complete Large Language Model Optimization platform. 
            Analyze, optimize, and monitor your content for maximum AI model citation.
          </p>
          
          <div className="flex justify-center pt-8">
            <Button asChild className="btn-gradient text-lg px-8 py-4 group">
              <Link href="/dashboard/audit/enhanced">
                <Brain className="mr-2 h-5 w-5" />
                Start LLMO Analysis
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Free analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">AI-First Optimization Platform</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Optimize specifically for ChatGPT, Gemini, Perplexity, and Claude - not traditional SEO
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="secondary" className="px-3 py-1">ChatGPT</Badge>
            <Badge variant="secondary" className="px-3 py-1">Gemini</Badge>
            <Badge variant="secondary" className="px-3 py-1">Perplexity</Badge>
            <Badge variant="secondary" className="px-3 py-1">Claude</Badge>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="modern-card glass-card hover:glow-effect group cursor-pointer">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg w-fit group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">AI Model-Specific Crawling</CardTitle>
              <CardDescription className="text-base">
                Test with GPTBot, PerplexityBot, Claude-Web, and Google-Extended crawlers
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="modern-card glass-card hover:glow-effect group cursor-pointer">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg w-fit group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Batch Processing</CardTitle>
              <CardDescription className="text-base">
                Analyze up to 10 URLs simultaneously
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="modern-card glass-card hover:glow-effect group cursor-pointer">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg w-fit group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Real-time Analytics</CardTitle>
              <CardDescription className="text-base">
                Track performance and improvement trends
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="modern-card glass-card max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-6 p-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white w-fit">
              <Target className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl">Why Choose Quoted?</CardTitle>
            <CardDescription className="text-lg">
              The most comprehensive LLMO platform available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                <span className="font-medium">Increase AI model citation rates by 300%+</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                <span className="font-medium">Comprehensive LLMO analysis in under 30 seconds</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                <span className="font-medium">Ready-to-implement optimization guides</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                <span className="font-medium">Expert-level recommendations with code examples</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="modern-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 max-w-4xl mx-auto">
          <CardContent className="text-center py-16">
            <div className="mx-auto mb-6 p-4 rounded-full bg-primary text-primary-foreground w-fit pulse-slow">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Content?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of content creators who've increased their AI citation rates with Quoted
            </p>
            <Button asChild className="btn-gradient text-lg px-8 py-4 group">
              <Link href="/dashboard/audit/enhanced">
                <Brain className="mr-2 h-5 w-5" />
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold gradient-text">Quoted</span>
              <span className="text-muted-foreground">- LLMO Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 