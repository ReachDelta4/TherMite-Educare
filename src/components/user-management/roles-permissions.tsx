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
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
} from "lucide-react";

// Mock data for roles
const mockRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access",
    usersCount: 1,
    permissions: ["view", "edit", "create", "delete", "manage_users", "manage_roles", "system_settings"]
  },
  {
    id: 2,
    name: "Manager",
    description: "Department management",
    usersCount: 2,
    permissions: ["view", "edit", "create", "limited_delete"]
  },
  {
    id: 3,
    name: "Operator",
    description: "Daily operations",
    usersCount: 2,
    permissions: ["view", "create"]
  }
];

export function RolesPermissions() {
  const [roles, setRoles] = useState(mockRoles);
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setIsEditRoleDialogOpen(true);
  };

  const getRoleStatusColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-red-500";
      case "Manager": return "bg-blue-500";
      case "Operator": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground">
            Define roles and manage their access permissions
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
                <TableHead>Permissions</TableHead>
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
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {role.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
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

      {/* Add Role Dialog */}
      <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
            <DialogDescription>
              Create a new role with custom permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input id="roleName" placeholder="Support Agent" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleDescription">Description</Label>
              <Input id="roleDescription" placeholder="Handles customer support tickets" />
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="border rounded-md p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="viewPermission" defaultChecked />
                  <Label htmlFor="viewPermission">View</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="createPermission" defaultChecked />
                  <Label htmlFor="createPermission">Create</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="editPermission" />
                  <Label htmlFor="editPermission">Edit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="deletePermission" />
                  <Label htmlFor="deletePermission">Delete</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="manageUsersPermission" />
                  <Label htmlFor="manageUsersPermission">Manage Users</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddRoleDialogOpen(false)}>
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update role details and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editRoleName">Role Name</Label>
                <Input id="editRoleName" defaultValue={selectedRole.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editRoleDescription">Description</Label>
                <Input id="editRoleDescription" defaultValue={selectedRole.description} />
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="editViewPermission" defaultChecked={selectedRole.permissions.includes("view")} />
                    <Label htmlFor="editViewPermission">View</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="editCreatePermission" defaultChecked={selectedRole.permissions.includes("create")} />
                    <Label htmlFor="editCreatePermission">Create</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="editEditPermission" defaultChecked={selectedRole.permissions.includes("edit")} />
                    <Label htmlFor="editEditPermission">Edit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="editDeletePermission" defaultChecked={selectedRole.permissions.includes("delete")} />
                    <Label htmlFor="editDeletePermission">Delete</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="editManageUsersPermission" defaultChecked={selectedRole.permissions.includes("manage_users")} />
                    <Label htmlFor="editManageUsersPermission">Manage Users</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditRoleDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 