
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Settings, Activity, PenTool, Eye, LineChart, Users } from "lucide-react";
import { useState } from "react";
import { WhatsAppCampaignFlowBuilder } from "./whatsapp-flow-designer";
import { WhatsAppTemplateManager } from "./whatsapp-template-manager";
import { WhatsAppCampaignCreator } from "./whatsapp-campaign-creator";
import { WhatsAppAnalytics } from "./whatsapp-analytics";
import { ContactManagement } from "./contact-management";

export function WhatsAppBot() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<"campaigns" | "flow" | "templates" | "analytics" | "contacts">("campaigns");

  const renderContent = () => {
    switch (activeTab) {
      case "campaigns":
        return <WhatsAppCampaignCreator />;
      case "flow":
        return <WhatsAppCampaignFlowBuilder />;
      case "templates":
        return <WhatsAppTemplateManager />;
      case "analytics":
        return <WhatsAppAnalytics />;
      case "contacts":
        return <ContactManagement />;
      default:
        return <WhatsAppCampaignCreator />;
    }
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>WhatsApp Automation Suite</CardTitle>
                <CardDescription>Create, manage, and analyze your WhatsApp communications</CardDescription>
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
        <CardContent>
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("campaigns")}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${activeTab === "campaigns" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            >
              <MessageSquare className="h-4 w-4" />
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab("flow")}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${activeTab === "flow" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            >
              <PenTool className="h-4 w-4" />
              Flow Designer
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${activeTab === "templates" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${activeTab === "analytics" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${activeTab === "contacts" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            >
              <Users className="h-4 w-4" />
              Contacts
            </button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}
