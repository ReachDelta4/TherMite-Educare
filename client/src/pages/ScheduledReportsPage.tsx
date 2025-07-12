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
  Calendar,
  Clock,
  Trash2,
  Edit,
  Save,
  Mail,
  Phone,
} from "lucide-react";

const reportTypes = [
  { id: "revenue", name: "Revenue Report" },
  { id: "user_growth", name: "User Growth Report" },
  { id: "conversion", name: "Conversion Rate Report" },
  { id: "whatsapp", name: "WhatsApp Campaign Report" },
  { id: "calls", name: "AI Calls Report" },
  { id: "certificates", name: "Certificate Generation Report" },
];

const scheduledReports = [
  { id: 1, name: "Monthly Financial Summary", frequency: "Monthly", time: "09:00 AM", channels: ["Email"] },
  { id: 2, name: "Weekly User Growth", frequency: "Weekly", time: "10:00 AM", channels: ["WhatsApp", "Email"] },
  { id: 3, name: "Daily Campaign Performance", frequency: "Daily", time: "08:00 AM", channels: ["WhatsApp"] },
];

export function ScheduledReportsPage() {
  const [reportName, setReportName] = useState("");
  const [selectedReport, setSelectedReport] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [time, setTime] = useState("09:00");
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [hourlyInterval, setHourlyInterval] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the scheduled report
    alert("Report scheduled successfully!");
    // Reset form
    setReportName("");
    setSelectedReport("");
    setFrequency("daily");
    setTime("09:00");
    setEmailEnabled(true);
    setWhatsappEnabled(false);
    setRecipientEmail("");
    setRecipientPhone("");
    setHourlyInterval("1");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Schedule Reports</h1>
          <p className="text-muted-foreground">
            Set up automated report delivery to your team
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Configuration */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Schedule a Report</CardTitle>
              <CardDescription>
                Choose a report and set up a delivery schedule
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="report-name" className="text-base font-medium">Report Name</Label>
                  <Input
                    id="report-name"
                    placeholder="e.g., Weekly Performance Summary"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="report-type" className="text-base font-medium">Report Type</Label>
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger id="report-type" className="mt-2">
                      <SelectValue placeholder="Select a report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map(report => (
                        <SelectItem key={report.id} value={report.id}>
                          {report.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base font-medium">Schedule Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>

                  {frequency === "hourly" && (
                    <div>
                      <Label htmlFor="hourly-interval">Every X Hours</Label>
                      <Select value={hourlyInterval} onValueChange={setHourlyInterval}>
                        <SelectTrigger id="hourly-interval">
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 6, 8, 12].map(hour => (
                            <SelectItem key={hour} value={hour.toString()}>
                              {hour} {hour === 1 ? "hour" : "hours"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {frequency !== "hourly" && (
                    <div>
                      <Label htmlFor="time">Time of Day</Label>
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base font-medium">Delivery Method</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email"
                      checked={emailEnabled}
                      onCheckedChange={(checked) => setEmailEnabled(checked as boolean)}
                    />
                    <Label htmlFor="email" className="font-medium">Email</Label>
                  </div>
                  
                  {emailEnabled && (
                    <div>
                      <Label htmlFor="email-recipient">Recipient Email</Label>
                      <Input
                        id="email-recipient"
                        type="email"
                        placeholder="email@example.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="whatsapp"
                      checked={whatsappEnabled}
                      onCheckedChange={(checked) => setWhatsappEnabled(checked as boolean)}
                    />
                    <Label htmlFor="whatsapp" className="font-medium">WhatsApp</Label>
                  </div>
                  
                  {whatsappEnabled && (
                    <div>
                      <Label htmlFor="phone-recipient">Recipient Phone Number</Label>
                      <Input
                        id="phone-recipient"
                        type="tel"
                        placeholder="+1234567890"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Scheduled Reports List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Active Schedules</CardTitle>
              <CardDescription>
                Currently scheduled reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        <div>{report.name}</div>
                        <div className="text-xs text-muted-foreground">{report.time}</div>
                      </TableCell>
                      <TableCell>
                        <div>{report.frequency}</div>
                        <div className="flex gap-1 mt-1">
                          {report.channels.includes("Email") && (
                            <Mail className="h-3 w-3 text-muted-foreground" />
                          )}
                          {report.channels.includes("WhatsApp") && (
                            <Phone className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
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

export default ScheduledReportsPage; 