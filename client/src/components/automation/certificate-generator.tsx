import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Upload, Download, FileText, Image, Eye, Settings, Play, BarChart3, Users, CheckCircle, AlertCircle, Palette, QrCode } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CertificateVerification } from "./certificate-verification";

function Generator() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [studentData, setStudentData] = useState("");

  const templates = [
    { id: "completion", name: "Course Completion", status: "active", preview: "/api/placeholder/400/300", students: 1250 },
    { id: "achievement", name: "Achievement Award", status: "active", preview: "/api/placeholder/400/300", students: 850 },
    { id: "participation", name: "Participation", status: "draft", preview: "/api/placeholder/400/300", students: 0 }
  ];

  const sampleCertificateData = {
    studentName: "John Doe",
    courseName: "Full Stack Web Development",
    completionDate: "March 15, 2024",
    instructorName: "Dr. Sarah Johnson",
    grade: "A+",
    certificateId: "CERT-2024-001"
  };

  const placeholders = [
    { key: "studentName", label: "Student's full name", example: "John Doe" },
    { key: "courseName", label: "Course title", example: "Full Stack Development" },
    { key: "completionDate", label: "Completion date", example: "March 15, 2024" },
    { key: "instructorName", label: "Instructor name", example: "Dr. Sarah Johnson" },
    { key: "grade", label: "Final grade", example: "A+" },
    { key: "certificateId", label: "Unique certificate ID", example: "CERT-2024-001" }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <Card className="border-0 bg-gradient-subtle shadow-elegant">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Certificate Generator</CardTitle>
                <CardDescription className="text-base">
                  Enterprise-grade certificate automation system
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="px-3 py-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                {templates.length} Templates
              </Badge>
              <Link to="/certificate-builder">
                  <Button>
                      <Palette className="h-4 w-4 mr-2" />
                      Create Template
                  </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Generated</p>
                <p className="text-3xl font-bold text-primary">2,847</p>
                <p className="text-sm text-success">+12% this month</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Successfully Delivered</p>
                <p className="text-3xl font-bold text-success">2,641</p>
                <p className="text-sm text-muted-foreground">92.8% success rate</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-3xl font-bold text-foreground">1,250</p>
                <p className="text-sm text-muted-foreground">Across 3 courses</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing Queue</p>
                <p className="text-3xl font-bold text-warning">24</p>
                <p className="text-sm text-muted-foreground">Pending generation</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Configuration Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Configuration</span>
              </CardTitle>
              <CardDescription>
                Set up your certificate generation parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template" className="text-sm font-semibold">Certificate Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="mt-2 h-12">
                      <SelectValue placeholder="Select a certificate template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3">
                              <div className={`h-2 w-2 rounded-full ${template.status === "active" ? "bg-success" : "bg-muted"}`} />
                              <span className="font-medium">{template.name}</span>
                            </div>
                            <div className="text-xs text-muted-foreground ml-4">
                              {template.students} students
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="data" className="text-sm font-semibold">Student Data Source</Label>
                  <div className="flex gap-3 mt-2">
                    <Input
                      id="data"
                      placeholder="Upload CSV file or connect to database"
                      value={studentData}
                      onChange={(e) => setStudentData(e.target.value)}
                      className="flex-1 h-12"
                    />
                    <Button variant="outline" size="lg" className="px-6">
                      <Upload className="h-4 w-4 mr-2" />
                      Browse
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: CSV, Excel, JSON. Maximum 10,000 records per batch.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="lg">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Template
                  </Button>
                  <Button variant="outline" size="lg">
                    <Settings className="h-4 w-4 mr-2" />
                    Template Settings
                  </Button>
                </div>
                <Button size="lg" disabled={!selectedTemplate} className="w-full sm:w-auto px-6">
                  <Play className="h-4 w-4 mr-2" />
                  Generate Certificates
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Preview */}
          {selectedTemplate && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Image className="h-5 w-5" />
                  <span>Certificate Preview</span>
                </CardTitle>
                <CardDescription>
                  Live preview with sample data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-xl p-8 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Award className="h-16 w-16 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold text-foreground">Certificate of Completion</h2>
                      <p className="text-muted-foreground">This is to certify that</p>
                      <p className="text-xl font-bold text-primary">{sampleCertificateData.studentName}</p>
                      <p className="text-muted-foreground">has successfully completed</p>
                      <p className="text-lg font-semibold text-foreground">{sampleCertificateData.courseName}</p>
                      <div className="flex justify-between items-center pt-6 text-sm text-muted-foreground">
                        <div>
                          <p>Date: {sampleCertificateData.completionDate}</p>
                          <p>Instructor: {sampleCertificateData.instructorName}</p>
                        </div>
                        <div>
                          <p>Grade: {sampleCertificateData.grade}</p>
                          <p>ID: {sampleCertificateData.certificateId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Side Panel for Placeholders */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Available Placeholders</span>
              </CardTitle>
              <CardDescription>
                Use these keys in your templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {placeholders.map((p) => (
                  <li key={p.key} className="text-sm">
                    <p className="font-mono bg-muted/80 px-2 py-1 rounded w-full">
                      {`{{${p.key}}}`}
                    </p>
                    <p className="text-muted-foreground mt-1">{p.label}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download Sample Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Download CSV Template</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function CertificateGenerator() {
  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-subtle shadow-elegant">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Certificate Suite</CardTitle>
                <CardDescription className="text-base">
                  Generate, manage, and verify certificates
                </CardDescription>
              </div>
            </div>
            <Link to="/certificate-builder">
                <Button>
                    <Palette className="h-4 w-4 mr-2" />
                    Create Template
                </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator">
            <Award className="h-4 w-4 mr-2" />
            Generator
          </TabsTrigger>
          <TabsTrigger value="verification">
            <QrCode className="h-4 w-4 mr-2" />
            Verification
          </TabsTrigger>
        </TabsList>
        <TabsContent value="generator" className="mt-6">
            <Generator />
        </TabsContent>
        <TabsContent value="verification" className="mt-6">
            <CertificateVerification />
        </TabsContent>
      </Tabs>
    </div>
  );
}
