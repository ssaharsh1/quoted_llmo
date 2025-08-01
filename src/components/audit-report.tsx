import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  Code, 
  Lightbulb,
  Award,
  Target,
  Zap,
  FileText,
  Settings,
  Database,
  Users,
  Eye,
  Brain
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AuditBlogPostOutput } from "@/ai/flows/audit-blog-post";

type AuditReportProps = {
  result: AuditBlogPostOutput;
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-blue-600"; 
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
};

const getVerdictColor = (verdict: string) => {
  switch (verdict) {
    case 'Excellent': return "border-green-500 bg-green-50 text-green-800";
    case 'Good': return "border-blue-500 bg-blue-50 text-blue-800";
    case 'Needs Improvement': return "border-yellow-500 bg-yellow-50 text-yellow-800";
    case 'Poor': return "border-red-500 bg-red-50 text-red-800";
    default: return "border-gray-500 bg-gray-50 text-gray-800";
  }
};

const getStatusIcon = (status: 'pass' | 'warning' | 'fail') => {
  switch (status) {
    case 'pass': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'fail': return <XCircle className="h-5 w-5 text-red-500" />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'technical_setup': return <Settings className="h-6 w-6" />;
    case 'structured_data': return <Database className="h-6 w-6" />;
    case 'content_quality': return <Users className="h-6 w-6" />;
    case 'meta_optimization': return <Eye className="h-6 w-6" />;
    case 'ai_readability': return <Brain className="h-6 w-6" />;
    default: return <FileText className="h-6 w-6" />;
  }
};

const getDifficultyBadge = (difficulty: 'easy' | 'medium' | 'hard') => {
  const colors = {
    easy: "bg-green-100 text-green-800 border-green-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300", 
    hard: "bg-red-100 text-red-800 border-red-300"
  };
  return <Badge variant="outline" className={colors[difficulty]}>{difficulty}</Badge>;
};

const getImpactBadge = (impact: 'high' | 'medium' | 'low') => {
  const colors = {
    high: "bg-red-100 text-red-800 border-red-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    low: "bg-green-100 text-green-800 border-green-300"
  };
  return <Badge variant="outline" className={colors[impact]}>{impact} impact</Badge>;
};

export function AuditReport({ result }: AuditReportProps) {
  return (
    <div className="space-y-6">
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
                  LLMO Score: <span className={getScoreColor(result.overall_score)}>
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
          <p className="text-muted-foreground text-lg">{result.summary}</p>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="priorities">Priority Fixes</TabsTrigger>
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          {Object.entries(result.categories).map(([key, category]) => (
            <Card key={key} className="shadow-md">
        <CardHeader>
                <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
                    {getCategoryIcon(key)}
                    <div>
                      <CardTitle className="text-xl capitalize">
                        {category.name}
            </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(category.status)}
                        <span className={`font-semibold ${getScoreColor(category.score)}`}>
                          {category.score}/100
                        </span>
                      </div>
                    </div>
                  </div>
                  <Progress value={category.score} className="w-24 h-2" />
          </div>
        </CardHeader>
        <CardContent>
                <div className="space-y-4">
                  {/* Individual Checks */}
                  <div className="grid gap-2">
                    {category.checks.map((check, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{check.name}</span>
                            {getImpactBadge(check.impact)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{check.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Recommendations */}
                  {category.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {category.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Target className="h-4 w-4 mt-1 text-primary shrink-0" />
                            <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Priority Fixes Tab */}
        <TabsContent value="priorities" className="space-y-4">
          {result.priority_fixes.map((fix, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    {fix.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    {getImpactBadge(fix.impact)}
                    {getDifficultyBadge(fix.difficulty)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{fix.description}</p>
                {fix.code_example && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Code Example
                    </h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
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
          <Alert className="border-green-200 bg-green-50">
            <Award className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              These are the areas where your content excels for LLMO:
            </AlertDescription>
          </Alert>
          <div className="grid gap-3">
            {result.strengths.map((strength, index) => (
              <Card key={index} className="shadow-sm border-green-200">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <span>{strength}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Key opportunities to improve your LLMO performance:
            </AlertDescription>
          </Alert>
          <div className="grid gap-3">
            {result.opportunities.map((opportunity, index) => (
              <Card key={index} className="shadow-sm border-blue-200">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-500 mt-1 shrink-0" />
                    <span>{opportunity}</span>
                  </div>
        </CardContent>
      </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
