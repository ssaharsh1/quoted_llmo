'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
  X,
  Shield,
  Clock,
  Users,
  Star,
  Globe,
  Rocket,
  Award,
  ChevronDown,
  Play,
  Building2,
  Lightbulb,
  Activity
} from 'lucide-react';

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 particles-bg pointer-events-none" />
      <div className="fixed inset-0 hero-bg pointer-events-none" />
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="premium-card w-full max-w-md mx-4 animate-scale-in">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
               <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg animate-pulse-glow">
                 <LogIn className="h-5 w-5" />
               </div>
               <CardTitle className="text-xl font-semibold">Get Started</CardTitle>
             </div>
                <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                <Sparkles className="h-4 w-4 text-blue-600" />
                                 <AlertDescription className="text-blue-800 dark:text-blue-300">
                   <strong>Free Access!</strong> All features available now. No signup required to start analyzing your content.
                 </AlertDescription>
              </Alert>
              <div className="flex gap-3">
                <Button asChild className="btn-premium shimmer flex-1">
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
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg animate-pulse-glow">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">Quoted</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#llmo" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors font-medium">What is LLMO</a>
            <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors font-medium">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors font-medium">Testimonials</a>
          </nav>
          
          <Button onClick={handleLoginClick} className="btn-premium shimmer group">
            <LogIn className="mr-2 h-4 w-4" />
            Get Started
            <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32 text-center relative">
        <div className={`max-w-5xl mx-auto space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-6 py-2 text-sm font-medium dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800">
            <Award className="mr-2 h-4 w-4" />
            AI-Powered Content Optimization Platform
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            Optimize Your Content for{' '}
            <span className="gradient-text animate-gradient">AI Discovery</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            Advanced content analysis and optimization platform designed to help your content get discovered by AI models. 
            Analyze, optimize, and improve your content's visibility in AI-powered search and chat.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Button asChild className="btn-premium shimmer text-lg px-10 py-4 group h-auto">
              <Link href="/dashboard/audit/enhanced">
                <Rocket className="mr-2 h-5 w-5" />
                Start Free Analysis
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" className="text-lg px-10 py-4 h-auto border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span className="font-medium">No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span className="font-medium">Free analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span className="font-medium">Instant results</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 shadow-lg">
            <Brain className="h-6 w-6" />
          </div>
        </div>
        <div className="absolute top-32 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 shadow-lg">
            <Zap className="h-6 w-6" />
          </div>
        </div>
        <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '4s' }}>
          <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 shadow-lg">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
        
        {/* Additional subtle background elements */}
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }}></div>
      </section>

            {/* What is LLMO Section */}
      <section id="llmo" className="py-24 bg-white dark:bg-gray-950 geometric-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2 mb-6 dark:bg-purple-950/30 dark:text-purple-300">
                <Brain className="mr-2 h-4 w-4" />
                Understanding LLMO
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">What is Large Language Model Optimization?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The next evolution of content optimization for the AI era
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Beyond Traditional SEO</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    While SEO focuses on ranking in search engines, LLMO optimizes your content specifically for AI models like ChatGPT, Gemini, Claude, and Perplexity. These models are becoming the primary way people discover and consume information.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Why LLMO Matters</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-1">
                        <span className="text-blue-600 text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">AI-First Discovery</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">When people ask AI models questions, your content needs to be optimized to be cited and recommended.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mt-1">
                        <span className="text-purple-600 text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Credibility & Authority</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">AI models prioritize authoritative, well-structured content that provides clear value to users.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mt-1">
                        <span className="text-emerald-600 text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Future-Proof Strategy</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">As AI becomes the primary interface for information, LLMO ensures your content remains discoverable.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="premium-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <Target className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold">Key LLMO Principles</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium">Clear, authoritative content structure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium">Comprehensive topic coverage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium">Credible sourcing and citations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium">User-focused value delivery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium">Technical accessibility for AI crawlers</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="premium-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold">The AI Revolution</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      With over 100 million ChatGPT users and growing, AI models are becoming the primary way people search for and consume information. Traditional SEO strategies need to evolve to include LLMO for complete digital visibility.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 font-medium">Used by content creators and marketers</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-400">
              <Building2 className="h-8 w-8" />
              <span>TechCorp</span>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-400">
              <Globe className="h-8 w-8" />
              <span>GlobalMedia</span>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-400">
              <Lightbulb className="h-8 w-8" />
              <span>InnovateLab</span>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-400">
              <Activity className="h-8 w-8" />
              <span>DataFlow</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24 orb-bg">
        <div className="text-center mb-20">
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 mb-6 dark:bg-blue-950/30 dark:text-blue-300">
            <Target className="mr-2 h-4 w-4" />
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Advanced Content Analysis</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium">
            Powerful tools to analyze and optimize your content for AI model discovery and citation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card className="premium-card group cursor-pointer animate-fade-in-up">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg w-fit group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                <Brain className="h-10 w-10" />
              </div>
              <CardTitle className="text-2xl font-bold mb-3">AI Model Analysis</CardTitle>
              <CardDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Analyze how AI models like ChatGPT, Gemini, and Claude might interact with your content. Test with simulated AI crawler behavior.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Multi-model compatibility</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Real-time crawl simulation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Citation probability scoring</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="premium-card group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg w-fit group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                <Zap className="h-10 w-10" />
              </div>
              <CardTitle className="text-2xl font-bold mb-3">Batch URL Analysis</CardTitle>
              <CardDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Analyze multiple URLs simultaneously to get comprehensive insights across your content portfolio. Process up to 10 URLs at once.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Unlimited URL processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Priority queue system</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">API integration ready</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="premium-card group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg w-fit group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                <BarChart3 className="h-10 w-10" />
              </div>
              <CardTitle className="text-2xl font-bold mb-3">Detailed Reports</CardTitle>
              <CardDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Get comprehensive analysis reports with actionable insights. Understand how your content performs and receive optimization recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Predictive modeling</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Competitive analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Custom reporting</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">30s</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">10</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">URLs per Batch</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">Free</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">No Cost</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">Instant</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Results</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-4 py-24 grid-bg">
        <div className="text-center mb-20">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-2 mb-6 dark:bg-emerald-950/30 dark:text-emerald-300">
            <Users className="mr-2 h-4 w-4" />
            Platform Benefits
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Quoted?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful tools to help your content get discovered by AI models
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="premium-card">
            <CardContent className="p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
                             <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                 "Quoted helped us understand how AI models interact with our content. The insights were eye-opening and helped us optimize our content strategy."
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                   SJ
                 </div>
                 <div>
                   <div className="font-semibold">Sarah Johnson</div>
                   <div className="text-sm text-gray-500">Content Creator</div>
                 </div>
               </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
                             <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                 "The batch analysis feature is great for checking multiple pages at once. It's helped us identify patterns across our content and improve our overall strategy."
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                   MC
                 </div>
                 <div>
                   <div className="font-semibold">Michael Chen</div>
                   <div className="text-sm text-gray-500">Digital Marketer</div>
                 </div>
               </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
                             <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                 "The detailed reports provide actionable insights that help us create better content. It's a valuable tool for understanding AI model behavior."
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                   ER
                 </div>
                 <div>
                   <div className="font-semibold">Emily Rodriguez</div>
                   <div className="text-sm text-gray-500">SEO Specialist</div>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 px-6 py-2 mb-8">
              <Rocket className="mr-2 h-4 w-4" />
              Start Your LLMO Journey Today
            </Badge>
                         <h2 className="text-4xl md:text-5xl font-bold mb-6">
               Ready to Optimize Your Content?
             </h2>
             <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
               Start analyzing your content for AI model optimization. 
               Get instant insights and actionable recommendations to improve your content's discoverability.
             </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-4 h-auto font-semibold group">
                <Link href="/dashboard/audit/enhanced">
                  <Brain className="mr-2 h-5 w-5" />
                  Start Free Analysis
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-10 py-4 h-auto">
                <Shield className="mr-2 h-5 w-5" />
                Enterprise Demo
              </Button>
            </div>
                         <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-blue-100">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="h-4 w-4" />
                 <span>No signup required</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="h-4 w-4" />
                 <span>Free analysis</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="h-4 w-4" />
                 <span>Instant results</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold text-white">Quoted</span>
              </div>
                             <p className="text-gray-400 leading-relaxed">
                 Advanced content analysis and optimization platform for AI model discovery.
               </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 Quoted. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 