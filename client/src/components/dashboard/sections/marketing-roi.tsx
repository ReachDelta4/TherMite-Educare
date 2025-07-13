import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Target, TrendingUp, BarChart4, Percent } from "lucide-react";

// Mock Data
const marketingFunnelData = [
  { stage: 'Awareness', count: 50000, conversion: null },
  { stage: 'Interest', count: 4250, conversion: 8.5 },
  { stage: 'Consideration', count: 1062, conversion: 25 },
  { stage: 'Decision', count: 166, conversion: 15.7 },
  { stage: 'Retention', count: 148, conversion: 89.1 },
];

const marketingRoiData = [
    { channel: 'WhatsApp Campaigns', spend: 12000, leads: 154, cpl: 78, roi: 350 },
    { channel: 'AI Calling', spend: 8500, leads: 110, cpl: 77, roi: 420 },
    { channel: 'SEO', spend: 15000, leads: 250, cpl: 60, roi: 800 },
    { channel: 'Paid Ads (Google)', spend: 25000, leads: 300, cpl: 83, roi: 250 },
    { channel: 'Social Media', spend: 10000, leads: 180, cpl: 56, roi: 600 },
];

export function MarketingROI({ selectedCourse }) {
  // TODO: Filter data based on selectedCourse

  const getFunnelBarWidth = (value, maxValue) => {
    const minWidth = 30; // min width in percent
    const maxWidth = 100; // max width in percent
    if (maxValue === 0) return minWidth;
    const width = minWidth + (maxWidth - minWidth) * (Math.log(value + 1) / Math.log(maxValue + 1));
    return Math.max(width, minWidth);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">Marketing ROI & Funnel</h2>
           <p className="text-muted-foreground">
             Analyzing marketing effectiveness for {selectedCourse}.
           </p>
        </div>
        <Button>
           <Download className="mr-2 h-4 w-4" />
           Export Report
        </Button>
      </div>

      {/* Enhanced Marketing Funnel */}
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Enterprise Marketing Funnel</CardTitle>
            <CardDescription>Conversion analysis across the entire marketing funnel.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="w-full flex flex-col items-center">
                 {marketingFunnelData.map((item, index) => (
                    <div key={item.stage} className="flex flex-col items-center w-full max-w-4xl">
                       {index > 0 && (
                            <div className="text-center text-sm text-muted-foreground my-2 flex items-center gap-2">
                                <Percent className="h-4 w-4" />
                                <span>Conversion: <strong>{item.conversion}%</strong></span>
                            </div>
                       )}
                        <div 
                            style={{ 
                                width: `${getFunnelBarWidth(item.count, marketingFunnelData[0].count)}%`,
                            }}
                            className="bg-primary/10 border-2 border-primary/20 rounded-t-lg p-4 text-center font-bold shadow-sm"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full px-4">
                              <span className="text-lg text-primary">{item.stage}</span>
                              <span className="text-xl font-bold text-primary/80">{item.count.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                 ))}
            </div>
        </CardContent>
      </Card>
      
      {/* Marketing Channel ROI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart4 className="h-5 w-5" /> Marketing Channel ROI</CardTitle>
          <CardDescription>Performance and return on investment by marketing channel.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead className="text-right">Spend (₹)</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Cost Per Lead (₹)</TableHead>
                <TableHead className="text-right">ROI (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketingRoiData.map((row) => (
                <TableRow key={row.channel}>
                  <TableCell className="font-medium">{row.channel}</TableCell>
                  <TableCell className="text-right">{row.spend.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.leads.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.cpl.toLocaleString()}</TableCell>
                  <TableCell className={`text-right font-bold ${row.roi > 400 ? 'text-green-600' : 'text-amber-600'}`}>
                    {row.roi}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 