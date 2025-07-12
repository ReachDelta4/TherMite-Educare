import React, { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  User, 
  Mail, 
  Phone, 
  Lock,
  Edit, 
  Upload,
  Bell,
  Key
} from "lucide-react";

// Mock data
const mockUser = {
  name: "Barath Anthony",
  role: "Administrator",
  email: "barath@thermite.edu",
  phone: "+91 98765 43210",
  avatar: "/logo.png",
  bio: "System administrator with 5+ years of experience in educational technology platforms.",
  joined: "March 15, 2023",
  lastLogin: "July 26, 2024 11:00 AM",
  notificationPreferences: {
    email: true,
    push: false,
    sms: false,
  }
};

export function UserProfile() {
    const [user, setUser] = useState(mockUser);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const handleNotificationToggle = (type: keyof typeof user.notificationPreferences) => {
      setUser(prevUser => ({
        ...prevUser,
        notificationPreferences: {
          ...prevUser.notificationPreferences,
          [type]: !prevUser.notificationPreferences[type]
        }
      }));
    };

    return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.role}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>
            <div>
              <Button variant="outline" onClick={() => setIsEditProfileOpen(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div>
                <h3 className="font-semibold">Bio</h3>
                <p className="text-muted-foreground text-sm mt-1">{user.bio}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
                 <Button variant="outline" onClick={() => setIsChangePasswordOpen(true)}>
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="cursor-pointer">Email Notifications</Label>
            <Switch 
                id="email-notifications" 
                checked={user.notificationPreferences.email} 
                onCheckedChange={() => handleNotificationToggle('email')} 
            />
            </div>
            <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="cursor-pointer">Push Notifications</Label>
            <Switch 
                id="push-notifications"
                checked={user.notificationPreferences.push}
                onCheckedChange={() => handleNotificationToggle('push')} 
            />
            </div>
            <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications" className="cursor-pointer">SMS Notifications</Label>
            <Switch 
                id="sms-notifications"
                checked={user.notificationPreferences.sms} 
                onCheckedChange={() => handleNotificationToggle('sms')} 
            />
            </div>
        </CardContent>
      </Card>

       {/* Edit Profile Dialog */}
       <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
         <DialogContent className="sm:max-w-[500px]">
           <DialogHeader>
             <DialogTitle>Edit Profile</DialogTitle>
             <DialogDescription>
               Update your personal information
             </DialogDescription>
           </DialogHeader>
           <div className="space-y-4 py-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline"><Upload className="h-4 w-4 mr-2" /> Upload New Photo</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue={user.phone} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea id="bio" rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={user.bio}></textarea>
                </div>
           </div>
           <DialogFooter>
             <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>
               Cancel
             </Button>
             <Button onClick={() => setIsEditProfileOpen(false)}>
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
    </div>
    );
} 