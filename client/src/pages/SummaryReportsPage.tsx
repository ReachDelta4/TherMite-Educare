import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList, Sankey, Layer } from 'recharts';
import { Users, DollarSign, Star, Percent, FileText, TrendingUp, TrendingDown, Clock } from 'lucide-react';

const COLORS = {
    // Revenue sources
    'WhatsApp': '#25D366', 
    'Direct': '#4285F4', 
    'Referral': '#FF7F50',
    'Organic': '#AF19FF', 
    'Paid Ads': '#FF4560', 
    'Email': '#FBBF24',
    
    // Financial categories
    'revenue': '#3b82f6',
    'expense': '#ef4444',
    'profit': '#22c55e',
    
    // Chart colors
    'active': '#00C49F',
    'inactive': '#FFBB28',
    'dropped': '#FF8042'
};

const financialKpis = {
    'last-30-days': { 
        revenue: 650000, cogs: 300000, grossProfit: 350000, 
        opEx: { salaries: 150000, marketing: 60000, rnd: 40000, admin: 30000 },
        operatingProfit: 70000, taxes: 20000, netProfit: 50000 
    },
    'last-3-months': { 
        revenue: 1850000, cogs: 800000, grossProfit: 1050000,
        opEx: { salaries: 450000, marketing: 180000, rnd: 120000, admin: 90000 },
        operatingProfit: 210000, taxes: 60000, netProfit: 150000
    },
    'all-time': { 
        revenue: 25000000, cogs: 12000000, grossProfit: 13000000,
        opEx: { salaries: 6000000, marketing: 2400000, rnd: 1600000, admin: 1200000 },
        operatingProfit: 1800000, taxes: 500000, netProfit: 1300000
    },
};

const leadRevenueBreakdown = {
    'last-30-days': [
        { source: 'WhatsApp', revenue: 250000 }, { source: 'Direct', revenue: 180000 }, 
        { source: 'Referral', revenue: 120000 }, { source: 'Organic', revenue: 80000 },
        { source: 'Email', revenue: 15000 }, { source: 'Paid Ads', revenue: 5000 },
    ],
    'last-3-months': [
        { source: 'WhatsApp', revenue: 750000 }, { source: 'Direct', revenue: 580000 },
        { source: 'Referral', revenue: 320000 }, { source: 'Organic', revenue: 180000 },
        { source: 'Email', revenue: 10000 }, { source: 'Paid Ads', revenue: 10000 },
    ],
    'all-time': [
        { source: 'WhatsApp', revenue: 10000000 }, { source: 'Direct', revenue: 7500000 },
        { source: 'Referral', revenue: 4500000 }, { source: 'Organic', revenue: 2500000 },
        { source: 'Email', revenue: 300000 }, { source: 'Paid Ads', revenue: 200000 },
    ],
};

