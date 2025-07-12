import { useState, useCallback, Fragment, useEffect, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Connection,
  Edge,
  Node,
  Handle,
  Position,
  getSmoothStepPath,
  EdgeProps,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  MessageSquare, 
  Bot, 
  Trash2, 
  Save, 
  Play,
  Zap,
  Eye,
    GitBranch,
    MousePointer2,
    Clock,
    List,
    Workflow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// --- NEW, ROBUST VISUAL FLOW FORM BUILDER ---

interface FlowComponent {
  id: string;
  type: 'TextHeading' | 'TextBody' | 'Footer' | 'TextInput';
  text?: string;
  label?: string;
  name?: string; // For TextInput
}

interface FlowScreen {
  id:string;
  title: string;
  layout: {
    type: 'SingleColumnLayout';
    children: FlowComponent[];
  };
}

const FORM_COMPONENTS_CONFIG = {
  'TextHeading': { name: 'Heading', icon: () => <strong>H1</strong>, defaultProps: { text: 'New Heading' } },
  'TextBody': { name: 'Body Text', icon: () => <p>Abc</p>, defaultProps: { text: 'Some body text.' } },
  'TextInput': { name: 'Text Input', icon: () => <Input className="h-8" readOnly />, defaultProps: { label: 'Input Label', name: 'input_name' } },
  'Footer': { name: 'Footer Button', icon: () => <Button size="sm" variant="outline">Btn</Button>, defaultProps: { label: 'Complete' } },
};

const FlowFormBuilder = ({ initialJson, onSave, onClose }: { initialJson: string, onSave: (newJson: string) => void, onClose: () => void }) => {
    const [screens, setScreens] = useState<FlowScreen[]>([]);
    const [activeScreenId, setActiveScreenId] = useState<string | null>(null);
    const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  useEffect(() => {
        try {
            const flow = JSON.parse(initialJson);
            if (flow && Array.isArray(flow.screens)) {
                setScreens(flow.screens);
                if (flow.screens.length > 0 && !activeScreenId) {
                    setActiveScreenId(flow.screens[0].id);
                }
            } else {
                 throw new Error("Invalid flow structure");
            }
        } catch (e) {
            toast.error("Invalid Flow JSON. Starting fresh.");
            const freshScreen = { id: `screen-${Date.now()}`, title: "Welcome Screen", layout: { type: 'SingleColumnLayout', children: [] } };
            setScreens([freshScreen]);
            setActiveScreenId(freshScreen.id);
        }
    }, [initialJson]);
    
    const activeScreen = screens.find(s => s.id === activeScreenId);
    const selectedComponent = activeScreen?.layout.children.find(c => c.id === selectedComponentId);

    const handleSave = () => {
        const flowToSave = { version: "3.1", screens: screens };
        onSave(JSON.stringify(flowToSave, null, 2));
    };
    
    const addComponent = (type: FlowComponent['type']) => {
        if (!activeScreen) return;
        const config = FORM_COMPONENTS_CONFIG[type];
        const newComponent: FlowComponent = { id: `${type.toLowerCase()}-${Date.now()}`, type, ...config.defaultProps };
        const updatedScreens = screens.map(s => {
            if (s.id === activeScreenId) {
                return { ...s, layout: { ...s.layout, children: [...s.layout.children, newComponent] } };
            }
            return s;
        });
        setScreens(updatedScreens);
    };

    const updateComponent = (componentId: string, newProps: Partial<FlowComponent>) => {
        if (!activeScreen) return;
        setScreens(screens.map(s => 
            s.id === activeScreenId ? {
                ...s,
                layout: {
                    ...s.layout,
                    children: s.layout.children.map(c => 
                        c.id === componentId ? { ...c, ...newProps } : c
                    ),
                },
            } : s
        ));
    };

    const deleteComponent = (componentId: string) => {
        if (!activeScreen) return;
        setScreens(screens.map(s => 
            s.id === activeScreenId ? {
                ...s,
                layout: { ...s.layout, children: s.layout.children.filter(c => c.id !== componentId) }
            } : s
        ));
        setSelectedComponentId(null);
    };

    const ScreenManager = () => (
        <div className="w-64 border-r p-4 space-y-2 bg-white flex flex-col">
            <h3 className="font-semibold text-lg">Screens</h3>
            <ScrollArea className="flex-grow">
                {screens.map(screen => (
                    <div key={screen.id} onClick={() => setActiveScreenId(screen.id)}
                        className={cn('p-2 rounded cursor-pointer text-sm', activeScreenId === screen.id ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100')}>
                        {screen.title || 'Untitled'}
                    </div>
                ))}
            </ScrollArea>
        </div>
    );

    const VisualCanvas = () => (
        <div className="flex-1 p-8 bg-gray-100 flex justify-center items-center">
            {activeScreen && (
                 <div className="w-[340px] h-[600px] bg-white rounded-2xl shadow-lg mx-auto p-4 border flex flex-col">
                    <h2 className="text-center font-bold pb-2">{activeScreen.title}</h2>
                    <ScrollArea className="flex-grow p-2 border-dashed border-2 rounded-lg">
                        {activeScreen.layout.children.length === 0 && <p className="text-center text-gray-400">Add elements from the right panel.</p>}
                        {activeScreen.layout.children.map(comp => {
                            const isSelected = selectedComponentId === comp.id;
                            return (
                                <div key={comp.id} onClick={() => setSelectedComponentId(comp.id)} className={cn("p-2 border rounded cursor-pointer my-2", isSelected ? 'border-blue-500 border-2 shadow-lg' : 'hover:bg-gray-50')}>
                                    {comp.type === 'TextHeading' && <h2 className="text-xl font-bold">{comp.text}</h2>}
                                    {comp.type === 'TextBody' && <p>{comp.text}</p>}
                                    {comp.type === 'TextInput' && <div><Label>{comp.label}</Label><Input readOnly placeholder="User input goes here" /></div>}
                                    {comp.type === 'Footer' && <Button className="w-full" disabled>{comp.label}</Button>}
                                </div>
                            )
                        })}
                    </ScrollArea>
                </div>
            )}
        </div>
    );

    const PropertiesPanel = () => (
        <div className="w-72 border-l p-4 space-y-4 bg-white">
            <h3 className="font-semibold text-lg">Add Elements</h3>
            <div className="grid grid-cols-2 gap-2">
                {Object.entries(FORM_COMPONENTS_CONFIG).map(([type, { name, icon }]) => (
                     <div key={type} onClick={() => addComponent(type as any)} className="p-2 border rounded hover:bg-gray-100 cursor-pointer flex flex-col items-center justify-center text-center h-20">
                        <div className="h-8 w-8 flex items-center justify-center">{icon()}</div>
                        <p className="text-xs mt-1">{name}</p>
                    </div>
                ))}
            </div>
            <Separator/>
            <h3 className="font-semibold text-lg">Properties</h3>
            {selectedComponent ? (
                <div className="space-y-4">
                    <p className="font-semibold text-sm text-gray-600 border-b pb-2">{FORM_COMPONENTS_CONFIG[selectedComponent.type].name}</p>
                    {Object.keys(selectedComponent).filter(k => k !== 'id' && k !== 'type').map(key => (
                        <div key={key}>
                            <Label className="capitalize text-xs">{key.replace('_', ' ')}</Label>
                            <Textarea value={(selectedComponent as any)[key]} onChange={e => updateComponent(selectedComponent.id, { [key]: e.target.value })} className="text-sm" />
                        </div>
                    ))}
                    <Button variant="destructive" size="sm" className="w-full !mt-6" onClick={() => deleteComponent(selectedComponent.id)}>Delete Element</Button>
                </div>
            ) : <p className="text-sm text-gray-500">Select an element to configure it.</p>}
        </div>
    );
    
    return (
        <div className="flex flex-col h-full w-full bg-gray-50 text-gray-900">
            <div className="flex flex-grow min-h-0">
                <ScreenManager />
                <VisualCanvas />
                <PropertiesPanel />
            </div>
            <div className="p-4 border-t bg-white shadow-inner flex justify-end gap-2">
                 <Button variant="outline" onClick={onClose}>Cancel</Button>
                 <Button onClick={handleSave}>Save and Close</Button>
            </div>
        </div>
    );
};


// --- REACT FLOW SETUP & CUSTOM NODES ---

function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    selected,
}: EdgeProps) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const onEdgeDelete = (evt: React.MouseEvent) => {
        evt.stopPropagation();
        setEdges((eds) => eds.filter((edge) => edge.id !== id));
        toast.info("Connection deleted.");
    };

    return (
        <>
            {/* Invisible path for easier selection. Increased stroke width. */}
            <path
                id={`${id}-interaction`}
                d={edgePath}
                className="react-flow__edge-path"
                style={{ stroke: 'transparent', strokeWidth: 30 }}
            />
            {/* Visible path. */}
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            {selected && (
                <foreignObject
                    width={32}
                    height={32}
                    x={labelX - 16}
                    y={labelY - 16}
                    className="cursor-pointer"
                    // Ensures the icon is clickable
                    style={{ pointerEvents: 'all' }}
                >
                    <div 
                        className="bg-white border-2 border-gray-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-100"
                        onClick={onEdgeDelete}
                    >
                        <Trash2 className="h-5 w-5 text-red-500" />
                    </div>
                </foreignObject>
            )}
        </>
    );
}

