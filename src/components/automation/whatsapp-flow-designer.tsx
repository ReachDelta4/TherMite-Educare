
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, FabricText, Line, Group } from "fabric";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Bot, MousePointer, Link, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface FlowNode {
  id: string;
  type: "text" | "ai-response" | "buttons" | "link";
  title: string;
  content: string;
  position: { x: number; y: number };
}

export function WhatsAppFlowDesigner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>("select");
  const [nodes, setNodes] = useState<FlowNode[]>([]);

  const tools = [
    { id: "select", name: "Select", icon: MousePointer, color: "bg-blue-500" },
    { id: "text", name: "Text Message", icon: MessageSquare, color: "bg-green-500" },
    { id: "ai-response", name: "AI Response", icon: Bot, color: "bg-purple-500" },
    { id: "buttons", name: "Button Template", icon: MousePointer, color: "bg-orange-500" },
    { id: "link", name: "Link Template", icon: Link, color: "bg-cyan-500" }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#f8f9fa",
    });

    setFabricCanvas(canvas);
    toast("Flow Designer ready! Click on tools to add WhatsApp elements.");

    // Add grid background
    addGridToCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  const addGridToCanvas = (canvas: FabricCanvas) => {
    const gridSpacing = 20;
    const canvasWidth = canvas.width || 800;
    const canvasHeight = canvas.height || 600;

    // Vertical lines
    for (let i = 0; i <= canvasWidth; i += gridSpacing) {
      const line = new Line([i, 0, i, canvasHeight], {
        stroke: '#e0e0e0',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }

    // Horizontal lines
    for (let i = 0; i <= canvasHeight; i += gridSpacing) {
      const line = new Line([0, i, canvasWidth, i], {
        stroke: '#e0e0e0',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }
  };

  const addFlowNode = (type: string) => {
    if (!fabricCanvas) return;

    const nodeConfigs = {
      text: {
        title: "Text Message",
        content: "Send a text message",
        color: "#10b981",
        icon: "💬"
      },
      "ai-response": {
        title: "AI Response",
        content: "AI generates response",
        color: "#8b5cf6",
        icon: "🤖"
      },
      buttons: {
        title: "Button Template",
        content: "Show interactive buttons",
        color: "#f59e0b",
        icon: "🔘"
      },
      link: {
        title: "Link Template",
        content: "Send a clickable link",
        color: "#06b6d4",
        icon: "🔗"
      }
    };

    const config = nodeConfigs[type as keyof typeof nodeConfigs];
    if (!config) return;

    // Create node background
    const nodeRect = new Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 80,
      fill: config.color,
      rx: 10,
      ry: 10,
      stroke: '#ffffff',
      strokeWidth: 2,
    });

    // Create node title
    const titleText = new FabricText(`${config.icon} ${config.title}`, {
      left: 110,
      top: 110,
      fontSize: 14,
      fill: '#ffffff',
      fontWeight: 'bold',
      selectable: false,
    });

    // Create node content
    const contentText = new FabricText(config.content, {
      left: 110,
      top: 130,
      fontSize: 12,
      fill: '#ffffff',
      selectable: false,
    });

    // Group the elements
    const group = new Group([nodeRect, titleText, contentText], {
      left: 100,
      top: 100,
      selectable: true,
    });

    fabricCanvas.add(group);
    fabricCanvas.renderAll();

    // Add to nodes state
    const newNode: FlowNode = {
      id: `${type}-${Date.now()}`,
      type: type as FlowNode['type'],
      title: config.title,
      content: config.content,
      position: { x: 100, y: 100 }
    };

    setNodes(prev => [...prev, newNode]);
    toast(`${config.title} added to flow!`);
  };

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    
    if (toolId !== "select") {
      addFlowNode(toolId);
      setSelectedTool("select"); // Reset to select after adding
    }
  };

  const clearCanvas = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    addGridToCanvas(fabricCanvas);
    setNodes([]);
    toast("Flow cleared!");
  };

  const saveFlow = () => {
    if (!fabricCanvas) return;
    const flowData = {
      nodes,
      canvas: fabricCanvas.toJSON()
    };
    console.log("Flow saved:", flowData);
    toast("Flow saved successfully!");
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">WhatsApp Flow Designer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
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
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearCanvas}>
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={saveFlow}>
              <Save className="h-4 w-4 mr-1" />
              Save Flow
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Canvas */}
      <Card>
        <CardContent className="p-4">
          <div className="border rounded-lg overflow-hidden">
            <canvas ref={canvasRef} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Node List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Flow Nodes ({nodes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {nodes.map((node) => (
              <div key={node.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {node.type}
                  </Badge>
                  <span className="text-sm">{node.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {node.position.x}, {node.position.y}
                </span>
              </div>
            ))}
            {nodes.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No nodes in flow. Click on tools above to add WhatsApp elements.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
