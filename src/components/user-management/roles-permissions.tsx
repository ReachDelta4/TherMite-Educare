import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
} from "lucide-react";

const allModules = [
  { id: "dashboard", name: "Dashboard" },
  { id: "whatsapp_bot", name: "WhatsApp Bot" },
  { id: "certificates", name: "Certificates" },
  { id: "ai_calling", name: "AI Calling" },
  { id: "user_management", name: "User Management" },
  { id: "analytics", name: "Analytics" },
  { id: "settings", name: "System Settings" },
];

const allPermissions = ["view", "create", "edit", "delete"];

const mockRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access",
    usersCount: 1,
    permissions: {
      "dashboard": ["view"],
      "whatsapp_bot": ["view", "create", "edit", "delete"],
      "certificates": ["view", "create", "edit", "delete"],
      "ai_calling": ["view", "create", "edit", "delete"],
      "user_management": ["view", "create", "edit", "delete"],
      "analytics": ["view"],
      "settings": ["view", "edit"],
    }
  },
  {
    id: 2,
    name: "Manager",
    description: "Department management",
    usersCount: 2,
    permissions: {
      "dashboard": ["view"],
      "whatsapp_bot": ["view", "create", "edit"],
      "certificates": ["view", "create", "edit"],
      "ai_calling": ["view", "create"],
    }
  },
  {
    id: 3,
    name: "Operator",
    description: "Daily operations",
    usersCount: 2,
    permissions: {
      "dashboard": ["view"],
      "whatsapp_bot": ["view", "create"],
      "certificates": ["view", "create"],
    }
  }
];

const PermissionRow = ({ module, permissions, onPermissionChange }: { module: any, permissions: string[], onPermissionChange: (moduleId: string, permission: string, checked: boolean) => void }) => (
  <TableRow>
    <TableCell className="font-medium">{module.name}</TableCell>
    {allPermissions.map((permission) => (
      <TableCell key={permission} className="text-center">
        <Switch
          checked={permissions?.includes(permission) ?? false}
          onCheckedChange={(checked) => onPermissionChange(module.id, permission, checked)}
        />
      </TableCell>
    ))}
  </TableRow>
);


export function RolesPermissions() {
  const [roles, setRoles] = useState(mockRoles);
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const handleEditRole = (role: any) => {
    setSelectedRole(JSON.parse(JSON.stringify(role))); // Deep copy to avoid direct state mutation
    setIsEditRoleDialogOpen(true);
  };

  const handlePermissionChange = (moduleId: string, permission: string, checked: boolean) => {
    if (!selectedRole) return;

    setSelectedRole((prevRole: any) => {
      const newPermissions = { ...prevRole.permissions };
      if (checked) {
        if (newPermissions[moduleId]) {
          newPermissions[moduleId] = [...newPermissions[moduleId], permission];
        } else {
          newPermissions[moduleId] = [permission];
        }
      } else {
        if (newPermissions[moduleId]) {
          newPermissions[moduleId] = newPermissions[moduleId].filter((p: string) => p !== permission);
        }
      }
      return { ...prevRole, permissions: newPermissions };
    });
  };

  const getRoleStatusColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-red-500";
      case "Manager": return "bg-blue-500";
      case "Operator": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const countPermissions = (permissions: any) => {
    if (!permissions) return 0;
    return Object.values(permissions).reduce((acc: any, perms: any) => acc + perms.length, 0);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground">
            Define roles and manage their access permissions with granular control
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAddRoleDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Configured Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getRoleStatusColor(role.name)}`} />
                      {role.name}
                    </div>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.usersCount} users</TableCell>
                  <TableCell>
                     <Badge variant="outline">{countPermissions(role.permissions)} permissions</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditRole(role)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Role / Edit Role Dialog */}
      <Dialog open={isAddRoleDialogOpen || isEditRoleDialogOpen} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setIsAddRoleDialogOpen(false);
          setIsEditRoleDialogOpen(false);
        }
      }}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>{isEditRoleDialogOpen ? "Edit Role" : "Add New Role"}</DialogTitle>
            <DialogDescription>
              {isEditRoleDialogOpen ? "Update role details and permissions." : "Create a new role with custom permissions."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input id="roleName" placeholder="e.g., Support Agent" defaultValue={selectedRole?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleDescription">Description</Label>
              <Input id="roleDescription" placeholder="e.g., Handles daily operations" defaultValue={selectedRole?.description}/>
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Module</TableHead>
                          <TableHead className="text-center">View</TableHead>
                          <TableHead className="text-center">Create</TableHead>
                          <TableHead className="text-center">Edit</TableHead>
                          <TableHead className="text-center">Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allModules.map((module) => (
                           <PermissionRow 
                             key={module.id}
                             module={module} 
                             permissions={selectedRole?.permissions?.[module.id]}
                             onPermissionChange={handlePermissionChange}
                           />
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsAddRoleDialogOpen(false); setIsEditRoleDialogOpen(false); }}>
              Cancel
            </Button>
            <Button onClick={() => { /* Implement save logic here */ setIsAddRoleDialogOpen(false); setIsEditRoleDialogOpen(false); }}>
              {isEditRoleDialogOpen ? "Save Changes" : "Create Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 