const processFinancialDataForSankey = (financials, leadRevenue) => {
    // Ensure total revenue from sources matches the financial data
    const totalSourceRevenue = leadRevenue.reduce((sum, item) => sum + item.revenue, 0);
    const scaleFactor = financials.revenue / totalSourceRevenue;
    
    // Scale the revenue sources to match the total revenue
    const scaledLeadRevenue = leadRevenue.map(item => ({
        ...item,
        revenue: Math.round(item.revenue * scaleFactor)
    }));
    
    const totalOpEx = Object.values(financials.opEx).reduce((a, b) => a + b, 0);
    
    // Define nodes with proper colors
    const nodes = [
        ...scaledLeadRevenue.map(s => ({ name: s.source, color: COLORS[s.source] || '#999' })),
        { name: "Total Revenue", color: COLORS.revenue },
        { name: "Cost of Revenue", color: COLORS.expense },
        { name: "Gross Profit", color: COLORS.profit },
        { name: "Operating Expenses", color: COLORS.expense },
        ...Object.keys(financials.opEx).map(k => ({ 
            name: k.charAt(0).toUpperCase() + k.slice(1), 
            color: COLORS.expense 
        })),
        { name: "Operating Profit", color: COLORS.profit },
        { name: "Taxes", color: COLORS.expense },
        { name: "Net Profit", color: COLORS.profit },
    ];

    const opExKeys = Object.keys(financials.opEx);
    const opExStartIndex = nodes.findIndex(n => n.name === 'Operating Expenses') + 1;

    // Create links with proper source/target indices
    const links = [
        // Revenue sources to Total Revenue
        ...scaledLeadRevenue.map((s, i) => ({ 
            source: i, 
            target: scaledLeadRevenue.length, 
            value: s.revenue,
            sourceColor: nodes[i].color,
            targetColor: nodes[scaledLeadRevenue.length].color
        })),
        
        // Total Revenue to Cost of Revenue and Gross Profit
        { 
            source: scaledLeadRevenue.length, 
            target: scaledLeadRevenue.length + 1, 
            value: financials.cogs,
            sourceColor: nodes[scaledLeadRevenue.length].color,
            targetColor: nodes[scaledLeadRevenue.length + 1].color
        },
        { 
            source: scaledLeadRevenue.length, 
            target: scaledLeadRevenue.length + 2, 
            value: financials.grossProfit,
            sourceColor: nodes[scaledLeadRevenue.length].color,
            targetColor: nodes[scaledLeadRevenue.length + 2].color
        },
        
        // Gross Profit to Operating Expenses
        { 
            source: scaledLeadRevenue.length + 2, 
            target: scaledLeadRevenue.length + 3, 
            value: totalOpEx,
            sourceColor: nodes[scaledLeadRevenue.length + 2].color,
            targetColor: nodes[scaledLeadRevenue.length + 3].color
        },
        
        // Gross Profit to Operating Profit
        { 
            source: scaledLeadRevenue.length + 2, 
            target: opExStartIndex + opExKeys.length, 
            value: financials.operatingProfit,
            sourceColor: nodes[scaledLeadRevenue.length + 2].color,
            targetColor: nodes[opExStartIndex + opExKeys.length].color
        },
        
        // Operating Expenses breakdown
        ...opExKeys.map((key, i) => ({ 
            source: scaledLeadRevenue.length + 3, 
            target: opExStartIndex + i, 
            value: financials.opEx[key],
            sourceColor: nodes[scaledLeadRevenue.length + 3].color,
            targetColor: nodes[opExStartIndex + i].color
        })),
        
        // Operating Profit to Taxes and Net Profit
        { 
            source: opExStartIndex + opExKeys.length, 
            target: opExStartIndex + opExKeys.length + 1, 
            value: financials.taxes,
            sourceColor: nodes[opExStartIndex + opExKeys.length].color,
            targetColor: nodes[opExStartIndex + opExKeys.length + 1].color
        },
        { 
            source: opExStartIndex + opExKeys.length, 
            target: opExStartIndex + opExKeys.length + 2, 
            value: financials.netProfit,
            sourceColor: nodes[opExStartIndex + opExKeys.length].color,
            targetColor: nodes[opExStartIndex + opExKeys.length + 2].color
        },
    ];

    return { nodes, links };
};

const SankeyNode = ({ x, y, width, height, index, payload, containerWidth }) => {
    const { name, value, color } = payload;
    
    // Determine text position based on node position
    const isSource = x < containerWidth / 3;
    const isTarget = x > containerWidth * 2/3;
    const isMiddle = !isSource && !isTarget;
    
    // Format value for display
    const formattedValue = `₹${(value / 100000).toFixed(1)}L`;
    
    // Determine text color - always black for profit nodes
    const textColor = ['Gross Profit', 'Operating Profit', 'Net Profit'].includes(name) 
        ? 'black' : 'currentColor';
    
    return (
        <Layer key={`${name}-${index}`}>
            <rect 
                x={x} 
                y={y} 
                width={width} 
                height={height} 
                fill={color || '#999'} 
                fillOpacity={0.9}
                stroke="#fff"
                strokeWidth={1}
            />
            <text
                x={isSource ? x - 6 : (isTarget ? x + width + 6 : x + width / 2)}
                y={y + height / 2}
                textAnchor={isSource ? "end" : (isTarget ? "start" : "middle")}
                dominantBaseline="middle"
                fill={textColor}
                fontSize={12}
                fontWeight="bold"
            >
                {name}
            </text>
            <text
                x={isSource ? x - 6 : (isTarget ? x + width + 6 : x + width / 2)}
                y={y + height / 2 + 16}
                textAnchor={isSource ? "end" : (isTarget ? "start" : "middle")}
                dominantBaseline="middle"
                fill={textColor}
                fontSize={11}
                opacity={0.8}
            >
                {formattedValue}
            </text>
        </Layer>
    );
};

