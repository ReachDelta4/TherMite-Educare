
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { 
  MessageSquare,
  Award,
  PhoneCall,
  Target,
  Activity,
  TrendingUp, 
  Users,
  Settings,
  Eye,
  EyeOff,
  Move,
  RotateCcw,
  Maximize,
  Minimize
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardWidget {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: any;
  visible: boolean;
  size: "small" | "medium" | "large";
  position: { row: number; col: number };
}

export function CustomizableDashboard() {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    {
      id: "whatsapp-leads",
      title: "WhatsApp Leads",
      value: "127",
      change: "+23 this week",
      changeType: "positive",
      icon: MessageSquare,
      visible: true,
      size: "medium",
      position: { row: 0, col: 0 }
    },
    {
      id: "certificates",
      title: "Certificates Generated",
      value: "234",
      change: "+45 this month",
      changeType: "positive",
      icon: Award,
      visible: true,
      size: "medium",
      position: { row: 0, col: 1 }
    },
    {
      id: "ai-calls",
      title: "AI Calls Made",
      value: "89",
      change: "Today's activity",
      changeType: "neutral",
      icon: PhoneCall,
      visible: true,
      size: "medium",
      position: { row: 0, col: 2 }
    },
    {
      id: "conversion-rate",
      title: "Conversion Rate",
      value: "67%",
      change: "+12% improvement",
      changeType: "positive",
      icon: Target,
      visible: true,
      size: "medium",
      position: { row: 0, col: 3 }
    },
    {
      id: "active-automations",
      title: "Active Automations",
      value: "4",
      change: "All systems operational",
      changeType: "positive",
      icon: Activity,
      visible: true,
      size: "medium",
      position: { row: 1, col: 0 }
    },
    {
      id: "monthly-growth",
      title: "Monthly Growth",
      value: "+34%",
      change: "Lead generation increase",
      changeType: "positive",
      icon: TrendingUp,
      visible: true,
      size: "medium",
      position: { row: 1, col: 1 }
    },
    {
      id: "student-enrollment",
      title: "Student Enrollment",
      value: "156",
      change: "+28 this month",
      changeType: "positive",
      icon: Users,
      visible: true,
      size: "medium",
      position: { row: 1, col: 2 }
    }
  ]);

  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);

  const updateWidget = (id: string, updates: Partial<DashboardWidget>) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === id ? { ...widget, ...updates } : widget
    ));
  };

  const toggleWidgetVisibility = (id: string) => {
    updateWidget(id, { visible: !widgets.find(w => w.id === id)?.visible });
  };

  const resetLayout = () => {
    setWidgets(prev => prev.map((widget, index) => ({
      ...widget,
      position: { row: Math.floor(index / 4), col: index % 4 },
      size: "medium",
      visible: true
    })));
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case "small": return "col-span-1";
      case "large": return "col-span-2";
      default: return "col-span-1";
    }
  };

  const visibleWidgets = widgets.filter(w => w.visible);

  return (
    <div className="space-y-6">
      {/* Dashboard Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-muted-foreground">Monitor your automation performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Customize Dashboard</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Widget Visibility</h3>
                  <Button variant="outline" size="sm" onClick={resetLayout}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Layout
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {widgets.map((widget) => (
                    <div key={widget.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <widget.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <span className="font-medium">{widget.title}</span>
                          <div className="text-sm text-muted-foreground">{widget.value}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`size-${widget.id}`} className="text-sm">Size:</Label>
                          <Select 
                            value={widget.size}
                            onValueChange={(value) => updateWidget(widget.id, { size: value as any })}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`visible-${widget.id}`} className="text-sm">Visible:</Label>
                          <Switch
                            id={`visible-${widget.id}`}
                            checked={widget.visible}
                            onCheckedChange={() => toggleWidgetVisibility(widget.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant={isCustomizing ? "default" : "outline"} 
            size="sm"
            onClick={() => setIsCustomizing(!isCustomizing)}
          >
            <Move className="h-4 w-4 mr-2" />
            {isCustomizing ? "Done" : "Rearrange"}
          </Button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleWidgets.map((widget) => (
          <div
            key={widget.id}
            className={`${getSizeClass(widget.size)} ${isCustomizing ? 'cursor-move border-2 border-dashed border-primary/50 rounded-lg p-1' : ''}`}
            draggable={isCustomizing}
            onDragStart={() => setDraggedWidget(widget.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedWidget && draggedWidget !== widget.id) {
                // Swap positions
                const draggedIndex = widgets.findIndex(w => w.id === draggedWidget);
                const targetIndex = widgets.findIndex(w => w.id === widget.id);
                
                if (draggedIndex !== -1 && targetIndex !== -1) {
                  const newWidgets = [...widgets];
                  const temp = newWidgets[draggedIndex].position;
                  newWidgets[draggedIndex].position = newWidgets[targetIndex].position;
                  newWidgets[targetIndex].position = temp;
                  setWidgets(newWidgets);
                }
              }
              setDraggedWidget(null);
            }}
          >
            <StatCard
              title={widget.title}
              value={widget.value}
              change={widget.change}
              changeType={widget.changeType}
              icon={widget.icon}
              className={`animate-fade-in ${isCustomizing ? 'opacity-75' : ''}`}
            />
            {isCustomizing && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleWidgetVisibility(widget.id)}
                  className="h-6 w-6 p-0"
                >
                  {widget.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hidden Widgets */}
      {isCustomizing && widgets.some(w => !w.visible) && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <EyeOff className="h-5 w-5 mr-2" />
              Hidden Widgets
            </CardTitle>
            <CardDescription>Click to show these widgets on your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {widgets.filter(w => !w.visible).map((widget) => (
                <div
                  key={widget.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleWidgetVisibility(widget.id)}
                >
                  <div className="flex items-center space-x-3">
                    <widget.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{widget.title}</div>
                      <div className="text-sm text-muted-foreground">{widget.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
