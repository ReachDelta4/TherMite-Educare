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
    const path = location.pathname;
    
    if (path === "/") return "Dashboard";
    if (path === "/overview") return "Platform Overview & Proposal";
    if (path === "/whatsapp") return "WhatsApp Automation";
    if (path === "/certificates") return "Certificate Generator";
    if (path === "/ai-calling") return "AI Calling Agent";
    if (path === "/users") return "User Management";
    if (path === "/profile") return "My Profile";
    if (path === "/users/roles") return "Roles & Permissions";
    if (path === "/analytics") return "Advanced Analytics";
    if (path === "/reports") return "Report Builder";
    if (path === "/analytics/export") return "Export Data";
    if (path === "/analytics/scheduled") return "Scheduled Reports";
    
    // Extract the base path for default cases
    const basePath = path.split('/')[1];
    if (basePath) {
      return basePath.charAt(0).toUpperCase() + basePath.slice(1).replace(/-/g, ' ');
    }
    
    return "Dashboard";
  };

  const getPageDescription = () => {
    const path = location.pathname;
    
    if (path === "/") return "Monitor your automation performance";
    if (path === "/overview") return "A special proposal for TherMite Educare";
    if (path === "/whatsapp") return "Create and manage WhatsApp campaigns";
    if (path === "/certificates") return "Generate professional certificates";
    if (path === "/ai-calling") return "Automated calling and voice interactions";
    if (path === "/users") return "Manage users and access";
    if (path === "/profile") return "Your account settings";
    if (path === "/users/roles") return "Configure roles and permissions";
    if (path === "/analytics") return "Detailed performance analytics";
    if (path === "/reports") return "Create custom reports";
    if (path === "/analytics/export") return "Export your data";
    if (path === "/analytics/scheduled") return "Set up automated report delivery";
    
    return "TherMite Educare Platform";
  };

  return (
    <div className="min-h-screen flex w-full bg-background relative">
      <AppSidebar />
      
      {/* Custom Toggle Button - Fixed position with z-index to ensure visibility */}
      <div 
        className="fixed top-1/2 z-50 transition-all duration-300 ease-in-out"
        style={{
          left: collapsed ? '3.5rem' : '16.5rem',
          transform: 'translateY(-50%)',
          zIndex: 100
        }}
      >
        <Button
          onClick={toggleSidebar}
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full bg-background border-2 shadow-lg hover:border-accent/50 transition-all hover:scale-110"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-accent" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-accent" />
          )}
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Main Content - Header removed from all tabs */}
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
