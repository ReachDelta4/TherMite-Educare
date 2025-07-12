import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MessageSquare,
  BarChart,
  PieChart,
  LineChart,
  Calendar,
  Filter,
  Users,
  CheckCircle,
  AlertCircle,
  Clock,
  Send,
  Eye,
  MousePointerClick
} from "lucide-react";

const engagementData = [
  { date: "2024-07-01", sent: 400, delivered: 390, read: 350, replied: 120 },
  { date: "2024-07-02", sent: 450, delivered: 440, read: 400, replied: 150 },
  { date: "2024-07-03", sent: 500, delivered: 490, read: 450, replied: 180 },
  { date: "2024-07-04", sent: 480, delivered: 470, read: 430, replied: 160 },
  { date: "2024-07-05", sent: 520, delivered: 510, read: 480, replied: 200 },
];

const campaignPerformance = [
  { id: 1, name: "Summer Sale", sent: 1200, openRate: "85%", ctr: "15%", replies: 250, status: "Completed" },
  { id: 2, name: "New Product Launch", sent: 2500, openRate: "92%", ctr: "22%", replies: 600, status: "Active" },
  { id: 3, name: "Feedback Survey", sent: 800, openRate: "75%", ctr: "10%", replies: 150, status: "Completed" },
  { id: 4, name: "Holiday Promo", sent: 5000, openRate: "88%", ctr: "18%", replies: 1100, status: "Active" },
];

const templatePerformance = [
  { name: 'Welcome Message', ctr: 12.5 },
  { name: 'Offer Alert', ctr: 25.2 },
  { name: 'Reminder', ctr: 8.7 },
  { name: 'Feedback Request', ctr: 15.1 },
];

export function WhatsAppAnalytics() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">WhatsApp Analytics</h1>
          <p className="text-muted-foreground">
            Track and analyze your WhatsApp campaign performance
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
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="summer_sale">Summer Sale</SelectItem>
              <SelectItem value="product_launch">New Product Launch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Messages Sent</CardDescription>
            <CardTitle className="text-4xl">12,450</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+12% from last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Delivery Rate</CardDescription>
            <CardTitle className="text-4xl">98.5%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+0.2% from last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Open Rate</CardDescription>
            <CardTitle className="text-4xl">88.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+5.1% from last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Reply Rate</CardDescription>
            <CardTitle className="text-4xl">32.7%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">-1.5% from last week</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Funnel</CardTitle>
              <CardDescription>Message delivery and engagement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[350px] w-full">
                <RechartsPrimitive.LineChart data={engagementData}>
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                  <RechartsPrimitive.XAxis dataKey="date" />
                  <RechartsPrimitive.YAxis />
                  <ChartTooltip />
                  <ChartLegend />
                  <RechartsPrimitive.Line type="monotone" dataKey="sent" stroke="#8884d8" />
                  <RechartsPrimitive.Line type="monotone" dataKey="delivered" stroke="#82ca9d" />
                  <RechartsPrimitive.Line type="monotone" dataKey="read" stroke="#ffc658" />
                  <RechartsPrimitive.Line type="monotone" dataKey="replied" stroke="#ff8042" />
                </RechartsPrimitive.LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Top Performing Templates</CardTitle>
                    <CardDescription>Click-through rates of message templates</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[350px] w-full">
                        <RechartsPrimitive.BarChart layout="vertical" data={templatePerformance}>
                            <RechartsPrimitive.XAxis type="number" />
                            <RechartsPrimitive.YAxis dataKey="name" type="category" width={100}/>
                            <ChartTooltip />
                            <RechartsPrimitive.Bar dataKey="ctr" fill="#8884d8" name="CTR (%)" />
                        </RechartsPrimitive.BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Detailed breakdown of each campaign's performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Replies</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignPerformance.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${campaign.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {campaign.status}
                    </span>
                  </TableCell>
                  <TableCell>{campaign.sent}</TableCell>
                  <TableCell>{campaign.openRate}</TableCell>
                  <TableCell>{campaign.ctr}</TableCell>
                  <TableCell>{campaign.replies}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 