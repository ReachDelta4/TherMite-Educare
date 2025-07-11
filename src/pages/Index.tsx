
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CustomizableDashboard } from "@/components/dashboard/customizable-dashboard";
import { WhatsAppCampaignCreator } from "@/components/automation/whatsapp-campaign-creator";
import { WhatsAppFlowDesigner } from "@/components/automation/whatsapp-flow-designer";
import { WhatsAppTemplateManager } from "@/components/automation/whatsapp-template-manager";
import { CertificateGenerator } from "@/components/automation/certificate-generator";
import { AICallingAgent } from "@/components/automation/ai-calling-agent";
import { CustomDashboard } from "@/components/automation/custom-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare,
  Award,
  PhoneCall,
  BarChart3,
  PenTool,
  FileText,
  Bot
} from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState<"dashboard" | "whatsapp" | "certificates" | "ai-calling" | "analytics">("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <CustomizableDashboard />;
      case "whatsapp":
        return (
          <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="campaigns" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Campaigns</span>
              </TabsTrigger>
              <TabsTrigger value="flow" className="flex items-center space-x-2">
                <PenTool className="h-4 w-4" />
                <span>Flow Designer</span>
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Templates</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="campaigns" className="mt-6">
              <WhatsAppCampaignCreator />
            </TabsContent>
            
            <TabsContent value="flow" className="mt-6">
              <WhatsAppFlowDesigner />
            </TabsContent>
            
            <TabsContent value="templates" className="mt-6">
              <WhatsAppTemplateManager />
            </TabsContent>
          </Tabs>
        );
      case "certificates":
        return <CertificateGenerator />;
      case "ai-calling":
        return <AICallingAgent />;
      case "analytics":
        return <CustomDashboard />;
      default:
        return <CustomizableDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center justify-between border-b border-border bg-background px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="font-semibold text-lg">
                  {activeSection === "dashboard" && "Dashboard"}
                  {activeSection === "whatsapp" && "WhatsApp Automation"}
                  {activeSection === "certificates" && "Certificate Generator"}
                  {activeSection === "ai-calling" && "AI Calling Agent"}
                  {activeSection === "analytics" && "Analytics"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {activeSection === "dashboard" && "Monitor your automation performance"}
                  {activeSection === "whatsapp" && "Create and manage WhatsApp campaigns"}
                  {activeSection === "certificates" && "Generate professional certificates"}
                  {activeSection === "ai-calling" && "Automated calling and voice interactions"}
                  {activeSection === "analytics" && "Detailed performance analytics"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant={activeSection === "dashboard" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setActiveSection("dashboard")}
              >
                Dashboard
              </Button>
              <Button 
                variant={activeSection === "whatsapp" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setActiveSection("whatsapp")}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                WhatsApp
              </Button>
              <Button 
                variant={activeSection === "certificates" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setActiveSection("certificates")}
              >
                <Award className="h-4 w-4 mr-1" />
                Certificates
              </Button>
              <Button 
                variant={activeSection === "ai-calling" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setActiveSection("ai-calling")}
              >
                <PhoneCall className="h-4 w-4 mr-1" />
                AI Calling
              </Button>
              <Button 
                variant={activeSection === "analytics" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setActiveSection("analytics")}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Analytics
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
