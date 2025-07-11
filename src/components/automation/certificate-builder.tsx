import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, FabricText, Line, FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Type, 
  Square, 
  Circle as CircleIcon, 
  Image as ImageIcon, 
  Save, 
  Trash2, 
  MousePointer, 
  Palette,
  Upload,
  Download,
  Settings
} from "lucide-react";
import { toast } from "sonner";

interface CertificateTemplate {
  id: string;
  name: string;
  canvas: any;
  thumbnail: string;
  createdAt: string;
  placeholders: string[];
}

export function CertificateBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>("select");
  const [templates, setTemplates] = useState<CertificateTemplate[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const tools = [
    { id: "select", name: "Select", icon: MousePointer, color: "bg-blue-500" },
    { id: "text", name: "Text", icon: Type, color: "bg-green-500" },
    { id: "rectangle", name: "Rectangle", icon: Square, color: "bg-orange-500" },
    { id: "circle", name: "Circle", icon: CircleIcon, color: "bg-purple-500" },
    { id: "image", name: "Image", icon: ImageIcon, color: "bg-cyan-500" }
  ];

  const dynamicFields = [
    { key: "{{studentName}}", label: "Student Name", example: "John Doe" },
    { key: "{{courseName}}", label: "Course Name", example: "Web Development" },
    { key: "{{completionDate}}", label: "Completion Date", example: "March 15, 2024" },
    { key: "{{instructorName}}", label: "Instructor Name", example: "Dr. Sarah Johnson" },
    { key: "{{grade}}", label: "Grade", example: "A+" },
    { key: "{{certificateId}}", label: "Certificate ID", example: "CERT-2024-001" }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);
    addGridToCanvas(canvas);
    toast("Certificate Builder ready! Start designing your template.");

    // Load existing templates from localStorage
    const savedTemplates = localStorage.getItem("certificateTemplates");
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }

    return () => {
      canvas.dispose();
    };
  }, []);

  const addGridToCanvas = (canvas: FabricCanvas) => {
    const gridSpacing = 20;
    const canvasWidth = canvas.width || 800;
    const canvasHeight = canvas.height || 600;

    // Add subtle grid lines
    for (let i = 0; i <= canvasWidth; i += gridSpacing) {
      const line = new Line([i, 0, i, canvasHeight], {
        stroke: '#f0f0f0',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }

    for (let i = 0; i <= canvasHeight; i += gridSpacing) {
      const line = new Line([0, i, canvasWidth, i], {
        stroke: '#f0f0f0',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }
  };

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    
    if (!fabricCanvas) return;

    if (toolId === "text") {
      const text = new FabricText("Sample Text", {
        left: 100,
        top: 100,
        fontSize: 20,
        fill: selectedColor,
        fontFamily: 'Arial'
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
    } else if (toolId === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        width: 200,
        height: 100,
        fill: selectedColor,
        stroke: '#000',
        strokeWidth: 2
      });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (toolId === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        radius: 50,
        fill: selectedColor,
        stroke: '#000',
        strokeWidth: 2
      });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    }
    
    fabricCanvas.renderAll();
    setSelectedTool("select");
  };

  const addDynamicField = (field: string) => {
    if (!fabricCanvas) return;
    
    const text = new FabricText(field, {
      left: 100,
      top: 100,
      fontSize: 18,
      fill: '#2563eb',
      fontFamily: 'Arial',
      backgroundColor: '#f0f8ff'
    });
    
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();
    toast(`Added ${field} to canvas`);
  };

  const saveTemplate = () => {
    if (!fabricCanvas || !templateName.trim()) {
      toast("Please enter a template name");
      return;
    }

    const canvasData = fabricCanvas.toJSON();
    const thumbnail = fabricCanvas.toDataURL({
      format: 'png',
      quality: 0.8,
      multiplier: 0.2
    });

    // Extract placeholders from canvas objects
    const placeholders: string[] = [];
    fabricCanvas.getObjects().forEach((obj: any) => {
      if (obj.type === 'text' && obj.text && obj.text.includes('{{')) {
        const matches = obj.text.match(/\{\{([^}]+)\}\}/g);
        if (matches) {
          placeholders.push(...matches);
        }
      }
    });

    const newTemplate: CertificateTemplate = {
      id: Date.now().toString(),
      name: templateName,
      canvas: canvasData,
      thumbnail,
      createdAt: new Date().toISOString(),
      placeholders: [...new Set(placeholders)]
    };

    const updatedTemplates = [...templates, newTemplate];
    setTemplates(updatedTemplates);
    localStorage.setItem("certificateTemplates", JSON.stringify(updatedTemplates));
    
    setTemplateName("");
    setSaveDialogOpen(false);
    toast("Template saved successfully!");
  };

  const loadTemplate = (template: CertificateTemplate) => {
    if (!fabricCanvas) return;
    
    fabricCanvas.clear();
    fabricCanvas.loadFromJSON(template.canvas, () => {
      fabricCanvas.renderAll();
      addGridToCanvas(fabricCanvas);
      toast(`Template "${template.name}" loaded`);
    });
  };

  const deleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    localStorage.setItem("certificateTemplates", JSON.stringify(updatedTemplates));
    toast("Template deleted");
  };

  const clearCanvas = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    addGridToCanvas(fabricCanvas);
    fabricCanvas.renderAll();
    toast("Canvas cleared");
  };

  const deleteSelected = () => {
    if (!fabricCanvas) return;
    const activeObjects = fabricCanvas.getActiveObjects();
    if (activeObjects.length > 0) {
      fabricCanvas.remove(...activeObjects);
      fabricCanvas.discardActiveObject();
      fabricCanvas.renderAll();
      toast("Selected objects deleted");
    }
  };

  const exportTemplate = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1.0,
      multiplier: 1.0
    });
    
    const link = document.createElement('a');
    link.download = `certificate-template-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    toast("Template exported");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Certificate Builder</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant={selectedTool === tool.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleToolClick(tool.id)}
                className="flex items-center gap-2"
              >
                <tool.icon className="h-4 w-4" />
                {tool.name}
              </Button>
            ))}
            <Separator orientation="vertical" className="h-8" />
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-8 h-8 rounded border cursor-pointer"
              title="Select color"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-4">
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Save Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Certificate Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="templateName">Template Name</Label>
                    <Input
                      id="templateName"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      placeholder="Enter template name"
                    />
                  </div>
                  <Button onClick={saveTemplate} className="w-full">
                    Save Template
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="sm" onClick={clearCanvas}>
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
            
            <Button variant="outline" size="sm" onClick={deleteSelected}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Selected
            </Button>
            
            <Button variant="outline" size="sm" onClick={exportTemplate}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Canvas */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="border-2 border-dashed border-border rounded-lg overflow-hidden bg-white">
                <canvas ref={canvasRef} className="max-w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Dynamic Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dynamic Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {dynamicFields.map((field) => (
                <Button
                  key={field.key}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => addDynamicField(field.key)}
                >
                  <div>
                    <div className="font-medium">{field.label}</div>
                    <div className="text-xs text-muted-foreground">{field.key}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Template Manager */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Template Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {templates.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No templates saved yet
                  </p>
                ) : (
                  templates.map((template) => (
                    <div key={template.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTemplate(template.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {template.thumbnail && (
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-20 object-cover rounded mb-2 cursor-pointer"
                          onClick={() => loadTemplate(template)}
                        />
                      )}
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {template.placeholders.map((placeholder, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {placeholder}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => loadTemplate(template)}
                      >
                        Load Template
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
