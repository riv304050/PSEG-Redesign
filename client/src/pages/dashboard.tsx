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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/50">
      <Header />
      
      <main className="flex-1 py-8 px-4 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          
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
              <TabsList className="bg-white/50 backdrop-blur-sm p-1 border border-white/40 shadow-sm h-auto w-full md:w-auto overflow-x-auto flex-nowrap justify-start rounded-xl mb-6">
                <TabsTrigger value="overview" className="px-6 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">Overview</TabsTrigger>
                <TabsTrigger value="usage" className="px-6 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">Usage & Smart Meter</TabsTrigger>
                <TabsTrigger value="billing" className="px-6 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">Billing & Payments</TabsTrigger>
                <TabsTrigger value="programs" className="px-6 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">My Programs</TabsTrigger>
              </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="space-y-4">
              
              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                
                {/* Bill Card (Large) */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-white/70 backdrop-blur-md border-white/40 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Bill</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-[calc(100%-3rem)] justify-between">
                    <div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-5xl font-bold text-foreground">$142.50</span>
                      </div>
                      <p className="text-sm font-medium text-red-600 mb-6">Due in 3 days (Dec 26)</p>
                    </div>
                    
                    <div className="flex flex-col gap-3 mt-auto">
                       <Button className="w-full h-12 text-base shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Pay Bill Now</Button>
                       <div className="flex gap-2">
                         <Button variant="outline" className="flex-1 text-xs h-10 bg-white/50 hover:bg-white/80 transition-colors">View PDF</Button>
                         <Button variant="outline" className="flex-1 text-xs h-10 bg-white/50 hover:bg-white/80 transition-colors">History</Button>
                       </div>
                       <div className="text-center pt-2">
                         <Link href="/payment-arrangement">
                           <a className="text-xs text-primary hover:underline font-medium">Need help paying? View options</a>
                         </Link>
                       </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage Snapshot */}
                <Card className="col-span-1 md:col-span-1 lg:col-span-2 bg-white/70 backdrop-blur-md border-white/40 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Efficiency Status</CardTitle>
                      <div className="p-2 bg-green-100 rounded-none">
                        <Leaf className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col h-[calc(100%-3.5rem)]">
                    <div>
                      <p className="text-xl font-bold text-foreground mb-1">Good Job!</p>
                      <p className="text-sm text-muted-foreground mb-4">You used 5% less energy than last month.</p>
                    </div>
                    
                    <div className="h-[120px] w-full mt-auto">
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
                    <Button variant="link" className="px-0 mt-4 text-green-700 font-semibold self-start" onClick={() => setActiveTab("usage")}>
                      View Detailed Analysis <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Outage Status */}
                <Card className="col-span-1 md:col-span-1 lg:col-span-1 bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300 relative overflow-hidden group cursor-pointer">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-none group-hover:scale-150 transition-transform duration-500"></div>
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-blue-100 uppercase tracking-wider">Service Status</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 h-[calc(100%-3rem)] flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                      <span className="text-2xl font-bold">Power is On</span>
                    </div>
                    <p className="text-sm text-blue-100 mt-2">0 local outages reported.</p>
                    <div className="mt-4 flex items-center justify-between text-sm border-t border-white/20 pt-4">
                      <span className="text-blue-100">Report Issue</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>

                {/* Next Meter Read */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-white/70 backdrop-blur-md border-white/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center text-center">
                   <CardContent className="p-6">
                     <Calendar className="w-8 h-8 text-primary mx-auto mb-3 opacity-80" />
                     <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Next Meter Read</p>
                     <p className="text-xl font-bold text-foreground">Jan 15</p>
                   </CardContent>
                </Card>
              </div>

              {/* Recommendations Bento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="p-4 rounded-xl bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-foreground text-lg mb-1 group-hover:text-brand-orange transition-colors">Equal Payment Plan</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed">Avoid seasonal spikes. Pay exactly <span className="font-semibold text-foreground px-1 py-0.5 bg-white/50 rounded">$115/mo</span> based on history.</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-orange transition-colors" />
                  </div>
                </div>
                
                <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="p-4 rounded-xl bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-foreground text-lg mb-1 group-hover:text-purple-600 transition-colors">Get Outage Alerts</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed">Stay informed. Get instant SMS updates directly to your phone if power goes out.</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* USAGE TAB */}
            <TabsContent value="usage" className="space-y-4">
              <Card className="bg-white/70 backdrop-blur-md border-white/40 shadow-sm hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">Smart Meter Analysis</CardTitle>
                      <CardDescription>Your energy consumption over time</CardDescription>
                    </div>
                    <div className="flex gap-2 bg-white/50 p-1 rounded-lg">
                      <Button variant="ghost" size="sm" className="bg-primary text-white hover:bg-primary/90 hover:text-white shadow-sm rounded-md">Yearly</Button>
                      <Button variant="ghost" size="sm" className="hover:bg-white/60 rounded-md">Monthly</Button>
                      <Button variant="ghost" size="sm" className="hover:bg-white/60 rounded-md">Daily</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
                        cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="kwh" name="Current Year" fill="#142C41" radius={[6, 6, 0, 0]} barSize={32} />
                      <Bar dataKey="prevYear" name="Last Year" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-white/70 backdrop-blur-md border-white/40 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">Daily Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-green-50/80 rounded-xl border border-green-100 shadow-sm">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-green-100 rounded-lg">
                             <Calendar className="w-5 h-5 text-green-700" />
                           </div>
                           <span className="font-medium text-green-900">Lowest Usage Day</span>
                        </div>
                        <span className="font-bold text-green-900 text-lg">Sundays</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-amber-50/80 rounded-xl border border-amber-100 shadow-sm">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-amber-100 rounded-lg">
                             <Zap className="w-5 h-5 text-amber-700" />
                           </div>
                           <span className="font-medium text-amber-900">Peak Hours</span>
                        </div>
                        <span className="font-bold text-amber-900 text-lg">5:00 PM - 8:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-none shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                   <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                   <CardHeader className="relative z-10">
                     <CardTitle className="text-lg">Download Data</CardTitle>
                   </CardHeader>
                   <CardContent className="relative z-10 flex flex-col h-[calc(100%-4rem)] justify-between">
                     <p className="text-sm text-slate-300 mb-6">Export your Green Button data for third-party analysis or personal records.</p>
                     <Button className="w-full gap-2 bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm">
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
            <TabsContent value="programs" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {/* Enrolled Program */}
                 <Card className="bg-white/70 backdrop-blur-md border-white/40 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-2">
                            <div className="p-2 bg-green-100 rounded-lg text-green-600">
                              <Leaf className="w-5 h-5" />
                            </div>
                            Paperless Billing
                         </CardTitle>
                         <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none shadow-none">Enrolled</Badge>
                       </div>
                       <CardDescription className="pt-2">Saving trees and reducing clutter.</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                       <Button variant="ghost" className="w-full text-muted-foreground bg-white/50 hover:bg-white/80">Manage Settings</Button>
                    </CardFooter>
                 </Card>

                 {/* Available Program */}
                 <Card className="bg-white/70 backdrop-blur-md border-white/40 shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                              <CreditCard className="w-5 h-5" />
                            </div>
                            AutoPay
                         </CardTitle>
                         <Badge variant="outline" className="bg-white/50">Not Enrolled</Badge>
                       </div>
                       <CardDescription className="pt-2">Never miss a due date again.</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                       <Button variant="default" className="w-full shadow-md shadow-primary/20">Enroll Now</Button>
                    </CardFooter>
                 </Card>

                 {/* Available Program */}
                 <Card className="bg-white/70 backdrop-blur-md border-white/40 shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-2">
                            <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                              <TrendingUp className="w-5 h-5" />
                            </div>
                            Equal Payment Plan
                         </CardTitle>
                         <Badge variant="outline" className="bg-white/50">Not Enrolled</Badge>
                       </div>
                       <CardDescription className="pt-2">Predictable monthly bills.</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                       <Button variant="default" className="w-full shadow-md shadow-primary/20">Enroll Now</Button>
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
