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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  Bell,
  Globe,
  Calendar,
  Clock,
  LogOut,
  Settings,
  Edit,
  Camera,
  Smartphone,
  Key,
  Fingerprint,
  CheckCircle,
  AlertCircle,
  Save,
  RefreshCw,
  X,
  Download
} from "lucide-react";

// Mock user data
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@thermite.edu",
  role: "Admin",
  avatar: "/placeholder.svg",
  phone: "+91 98765 43210",
  joinDate: "March 15, 2023",
  lastLogin: "July 24, 2024 10:30 AM",
  twoFactorEnabled: true,
  notificationPreferences: {
    email: true,
    sms: false,
    browser: true
  },
  timezone: "Asia/Kolkata",
  language: "English",
  bio: "System administrator with 5+ years of experience in educational technology platforms."
};

// Mock login activity
const loginActivity = [
  { id: 1, device: "Chrome on Windows", location: "Mumbai, India", ip: "192.168.1.1", time: "July 24, 2024 10:30 AM", status: "Success" },
  { id: 2, device: "Mobile App on Android", location: "Mumbai, India", ip: "192.168.1.2", time: "July 23, 2024 09:15 AM", status: "Success" },
  { id: 3, device: "Firefox on Mac", location: "Delhi, India", ip: "192.168.1.3", time: "July 22, 2024 03:45 PM", status: "Failed" },
  { id: 4, device: "Chrome on Windows", location: "Mumbai, India", ip: "192.168.1.1", time: "July 22, 2024 11:20 AM", status: "Success" },
];

export function UserProfile() {
  const [user, setUser] = useState(mockUser);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isSetupTwoFactorOpen, setIsSetupTwoFactorOpen] = useState(false);
  const [qrCode, setQrCode] = useState("/placeholder.svg");
  const [verificationStep, setVerificationStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");

  const handleToggle2FA = () => {
    if (!user.twoFactorEnabled) {
      setIsSetupTwoFactorOpen(true);
    } else {
      // In a real app, you would have a confirmation dialog
      setUser({ ...user, twoFactorEnabled: false });
    }
  };

  const handleNotificationToggle = (type: keyof typeof user.notificationPreferences) => {
    setUser({
      ...user,
      notificationPreferences: {
        ...user.notificationPreferences,
        [type]: !user.notificationPreferences[type]
      }
    });
  };

  const handleVerifyCode = () => {
    // In a real app, this would verify the code with the server
    if (verificationCode.length === 6) {
      setVerificationStep(2);
    }
  };

  const handleComplete2FASetup = () => {
    setUser({ ...user, twoFactorEnabled: true });
    setIsSetupTwoFactorOpen(false);
    setVerificationStep(1);
    setVerificationCode("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Your personal information and profile settings
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsEditProfileOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-medium text-lg">{user.name}</p>
                    <Badge variant="secondary" className="mt-1">{user.role}</Badge>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {user.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Joined</p>
                      <p className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {user.joinDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Login</p>
                      <p className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {user.lastLogin}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Bio</p>
                    <p className="text-sm">{user.bio || "No bio provided."}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-0.5">
                  <div className="font-medium">Password</div>
                  <div className="text-sm text-muted-foreground">
                    Last changed 30 days ago
                  </div>
                </div>
                <Button variant="outline" onClick={() => setIsChangePasswordOpen(true)}>
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-0.5">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">
                    {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={user.twoFactorEnabled}
                    onCheckedChange={handleToggle2FA}
                  />
                  <span className="text-sm font-medium">
                    {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-0.5">
                  <div className="font-medium">Active Sessions</div>
                  <div className="text-sm text-muted-foreground">
                    2 active sessions on different devices
                  </div>
                </div>
                <Button variant="outline">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Activity</CardTitle>
              <CardDescription>
                Recent login attempts from your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loginActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${activity.status === "Success" ? "bg-green-100" : "bg-red-100"}`}>
                        {activity.status === "Success" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{activity.device}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.location} • {activity.ip}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                    <Badge variant={activity.status === "Success" ? "outline" : "destructive"}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Log
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Channels</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={user.notificationPreferences.email}
                      onCheckedChange={() => handleNotificationToggle("email")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4" />
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={user.notificationPreferences.sms}
                      onCheckedChange={() => handleNotificationToggle("sms")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <Label htmlFor="browser-notifications">Browser Notifications</Label>
                    </div>
                    <Switch
                      id="browser-notifications"
                      checked={user.notificationPreferences.browser}
                      onCheckedChange={() => handleNotificationToggle("browser")}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="security-alerts">Security Alerts</Label>
                    <Switch id="security-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="account-updates">Account Updates</Label>
                    <Switch id="account-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-features">New Features</Label>
                    <Switch id="new-features" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing">Marketing & Promotions</Label>
                    <Switch id="marketing" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>
                Customize your account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue={user.language}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                    <SelectItem value="Telugu">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue={user.timezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">India (GMT+5:30)</SelectItem>
                    <SelectItem value="America/New_York">New York (GMT-4:00)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT+1:00)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (GMT+9:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={user.name.split(" ")[0]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue={user.name.split(" ")[1]} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue={user.phone} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue={user.bio} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditProfileOpen(false)}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Update your account password
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsChangePasswordOpen(false)}>
              <Key className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Setup 2FA Dialog */}
      <Dialog open={isSetupTwoFactorOpen} onOpenChange={setIsSetupTwoFactorOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enhance your account security with 2FA
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {verificationStep === 1 ? (
              <>
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-1 border rounded-md">
                    <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Scan this QR code with your authenticator app
                    </p>
                    <div className="p-2 bg-muted rounded-md text-center">
                      <code className="text-sm">ABCD-EFGH-IJKL-MNOP</code>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input
                    id="verification-code"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium">Setup Complete!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Two-factor authentication has been successfully enabled for your account.
                  </p>
                </div>
                <div className="p-4 border rounded-md w-full">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recovery Codes</p>
                    <p className="text-xs text-muted-foreground">
                      Save these recovery codes in a secure place. They can be used to recover your account if you lose access to your authenticator app.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <code className="text-xs bg-muted p-1 rounded">ABCD-1234-EFGH</code>
                      <code className="text-xs bg-muted p-1 rounded">IJKL-5678-MNOP</code>
                      <code className="text-xs bg-muted p-1 rounded">QRST-9012-UVWX</code>
                      <code className="text-xs bg-muted p-1 rounded">YZ12-3456-7890</code>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            {verificationStep === 1 ? (
              <>
                <Button variant="outline" onClick={() => setIsSetupTwoFactorOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleVerifyCode} disabled={verificationCode.length !== 6}>
                  <Fingerprint className="h-4 w-4 mr-2" />
                  Verify
                </Button>
              </>
            ) : (
              <Button onClick={handleComplete2FASetup}>
                Complete Setup
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 