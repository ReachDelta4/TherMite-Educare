import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, TrendingDown, Users, UserCheck, PhoneCall, MessageSquare, 
  Award, GraduationCap, IndianRupee, Target, Filter, Calendar,
  BookOpen, Stethoscope, Calculator, Brain, Download, RefreshCw,
  AlertTriangle, CheckCircle, Clock, MapPin, Zap, Globe, 
  Eye, Activity, DollarSign, Percent, BarChart4, PieChart as PieChartIcon,
  LineChart as LineChartIcon, Star, Briefcase, Mail, Phone,
  Cpu, Database, Shield, TrendingDown as TrendingDownIcon,
  ArrowUpRight, ArrowDownRight, Calendar as CalendarIcon,
  Search, Settings, MoreHorizontal, Play, Pause, ChevronRight,
  Building, UserPlus, FileText, Send, MessageCircle, BarChart3
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList,
  AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, ScatterChart, Scatter, ReferenceLine
} from "recharts";

// Advanced Business Intelligence Data for TherMite Educare
const executiveMetrics = {
  totalRevenue: { value: "₹2.47Cr", change: "+34.2%", trend: "up", target: "₹3Cr" },
  activeStudents: { value: "3,247", change: "+28.7%", trend: "up", target: "4,000" },
  conversionRate: { value: "18.4%", change: "+4.2%", trend: "up", target: "20%" },
  customerLTV: { value: "₹45,600", change: "+12.8%", trend: "up", target: "₹50,000" },
  npsScore: { value: "73", change: "+8", trend: "up", target: "75" },
  churnRate: { value: "2.1%", change: "-0.8%", trend: "up", target: "1.5%" }
};

const realtimeData = {
  activeUsers: 142,
  liveClasses: 8,
  newLeads: 23,
  certificates: 12,
  whatsappMessages: 89,
  aiCalls: 7
};

const advancedSalesFunnel = [
  { stage: "Website Traffic", volume: 45670, conversion: 100, revenue: 0, cost: 156780 },
  { stage: "Lead Capture", volume: 8234, conversion: 18.03, revenue: 0, cost: 98450 },
  { stage: "Qualified Leads", volume: 4567, conversion: 10.01, revenue: 0, cost: 67890 },
  { stage: "Demo Scheduled", volume: 2341, conversion: 5.13, revenue: 0, cost: 45630 },
  { stage: "Proposal Sent", volume: 1876, conversion: 4.11, revenue: 0, cost: 34520 },
  { stage: "Enrollment", volume: 1247, conversion: 2.73, revenue: 12470000, cost: 23450 },
  { stage: "Payment Complete", volume: 1089, conversion: 2.39, revenue: 18945600, cost: 12340 },
  { stage: "Course Active", volume: 1034, conversion: 2.26, revenue: 24673000, cost: 8760 }
];

const coursePerformanceMatrix = [
  { 
    course: "Medical Coding", 
    enrolled: 567, 
    completed: 489, 
    satisfaction: 4.8, 
    revenue: 5670000,
    avgDuration: 4.2,
    placementRate: 94,
    roi: 340,
    difficulty: 7.2,
    engagement: 87
  },
  { 
    course: "Medical Billing", 
    enrolled: 423, 
    completed: 378, 
    satisfaction: 4.7, 
    revenue: 4230000,
    avgDuration: 3.8,
    placementRate: 91,
    roi: 320,
    difficulty: 6.8,
    engagement: 84
  },
  { 
    course: "NEET Coaching", 
    enrolled: 289, 
    completed: 267, 
    satisfaction: 4.9, 
    revenue: 5780000,
    avgDuration: 11.5,
    placementRate: 89,
    roi: 410,
    difficulty: 9.1,
    engagement: 92
  },
  { 
    course: "JEE Coaching", 
    enrolled: 334, 
    completed: 298, 
    satisfaction: 4.6, 
    revenue: 6680000,
    avgDuration: 12.2,
    placementRate: 87,
    roi: 390,
    difficulty: 9.4,
    engagement: 89
  },
  { 
    course: "CBSE/ICSE", 
    enrolled: 678, 
    completed: 634, 
    satisfaction: 4.5, 
    revenue: 6780000,
    avgDuration: 8.6,
    placementRate: 0,
    roi: 280,
    difficulty: 6.5,
    engagement: 81
  }
];

