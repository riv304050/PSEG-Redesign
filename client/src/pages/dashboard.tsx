import { useState } from "react";
import { Link } from "wouter";
import { 
  Zap, 
  Home, 
  CreditCard, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  Download, 
  Leaf, 
  Smartphone, 
  Calendar,
  CheckCircle2,
  Bell,
  BarChart3,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Mock Data
const usageData = [
  { month: 'Jan', kwh: 450, prevYear: 480 },
  { month: 'Feb', kwh: 420, prevYear: 460 },
  { month: 'Mar', kwh: 380, prevYear: 400 },
  { month: 'Apr', kwh: 350, prevYear: 360 },
  { month: 'May', kwh: 320, prevYear: 310 },
  { month: 'Jun', kwh: 550, prevYear: 520 },
  { month: 'Jul', kwh: 780, prevYear: 750 },
];

const dailyData = [
  { time: '12am', kwh: 0.5 }, { time: '4am', kwh: 0.4 }, 
  { time: '8am', kwh: 1.2 }, { time: '12pm', kwh: 1.5 },
  { time: '4pm', kwh: 2.1 }, { time: '8pm', kwh: 1.8 },
  { time: '11pm', kwh: 0.9 }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Good Morning, Alex</h1>
              <p className="text-muted-foreground">Account #123456789 • 123 Maple Avenue, Springfield, NJ</p>
            </div>
            <div className="flex gap-3">
               <Button variant="outline" className="gap-2">
                 <Settings className="w-4 h-4" /> Manage Profile
               </Button>
               <Button variant="outline" className="gap-2">
                 <Bell className="w-4 h-4" /> Alerts (2)
               </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
            <TabsList className="bg-white p-1 border h-auto w-full md:w-auto overflow-x-auto flex-nowrap justify-start">
              <TabsTrigger value="overview" className="px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="usage" className="px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">Usage & Smart Meter</TabsTrigger>
              <TabsTrigger value="billing" className="px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">Billing & Payments</TabsTrigger>
              <TabsTrigger value="programs" className="px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">My Programs</TabsTrigger>
            </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="space-y-6">
              
              {/* Primary Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Bill Card */}
                <Card className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Bill</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-bold text-foreground">$142.50</span>
                    </div>
                    <p className="text-sm font-medium text-red-600 mb-6">Due in 3 days (Dec 26)</p>
                    
                    <div className="flex flex-col gap-3">
                       <Button className="w-full h-11 text-base shadow-lg shadow-primary/20">Pay Bill Now</Button>
                       <div className="flex gap-2">
                         <Button variant="outline" className="flex-1 text-xs h-8">View PDF</Button>
                         <Button variant="outline" className="flex-1 text-xs h-8">History</Button>
                       </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage Snapshot */}
                <Card className="border-t-4 border-t-green-500 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Efficiency Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold">Good Job!</p>
                        <p className="text-sm text-muted-foreground">You used 5% less than last month.</p>
                      </div>
                    </div>
                    
                    <div className="h-[100px] w-full mt-2">
                       <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={usageData.slice(-4)}>
                          <defs>
                            <linearGradient id="colorUsageMini" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="kwh" stroke="#16a34a" fillOpacity={1} fill="url(#colorUsageMini)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <Button variant="link" className="px-0 text-green-700 font-semibold" onClick={() => setActiveTab("usage")}>
                      View Detailed Analysis <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Outage Status */}
                <Card className="border-t-4 border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Service Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-6 bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Power is On</span>
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-sm border-b pb-2">
                         <span className="text-muted-foreground">Local Outages</span>
                         <span className="font-medium">0 Reported</span>
                       </div>
                       <div className="flex justify-between items-center text-sm border-b pb-2">
                         <span className="text-muted-foreground">Next Meter Read</span>
                         <span className="font-medium">Jan 15, 2026</span>
                       </div>
                    </div>
                    <Button variant="outline" className="w-full mt-5 gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                      <AlertTriangle className="w-4 h-4" /> Report an Issue
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Smart Recommendations */}
              <div>
                <h3 className="text-lg font-bold mb-4">Recommended for You</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border shadow-sm hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-bold text-foreground">Equal Payment Plan</h4>
                       <p className="text-sm text-muted-foreground mt-1">Avoid seasonal spikes. Pay exactly <span className="font-semibold text-foreground">$115/mo</span> based on your history.</p>
                       <Button variant="link" className="px-0 h-auto mt-2 font-semibold">Enroll Now</Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border shadow-sm hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-bold text-foreground">Get Outage Alerts</h4>
                       <p className="text-sm text-muted-foreground mt-1">You aren't subscribed to text alerts. Get instant updates if power goes out.</p>
                       <Button variant="link" className="px-0 h-auto mt-2 font-semibold">Turn on SMS Alerts</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* USAGE TAB */}
            <TabsContent value="usage" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Smart Meter Analysis</CardTitle>
                      <CardDescription>Your energy consumption over time</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary/90 hover:text-white">Yearly</Button>
                      <Button variant="ghost" size="sm">Monthly</Button>
                      <Button variant="ghost" size="sm">Daily</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                      />
                      <Legend />
                      <Bar dataKey="kwh" name="Current Year" fill="#142C41" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="prevYear" name="Last Year" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center gap-3">
                           <Calendar className="w-5 h-5 text-green-700" />
                           <span className="font-medium text-green-900">Lowest Usage Day</span>
                        </div>
                        <span className="font-bold text-green-900">Sundays</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <div className="flex items-center gap-3">
                           <Zap className="w-5 h-5 text-amber-700" />
                           <span className="font-medium text-amber-900">Peak Hours</span>
                        </div>
                        <span className="font-bold text-amber-900">5:00 PM - 8:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                   <CardHeader>
                     <CardTitle>Download Data</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <p className="text-sm text-muted-foreground mb-4">Export your Green Button data for third-party analysis or personal records.</p>
                     <Button variant="outline" className="w-full gap-2">
                       <Download className="w-4 h-4" /> Download XML / CSV
                     </Button>
                   </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* BILLING TAB */}
            <TabsContent value="billing">
               <Card>
                 <CardContent className="p-12 text-center text-muted-foreground">
                   Billing History and Payment Options Component Placeholders
                 </CardContent>
               </Card>
            </TabsContent>

            {/* PROGRAMS TAB */}
            <TabsContent value="programs" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                 {/* Enrolled Program */}
                 <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-green-600" />
                            Paperless Billing
                         </CardTitle>
                         <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Enrolled</Badge>
                       </div>
                       <CardDescription>Saving trees and reducing clutter.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                       <Button variant="link" className="px-0 text-muted-foreground">Manage Settings</Button>
                    </CardFooter>
                 </Card>

                 {/* Available Program */}
                 <Card>
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-primary" />
                            AutoPay
                         </CardTitle>
                         <Badge variant="outline">Not Enrolled</Badge>
                       </div>
                       <CardDescription>Never miss a due date again.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                       <Button variant="default" size="sm">Enroll Now</Button>
                    </CardFooter>
                 </Card>

                 {/* Available Program */}
                 <Card>
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Equal Payment Plan
                         </CardTitle>
                         <Badge variant="outline">Not Enrolled</Badge>
                       </div>
                       <CardDescription>Predictable monthly bills.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                       <Button variant="default" size="sm">Enroll Now</Button>
                    </CardFooter>
                 </Card>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
