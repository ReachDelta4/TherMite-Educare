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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  PlusCircle,
  Filter,
  Users,
  Tag,
  Upload,
  Download,
  Trash2,
  Edit,
  MoreHorizontal
} from "lucide-react";

const mockContacts = [
  { id: 1, name: "Alice Johnson", phone: "+91 98765 12345", tags: ["New Lead", "Follow-up"], lastContact: "2024-07-23", status: "Active" },
  { id: 2, name: "Bob Williams", phone: "+91 98765 67890", tags: ["Customer", "High Value"], lastContact: "2024-07-20", status: "Active" },
  { id: 3, name: "Charlie Brown", phone: "+91 98765 11223", tags: ["Archived"], lastContact: "2024-05-15", status: "Archived" },
  { id: 4, name: "Diana Miller", phone: "+91 98765 44556", tags: ["New Lead"], lastContact: "2024-07-24", status: "Active" },
  { id: 5, name: "Ethan Davis", phone: "+91 98765 77889", tags: ["Do Not Contact"], lastContact: "2024-06-10", status: "Blocked" },
];

export function ContactManagement() {
  const [contacts, setContacts] = useState(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("all");

  const filteredContacts = contacts
    .filter(c => searchTerm === "" || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm))
    .filter(c => filterTag === "all" || c.tags.includes(filterTag));
    
  const allTags = Array.from(new Set(contacts.flatMap(c => c.tags)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact Management</h1>
          <p className="text-muted-foreground">
            Manage your contact lists, segments, and tags
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" /> Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Contact
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
                <CardTitle>All Contacts</CardTitle>
                <CardDescription>
                  {filteredContacts.length} contacts found
                </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-8 h-9 w-[150px] md:w-[250px]"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map(contact => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {contact.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                     <Badge variant={
                        contact.status === 'Active' ? 'default' :
                        contact.status === 'Blocked' ? 'destructive' :
                        'outline'
                     }>{contact.status}</Badge>
                  </TableCell>
                  <TableCell>{contact.lastContact}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 