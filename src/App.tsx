
import React, { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FullPageLoader } from "./components/ui/loader";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CustomizableDashboard = lazy(() => import("@/components/dashboard/customizable-dashboard").then(m => ({ default: m.CustomizableDashboard })));
const WhatsAppBot = lazy(() => import("@/components/automation/whatsapp-bot").then(m => ({ default: m.WhatsAppBot })));
const CertificateGenerator = lazy(() => import("@/components/automation/certificate-generator").then(m => ({ default: m.CertificateGenerator })));
const AICallingAgent = lazy(() => import("@/components/automation/ai-calling-agent").then(m => ({ default: m.AICallingAgent })));
const CertificateBuilderPage = lazy(() => import("./pages/CertificateBuilderPage").then(m => ({ default: m.CertificateBuilderPage })));
const UserManagement = lazy(() => import("@/components/user-management/user-management").then(m => ({ default: m.UserManagement })));
const UserProfile = lazy(() => import("@/components/user-management/user-profile").then(m => ({ default: m.UserProfile })));
const RolesPermissions = lazy(() => import("@/components/user-management/roles-permissions").then(m => ({ default: m.RolesPermissions })));
const SecuritySettingsPage = lazy(() => import("@/components/user-management/security-settings").then(m => ({ default: m.SecuritySettingsPage })));
const AdvancedAnalytics = lazy(() => import("@/components/analytics/advanced-analytics").then(m => ({ default: m.AdvancedAnalytics })));
const ReportBuilder = lazy(() => import("@/components/analytics/report-builder").then(m => ({ default: m.ReportBuilder })));


const App: React.FC = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<FullPageLoader />}>
            <Routes>
              <Route path="/" element={<Index />}>
                <Route index element={<CustomizableDashboard />} />
                <Route path="whatsapp" element={<WhatsAppBot />} />
                <Route path="certificates" element={<CertificateGenerator />} />
                <Route path="ai-calling" element={<AICallingAgent />} />
                
                {/* User Management Routes */}
                <Route path="users" element={<UserManagement />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="users/roles" element={<RolesPermissions />} />
                <Route path="users/security" element={<SecuritySettingsPage />} />
                
                {/* Analytics Routes */}
                <Route path="analytics" element={<AdvancedAnalytics />} />
                <Route path="reports" element={<ReportBuilder />} />
              </Route>
              <Route path="/certificate-builder" element={<CertificateBuilderPage />} />
              <Route path="/certificate-builder/:templateId" element={<CertificateBuilderPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
