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
  Building, UserPlus, FileText, Send, MessageCircle, BarChart3,
  Timer, AlertCircle, X, Lightbulb
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
  { stage: "Website Traffic", volume: 45670, conversion: 100, revenue: 0, cost: 156780, cpa: 0, roi: 0, time: 0 },
  { stage: "Lead Capture", volume: 8234, conversion: 18.03, revenue: 0, cost: 98450, cpa: 11.95, roi: 0, time: 0 },
  { stage: "Qualified Leads", volume: 4567, conversion: 10.01, revenue: 0, cost: 67890, cpa: 14.87, roi: 0, time: 2 },
  { stage: "Demo Scheduled", volume: 2341, conversion: 5.13, revenue: 0, cost: 45630, cpa: 19.49, roi: 0, time: 3 },
  { stage: "Proposal Sent", volume: 1876, conversion: 4.11, revenue: 0, cost: 34520, cpa: 18.40, roi: 0, time: 5 },
  { stage: "Enrollment", volume: 1247, conversion: 2.73, revenue: 12470000, cost: 23450, cpa: 18.80, roi: 531.77, time: 7 },
  { stage: "Payment Complete", volume: 1089, conversion: 2.39, revenue: 18945600, cost: 12340, cpa: 11.33, roi: 1535.30, time: 9 },
  { stage: "Course Active", volume: 1034, conversion: 2.26, revenue: 24673000, cost: 8760, cpa: 8.47, roi: 2816.55, time: 10 }
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
    callsProcessed: 23470,
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

// Add revenue forecast data
const revenueForecastData = [
  { month: "Apr", actual: 520000, forecast: 500000 },
  { month: "May", actual: 580000, forecast: 560000 },
  { month: "Jun", actual: 650000, forecast: 640000 },
  { month: "Jul", actual: null, forecast: 680000 },
  { month: "Aug", actual: null, forecast: 720000 },
  { month: "Sep", actual: null, forecast: 750000 },
];

// Add sales pipeline trend data
const salesPipelineTrend = [
  { month: "Jan", leads: 850, mql: 320, sql: 150, opportunities: 60 },
  { month: "Feb", leads: 920, mql: 380, sql: 180, opportunities: 75 },
  { month: "Mar", leads: 1050, mql: 420, sql: 210, opportunities: 85 },
  { month: "Apr", leads: 1200, mql: 480, sql: 240, opportunities: 96 },
];

// Add sales cycle data
const salesCycleData = {
  closeRatio: 25,
  avgCycleLength: 32
};

