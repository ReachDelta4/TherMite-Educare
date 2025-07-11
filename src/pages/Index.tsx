
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/whatsapp":
        return "WhatsApp Automation";
      case "/certificates":
        return "Certificate Generator";
      case "/ai-calling":
        return "AI Calling Agent";
      case "/analytics":
        return "Analytics";
      default:
        return "Dashboard";
    }
  };

  const getPageDescription = () => {
    switch (location.pathname) {
      case "/":
        return "Monitor your automation performance";
      case "/whatsapp":
        return "Create and manage WhatsApp campaigns";
      case "/certificates":
        return "Generate professional certificates";
      case "/ai-calling":
        return "Automated calling and voice interactions";
      case "/analytics":
        return "Detailed performance analytics";
      default:
        return "Monitor your automation performance";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center border-b border-border bg-background px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="font-semibold text-lg">{getPageTitle()}</h1>
                <p className="text-sm text-muted-foreground">{getPageDescription()}</p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
