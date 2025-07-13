import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, Users, BookOpen, MapPin, TrendingUp } from "lucide-react";

// Mock Data
const studentDemographicsData = [
    { name: '18-24', value: 400 },
    { name: '25-34', value: 300 },
    { name: '35-44', value: 200 },
    { name: '45+', value: 100 },
];

const coursePreferencesData = [
  { name: 'Medical Coding', students: 450, fill: '#8884d8' },
  { name: 'Academic (K-12)', students: 350, fill: '#83a6ed' },
  { name: 'JEE/NEET Prep', students: 250, fill: '#8dd1e1' },
  { name: 'Medical Billing', students: 200, fill: '#82ca9d' },
];

const studentFunnelData = [
  { stage: 'Awareness', count: 15000, color: '#8884d8' },
  { stage: 'Interest', count: 4500, color: '#83a6ed' },
  { stage: 'Consideration', count: 1200, color: '#8dd1e1' },
  { stage: 'Enrolled', count: 450, color: '#82ca9d' },
  { stage: 'Completed', count: 401, color: '#a4de6c' },
  { stage: 'Advocate', count: 80, color: '#d0ed57' },
];

export function StudentAnalytics() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-start">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">Student Analytics</h2>
           <p className="text-muted-foreground">
             Understanding who your students are and what they want.
           </p>
        </div>
        <Button>
           <Download className="mr-2 h-4 w-4" />
           Export Analytics
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Preferences */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Course Preferences</CardTitle>
                <CardDescription>What are your students most interested in?</CardDescription>
            </CardHeader>
            <CardContent>
                 <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={coursePreferencesData}
                            dataKey="students"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={(props) => `${props.name} (${props.percent.toFixed(0)}%)`}
                        >
                            {coursePreferencesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} students`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        
        {/* Student Demographics */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Student Demographics (Age)</CardTitle>
                <CardDescription>Age distribution of enrolled students.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={studentDemographicsData} layout="vertical" margin={{ left: 10, right: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={60} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Number of Students" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>

      {/* Student Conversion Funnel */}
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Student Journey Funnel</CardTitle>
            <CardDescription>From initial awareness to course advocacy.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="w-full flex flex-col items-center space-y-1">
                 {studentFunnelData.map((item, index) => {
                    const prevCount = index > 0 ? studentFunnelData[index-1].count : item.count;
                    const conversionRate = index > 0 ? (item.count / prevCount * 100).toFixed(1) : 100;

                    return (
                        <div key={item.stage} className="flex flex-col items-center w-full">
                           {index > 0 && (
                                <div className="text-center text-xs text-muted-foreground my-1">
                                    ▼ {conversionRate}%
                                </div>
                           )}
                            <div 
                                style={{ 
                                    backgroundColor: item.color, 
                                    width: `${Math.max((item.count / studentFunnelData[0].count) * 90, 15)}%`,
                                    minHeight: '40px'
                                }}
                                className="rounded text-white flex items-center justify-center p-2 text-center font-bold shadow-md transition-all duration-300 ease-in-out"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full px-4">
                                  <span>{item.stage}</span>
                                  <span className="text-sm opacity-90">{item.count.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )
                 })}
            </div>
        </CardContent>
      </Card>
    </div>
  );
} 