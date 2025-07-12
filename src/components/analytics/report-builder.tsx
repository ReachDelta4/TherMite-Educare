import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  PlusCircle,
  Settings,
  Calendar,
  BarChart2,
  Users,
  DollarSign,
  Share2,
  Download,
  Clock,
  Trash2,
  Edit,
  Play,
  Save,
  Mail,
  FileSpreadsheet
} from "lucide-react";

const availableMetrics = [
  { id: "revenue", name: "Total Revenue", icon: DollarSign },
  { id: "users", name: "User Growth", icon: Users },
  { id: "conversion", name: "Conversion Rate", icon: BarChart2 },
  { id: "churn", name: "Churn Rate", icon: Users },
  { id: "whatsapp_sent", name: "WhatsApp Messages Sent", icon: Mail },
  { id: "calls_made", name: "AI Calls Made", icon: FileSpreadsheet },
];

const savedReports = [
  { id: 1, name: "Monthly Financial Summary", date: "2024-07-01", schedule: "Monthly" },
  { id: 2, name: "Q2 User Growth Report", date: "2024-06-30", schedule: "Quarterly" },
  { id: 3, name: "Weekly Campaign Performance", date: "2024-07-22", schedule: "Weekly" },
];

export function ReportBuilder() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [reportName, setReportName] = useState("");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState("weekly");

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Report Builder</h1>
          <p className="text-muted-foreground">
            Create, manage, and schedule custom reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Create Custom Report</CardTitle>
              <CardDescription>
                Select metrics and configure your report settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="report-name" className="text-base font-medium">Report Name</Label>
                <Input
                  id="report-name"
                  placeholder="e.g., Q3 Financial Overview"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-medium">Select Metrics</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 p-4 border rounded-lg">
                  {availableMetrics.map(metric => (
                    <div
                      key={metric.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={metric.id}
                        checked={selectedMetrics.includes(metric.id)}
                        onCheckedChange={() => handleMetricToggle(metric.id)}
                      />
                      <label
                        htmlFor={metric.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                      >
                        <metric.icon className="h-4 w-4" />
                        {metric.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Schedule Report</Label>
                    <Switch
                        checked={isScheduled}
                        onCheckedChange={setIsScheduled}
                    />
                 </div>
                 {isScheduled && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div>
                          <Label htmlFor="frequency">Frequency</Label>
                          <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                             <SelectTrigger id="frequency">
                                <SelectValue placeholder="Select frequency" />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                       <div>
                          <Label htmlFor="recipients">Recipients (emails)</Label>
                          <Input id="recipients" placeholder="comma-separated emails"/>
                       </div>
                    </div>
                 )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <Label htmlFor="format" className="mr-2">Format</Label>
                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger id="format" className="w-[120px]">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Now
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Saved Reports */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Saved & Scheduled Reports</CardTitle>
              <CardDescription>
                Manage your previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        <div>{report.name}</div>
                        <div className="text-xs text-muted-foreground">{report.date}</div>
                      </TableCell>
                      <TableCell>{report.schedule}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="icon"><Play className="h-4 w-4"/></Button>
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                            <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 