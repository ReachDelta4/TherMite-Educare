
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Phone,
  PhoneCall,
  Mic,
  Volume2,
  Clock,
  Users,
  BrainCircuit,
  PlusCircle,
  History,
  Trash2,
  Edit,
  BookUser,
  GitBranch
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { VoiceCustomization } from "./voice-customization";
import { CallScriptBuilder } from "./call-script-builder";

// Mock Data - Replace with API calls
const agents = [
  { id: "agent-1", name: "Lead Follow-up Bot", voice: "Female Professional", status: "Active", knowledgeBase: "Sales Q&A" },
  { id: "agent-2", name: "Customer Service Agent", voice: "Male Friendly", status: "Active", knowledgeBase: "General FAQ" },
  { id: "agent-3", name: "Appointment Booker", voice: "Neutral Calm", status: "Inactive", knowledgeBase: "Scheduling Policies" },
];

const phoneNumbers = [
    { id: "num-1", number: "+91 98765 43210", assignedAgent: "Lead Follow-up Bot", status: "Active" },
    { id: "num-2", number: "+91 91234 56789", assignedAgent: "Customer Service Agent", status: "Active" },
    { id: "num-3", number: "+91 99887 76655", assignedAgent: "Unassigned", status: "Available" },
];

const knowledgeBases = [
    { id: "kb-1", name: "Sales Q&A", sources: 5, lastUpdated: "2024-07-20" },
    { id: "kb-2", name: "General FAQ", sources: 12, lastUpdated: "2024-07-18" },
    { id: "kb-3", name: "Scheduling Policies", sources: 3, lastUpdated: "2024-06-30" },
];

const callLogs = [
    { id: "log-1", to: "+91 90000 00001", from: "+91 98765 43210", agent: "Lead Follow-up Bot", duration: "2m 15s", status: "Completed", timestamp: "2024-07-21 10:05 AM", transcript: "Hello, this is a test call." },
    { id: "log-2", to: "+91 90000 00002", from: "+91 98765 43210", agent: "Lead Follow-up Bot", duration: "0m 45s", status: "No Answer", timestamp: "2024-07-21 10:07 AM", transcript: "No answer." },
    { id: "log-3", to: "+91 90000 00003", from: "+91 91234 56789", agent: "Customer Service Agent", duration: "5m 32s", status: "Completed", timestamp: "2024-07-21 10:08 AM", transcript: "Customer service call completed." },
    { id: "log-4", to: "+91 90000 00004", from: "+91 98765 43210", agent: "Lead Follow-up Bot", duration: "1m 10s", status: "Failed", timestamp: "2024-07-21 10:11 AM", transcript: "Call failed due to network error." },
];

