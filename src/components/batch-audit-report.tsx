import { 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Award,
  AlertTriangle,
  BarChart3,
  ExternalLink,
  FileText,
  Target,
  Users,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AuditReport } from "@/components/audit-report";
import Link from "next/link";
import type { BatchAuditOutput } from "@/ai/flows/audit-blog-post";

type BatchAuditReportProps = {
  result: BatchAuditOutput;
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-blue-600"; 
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBgColor = (score: number) => {
  if (score >= 90) return "bg-green-100 border-green-300";
  if (score >= 70) return "bg-blue-100 border-blue-300"; 
  if (score >= 50) return "bg-yellow-100 border-yellow-300";
  return "bg-red-100 border-red-300";
};

export function BatchAuditReport({ result }: BatchAuditReportProps) {
  const successfulResults = result.results.filter(r => r.result);
  const failedResults = result.results.filter(r => r.error);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total URLs</p>
                <p className="text-2xl font-bold">{result.total_urls}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold text-green-600">{result.successful}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{result.failed}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(result.summary.average_score)}`}>
                  {result.summary.average_score}/100
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Highlights */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Award className="h-6 w-6 text-primary" />
            Performance Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.summary.best_performing_url && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Best Performing URL
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-green-700 break-all">
                    {result.summary.best_performing_url}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      {successfulResults.find(r => r.url === result.summary.best_performing_url)?.result?.overall_score}/100
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={result.summary.best_performing_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {result.summary.worst_performing_url && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Needs Most Improvement
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-red-700 break-all">
                    {result.summary.worst_performing_url}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800 border-red-300">
                      {successfulResults.find(r => r.url === result.summary.worst_performing_url)?.result?.overall_score}/100
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={result.summary.worst_performing_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Common Issues */}
      {result.summary.common_issues.length > 0 && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              Common Issues Across Your Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {result.summary.common_issues.map((issue, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Zap className="h-4 w-4 text-orange-500 shrink-0" />
                  <span className="font-medium">{issue}</span>
                </div>
              ))}
            </div>
            <Alert className="mt-4 border-orange-200 bg-orange-50">
              <Users className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Priority Focus:</strong> These issues appear across multiple URLs. Fixing them will have the biggest impact on your overall LLMO performance.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Individual Results */}
      <Tabs defaultValue="successful" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="successful">
            Successful Audits ({result.successful})
          </TabsTrigger>
          <TabsTrigger value="failed">
            Failed Audits ({result.failed})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="successful" className="space-y-6">
          <div className="space-y-6">
            {successfulResults.map((item, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg break-all pr-4">{item.url}</CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge className={`${getScoreBgColor(item.result!.overall_score)}`}>
                          Score: {item.result!.overall_score}/100
                        </Badge>
                        <Badge variant="outline">{item.result!.verdict}</Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={item.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Visit
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <Progress value={item.result!.overall_score} className="w-24 h-2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{item.result!.summary}</p>
                    
                    {/* Quick Category Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(item.result!.categories).map(([key, category]) => (
                        <div key={key} className="text-center p-2 bg-muted/30 rounded">
                          <div className="text-xs font-medium capitalize">{key.replace('_', ' ')}</div>
                          <div className={`text-sm font-bold ${getScoreColor(category.score)}`}>
                            {category.score}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Expandable Full Report */}
                    <details className="border rounded-lg">
                      <summary className="p-4 cursor-pointer font-medium hover:bg-muted/50">
                        View Full Detailed Report
                      </summary>
                      <div className="border-t p-4">
                        <AuditReport result={item.result!} />
                      </div>
                    </details>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="failed" className="space-y-4">
          {failedResults.length === 0 ? (
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium">All audits completed successfully!</p>
                  <p className="text-muted-foreground">No errors occurred during the batch processing.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            failedResults.map((item, index) => (
              <Card key={index} className="shadow-md border-red-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium break-all">{item.url}</h4>
                      <p className="text-sm text-red-600 mt-1">{item.error}</p>
                      <Button variant="outline" size="sm" className="mt-3" asChild>
                        <Link href={item.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit URL
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 