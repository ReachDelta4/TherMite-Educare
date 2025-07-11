import { DashboardHeader } from "@/components/dashboard/header";
import { ServicesTable } from "@/components/dashboard/services-table";
import { StatCard } from "@/components/ui/stat-card";
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign,
  Activity,
  CheckCircle
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="₹60,000"
            change="+12.5% from last month"
            changeType="positive"
            icon={DollarSign}
            className="animate-fade-in"
          />
          <StatCard
            title="Active Clients"
            value="24"
            change="+3 new this week"
            changeType="positive"
            icon={Users}
            className="animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          />
          <StatCard
            title="Completion Rate"
            value="95%"
            change="+5% improvement"
            changeType="positive"
            icon={Target}
            className="animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          />
          <StatCard
            title="Services Delivered"
            value="48"
            change="8 this month"
            changeType="neutral"
            icon={CheckCircle}
            className="animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ServicesTable />
          </div>
          
          <div className="space-y-6">
            <StatCard
              title="System Health"
              value="99.9%"
              change="All systems operational"
              changeType="positive"
              icon={Activity}
              className="animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            />
            
            <StatCard
              title="Growth Rate"
              value="+24%"
              change="Quarter over quarter"
              changeType="positive"
              icon={TrendingUp}
              className="animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
