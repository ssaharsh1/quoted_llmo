'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Target,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Brain,
  Zap,
  Calendar,
  Download,
  RefreshCw,
  Award,
  Settings,
  Database,
  Users
} from 'lucide-react';

// Mock data for demonstration
const overviewData = {
  totalAudits: 156,
  averageScore: 78,
  topPerformer: 94,
  improvementRate: '+15%',
  lastUpdated: '2 hours ago'
};

const trendData = [
  { month: 'Jan', score: 65, audits: 12 },
  { month: 'Feb', score: 68, audits: 15 },
  { month: 'Mar', score: 72, audits: 18 },
  { month: 'Apr', score: 75, audits: 22 },
  { month: 'May', score: 78, audits: 28 },
  { month: 'Jun', score: 82, audits: 31 }
];

const categoryData = [
  { name: 'Technical Setup', current: 85, previous: 78, change: '+7' },
  { name: 'Structured Data', current: 92, previous: 88, change: '+4' },
  { name: 'Content Quality', current: 74, previous: 69, change: '+5' },
  { name: 'Meta Optimization', current: 81, previous: 76, change: '+5' },
  { name: 'AI Readability', current: 77, previous: 71, change: '+6' }
];

const distributionData = [
  { name: 'Excellent (90-100)', value: 23, color: '#10b981' },
  { name: 'Good (70-89)', value: 45, color: '#3b82f6' },
  { name: 'Needs Improvement (50-69)', value: 28, color: '#f59e0b' },
  { name: 'Poor (0-49)', value: 4, color: '#ef4444' }
];

const recentAudits = [
  { url: 'https://example.com/blog/ai-trends-2024', score: 94, date: '2024-01-15', status: 'excellent' },
  { url: 'https://example.com/guide/machine-learning', score: 87, date: '2024-01-14', status: 'good' },
  { url: 'https://example.com/news/tech-update', score: 65, date: '2024-01-13', status: 'needs-improvement' },
  { url: 'https://example.com/tutorial/python-basics', score: 91, date: '2024-01-12', status: 'excellent' },
  { url: 'https://example.com/opinion/future-of-ai', score: 73, date: '2024-01-11', status: 'good' }
];

const competitorData = [
  { name: 'Your Site', score: 78, color: '#8b5cf6' },
  { name: 'Competitor A', score: 72, color: '#10b981' },
  { name: 'Competitor B', score: 69, color: '#f59e0b' },
  { name: 'Competitor C', score: 84, color: '#ef4444' },
  { name: 'Industry Avg', score: 65, color: '#6b7280' }
];

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-blue-600"; 
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBadge = (score: number) => {
  if (score >= 90) return { color: "bg-green-100 text-green-800 border-green-300", label: "Excellent" };
  if (score >= 70) return { color: "bg-blue-100 text-blue-800 border-blue-300", label: "Good" };
  if (score >= 50) return { color: "bg-yellow-100 text-yellow-800 border-yellow-300", label: "Needs Improvement" };
  return { color: "bg-red-100 text-red-800 border-red-300", label: "Poor" };
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('score');

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="w-full max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">LLMO Analytics</h1>
            <p className="text-muted-foreground">
              Track your LLMO performance and optimization progress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Audits</p>
                  <p className="text-2xl font-bold">{overviewData.totalAudits}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(overviewData.averageScore)}`}>
                    {overviewData.averageScore}/100
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-600">{overviewData.improvementRate}</span>
                  </div>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Top Performer</p>
                  <p className={`text-2xl font-bold ${getScoreColor(overviewData.topPerformer)}`}>
                    {overviewData.topPerformer}/100
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Best scoring page</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-lg font-semibold">{overviewData.lastUpdated}</p>
                  <p className="text-xs text-muted-foreground mt-1">Data freshness</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Score Trend Chart */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    LLMO Score Trend
                  </CardTitle>
                  <CardDescription>
                    Your average LLMO score over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#8b5cf6" 
                        fill="#8b5cf6" 
                        fillOpacity={0.3} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Score Distribution */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Score Distribution
                  </CardTitle>
                  <CardDescription>
                    How your content scores are distributed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={distributionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${value}%`}
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Audits */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Recent Audits
                </CardTitle>
                <CardDescription>
                  Latest LLMO audit results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAudits.map((audit, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm break-all pr-4">{audit.url}</p>
                        <p className="text-xs text-muted-foreground mt-1">{audit.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getScoreBadge(audit.score).color}>
                          {audit.score}/100
                        </Badge>
                        <Badge variant="outline">
                          {getScoreBadge(audit.score).label}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid gap-6">
              {categoryData.map((category, index) => {
                const icons = [Settings, Database, Users, Eye, Brain];
                const IconComponent = icons[index];
                
                return (
                  <Card key={index} className="shadow-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-6 w-6 text-primary" />
                          <div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                            <CardDescription>
                              Current score: {category.current}/100
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-green-800 bg-green-100 border-green-300">
                            {category.change} this month
                          </Badge>
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${getScoreColor(category.current)}`}>
                              {category.current}
                            </p>
                            <p className="text-sm text-muted-foreground">vs {category.previous} last month</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to Excellence (90+)</span>
                          <span>{category.current}/90</span>
                        </div>
                        <Progress value={(category.current / 90) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Trends
                </CardTitle>
                <CardDescription>
                  Track your LLMO improvements over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="score">Average Score</SelectItem>
                      <SelectItem value="audits">Number of Audits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey={selectedMetric} 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Benchmarks Tab */}
          <TabsContent value="benchmarks" className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Competitive Analysis
                </CardTitle>
                <CardDescription>
                  See how you stack up against competitors and industry averages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={competitorData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Improvement Opportunities */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Improvement Opportunities
                </CardTitle>
                <CardDescription>
                  Areas where you can gain the most ground
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Content Quality</h4>
                      <p className="text-sm text-muted-foreground">
                        Improve E-E-A-T signals and author credibility
                      </p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      +16 points possible
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">AI Readability</h4>
                      <p className="text-sm text-muted-foreground">
                        Enhance content structure for AI comprehension
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                      +13 points possible
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Meta Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        Optimize titles and descriptions for AI discovery
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      +9 points possible
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