const SankeyLink = ({ sourceX, sourceY, sourceControlX, targetX, targetY, targetControlX, linkWidth, index, payload }) => {
    const { source, target, value, sourceColor, targetColor } = payload;
    
    if (!source || !target) {
        return null;
    }
    
    const gradientId = `link-gradient-${index}`;
    const path = `
        M${sourceX},${sourceY}
        C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
    `;
    
    return (
        <Layer key={`link-${index}`}>
            <defs>
                <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1={sourceX} y1={sourceY} x2={targetX} y2={targetY}>
                    <stop offset="0%" stopColor={sourceColor || '#999'} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={targetColor || '#999'} stopOpacity={0.6} />
                </linearGradient>
            </defs>
            <path 
                d={path} 
                fill="none" 
                stroke={`url(#${gradientId})`} 
                strokeWidth={Math.max(1, linkWidth)} 
                strokeOpacity={0.5}
            />
        </Layer>
    );
};


const studentData = {
  'last-30-days': [
    { name: 'Active', value: 1450, fill: '#00C49F', details: { newlyEnrolled: 120, longTerm: 980, returning: 350 } }, 
    { name: 'Inactive', value: 230, fill: '#FFBB28', details: { recentlyInactive: 85, longInactive: 145 } }, 
    { name: 'Dropped', value: 45, fill: '#FF8042', details: { refunded: 12, expired: 33 } }
  ],
  'last-3-months': [
    { name: 'Active', value: 1380, fill: '#00C49F', details: { newlyEnrolled: 320, longTerm: 760, returning: 300 } }, 
    { name: 'Inactive', value: 310, fill: '#FFBB28', details: { recentlyInactive: 180, longInactive: 130 } }, 
    { name: 'Dropped', value: 115, fill: '#FF8042', details: { refunded: 35, expired: 80 } }
  ],
  'all-time': [
    { name: 'Active', value: 2200, fill: '#00C49F', details: { newlyEnrolled: 450, longTerm: 1250, returning: 500 } }, 
    { name: 'Inactive', value: 500, fill: '#FFBB28', details: { recentlyInactive: 220, longInactive: 280 } }, 
    { name: 'Dropped', value: 250, fill: '#FF8042', details: { refunded: 75, expired: 175 } }
  ],
};

const studentTrendData = {
  'last-30-days': [
    { day: '1', active: 1350, inactive: 210, dropped: 40 },
    { day: '7', active: 1390, inactive: 205, dropped: 41 },
    { day: '14', active: 1410, inactive: 215, dropped: 39 },
    { day: '21', active: 1380, inactive: 225, dropped: 42 },
    { day: '30', active: 1450, inactive: 230, dropped: 45 }
  ],
  'last-3-months': [
    { month: 'Jan', active: 1280, inactive: 290, dropped: 90 },
    { month: 'Feb', active: 1320, inactive: 300, dropped: 105 },
    { month: 'Mar', active: 1380, inactive: 310, dropped: 115 }
  ],
  'all-time': [
    { quarter: 'Q1 2023', active: 1800, inactive: 380, dropped: 180 },
    { quarter: 'Q2 2023', active: 1950, inactive: 420, dropped: 200 },
    { quarter: 'Q3 2023', active: 2050, inactive: 460, dropped: 220 },
    { quarter: 'Q4 2023', active: 2200, inactive: 500, dropped: 250 }
  ]
};

const studentEngagementData = {
  'last-30-days': [
    { name: 'High Engagement', value: 820, fill: '#4CAF50' },
    { name: 'Medium Engagement', value: 450, fill: '#2196F3' },
    { name: 'Low Engagement', value: 180, fill: '#FFC107' },
    { name: 'No Engagement', value: 230, fill: '#F44336' }
  ],
  'last-3-months': [
    { name: 'High Engagement', value: 780, fill: '#4CAF50' },
    { name: 'Medium Engagement', value: 420, fill: '#2196F3' },
    { name: 'Low Engagement', value: 180, fill: '#FFC107' },
    { name: 'No Engagement', value: 310, fill: '#F44336' }
  ],
  'all-time': [
    { name: 'High Engagement', value: 1200, fill: '#4CAF50' },
    { name: 'Medium Engagement', value: 650, fill: '#2196F3' },
    { name: 'Low Engagement', value: 350, fill: '#FFC107' },
    { name: 'No Engagement', value: 500, fill: '#F44336' }
  ]
};

