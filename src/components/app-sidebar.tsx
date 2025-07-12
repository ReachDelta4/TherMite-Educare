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
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Award, 
  PhoneCall, 
  Home,
  Zap,
  Settings,
  HelpCircle,
  User,
  BarChart3,
  Users,
  FileText,
  LineChart,
  Download,
  Clock,
  UserCog,
  Fingerprint
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    description: "Mission Control Center",
    badge: "Live",
    badgeVariant: "default" as const,
  },
  {
    title: "WhatsApp Bot",
    url: "/whatsapp",
    icon: MessageSquare,
    description: "Automation and campaigns",
    badge: "Active",
    badgeVariant: "default" as const,
  },
  {
    title: "Certificates",
    url: "/certificates",
    icon: Award,
    description: "Generate and manage certificates",
    badge: "234",
    badgeVariant: "secondary" as const,
  },
  {
    title: "AI Calling",
    url: "/ai-calling",
    icon: PhoneCall,
    description: "Automated calling system",
    badge: "Running",
    badgeVariant: "default" as const,
  },
];

const quickActions = [
  { title: "Settings", icon: Settings, action: "settings" },
  { title: "Help", icon: HelpCircle, action: "help" },
];

const userManagementItems = [
  { title: "User Management", icon: Users, url: "/users" },
  { title: "My Profile", icon: User, url: "/profile" },
  { title: "Roles & Permissions", icon: UserCog, url: "/users/roles" },
  { title: "2FA Security", icon: Fingerprint, url: "/users/security" },
];

const analyticsItems = [
  { title: "Advanced Analytics", icon: LineChart, url: "/analytics" },
  { title: "Report Builder", icon: FileText, url: "/reports" },
  { title: "Export Data", icon: Download, url: "/analytics/export" },
  { title: "Scheduled Reports", icon: Clock, url: "/analytics/scheduled" },
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
      ? `bg-accent text-accent-foreground shadow-md font-semibold ${!collapsed ? 'border-l-4 border-accent-foreground' : ''}` 
      : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground transition-all duration-200";
  };

  return (
    <Sidebar className="transition-all duration-300 ease-in-out border-r bg-background flex flex-col h-full overflow-hidden" collapsible="icon">
      <SidebarHeader className="border-b p-4 flex-shrink-0 bg-gradient-purple">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <img src="/logo.png" alt="TherMite Logo" className="h-10 w-auto" />
          {!collapsed && (
            <div className="flex flex-col">
              <h2 className="font-bold text-lg text-white">
                TherMite
              </h2>
              <p className="text-xs text-white/80">Educare Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <div className="flex-1 relative overflow-y-auto overflow-x-hidden">
        <div className="p-2">
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                      <NavLink
                        to={item.url}
                        className={`flex items-center p-3 rounded-lg transition-colors ${getNavClass(item.url)} ${collapsed ? 'justify-center' : ''}`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <div className="flex-1 ml-3 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm truncate">{item.title}</span>
                              <Badge variant={item.badgeVariant} className="text-xs flex-shrink-0 ml-2">
                                {item.badge}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-2 mx-2" />

          <SidebarGroup>
            <SidebarGroupLabel className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase">
              User Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {userManagementItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                      <NavLink
                        to={item.url}
                        className={`flex items-center p-3 rounded-lg transition-colors ${getNavClass(item.url)} ${collapsed ? 'justify-center' : ''}`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <div className="flex-1 ml-3 min-w-0">
                            <span className="font-medium text-sm truncate">{item.title}</span>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-2 mx-2" />

          <SidebarGroup>
            <SidebarGroupLabel className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Analytics & Reports
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {analyticsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                      <NavLink
                        to={item.url}
                        className={`flex items-center p-3 rounded-lg transition-colors ${getNavClass(item.url)} ${collapsed ? 'justify-center' : ''}`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <div className="flex-1 ml-3 min-w-0">
                            <span className="font-medium text-sm truncate">{item.title}</span>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-2 mx-2" />
          
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="grid grid-cols-2 gap-2 p-2 group-data-[collapsible=icon]:grid-cols-1">
                {quickActions.map((action) => (
                  <Button
                    key={action.title}
                    variant="outline"
                    size="sm"
                    className="h-auto p-2 flex flex-col items-center gap-1 hover:bg-muted group-data-[collapsible=icon]:aspect-square group-data-[collapsible=icon]:p-1"
                    title={collapsed ? action.title : undefined}
                  >
                    <action.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-normal group-data-[collapsible=icon]:hidden">{action.title}</span>
                  </Button>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </div>

      <div className={`mt-auto border-t flex-shrink-0 ${collapsed ? 'p-1' : 'p-2'}`}>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className={`flex items-center gap-3 rounded-lg hover:bg-muted transition-colors ${collapsed ? 'justify-center' : 'p-2'}`}>
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Admin User</p>
                    <p className="text-xs text-muted-foreground truncate">admin@thermite.edu</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <Settings className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>

    </Sidebar>
  );
}
