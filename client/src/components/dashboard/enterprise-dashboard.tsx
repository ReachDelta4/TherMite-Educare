import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Building, UserPlus, FileText, Send, MessageCircle
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList,
  AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, ScatterChart, Scatter, ReferenceLine
} from "recharts";

// Business Metrics Data for TherMite Educare
const salesFunnelData = [
  { name: "Website Visitors", value: 12540, color: "#8884d8", percentage: 100 },
  { name: "Lead Inquiries", value: 3762, color: "#82ca9d", percentage: 30 },
  { name: "Demo Scheduled", value: 1881, color: "#ffc658", percentage: 15 },
  { name: "Course Enrollment", value: 752, color: "#ff7c7c", percentage: 6 },
  { name: "Payment Completed", value: 564, color: "#8dd1e1", percentage: 4.5 }
];

const coursePerformanceData = [
  { course: "Medical Coding", enrolled: 234, completed: 187, revenue: 2340000, satisfaction: 4.8 },
  { course: "Medical Billing", enrolled: 156, completed: 134, revenue: 1560000, satisfaction: 4.7 },
  { course: "NEET Coaching", enrolled: 89, completed: 76, revenue: 890000, satisfaction: 4.9 },
  { course: "JEE Coaching", enrolled: 112, completed: 89, revenue: 1120000, satisfaction: 4.6 },
  { course: "CBSE/ICSE/IB", enrolled: 345, completed: 298, revenue: 3450000, satisfaction: 4.5 },
  { course: "KCET Coaching", enrolled: 67, completed: 54, revenue: 670000, satisfaction: 4.7 }
];

const monthlyRevenueData = [
  { month: "Oct", medicalCoding: 380000, medicalBilling: 260000, academics: 420000, total: 1060000 },
  { month: "Nov", medicalCoding: 420000, medicalBilling: 290000, academics: 380000, total: 1090000 },
  { month: "Dec", medicalCoding: 480000, medicalBilling: 320000, academics: 450000, total: 1250000 },
  { month: "Jan", medicalCoding: 520000, medicalBilling: 340000, academics: 480000, total: 1340000 },
  { month: "Feb", medicalCoding: 590000, medicalBilling: 380000, academics: 520000, total: 1490000 },
  { month: "Mar", medicalCoding: 640000, medicalBilling: 410000, academics: 580000, total: 1630000 }
];

const automationMetricsData = [
  { metric: "WhatsApp Messages", value: 15640, change: "+12%", trend: "up" },
  { metric: "AI Calls Made", value: 2340, change: "+8%", trend: "up" },
  { metric: "Certificates Generated", value: 892, change: "+15%", trend: "up" },
  { metric: "Lead Response Time", value: "3.2 min", change: "-18%", trend: "up" },
  { metric: "Conversion Rate", value: "4.5%", change: "+0.8%", trend: "up" },
  { metric: "Customer Satisfaction", value: "4.7/5", change: "+0.2", trend: "up" }
];