const triggerNodeComponent = (props: any) => <CustomNode {...props} type="trigger" />;
const messageNodeComponent = (props: any) => <CustomNode {...props} type="message" />;
const interactiveListNodeComponent = (props: any) => <CustomNode {...props} type="interactiveList" />;
const interactiveFlowNodeComponent = (props: any) => <CustomNode {...props} type="interactiveFlow" />;
const aiResponseNodeComponent = (props: any) => <CustomNode {...props} type="ai-response" />;
const conditionNodeComponent = (props: any) => <CustomNode {...props} type="condition" />;
const delayNodeComponent = (props: any) => <CustomNode {...props} type="delay" />;
const actionNodeComponent = (props: any) => <CustomNode {...props} type="action" />;


const initialNodes: Node[] = [
  { id: '1', type: 'trigger', position: { x: 50, y: 150 }, data: { label: 'Campaign Start' } },
  { id: '2', type: 'message', position: { x: 350, y: 50 }, data: { label: 'Welcome Message', text: 'Hello! Welcome to our service.' } },
  { id: '3', type: 'interactiveList', position: { x: 350, y: 200 }, data: { label: 'Show Options', buttonText: 'Choose', sections: [{id: `section-${Date.now()}`, title: 'Services', rows: [{id: 's1', title: 'Buy Product'}, {id: 's2', title: 'View Docs'}] }] }},
  { id: '4', type: 'interactiveFlow', position: { x: 350, y: 350 }, data: { label: 'Collect Feedback', flowId: 'feedback_flow_v1', flow_json: '{"version":"3.1","screens":[{"id":"WELCOME_SCREEN","layout":{"type":"SingleColumnLayout","children":[{"type":"TextHeading","text":"Hello World"}]}}]}' } },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, type: 'smoothstep' },
    { id: 'e1-3', source: '1', target: '3', animated: true, type: 'smoothstep' },
    { id: 'e1-4', source: '1', target: '4', animated: true, type: 'smoothstep' },
];

