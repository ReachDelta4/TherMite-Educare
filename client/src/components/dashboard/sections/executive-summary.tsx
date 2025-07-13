import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Timer,
  AlertCircle,
  CheckCircle,
  Award,
  Activity,
  BarChart4,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Download,
} from "lucide-react";

// Mock data for the dashboard
const revenuePerformanceData = [
  { month: "Jan", mrr: 420000, arr: 5040000, target: 400000 },
  { month: "Feb", mrr: 450000, arr: 5400000, target: 450000 },
  { month: "Mar", mrr: 480000, arr: 5760000, target: 500000 },
  { month: "Apr", mrr: 520000, arr: 6240000, target: 550000 },
  { month: "May", mrr: 580000, arr: 6960000, target: 600000 },
  { month: "Jun", mrr: 650000, arr: 7800000, target: 650000 },
];

const growthMetricsData = [
  { month: "Jan", activeStudents: 850, payingStudents: 720, retentionRate: 92 },
  { month: "Feb", activeStudents: 920, payingStudents: 780, retentionRate: 93 },
  { month: "Mar", activeStudents: 1050, payingStudents: 890, retentionRate: 91 },
  { month: "Apr", activeStudents: 1150, payingStudents: 980, retentionRate: 94 },
  { month: "May", activeStudents: 1280, payingStudents: 1090, retentionRate: 95 },
  { month: "Jun", activeStudents: 1450, payingStudents: 1230, retentionRate: 96 },
];

const operationalKPIData = [
  { name: "Medical Certification", cpa: 2500, ltvCacRatio: 4.8 },
  { name: "Academic Coaching", cpa: 1800, ltvCacRatio: 3.2 },
  { name: "Exam Preparation", cpa: 2200, ltvCacRatio: 3.6 },
  { name: "Professional Development", cpa: 2800, ltvCacRatio: 5.1 },
];

const revenueByStudentSegmentData = [
  { name: "Medical", value: 580000, fill: "#8884d8" },
  { name: "Academic", value: 420000, fill: "#83a6ed" },
  { name: "Professional", value: 320000, fill: "#8dd1e1" },
  { name: "Corporate", value: 280000, fill: "#82ca9d" },
];

const riskIndicatorsData = [
  { name: "Low", risk: "Churn Risk", value: 60, color: "#82ca9d" },
  { name: "Medium", risk: "Revenue at Risk", value: 25, color: "#ffc658" },
  { name: "High", risk: "Competitive Risk", value: 15, color: "#ff8042" },
];

const MetricCard = ({ title, value, change, trend, icon: Icon, description }) => (
    <Card>
     <CardHeader className="flex flex-row items-center justify-between pb-2">
       <CardTitle className="text-sm font-medium">{title}</CardTitle>
       <Icon className="h-4 w-4 text-muted-foreground" />
     </CardHeader>
     <CardContent>
       <div className="text-2xl font-bold">{value}</div>
       <div className="flex items-center pt-1 text-xs text-muted-foreground">
         {trend === "up" ? (
           <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
         ) : (
           <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
         )}
         <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
           {change}
         </span>
         <span className="ml-1">{description}</span>
       </div>
     </CardContent>
   </Card>
);


