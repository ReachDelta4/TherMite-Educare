import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import {
  BarChart,
  LineChart,
  PieChart,
  Users,
  Target,
  TrendingUp,
  DollarSign,
  Filter,
  Calendar,
  Download,
  Share2,
  Maximize,
  Settings
} from "lucide-react";

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
];

const leadSourceData = [
  { name: "Organic", value: 400, fill: "#8884d8" },
  { name: "Direct", value: 300, fill: "#82ca9d" },
  { name: "Referral", value: 200, fill: "#ffc658" },
  { name: "Social", value: 278, fill: "#ff8042" },
];

const conversionRateData = [
  { name: "Jan", rate: 2.5 },
  { name: "Feb", rate: 2.8 },
  { name: "Mar", rate: 3.2 },
  { name: "Apr", rate: 3.1 },
  { name: "May", rate: 3.5 },
  { name: "Jun", rate: 3.8 },
];

const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 150 },
    { month: 'Mar', users: 200 },
    { month: 'Apr', users: 230 },
    { month: 'May', users: 280 },
    { month: 'Jun', users: 320 },
];

// Metric cards data
const kpiData = [
  { title: "Total Revenue", value: "₹2,50,000", change: "+15.2%", icon: DollarSign, color: "text-green-500" },
  { title: "New Customers", value: "1,250", change: "+8.5%", icon: Users, color: "text-blue-500" },
  { title: "Conversion Rate", value: "4.8%", change: "+0.5%", icon: Target, color: "text-purple-500" },
  { title: "Customer Churn", value: "1.2%", change: "-0.2%", icon: TrendingUp, color: "text-red-500" },
];


export function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Deep dive into your business performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>{kpi.title}</CardDescription>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpi.value}</div>
              <p className="text-sm text-muted-foreground">{kpi.change} from last period</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Revenue Overview</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon"><Maximize className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon"><Settings className="h-4 w-4"/></Button>
              </div>
            </CardTitle>
            <CardDescription>Monthly revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--chart-1))" } }} className="h-[300px] w-full">
              <RechartsPrimitive.AreaChart data={revenueData}>
                <RechartsPrimitive.CartesianGrid vertical={false} />
                <RechartsPrimitive.XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <RechartsPrimitive.YAxis />
                <ChartTooltip content={<ChartTooltip content={({ payload }) => <div>{payload?.[0]?.value}</div>} />} />
                <RechartsPrimitive.Area type="monotone" dataKey="revenue" fill="var(--color-revenue)" fillOpacity={0.4} stroke="var(--color-revenue)" />
              </RechartsPrimitive.AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Lead Source Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lead Sources</span>
                <div className="flex gap-2">
                <Button variant="ghost" size="icon"><Maximize className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon"><Settings className="h-4 w-4"/></Button>
              </div>
            </CardTitle>
            <CardDescription>Distribution of leads by source</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <RechartsPrimitive.PieChart>
                <RechartsPrimitive.Pie data={leadSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {leadSourceData.map((entry, index) => (
                    <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </RechartsPrimitive.Pie>
                <ChartLegendContent />
                <ChartTooltip />
              </RechartsPrimitive.PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Conversion Rate Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Conversion Rate</span>
                <div className="flex gap-2">
                <Button variant="ghost" size="icon"><Maximize className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon"><Settings className="h-4 w-4"/></Button>
              </div>
            </CardTitle>
            <CardDescription>Lead to customer conversion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ rate: { label: "Rate", color: "hsl(var(--chart-2))" } }} className="h-[300px] w-full">
              <RechartsPrimitive.LineChart data={conversionRateData}>
                <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                <RechartsPrimitive.XAxis dataKey="name" />
                <RechartsPrimitive.YAxis />
                <ChartTooltip />
                <RechartsPrimitive.Line type="monotone" dataKey="rate" stroke="var(--color-rate)" strokeWidth={2} />
              </RechartsPrimitive.LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>User Growth</span>
               <div className="flex gap-2">
                <Button variant="ghost" size="icon"><Maximize className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon"><Settings className="h-4 w-4"/></Button>
              </div>
            </CardTitle>
            <CardDescription>New user acquisition over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ users: { label: "Users", color: "hsl(var(--chart-3))" } }} className="h-[300px] w-full">
              <RechartsPrimitive.BarChart data={userGrowthData}>
                <RechartsPrimitive.CartesianGrid vertical={false} />
                <RechartsPrimitive.XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <RechartsPrimitive.YAxis />
                <ChartTooltip />
                <RechartsPrimitive.Bar dataKey="users" fill="var(--color-users)" radius={4} />
              </RechartsPrimitive.BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 