const nodeConfig = [
  { id: "trigger", name: "Trigger", icon: Play, color: "text-green-500", defaultData: { label: 'Trigger' } },
  { id: "message", name: "Send Message", icon: MessageSquare, color: "text-blue-500", defaultData: { label: 'Send Message', text: 'Your message here...' } },
  { id: "interactiveList", name: "List Message", icon: List, color: "text-green-500", defaultData: { label: 'List Message', buttonText: 'Options', sections: [{id: `section-${Date.now()}`, title: 'Section 1', rows: [{id: `row-${Date.now()}`, title: 'Option 1'}]}] }},
  { id: "interactiveFlow", name: "Interactive Flow", icon: Workflow, color: "text-teal-500", defaultData: { label: 'Interactive Flow', flowId: 'YOUR_FLOW_ID_HERE', flow_json: '{\n  "version": "3.1",\n  "screens": [\n    {\n      "id": "WELCOME_SCREEN",\n      "layout": {\n        "type": "SingleColumnLayout",\n        "children": [\n          {\n            "type": "TextHeading",\n            "text": "Hello World"\n          }\n        ]\n      }\n    }\n  ]\n}' }},
  { id: "ai-response", name: "AI Response", icon: Bot, color: "text-purple-500", defaultData: { label: 'AI Response', prompt: 'Analyze user response...' } },
  { id: "condition", name: "Condition", icon: GitBranch, color: "text-yellow-500", defaultData: { label: 'Condition', variable: 'user.tag', operator: 'equals', value: 'lead' } },
  { id: "delay", name: "Delay", icon: Clock, color: "text-indigo-500", defaultData: { label: 'Delay', duration: '1', unit: 'hour' } },
  { id: "action", name: "Action", icon: Zap, color: "text-orange-500", defaultData: { label: 'Action', webhookUrl: 'https://example.com/hook' } },
];

