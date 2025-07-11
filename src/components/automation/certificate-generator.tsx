
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Award, Upload, Download, FileText, Image } from "lucide-react";
import { useState } from "react";

export function CertificateGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [studentData, setStudentData] = useState("");

  const templates = [
    { id: "completion", name: "Course Completion", status: "active" },
    { id: "achievement", name: "Achievement Award", status: "active" },
    { id: "participation", name: "Participation", status: "draft" }
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Certificate Generator Automation</CardTitle>
              <CardDescription>Automatically generate and distribute certificates</CardDescription>
            </div>
          </div>
          <Badge variant="default">3 Templates</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="template">Certificate Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{template.name}</span>
                        <Badge variant={template.status === "active" ? "default" : "secondary"} className="ml-2">
                          {template.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="data">Student Data Source</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="data"
                  placeholder="Upload CSV or connect to database"
                  value={studentData}
                  onChange={(e) => setStudentData(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Generation Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-primary">234</div>
                  <div className="text-muted-foreground">Certificates Generated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">198</div>
                  <div className="text-muted-foreground">Successfully Delivered</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Template Management</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Image className="h-4 w-4 mr-1" />
                  Edit Template
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Templates
          </Button>
          <Button disabled={!selectedTemplate}>
            Generate Certificates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