const salesFunnelData = {
  'last-30-days': [
    { stage: 'First Contact', value: 12500, fill: '#8884d8', conversion: 62.4, avgDays: 1 },
    { stage: 'Qualified Leads', value: 7800, fill: '#83a6ed', conversion: 53.8, avgDays: 3 },
    { stage: 'Meetings Booked', value: 4200, fill: '#8dd1e1', conversion: 50.0, avgDays: 2 },
    { stage: 'Proposals Sent', value: 2100, fill: '#82ca9d', conversion: 45.2, avgDays: 5 },
    { stage: 'Closed Won', value: 950, fill: '#a4de6c', conversion: null, avgDays: null }
  ],
  'last-3-months': [
    { stage: 'First Contact', value: 35000, fill: '#8884d8', conversion: 60.0, avgDays: 1 },
    { stage: 'Qualified Leads', value: 21000, fill: '#83a6ed', conversion: 52.4, avgDays: 3 },
    { stage: 'Meetings Booked', value: 11000, fill: '#8dd1e1', conversion: 48.2, avgDays: 2 },
    { stage: 'Proposals Sent', value: 5300, fill: '#82ca9d', conversion: 43.4, avgDays: 5 },
    { stage: 'Closed Won', value: 2300, fill: '#a4de6c', conversion: null, avgDays: null }
  ],
  'all-time': [
    { stage: 'First Contact', value: 150000, fill: '#8884d8', conversion: 58.7, avgDays: 1 },
    { stage: 'Qualified Leads', value: 88000, fill: '#83a6ed', conversion: 51.1, avgDays: 3 },
    { stage: 'Meetings Booked', value: 45000, fill: '#8dd1e1', conversion: 46.7, avgDays: 2 },
    { stage: 'Proposals Sent', value: 21000, fill: '#82ca9d', conversion: 42.9, avgDays: 5 },
    { stage: 'Closed Won', value: 9000, fill: '#a4de6c', conversion: null, avgDays: null }
  ]
};

const salesTrendData = {
  'last-30-days': [
    { day: '1', newLeads: 380, qualifiedLeads: 240, meetings: 130, proposals: 65, closed: 28 },
    { day: '7', newLeads: 420, qualifiedLeads: 265, meetings: 145, proposals: 72, closed: 30 },
    { day: '14', newLeads: 390, qualifiedLeads: 250, meetings: 135, proposals: 68, closed: 31 },
    { day: '21', newLeads: 410, qualifiedLeads: 270, meetings: 140, proposals: 70, closed: 33 },
    { day: '30', newLeads: 450, qualifiedLeads: 280, meetings: 150, proposals: 75, closed: 35 }
  ],
  'last-3-months': [
    { month: 'Jan', newLeads: 1100, qualifiedLeads: 650, meetings: 350, proposals: 170, closed: 75 },
    { month: 'Feb', newLeads: 1250, qualifiedLeads: 720, meetings: 380, proposals: 180, closed: 80 },
    { month: 'Mar', newLeads: 1300, qualifiedLeads: 780, meetings: 420, proposals: 200, closed: 90 }
  ],
  'all-time': [
    { quarter: 'Q1 2023', newLeads: 3500, qualifiedLeads: 2100, meetings: 1100, proposals: 520, closed: 230 },
    { quarter: 'Q2 2023', newLeads: 3800, qualifiedLeads: 2300, meetings: 1200, proposals: 560, closed: 250 },
    { quarter: 'Q3 2023', newLeads: 4200, qualifiedLeads: 2500, meetings: 1300, proposals: 610, closed: 270 },
    { quarter: 'Q4 2023', newLeads: 4500, qualifiedLeads: 2700, meetings: 1400, proposals: 650, closed: 290 }
  ]
};

const churnRetentionData = {
    'last-30-days': [{ month: 'Current', retention: 96.8, churn: 3.2 }],
    'last-3-months': [
        { month: 'Month 1', retention: 97.1, churn: 2.9 },
        { month: 'Month 2', retention: 96.5, churn: 3.5 },
        { month: 'Month 3', retention: 96.8, churn: 3.2 },
    ],
    'all-time': [
        { month: 'Q1', retention: 95.5, churn: 4.5 },
        { month: 'Q2', retention: 96.2, churn: 3.8 },
        { month: 'Q3', retention: 96.8, churn: 3.2 },
        { month: 'Q4', retention: 97.2, churn: 2.8 },
    ],
};

