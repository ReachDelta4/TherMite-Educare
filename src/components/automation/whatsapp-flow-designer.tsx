import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, Circle, Rect, FabricText, Line, Group, Shadow } from "fabric";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Bot, 
  MousePointer, 
  Link, 
  Trash2, 
  Save, 
  Plus, 
  Settings,
  Play,
  Zap,
  ArrowRight,
  Edit,
  Copy,
  Eye,
  Download
} from "lucide-react";
import { toast } from "sonner";

interface FlowNode {
  id: string;
  type: "trigger" | "message" | "ai-response" | "condition" | "action" | "delay";
  title: string;
  description: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

interface Connection {
  from: string;
  to: string;
}

export function WhatsAppFlowDesigner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [nodes, setNodes] = useState<FlowNode[]>([
    {
      id: "trigger-1",
      type: "trigger",
      title: "WhatsApp Message Received",
      description: "Triggers when a new message is received",
      config: {},
      position: { x: 50, y: 100 },
      connections: []
    }
  ]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const nodeTypes = [
    { 
      id: "message", 
      name: "Send Message", 
      icon: MessageSquare, 
      color: "bg-blue-500",
      description: "Send a text message to the user"
    },
    { 
      id: "ai-response", 
      name: "AI Response", 
      icon: Bot, 
      color: "bg-purple-500",
      description: "Generate AI-powered response"
    },
    { 
      id: "condition", 
      name: "Condition", 
      icon: Zap, 
      color: "bg-yellow-500",
      description: "Create conditional logic paths"
    },
    { 
      id: "action", 
      name: "Action", 
      icon: Settings, 
      color: "bg-green-500",
      description: "Perform an action or webhook"
    },
    { 
      id: "delay", 
      name: "Delay", 
      icon: Play, 
      color: "bg-orange-500",
      description: "Add a time delay"
    }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 1200,
      height: 700,
      backgroundColor: "#f8fafc",
    });

    setFabricCanvas(canvas);
    renderFlow(canvas);

    canvas.on('mouse:down', (options) => {
      if (options.target && (options.target as any).nodeId) {
        const nodeId = (options.target as any).nodeId;
        const node = nodes.find(n => n.id === nodeId);
        if (node) {
          setSelectedNode(node);
        }
      }
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (fabricCanvas) {
      renderFlow(fabricCanvas);
    }
  }, [nodes, connections]);

  const renderFlow = (canvas: FabricCanvas) => {
    canvas.clear();
    
    // Add subtle grid background
    addGridBackground(canvas);
    
    // Render connections first (so they appear behind nodes)
    connections.forEach(connection => {
      const fromNode = nodes.find(n => n.id === connection.from);
      const toNode = nodes.find(n => n.id === connection.to);
      
      if (fromNode && toNode) {
        renderConnection(canvas, fromNode, toNode);
      }
    });
    
    // Render nodes
    nodes.forEach(node => {
      renderNode(canvas, node);
    });
    
    canvas.renderAll();
  };

