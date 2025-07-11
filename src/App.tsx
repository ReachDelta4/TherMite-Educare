
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CustomizableDashboard } from "@/components/dashboard/customizable-dashboard";
import { WhatsAppCampaignCreator } from "@/components/automation/whatsapp-campaign-creator";
import { CertificateGenerator } from "@/components/automation/certificate-generator";
import { AICallingAgent } from "@/components/automation/ai-calling-agent";
import { CustomDashboard } from "@/components/automation/custom-dashboard";

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
          <Routes>
            <Route path="/" element={<Index />}>
              <Route index element={<CustomizableDashboard />} />
              <Route path="whatsapp" element={<WhatsAppCampaignCreator />} />
              <Route path="certificates" element={<CertificateGenerator />} />
              <Route path="ai-calling" element={<AICallingAgent />} />
              <Route path="analytics" element={<CustomDashboard />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
