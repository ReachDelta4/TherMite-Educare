
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Settings, Activity, Upload, Eye, PenTool } from "lucide-react";
import { useState } from "react";
import { WhatsAppFlowDesigner } from "./whatsapp-flow-designer";
import { WhatsAppTemplateManager } from "./whatsapp-template-manager";

export function WhatsAppBot() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "flow" | "templates">("overview");
  const [leadListFile, setLeadListFile] = useState<string>("");

  const templates = [
    { id: "lead-qualification", name: "Lead Qualification Flow", status: "active" },
    { id: "welcome-sequence", name: "Welcome Sequence", status: "draft" },
    { id: "follow-up", name: "Follow-up Flow", status: "active" }
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>WhatsApp Lead Qualification Bot</CardTitle>
              <CardDescription>Automate lead capture and qualification via WhatsApp</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isEnabled ? "default" : "secondary"}>
              {isEnabled ? "Active" : "Inactive"}
            </Badge>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium ${activeTab === "overview" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("flow")}
            className={`px-4 py-2 text-sm font-medium ${activeTab === "flow" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            <PenTool className="h-4 w-4 inline mr-1" />
            Flow Designer
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-4 py-2 text-sm font-medium ${activeTab === "templates" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            Templates
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="template">Active Flow Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a flow template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{template.name}</span>
                          <Badge variant={template.status === "active" ? "default" : "secondary"} className="ml-2">
                            {template.status}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="welcome">Welcome Message</Label>
                <Textarea
                  id="welcome"
                  placeholder="Hi! Welcome to TherMite Educare. How can I help you today?"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
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
                <h4 className="font-medium mb-2 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Bot Statistics (Last 30 days)
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">127</div>
                    <div className="text-muted-foreground">Messages Processed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">45</div>
                    <div className="text-muted-foreground">Qualified Leads</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Quick Actions</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure Flow
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview Flow
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "flow" && <WhatsAppFlowDesigner />}
        
        {activeTab === "templates" && <WhatsAppTemplateManager />}
        
        {activeTab === "overview" && (
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline">Test Bot</Button>
            <Button disabled={!selectedTemplate || !welcomeMessage}>
              Save Configuration
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
