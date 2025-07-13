import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Download, 
  Calendar, 
  Filter, 
  RefreshCw,
  BarChart4,
  Users,
  DollarSign,
  Target,
  Book,
} from "lucide-react";
import { ExecutiveSummary } from "../components/dashboard/sections/executive-summary";
import { SalesIntelligence } from "../components/dashboard/sections/sales-intelligence";
import { StudentAnalytics } from "../components/dashboard/sections/student-analytics";
import { MarketingROI } from "../components/dashboard/sections/marketing-roi";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

const courses = [
  "Medical Coding Course",
  "Medical Billing Course",
  "NEET Coaching",
  "JEE Coaching",
  "CBSE / ICSE / IB: Grade 1 To Grade 5",
  "CBSE / ICSE / IB: Grade 6 To Grade 8",
  "CBSE / ICSE / IB: Grade 9 To Grade 10",
  "CBSE / ICSE / IB: Grade 11 To Grade 12",
  "KCET Coaching",
];

export function EnterpriseMISDashboard() {
  const [timeRange, setTimeRange] = useState("90d");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [refreshing, setRefreshing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname.split('/enterprise-mis/')[1] || 'summary';

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleTabChange = (value: string) => {
    navigate(`/enterprise-mis/${value}`);
  };

  const dashboardProps = { selectedCourse, timeRange };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enterprise MIS Dashboard</h1>
          <p className="text-muted-foreground">Business Intelligence & Growth Analytics Platform</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-auto min-w-[220px]">
              <Book className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Courses">All Courses</SelectItem>
              {courses.map(course => <SelectItem key={course} value={course}>{course}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last Quarter</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <Separator />

      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full sm:w-auto max-w-full overflow-x-auto justify-start">
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <BarChart4 className="h-4 w-4" />
            Summary Report
          </TabsTrigger>
          <TabsTrigger value="sales-revenue" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Sales & Revenue
          </TabsTrigger>
          <TabsTrigger value="student-analytics" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Student Analytics
          </TabsTrigger>
          <TabsTrigger value="marketing-roi" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Marketing ROI
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="pb-10">
        <Routes>
          <Route path="/" element={<ExecutiveSummary {...dashboardProps} />} />
          <Route path="/summary" element={<ExecutiveSummary {...dashboardProps} />} />
          <Route path="/sales-revenue" element={<SalesIntelligence {...dashboardProps} />} />
          <Route path="/student-analytics" element={<StudentAnalytics {...dashboardProps} />} />
          <Route path="/marketing-roi" element={<MarketingROI {...dashboardProps} />} />
        </Routes>
      </div>
    </div>
  );
}

export default EnterpriseMISDashboard; 