const CustomNode = ({ data, type }: { data: any, type: string }) => {
    const config = nodeConfig.find(n => n.id === type);
    if (!config) return null;

    const handleStyle = {
        width: 14,
        height: 14,
    };

    return (
        <div className="p-3 border-2 border-stone-400 rounded-lg bg-white shadow-md w-60 relative">
            <Handle type="target" position={Position.Left} className="!bg-teal-500" style={handleStyle} />
            <div className="flex items-center gap-2 mb-2">
                <config.icon className={cn("h-5 w-5", config.color)} />
                <strong className="text-sm">{data.label}</strong>
            </div>
            <div className="text-xs text-gray-500 pr-6">
                {type === 'message' && <p>Text: {data.text?.substring(0, 30)}...</p>}
                {type === 'interactiveList' && <p>Button: {data.buttonText}</p>}
                {type === 'interactiveFlow' && <p>Flow ID: {data.flowId}</p>}
                {type === 'condition' && <p className="font-mono bg-gray-100 p-1 rounded mt-1 text-center">{`${data.variable || ''} ${data.operator || ''} ${data.value || ''}`.trim()}</p>}
            </div>

            {type === 'condition' ? (
                <>
                    <div className="absolute text-xs text-gray-500 font-medium" style={{ top: '33%', right: -28, transform: 'translateY(-50%)' }}>
                        Then
                    </div>
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="then"
                        style={{ ...handleStyle, top: '33%' }}
                        className="!bg-green-500"
                    />

                    <div className="absolute text-xs text-gray-500 font-medium" style={{ top: '66%', right: -24, transform: 'translateY(-50%)' }}>
                        Else
                    </div>
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="else"
                        style={{ ...handleStyle, top: '66%' }}
                        className="!bg-red-500"
                    />
                </>
            ) : (
                <Handle type="source" position={Position.Right} className="!bg-teal-500" style={handleStyle} />
            )}
        </div>
    );
};


// --- HELPER COMPONENTS ---

const Header = ({ onSave, onPublish }: { onSave: () => void; onPublish: () => void; }) => (
    <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10 select-none">
        <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">WhatsApp Campaign Builder</h1>
            <Badge variant="outline">Draft</Badge>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onSave}><Save className="h-4 w-4 mr-2" />Save Draft</Button>
            <Button size="sm" onClick={onPublish}><Play className="h-4 w-4 mr-2" />Publish Campaign</Button>
        </div>
    </header>
);

