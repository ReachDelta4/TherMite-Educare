
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, PhoneCall, Mic, Volume2, Clock } from "lucide-react";
import { useState } from "react";

export function AICallingAgent() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [voiceProfile, setVoiceProfile] = useState("");
  const [callScript, setCallScript] = useState("");

  const voiceProfiles = [
    { id: "female-professional", name: "Female Professional" },
    { id: "male-friendly", name: "Male Friendly" },
    { id: "neutral-calm", name: "Neutral Calm" }
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PhoneCall className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>AI Calling Agent Setup</CardTitle>
              <CardDescription>Automated calling system for lead follow-up and customer service</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isEnabled ? "default" : "secondary"}>
              {isEnabled ? "Active" : "Inactive"}
            </Badge>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="voice">Voice Profile</Label>
              <Select value={voiceProfile} onValueChange={setVoiceProfile}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select voice profile" />
                </SelectTrigger>
                <SelectContent>
                  {voiceProfiles.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      <div className="flex items-center">
                        <Volume2 className="h-4 w-4 mr-2" />
                        {voice.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="script">Call Script</Label>
              <Textarea
                id="script"
                placeholder="Hello, this is calling from TherMite Educare. I'm reaching out to..."
                value={callScript}
                onChange={(e) => setCallScript(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="phone-list">Contact List</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="phone-list"
                  placeholder="Upload contact list or connect CRM"
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Call Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-primary">89</div>
                  <div className="text-muted-foreground">Calls Made Today</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">67%</div>
                  <div className="text-muted-foreground">Connection Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">23</div>
                  <div className="text-muted-foreground">Follow-ups Scheduled</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-muted-foreground">2.3m</div>
                  <div className="text-muted-foreground">Avg Call Duration</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Quick Actions</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mic className="h-4 w-4 mr-1" />
                  Test Voice
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Schedule Calls
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline">Preview Script</Button>
          <Button disabled={!voiceProfile || !callScript}>
            Start Campaign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