function CampaignDashboard() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [voiceProfile, setVoiceProfile] = useState("");
  const [callScript, setCallScript] = useState("");

  const voiceProfiles = [
    { id: "female-professional", name: "Female Professional" },
    { id: "male-friendly", name: "Male Friendly" },
    { id: "neutral-calm", name: "Neutral Calm" },
  ];

  // Mock analytics data
  const callsPerDay = [
    { date: "Mon", calls: 22 },
    { date: "Tue", calls: 34 },
    { date: "Wed", calls: 28 },
    { date: "Thu", calls: 41 },
    { date: "Fri", calls: 35 },
    { date: "Sat", calls: 19 },
    { date: "Sun", calls: 11 },
  ];
  const qualificationPie = [
    { name: "Qualified", value: 67 },
    { name: "Not Qualified", value: 33 },
  ];
  const callOutcomes = [
    { outcome: "Connected", value: 120 },
    { outcome: "No Answer", value: 40 },
    { outcome: "Rejected", value: 15 },
    { outcome: "Callback Scheduled", value: 23 },
  ];

  return (
    <div className="space-y-8 w-full overflow-hidden">
      {/* Analytics Charts */}
      <div className="w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          {/* Calls per Day Bar Chart */}
          <Card className="w-full min-w-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Calls Per Day</CardTitle>
              <CardDescription className="text-xs">Volume of lead qualifying calls this week</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{ calls: { label: "Calls", color: "#2563eb" } }}
                className="h-48 w-full"
              >
                <RechartsPrimitive.BarChart data={callsPerDay}>
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                  <RechartsPrimitive.XAxis dataKey="date" fontSize={10} />
                  <RechartsPrimitive.YAxis allowDecimals={false} fontSize={10} />
                  <ChartTooltip />
                  <RechartsPrimitive.Bar dataKey="calls" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </RechartsPrimitive.BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {/* Qualification Rate Pie Chart */}
          <Card className="w-full min-w-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Qualification Rate</CardTitle>
              <CardDescription className="text-xs">Ratio of qualified vs not qualified leads</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{ Qualified: { label: "Qualified", color: "#22c55e" }, "Not Qualified": { label: "Not Qualified", color: "#ef4444" } }}
                className="h-48 w-full"
              >
                <RechartsPrimitive.PieChart>
                  <RechartsPrimitive.Pie
                    data={qualificationPie}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    innerRadius={30}
                    label
                  >
                    {qualificationPie.map((entry, idx) => (
                      <RechartsPrimitive.Cell key={`cell-${idx}`} fill={entry.name === "Qualified" ? "#22c55e" : "#ef4444"} />
                    ))}
                  </RechartsPrimitive.Pie>
                  <ChartLegendContent payload={qualificationPie.map((d, i) => ({ value: d.name, color: d.name === "Qualified" ? "#22c55e" : "#ef4444" }))} />
                  <ChartTooltip />
                </RechartsPrimitive.PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {/* Call Outcomes Bar Chart */}
          <Card className="w-full min-w-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Call Outcomes</CardTitle>
              <CardDescription className="text-xs">Distribution of call results</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{ value: { label: "Count", color: "#6366f1" } }}
                className="h-48 w-full"
              >
                <RechartsPrimitive.BarChart data={callOutcomes}>
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                  <RechartsPrimitive.XAxis dataKey="outcome" fontSize={10} />
                  <RechartsPrimitive.YAxis allowDecimals={false} fontSize={10} />
                  <ChartTooltip />
                  <RechartsPrimitive.Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </RechartsPrimitive.BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Existing statistics and controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Launch a New Campaign</CardTitle>
              <CardDescription>Configure and start a new automated calling campaign.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <Label htmlFor="agent-select">Select Agent</Label>
                <Select>
                    <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose an agent" />
                    </SelectTrigger>
                    <SelectContent>
                        {agents.map((agent) => (
                            <SelectItem key={agent.id} value={agent.id}>
                                {agent.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone-list">Contact List (CSV)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="phone-list"
                    type="file"
                    className="flex-1"
                  />
                   <Button variant="outline" size="icon">
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </div>
               <div className="flex justify-start space-x-2 pt-4">
                <Button>
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Start Campaign
                </Button>
                 <Button variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule for Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">Live Campaign Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-primary">89</div>
                <div className="text-muted-foreground">Calls Made Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">67%</div>
                <div className="text-muted-foreground">Connection Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-muted-foreground">Follow-ups Scheduled</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2m 3s</div>
                <div className="text-muted-foreground">Avg Call Duration</div>
              </div>
            </div>
          </div>
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Mic className="h-4 w-4 mr-1" />
                        Test an Agent
                    </Button>
                    <Button variant="destructive" size="sm">
                        <PhoneCall className="h-4 w-4 mr-1" />
                        Stop All Campaigns
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

function AgentManagement() {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Agent Management</CardTitle>
                        <CardDescription>Create, configure, and train your AI calling agents.</CardDescription>
                    </div>
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create New Agent
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Voice</TableHead>
                            <TableHead>Knowledge Base</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agents.map((agent) => (
                            <TableRow key={agent.id}>
                                <TableCell className="font-medium">{agent.name}</TableCell>
                                <TableCell>{agent.voice}</TableCell>
                                <TableCell>{agent.knowledgeBase}</TableCell>
                                <TableCell><Badge variant={agent.status === 'Active' ? 'default' : 'secondary'}>{agent.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function PhoneNumberManagement() {
    return (
         <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Phone Number Management</CardTitle>
                        <CardDescription>Manage your phone numbers for outbound and inbound calls.</CardDescription>
                    </div>
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Number
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Assigned Agent</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {phoneNumbers.map((phone) => (
                            <TableRow key={phone.id}>
                                <TableCell className="font-medium">{phone.number}</TableCell>
                                <TableCell>{phone.assignedAgent}</TableCell>
                                <TableCell><Badge variant={phone.status === 'Active' ? 'default' : 'outline'}>{phone.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

function KnowledgeBaseManagement() {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Knowledge Base</CardTitle>
                        <CardDescription>Provide your agents with information to answer questions.</CardDescription>
                    </div>
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Knowledge Base
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Sources</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {knowledgeBases.map((kb) => (
                            <TableRow key={kb.id}>
                                <TableCell className="font-medium">{kb.name}</TableCell>
                                <TableCell>{kb.sources}</TableCell>
                                <TableCell>{kb.lastUpdated}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <BookUser className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function CallLogView() {
    const [openId, setOpenId] = useState<string | null>(null);
    const selectedLog = callLogs.find((log) => log.id === openId);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Call Logs</CardTitle>
                <CardDescription>Review the history of all inbound and outbound calls.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {callLogs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>{log.timestamp}</TableCell>
                                <TableCell>{log.to}</TableCell>
                                <TableCell>{log.from}</TableCell>
                                <TableCell>{log.agent}</TableCell>
                                <TableCell>{log.duration}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        log.status === 'Completed' ? 'default' :
                                        log.status === 'No Answer' ? 'secondary' :
                                        'destructive'
                                    }>{log.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => setOpenId(log.id)}>View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog open={!!openId} onOpenChange={(open) => !open && setOpenId(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Call Details</DialogTitle>
                      <DialogDescription>
                        {selectedLog ? (
                          <div className="space-y-2">
                            <div><b>Timestamp:</b> {selectedLog.timestamp}</div>
                            <div><b>To:</b> {selectedLog.to}</div>
                            <div><b>From:</b> {selectedLog.from}</div>
                            <div><b>Agent:</b> {selectedLog.agent}</div>
                            <div><b>Duration:</b> {selectedLog.duration}</div>
                            <div><b>Status:</b> {selectedLog.status}</div>
                            <div><b>Transcript:</b> <pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">{selectedLog.transcript}</pre></div>
                          </div>
                        ) : null}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}

export function AICallingAgent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>AI Calling Agent</CardTitle>
                <CardDescription>Automate your outbound and inbound call campaigns</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="numbers">Phone Numbers</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="voices">
            <Volume2 className="h-4 w-4 mr-2" /> Voices
          </TabsTrigger>
          <TabsTrigger value="scripts">
            <GitBranch className="h-4 w-4 mr-2" /> Scripts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6">
          <CampaignDashboard />
        </TabsContent>
        <TabsContent value="agents" className="mt-6">
          <AgentManagement />
        </TabsContent>
        <TabsContent value="numbers" className="mt-6">
          <PhoneNumberManagement />
        </TabsContent>
        <TabsContent value="knowledge" className="mt-6">
          <KnowledgeBaseManagement />
        </TabsContent>
        <TabsContent value="voices" className="mt-6">
          <VoiceCustomization />
        </TabsContent>
        <TabsContent value="scripts" className="mt-6 h-full">
          <CallScriptBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
}