const NodePalette = ({ onDragStart }: { onDragStart: (e: React.DragEvent, nodeType: string) => void }) => (
  <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 select-none">
    <h2 className="text-lg font-semibold mb-4">Nodes</h2>
    <div className="space-y-2">
      {nodeConfig.map((nodeType) => (
        <div
          key={nodeType.id}
          className="flex items-center p-2 border rounded-lg cursor-grab bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          draggable
          onDragStart={(e) => onDragStart(e, nodeType.id)}
        >
          <nodeType.icon className={cn("h-6 w-6 mr-3", nodeType.color)} />
          <p className="font-semibold">{nodeType.name}</p>
        </div>
      ))}
    </div>
  </aside>
);

const ConfigPanel = ({ selectedNode, onUpdateNode, onDeleteNode }: { selectedNode: Node | null; onUpdateNode: (id: string, data: any) => void; onDeleteNode: (id: string) => void }) => {

    const handleDataChange = (key: string, value: any) => {
        if (selectedNode) {
            onUpdateNode(selectedNode.id, { ...selectedNode.data, [key]: value });
        }
    };

    const handleSectionChange = (sectionIndex: number, key: string, value: string) => {
        if (selectedNode && selectedNode.data.sections) {
            const newSections = [...selectedNode.data.sections];
            newSections[sectionIndex] = { ...newSections[sectionIndex], [key]: value };
            handleDataChange('sections', newSections);
        }
    };

    const handleRowChange = (sectionIndex: number, rowIndex: number, key: string, value: string) => {
        if (selectedNode && selectedNode.data.sections) {
            const newSections = [...selectedNode.data.sections];
            newSections[sectionIndex].rows[rowIndex] = { ...newSections[sectionIndex].rows[rowIndex], [key]: value };
            handleDataChange('sections', newSections);
        }
    };

    const addSection = () => {
        if (selectedNode && selectedNode.data.sections) {
            const newSections = [...selectedNode.data.sections, {id: `section-${Date.now()}`, title: 'New Section', rows: []}];
            handleDataChange('sections', newSections);
        }
    };

    const addRow = (sectionIndex: number) => {
        if (selectedNode && selectedNode.data.sections) {
            const newSections = [...selectedNode.data.sections];
            newSections[sectionIndex].rows.push({id: `row-${Date.now()}`, title: 'New Option'});
            handleDataChange('sections', newSections);
        }
    };

    const removeSection = (sectionIndex: number) => {
        if (selectedNode && selectedNode.data.sections) {
            const newSections = selectedNode.data.sections.filter((_: any, i: number) => i !== sectionIndex);
            handleDataChange('sections', newSections);
        }
    };

    const removeRow = (sectionIndex: number, rowIndex: number) => {
        if (selectedNode && selectedNode.data.sections) {
            const newSections = [...selectedNode.data.sections];
            newSections[sectionIndex].rows = newSections[sectionIndex].rows.filter((_: any, i: number) => i !== rowIndex);
            handleDataChange('sections', newSections);
        }
    };

    const renderInteractiveListConfig = () => {
        if (!selectedNode) return null;
  return (
            <>
                <div className="space-y-2">
                    <Label htmlFor="config-label">Label</Label>
                    <Input id="config-label" value={selectedNode.data.label} onChange={(e) => handleDataChange('label', e.target.value)} />
              </div>
                <div className="space-y-2">
                    <Label htmlFor="config-buttonText">Button Text</Label>
                    <Input id="config-buttonText" value={selectedNode.data.buttonText} onChange={(e) => handleDataChange('buttonText', e.target.value)} />
              </div>
                <Separator />
                <h3 className="text-md font-semibold">Sections</h3>
                {selectedNode.data.sections?.map((section: any, sectionIndex: number) => (
                    <div key={section.id} className="p-2 border rounded space-y-2">
                         <div className="flex items-center justify-between">
                            <Label>Section Title</Label>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeSection(sectionIndex)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
            </div>
                        <Input value={section.title} onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)} />

                        {section.rows?.map((row: any, rowIndex: number) => (
                            <div key={row.id} className="flex items-center gap-2 pl-4">
                                <Input value={row.title} onChange={(e) => handleRowChange(sectionIndex, rowIndex, 'title', e.target.value)} />
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeRow(sectionIndex, rowIndex)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => addRow(sectionIndex)}>+ Add Option</Button>
                    </div>
                ))}
                <Button variant="secondary" className="w-full" onClick={addSection}>+ Add Section</Button>
            </>
        );
    }

    const renderConditionConfig = () => {
        if (!selectedNode) return null;

        const operators = [
            { value: 'equals', label: 'Equals' },
            { value: 'not_equals', label: 'Not Equals' },
            { value: 'contains', label: 'Contains' },
            { value: 'not_contains', label: 'Does Not Contain' },
            { value: 'starts_with', label: 'Starts With' },
            { value: 'ends_with', label: 'Ends With' },
        ];

        return (
            <>
                <div className="space-y-2">
                    <Label htmlFor="config-label">Label</Label>
                    <Input id="config-label" value={selectedNode.data.label} onChange={(e) => handleDataChange('label', e.target.value)} />
                </div>
                <Separator />
                <h3 className="text-md font-semibold">Criteria</h3>
                <div className="space-y-2">
                    <Label htmlFor="config-variable">Variable</Label>
                    <Input id="config-variable" value={selectedNode.data.variable} onChange={(e) => handleDataChange('variable', e.target.value)} placeholder="e.g., user.tag or last_message.text"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="config-operator">Operator</Label>
                    <Select value={selectedNode.data.operator} onValueChange={(value) => handleDataChange('operator', value)}>
                        <SelectTrigger id="config-operator">
                            <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                        <SelectContent>
                            {operators.map(op => (
                                <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="config-value">Value</Label>
                    <Input id="config-value" value={selectedNode.data.value} onChange={(e) => handleDataChange('value', e.target.value)} />
                </div>
            </>
        );
    };

    const renderInteractiveFlowConfig = () => {
        if (!selectedNode) return null;
        
        const [isBuilderOpen, setIsBuilderOpen] = useState(false);

        const handleSave = (newJson: string) => {
            handleDataChange('flow_json', newJson);
            setIsBuilderOpen(false); // Close dialog on save
        };

        return (
            <>
                <div className="space-y-2">
                    <Label htmlFor="config-label">Label</Label>
                    <Input id="config-label" value={selectedNode.data.label} onChange={(e) => handleDataChange('label', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="config-flowId">Flow ID</Label>
                    <Input id="config-flowId" value={selectedNode.data.flowId} onChange={(e) => handleDataChange('flowId', e.target.value)} />
                </div>
                <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">Design Flow</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
                         <DialogHeader className="p-4 border-b">
                            <DialogTitle>Interactive Flow Builder</DialogTitle>
                            <DialogDescription>
                                Visually build the screens for your interactive flow. Changes are saved when you click "Save and Close".
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex-grow min-h-0">
                           <FlowFormBuilder 
                                initialJson={selectedNode.data.flow_json}
                                onSave={handleSave}
                                onClose={() => setIsBuilderOpen(false)}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    const renderDefaultConfig = () => {
        if (!selectedNode) return null;
        return Object.entries(selectedNode.data).map(([key, value]) => (
            <div key={key}>
              <Label htmlFor={`config-${key}`}>{key}</Label>
              <Textarea
                id={`config-${key}`}
                value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                onChange={(e) => {
                    if (key === 'flow_json') {
                        // Just update the string, don't try to parse it here
                        handleDataChange(key, e.target.value);
                    } else {
                        handleDataChange(key, e.target.value);
                    }
                }}
                rows={key === 'text' || key === 'flow_json' ? 4 : 1}
                  />
                </div>
        ));
    };

    return (
        <aside className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold mb-4">Configuration</h2>
            {selectedNode ? (
            <ScrollArea className="h-full">
                <div className="space-y-4 p-1">
                    {selectedNode.type === 'interactiveList' && renderInteractiveListConfig()}
                    {selectedNode.type === 'interactiveFlow' && renderInteractiveFlowConfig()}
                    {selectedNode.type === 'condition' && renderConditionConfig()}
                    {selectedNode.type !== 'interactiveList' && selectedNode.type !== 'interactiveFlow' && selectedNode.type !== 'condition' && renderDefaultConfig()}
                    <Separator className="!my-6" />
                    <Button variant="outline" size="sm" className="w-full" onClick={() => onDeleteNode(selectedNode.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Node
                    </Button>
                </div>
            </ScrollArea>
            ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                <MousePointer2 className="h-10 w-10 mb-2" />
                <p>Select a node to configure.</p>
              </div>
            )}
        </aside>
    );
};


// --- MAIN COMPONENT ---

const FlowBuilder = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds)), [setEdges]);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const nodeTypes = useMemo(() => ({
        trigger: triggerNodeComponent,
        message: messageNodeComponent,
        interactiveList: interactiveListNodeComponent,
        interactiveFlow: interactiveFlowNodeComponent,
        'ai-response': aiResponseNodeComponent,
        condition: conditionNodeComponent,
        delay: delayNodeComponent,
        action: actionNodeComponent,
    }), []);

    const edgeTypes = useMemo(() => ({
        smoothstep: CustomEdge,
    }), []);

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');
        if (typeof type === 'undefined' || !type || !reactFlowInstance) {
            return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const config = nodeConfig.find(n => n.id === type);
        if (!config) return;

        const newNode: Node = {
            id: `${type}-${Date.now()}`,
            type,
            position,
            data: { ...config.defaultData },
        };

        setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance, setNodes]);

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const updateNodeConfig = (nodeId: string, data: any) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
            )
        );
        if (selectedNode?.id === nodeId) {
            setSelectedNode(prev => prev ? {...prev, data: {...prev.data, ...data}} : null)
        }
    };

    const deleteNode = (nodeId: string) => {
        setNodes((nds) => nds.filter((node) => node.id !== nodeId));
        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
        setSelectedNode(null);
    };

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
    }, []);

    const onPaneClick = useCallback(() => setSelectedNode(null), []);

    const onSave = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem('whatsapp-flow', JSON.stringify(flow));
            toast.success("Flow saved successfully!");
        }
    }, [reactFlowInstance]);

    const onPublish = () => {
        toast.info("Publish functionality not implemented yet.");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-sans">
            <Header onSave={onSave} onPublish={onPublish} />
            <div className="flex flex-1 overflow-hidden">
                <NodePalette onDragStart={onDragStart} />
                <main className="flex-1 select-none" onDrop={onDrop} onDragOver={onDragOver}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        onInit={setReactFlowInstance}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        fitView
                        connectionRadius={30}
                        panOnDrag
                    >
                        <Controls />
                        <MiniMap nodeColor={(node) => {
                            switch (node.type) {
                                case 'trigger': return '#22c55e';
                                case 'message': return '#3b82f6';
                                case 'interactiveList': return '#10b981';
                                case 'interactiveFlow': return '#14b8a6';
                                default: return '#6b7280';
                            }
                        }}/>
                        <Background gap={16} size={1} variant="dots" />
                    </ReactFlow>
                </main>
                <ConfigPanel selectedNode={selectedNode} onUpdateNode={updateNodeConfig} onDeleteNode={deleteNode} />
            </div>
    </div>
  );
};


export function WhatsAppCampaignFlowBuilder() {
    return (
        <ReactFlowProvider>
            <FlowBuilder />
        </ReactFlowProvider>
  );
} 