  const addGridBackground = (canvas: FabricCanvas) => {
    const gridSize = 25;
    const canvasWidth = canvas.width || 1200;
    const canvasHeight = canvas.height || 700;

    for (let i = 0; i <= canvasWidth; i += gridSize) {
      const line = new Line([i, 0, i, canvasHeight], {
        stroke: '#e2e8f0',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }

    for (let i = 0; i <= canvasHeight; i += gridSize) {
      const line = new Line([0, i, canvasWidth, i], {
        stroke: '#e2e8f0',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }
  };

  const renderNode = (canvas: FabricCanvas, node: FlowNode) => {
    const nodeType = nodeTypes.find(t => t.id === node.type) || nodeTypes[0];
    const isSelected = selectedNode?.id === node.id;
    
    // Node background
    const nodeRect = new Rect({
      left: node.position.x,
      top: node.position.y,
      width: 280,
      height: 100,
      fill: '#ffffff',
      stroke: isSelected ? '#3b82f6' : '#e2e8f0',
      strokeWidth: isSelected ? 2 : 1,
      rx: 12,
      ry: 12
    });

    // Icon background
    const iconBg = new Circle({
      left: node.position.x + 20,
      top: node.position.y + 20,
      radius: 16,
      fill: nodeType.color.replace('bg-', '').replace('-500', '') === 'blue' ? '#3b82f6' :
            nodeType.color.replace('bg-', '').replace('-500', '') === 'purple' ? '#8b5cf6' :
            nodeType.color.replace('bg-', '').replace('-500', '') === 'yellow' ? '#eab308' :
            nodeType.color.replace('bg-', '').replace('-500', '') === 'green' ? '#10b981' : '#f97316',
    });

    // Node title
    const titleText = new FabricText(node.title, {
      left: node.position.x + 60,
      top: node.position.y + 20,
      fontSize: 14,
      fill: '#1e293b',
      fontWeight: '600',
      fontFamily: 'Inter, system-ui, sans-serif'
    });

    // Node description
    const descText = new FabricText(node.description, {
      left: node.position.x + 60,
      top: node.position.y + 40,
      fontSize: 12,
      fill: '#64748b',
      fontFamily: 'Inter, system-ui, sans-serif'
    });

    // Add connection point
    const connectionPoint = new Circle({
      left: node.position.x + 270,
      top: node.position.y + 45,
      radius: 6,
      fill: '#e2e8f0',
      stroke: '#94a3b8',
      strokeWidth: 2,
    });

    const group = new Group([nodeRect, iconBg, titleText, descText, connectionPoint], {
      left: node.position.x,
      top: node.position.y,
      selectable: true,
      hasControls: false,
      hasBorders: false,
    });

    (group as any).nodeId = node.id;

    canvas.add(group);
  };

  const renderConnection = (canvas: FabricCanvas, fromNode: FlowNode, toNode: FlowNode) => {
    const startX = fromNode.position.x + 280;
    const startY = fromNode.position.y + 50;
    const endX = toNode.position.x;
    const endY = toNode.position.y + 50;

    // Create curved connection line
    const controlX1 = startX + 50;
    const controlY1 = startY;
    const controlX2 = endX - 50;
    const controlY2 = endY;

    const path = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
    
    const connectionLine = new (FabricCanvas as any).Path(path, {
      stroke: '#94a3b8',
      strokeWidth: 2,
      fill: '',
      selectable: false,
      evented: false,
    });

    canvas.add(connectionLine);

    // Add arrow head
    const arrowHead = new (FabricCanvas as any).Polygon([
      {x: 0, y: 0},
      {x: -10, y: -5},
      {x: -10, y: 5}
    ], {
      left: endX - 5,
      top: endY,
      fill: '#94a3b8',
      selectable: false,
      evented: false,
    });

    canvas.add(arrowHead);
  };

  const addNode = (type: string) => {
    const nodeType = nodeTypes.find(t => t.id === type);
    if (!nodeType) return;

    const newNode: FlowNode = {
      id: `${type}-${Date.now()}`,
      type: type as FlowNode['type'],
      title: nodeType.name,
      description: nodeType.description,
      config: {},
      position: { 
        x: 100 + nodes.length * 50, 
        y: 150 + (nodes.length % 3) * 120 
      },
      connections: []
    };

    setNodes(prev => [...prev, newNode]);
    toast(`${nodeType.name} added to flow`);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
    toast("Node deleted");
  };

  const connectNodes = (fromId: string, toId: string) => {
    const newConnection: Connection = { from: fromId, to: toId };
    setConnections(prev => [...prev, newConnection]);
    toast("Nodes connected");
  };

  const saveFlow = () => {
    const flowData = { nodes, connections };
    localStorage.setItem('whatsapp-flow', JSON.stringify(flowData));
    toast("Flow saved successfully!");
  };

  const loadFlow = () => {
    const saved = localStorage.getItem('whatsapp-flow');
    if (saved) {
      const flowData = JSON.parse(saved);
      setNodes(flowData.nodes || []);
      setConnections(flowData.connections || []);
      toast("Flow loaded successfully!");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="border-0 bg-gradient-subtle">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">WhatsApp Flow Designer</CardTitle>
                <p className="text-sm text-muted-foreground">Build intelligent conversation flows</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="px-3 py-1">
                {nodes.length} Nodes
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                {connections.length} Connections
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* main content and dialogs */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {nodeTypes.map((nodeType) => (
                <Button
                  key={nodeType.id}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => addNode(nodeType.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${nodeType.color} bg-opacity-20`}>
                      <nodeType.icon className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{nodeType.name}</div>
                      <div className="text-xs text-muted-foreground">{nodeType.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full" onClick={saveFlow}>
                <Save className="h-4 w-4 mr-2" />
                Save Flow
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={loadFlow}>
                <Download className="h-4 w-4 mr-2" />
                Load Flow
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Test Flow
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card>
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border-2 border-dashed border-border">
                <canvas ref={canvasRef} className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure Step</DialogTitle>
          </DialogHeader>
          {selectedNode && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedNode.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedNode.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Step Name</Label>
                  <Input 
                    value={selectedNode.title} 
                    onChange={(e) => {
                      setSelectedNode(prev => prev ? {...prev, title: e.target.value} : null);
                    }}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    value={selectedNode.description}
                    onChange={(e) => {
                      setSelectedNode(prev => prev ? {...prev, description: e.target.value} : null);
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    deleteNode(selectedNode.id);
                    setIsConfigOpen(false);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Step
                </Button>
                <Button onClick={() => setIsConfigOpen(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
