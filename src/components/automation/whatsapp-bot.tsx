
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Settings, Activity } from "lucide-react";
import { useState } from "react";

export function WhatsAppBot() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>WhatsApp Lead Qualification Bot</CardTitle>
              <CardDescription>Automate lead capture and qualification via WhatsApp</CardDescription>
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
              <Label htmlFor="phone">WhatsApp Business Number</Label>
              <div className="flex mt-2">
                <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="phone"
                  placeholder="+91 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="rounded-l-none"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="welcome">Welcome Message</Label>
              <Textarea
                id="welcome"
                placeholder="Hi! Welcome to TherMite Educare. How can I help you today?"
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2 flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Bot Statistics (Last 30 days)
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-primary">127</div>
                  <div className="text-muted-foreground">Messages Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">45</div>
                  <div className="text-muted-foreground">Qualified Leads</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Quick Actions</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Configure Flow
                </Button>
                <Button variant="outline" size="sm">
                  View Logs
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline">Test Bot</Button>
          <Button disabled={!phoneNumber || !welcomeMessage}>
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
