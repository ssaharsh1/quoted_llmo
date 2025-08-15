import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  Award,
  Target,
  Brain,
  Database,
  Users,
  Eye,
  Zap,
  ExternalLink,
  Code,
  Globe,
  FileText,
  Server,
  Shield,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import type { EnhancedAuditOutput } from "@/ai/flows/cloudflare-audit";

type EnhancedAuditReportProps = {
  result: EnhancedAuditOutput;
  url: string;
  userAgent?: string;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pass': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    case 'fail': return <XCircle className="h-4 w-4 text-red-600" />;
    default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pass': return 'border-green-200 bg-green-50';
    case 'warning': return 'border-yellow-200 bg-yellow-50';
    case 'fail': return 'border-red-200 bg-red-50';
    default: return 'border-gray-200 bg-gray-50';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-blue-600"; 
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
};

const getVerdictColor = (verdict: string) => {
  switch (verdict) {
    case 'Excellent': return 'bg-green-100 text-green-800 border-green-300';
    case 'Good': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Needs Improvement': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Poor': return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high': return 'bg-red-100 text-red-800 border-red-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'low': return 'bg-green-100 text-green-800 border-green-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800 border-green-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'hard': return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getCategoryIcon = (categoryKey: string) => {
  switch (categoryKey) {
    case 'crawl_access': return <Server className="h-5 w-5" />;
    case 'content_schema': return <Database className="h-5 w-5" />;
    case 'eat_readability': return <Users className="h-5 w-5" />;
    case 'meta_optimization': return <Eye className="h-5 w-5" />;
    default: return <Target className="h-5 w-5" />;
  }
};

export function EnhancedAuditReport({ result, url, userAgent }: EnhancedAuditReportProps) {
  const categoryEntries = Object.entries(result.categories);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiImprovements, setAiImprovements] = useState<any>(null);

  const getAIImprovements = async () => {
    setIsLoadingAI(true);
    try {
      const response = await fetch('/api/ai-improvements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          userAgent,
          auditResult: result,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('AI Improvements - Received data:', data);
        setAiImprovements(data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('AI Improvements - API error:', errorData);
        setAiImprovements({ error: 'Failed to generate AI improvements. Please try again.' });
      }
    } catch (error) {
      setAiImprovements({ error: 'Error generating AI improvements. Please try again.' });
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-700 slide-in-from-bottom-4">
      {/* Analysis Complete Badge */}
      <div className="flex items-center justify-center mb-6">
        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 px-4 py-2 text-sm">
          <Brain className="mr-2 h-4 w-4" />
          Enhanced Analysis Complete
        </Badge>
      </div>

      {/* Overall Score Card */}
      <Card className="shadow-lg border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">
                  Enhanced LLMO Score: <span className={getScoreColor(result.overall_score)}>
                    {result.overall_score}/100
                  </span>
                </CardTitle>
                <Badge className={`text-lg px-4 py-2 mt-2 ${getVerdictColor(result.verdict)}`}>
                  {result.verdict}
                </Badge>
              </div>
            </div>
            <Progress value={result.overall_score} className="w-32 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">
            {result.summary || `This blog post scored ${result.overall_score}/100 (${result.verdict}) for ${userAgent === 'llm-comprehensive' ? 'comprehensive AI model optimization' : `${userAgent} optimization`}. Technical analysis completed with detailed recommendations for improvement.`}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>Analyzed: {url}</span>
            {userAgent && userAgent !== 'llm-comprehensive' && (
              <Badge variant="outline" className="ml-2">
                {userAgent} optimization
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Improvements Section */}
      <Card className="shadow-md border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-purple-500" />
            AI-Powered Improvement Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get detailed, step-by-step instructions on how to improve your LLMO score using AI analysis.
            </p>
            
            {!aiImprovements ? (
              <Button 
                onClick={getAIImprovements} 
                disabled={isLoadingAI}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isLoadingAI ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                    Generating AI Recommendations...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get AI Improvement Recommendations
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-6">
                {aiImprovements.error ? (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-red-700 text-sm">{aiImprovements.error}</p>
                  </div>
                ) : !aiImprovements.summary ? (
                  <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                    <p className="text-yellow-700 text-sm">Invalid response format. Please try again.</p>
                  </div>
                ) : (
                  <>
                    {/* Summary */}
                    <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-purple-800">
                        <Sparkles className="h-4 w-4" />
                        AI Improvement Summary
                      </h4>
                      <p className="text-sm text-purple-700">{aiImprovements.summary}</p>
                    </div>

                    {/* Quick Wins */}
                    {aiImprovements.quickWins && Array.isArray(aiImprovements.quickWins) && aiImprovements.quickWins.length > 0 && (
                      <div className="space-y-3">
                        <h5 className="font-semibold text-purple-800 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Quick Wins
                        </h5>
                        <div className="grid gap-3">
                          {aiImprovements.quickWins.map((win: any, index: number) => (
                            <div key={index} className="p-3 rounded-lg bg-green-50 border border-green-200">
                              <div className="flex items-center justify-between mb-2">
                                <h6 className="font-medium text-green-800">{win.title}</h6>
                                <Badge className="text-xs bg-green-100 text-green-800">
                                  {win.timeToComplete}
                                </Badge>
                              </div>
                              <p className="text-sm text-green-700 mb-2">{win.description}</p>
                              <p className="text-xs text-green-600">Impact: {win.impact}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Priority Areas */}
                    {aiImprovements.priorityAreas && Array.isArray(aiImprovements.priorityAreas) && aiImprovements.priorityAreas.length > 0 && (
                      <div className="space-y-4">
                        <h5 className="font-semibold text-purple-800 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Priority Improvement Areas
                        </h5>
                        <div className="space-y-4">
                          {aiImprovements.priorityAreas.map((area: any, index: number) => (
                            <div key={index} className="border border-purple-200 rounded-lg overflow-hidden">
                              <div className="p-4 bg-purple-50 border-b border-purple-200">
                                <div className="flex items-center justify-between mb-2">
                                  <h6 className="font-semibold text-purple-800">{area.title}</h6>
                                  <Badge className={`text-xs ${
                                    area.priority === 'High' ? 'bg-red-100 text-red-800' :
                                    area.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                  }`}>
                                    {area.priority} Priority
                                  </Badge>
                                </div>
                                <p className="text-sm text-purple-700 mb-2">{area.description}</p>
                                <div className="flex items-center gap-4 text-xs text-purple-600">
                                  <span>Current: {area.currentScore}/100</span>
                                  <span>Target: {area.targetScore}/100</span>
                                </div>
                              </div>
                              <div className="p-4 space-y-3">
                                {Array.isArray(area.steps) && area.steps.map((step: any, stepIndex: number) => (
                                  <div key={stepIndex} className="space-y-2">
                                    <div className="flex items-start gap-3">
                                      <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center mt-0.5">
                                        {stepIndex + 1}
                                      </div>
                                      <div className="flex-1 space-y-2">
                                        <h6 className="font-medium text-sm">{step.title}</h6>
                                        <p className="text-xs text-muted-foreground">{step.description}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                          <div className="p-2 bg-muted/30 rounded">
                                            <span className="font-medium">File:</span> {step.file}
                                          </div>
                                          <div className="p-2 bg-muted/30 rounded">
                                            <span className="font-medium">Action:</span> {step.action}
                                          </div>
                                        </div>
                                        {step.codeExample && (
                                          <div className="p-2 bg-gray-100 rounded text-xs font-mono">
                                            <div className="font-medium mb-1">Code Example:</div>
                                            <pre className="whitespace-pre-wrap break-words">{step.codeExample}</pre>
                                          </div>
                                        )}
                                        <div className="text-xs text-purple-600">
                                          <span className="font-medium">Expected Impact:</span> {step.expectedImpact}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expected Results */}
                    {aiImprovements.expectedResults && typeof aiImprovements.expectedResults === 'object' && (
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <h5 className="font-semibold mb-3 flex items-center gap-2 text-blue-800">
                          <TrendingUp className="h-4 w-4" />
                          Expected Results
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-blue-700">Score Improvement:</span>
                            <span className="text-blue-600">{aiImprovements.expectedResults.overallScoreImprovement}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-blue-700">Time to Complete:</span>
                            <span className="text-blue-600">{aiImprovements.expectedResults.timeToComplete}</span>
                          </div>
                          <div className="mt-3">
                            <span className="font-medium text-blue-700">Key Metrics:</span>
                            <ul className="mt-1 space-y-1">
                              {Array.isArray(aiImprovements.expectedResults.keyMetrics) && aiImprovements.expectedResults.keyMetrics.map((metric: string, index: number) => (
                                <li key={index} className="text-blue-600 text-xs flex items-center gap-1">
                                  <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                  {metric}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                <Button 
                  onClick={() => setAiImprovements(null)}
                  variant="outline"
                  className="w-full"
                >
                  Generate New Recommendations
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Technical Insights Card */}
      <Card className="shadow-md border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-blue-500" />
            Technical Insights
            {userAgent === 'llm-comprehensive' && (
              <Badge className="ml-2 bg-purple-100 text-purple-800 border-purple-300 text-xs">
                All AI Models
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/50 dark:bg-gray-800/50 border border-border/50 dark:border-gray-600/50">
              <div className="text-2xl font-bold text-primary">{result.technical_insights.redirects}</div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">Redirects</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50 dark:bg-gray-800/50 border border-border/50 dark:border-gray-600/50">
              <div className="text-2xl font-bold">
                {result.technical_insights.robots_accessible ? (
                  <span className="text-green-600">✓</span>
                ) : (
                  <span className="text-red-600">✗</span>
                )}
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">robots.txt Access</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50 dark:bg-gray-800/50 border border-border/50 dark:border-gray-600/50">
              <div className="text-2xl font-bold">
                {result.technical_insights.llms_txt_present ? (
                  <span className="text-green-600">✓</span>
                ) : (
                  <span className="text-red-600">✗</span>
                )}
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">llms.txt Present</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50 dark:bg-gray-800/50 border border-border/50 dark:border-gray-600/50">
              <div className="text-2xl font-bold text-primary">
                {result.technical_insights.schema_types_found.length}
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">Schema Types</div>
            </div>
          </div>
          
          {/* Enhanced Content Analysis */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/50 dark:bg-gray-800/50 border border-border/50 dark:border-gray-600/50">
              <div className="text-2xl font-bold text-primary">
                {result.technical_insights.contentStructure?.wordCount || 0}
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">Word Count</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50 dark:bg-gray-800/50 border border-border/50 dark:border-gray-600/50">
              <div className="text-2xl font-bold text-primary">
                {result.technical_insights.linkAnalysis?.totalLinks || 0}
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">Total Links</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50 dark:bg-gray-800/50 border border-border/50 dark:border-gray-600/50">
              <div className="text-2xl font-bold">
                {result.technical_insights.llmoAnalysis?.hasProperMetaTags ? (
                  <span className="text-green-600">✓</span>
                ) : (
                  <span className="text-red-600">✗</span>
                )}
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">Social Tags</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50 dark:bg-gray-800/50 border border-border/50 dark:border-gray-600/50">
              <div className="text-2xl font-bold">
                {result.technical_insights.llmoAnalysis?.hasCitations ? (
                  <span className="text-green-600">✓</span>
                ) : (
                  <span className="text-red-600">✗</span>
                )}
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-300">Citations</div>
            </div>
          </div>
          
          {/* Schema Types List */}
          {result.technical_insights.schema_types_found.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Detected Schema Types:</h4>
              <div className="flex flex-wrap gap-2">
                {result.technical_insights.schema_types_found.map((schemaType, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-600">
                    {schemaType}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Heading Structure */}
          <div className="mt-4 p-3 rounded-lg bg-muted/30 dark:bg-gray-800/30 border border-border/50 dark:border-gray-600/50">
            <h4 className="font-semibold mb-2">Heading Structure:</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>H1 Count: <span className="font-medium">{result.technical_insights.heading_structure.h1_count}</span></div>
              <div>H2 Count: <span className="font-medium">{result.technical_insights.heading_structure.h2_count}</span></div>
              <div>
                Proper Hierarchy: 
                <span className={`font-medium ml-1 ${result.technical_insights.heading_structure.proper_hierarchy ? 'text-green-600' : 'text-red-600'}`}>
                  {result.technical_insights.heading_structure.proper_hierarchy ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="priority">Priority Fixes</TabsTrigger>
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          {categoryEntries.map(([key, category]) => (
            <Card key={key} className={`shadow-md border-l-4 ${getStatusColor(category.status)} bg-card dark:bg-gray-900/50 border dark:border-gray-700`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-foreground dark:text-gray-100">
                    {getCategoryIcon(key)}
                    {category.name}
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge className={getVerdictColor(category.status === 'pass' ? 'Good' : category.status === 'warning' ? 'Needs Improvement' : 'Poor')}>
                      {category.status.toUpperCase()}
                    </Badge>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${getScoreColor(category.score)}`}>
                        {category.score}/100
                      </div>
                      <Progress value={category.score} className="w-20 h-2" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Individual Checks */}
                <div className="space-y-3">
                  {category.checks.map((check, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getStatusColor(check.status)} bg-muted/30 dark:bg-gray-800/50 dark:border-gray-600`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getStatusIcon(check.status)}
                          <div>
                            <h5 className="font-medium text-foreground dark:text-gray-100">{check.name}</h5>
                            <p className="text-sm text-muted-foreground dark:text-gray-300 mt-1">{check.message}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getImpactColor(check.impact)}>
                          {check.impact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                {category.recommendations.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-foreground dark:text-gray-100">
                      <Target className="h-4 w-4 text-primary" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {category.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground dark:text-gray-200">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Priority Fixes Tab */}
        <TabsContent value="priority" className="space-y-4">
          {result.priority_fixes.map((fix, index) => (
            <Card key={index} className="shadow-md bg-card dark:bg-gray-900/50 border dark:border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-foreground dark:text-gray-100">{fix.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={getImpactColor(fix.impact)}>
                      {fix.impact} impact
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(fix.difficulty)}>
                      {fix.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground dark:text-gray-300 mb-4">{fix.description}</p>
                {fix.code_example && (
                  <div className="bg-muted dark:bg-gray-800/50 p-4 rounded-lg border dark:border-gray-600">
                    <h5 className="font-medium mb-2 flex items-center gap-2 text-foreground dark:text-gray-100">
                      <Code className="h-4 w-4" />
                      Code Example
                    </h5>
                    <pre className="text-sm whitespace-pre-wrap break-words text-foreground dark:text-gray-200">
                      <code>{fix.code_example}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Strengths Tab */}
        <TabsContent value="strengths" className="space-y-4">
          <Card className="shadow-md border-l-4 border-l-green-500 bg-card dark:bg-gray-900/50 border dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-700 dark:text-green-400">
                <Award className="h-6 w-6" />
                What Your Content Does Well
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground dark:text-gray-200">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-4">
          <Card className="shadow-md border-l-4 border-l-blue-500 bg-card dark:bg-gray-900/50 border dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-700 dark:text-blue-400">
                <TrendingUp className="h-6 w-6" />
                Growth Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground dark:text-gray-200">
                    <Target className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{opportunity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card className="shadow-md bg-card dark:bg-gray-900/50 border dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-gradient">
              <Link href="/dashboard/optimize">
                <FileText className="mr-2 h-4 w-4" />
                View Implementation Guide
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/audit/enhanced">
                <Brain className="mr-2 h-4 w-4" />
                Run Another Audit
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 