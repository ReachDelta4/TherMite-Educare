import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { 
  MessageSquare,
  Award,
  PhoneCall,
  Target,
  Activity,
  TrendingUp, 
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Zap,
  Globe,
  Mail,
  Download,
  RefreshCw,
  Eye,
  Filter,
  Search,
  Bell,
  Shield,
  Database,
  Server,
  Wifi,
  Battery,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: any;
  description?: string;
}

export function CustomizableDashboard() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true,
    whatsapp: true,
    calling: true,
    certificates: true,
    performance: true,
    system: false,
    financial: false,
    security: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Overview Metrics
  const overviewMetrics: MetricCard[] = [
    {
      title: "Total Leads Generated",
      value: "2,847",
      change: "+23% this month",
      changeType: "positive",
      icon: Target,
      description: "Across all channels"
    },
    {
      title: "Conversion Rate",
      value: "34.2%",
      change: "+5.8% improvement",
      changeType: "positive",
      icon: TrendingUp,
      description: "Lead to customer"
    },
    {
      title: "Active Automations",
      value: "12",
      change: "All operational",
      changeType: "positive",
      icon: Activity,
      description: "Running smoothly"
    },
    {
      title: "Monthly Revenue",
      value: "₹4,23,500",
      change: "+18% growth",
      changeType: "positive",
      icon: DollarSign,
      description: "From all services"
    }
  ];

  // WhatsApp Analytics
  const whatsappMetrics: MetricCard[] = [
    {
      title: "Messages Sent",
      value: "12,847",
      change: "+15% this week",
      changeType: "positive",
      icon: MessageSquare,
      description: "Total outbound messages"
    },
    {
      title: "Delivery Rate",
      value: "98.7%",
      change: "+0.3% improvement",
      changeType: "positive",
      icon: CheckCircle,
      description: "Successfully delivered"
    },
    {
      title: "Reply Rate",
      value: "42.3%",
      change: "+8.1% increase",
      changeType: "positive",
      icon: Mail,
      description: "User engagement"
    },
    {
      title: "Active Campaigns",
      value: "8",
      change: "3 launching today",
      changeType: "neutral",
      icon: Zap,
      description: "Running campaigns"
    },
    {
      title: "Lead Qualification",
      value: "67%",
      change: "+12% improvement",
      changeType: "positive",
      icon: Target,
      description: "Qualified leads ratio"
    },
    {
      title: "Bot Uptime",
      value: "99.8%",
      change: "Excellent",
      changeType: "positive",
      icon: Activity,
      description: "System availability"
    }
  ];

  // AI Calling Analytics
  const callingMetrics: MetricCard[] = [
    {
      title: "Calls Made",
      value: "1,234",
      change: "+89 today",
      changeType: "positive",
      icon: PhoneCall,
      description: "Total outbound calls"
    },
    {
      title: "Connection Rate",
      value: "76.4%",
      change: "+4.2% improvement",
      changeType: "positive",
      icon: Wifi,
      description: "Successful connections"
    },
    {
      title: "Avg Call Duration",
      value: "3m 42s",
      change: "+15s increase",
      changeType: "positive",
      icon: Clock,
      description: "Average talk time"
    },
    {
      title: "Qualified Leads",
      value: "423",
      change: "+67 this week",
      changeType: "positive",
      icon: Target,
      description: "From AI calls"
    },
    {
      title: "Agent Performance",
      value: "94.2%",
      change: "+2.1% improvement",
      changeType: "positive",
      icon: Users,
      description: "AI agent efficiency"
    },
    {
      title: "Cost per Lead",
      value: "₹127",
      change: "-₹23 reduction",
      changeType: "positive",
      icon: DollarSign,
      description: "Cost optimization"
    }
  ];

  // Certificate Analytics
  const certificateMetrics: MetricCard[] = [
    {
      title: "Certificates Generated",
      value: "2,456",
      change: "+234 this month",
      changeType: "positive",
      icon: Award,
      description: "Total certificates"
    },
    {
      title: "Active Templates",
      value: "15",
      change: "3 new this week",
      changeType: "positive",
      icon: Database,
      description: "Available templates"
    },
    {
      title: "Download Rate",
      value: "89.3%",
      change: "+5.7% increase",
      changeType: "positive",
      icon: Download,
      description: "Certificate downloads"
    },
    {
      title: "Student Satisfaction",
      value: "4.8/5",
      change: "+0.2 improvement",
      changeType: "positive",
      icon: Users,
      description: "Average rating"
    }
  ];

  // Performance Metrics
  const performanceMetrics: MetricCard[] = [
    {
      title: "System Uptime",
      value: "99.97%",
      change: "Excellent",
      changeType: "positive",
      icon: Server,
      description: "Platform availability"
    },
    {
      title: "Response Time",
      value: "127ms",
      change: "-23ms improvement",
      changeType: "positive",
      icon: Zap,
      description: "Average API response"
    },
    {
      title: "Error Rate",
      value: "0.03%",
      change: "-0.02% reduction",
      changeType: "positive",
      icon: AlertCircle,
      description: "System errors"
    },
    {
      title: "Data Processing",
      value: "2.4TB",
      change: "+340GB this month",
      changeType: "neutral",
      icon: HardDrive,
      description: "Total data processed"
    }
  ];

  // System Health Metrics
  const systemMetrics: MetricCard[] = [
    {
      title: "CPU Usage",
      value: "23.4%",
      change: "Normal",
      changeType: "positive",
      icon: Cpu,
      description: "Server load"
    },
    {
      title: "Memory Usage",
      value: "67.8%",
      change: "Optimal",
      changeType: "positive",
      icon: Monitor,
      description: "RAM utilization"
    },
    {
      title: "Storage Used",
      value: "1.2TB",
      change: "78% capacity",
      changeType: "neutral",
      icon: HardDrive,
      description: "Disk usage"
    },
    {
      title: "Network Traffic",
      value: "45.6GB",
      change: "+12GB today",
      changeType: "neutral",
      icon: Globe,
      description: "Data transfer"
    }
  ];

  // Financial Metrics
  const financialMetrics: MetricCard[] = [
    {
      title: "Monthly Revenue",
      value: "₹4,23,500",
      change: "+18% growth",
      changeType: "positive",
      icon: DollarSign,
      description: "Total earnings"
    },
    {
      title: "Operating Costs",
      value: "₹1,23,400",
      change: "-5% reduction",
      changeType: "positive",
      icon: TrendingUp,
      description: "Monthly expenses"
    },
    {
      title: "Profit Margin",
      value: "71.2%",
      change: "+3.4% improvement",
      changeType: "positive",
      icon: Target,
      description: "Net profit ratio"
    },
    {
      title: "Customer LTV",
      value: "₹45,600",
      change: "+₹5,200 increase",
      changeType: "positive",
      icon: Users,
      description: "Lifetime value"
    }
  ];

  // Security Metrics
  const securityMetrics: MetricCard[] = [
    {
      title: "Security Score",
      value: "98.5%",
      change: "Excellent",
      changeType: "positive",
      icon: Shield,
      description: "Overall security"
    },
    {
      title: "Failed Logins",
      value: "12",
      change: "-8 this week",
      changeType: "positive",
      icon: AlertCircle,
      description: "Security attempts"
    },
    {
      title: "Data Backups",
      value: "Daily",
      change: "100% success",
      changeType: "positive",
      icon: Database,
      description: "Backup status"
    },
    {
      title: "SSL Status",
      value: "Active",
      change: "Valid until 2025",
      changeType: "positive",
      icon: Shield,
      description: "Certificate status"
    }
  ];

  // Chart data
  const leadTrendData = [
    { month: "Jan", leads: 245, qualified: 89, converted: 34 },
    { month: "Feb", leads: 312, qualified: 127, converted: 45 },
    { month: "Mar", leads: 398, qualified: 156, converted: 67 },
    { month: "Apr", leads: 445, qualified: 189, converted: 78 },
    { month: "May", leads: 523, qualified: 234, converted: 89 },
    { month: "Jun", leads: 612, qualified: 278, converted: 102 }
  ];

  const channelDistribution = [
    { name: "WhatsApp", value: 45, color: "#25D366" },
    { name: "AI Calling", value: 30, color: "#2563eb" },
    { name: "Certificates", value: 15, color: "#f59e0b" },
    { name: "Direct", value: 10, color: "#8b5cf6" }
  ];

  const renderMetricCard = (metric: MetricCard) => (
    <Card key={metric.title} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <metric.icon className="h-5 w-5 text-primary" />
          <Badge variant={metric.changeType === "positive" ? "default" : metric.changeType === "negative" ? "destructive" : "secondary"} className="text-xs">
            {metric.change}
          </Badge>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">{metric.value}</h3>
          <p className="text-sm font-medium text-foreground">{metric.title}</p>
          {metric.description && (
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderCollapsibleSection = (
    title: string,
    sectionKey: string,
    metrics: MetricCard[],
    icon: any,
    description?: string,
    children?: React.ReactNode
  ) => {
    const Icon = icon;
    return (
      <Collapsible open={openSections[sectionKey]} onOpenChange={() => toggleSection(sectionKey)}>
        <CollapsibleTrigger asChild>
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {metrics.length} metrics
                  </Badge>
                  {openSections[sectionKey] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {metrics.map(renderMetricCard)}
          </div>
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mission Control Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive analytics and system monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Launch WhatsApp Campaign
            </Button>
            <Button size="sm" variant="outline">
              <PhoneCall className="h-4 w-4 mr-2" />
              Start AI Calling
            </Button>
            <Button size="sm" variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Generate Certificates
            </Button>
            <Button size="sm" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Reports
            </Button>
            <Button size="sm" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Check Alerts
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overview Section */}
      {renderCollapsibleSection(
        "System Overview",
        "overview",
        overviewMetrics,
        Activity,
        "Key performance indicators across all systems",
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Lead Generation Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-64">
                <RechartsPrimitive.ComposedChart data={leadTrendData}>
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                  <RechartsPrimitive.XAxis dataKey="month" />
                  <RechartsPrimitive.YAxis />
                  <ChartTooltip />
                  <RechartsPrimitive.Bar dataKey="leads" fill="#2563eb" name="Total Leads" />
                  <RechartsPrimitive.Line type="monotone" dataKey="qualified" stroke="#f59e0b" name="Qualified" />
                  <RechartsPrimitive.Line type="monotone" dataKey="converted" stroke="#10b981" name="Converted" />
                </RechartsPrimitive.ComposedChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Lead Sources Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-64">
                <RechartsPrimitive.PieChart>
                  <RechartsPrimitive.Pie
                    data={channelDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {channelDistribution.map((entry, index) => (
                      <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPrimitive.Pie>
                  <ChartTooltip />
                </RechartsPrimitive.PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* WhatsApp Analytics */}
      {renderCollapsibleSection(
        "WhatsApp Bot Analytics",
        "whatsapp",
        whatsappMetrics,
        MessageSquare,
        "Comprehensive WhatsApp automation performance metrics"
      )}

      {/* AI Calling Analytics */}
      {renderCollapsibleSection(
        "AI Calling Analytics",
        "calling",
        callingMetrics,
        PhoneCall,
        "AI-powered calling system performance and metrics"
      )}

      {/* Certificate Analytics */}
      {renderCollapsibleSection(
        "Certificate Generation Analytics",
        "certificates",
        certificateMetrics,
        Award,
        "Certificate generation and distribution metrics"
      )}

      {/* Performance Metrics */}
      {renderCollapsibleSection(
        "System Performance",
        "performance",
        performanceMetrics,
        Monitor,
        "Platform performance and reliability metrics"
      )}

      {/* System Health */}
      {renderCollapsibleSection(
        "System Health & Infrastructure",
        "system",
        systemMetrics,
        Server,
        "Server resources and infrastructure monitoring"
      )}

      {/* Financial Analytics */}
      {renderCollapsibleSection(
        "Financial Analytics",
        "financial",
        financialMetrics,
        DollarSign,
        "Revenue, costs, and profitability metrics"
      )}

      {/* Security Monitoring */}
      {renderCollapsibleSection(
        "Security & Compliance",
        "security",
        securityMetrics,
        Shield,
        "Security status and compliance monitoring"
      )}

      {/* Footer */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>Last updated: {new Date().toLocaleString()}</span>
              <Badge variant="outline" className="text-xs">
                <Activity className="h-3 w-3 mr-1" />
                All systems operational
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span>TherMite Educare Platform v2.1.0</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
