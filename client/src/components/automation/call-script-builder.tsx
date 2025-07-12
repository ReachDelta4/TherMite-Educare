import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    PlusCircle,
    Save,
    Play,
    GitBranch,
    MessageSquare,
    PhoneCall,
    Share2,
    MousePointer,
    ChevronsRight,
    CircleHelp,
    AlertTriangle,
    CheckCircle
} from "lucide-react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Start Call' }, position: { x: 250, y: 5 }, sourcePosition: Position.Bottom },
];

const initialEdges: Edge[] = [];

let id = 2;
const getId = () => `${id++}`;

export function CallScriptBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [scriptName, setScriptName] = useState("New Call Script");

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onAddNode = (type: string) => {
    const newNode = {
      id: getId(),
      type: 'default',
      data: { label: `${type} Node` },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="flex h-full w-full">
      {/* Left Panel: Controls */}
      <div className="w-1/4 p-4 space-y-6 bg-background border-r">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Call Script Builder</h1>
          <p className="text-muted-foreground">
            Design your automated call flows visually
          </p>
        </div>

        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Script Properties</CardTitle>
            </CardHeader>
            <CardContent>
                <Input value={scriptName} onChange={(e) => setScriptName(e.target.value)} />
                <div className="flex gap-2 mt-4">
                    <Button size="sm"><Save className="h-4 w-4 mr-2"/>Save</Button>
                    <Button size="sm" variant="outline"><Play className="h-4 w-4 mr-2"/>Test</Button>
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Nodes</CardTitle>
            <CardDescription>Drag or click to add nodes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => onAddNode('Play Audio')}>
              <MessageSquare className="h-4 w-4 mr-2" /> Play Audio
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => onAddNode('Get Input')}>
              <MousePointer className="h-4 w-4 mr-2" /> Get Input
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => onAddNode('Condition')}>
              <GitBranch className="h-4 w-4 mr-2" /> Condition
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => onAddNode('Transfer Call')}>
              <Share2 className="h-4 w-4 mr-2" /> Transfer Call
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => onAddNode('End Call')}>
              <PhoneCall className="h-4 w-4 mr-2" /> End Call
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Center: Canvas */}
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>

      {/* Right Panel: Node Inspector */}
      <div className="w-1/4 p-4 space-y-4 bg-background border-l">
         <Card>
            <CardHeader>
                <CardTitle>Inspector</CardTitle>
                <CardDescription>Selected node properties</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Select a node to see its properties</p>
            </CardContent>
         </Card>
      </div>
    </div>
  );
} 