const leadConversionAnalysisData = {
    'last-30-days': {
        trends: [
            { day: '1', WhatsApp: 15, Direct: 10, Referral: 5, Organic: 8, 'Paid Ads': 2 },
            { day: '7', WhatsApp: 22, Direct: 15, Referral: 8, Organic: 12, 'Paid Ads': 4 },
            { day: '14', WhatsApp: 18, Direct: 12, Referral: 6, Organic: 10, 'Paid Ads': 3 },
            { day: '21', WhatsApp: 25, Direct: 18, Referral: 10, Organic: 14, 'Paid Ads': 5 },
            { day: '30', WhatsApp: 50, Direct: 40, Referral: 20, Organic: 25, 'Paid Ads': 10 },
        ],
        summary: [
            { source: 'WhatsApp', leads: 850, conversions: 640, revenue: 250000 },
            { source: 'Direct', leads: 600, conversions: 450, revenue: 180000 },
            { source: 'Referral', leads: 400, conversions: 300, revenue: 120000 },
            { source: 'Organic', leads: 350, conversions: 260, revenue: 80000 },
            { source: 'Paid Ads', leads: 150, conversions: 110, revenue: 20000 },
        ]
    },
    'last-3-months': {
        trends: [
            { month: 'Jan', WhatsApp: 150, Direct: 110, Referral: 80, Organic: 90, 'Paid Ads': 30 },
            { month: 'Feb', WhatsApp: 170, Direct: 130, Referral: 90, Organic: 100, 'Paid Ads': 35 },
            { month: 'Mar', WhatsApp: 200, Direct: 150, Referral: 100, Organic: 120, 'Paid Ads': 40 },
        ],
        summary: [
            { source: 'WhatsApp', leads: 1000, conversions: 750, revenue: 700000 },
            { source: 'Direct', leads: 800, conversions: 600, revenue: 550000 },
            { source: 'Referral', leads: 600, conversions: 450, revenue: 350000 },
            { source: 'Organic', leads: 500, conversions: 375, revenue: 200000 },
            { source: 'Paid Ads', leads: 200, conversions: 150, revenue: 50000 },
        ]
    },
    'all-time': {
        trends: [
            { year: '2022', WhatsApp: 1000, Direct: 800, Referral: 600, Organic: 500, 'Paid Ads': 150 },
            { year: '2023-Q1', WhatsApp: 1200, Direct: 950, Referral: 700, Organic: 600, 'Paid Ads': 180 },
            { year: '2023-Q2', WhatsApp: 1400, Direct: 1100, Referral: 800, Organic: 700, 'Paid Ads': 220 },
            { year: '2023-Q3', WhatsApp: 1700, Direct: 1300, Referral: 950, Organic: 850, 'Paid Ads': 250 },
            { year: '2023-Q4', WhatsApp: 2000, Direct: 1600, Referral: 1200, Organic: 1000, 'Paid Ads': 300 },
        ],
        summary: [
            { source: 'WhatsApp', leads: 2000, conversions: 1500, revenue: 8000000 },
            { source: 'Direct', leads: 1600, conversions: 1200, revenue: 7500000 },
            { source: 'Referral', leads: 1200, conversions: 900, revenue: 5000000 },
            { source: 'Organic', leads: 1000, conversions: 750, revenue: 3500000 },
            { source: 'Paid Ads', leads: 300, conversions: 225, revenue: 1000000 },
        ]
    }
};

const topPerformingCourses = [
    { id: 1, name: "Advanced Medical Certification", shortName: "Medical Cert.", enrolled: 580, active: 550, revenue: 1200000, satisfaction: 4.8, color: "#8884d8" },
    { id: 2, name: "AI in Academic Research", shortName: "AI Research", enrolled: 450, active: 420, revenue: 950000, satisfaction: 4.7, color: "#83a6ed" },
    { id: 3, name: "Corporate Leadership Masterclass", shortName: "Leadership", enrolled: 320, active: 310, revenue: 850000, satisfaction: 4.9, color: "#8dd1e1" },
    { id: 4, name: "Exam Prep Pro Series", shortName: "Exam Prep", enrolled: 750, active: 680, revenue: 700000, satisfaction: 4.6, color: "#82ca9d" },
    { id: 5, name: "Professional Development Summit", shortName: "Pro Dev", enrolled: 280, active: 270, revenue: 650000, satisfaction: 4.8, color: "#a4de6c" },
].sort((a, b) => b.revenue - a.revenue);