export function ExecutiveSummary() {
  return (
    <div className="space-y-6">
       <div>
         <h2 className="text-2xl font-bold tracking-tight">Executive Summary Dashboard</h2>
         <p className="text-muted-foreground">
           Key business metrics for strategic decision making
         </p>
       </div>
 
       {/* Key Performance Indicators */}
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
         <MetricCard
           title="Monthly Recurring Revenue (MRR)"
           value="₹6.5L"
           change="+12.1%"
           trend="up"
           icon={DollarSign}
           description="vs. last month"
         />
         <MetricCard
           title="Net Revenue Retention"
           value="118%"
           change="+3.5%"
           trend="up"
           icon={Activity}
           description="expansion vs churn"
         />
         <MetricCard
           title="Student Lifetime Value"
           value="₹45,600"
           change="+8.2%"
           trend="up"
           icon={Users}
           description="vs. last quarter"
         />
         <MetricCard
           title="LTV:CAC Ratio"
           value="3.8:1"
           change="+0.6"
           trend="up"
           icon={Target}
           description="above target"
         />
       </div>
 
       {/* Revenue Performance */}
       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
         <Card className="lg:col-span-2">
           <CardHeader>
             <CardTitle>Revenue Performance Intelligence</CardTitle>
             <CardDescription>MRR, ARR, and Target Comparison</CardDescription>
           </CardHeader>
           <CardContent>
             <ResponsiveContainer width="100%" height={300}>
               <ComposedChart data={revenuePerformanceData}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="month" />
                 <YAxis />
                 <Tooltip formatter={(value) => [`₹${(value / 100000).toFixed(1)}L`, ""]} />
                 <Legend />
                 <Bar dataKey="mrr" name="MRR" fill="#8884d8" />
                 <Line type="monotone" dataKey="target" name="Target" stroke="#ff7300" strokeWidth={2} />
               </ComposedChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <CardTitle>Revenue Per Student Segment</CardTitle>
             <CardDescription>Breakdown by program type</CardDescription>
           </CardHeader>
           <CardContent>
             <ResponsiveContainer width="100%" height={300}>
               <PieChart>
                 <Pie
                   data={revenueByStudentSegmentData}
                   cx="50%"
                   cy="50%"
                   labelLine={false}
                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                   outerRadius={80}
                   fill="#8884d8"
                   dataKey="value"
                 >
                   {revenueByStudentSegmentData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.fill} />
                   ))}
                 </Pie>
                 <Tooltip formatter={(value) => [`₹${(value / 100000).toFixed(1)}L`, ""]} />
               </PieChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>
       </div>
 
       {/* Growth Metrics */}
       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
         <Card className="lg:col-span-2">
           <CardHeader>
             <CardTitle>Growth Metrics</CardTitle>
             <CardDescription>Active vs. Paying Students and Retention Rate</CardDescription>
           </CardHeader>
           <CardContent>
             <ResponsiveContainer width="100%" height={300}>
               <ComposedChart data={growthMetricsData}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="month" />
                 <YAxis yAxisId="left" />
                 <YAxis yAxisId="right" orientation="right" domain={[80, 100]} />
                 <Tooltip />
                 <Legend />
                 <Bar yAxisId="left" dataKey="activeStudents" name="Active Students" fill="#8884d8" />
                 <Bar yAxisId="left" dataKey="payingStudents" name="Paying Students" fill="#82ca9d" />
                 <Line
                   yAxisId="right"
                   type="monotone"
                   dataKey="retentionRate"
                   name="Retention Rate %"
                   stroke="#ff7300"
                   strokeWidth={2}
                 />
               </ComposedChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <CardTitle>Time to Profitability</CardTitle>
             <CardDescription>Student cohort analysis</CardDescription>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               <div>
                 <div className="mb-1 flex items-center justify-between">
                   <div className="text-sm font-medium">Medical Certification</div>
                   <div className="text-sm font-medium">2.1 months</div>
                 </div>
                 <Progress value={70} className="h-2" />
               </div>
               <div>
                 <div className="mb-1 flex items-center justify-between">
                   <div className="text-sm font-medium">Academic Coaching</div>
                   <div className="text-sm font-medium">3.5 months</div>
                 </div>
                 <Progress value={42} className="h-2" />
               </div>
               <div>
                 <div className="mb-1 flex items-center justify-between">
                   <div className="text-sm font-medium">Professional Development</div>
                   <div className="text-sm font-medium">1.8 months</div>
                 </div>
                 <Progress value={82} className="h-2" />
               </div>
               <div>
                 <div className="mb-1 flex items-center justify-between">
                   <div className="text-sm font-medium">Corporate Training</div>
                   <div className="text-sm font-medium">1.2 months</div>
                 </div>
                 <Progress value={95} className="h-2" />
               </div>
             </div>
           </CardContent>
         </Card>
       </div>
 
       {/* Operational KPIs and Risk Indicators */}
       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
         <Card>
           <CardHeader>
             <CardTitle>Operational Excellence KPIs</CardTitle>
             <CardDescription>Cost efficiency and performance metrics</CardDescription>
           </CardHeader>
           <CardContent>
             <ResponsiveContainer width="100%" height={300}>
               <ComposedChart data={operationalKPIData}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="name" />
                 <YAxis yAxisId="left" domain={[0, 3500]} />
                 <YAxis yAxisId="right" orientation="right" domain={[0, 6]} />
                 <Tooltip />
                 <Legend />
                 <Bar yAxisId="left" dataKey="cpa" name="Cost Per Acquisition (₹)" fill="#8884d8" />
                 <Line
                   yAxisId="right"
                   type="monotone"
                   dataKey="ltvCacRatio"
                   name="LTV:CAC Ratio"
                   stroke="#ff7300"
                   strokeWidth={2}
                 />
               </ComposedChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <CardTitle>Risk & Opportunity Indicators</CardTitle>
             <CardDescription>Key risk metrics and expansion potential</CardDescription>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               {riskIndicatorsData.map((item, index) => (
                 <div key={index} className="flex items-center">
                   <div
                     className="mr-4 h-4 w-4 rounded-full"
                     style={{ backgroundColor: item.color }}
                   ></div>
                   <div className="flex-1">
                     <div className="flex justify-between text-sm font-medium">
                       <div>{item.risk}</div>
                       <div>{item.value}%</div>
                     </div>
                     <Progress value={item.value} className="h-2 mt-1" />
                   </div>
                 </div>
               ))}
 
               <div className="pt-4">
                 <h4 className="mb-2 text-sm font-medium">Expansion Opportunities</h4>
                 <div className="grid grid-cols-2 gap-2">
                   <div className="rounded-md bg-blue-50 p-2 text-center dark:bg-blue-950">
                     <div className="text-xs font-medium text-muted-foreground">South India</div>
                     <div className="text-lg font-bold">High</div>
                   </div>
                   <div className="rounded-md bg-green-50 p-2 text-center dark:bg-green-950">
                     <div className="text-xs font-medium text-muted-foreground">North East</div>
                     <div className="text-lg font-bold">Medium</div>
                   </div>
                 </div>
               </div>
             </div>
           </CardContent>
         </Card>
       </div>
 
       {/* Export Button */}
       <div className="flex justify-end">
         <Button>
           <Download className="mr-2 h-4 w-4" />
           Export Executive Summary
         </Button>
       </div>
     </div>
  );
} 