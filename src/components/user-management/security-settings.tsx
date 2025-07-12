import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Fingerprint,
  KeyRound 
} from "lucide-react";

export function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Security Settings</h1>
          <p className="text-muted-foreground">
            Manage organization-wide security policies
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2FA Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Configure 2FA settings for your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Require 2FA for all users</p>
                <p className="text-sm text-muted-foreground">
                  All users will be required to set up 2FA
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Require 2FA for Admin users</p>
                <p className="text-sm text-muted-foreground">
                  Only Admin users will be required to set up 2FA
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow SMS as 2FA method</p>
                <p className="text-sm text-muted-foreground">
                  Users can use SMS codes for 2FA
                </p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </CardContent>
        </Card>

        {/* Password Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Password Policy
            </CardTitle>
            <CardDescription>
              Configure password requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Minimum password length</p>
                <p className="text-sm text-muted-foreground">
                  Require at least 8 characters
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Require special characters</p>
                <p className="text-sm text-muted-foreground">
                  Password must contain special characters
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password expiration</p>
                <p className="text-sm text-muted-foreground">
                  Passwords expire after 90 days
                </p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 