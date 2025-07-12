
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Upload,
  Play,
  Pause,
  BarChart3,
  Activity
} from "lucide-react";
import { useState } from "react";

export function WhatsAppCampaignCreator() {
  const [campaignName, setCampaignName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [leadListFile, setLeadListFile] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const campaignTypes = [
    { id: "lead-qualification", name: "Lead Qualification", description: "Qualify leads through interactive questions" },
    { id: "product-demo", name: "Product Demo", description: "Showcase product features and benefits" },
    { id: "event-promotion", name: "Event Promotion", description: "Promote upcoming events and webinars" },
    { id: "follow-up", name: "Follow-up Sequence", description: "Nurture leads with follow-up messages" }
  ];

  const healthMetrics = [
    { label: "Messages Sent", value: "1,247", change: "+12%", status: "good" },
    { label: "Delivery Rate", value: "98.2%", change: "+0.8%", status: "excellent" },
    { label: "Reply Rate", value: "34.5%", change: "+5.2%", status: "good" },
    { label: "Engagement Rate", value: "67.8%", change: "+8.1%", status: "excellent" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600 bg-green-50";
      case "good": return "text-blue-600 bg-blue-50";
      case "warning": return "text-yellow-600 bg-yellow-50";
      case "error": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
      case "good":
        return <CheckCircle className="h-4 w-4" />;
      case "warning":
        return <AlertCircle className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Health Check Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">WhatsApp Bot Health Check</CardTitle>
            </div>
            <Badge variant={isRunning ? "default" : "secondary"}>
              {isRunning ? "Running" : "Stopped"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {healthMetrics.map((metric) => (
              <div key={metric.label} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                  <div className={`p-1 rounded-full ${getStatusColor(metric.status)}`}>
                    {getStatusIcon(metric.status)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Creator */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Create WhatsApp Campaign</CardTitle>
              <CardDescription>Design and launch targeted messaging campaigns</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="Enter campaign name"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="campaignType">Campaign Type</Label>
                <Select value={campaignType} onValueChange={setCampaignType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{type.name}</span>
                          <span className="text-xs text-muted-foreground">{type.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-leads">All Leads</SelectItem>
                    <SelectItem value="qualified-leads">Qualified Leads</SelectItem>
                    <SelectItem value="new-contacts">New Contacts</SelectItem>
                    <SelectItem value="custom-segment">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="leadList">Lead List (CSV)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="leadList"
                    placeholder="Upload lead list CSV file"
                    value={leadListFile}
                    onChange={(e) => setLeadListFile(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium mb-3 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Campaign Preview
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Reach:</span>
                    <span className="font-medium">2,340 contacts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Replies:</span>
                    <span className="font-medium">807 (34.5%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">3-5 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost Estimate:</span>
                    <span className="font-medium">$47.50</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </h4>
                <div className="space-y-3">
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Send Immediately</SelectItem>
                      <SelectItem value="scheduled">Schedule for Later</SelectItem>
                      <SelectItem value="drip">Drip Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Best time to send: 10:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Preview Campaign
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Test with Sample
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Save as Draft</Button>
              <Button disabled={!campaignName || !campaignType || !targetAudience}>
                <Play className="h-4 w-4 mr-2" />
                Launch Campaign
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Lead Qualification Q4", status: "active", sent: "1,234", replied: "423", rate: "34.3%" },
              { name: "Product Demo Series", status: "completed", sent: "856", replied: "298", rate: "34.8%" },
              { name: "Event Promotion", status: "draft", sent: "0", replied: "0", rate: "0%" }
            ].map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={campaign.status === "active" ? "default" : campaign.status === "completed" ? "secondary" : "outline"}>
                    {campaign.status}
                  </Badge>
                  <span className="font-medium">{campaign.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Sent: {campaign.sent}</span>
                  <span>Replied: {campaign.replied}</span>
                  <span className="font-medium text-foreground">Rate: {campaign.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