// --- Reusable Components ---
const MetricCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <div className={`flex items-center text-xs text-muted-foreground mt-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          <span>{trendValue}</span>
        </div>
      )}
    </CardContent>
  </Card>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="p-2 bg-background border rounded-lg shadow-lg">
                <p className="font-bold text-lg">{data.name}</p>
                <p className="text-sm text-green-500">Revenue: {`₹${(data.revenue / 100000).toFixed(1)}L`}</p>
                <p className="text-sm text-muted-foreground">Engagement: {data.active} / {data.enrolled} Active</p>
                <p className="text-sm text-amber-500 flex items-center">
                    <Star className="h-4 w-4 mr-1" />{data.satisfaction.toFixed(1)} Satisfaction
                </p>
            </div>
        );
    }
    return null;
};

const StudentDetailTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="p-3 bg-white border rounded-lg shadow-lg">
                <p className="font-bold text-lg">{data.name}</p>
                <p className="text-sm text-muted-foreground">Total: {data.value} students</p>
                
                {data.name === 'Active' && (
                    <>
                        <div className="mt-2">
                            <p className="text-sm text-green-600">Newly Enrolled: {data.details.newlyEnrolled}</p>
                            <p className="text-sm text-blue-600">Long Term: {data.details.longTerm}</p>
                            <p className="text-sm text-purple-600">Returning: {data.details.returning}</p>
                        </div>
                    </>
                )}
                
                {data.name === 'Inactive' && (
                    <>
                        <div className="mt-2">
                            <p className="text-sm text-amber-600">Recently Inactive: {data.details.recentlyInactive}</p>
                            <p className="text-sm text-orange-600">Long Inactive: {data.details.longInactive}</p>
                        </div>
                    </>
                )}
                
                {data.name === 'Dropped' && (
                    <>
                        <div className="mt-2">
                            <p className="text-sm text-red-600">Refunded: {data.details.refunded}</p>
                            <p className="text-sm text-gray-600">Expired: {data.details.expired}</p>
                        </div>
                    </>
                )}
            </div>
        );
    }
    return null;
};

// Custom Funnel Component
const CustomFunnel = ({ data, width, height }) => {
  // Calculate total width and height for the funnel
  const funnelWidth = width * 0.7;
  const funnelHeight = height * 0.9;
  const startX = (width - funnelWidth) / 2;
  const startY = height * 0.05;
  
  // Calculate dimensions for each stage
  const stageCount = data.length;
  const stageHeight = funnelHeight / stageCount;
  
  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      {data.map((item, index) => {
        // Adjust the width calculation for the last item (Closed Won)
        const topWidth = funnelWidth * (index === 0 ? 1 : data[index - 1].value / maxValue);
        let bottomWidth = funnelWidth * (item.value / maxValue);
        
        // Ensure the last item (Closed Won) has a minimum width
        if (index === data.length - 1) {
          bottomWidth = Math.max(bottomWidth, funnelWidth * 0.15);
        }
        
        const x = startX + (funnelWidth - topWidth) / 2;
        const y = startY + index * stageHeight;
        
        // Create trapezoid shape (or rectangle for the last item)
        const isLast = index === data.length - 1;
        const path = isLast
          ? `M ${x} ${y} h ${bottomWidth} v ${stageHeight} h -${bottomWidth} Z`
          : `M ${x} ${y} h ${topWidth} l ${(bottomWidth - topWidth) / 2} ${stageHeight} h -${bottomWidth} l ${(bottomWidth - topWidth) / 2} -${stageHeight} Z`;
        
        // Position for labels
        const centerX = x + (isLast ? bottomWidth / 2 : topWidth / 2);
        const centerY = y + stageHeight / 2;
        const valueY = centerY - 5;
        
        // Position for stage labels - keep them inside the viewBox
        const maxLabelWidth = width - (x + (isLast ? bottomWidth : topWidth)) - 10;
        const stageLabelX = x + (isLast ? bottomWidth : topWidth) + 5;
        const stageLabelY = centerY;
        
        return (
          <g key={index}>
            <path 
              d={path} 
              fill={item.fill} 
              stroke="#fff" 
              strokeWidth={1} 
            />
            <text 
              x={centerX} 
              y={valueY} 
              textAnchor="middle" 
              fill="#fff" 
              fontSize={14} 
              fontWeight="bold"
            >
              {item.value.toLocaleString()}
            </text>
            <text 
              x={stageLabelX} 
              y={stageLabelY} 
              textAnchor="start" 
              fill="#000" 
              fontSize={12}
              clipPath="url(#labelClip)"
            >
              {item.stage}
            </text>
          </g>
        );
      })}
      <defs>
        <clipPath id="labelClip">
          <rect x="0" y="0" width={width * 0.95} height={height} />
        </clipPath>
      </defs>
    </svg>
  );
};

const FunnelTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="p-3 bg-white border rounded-lg shadow-lg">
                <p className="font-bold text-lg">{data.stage}</p>
                <p className="text-lg font-semibold">{data.value.toLocaleString()} leads</p>
                
                {data.conversion && (
                    <p className="text-sm text-green-600 flex items-center mt-1">
                        <Percent className="h-4 w-4 mr-1" /> {data.conversion}% conversion rate
                    </p>
                )}
                
                {data.avgDays && (
                    <p className="text-sm text-blue-600 flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" /> {data.avgDays} days avg. time in stage
                    </p>
                )}
            </div>
        );
    }
    return null;
};

// --- Chart Components ---

const SankeyTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { sourceId, targetId, source, target, value } = payload[0];
        const formattedValue = `₹${(value / 100000).toFixed(1)}L`;
        
        return (
            <div className="p-3 bg-white border rounded-lg shadow-lg">
                <p className="font-semibold text-slate-700">
                    {source} → {target}
                </p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                    {formattedValue}
                </p>
            </div>
        );
    }
    return null;
};

// KPI Metric Component
const KpiMetric = ({ label, value, subtext }) => {
  return (
    <div className="bg-slate-50 p-3 rounded-lg">
      <h4 className="text-sm font-semibold text-slate-700">{label}</h4>
      <p className="text-xl font-bold text-slate-900">{value}</p>
      {subtext && <p className="text-xs text-slate-600 mt-1">{subtext}</p>}
    </div>
  );
};

const SummaryReportsPage = () => {
    const [timeRange, setTimeRange] = useState('last-30-days');
    const [date, setDate] = useState<DateRange | undefined>();

    const handlePresetChange = (preset: string) => {
        setTimeRange(preset);
    };
    
    const sankeyData = useMemo(() => {
        const currentFinancials = financialKpis[timeRange];
        const currentLeadRevenue = leadRevenueBreakdown[timeRange] || leadRevenueBreakdown['last-30-days'];
        return processFinancialDataForSankey(currentFinancials, currentLeadRevenue);
    }, [timeRange]);

    const currentLeadData = useMemo(() => leadConversionAnalysisData[timeRange] || leadConversionAnalysisData['last-30-days'], [timeRange]);
    
    const currentStudentTrend = useMemo(() => studentTrendData[timeRange] || studentTrendData['last-30-days'], [timeRange]);
    const currentSalesTrend = useMemo(() => salesTrendData[timeRange] || salesTrendData['last-30-days'], [timeRange]);
    const currentSalesFunnel = useMemo(() => salesFunnelData[timeRange] || salesFunnelData['last-30-days'], [timeRange]);
    
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Summary Reports</h1>
          <p className="text-muted-foreground">A complete bird's-eye view of your business performance.</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <DateRangePicker date={date} setDate={setDate} onPresetChange={handlePresetChange} />
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Flow Sankey Chart */}
      <Card className="shadow-lg">
          <CardHeader>
              <CardTitle>Quarterly Income Statement</CardTitle>
              <CardDescription>Visualizing the flow from total revenue to net profit.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 p-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThlYiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]">
              <ResponsiveContainer width="100%" height={500}>
                  <Sankey
                      data={sankeyData}
                      nodePadding={40}
                      nodeWidth={15}
                      linkCurvature={0.5}
                      iterations={64}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      link={<SankeyLink />}
                      node={<SankeyNode />}
                  >
                      <Tooltip content={<SankeyTooltip />} />
                  </Sankey>
              </ResponsiveContainer>
          </CardContent>
      </Card>

      {/* Sales Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Conversion Funnel */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Sales Conversion Funnel</CardTitle>
            <CardDescription>From first contact to closed deal, showing active prospects in the funnel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white rounded-lg">
              <div className="h-[350px]">
                <CustomFunnel 
                  data={currentSalesFunnel} 
                  width={550} 
                  height={350} 
                />
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Sales Pipeline Trend</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={currentSalesTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={
                      timeRange === 'last-30-days' ? 'day' : 
                      timeRange === 'last-3-months' ? 'month' : 'quarter'
                    }
                    tick={{fontSize: 12}}
                  />
                  <YAxis tick={{fontSize: 12}} width={40} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="newLeads" name="First Contact" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="qualifiedLeads" name="Qualified" stroke="#83a6ed" strokeWidth={2} />
                  <Line type="monotone" dataKey="meetings" name="Meetings" stroke="#8dd1e1" strokeWidth={2} />
                  <Line type="monotone" dataKey="proposals" name="Proposals" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="closed" name="Closed" stroke="#a4de6c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales Velocity Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sales Velocity Metrics</CardTitle>
            <CardDescription>Key performance indicators for sales efficiency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-700">Avg. Deal Size</h4>
                <p className="text-2xl font-bold text-slate-900">₹28,500</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-700">Avg. Sales Cycle</h4>
                <p className="text-2xl font-bold text-slate-900">11 days</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-700">Win Rate</h4>
                <p className="text-2xl font-bold text-slate-900">75.0%</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-700">Lead-to-Deal</h4>
                <p className="text-2xl font-bold text-slate-900">7.6%</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-base font-semibold mb-1">Key Performance Indicators</h4>
              <p className="text-xs text-slate-500 mb-4">Critical business metrics at a glance</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Lead Conversion Rate</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-slate-900">18.4% / 20%</span>
                    <div className="text-xs text-green-600 font-medium">+4.2%</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Average Deal Size</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-slate-900">₹28.4K / ₹30K</span>
                    <div className="text-xs text-green-600 font-medium">+8.7%</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Monthly Recurring Revenue</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-slate-900">₹8.9L / ₹10L</span>
                    <div className="text-xs text-green-600 font-medium">+15.3%</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Customer Churn Rate</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-slate-900">2.1% / 1.5%</span>
                    <div className="text-xs text-amber-600 font-medium">-0.8%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-base font-semibold mb-4">Student Metrics</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <KpiMetric 
                  label="Active Students" 
                  value="3,247" 
                  subtext="+28.7% growth rate" 
                />
                
                <KpiMetric 
                  label="Completion Rate" 
                  value="89.1%" 
                  subtext="2890 completions" 
                />
                
                <KpiMetric 
                  label="Satisfaction Score" 
                  value="4.8/5" 
                  subtext="NPS: 73 score" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student & Lead Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Overview */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Student Overview</CardTitle>
            <CardDescription>Active, inactive, and dropped students for the selected period.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie 
                  data={studentData[timeRange]} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5} 
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {studentData[timeRange].map(entry => <Cell key={entry.name} fill={entry.fill} />)}
                </Pie>
                <Tooltip content={<StudentDetailTooltip />} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  formatter={(value, entry) => (
                    <span className="text-sm font-medium">{value}: {entry.payload.value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Student Status Trend</h4>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={currentStudentTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={
                      timeRange === 'last-30-days' ? 'day' : 
                      timeRange === 'last-3-months' ? 'month' : 'quarter'
                    } 
                    tick={{fontSize: 12}}
                  />
                  <YAxis tick={{fontSize: 12}} width={30} />
                  <Tooltip />
                  <Line type="monotone" dataKey="active" stroke="#00C49F" strokeWidth={2} />
                  <Line type="monotone" dataKey="inactive" stroke="#FFBB28" strokeWidth={2} />
                  <Line type="monotone" dataKey="dropped" stroke="#FF8042" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Lead & Conversion Analysis */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Lead & Conversion Analysis</CardTitle>
            <CardDescription>Tracking lead generation trends and conversion performance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Lead Generation Trends</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={currentLeadData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={
                    timeRange === 'last-30-days' ? 'day' : 
                    timeRange === 'last-3-months' ? 'month' : 'year'
                  } />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Object.keys(COLORS).slice(0, 5).map(source => (
                    <Line key={source} type="monotone" dataKey={source} stroke={COLORS[source]} strokeWidth={2} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Conversion Performance</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={currentLeadData.summary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip content={<ConversionTooltip />} />
                  <Legend />
                  <Bar dataKey="leads" fill="#a0aec0" name="Leads Generated" />
                  <Bar dataKey="conversions" fill="#48bb78" name="Successful Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Engagement Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Student Engagement Levels</CardTitle>
            <CardDescription>Breakdown of student engagement with course materials</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentEngagementData[timeRange]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Students">
                  {studentEngagementData[timeRange].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-slate-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-700">Avg. Course Completion</h4>
                <p className="text-2xl font-bold text-slate-900">68%</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-700">Avg. Weekly Activity</h4>
                <p className="text-2xl font-bold text-slate-900">3.2 hrs</p>
              </div>
            </div>
          </CardContent>
        </Card>
          
        {/* Top Performing Courses */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
            <CardDescription>Ranked by revenue and student engagement.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPerformingCourses} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis dataKey="shortName" type="category" width={80} stroke="#334155" />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(241, 245, 249, 0.5)'}} />
                <Bar dataKey="revenue" name="Revenue">
                  {topPerformingCourses.map((entry) => (
                    <Cell key={`cell-${entry.id}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ConversionTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const conversionRate = ((data.conversions / data.leads) * 100).toFixed(1);
        return (
            <div className="p-2 bg-background border rounded-lg shadow-lg">
                <p className="font-bold text-lg">{label}</p>
                <p className="text-sm" style={{color: '#a0aec0'}}>Leads: {data.leads}</p>
                <p className="text-sm" style={{color: '#48bb78'}}>Conversions: {data.conversions}</p>
                <p className="text-sm font-bold flex items-center text-blue-500">
                   <Percent className="h-4 w-4 mr-1" /> {conversionRate}% Conversion Rate
                </p>
            </div>
        );
    }
    return null;
};


export default SummaryReportsPage; 