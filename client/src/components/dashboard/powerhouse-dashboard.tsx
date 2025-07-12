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

// Monthly Revenue Breakdown Data
const monthlyRevenueData = [
  { month: "Jul 2024", medicalCoding: 1240000, medicalBilling: 890000, academics: 1350000, total: 3480000 },
  { month: "Aug 2024", medicalCoding: 1380000, medicalBilling: 920000, academics: 1420000, total: 3720000 },
  { month: "Sep 2024", medicalCoding: 1520000, medicalBilling: 1080000, academics: 1580000, total: 4180000 },
  { month: "Oct 2024", medicalCoding: 1650000, medicalBilling: 1150000, academics: 1680000, total: 4480000 },
  { month: "Nov 2024", medicalCoding: 1780000, medicalBilling: 1240000, academics: 1820000, total: 4840000 },
  { month: "Dec 2024", medicalCoding: 1920000, medicalBilling: 1350000, academics: 1980000, total: 5250000 },
  { month: "Jan 2025", medicalCoding: 2080000, medicalBilling: 1450000, academics: 2150000, total: 5680000 }
];

// Business Funnel Analytics
const businessFunnel = [
  { name: "Website Visitors", value: 45670, fill: "#8884d8" },
  { name: "Lead Generation", value: 8234, fill: "#82ca9d" },
  { name: "Qualified Leads", value: 4567, fill: "#ffc658" },
  { name: "Demo Requests", value: 2341, fill: "#ff7c7c" },
  { name: "Proposals Sent", value: 1876, fill: "#8dd1e1" },
  { name: "Enrollments", value: 1247, fill: "#d084d0" },
  { name: "Active Students", value: 1089, fill: "#ffb347" },
  { name: "Completions", value: 967, fill: "#87ceeb" }
];