// Business Funnel Analytics - Updated to match the image exactly
const businessFunnel = [
  { name: "Website Visitors", value: 45670, fill: "#8884d8", label: "Website V" },
  { name: "Lead Generation", value: 8234, fill: "#82ca9d", label: "Lead Gen" },
  { name: "Qualified Leads", value: 4567, fill: "#ffc658", label: "Qualified Leads" },
  { name: "Demo Requests", value: 2341, fill: "#ff7c7c", label: "Demo Requests" },
  { name: "Proposals Sent", value: 1876, fill: "#8dd1e1", label: "Proposals Sent" },
  { name: "Enrollments", value: 1247, fill: "#d084d0", label: "Enrollments" },
  { name: "Active Students", value: 1089, fill: "#ffb347", label: "Active Students" },
  { name: "Completions", value: 967, fill: "#87ceeb", label: "Completions" }
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

// Define types for our lead data
type Activity = {
  type: string;
  date: string;
};

type Lead = {
  id: number;
  name: string;
  company: string;
  score: number;
  course: string;
  value: string;
  status: string;
  email: string;
  phone: string;
  lastInteraction: string;
  source: string;
  activity: Activity[];
  notes: string;
};

// Add high-value leads data
const highValueLeads = [
  { 
    id: 1,
    name: "Priya Sharma", 
    company: "Apollo Hospitals", 
    score: 94, 
    course: "Medical Coding", 
    value: "₹45K", 
    status: "Hot",
    email: "priya.sharma@apollohospitals.com",
    phone: "+91 98765 43210",
    lastInteraction: "2 hours ago",
    source: "WhatsApp",
    activity: [
      { type: "Viewed Course", date: "Today, 10:30 AM" },
      { type: "Downloaded Brochure", date: "Today, 10:45 AM" },
      { type: "WhatsApp Inquiry", date: "Today, 11:15 AM" }
    ],
    notes: "Interested in batch starting next month. Budget approved by department head."
  },
  { 
    id: 2,
    name: "Rajesh Kumar", 
    company: "Fortis Healthcare", 
    score: 88, 
    course: "Medical Billing", 
    value: "₹38K", 
    status: "Warm",
    email: "rajesh.k@fortishealthcare.com",
    phone: "+91 87654 32109",
    lastInteraction: "Yesterday",
    source: "Website",
    activity: [
      { type: "Viewed Course", date: "Yesterday, 3:15 PM" },
      { type: "Requested Call", date: "Yesterday, 3:30 PM" }
    ],
    notes: "Looking for group enrollment of 3-4 team members. Price sensitive."
  },
  { 
    id: 3,
    name: "Anitha Reddy", 
    company: "Narayana Health", 
    score: 82, 
    course: "Medical Coding", 
    value: "₹42K", 
    status: "Warm",
    email: "anitha.r@narayanahealth.org",
    phone: "+91 76543 21098",
    lastInteraction: "2 days ago",
    source: "Email Campaign",
    activity: [
      { type: "Email Open", date: "2 days ago, 11:20 AM" },
      { type: "Clicked Link", date: "2 days ago, 11:25 AM" },
      { type: "Form Submission", date: "2 days ago, 11:40 AM" }
    ],
    notes: "Previous experience in coding. Looking for advanced certification."
  },
  { 
    id: 4,
    name: "Vikram Singh", 
    company: "Max Healthcare", 
    score: 76, 
    course: "Medical Billing", 
    value: "₹35K", 
    status: "Qualified",
    email: "vsingh@maxhealthcare.in",
    phone: "+91 65432 10987",
    lastInteraction: "3 days ago",
    source: "LinkedIn",
    activity: [
      { type: "LinkedIn Message", date: "3 days ago, 2:10 PM" },
      { type: "Viewed Website", date: "3 days ago, 2:45 PM" }
    ],
    notes: "New to healthcare domain but has strong finance background."
  },
  { 
    id: 5,
    name: "Deepak Verma", 
    company: "Manipal Hospitals", 
    score: 72, 
    course: "Medical Coding", 
    value: "₹40K", 
    status: "Qualified",
    email: "deepak.v@manipalhospitals.com",
    phone: "+91 54321 09876",
    lastInteraction: "4 days ago",
    source: "Referral",
    activity: [
      { type: "Phone Call", date: "4 days ago, 10:05 AM" },
      { type: "Email Sent", date: "4 days ago, 1:30 PM" }
    ],
    notes: "Referred by Dr. Sanjay (existing client). Needs course completion by Q3."
  },
  { 
    id: 6,
    name: "Kavitha Nair", 
    company: "KIMS Hospital", 
    score: 68, 
    course: "Medical Billing", 
    value: "₹38K", 
    status: "Interested",
    email: "k.nair@kimshospital.org",
    phone: "+91 43210 98765",
    lastInteraction: "5 days ago",
    source: "Webinar",
    activity: [
      { type: "Webinar Attendance", date: "5 days ago, 4:00 PM" },
      { type: "Question Asked", date: "5 days ago, 4:35 PM" }
    ],
    notes: "Asked detailed questions about certification validity. Budget constraints."
  },
  { 
    id: 7,
    name: "Sanjay Mehta", 
    company: "Ruby Hall Clinic", 
    score: 65, 
    course: "Medical Coding", 
    value: "₹42K", 
    status: "Interested",
    email: "sanjay.m@rubyhall.com",
    phone: "+91 32109 87654",
    lastInteraction: "1 week ago",
    source: "Google Search",
    activity: [
      { type: "Website Visit", date: "1 week ago, 11:20 AM" },
      { type: "Live Chat", date: "1 week ago, 11:35 AM" }
    ],
    notes: "Comparing multiple training providers. Decision expected next week."
  },
  { 
    id: 8,
    name: "Arjun Kapoor", 
    company: "Medanta", 
    score: 62, 
    course: "Medical Billing", 
    value: "₹36K", 
    status: "Interested",
    email: "arjun.k@medanta.org",
    phone: "+91 21098 76543",
    lastInteraction: "1 week ago",
    source: "Facebook Ad",
    activity: [
      { type: "Ad Click", date: "1 week ago, 9:15 AM" },
      { type: "Page View", date: "1 week ago, 9:20 AM" }
    ],
    notes: "Early research stage. Interested in EMR integration aspects of billing."
  },
  { 
    id: 9,
    name: "Preeti Sharma", 
    company: "BLK Hospital", 
    score: 60, 
    course: "Medical Coding", 
    value: "₹44K", 
    status: "New Lead",
    email: "preeti.s@blkhospital.com",
    phone: "+91 10987 65432",
    lastInteraction: "2 weeks ago",
    source: "Conference",
    activity: [
      { type: "Booth Visit", date: "2 weeks ago, 2:30 PM" },
      { type: "Brochure Taken", date: "2 weeks ago, 2:35 PM" }
    ],
    notes: "Met at Healthcare Tech Conference. Follow-up needed."
  }
];

// Update LeadDetailsModal component with types
const LeadDetailsModal = ({ lead, onClose }: { lead: Lead; onClose: () => void }) => {
  if (!lead) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{lead.name}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Lead summary */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-medium text-gray-800">{lead.company}</p>
              <div className="flex items-center mt-1">
                <Mail className="h-4 w-4 text-gray-500 mr-1.5" />
                <span className="text-gray-600">{lead.email}</span>
              </div>
              <div className="flex items-center mt-1">
                <Phone className="h-4 w-4 text-gray-500 mr-1.5" />
                <span className="text-gray-600">{lead.phone}</span>
              </div>
            </div>
            
            <div className="text-right">
              <Badge variant={lead.status === 'Hot' ? 'destructive' : lead.status === 'Warm' ? 'default' : 'secondary'}>
                {lead.status}
              </Badge>
              <div className="mt-1 flex items-center justify-end">
                <Star className="h-4 w-4 text-amber-500 mr-1" />
                <span className="font-bold">{lead.score}/100</span>
              </div>
              <p className="text-green-600 font-semibold mt-1">{lead.value}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interest details */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">INTEREST DETAILS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course</span>
                  <span className="font-medium">{lead.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Source</span>
                  <span className="font-medium">{lead.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Interaction</span>
                  <span className="font-medium">{lead.lastInteraction}</span>
                </div>
              </div>
            </div>
            
            {/* Lead quality */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">LEAD QUALITY</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Engagement Score</span>
                    <span className="text-xs font-medium">{Math.round(lead.score * 0.8)}/100</span>
                  </div>
                  <Progress value={lead.score * 0.8} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Purchase Intent</span>
                    <span className="text-xs font-medium">{Math.round(lead.score * 0.9)}/100</span>
                  </div>
                  <Progress value={lead.score * 0.9} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Budget Match</span>
                    <span className="text-xs font-medium">{Math.round(lead.score * 0.7)}/100</span>
                  </div>
                  <Progress value={lead.score * 0.7} className="h-2" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Activity timeline */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">RECENT ACTIVITY</h3>
            <div className="space-y-3">
              {lead.activity.map((activity, index) => (
                <div key={index} className="flex">
                  <div className="mr-3 flex flex-col items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                    {index < lead.activity.length - 1 && <div className="h-full w-0.5 bg-gray-200"></div>}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">{activity.type}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Notes */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">NOTES</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{lead.notes}</p>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button className="flex-1" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button className="flex-1" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

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

      {/* Key Business Metrics Summary */}
      <div className="mt-10 pt-6 border-t">
        <div className="flex items-center justify-between">
          <div>
            {/* Title removed as requested */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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

        {/* Key Performance Indicators */}
        <Card className="mt-6">
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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sales Intelligence</h1>
        <p className="text-lg text-muted-foreground mt-1">
          A comprehensive view of your sales pipeline and revenue generation
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex space-x-2">
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>

    {/* Top KPI Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Lead Conversion Rate</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold">32.4%</h3>
                <span className="ml-2 text-sm font-medium text-green-600">+4.2%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">MQLs / Total Leads</p>
            </div>
            <div className="p-2 rounded-full bg-green-100 text-green-700">
              <Target className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Deal Size</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold">₹24,500</h3>
                <span className="ml-2 text-sm font-medium text-green-600">+12.8%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Revenue / # of Deals</p>
            </div>
            <div className="p-2 rounded-full bg-green-100 text-green-700">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sales Velocity</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold">18 days</h3>
                <span className="ml-2 text-sm font-medium text-green-600">-3.5d</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Lead to Close Time</p>
            </div>
            <div className="p-2 rounded-full bg-green-100 text-green-700">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold">48.2%</h3>
                <span className="ml-2 text-sm font-medium text-green-600">+2.1%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Closed Won / Total Closed</p>
            </div>
            <div className="p-2 rounded-full bg-green-100 text-green-700">
              <Zap className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Main Content Area - Two Column Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Conversion Funnel and Business Intelligence */}
      <div className="space-y-6">
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
          <CardContent className="space-y-6">
            <div className="bg-white rounded-lg">
              <div className="h-[350px] relative">
                {/* Custom SVG funnel to match the image exactly */}
                <svg width="100%" height="100%" viewBox="0 0 550 350" preserveAspectRatio="xMidYMid meet">
                  {/* Website Visitors */}
                  <rect x="75" y="10" width="400" height="40" fill="#8884d8" />
                  <text x="275" y="35" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">45,670</text>
                  <text x="485" y="35" textAnchor="start" fill="black" fontSize="14">Website V</text>
                  
                  {/* Lead Generation */}
                  <path d="M 125 50 L 425 50 L 375 90 L 175 90 Z" fill="#82ca9d" />
                  <text x="275" y="75" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">8,234</text>
                  <text x="485" y="75" textAnchor="start" fill="black" fontSize="14">Lead Gen</text>
                  
                  {/* Qualified Leads */}
                  <path d="M 175 90 L 375 90 L 345 130 L 205 130 Z" fill="#ffc658" />
                  <text x="275" y="115" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">4,567</text>
                  <text x="485" y="115" textAnchor="start" fill="black" fontSize="14">Qualified Leads</text>
                  
                  {/* Demo Requests */}
                  <path d="M 205 130 L 345 130 L 325 170 L 225 170 Z" fill="#ff7c7c" />
                  <text x="275" y="155" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">2,341</text>
                  <text x="485" y="155" textAnchor="start" fill="black" fontSize="14">Demo Requests</text>
                  
                  {/* Proposals Sent */}
                  <path d="M 225 170 L 325 170 L 310 210 L 240 210 Z" fill="#8dd1e1" />
                  <text x="275" y="195" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">1,876</text>
                  <text x="485" y="195" textAnchor="start" fill="black" fontSize="14">Proposals Sent</text>
                  
                  {/* Enrollments */}
                  <path d="M 240 210 L 310 210 L 300 250 L 250 250 Z" fill="#d084d0" />
                  <text x="275" y="235" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">1,247</text>
                  <text x="485" y="235" textAnchor="start" fill="black" fontSize="14">Enrollments</text>
                  
                  {/* Active Students */}
                  <path d="M 250 250 L 300 250 L 295 290 L 255 290 Z" fill="#ffb347" />
                  <text x="275" y="275" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">1,089</text>
                  <text x="485" y="275" textAnchor="start" fill="black" fontSize="14">Active Students</text>
                  
                  {/* Completions */}
                  <rect x="255" y="290" width="40" height="40" fill="#87ceeb" />
                  <text x="275" y="315" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">967</text>
                  <text x="485" y="315" textAnchor="start" fill="black" fontSize="14">Completions</text>
                </svg>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Funnel Conversion Analysis</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <h4 className="text-xs font-semibold text-slate-700">Visitor-to-Lead</h4>
                  <p className="text-xl font-bold text-slate-900">18.0%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <h4 className="text-xs font-semibold text-slate-700">Lead-to-Demo</h4>
                  <p className="text-xl font-bold text-slate-900">28.4%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <h4 className="text-xs font-semibold text-slate-700">Demo-to-Enroll</h4>
                  <p className="text-xl font-bold text-slate-900">53.3%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <h4 className="text-xs font-semibold text-slate-700">Completion Rate</h4>
                  <p className="text-xl font-bold text-slate-900">88.8%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Forecast - Fixed height, no vertical stretching */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Forecast vs. Actual</CardTitle>
            <CardDescription>Tracking predictive accuracy for financial planning</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueForecastData}>
              <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value as number) / 100000}L`} />
                <Tooltip formatter={(value) => `₹${((value as number) / 1000).toFixed(0)}k`} />
              <Legend />
                <Line type="monotone" dataKey="actual" name="Actual Revenue" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="forecast" name="Forecasted Revenue" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      </div>

      {/* Right Column - Lead Intelligence and Detailed Metrics */}
      <div className="space-y-6">
        {/* High-Value Lead Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle>High-Value Lead Intelligence</CardTitle>
          <CardDescription>AI-scored leads with behavioral insights</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Added useState hook for managing selected lead and modal visibility */}
            {(() => {
              const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
              const [showLoadMore, setShowLoadMore] = React.useState(false);
              
              // Show the first 5 leads initially, then allow loading more
              const [visibleLeads, setVisibleLeads] = React.useState(5);
              
              React.useEffect(() => {
                // Show the load more button after initial load
                if (highValueLeads.length > visibleLeads) {
                  setShowLoadMore(true);
                }
              }, [visibleLeads]);
              
              const handleLoadMore = () => {
                setVisibleLeads(prev => Math.min(prev + 3, highValueLeads.length));
                if (visibleLeads + 3 >= highValueLeads.length) {
                  setShowLoadMore(false);
                }
              };
              
              return (
                <>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                    {highValueLeads.slice(0, visibleLeads).map((lead, index) => (
                      <div 
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      >
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
                    
                    {showLoadMore && (
                      <div className="text-center py-3">
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={handleLoadMore}
                        >
                          Load more leads
                        </Button>
          </div>
                    )}
    </div>

                  {selectedLead && (
                    <LeadDetailsModal 
                      lead={selectedLead} 
                      onClose={() => setSelectedLead(null)}
                    />
                  )}
                </>
              );
            })()}
        </CardContent>
      </Card>

        {/* Sales Pipeline Trend */}
      <Card>
        <CardHeader>
            <CardTitle>Sales Pipeline Trend</CardTitle>
            <CardDescription>Monthly pipeline evolution across stages</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesPipelineTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
                <Tooltip />
              <Legend />
                <Area type="monotone" dataKey="leads" name="Leads" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Area type="monotone" dataKey="mql" name="MQLs" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Area type="monotone" dataKey="sql" name="SQLs" stackId="1" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Area type="monotone" dataKey="opportunities" name="Opportunities" stackId="1" stroke="#ff8042" fill="#ff8042" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

        {/* Sales Cycle Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Cycle Metrics</CardTitle>
            <CardDescription>Key performance indicators for sales velocity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Close Ratio */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-medium">Close ratio</h3>
                <span className="text-4xl font-bold">{salesCycleData.closeRatio}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 relative">
                <div 
                  className="bg-primary h-4 rounded-full" 
                  style={{ width: `${salesCycleData.closeRatio}%` }}
                ></div>
                <div className="absolute top-0 left-0 w-full flex justify-between px-2 text-xs text-white">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
    </div>

            {/* Avg Cycle Length */}
            <div className="text-center">
              <h3 className="text-base font-medium mb-2">Avg cycle length</h3>
              <div className="flex items-center justify-center">
                <span className="text-6xl font-bold">{salesCycleData.avgCycleLength}</span>
                <span className="text-2xl ml-1">d</span>
              </div>
              <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                <span>1</span>
                <span>7</span>
                <span>14</span>
                <span>21</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Advanced Sales Funnel Intelligence - Made full-width */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Advanced Sales Funnel Intelligence
        </CardTitle>
        <CardDescription>
          Conversion optimization with cost analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div>
              <p className="text-xs text-slate-500">Total Website Traffic</p>
              <p className="text-lg font-semibold">{advancedSalesFunnel[0].volume.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Lead Conversion</p>
              <p className="text-lg font-semibold">{advancedSalesFunnel[1].conversion.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Customer Conversion</p>
              <p className="text-lg font-semibold">{advancedSalesFunnel[6].conversion.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart 
            data={advancedSalesFunnel} 
            layout="vertical" 
            margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="stage" type="category" width={120} tick={{ fontSize: 12 }} />
            <Tooltip content={({ active, payload }) => <AdvancedFunnelTooltip active={active} payload={payload} />} />
            <Legend />
            <Bar dataKey="volume" name="Volume" fill="#8884d8" barSize={20} />
            <Bar dataKey="cost" name="Cost (₹)" fill="#82ca9d" barSize={20} />
            <Line 
              dataKey="conversion" 
              name="Conversion %" 
              stroke="#ff7300" 
              strokeWidth={3}
              dot={{ stroke: '#ff7300', strokeWidth: 2, r: 4 }}
              activeDot={{ stroke: '#ff7300', strokeWidth: 2, r: 6 }}
            />
            <Line 
              dataKey="cpa" 
              name="CPA (₹)" 
              stroke="#0088FE" 
              strokeWidth={2}
              dot={{ stroke: '#0088FE', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">Funnel Performance Metrics</h4>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-slate-500">Website to Lead</p>
              <p className="text-base font-semibold">{(advancedSalesFunnel[1].volume / advancedSalesFunnel[0].volume * 100).toFixed(1)}%</p>
              <p className="text-xs text-slate-400">CPA: ₹{advancedSalesFunnel[1].cpa.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Lead to Demo</p>
              <p className="text-base font-semibold">{(advancedSalesFunnel[3].volume / advancedSalesFunnel[1].volume * 100).toFixed(1)}%</p>
              <p className="text-xs text-slate-400">CPA: ₹{advancedSalesFunnel[3].cpa.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Demo to Enrollment</p>
              <p className="text-base font-semibold">{(advancedSalesFunnel[5].volume / advancedSalesFunnel[3].volume * 100).toFixed(1)}%</p>
              <p className="text-xs text-slate-400">CPA: ₹{advancedSalesFunnel[5].cpa.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Overall ROI</p>
              <p className="text-base font-semibold text-green-600">{advancedSalesFunnel[7].roi.toFixed(1)}x</p>
              <p className="text-xs text-slate-400">Revenue: ₹{(advancedSalesFunnel[7].revenue/1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Bottom Full Width Section - AI Insights */}
    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          <span>AI-Powered Business Intelligence</span>
        </CardTitle>
        <CardDescription>Automated insights and strategic recommendations to drive growth</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div className="p-4 bg-background rounded-lg">
          <h4 className="font-semibold mb-2 text-green-600">Strengths</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>High student satisfaction (4.8/5)</li>
            <li>Strong revenue growth (+34.2%)</li>
            <li>Excellent completion rate (89.1%)</li>
          </ul>
        </div>
        <div className="p-4 bg-background rounded-lg">
          <h4 className="font-semibold mb-2 text-yellow-600">Opportunities</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Increase lead conversion rate</li>
            <li>Expand to new markets</li>
            <li>Optimize pricing strategy</li>
          </ul>
        </div>
        <div className="p-4 bg-background rounded-lg">
          <h4 className="font-semibold mb-2 text-red-600">Threats</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>High CPA in Medical segment</li>
            <li>New competitor in Academic space</li>
            <li>Over-reliance on paid ads</li>
          </ul>
        </div>
        <div className="p-4 bg-background rounded-lg">
          <h4 className="font-semibold mb-2 text-indigo-600">Next Actions</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Implement advanced lead scoring</li>
            <li>Launch referral program</li>
            <li>A/B test landing pages</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Fix the AdvancedFunnelTooltip type issue
const AdvancedFunnelTooltip = ({ active, payload }: { active: boolean; payload?: any[] }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="p-4 bg-white border rounded-lg shadow-lg min-w-[220px]">
        <h4 className="font-bold text-lg mb-1">{data.stage}</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
          <div>
            <p className="text-xs text-gray-500">Volume</p>
            <p className="font-semibold">{data.volume.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Conversion</p>
            <p className="font-semibold">{data.conversion}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Cost</p>
            <p className="font-semibold">₹{data.cost.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">CPA</p>
            <p className="font-semibold">₹{data.cpa.toFixed(2)}</p>
          </div>
          {data.revenue > 0 && (
            <>
              <div>
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="font-semibold text-green-600">₹{(data.revenue / 100000).toFixed(1)}L</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">ROI</p>
                <p className="font-semibold text-green-600">{data.roi.toFixed(1)}x</p>
              </div>
            </>
          )}
          {data.time > 0 && (
            <div>
              <p className="text-xs text-gray-500">Avg. Time</p>
              <p className="font-semibold">{data.time} days</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

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
              <span className="font-bold">₹{(automationIntelligence.certificates.costSaving / 1000).toFixed(0)}K</span>
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
            <Tooltip formatter={(value, name) => [`₹${(value as number / 100000).toFixed(1)}L`, name === 'projected' ? 'Projected' : name === 'confidence' ? 'Confidence %' : 'Last Year Actual']} />
            <Legend />
            <Area type="monotone" dataKey="actualLastYear" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} name="Last Year Actual" />
            <Area type="monotone" dataKey="projected" stackId="2" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} name="AI Projection" />
            <Line type="monotone" dataKey="confidence" stroke="#ff7300" strokeWidth={3} name="Confidence %" />
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