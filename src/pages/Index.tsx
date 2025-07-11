
import { DashboardHeader } from "@/components/dashboard/header";
import { StatCard } from "@/components/ui/stat-card";
import { WhatsAppBot } from "@/components/automation/whatsapp-bot";
import { CertificateGenerator } from "@/components/automation/certificate-generator";
import { AICallingAgent } from "@/components/automation/ai-calling-agent";
import { CustomDashboard } from "@/components/automation/custom-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare,
  Award,
  PhoneCall,
  BarChart3,
  TrendingUp, 
  Users, 
  Target, 
  CheckCircle,
  Activity
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="WhatsApp Leads"
            value="127"
            change="+23 this week"
            changeType="positive"
            icon={MessageSquare}
            className="animate-fade-in"
          />
          <StatCard
            title="Certificates Generated"
            value="234"
            change="+45 this month"
            changeType="positive"
            icon={Award}
            className="animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          />
          <StatCard
            title="AI Calls Made"
            value="89"
            change="Today's activity"
            changeType="neutral"
            icon={PhoneCall}
            className="animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          />
          <StatCard
            title="Conversion Rate"
            value="67%"
            change="+12% improvement"
            changeType="positive"
            icon={Target}
            className="animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        {/* Additional Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Active Automations"
            value="4"
            change="All systems operational"
            changeType="positive"
            icon={Activity}
            className="animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          />
          <StatCard
            title="Monthly Growth"
            value="+34%"
            change="Lead generation increase"
            changeType="positive"
            icon={TrendingUp}
            className="animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          />
          <StatCard
            title="Student Enrollment"
            value="156"
            change="+28 this month"
            changeType="positive"
            icon={Users}
            className="animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          />
        </div>

        {/* Automation Features Tabs */}
        <div className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <Tabs defaultValue="whatsapp" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="whatsapp" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Bot</span>
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Certificates</span>
              </TabsTrigger>
              <TabsTrigger value="calling" className="flex items-center space-x-2">
                <PhoneCall className="h-4 w-4" />
                <span>AI Calling</span>
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="whatsapp" className="mt-6">
              <WhatsAppBot />
            </TabsContent>
            
            <TabsContent value="certificates" className="mt-6">
              <CertificateGenerator />
            </TabsContent>
            
            <TabsContent value="calling" className="mt-6">
              <AICallingAgent />
            </TabsContent>
            
            <TabsContent value="dashboard" className="mt-6">
              <CustomDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