const predictiveAnalytics = [
  { month: "Apr 2025", projected: 2890000, confidence: 94, actualLastYear: 2340000 },
  { month: "May 2025", projected: 3120000, confidence: 91, actualLastYear: 2580000 },
  { month: "Jun 2025", projected: 3450000, confidence: 88, actualLastYear: 2890000 },
  { month: "Jul 2025", projected: 3780000, confidence: 85, actualLastYear: 3120000 },
  { month: "Aug 2025", projected: 4100000, confidence: 82, actualLastYear: 3450000 },
  { month: "Sep 2025", projected: 4350000, confidence: 79, actualLastYear: 3680000 }
];

const geoAnalytics = [
  { state: "Karnataka", students: 1247, revenue: 12470000, growth: 34.2, satisfaction: 4.7 },
  { state: "Maharashtra", students: 834, revenue: 8340000, growth: 28.7, satisfaction: 4.6 },
  { state: "Tamil Nadu", students: 567, revenue: 5670000, growth: 31.5, satisfaction: 4.8 },
  { state: "Delhi", students: 456, revenue: 4560000, growth: 25.3, satisfaction: 4.5 },
  { state: "Telangana", students: 389, revenue: 3890000, growth: 29.8, satisfaction: 4.7 },
  { state: "West Bengal", students: 234, revenue: 2340000, growth: 22.1, satisfaction: 4.4 }
];

const automationIntelligence = {
  whatsapp: {
    messagesProcessed: 156740,
    responseRate: 94.7,
    leadConversion: 23.4,
    avgResponseTime: "2.3s",
    satisfaction: 4.6,
    costPerLead: 78
  },
  aiCalling: {
    callsCompleted: 23470,
    successRate: 76.8,
    avgCallDuration: "4.2min",
    leadQuality: 8.3,
    conversionRate: 15.7,
    costPerCall: 12
  },
  certificates: {
    generated: 12340,
    avgProcessTime: "1.2min",
    errorRate: 0.02,
    deliverySuccess: 99.8,
    costSaving: 890000
  }
};

