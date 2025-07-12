import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IndexContent = () => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  
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
    <div className="min-h-screen flex w-full bg-background relative">
      <AppSidebar />
      
      {/* Custom Toggle Button */}
      <div 
        className="absolute top-1/2 z-50 transition-all duration-300 ease-in-out"
        style={{
          left: collapsed ? '3rem' : '16rem',
          transform: 'translateX(-50%) translateY(-50%)'
        }}
      >
        <Button
          onClick={toggleSidebar}
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full bg-background border-2 shadow-lg hover:border-accent/50 transition-all hover:scale-110"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-accent" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-accent" />
          )}
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 flex items-center border-b border-border bg-background px-6 flex-shrink-0">
          <div className="flex items-center space-x-4 min-w-0">
            <SidebarTrigger className="flex-shrink-0" />
            <div className="min-w-0 overflow-hidden">
              <h1 className="font-semibold text-lg truncate">{getPageTitle()}</h1>
              <p className="text-sm text-muted-foreground truncate">{getPageDescription()}</p>
            </div>
          </div>
          <div className="ml-auto h-1 w-24 bg-gradient-purple rounded-full opacity-70"></div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <SidebarProvider>
      <IndexContent />
    </SidebarProvider>
  );
};

export default Index;
