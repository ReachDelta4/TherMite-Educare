
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Settings, Activity, PenTool, Eye } from "lucide-react";
import { useState } from "react";
import { WhatsAppCampaignFlowBuilder } from "./whatsapp-flow-designer";
import { WhatsAppTemplateManager } from "./whatsapp-template-manager";
import { WhatsAppCampaignCreator } from "./whatsapp-campaign-creator";

export function WhatsAppBot() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<"campaigns" | "flow" | "templates">("campaigns");

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
            onClick={() => setActiveTab("campaigns")}
            className={`px-4 py-2 text-sm font-medium ${activeTab === "campaigns" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            <MessageSquare className="h-4 w-4 inline mr-1" />
            Campaigns
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

        {activeTab === "campaigns" && <WhatsAppCampaignCreator />}
        {activeTab === "flow" && <WhatsAppCampaignFlowBuilder />}
        {activeTab === "templates" && <WhatsAppTemplateManager />}
      </CardContent>
    </Card>
  );
}