const competitiveAnalysis = [
  { metric: "Course Quality", thermite: 9.2, competitor1: 7.8, competitor2: 8.1, industry: 7.5 },
  { metric: "Pricing", thermite: 8.7, competitor1: 6.9, competitor2: 7.2, industry: 7.0 },
  { metric: "Technology", thermite: 9.5, competitor1: 7.2, competitor2: 6.8, industry: 6.9 },
  { metric: "Support", thermite: 9.1, competitor1: 8.0, competitor2: 7.5, industry: 7.3 },
  { metric: "Placement", thermite: 8.9, competitor1: 7.6, competitor2: 8.2, industry: 7.7 },
  { metric: "Innovation", thermite: 9.7, competitor1: 6.8, competitor2: 7.1, industry: 6.5 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

// Executive Overview Dashboard
const ExecutiveOverview = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Command Center Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Executive Command Center
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Real-time business intelligence • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRefresh} disabled={refreshing} size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Syncing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Real-time Status Bar */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Users: {realtimeData.activeUsers}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Play className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Classes: {realtimeData.liveClasses}</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4 text-purple-500" />
              <span className="text-sm">New Leads: {realtimeData.newLeads}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Certificates: {realtimeData.certificates}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-green-500" />
              <span className="text-sm">WhatsApp: {realtimeData.whatsappMessages}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-red-500" />
              <span className="text-sm">AI Calls: {realtimeData.aiCalls}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Executive KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(executiveMetrics).map(([key, metric]) => (
          <Card key={key} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </CardTitle>
                <div className={`p-2 rounded-lg ${metric.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">{metric.value}</span>
                  <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'}>
                    {metric.change}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target: {metric.target}</span>
                    <span className="font-medium">
                      {Math.round((parseFloat(metric.value.replace(/[^\d.]/g, '')) / parseFloat(metric.target.replace(/[^\d.]/g, ''))) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.round((parseFloat(metric.value.replace(/[^\d.]/g, '')) / parseFloat(metric.target.replace(/[^\d.]/g, ''))) * 100)} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Funnel Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Advanced Sales Funnel Intelligence
            </CardTitle>
            <CardDescription>
              Conversion optimization with cost analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={advancedSalesFunnel} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={120} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'volume' ? value : name === 'revenue' ? `₹${(value as number / 100000).toFixed(1)}L` : `₹${value}`,
                    name === 'volume' ? 'Volume' : name === 'revenue' ? 'Revenue' : 'Cost'
                  ]}
                />
                <Legend />
                <Bar dataKey="volume" fill="#8884d8" name="Volume" />
                <Bar dataKey="cost" fill="#82ca9d" name="Cost" />
                <Line dataKey="conversion" stroke="#ff7300" strokeWidth={3} name="Conversion %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              AI-Powered Predictive Revenue
            </CardTitle>
            <CardDescription>
              Machine learning revenue forecasting with confidence intervals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={predictiveAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`₹${(value as number / 100000).toFixed(1)}L`, name === 'projected' ? 'Projected' : name === 'confidence' ? 'Confidence %' : 'Last Year']} />
                <Legend />
                <Area type="monotone" dataKey="actualLastYear" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Last Year Actual" />
                <Area type="monotone" dataKey="projected" stackId="2" stroke="#8884d8" fill="#8884d8" name="AI Projection" />
                <Line type="monotone" dataKey="confidence" stroke="#ff7300" strokeWidth={2} name="Confidence %" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Analysis Radar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Competitive Intelligence Matrix
          </CardTitle>
          <CardDescription>
            Multi-dimensional competitive analysis across key business metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={competitiveAnalysis}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={0} domain={[0, 10]} />
              <Radar name="TherMite Educare" dataKey="thermite" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} strokeWidth={3} />
              <Radar name="Competitor A" dataKey="competitor1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
              <Radar name="Competitor B" dataKey="competitor2" stroke="#ffc658" fill="#ffc658" fillOpacity={0.2} />
              <Radar name="Industry Average" dataKey="industry" stroke="#ff7300" fill="#ff7300" fillOpacity={0.1} strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// Route-based Dashboard Renderer
export function PowerhouseDashboard() {
  const params = useParams();
  const dashboardType = params["*"] || "";

  const renderDashboard = () => {
    switch (dashboardType) {
      case "":
      case "overview":
        return <ExecutiveOverview />;
      case "sales":
        return <SalesIntelligence />;
      case "students":
        return <StudentAnalytics />;
      case "revenue":
        return <RevenueAnalytics />;
      case "marketing":
        return <MarketingROI />;
      case "operations":
        return <OperationalKPIs />;
      case "predictive":
        return <PredictiveAnalytics />;
      case "realtime":
        return <RealtimeReports />;
      default:
        return <ExecutiveOverview />;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-6">
      {renderDashboard()}
    </div>
  );
}

// Sales Intelligence Dashboard
const SalesIntelligence = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Sales Intelligence Hub
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Advanced sales analytics with AI-powered insights and lead scoring
        </p>
      </div>
    </div>

    {/* Sales Performance Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹89.4L</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+12.3%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">67.8%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+5.2%</span> improvement
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹28.4K</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+8.7%</span> increase
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales Velocity</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18.2 days</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500">+2.1 days</span> slower
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Sales Pipeline and Lead Scoring */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline by Stage</CardTitle>
          <CardDescription>Real-time pipeline progression with value analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={advancedSalesFunnel}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="volume" fill="#8884d8" name="Volume" />
              <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#ff7300" strokeWidth={3} name="Conversion %" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>High-Value Lead Intelligence</CardTitle>
          <CardDescription>AI-scored leads with behavioral insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Priya Sharma", company: "Apollo Hospitals", score: 94, course: "Medical Coding", value: "₹45K", status: "Hot" },
              { name: "Rajesh Kumar", company: "Fortis Healthcare", score: 88, course: "Medical Billing", value: "₹38K", status: "Warm" },
              { name: "Anitha Reddy", company: "Narayana Health", score: 82, course: "Medical Coding", value: "₹42K", status: "Warm" },
              { name: "Vikram Singh", company: "Max Healthcare", score: 76, course: "Medical Billing", value: "₹35K", status: "Qualified" }
            ].map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.company} • {lead.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Badge variant={lead.status === 'Hot' ? 'destructive' : lead.status === 'Warm' ? 'default' : 'secondary'}>
                      {lead.status}
                    </Badge>
                    <span className="font-bold">{lead.value}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{lead.score}/100</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Student Analytics Dashboard
const StudentAnalytics = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Student Success Analytics
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Comprehensive student lifecycle and performance intelligence
        </p>
      </div>
    </div>

    {/* Student Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3,247</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+234</span> this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">87.3%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+2.1%</span> improvement
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">72.8%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+5.3%</span> faster
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.7/5</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+0.2</span> increase
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Course Performance Matrix */}
    <Card>
      <CardHeader>
        <CardTitle>Course Performance Matrix</CardTitle>
        <CardDescription>Multi-dimensional analysis of course effectiveness and student outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={coursePerformanceMatrix}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="course" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="enrolled" fill="#8884d8" name="Enrolled" />
            <Bar yAxisId="left" dataKey="completed" fill="#82ca9d" name="Completed" />
            <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#ff7300" strokeWidth={3} name="Satisfaction" />
            <Line yAxisId="right" type="monotone" dataKey="placementRate" stroke="#8dd1e1" strokeWidth={2} name="Placement %" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Geographic Distribution */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Geographic Student Distribution</CardTitle>
          <CardDescription>Regional performance and growth analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geoAnalytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#8884d8" name="Students" />
              <Bar dataKey="growth" fill="#82ca9d" name="Growth %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Journey Insights</CardTitle>
          <CardDescription>Behavioral patterns and engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { metric: "Average Study Time", value: "4.2 hrs/day", trend: "+12%" },
              { metric: "Assignment Completion", value: "94.3%", trend: "+8%" },
              { metric: "Forum Participation", value: "76.8%", trend: "+15%" },
              { metric: "Peer Interaction", value: "68.9%", trend: "+22%" },
              { metric: "Mentor Sessions", value: "3.4/month", trend: "+18%" },
              { metric: "Resource Usage", value: "87.2%", trend: "+9%" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">{item.metric}</span>
                <div className="text-right">
                  <div className="font-bold">{item.value}</div>
                  <div className="text-sm text-green-500">{item.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Revenue Analytics Dashboard
const RevenueAnalytics = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Revenue Intelligence Center
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Financial performance analytics with predictive modeling
        </p>
      </div>
    </div>

    {/* Revenue Trend Analysis */}
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend Analysis</CardTitle>
        <CardDescription>Multi-stream revenue tracking with forecasting</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${(value as number / 100000).toFixed(1)}L`, ""]} />
            <Legend />
            <Area type="monotone" dataKey="medicalCoding" stackId="1" stroke="#8884d8" fill="#8884d8" name="Medical Coding" />
            <Area type="monotone" dataKey="medicalBilling" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Medical Billing" />
            <Area type="monotone" dataKey="academics" stackId="1" stroke="#ffc658" fill="#ffc658" name="Academic Coaching" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

// Marketing ROI Dashboard  
const MarketingROI = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Marketing ROI Intelligence
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Campaign performance and customer acquisition analytics
        </p>
      </div>
    </div>

    {/* Automation Performance */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            WhatsApp Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Messages Sent</span>
              <span className="font-bold">{automationIntelligence.whatsapp.messagesProcessed.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Response Rate</span>
              <span className="font-bold">{automationIntelligence.whatsapp.responseRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Lead Conversion</span>
              <span className="font-bold">{automationIntelligence.whatsapp.leadConversion}%</span>
            </div>
            <div className="flex justify-between">
              <span>Cost per Lead</span>
              <span className="font-bold">₹{automationIntelligence.whatsapp.costPerLead}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            AI Calling Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Calls Completed</span>
              <span className="font-bold">{automationIntelligence.aiCalling.callsCompleted.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate</span>
              <span className="font-bold">{automationIntelligence.aiCalling.successRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Conversion Rate</span>
              <span className="font-bold">{automationIntelligence.aiCalling.conversionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Cost per Call</span>
              <span className="font-bold">₹{automationIntelligence.aiCalling.costPerCall}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Certificate Automation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Certificates Generated</span>
              <span className="font-bold">{automationIntelligence.certificates.generated.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Process Time</span>
              <span className="font-bold">{automationIntelligence.certificates.avgProcessTime}</span>
            </div>
            <div className="flex justify-between">
              <span>Error Rate</span>
              <span className="font-bold">{automationIntelligence.certificates.errorRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Cost Savings</span>
              <span className="font-bold">₹{(automationIntelligence.certificates.costSaving / 1000).toFixed(0)}K</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Operational KPIs Dashboard
const OperationalKPIs = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Operational Excellence Dashboard
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Process efficiency and operational performance metrics
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">99.9%</div>
          <Progress value={99.9} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1.2s</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">-0.3s</span> improvement
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Data Processing</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.4TB</div>
          <p className="text-xs text-muted-foreground">
            Daily processed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Security Score</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98.7%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+1.2%</span> increase
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Predictive Analytics Dashboard
const PredictiveAnalytics = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          AI Predictive Intelligence
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Machine learning insights and future trend analysis
        </p>
      </div>
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Revenue Forecasting Model
        </CardTitle>
        <CardDescription>
          AI-powered 6-month revenue projection with confidence intervals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={predictiveAnalytics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value, name) => [`₹${(value as number / 100000).toFixed(1)}L`, name === 'projected' ? 'Projected' : name === 'confidence' ? 'Confidence %' : 'Last Year']} />
            <Legend />
            <Area type="monotone" dataKey="actualLastYear" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Last Year Actual" />
            <Area type="monotone" dataKey="projected" stackId="2" stroke="#8884d8" fill="#8884d8" name="AI Projection" />
            <Line type="monotone" dataKey="confidence" stroke="#ff7300" strokeWidth={2} name="Confidence %" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

// Real-time Reports Dashboard
const RealtimeReports = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Real-time Command Center
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Live operational data and instant business intelligence
        </p>
      </div>
    </div>

    {/* Live Activity Feed */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Live Activity Stream
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[
              { time: "2 min ago", event: "New enrollment: Medical Coding Course", user: "Priya Sharma", value: "₹25,000" },
              { time: "5 min ago", event: "Certificate generated", user: "Rajesh Kumar", value: "Medical Billing" },
              { time: "8 min ago", event: "WhatsApp lead converted", user: "Anitha Reddy", value: "₹30,000" },
              { time: "12 min ago", event: "Demo scheduled", user: "Vikram Singh", value: "JEE Coaching" },
              { time: "15 min ago", event: "Payment completed", user: "Meera Patel", value: "₹18,000" },
              { time: "18 min ago", event: "AI call successful", user: "Suresh Gupta", value: "NEET Coaching" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-muted/30 rounded-r-lg">
                <div>
                  <p className="font-medium">{activity.event}</p>
                  <p className="text-sm text-muted-foreground">{activity.user} • {activity.time}</p>
                </div>
                <Badge variant="outline">{activity.value}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { system: "WhatsApp Bot", status: "Operational", uptime: "99.9%" },
              { system: "AI Calling", status: "Operational", uptime: "98.7%" },
              { system: "Certificate Gen", status: "Operational", uptime: "99.8%" },
              { system: "Payment Gateway", status: "Operational", uptime: "99.5%" },
              { system: "Learning Platform", status: "Operational", uptime: "99.9%" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.system}</p>
                  <p className="text-sm text-muted-foreground">{item.uptime} uptime</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);