// Summary Dashboard KPIs
const summaryKPIs = {
  totalRevenue: 24700000,
  revenueGrowth: 34.2,
  activeStudents: 3247,
  studentGrowth: 28.7,
  courseCompletions: 2890,
  completionRate: 89.1,
  customerSatisfaction: 4.8,
  npsScore: 73,
  leadConversion: 18.4,
  avgDealSize: 28400,
  monthlyRecurring: 890000,
  churnRate: 2.1
};

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

      {/* Business Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Business Conversion Funnel
          </CardTitle>
          <CardDescription>
            Complete customer journey from awareness to completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <FunnelChart>
              <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
              <Funnel
                dataKey="value"
                data={businessFunnel}
                isAnimationActive
              >
                <LabelList position="center" fill="#fff" stroke="none" fontSize={12} />
              </Funnel>
            </FunnelChart>
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
      case "marketing":
        return <MarketingROI />;
      case "realtime":
        return <RealtimeReports />;
      case "summary":
        return <SummaryReports />;
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
          Advanced sales analytics with AI-powered insights, revenue intelligence and predictive analytics
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Sales Report
        </Button>
        <Button size="sm" variant="default">
          <Mail className="h-4 w-4 mr-2" />
          Email Report
        </Button>
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
              <span>Avg Call Duration</span>
              <span className="font-bold">{automationIntelligence.aiCalling.avgCallDuration} min</span>
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
              <span className="font-bold">₹{(automationIntelligence.certificates.costSavings / 100000).toFixed(0)}K</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Comprehensive Marketing Funnel */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Complete Marketing & Sales Funnel
        </CardTitle>
        <CardDescription>
          End-to-end customer journey with conversion optimization insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {advancedSalesFunnel.map((stage, index) => {
            const conversionFromPrevious = index > 0 ? ((stage.volume / advancedSalesFunnel[index - 1].volume) * 100).toFixed(1) : "100.0";
            const width = (stage.conversion * 5) + 20; // Scale width for better visibility
            
            return (
              <div key={stage.stage} className="relative">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-4 relative overflow-hidden"
                  style={{ width: `${width}%`, minWidth: '300px' }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">{stage.stage}</h4>
                      <p className="text-blue-100">{stage.volume.toLocaleString()} prospects</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{stage.conversion}%</div>
                      {index > 0 && (
                        <div className="text-blue-200 text-sm">
                          {conversionFromPrevious}% from previous
                        </div>
                      )}
                    </div>
                  </div>
                  {stage.revenue > 0 && (
                    <div className="mt-2 text-blue-100">
                      Revenue: ₹{(stage.revenue / 100000).toFixed(1)}L | Cost: ₹{stage.cost.toLocaleString()}
                    </div>
                  )}
                </div>
                {index < advancedSalesFunnel.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>

    {/* AI-Powered Predictive Revenue Forecasting */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          AI-Powered Revenue Forecasting
        </CardTitle>
        <CardDescription>
          Machine learning revenue projections with confidence intervals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={predictiveAnalytics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value, name) => [`₹${(value as number / 100000).toFixed(1)}L`, name === 'projected' ? 'AI Projection' : name === 'confidence' ? 'Confidence %' : 'Last Year Actual']} />
            <Legend />
            <Area type="monotone" dataKey="actualLastYear" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} name="Last Year Actual" />
            <Area type="monotone" dataKey="projected" stackId="2" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} name="AI Projection" />
            <Line type="monotone" dataKey="confidence" stroke="#ff7300" strokeWidth={3} name="Confidence %" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-700">₹3.45Cr</div>
            <div className="text-sm text-green-600">Projected Q2 Revenue</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">91%</div>
            <div className="text-sm text-blue-600">Confidence Level</div>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">+28%</div>
            <div className="text-sm text-orange-600">YoY Growth</div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Business Intelligence Summary */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Business Intelligence Summary
        </CardTitle>
        <CardDescription>
          AI-powered insights and recommendations for business growth
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <span className="font-medium text-green-800 dark:text-green-200">Strengths</span>
            </div>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• High student satisfaction (4.8/5)</li>
              <li>• Strong revenue growth (+34.2%)</li>
              <li>• Excellent completion rate (89.1%)</li>
              <li>• Low churn rate (2.1%)</li>
            </ul>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-600 mr-2" />
              <span className="font-medium text-orange-800 dark:text-orange-200">Opportunities</span>
            </div>
            <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
              <li>• Increase lead conversion rate</li>
              <li>• Expand to new markets</li>
              <li>• Enhance automation efficiency</li>
              <li>• Optimize pricing strategy</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <Zap className="h-4 w-4 text-blue-600 mr-2" />
              <span className="font-medium text-blue-800 dark:text-blue-200">Next Actions</span>
            </div>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Implement advanced lead scoring</li>
              <li>• Launch referral program</li>
              <li>• Improve WhatsApp conversion</li>
              <li>• Develop mobile app</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Enhanced Student Analytics Dashboard
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
      <div className="flex items-center space-x-3">
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Analytics
        </Button>
        <Button size="sm" variant="default">
          <Mail className="h-4 w-4 mr-2" />
          Email Report
        </Button>
      </div>
    </div>

    {/* Enhanced Student Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Enrolled</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3,247</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+234</span> this month
          </p>
          <Progress value={72} className="mt-2 h-1" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,456</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+18.2%</span> conversion rate
          </p>
          <Progress value={64} className="mt-2 h-1" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89.3%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+2.1%</span> improvement
          </p>
          <Progress value={89} className="mt-2 h-1" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.8/5</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+0.2</span> increase
          </p>
          <Progress value={96} className="mt-2 h-1" />
        </CardContent>
      </Card>
    </div>

    {/* Student Funnel Stages Analysis */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Student Journey Funnel
        </CardTitle>
        <CardDescription>Complete student lifecycle from lead to graduation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { stage: "Website Visitors", count: 45670, conversion: 100, description: "Monthly website traffic" },
            { stage: "Lead Capture", count: 8234, conversion: 18.0, description: "Demo requests & info downloads" },
            { stage: "Qualified Leads", count: 4567, conversion: 10.0, description: "Meets enrollment criteria" },
            { stage: "Trial/Demo", count: 2341, conversion: 5.1, description: "Attended demo sessions" },
            { stage: "Enrollment", count: 1247, conversion: 2.7, description: "Paid & started course" },
            { stage: "Active Learning", count: 1089, conversion: 2.4, description: "Regular participation" },
            { stage: "Completion", count: 973, conversion: 2.1, description: "Successfully graduated" },
            { stage: "Placement", count: 876, conversion: 1.9, description: "Got job placements" }
          ].map((stage, index) => {
            const width = Math.max((stage.conversion * 4) + 15, 25); // Scale for visibility
            
            return (
              <div key={stage.stage} className="relative">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4"
                  style={{ width: `${width}%`, minWidth: '320px' }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">{stage.stage}</h4>
                      <p className="text-purple-100">{stage.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{stage.count.toLocaleString()}</div>
                      <div className="text-purple-200 text-sm">{stage.conversion}% of total</div>
                    </div>
                  </div>
                </div>
                {index < 7 && (
                  <div className="flex justify-center my-2">
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>

    {/* Course Preferences & Performance */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Course Preferences & Performance Analytics
        </CardTitle>
        <CardDescription>Detailed analysis of student preferences and course effectiveness</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Average Course Preferences</h4>
            <div className="space-y-3">
              {[
                { course: "Medical Coding", preference: 85, enrolled: 567, avgRating: 4.8 },
                { course: "NEET Coaching", preference: 78, enrolled: 289, avgRating: 4.9 },
                { course: "JEE Coaching", preference: 72, enrolled: 334, avgRating: 4.6 },
                { course: "Medical Billing", preference: 68, enrolled: 423, avgRating: 4.7 },
                { course: "CBSE/ICSE", preference: 61, enrolled: 678, avgRating: 4.5 }
              ].map((item, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.course}</span>
                    <span className="text-sm text-muted-foreground">{item.enrolled} enrolled</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Preference Score</span>
                        <span>{item.preference}%</span>
                      </div>
                      <Progress value={item.preference} className="h-2" />
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{item.avgRating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Student Demographics & Behavior</h4>
            <div className="space-y-3">
              {[
                { metric: "Avg Age", value: "24.3 years", description: "Primary demographic" },
                { metric: "Study Time/Day", value: "4.2 hours", description: "Average engagement" },
                { metric: "Course Duration", value: "6.8 months", description: "Average completion time" },
                { metric: "Mobile Usage", value: "67.8%", description: "Access via mobile" },
                { metric: "Weekend Activity", value: "43.2%", description: "Weekend study rate" },
                { metric: "Peer Interaction", value: "78.9%", description: "Community participation" },
                { metric: "Resource Downloads", value: "89.3%", description: "Material utilization" },
                { metric: "Live Session Attendance", value: "82.1%", description: "Real-time participation" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                  <div>
                    <div className="font-medium">{item.metric}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  <div className="font-bold text-lg">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Enhanced Marketing ROI Dashboard
const MarketingROI = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Marketing ROI Intelligence
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Comprehensive marketing performance and customer acquisition analytics
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
        <Button size="sm" variant="default">
          <Mail className="h-4 w-4 mr-2" />
          Email Report
        </Button>
      </div>
    </div>

    {/* Marketing Cost Analysis */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Marketing Spend</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹18.4L</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500">+12.3%</span> from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customer Acquisition Cost</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹1,247</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">-8.2%</span> improvement
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Marketing ROI</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">340%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+45%</span> increase
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lead Quality Score</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8.7/10</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+0.4</span> improvement
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Marketing Channel Performance */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Marketing Channel Performance & Costs
        </CardTitle>
        <CardDescription>Detailed breakdown of marketing investments and returns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              channel: "WhatsApp Marketing",
              cost: 4567890,
              leads: 2340,
              conversions: 421,
              costPerLead: 78,
              roi: 420
            },
            {
              channel: "Domain & Website",
              cost: 234000,
              leads: 890,
              conversions: 156,
              costPerLead: 263,
              roi: 180
            },
            {
              channel: "Email Marketing",
              cost: 156000,
              leads: 1240,
              conversions: 234,
              costPerLead: 126,
              roi: 290
            },
            {
              channel: "AI Calling System",
              cost: 890000,
              leads: 1560,
              conversions: 312,
              costPerLead: 571,
              roi: 380
            },
            {
              channel: "Social Media Ads",
              cost: 890000,
              leads: 1890,
              conversions: 245,
              costPerLead: 471,
              roi: 210
            },
            {
              channel: "Content Marketing",
              cost: 340000,
              leads: 670,
              conversions: 89,
              costPerLead: 507,
              roi: 150
            }
          ].map((channel, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold">{channel.channel}</h4>
                <Badge variant={channel.roi > 300 ? 'default' : channel.roi > 200 ? 'secondary' : 'destructive'}>
                  {channel.roi}% ROI
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Investment:</span>
                  <span className="font-medium">₹{(channel.cost / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between">
                  <span>Leads Generated:</span>
                  <span className="font-medium">{channel.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversions:</span>
                  <span className="font-medium">{channel.conversions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost per Lead:</span>
                  <span className="font-medium">₹{channel.costPerLead}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion Rate:</span>
                  <span className="font-medium">{((channel.conversions / channel.leads) * 100).toFixed(1)}%</span>
                </div>
              </div>
              <Progress value={(channel.roi / 5)} className="mt-3 h-2" />
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Enhanced Marketing Funnel */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Marketing Conversion Funnel
        </CardTitle>
        <CardDescription>
          Complete marketing funnel with cost analysis and optimization insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {advancedSalesFunnel.map((stage, index) => {
            const conversionFromPrevious = index > 0 ? ((stage.volume / advancedSalesFunnel[index - 1].volume) * 100).toFixed(1) : "100.0";
            const width = Math.max((stage.conversion * 6) + 25, 35); // Enhanced width for better text display
            const costPerProspect = stage.cost / stage.volume;
            
            return (
              <div key={stage.stage} className="relative">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-5 relative overflow-hidden shadow-lg"
                  style={{ width: `${width}%`, minWidth: '400px' }} // Increased minimum width
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-1">{stage.stage}</h4>
                      <p className="text-orange-100 text-base">
                        {stage.volume.toLocaleString()} prospects
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold">{stage.conversion}%</div>
                      {index > 0 && (
                        <div className="text-orange-200 text-sm">
                          {conversionFromPrevious}% from previous
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-orange-100 text-sm">
                    <span>Cost: ₹{stage.cost.toLocaleString()}</span>
                    <span>Cost/Prospect: ₹{costPerProspect.toFixed(0)}</span>
                    {stage.revenue > 0 && <span>Revenue: ₹{(stage.revenue / 100000).toFixed(1)}L</span>}
                  </div>
                </div>
                {index < advancedSalesFunnel.length - 1 && (
                  <div className="flex justify-center my-3">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2">
                      <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Funnel Summary */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">₹67.8L</div>
            <div className="text-sm text-orange-600">Total Marketing Investment</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-700">2.39%</div>
            <div className="text-sm text-green-600">Overall Conversion Rate</div>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">340%</div>
            <div className="text-sm text-blue-600">Marketing ROI</div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Campaign Performance Over Time */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <LineChartIcon className="h-5 w-5 mr-2" />
          Campaign Performance Trends
        </CardTitle>
        <CardDescription>Monthly marketing performance and trend analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenueData.slice(-6)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="medicalCoding" stroke="#8884d8" strokeWidth={3} name="Medical Coding Revenue" />
            <Line type="monotone" dataKey="medicalBilling" stroke="#82ca9d" strokeWidth={3} name="Medical Billing Revenue" />
            <Line type="monotone" dataKey="academics" stroke="#ffc658" strokeWidth={3} name="Academic Coaching Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);
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

// Summary Reports Dashboard - Executive Summary
const SummaryReports = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Executive Summary Reports
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Comprehensive business overview with key performance indicators
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
        <Button size="sm" variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Export Excel
        </Button>
        <Button size="sm" variant="default">
          <Mail className="h-4 w-4 mr-2" />
          Email Report
        </Button>
      </div>
    </div>

    {/* Key Business Metrics Summary */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Revenue</CardTitle>
          <IndianRupee className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800 dark:text-green-200">
            ₹{(summaryKPIs.totalRevenue / 10000000).toFixed(1)}Cr
          </div>
          <p className="text-xs text-green-600 dark:text-green-400">
            <span className="font-medium">+{summaryKPIs.revenueGrowth}%</span> from last period
          </p>
          <Progress value={summaryKPIs.revenueGrowth} className="mt-2 h-1" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Active Students</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {summaryKPIs.activeStudents.toLocaleString()}
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            <span className="font-medium">+{summaryKPIs.studentGrowth}%</span> growth rate
          </p>
          <Progress value={summaryKPIs.studentGrowth} className="mt-2 h-1" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Completion Rate</CardTitle>
          <GraduationCap className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">
            {summaryKPIs.completionRate}%
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400">
            <span className="font-medium">{summaryKPIs.courseCompletions}</span> completions
          </p>
          <Progress value={summaryKPIs.completionRate} className="mt-2 h-1" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Satisfaction Score</CardTitle>
          <Star className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-800 dark:text-orange-200">
            {summaryKPIs.customerSatisfaction}/5
          </div>
          <p className="text-xs text-orange-600 dark:text-orange-400">
            <span className="font-medium">NPS: {summaryKPIs.npsScore}</span> score
          </p>
          <Progress value={(summaryKPIs.customerSatisfaction / 5) * 100} className="mt-2 h-1" />
        </CardContent>
      </Card>
    </div>

    {/* Business Performance Overview */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Revenue Stream Analysis
          </CardTitle>
          <CardDescription>
            Monthly revenue breakdown by course category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenueData.slice(-6)}>
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

      {/* Key Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Key Performance Indicators
          </CardTitle>
          <CardDescription>
            Critical business metrics at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                label: "Lead Conversion Rate", 
                value: `${summaryKPIs.leadConversion}%`, 
                target: "20%",
                progress: (summaryKPIs.leadConversion / 20) * 100,
                trend: "+4.2%"
              },
              { 
                label: "Average Deal Size", 
                value: `₹${(summaryKPIs.avgDealSize / 1000).toFixed(1)}K`, 
                target: "₹30K",
                progress: (summaryKPIs.avgDealSize / 30000) * 100,
                trend: "+8.7%"
              },
              { 
                label: "Monthly Recurring Revenue", 
                value: `₹${(summaryKPIs.monthlyRecurring / 100000).toFixed(1)}L`, 
                target: "₹10L",
                progress: (summaryKPIs.monthlyRecurring / 1000000) * 100,
                trend: "+15.3%"
              },
              { 
                label: "Customer Churn Rate", 
                value: `${summaryKPIs.churnRate}%`, 
                target: "1.5%",
                progress: 100 - ((summaryKPIs.churnRate / 1.5) * 100),
                trend: "-0.8%"
              }
            ].map((kpi, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{kpi.label}</span>
                  <div className="text-right">
                    <span className="font-bold">{kpi.value}</span>
                    <span className="text-xs text-muted-foreground ml-2">/ {kpi.target}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={Math.min(kpi.progress, 100)} className="flex-1 h-2" />
                  <Badge variant={kpi.trend.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                    {kpi.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>


  </div>
);