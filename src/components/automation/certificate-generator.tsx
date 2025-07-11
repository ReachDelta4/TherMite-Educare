
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Award, Upload, Download, FileText, Image, Eye } from "lucide-react";
import { useState } from "react";

export function CertificateGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [studentData, setStudentData] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const templates = [
    { id: "completion", name: "Course Completion", status: "active", preview: "/api/placeholder/400/300" },
    { id: "achievement", name: "Achievement Award", status: "active", preview: "/api/placeholder/400/300" },
    { id: "participation", name: "Participation", status: "draft", preview: "/api/placeholder/400/300" }
  ];

  const sampleCertificateData = {
    studentName: "John Doe",
    courseName: "Full Stack Web Development",
    completionDate: "March 15, 2024",
    instructorName: "Dr. Sarah Johnson",
    grade: "A+",
    certificateId: "CERT-2024-001"
  };

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

            {/* Certificate Preview */}
            {selectedTemplate && (
              <div className="space-y-2">
                <Label>Certificate Preview</Label>
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Award className="h-12 w-12 text-blue-500 mx-auto" />
                      <div className="space-y-1 text-sm">
                        <p className="font-bold text-lg">Certificate of Completion</p>
                        <p>This is to certify that</p>
                        <p className="font-semibold text-blue-600">{sampleCertificateData.studentName}</p>
                        <p>has successfully completed</p>
                        <p className="font-semibold">{sampleCertificateData.courseName}</p>
                        <p className="text-xs mt-2">Date: {sampleCertificateData.completionDate}</p>
                        <p className="text-xs">Grade: {sampleCertificateData.grade}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <p>Preview uses sample data. Actual certificates will use real student information.</p>
                  </div>
                </div>
              </div>
            )}
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

            {/* Available Placeholders */}
            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Available Placeholders</h4>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-mono bg-muted px-2 py-1 rounded">{{studentName}}</span>
                  <span className="text-muted-foreground">Student's full name</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono bg-muted px-2 py-1 rounded">{{courseName}}</span>
                  <span className="text-muted-foreground">Course title</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono bg-muted px-2 py-1 rounded">{{completionDate}}</span>
                  <span className="text-muted-foreground">Completion date</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono bg-muted px-2 py-1 rounded">{{instructorName}}</span>
                  <span className="text-muted-foreground">Instructor name</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono bg-muted px-2 py-1 rounded">{{grade}}</span>
                  <span className="text-muted-foreground">Final grade</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono bg-muted px-2 py-1 rounded">{{certificateId}}</span>
                  <span className="text-muted-foreground">Unique certificate ID</span>
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
                  <Eye className="h-4 w-4 mr-1" />
                  Full Preview
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