const cityWiseEnrollmentData = [
  { city: "Bangalore", students: 234, revenue: 2340000 },
  { city: "Mumbai", students: 189, revenue: 1890000 },
  { city: "Delhi", students: 167, revenue: 1670000 },
  { city: "Chennai", students: 145, revenue: 1450000 },
  { city: "Hyderabad", students: 123, revenue: 1230000 },
  { city: "Pune", students: 98, revenue: 980000 },
  { city: "Others", students: 67, revenue: 670000 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

const MetricCard = ({ title, value, change, trend, icon: Icon }: any) => (
  <Card className="hover:shadow-lg transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center text-xs text-muted-foreground mt-1">
        {trend === "up" ? (
          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
        )}
        <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
          {change}
        </span>
        <span className="ml-1">from last month</span>
      </div>
    </CardContent>
  </Card>
);

const SummaryReports = () => (
  <div className="space-y-6">
    {/* Key Performance Indicators */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Revenue"
        value="₹16.3L"
        change="+23%"
        trend="up"
        icon={IndianRupee}
      />
      <MetricCard
        title="Active Students"
        value="1,023"
        change="+18%"
        trend="up"
        icon={Users}
      />
      <MetricCard
        title="Course Completions"
        value="838"
        change="+15%"
        trend="up"
        icon={GraduationCap}
      />
      <MetricCard
        title="Placement Rate"
        value="87%"
        change="+4%"
        trend="up"
        icon={Target}
      />
    </div>

    {/* Sales Funnel & Revenue Trend */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Acquisition Funnel</CardTitle>
          <CardDescription>Lead to enrollment conversion journey</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip />
              <Funnel
                dataKey="value"
                data={salesFunnelData}
                isAnimationActive
              >
                <LabelList position="center" fill="#fff" stroke="none" />
                {salesFunnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
          <CardDescription>Revenue breakdown by course categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${(value as number / 1000).toFixed(0)}K`, ""]} />
              <Legend />
              <Area type="monotone" dataKey="medicalCoding" stackId="1" stroke="#8884d8" fill="#8884d8" name="Medical Coding" />
              <Area type="monotone" dataKey="medicalBilling" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Medical Billing" />
              <Area type="monotone" dataKey="academics" stackId="1" stroke="#ffc658" fill="#ffc658" name="Academic Coaching" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>

    {/* Course Performance & Automation Metrics */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Course Performance Analysis</CardTitle>
          <CardDescription>Enrollment, completion rates and revenue by course</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={coursePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" angle={-45} textAnchor="end" height={80} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="enrolled" fill="#8884d8" name="Enrolled" />
              <Bar yAxisId="left" dataKey="completed" fill="#82ca9d" name="Completed" />
              <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#ff7300" strokeWidth={3} name="Satisfaction" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Automation Impact</CardTitle>
          <CardDescription>Key automation metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationMetricsData.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{metric.metric}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <Badge variant={metric.trend === "up" ? "default" : "destructive"}>
                  {metric.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const DetailedAnalytics = () => (
  <div className="space-y-6">
    {/* Geographic Distribution */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>City-wise Student Distribution</CardTitle>
          <CardDescription>Student enrollment by major cities</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cityWiseEnrollmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="students"
              >
                {cityWiseEnrollmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Journey Analytics</CardTitle>
          <CardDescription>Progression through different stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: "Initial Inquiry", count: 3762, rate: "100%" },
              { stage: "Demo Attended", count: 1881, rate: "50%" },
              { stage: "Course Started", count: 1023, rate: "54%" },
              { stage: "50% Complete", count: 916, rate: "90%" },
              { stage: "Course Completed", count: 838, rate: "82%" },
              { stage: "Placement Achieved", count: 729, rate: "87%" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="font-medium">{item.stage}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold">{item.count}</span>
                  <span className="text-sm text-muted-foreground ml-2">({item.rate})</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Advanced Metrics */}
    <Card>
      <CardHeader>
        <CardTitle>Advanced Performance Metrics</CardTitle>
        <CardDescription>Deep dive into business performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Financial Health</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monthly Recurring Revenue</span>
                <span className="font-medium">₹15.2L</span>
              </div>
              <div className="flex justify-between">
                <span>Customer Lifetime Value</span>
                <span className="font-medium">₹28,400</span>
              </div>
              <div className="flex justify-between">
                <span>Customer Acquisition Cost</span>
                <span className="font-medium">₹3,200</span>
              </div>
              <div className="flex justify-between">
                <span>Gross Margin</span>
                <span className="font-medium">78%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Student Success</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Average Completion Rate</span>
                <span className="font-medium">82%</span>
              </div>
              <div className="flex justify-between">
                <span>Student Satisfaction</span>
                <span className="font-medium">4.7/5</span>
              </div>
              <div className="flex justify-between">
                <span>Job Placement Rate</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="flex justify-between">
                <span>Referral Rate</span>
                <span className="font-medium">34%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Operational Efficiency</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Lead Response Time</span>
                <span className="font-medium">3.2 min</span>
              </div>
              <div className="flex justify-between">
                <span>WhatsApp Bot Efficiency</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="flex justify-between">
                <span>AI Call Success Rate</span>
                <span className="font-medium">76%</span>
              </div>
              <div className="flex justify-between">
                <span>Certificate Processing</span>
                <span className="font-medium">2.4 min</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ReportsExport = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Export Reports & Scheduled Analytics</CardTitle>
        <CardDescription>Generate and schedule comprehensive business reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Quick Export Options</h4>
            <div className="space-y-3">
              {[
                { name: "Monthly Revenue Report", description: "Comprehensive revenue breakdown", icon: IndianRupee },
                { name: "Student Performance Report", description: "Course completion and satisfaction metrics", icon: GraduationCap },
                { name: "Lead Analytics Report", description: "Sales funnel and conversion analysis", icon: Target },
                { name: "Automation Impact Report", description: "WhatsApp Bot and AI calling metrics", icon: MessageSquare }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <report.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Scheduled Reports</h4>
            <div className="space-y-3">
              {[
                { name: "Daily Operations Summary", schedule: "Every day at 9:00 AM", status: "Active" },
                { name: "Weekly Performance Review", schedule: "Every Monday at 10:00 AM", status: "Active" },
                { name: "Monthly Business Intelligence", schedule: "1st of every month", status: "Active" }
              ].map((schedule, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{schedule.name}</p>
                      <p className="text-sm text-muted-foreground">{schedule.schedule}</p>
                    </div>
                    <Badge variant="outline">{schedule.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export function EnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Enterprise Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive business intelligence for TherMite Educare
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary Reports</TabsTrigger>
          <TabsTrigger value="analytics">Detailed Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <SummaryReports />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <DetailedAnalytics />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportsExport />
        </TabsContent>
      </Tabs>
    </div>
  );
}