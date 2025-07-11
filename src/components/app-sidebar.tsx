
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  MessageSquare, 
  Award, 
  PhoneCall, 
  BarChart3, 
  Home,
  Zap
} from "lucide-react";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home,
    description: "Overview and metrics"
  },
  { 
    title: "WhatsApp Bot", 
    url: "/whatsapp", 
    icon: MessageSquare,
    description: "Automation and campaigns"
  },
  { 
    title: "Certificates", 
    url: "/certificates", 
    icon: Award,
    description: "Generate and manage certificates"
  },
  { 
    title: "AI Calling", 
    url: "/ai-calling", 
    icon: PhoneCall,
    description: "Automated calling system"
  },
  { 
    title: "Analytics", 
    url: "/analytics", 
    icon: BarChart3,
    description: "Performance insights"
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    return isActive(path) 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50";
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center space-x-2 p-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">TherMite</h2>
              <p className="text-xs text-muted-foreground">Educare Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {!collapsed && "Main Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${getNavClass(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
