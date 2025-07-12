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
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


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
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  const [opacity, setOpacity] = useState(100);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

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

  const fonts = [
    "Arial", "Times New Roman", "Helvetica", "Georgia", "Verdana", 
    "Trebuchet MS", "Impact", "Comic Sans MS", "Courier New", "Palatino"
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
    
    saveCanvasState(canvas);

    const savedTemplates = localStorage.getItem("certificateTemplates");
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }

    canvas.on('object:added', () => saveCanvasState(canvas));
    canvas.on('object:removed', () => saveCanvasState(canvas));
    canvas.on('object:modified', () => saveCanvasState(canvas));

    toast("Certificate Builder ready! Start designing your template.");

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    const updateProperties = (target: fabric.Object | null) => {
        if (target) {
            setOpacity(target.get('opacity')! * 100);
            setStrokeColor(target.get('stroke') || '#000000');
            setStrokeWidth(target.get('strokeWidth') || 1);
            if (target instanceof FabricText) {
                setIsBold(target.get('fontWeight') === 'bold');
                setIsItalic(target.get('fontStyle') === 'italic');
                setIsUnderline(target.get('underline') || false);
            }
        }
    }

    const onSelectionCreated = (e: fabric.IEvent<MouseEvent>) => updateProperties(e.target || null);
    const onSelectionUpdated = (e: fabric.IEvent<MouseEvent>) => updateProperties(e.target || null);
    const onSelectionCleared = () => {
        setOpacity(100);
        setStrokeColor('#000000');
        setStrokeWidth(1);
        setIsBold(false);
        setIsItalic(false);
        setIsUnderline(false);
    };

    fabricCanvas.on('selection:created', onSelectionCreated);
    fabricCanvas.on('selection:updated', onSelectionUpdated);
    fabricCanvas.on('selection:cleared', onSelectionCleared);

    return () => {
        fabricCanvas.off('selection:created', onSelectionCreated);
        fabricCanvas.off('selection:updated', onSelectionUpdated);
        fabricCanvas.off('selection:cleared', onSelectionCleared);
    }
}, [fabricCanvas]);

  useEffect(() => {
    if (fabricCanvas) {
      // Clear previous grid lines
      fabricCanvas.getObjects().forEach(obj => {
        if (obj.name === 'gridline') {
          fabricCanvas.remove(obj);
        }
      });

      if (showGrid) {
        addGridToCanvas(fabricCanvas);
      }
      fabricCanvas.renderAll();
    }
  }, [showGrid, fabricCanvas]);

  const addGridToCanvas = (canvas: FabricCanvas) => {
    const gridSpacing = 20;
    const canvasWidth = canvas.width || 800;
    const canvasHeight = canvas.height || 600;

    const sendBack = (obj: any) => {
      if (typeof obj.sendToBack === 'function') {
        obj.sendToBack();
      } else if (typeof obj.moveTo === 'function') {
        obj.moveTo(0);
      }
    };

    for (let i = 0; i < canvasWidth / gridSpacing; i++) {
      const vLine = new Line([i * gridSpacing, 0, i * gridSpacing, canvasHeight], {
        stroke: '#f0f0f0',
        selectable: false,
        evented: false,
        name: 'gridline'
      });
      canvas.add(vLine);
      sendBack(vLine);
    }

    for (let i = 0; i < canvasHeight / gridSpacing; i++) {
      const hLine = new Line([0, i * gridSpacing, canvasWidth, i * gridSpacing], {
        stroke: '#f0f0f0',
        selectable: false,
        evented: false,
        name: 'gridline'
      });
      canvas.add(hLine);
      sendBack(hLine);
    }

    canvas.renderAll();
  };

  const saveCanvasState = (canvas: FabricCanvas) => {
    const state = JSON.stringify(canvas.toJSON(['name']));
    const newHistory = canvasHistory.slice(0, historyIndex + 1);
    newHistory.push(state);
    setCanvasHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const loadCanvasState = (state: string, canvas: FabricCanvas) => {
    canvas.loadFromJSON(state, () => {
      canvas.getObjects().forEach(obj => {
        if (obj.name === 'gridline') {
          obj.set({ selectable: false, evented: false });
        }
      });
      canvas.renderAll();
    });
  }

  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0];
    setOpacity(newOpacity);
    if (fabricCanvas && fabricCanvas.getActiveObject()) {
      fabricCanvas.getActiveObject().set('opacity', newOpacity / 100);
      fabricCanvas.renderAll();
    }
  };

  const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const color = e.target.value;
      setStrokeColor(color);
      if (fabricCanvas && fabricCanvas.getActiveObject()) {
        fabricCanvas.getActiveObject().set('stroke', color);
        fabricCanvas.renderAll();
      }
  };

  const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const width = parseInt(e.target.value, 10);
      setStrokeWidth(width);
      if (fabricCanvas && fabricCanvas.getActiveObject()) {
        fabricCanvas.getActiveObject().set('strokeWidth', width);
        fabricCanvas.renderAll();
      }
  };

  const handleFontStyleChange = (style: 'bold' | 'italic' | 'underline') => {
      if (fabricCanvas) {
          const activeObject = fabricCanvas.getActiveObject();
          if (activeObject instanceof FabricText) {
              switch(style) {
                  case 'bold':
                      activeObject.set('fontWeight', activeObject.get('fontWeight') === 'bold' ? 'normal' : 'bold');
                      setIsBold(activeObject.get('fontWeight') === 'bold');
                      break;
                  case 'italic':
                      activeObject.set('fontStyle', activeObject.get('fontStyle') === 'italic' ? 'normal' : 'italic');
                      setIsItalic(activeObject.get('fontStyle') === 'italic');
                      break;
                  case 'underline':
                      activeObject.set('underline', !activeObject.get('underline'));
                      setIsUnderline(activeObject.get('underline') || false);
                      break;
              }
              fabricCanvas.renderAll();
          }
      }
  };

  const undo = () => {
    if (historyIndex > 0 && fabricCanvas) {
      const prevIndex = historyIndex - 1;
      loadCanvasState(canvasHistory[prevIndex], fabricCanvas);
      setHistoryIndex(prevIndex);
    }
  };

  const redo = () => {
    if (historyIndex < canvasHistory.length - 1 && fabricCanvas) {
      const nextIndex = historyIndex + 1;
      loadCanvasState(canvasHistory[nextIndex], fabricCanvas);
      setHistoryIndex(nextIndex);
    }
  };

  const handleDeleteObject = () => {
    if (fabricCanvas && fabricCanvas.getActiveObject()) {
      fabricCanvas.remove(fabricCanvas.getActiveObject());
      fabricCanvas.renderAll();
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    const color = typeof e === 'string' ? e : e.target.value;
    setSelectedColor(color);
    if (fabricCanvas && fabricCanvas.getActiveObject()) {
      fabricCanvas.getActiveObject().set('fill', color);
      fabricCanvas.renderAll();
    }
  };

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    if (fabricCanvas) {
      const activeObject = fabricCanvas.getActiveObject();
      if (activeObject instanceof FabricText) {
        activeObject.set('fontFamily', font);
        fabricCanvas.renderAll();
      }
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement> | number) => {
    const size = typeof e === 'number' ? e : parseInt(e.target.value, 10);
    setFontSize(size);
    if (fabricCanvas) {
      const activeObject = fabricCanvas.getActiveObject();
      if (activeObject instanceof FabricText) {
        activeObject.set('fontSize', size);
        fabricCanvas.renderAll();
      }
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
        
      case "image":
        const imageInput = document.createElement('input');
        imageInput.type = 'file';
        imageInput.accept = 'image/*';
        imageInput.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (f) => {
              const data = f.target?.result;
              FabricImage.fromURL(data as string, (img) => {
                fabricCanvas.add(img);
              });
            };
            reader.readAsDataURL(file);
          }
        };
        imageInput.click();
        break;
    }
    fabricCanvas.renderAll();
  };

  const addDynamicField = (field: string) => {
    if (!fabricCanvas) return;
    const dynamicText = new FabricText(field, {
      left: 150,
      top: 150,
      fontSize: 24,
      fill: selectedColor,
      fontFamily: selectedFont
    });
    fabricCanvas.add(dynamicText);
    fabricCanvas.setActiveObject(dynamicText);
    fabricCanvas.renderAll();
  };

  const saveTemplate = () => {
    if (!fabricCanvas || !templateName) {
      toast.error("Please provide a template name.");
      return;
    }
    const canvasJSON = fabricCanvas.toJSON(['name']);
    const thumbnail = fabricCanvas.toDataURL({ format: 'png', quality: 0.5 });
    const newTemplate: CertificateTemplate = {
      id: new Date().toISOString(),
      name: templateName,
      canvas: canvasJSON,
      thumbnail: thumbnail,
      createdAt: new Date().toLocaleString(),
      placeholders: [], // TODO: Implement placeholder extraction from canvas
      category: 'User Defined'
    };
    const updatedTemplates = [...templates, newTemplate];
    setTemplates(updatedTemplates);
    localStorage.setItem("certificateTemplates", JSON.stringify(updatedTemplates));
    toast.success("Template saved successfully!");
    setSaveDialogOpen(false);
  };

  const loadTemplate = (template: CertificateTemplate) => {
    if (fabricCanvas) {
    fabricCanvas.loadFromJSON(template.canvas, () => {
      fabricCanvas.renderAll();
        toast.info(`Template "${template.name}" loaded.`);
    });
    }
  };

  const deleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    localStorage.setItem("certificateTemplates", JSON.stringify(updatedTemplates));
    toast.warning("Template deleted.");
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.getObjects().forEach(obj => {
        if (obj.name !== 'gridline') {
          fabricCanvas.remove(obj);
        }
      });
      // The history will be saved by the object:removed event
    fabricCanvas.renderAll();
      toast.info("Canvas cleared.");
    }
  };

  const exportTemplate = (isPreview = false) => {
    if (!fabricCanvas) return null;
    const dataURL = fabricCanvas.toDataURL({ format: 'png', quality: 1.0 });
    if (isPreview) {
      return dataURL;
    }
    const link = document.createElement('a');
    link.download = `${templateName || 'certificate'}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Certificate exported as PNG.");
  };

  return (
    <div className="relative flex w-full h-screen bg-muted">
      {/* Left Toolbar */}
      <aside 
        className="absolute top-0 left-0 h-full w-80 bg-white dark:bg-zinc-900 shadow-lg flex flex-col z-20 transition-transform duration-300 ease-in-out"
        style={{ transform: leftPanelVisible ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <div className="p-4 border-b">
            <h1 className="text-2xl font-bold">Certificate Studio</h1>
            <p className="text-sm text-muted-foreground">Design your perfect certificate</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="elements">
                <Sparkles className="h-4 w-4 mr-1" />
                Elements
              </TabsTrigger>
              <TabsTrigger value="templates">
                <Layers className="h-4 w-4 mr-1" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </TabsTrigger>
          </TabsList>

          <TabsContent value="elements" className="flex-1 overflow-y-auto p-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Elements</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {designElements.map(el => (
                    <Button key={el.id} variant="outline" className={`flex flex-col h-20 items-center justify-center space-y-1 ${selectedTool === el.id ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handleElementClick(el.id)}>
                      <el.icon className={`h-6 w-6 ${el.color}`} />
                      <span className="text-xs">{el.name}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dynamic Fields</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {dynamicFields.map(field => (
                    <Button key={field.key} variant="ghost" className="w-full justify-start" onClick={() => addDynamicField(field.key)}>
                      {field.label}
                      <Badge variant="secondary" className="ml-auto">{field.category}</Badge>
                    </Button>
                  ))}
                </CardContent>
              </Card>
          </TabsContent>

          <TabsContent value="templates" className="flex-1 overflow-y-auto p-4 space-y-4">
              <Button className="w-full" onClick={() => { setTemplateName("New Template"); setSaveDialogOpen(true); }}>
                <Save className="h-4 w-4 mr-2" />
                Save Current as Template
              </Button>
              {templates.map(t => (
                <Card key={t.id} className="cursor-pointer hover:shadow-md" onClick={() => loadTemplate(t)}>
                  <CardContent className="p-2">
                    <img src={t.thumbnail || '/placeholder.svg'} alt={t.name} className="w-full h-auto rounded-sm" />
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-semibold text-sm">{t.name}</p>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteTemplate(t.id); }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="settings" className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-grid">Show Grid</Label>
                <Switch id="show-grid" checked={showGrid} onCheckedChange={setShowGrid} />
              </div>
              <div className="space-y-2">
                <Label>Canvas Size (px)</Label>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Input type="number" defaultValue={800} className="w-full" disabled />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Canvas resizing is coming soon!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Input type="number" defaultValue={600} className="w-full" disabled />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Canvas resizing is coming soon!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={clearCanvas}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Canvas
              </Button>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t mt-auto">
            <Button className="w-full" onClick={() => exportTemplate(false)}>
              <Download className="h-4 w-4 mr-2" />
              Export as PNG
            </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className="relative flex-1 flex flex-col transition-all duration-300 ease-in-out"
        style={{ marginLeft: leftPanelVisible ? '320px' : '0', marginRight: rightPanelVisible ? '320px' : '0' }}
      >
        <Button 
          variant="outline" 
          size="icon"
          className="absolute top-1/2 -left-4 z-30 rounded-full bg-background shadow-md"
          onClick={() => setLeftPanelVisible(!leftPanelVisible)}
        >
          {leftPanelVisible ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        
        <main className="flex-1 flex flex-col p-4 overflow-hidden">
          {/* Top Action Bar */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4 bg-white dark:bg-zinc-900 p-2 rounded-lg shadow">
            <div className="flex items-center gap-2">
              <Button variant={selectedTool === 'select' ? 'secondary' : 'ghost'} size="icon" onClick={() => setSelectedTool('select')} title="Select Tool">
                <MousePointer className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={undo} disabled={historyIndex <= 0} title="Undo">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={redo} disabled={historyIndex >= canvasHistory.length - 1} title="Redo">
                <Redo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => {
                if(fabricCanvas?.getActiveObject()){
                  fabricCanvas.getActiveObject().clone((cloned: any) => {
                    cloned.set({
                      left: cloned.left + 10,
                      top: cloned.top + 10,
                    });
                    fabricCanvas.add(cloned);
                    fabricCanvas.setActiveObject(cloned);
                    fabricCanvas.renderAll();
                  });
                }
              }} title="Duplicate">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleDeleteObject} title="Delete">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <Label>Fill:</Label>
                <Input type="color" value={selectedColor} onChange={handleColorChange} className="w-10 h-10 p-1" />
              </div>
              <div className="flex items-center gap-2">
                <Label>Font:</Label>
                <Select value={selectedFont} onValueChange={handleFontChange}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label>Size:</Label>
                <Input type="number" value={fontSize} onChange={(e) => handleFontSizeChange(e)} className="w-20" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Certificate Preview</DialogTitle>
                  </DialogHeader>
                  <img src={exportTemplate(true) as string} alt="Certificate Preview" className="w-full h-auto rounded-md" />
                </DialogContent>
              </Dialog>

              <Button onClick={() => exportTemplate(false)}>
                <Zap className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center bg-white dark:bg-zinc-800 shadow-inner rounded-lg overflow-hidden relative">
            <canvas ref={canvasRef} />
            {!fabricCanvas && <p>Loading Canvas...</p>}
          </div>
        </main>

        <Button 
          variant="outline" 
          size="icon"
          className="absolute top-1/2 -right-4 z-30 rounded-full bg-background shadow-md"
          onClick={() => setRightPanelVisible(!rightPanelVisible)}
        >
          {rightPanelVisible ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>


      {/* Right Properties Panel */}
      <aside 
        className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-zinc-900 shadow-lg p-4 overflow-y-auto z-20 transition-transform duration-300 ease-in-out"
        style={{ transform: rightPanelVisible ? 'translateX(0)' : 'translateX(100%)' }}
      >
          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Fill Color</Label>
                <Input type="color" value={selectedColor} onChange={(e) => handleColorChange(e)} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label>Stroke Color</Label>
                <Input type="color" value={strokeColor} onChange={handleStrokeColorChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label>Stroke Width</Label>
                <Input type="number" value={strokeWidth} onChange={handleStrokeWidthChange} className="w-full" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Font Family</Label>
                 <Select value={selectedFont} onValueChange={handleFontChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label>Font Size</Label>
                <Input type="number" value={fontSize} onChange={(e) => handleFontSizeChange(e)} className="w-full" />
              </div>
              <div className="flex gap-2">
                <Button variant={isBold ? 'secondary' : 'outline'} size="sm" onClick={() => handleFontStyleChange('bold')}>Bold</Button>
                <Button variant={isItalic ? 'secondary' : 'outline'} size="sm" onClick={() => handleFontStyleChange('italic')}>Italic</Button>
                <Button variant={isUnderline ? 'secondary' : 'outline'} size="sm" onClick={() => handleFontStyleChange('underline')}>Underline</Button>
              </div>
              <Separator />
              <div className="space-y-2">
                 <Label>Opacity</Label>
                 <Slider value={[opacity]} onValueChange={handleOpacityChange} max={100} step={1} />
              </div>
            </CardContent>
          </Card>
      </aside>
      
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Enter template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <Button onClick={saveTemplate} className="w-full">Save</Button>
        </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
