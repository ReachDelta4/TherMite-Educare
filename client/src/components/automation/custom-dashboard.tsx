
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  Phone, 
  MessageSquare, 
  Award,
  Settings,
  Eye,
  Edit
} from "lucide-react";

export function CustomDashboard() {
  const dashboardWidgets = [
    { id: "leads", name: "Lead Funnel", type: "chart", icon: TrendingUp },
    { id: "calls", name: "Call Analytics", type: "metrics", icon: Phone },
    { id: "messages", name: "WhatsApp Stats", type: "chart", icon: MessageSquare },
    { id: "certificates", name: "Certificate Metrics", type: "metrics", icon: Award }
  ];

  const automationMetrics = [
    { name: "WhatsApp Bot", value: "127", change: "+12%", status: "active" },
    { name: "AI Calling", value: "89", change: "+8%", status: "active" },
    { name: "Certificates", value: "234", change: "+15%", status: "active" },
    { name: "Lead Conversion", value: "35%", change: "+5%", status: "good" }
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Custom Analytics Dashboard</CardTitle>
              <CardDescription>Comprehensive view of all automation performance</CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {automationMetrics.map((metric) => (
                <Card key={metric.name} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-muted-foreground">{metric.name}</h4>
                    <Badge 
                      variant={metric.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <span className={`text-sm ${metric.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                      {metric.change}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Lead Sources Distribution
                </h3>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Chart visualization would appear here</span>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Automation Performance Trends
                </h3>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Trend chart would appear here</span>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Widget Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardWidgets.map((widget) => (
                  <Card key={widget.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <widget.icon className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{widget.name}</h4>
                          <p className="text-sm text-muted-foreground">Type: {widget.type}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">Detailed analytics and insights would be displayed here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6 mt-6">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Custom Reports</h3>
              <p className="text-muted-foreground">Generate and download custom reports here</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
