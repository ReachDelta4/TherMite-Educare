
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, FabricText, Line, FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Settings,
  Layers,
  Grid,
  Undo,
  Redo,
  Copy,
  Eye,
  Zap,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface CertificateTemplate {
  id: string;
  name: string;
  canvas: any;
  thumbnail: string;
  createdAt: string;
  placeholders: string[];
  category: string;
}

interface DesignElement {
  id: string;
  type: 'text' | 'shape' | 'image' | 'dynamic';
  name: string;
  icon: any;
  color: string;
}

export function CertificateBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>("select");
  const [templates, setTemplates] = useState<CertificateTemplate[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(20);
  const [activeTab, setActiveTab] = useState("elements");
  const [showGrid, setShowGrid] = useState(true);
  const [canvasHistory, setCanvasHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const designElements: DesignElement[] = [
    { id: "text", name: "Add Text", icon: Type, color: "bg-blue-500", type: "text" },
    { id: "heading", name: "Heading", icon: Type, color: "bg-blue-600", type: "text" },
    { id: "rectangle", name: "Rectangle", icon: Square, color: "bg-green-500", type: "shape" },
    { id: "circle", name: "Circle", icon: CircleIcon, color: "bg-purple-500", type: "shape" },
    { id: "image", name: "Image", icon: ImageIcon, color: "bg-orange-500", type: "image" },
  ];

  const dynamicFields = [
    { key: "{{studentName}}", label: "Student Name", example: "John Doe", category: "Personal" },
    { key: "{{courseName}}", label: "Course Name", example: "Web Development", category: "Course" },
    { key: "{{completionDate}}", label: "Completion Date", example: "March 15, 2024", category: "Course" },
    { key: "{{instructorName}}", label: "Instructor Name", example: "Dr. Sarah Johnson", category: "Personal" },
    { key: "{{grade}}", label: "Grade", example: "A+", category: "Academic" },
    { key: "{{certificateId}}", label: "Certificate ID", example: "CERT-2024-001", category: "System" }
  ];

  const prebuiltTemplates = [
    { name: "Modern Certificate", preview: "/api/placeholder/300/200", category: "Modern" },
    { name: "Classic Certificate", preview: "/api/placeholder/300/200", category: "Classic" },
    { name: "Minimalist Award", preview: "/api/placeholder/300/200", category: "Minimalist" },
    { name: "Elegant Diploma", preview: "/api/placeholder/300/200", category: "Elegant" }
  ];

  const fonts = [
    "Arial", "Times New Roman", "Helvetica", "Georgia", "Verdana", 
    "Trebuchet MS", "Impact", "Comic Sans MS", "Courier New", "Palatino"
  ];

  const colorPalettes = [
    { name: "Corporate", colors: ["#1e40af", "#dc2626", "#059669", "#d97706"] },
    { name: "Elegant", colors: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"] },
    { name: "Classic", colors: ["#374151", "#6b7280", "#9ca3af", "#d1d5db"] },
    { name: "Vibrant", colors: ["#ef4444", "#f97316", "#eab308", "#22c55e"] }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);
    if (showGrid) addGridToCanvas(canvas);
    
    // Save initial state
    saveCanvasState(canvas);

    // Load existing templates
    const savedTemplates = localStorage.getItem("certificateTemplates");
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }

    // Canvas event listeners
    canvas.on('object:added', () => saveCanvasState(canvas));
    canvas.on('object:removed', () => saveCanvasState(canvas));
    canvas.on('object:modified', () => saveCanvasState(canvas));

    toast("Certificate Builder ready! Start designing your template.");

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = "#ffffff";
      if (showGrid) addGridToCanvas(fabricCanvas);
      fabricCanvas.renderAll();
    }
  }, [showGrid]);

  const addGridToCanvas = (canvas: FabricCanvas) => {
    const gridSpacing = 20;
    const canvasWidth = canvas.width || 800;
    const canvasHeight = canvas.height || 600;

    for (let i = 0; i <= canvasWidth; i += gridSpacing) {
      const line = new Line([i, 0, i, canvasHeight], {
        stroke: '#f1f5f9',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }

    for (let i = 0; i <= canvasHeight; i += gridSpacing) {
      const line = new Line([0, i, canvasWidth, i], {
        stroke: '#f1f5f9',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }
  };

  const saveCanvasState = (canvas: FabricCanvas) => {
    const state = JSON.stringify(canvas.toJSON());
    const newHistory = canvasHistory.slice(0, historyIndex + 1);
    newHistory.push(state);
    setCanvasHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0 && fabricCanvas) {
      const prevIndex = historyIndex - 1;
      const prevState = canvasHistory[prevIndex];
      fabricCanvas.loadFromJSON(prevState, () => {
        fabricCanvas.renderAll();
        if (showGrid) addGridToCanvas(fabricCanvas);
      });
      setHistoryIndex(prevIndex);
    }
  };

  const redo = () => {
    if (historyIndex < canvasHistory.length - 1 && fabricCanvas) {
      const nextIndex = historyIndex + 1;
      const nextState = canvasHistory[nextIndex];
      fabricCanvas.loadFromJSON(nextState, () => {
        fabricCanvas.renderAll();
        if (showGrid) addGridToCanvas(fabricCanvas);
      });
      setHistoryIndex(nextIndex);
    }
  };

  const handleElementClick = (elementId: string) => {
    if (!fabricCanvas) return;

    setSelectedTool(elementId);
    
    switch (elementId) {
      case "text":
        const text = new FabricText("Sample Text", {
          left: 100,
          top: 100,
          fontSize: fontSize,
          fill: selectedColor,
          fontFamily: selectedFont
        });
        fabricCanvas.add(text);
        fabricCanvas.setActiveObject(text);
        break;
        
      case "heading":
        const heading = new FabricText("Certificate Title", {
          left: 100,
          top: 50,
          fontSize: fontSize + 10,
          fill: selectedColor,
          fontFamily: selectedFont,
          fontWeight: 'bold'
        });
        fabricCanvas.add(heading);
        fabricCanvas.setActiveObject(heading);
        break;
        
      case "rectangle":
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
        break;
        
      case "circle":
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
        break;
    }
    
    fabricCanvas.renderAll();
    setSelectedTool("select");
  };

  const addDynamicField = (field: string) => {
    if (!fabricCanvas) return;
    
    const text = new FabricText(field, {
      left: 100,
      top: 100,
      fontSize: fontSize,
      fill: '#2563eb',
      fontFamily: selectedFont,
      backgroundColor: '#dbeafe'
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
      placeholders: [...new Set(placeholders)],
      category: "Custom"
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
      if (showGrid) addGridToCanvas(fabricCanvas);
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
    if (showGrid) addGridToCanvas(fabricCanvas);
    fabricCanvas.renderAll();
    toast("Canvas cleared");
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
      <Card className="border-0 bg-gradient-subtle">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Certificate Builder</CardTitle>
                <p className="text-sm text-muted-foreground">Design beautiful certificates with ease</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= canvasHistory.length - 1}>
                <Redo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowGrid(!showGrid)}>
                <Grid className="h-4 w-4 mr-1" />
                {showGrid ? "Hide Grid" : "Show Grid"}
              </Button>
              <Button variant="outline" size="sm" onClick={exportTemplate}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
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
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="elements">Elements</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="elements" className="space-y-4">
              {/* Design Elements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Design Elements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {designElements.map((element) => (
                    <Button
                      key={element.id}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => handleElementClick(element.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${element.color} bg-opacity-20`}>
                          <element.icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{element.name}</span>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

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
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => addDynamicField(field.key)}
                    >
                      <div>
                        <div className="font-medium text-sm">{field.label}</div>
                        <div className="text-xs text-muted-foreground">{field.key}</div>
                        <div className="text-xs text-primary">Ex: {field.example}</div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Styling Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Styling</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Font Family</Label>
                    <Select value={selectedFont} onValueChange={setSelectedFont}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fonts.map(font => (
                          <SelectItem key={font} value={font}>{font}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Font Size</Label>
                    <Input
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      min="8"
                      max="72"
                    />
                  </div>
                  
                  <div>
                    <Label>Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-10 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Color Palettes */}
                  <div>
                    <Label>Color Palettes</Label>
                    <div className="space-y-2">
                      {colorPalettes.map(palette => (
                        <div key={palette.name} className="space-y-1">
                          <div className="text-xs font-medium">{palette.name}</div>
                          <div className="flex space-x-1">
                            {palette.colors.map(color => (
                              <button
                                key={color}
                                className="w-6 h-6 rounded border cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-4">
              {/* Prebuilt Templates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prebuilt Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {prebuiltTemplates.map((template, index) => (
                    <div key={index} className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{template.name}</div>
                          <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Saved Templates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">My Templates</CardTitle>
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
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-4">
          <Card>
            <CardContent className="p-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-border">
                <canvas ref={canvasRef} className="max-w-full shadow-lg" />
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <div>Certificate Canvas - 800x600px</div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={clearCanvas}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
