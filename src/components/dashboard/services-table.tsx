import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageSquare, Award, Phone, BarChart3 } from "lucide-react";

const services = [
  {
    id: 1,
    name: "WhatsApp Lead Qualification Bot",
    description: "End-to-end Setup, logic design, integration with custom backend",
    amount: "₹20,000",
    status: "Active",
    icon: MessageSquare,
    category: "Automation"
  },
  {
    id: 2,
    name: "Certificate Generator Automation",
    description: "Dynamic template design, automation logic, PDF export, delivery setup by Email/WhatsApp",
    amount: "₹20,000",
    status: "In Progress",
    icon: Award,
    category: "Document Processing"
  },
  {
    id: 3,
    name: "AI Calling Agent Setup",
    description: "Retell AI configuration, voice setup, conversation scripting",
    amount: "₹5,000",
    status: "Completed",
    icon: Phone,
    category: "AI Services"
  },
  {
    id: 4,
    name: "Custom Dashboard",
    description: "Unified custom dashboard, audit logs, admin features, custom branding, secure access",
    amount: "₹15,000",
    status: "Active",
    icon: BarChart3,
    category: "Platform"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-success/10 text-success border-success/20";
    case "In Progress":
      return "bg-warning/10 text-warning border-warning/20";
    case "Completed":
      return "bg-primary/10 text-primary border-primary/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

export function ServicesTable() {
  const totalAmount = services.reduce((sum, service) => {
    const amount = parseInt(service.amount.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Service Portfolio</CardTitle>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Value</p>
          <p className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
                  <Badge className={`${getStatusColor(service.status)} border`}>
                    {service.status}
                  </Badge>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{service.amount}</p>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {services.length} Services • Last updated: {new Date().toLocaleDateString()}
          </p>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Portfolio Total</p>
            <p className="text-xl font-bold text-primary">₹{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}