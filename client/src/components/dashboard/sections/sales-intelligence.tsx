import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  AreaChart,
  Area,
  FunnelChart,
  Funnel,
  LabelList,
  Cell
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  Users,
  Lightbulb,
  FileText,
  Download,
  AlertCircle,
  Clock,
  Target,
  ArrowUpRight,
  Zap
} from "lucide-react";

// Mock Data
const pipelineData = [
  { stage: "Leads", value: 1200, conversion: 0.8 },
  { stage: "MQLs", value: 960, conversion: 0.4 },
  { stage: "SQLs", value: 384, conversion: 0.25 },
  { stage: "Opportunities", value: 96, conversion: 0.5 },
  { stage: "Customers", value: 48, conversion: 1 },
];

const revenueForecastData = [
  { month: "Apr", actual: 520000, forecast: 500000 },
  { month: "May", actual: 580000, forecast: 560000 },
  { month: "Jun", actual: 650000, forecast: 640000 },
  { month: "Jul", actual: null, forecast: 680000 },
  { month: "Aug", actual: null, forecast: 720000 },
  { month: "Sep", actual: null, forecast: 750000 },
];

const cashflowData = {
  revenue: 650000,
  costs: {
    marketing: 80000,
    instructors: 150000,
    platform: 45000,
    other: 25000,
  },
  get totalCosts() {
    return this.costs.marketing + this.costs.instructors + this.costs.platform + this.costs.other;
  },
  get netProfit() {
    return this.revenue - this.totalCosts;
  },
};

const salesPipelineTrend = [
  { month: "Jan", leads: 850, mql: 320, sql: 150, opportunities: 60 },
  { month: "Feb", leads: 920, mql: 380, sql: 180, opportunities: 75 },
  { month: "Mar", leads: 1050, mql: 420, sql: 210, opportunities: 85 },
  { month: "Apr", leads: 1200, mql: 480, sql: 240, opportunities: 96 },
];

const salesKPIs = [
  { 
    title: "Lead Conversion Rate", 
    value: "32.4%", 
    change: "+4.2%", 
    trend: "up", 
    description: "MQLs / Total Leads",
    icon: Target
  },
  { 
    title: "Avg. Deal Size", 
    value: "₹24,500", 
    change: "+12.8%", 
    trend: "up", 
    description: "Revenue / # of Deals",
    icon: DollarSign
  },
  { 
    title: "Sales Velocity", 
    value: "18 days", 
    change: "-3.5 days", 
    trend: "up", 
    description: "Lead to Close Time",
    icon: Clock
  },
  { 
    title: "Win Rate", 
    value: "48.2%", 
    change: "+2.1%", 
    trend: "up", 
    description: "Closed Won / Total Closed",
    icon: Zap
  },
];

const salesFunnelData = [
  { name: "First Contact", value: 12500, fill: "#8884d8" },
  { name: "Qualified Leads", value: 7800, fill: "#83a6ed" },
  { name: "Meetings Booked", value: 4200, fill: "#8dd1e1" },
  { name: "Proposals Sent", value: 2100, fill: "#82ca9d" },
  { name: "Closed Won", value: 950, fill: "#a4de6c" }
];

const salesCycleData = {
  closeRatio: 25,
  avgCycleLength: 32
};

export function SalesIntelligence({ selectedCourse }) {
  // TODO: Filter data based on selectedCourse

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">Sales Intelligence & Revenue</h2>
           <p className="text-muted-foreground">
             A consolidated view for {selectedCourse}.
           </p>
        </div>
        <Button>
           <Download className="mr-2 h-4 w-4" />
           Export Report
        </Button>
      </div>

      {/* Pipeline Performance & Forecasting */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline Performance</CardTitle>
            <CardDescription>Conversion rates through each stage.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium">{item.stage} ({item.value})</p>
                    {index < pipelineData.length - 1 && (
                      <p className="text-sm text-muted-foreground">Conv. Rate: {(item.conversion * 100).toFixed(0)}%</p>
                    )}
                  </div>
                  <Progress value={(item.value / pipelineData[0].value) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Forecast vs. Actual</CardTitle>
            <CardDescription>Tracking predictive accuracy for financial planning.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueForecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
                    <Tooltip formatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                    <Legend />
                    <Line type="monotone" dataKey="actual" name="Actual Revenue" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="forecast" name="Forecasted Revenue" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales Conversion Funnel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Sales Conversion Funnel</CardTitle>
            <CardDescription>From first contact to closed deal, showing active prospects in the funnel.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Funnel
                    dataKey="value"
                    data={salesFunnelData}
                    isAnimationActive
                    paddingAngle={0}
                    neckWidth="30%"
                    neckHeight="0%"
                  >
                    <LabelList 
                      position="right"
                      fill="#000"
                      stroke="none"
                      dataKey="name"
                      fontSize={12}
                    />
                    <LabelList
                      position="right"
                      fill="#666"
                      stroke="none"
                      dataKey="value"
                      fontSize={11}
                      formatter={(value) => value.toLocaleString()}
                      offset={60}
                    />
                    {salesFunnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Sales Cycle Metrics</CardTitle>
            <CardDescription>Key performance indicators for sales velocity.</CardDescription>
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

      {/* Sales Pipeline Trend & KPIs */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline Trend</CardTitle>
            <CardDescription>Monthly pipeline evolution across stages.</CardDescription>
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
        
        {/* Sales KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {salesKPIs.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{kpi.title}</p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">{kpi.value}</h3>
                      <span className={`ml-2 text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                  </div>
                  <div className={`p-2 rounded-full ${kpi.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    <kpi.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cashflow & Profitability */}
      <Card>
        <CardHeader>
          <CardTitle>This Quarter's Cashflow & Profitability</CardTitle>
          <CardDescription>A detailed breakdown of revenue, costs, and net profit.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Financial Summary (in ₹)</h3>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Total Revenue</TableCell>
                        <TableCell className="text-right text-green-600 font-bold">{cashflowData.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium text-red-600">Total Costs</TableCell>
                        <TableCell className="text-right text-red-600 font-bold">{cashflowData.totalCosts.toLocaleString()}</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-medium text-blue-600">Net Profit</TableCell>
                        <TableCell className="text-right text-blue-600 font-bold">{cashflowData.netProfit.toLocaleString()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Cost Breakdown</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount (in ₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(cashflowData.costs).map(([key, value]) => (
                   <TableRow key={key}>
                      <TableCell className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</TableCell>
                      <TableCell className="text-right">{value.toLocaleString()}</TableCell>
                   </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* AI-Powered Insights */}
       <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <span>AI-Powered Business Intelligence</span>
          </CardTitle>
          <CardDescription>Automated insights and strategic recommendations to drive growth.</CardDescription>
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
} 