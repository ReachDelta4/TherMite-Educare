
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, MessageSquare, Bot, MousePointer, Link } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  type: "text" | "ai-response" | "buttons" | "link";
  content: string;
  status: "active" | "draft";
  createdAt: string;
}

export function WhatsAppTemplateManager() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Welcome Message",
      type: "text",
      content: "Welcome to TherMite Educare! How can we help you today?",
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Course Options",
      type: "buttons",
      content: "Which course are you interested in?\n1. Web Development\n2. Data Science\n3. AI/ML",
      status: "active",
      createdAt: "2024-01-14"
    },
    {
      id: "3",
      name: "AI Lead Qualifier",
      type: "ai-response",
      content: "AI will analyze the lead's response and provide personalized recommendations",
      status: "draft",
      createdAt: "2024-01-13"
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "text" as Template['type'],
    content: "",
    status: "draft" as Template['status']
  });

  const templateTypes = [
    { value: "text", label: "Text Message", icon: MessageSquare },
    { value: "ai-response", label: "AI Response", icon: Bot },
    { value: "buttons", label: "Button Template", icon: MousePointer },
    { value: "link", label: "Link Template", icon: Link }
  ];

  const handleCreateTemplate = () => {
    if (!formData.name || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTemplate: Template = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      content: formData.content,
      status: formData.status,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTemplates(prev => [...prev, newTemplate]);
    setFormData({ name: "", type: "text", content: "", status: "draft" });
    setShowCreateForm(false);
    toast.success("Template created successfully!");
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      type: template.type,
      content: template.content,
      status: template.status
    });
    setShowCreateForm(true);
  };

  const handleUpdateTemplate = () => {
    if (!editingTemplate) return;

    setTemplates(prev => prev.map(t => 
      t.id === editingTemplate.id 
        ? { ...t, ...formData }
        : t
    ));

    setEditingTemplate(null);
    setFormData({ name: "", type: "text", content: "", status: "draft" });
    setShowCreateForm(false);
    toast.success("Template updated successfully!");
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    toast.success("Template deleted successfully!");
  };

  const getTypeIcon = (type: Template['type']) => {
    const typeConfig = templateTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.icon : MessageSquare;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">WhatsApp Templates</h3>
          <p className="text-sm text-muted-foreground">
            Manage your WhatsApp message templates and flow components
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingTemplate ? "Edit Template" : "Create New Template"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  placeholder="Enter template name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="type">Template Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as Template['type'] }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templateTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="content">Template Content</Label>
              <Textarea
                id="content"
                placeholder="Enter your template content..."
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Template['status'] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}>
                {editingTemplate ? "Update Template" : "Create Template"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingTemplate(null);
                  setFormData({ name: "", type: "text", content: "", status: "draft" });
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates List */}
      <div className="grid gap-4">
        {templates.map((template) => {
          const TypeIcon = getTypeIcon(template.type);
          return (
            <Card key={template.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-muted rounded-lg">
                      <TypeIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant={template.status === "active" ? "default" : "secondary"}>
                          {template.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {template.content.length > 100 
                          ? `${template.content.substring(0, 100)}...` 
                          : template.content
                        }
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Type: {template.type}</span>
                        <span>Created: {template.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditTemplate(template)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {templates.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No templates yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first WhatsApp template to get started
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
