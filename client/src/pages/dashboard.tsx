import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
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
  ArrowRight,
  Snowflake,
  Droplets,
  Lightbulb,
  Tv,
  Power,
  Receipt,
  Clock,
  RefreshCw,
  ShieldCheck,
  DollarSign,
  CalendarClock,
  Repeat,
  Flame
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { motion, AnimatePresence } from "framer-motion";

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

const transactionHistory = [
  { date: 'Dec 15, 2025', description: 'Online Payment - Thank You', amount: -142.50, type: 'payment' },
  { date: 'Dec 01, 2025', description: 'Monthly Bill - December', amount: 142.50, type: 'bill' },
  { date: 'Nov 18, 2025', description: 'Online Payment - Thank You', amount: -128.75, type: 'payment' },
  { date: 'Nov 01, 2025', description: 'Monthly Bill - November', amount: 128.75, type: 'bill' },
  { date: 'Oct 20, 2025', description: 'Online Payment - Thank You', amount: -155.20, type: 'payment' },
  { date: 'Oct 01, 2025', description: 'Monthly Bill - October', amount: 155.20, type: 'bill' },
  { date: 'Sep 15, 2025', description: 'Online Payment - Thank You', amount: -98.40, type: 'payment' },
  { date: 'Sep 01, 2025', description: 'Monthly Bill - September', amount: 98.40, type: 'bill' },
  { date: 'Aug 22, 2025', description: 'Late Fee', amount: 5.00, type: 'fee' },
  { date: 'Aug 18, 2025', description: 'Online Payment - Thank You', amount: -178.90, type: 'payment' },
  { date: 'Aug 01, 2025', description: 'Monthly Bill - August', amount: 178.90, type: 'bill' },
  { date: 'Jul 15, 2025', description: 'Online Payment - Thank You', amount: -165.30, type: 'payment' },
];

const gasUsageData = [
  { month: 'Jan', therms: 95, prevYear: 102 },
  { month: 'Feb', therms: 88, prevYear: 94 },
  { month: 'Mar', therms: 62, prevYear: 70 },
  { month: 'Apr', therms: 35, prevYear: 38 },
  { month: 'May', therms: 18, prevYear: 20 },
  { month: 'Jun', therms: 12, prevYear: 14 },
  { month: 'Jul', therms: 10, prevYear: 11 },
];

const disaggregationData = [
  { category: 'Cooling / AC', percentage: 35, icon: Snowflake, color: 'bg-blue-500' },
  { category: 'Water Heating', percentage: 25, icon: Droplets, color: 'bg-brand-orange' },
  { category: 'Lighting', percentage: 15, icon: Lightbulb, color: 'bg-yellow-400' },
  { category: 'Appliances', percentage: 15, icon: Tv, color: 'bg-purple-500' },
  { category: 'Always On', percentage: 10, icon: Power, color: 'bg-slate-400' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);
  const [showEqualPayConfirm, setShowEqualPayConfirm] = useState(false);
  const [equalPayEnrolled, setEqualPayEnrolled] = useState(false);
  const [autoPayEnrolled, setAutoPayEnrolled] = useState(false);
  const { user } = useAuth();
  const displayName = user?.firstName || "Alex";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 px-4 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Good Morning, {displayName}</h1>
              <p className="text-muted-foreground">Account #{user?.accountNumber || "123456789"} • {user?.address || "123 Maple Avenue"}, {user?.city || "Springfield"}, {user?.state || "NJ"}</p>
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
              <TabsList className="bg-card/80 backdrop-blur-sm p-1 border border-border/50 shadow-sm h-auto w-full md:w-auto overflow-x-auto flex-nowrap justify-start rounded-none mb-6">
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
                <Card className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
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
                         <Button variant="outline" className="flex-1 text-xs h-10 bg-secondary/50 hover:bg-secondary transition-colors">View PDF</Button>
                         <Button variant="outline" className="flex-1 text-xs h-10 bg-secondary/50 hover:bg-secondary transition-colors">History</Button>
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
                <Card className="col-span-1 md:col-span-1 lg:col-span-2 bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
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
                <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center text-center">
                   <CardContent className="p-6">
                     <Calendar className="w-8 h-8 text-primary mx-auto mb-3 opacity-80" />
                     <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Next Meter Read</p>
                     <p className="text-xl font-bold text-foreground">Jan 15</p>
                   </CardContent>
                </Card>
              </div>

              {/* Energy Savings CTA */}
              <div className="mt-6 mb-4">
                <Card className="bg-gradient-to-r from-green-600 to-emerald-800 text-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                  <CardContent className="p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
                        <Leaf className="w-3 h-3" /> New Programs Available
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">Stop paying for wasted energy.</h2>
                      <p className="text-green-50 text-lg max-w-2xl">
                        Get up to $7,500 in rebates and a free home energy assessment. See which programs you qualify for and start saving today.
                      </p>
                    </div>
                    <Button className="bg-white text-green-700 hover:bg-green-50 shadow-lg px-8 py-6 text-lg rounded-xl whitespace-nowrap shrink-0 transition-transform hover:scale-105" onClick={() => setActiveTab("programs")}>
                      Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations Bento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-6 p-6 bg-card border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="p-4 bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-foreground text-lg mb-1 group-hover:text-brand-orange transition-colors">Equal Payment Plan</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed">Avoid seasonal spikes. Pay exactly <span className="font-semibold text-foreground px-1 py-0.5 bg-secondary/50">$115/mo</span> based on history.</p>
                  </div>
                  <div className="w-10 h-10 bg-secondary/50 flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-orange transition-colors" />
                  </div>
                </div>
                
                <div className="flex items-center gap-6 p-6 bg-card border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="p-4 bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-foreground text-lg mb-1 group-hover:text-purple-600 transition-colors">Get Outage Alerts</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed">Stay informed. Get instant SMS updates directly to your phone if power goes out.</p>
                  </div>
                  <div className="w-10 h-10 bg-secondary/50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* USAGE TAB */}
            <TabsContent value="usage" className="space-y-4">

              {/* Electric Section */}
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-primary/10 rounded-none">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Electric Usage</h3>
                <Badge className="bg-green-100 text-green-700 border-none text-xs ml-2">Smart Meter</Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                <Card className="lg:col-span-2 bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">Smart Meter Analysis</CardTitle>
                        <CardDescription>Real-time electric consumption (kWh)</CardDescription>
                      </div>
                      <div className="flex gap-2 bg-secondary/50 p-1 rounded-none">
                        <Button variant="ghost" size="sm" className="bg-primary text-white hover:bg-primary/90 hover:text-white shadow-sm rounded-none">Yearly</Button>
                        <Button variant="ghost" size="sm" className="hover:bg-secondary rounded-none">Monthly</Button>
                        <Button variant="ghost" size="sm" className="hover:bg-secondary rounded-none">Daily</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[350px] pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={usageData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} unit=" kWh" />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
                          cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="kwh" name="This Year (kWh)" fill="#142C41" radius={[6, 6, 0, 0]} barSize={28} />
                        <Bar dataKey="prevYear" name="Last Year (kWh)" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={28} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-1 bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">Where Your Energy Goes</CardTitle>
                    <CardDescription>Estimated electric breakdown this month</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between pt-2">
                    <div className="space-y-5">
                      {disaggregationData.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2 font-medium text-foreground">
                              <item.icon className="w-4 h-4 text-muted-foreground" />
                              {item.category}
                            </div>
                            <span className="font-bold">{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <motion.div 
                              className={`h-full ${item.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-6 bg-secondary/50 hover:bg-secondary transition-colors text-sm">
                      View Ways to Save
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Gas Section */}
              <div className="flex items-center gap-2 mt-8 mb-2">
                <div className="p-1.5 bg-brand-orange/10 rounded-none">
                  <Flame className="w-4 h-4 text-brand-orange" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Gas Usage</h3>
                <Badge variant="outline" className="text-xs ml-2 border-slate-300">Monthly Read</Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2 bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">Monthly Gas Consumption</CardTitle>
                        <CardDescription>Based on monthly meter readings (therms)</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[300px] pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gasUsageData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} unit=" thm" />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
                          cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="therms" name="This Year (Therms)" fill="#F0512C" radius={[6, 6, 0, 0]} barSize={28} />
                        <Bar dataKey="prevYear" name="Last Year (Therms)" fill="#fecaca" radius={[6, 6, 0, 0]} barSize={28} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-1 bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">Gas Insights</CardTitle>
                    <CardDescription>Your natural gas summary</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="p-4 bg-brand-orange/5 rounded-none border border-brand-orange/10">
                        <p className="text-xs text-muted-foreground mb-1">This Month</p>
                        <p className="text-2xl font-bold text-foreground">10 therms</p>
                        <p className="text-xs text-green-600 font-medium mt-1">9% less than last year</p>
                      </div>
                      <div className="p-4 bg-secondary/50 rounded-none border border-border/50">
                        <p className="text-xs text-muted-foreground mb-1">12-Month Average</p>
                        <p className="text-2xl font-bold text-foreground">46 therms</p>
                      </div>
                      <div className="p-4 bg-secondary/50 rounded-none border border-border/50">
                        <p className="text-xs text-muted-foreground mb-1">Next Meter Read</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm font-semibold text-foreground">Jan 20, 2026</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bottom Row */}
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">Daily Insights</CardTitle>
                    <CardDescription>Electric smart meter data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-green-50/80 rounded-none border border-green-100">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-green-100 rounded-none">
                             <Calendar className="w-5 h-5 text-green-700" />
                           </div>
                           <span className="font-medium text-green-900 text-sm">Lowest Usage Day</span>
                        </div>
                        <span className="font-bold text-green-900">Sundays</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-amber-50/80 rounded-none border border-amber-100">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-amber-100 rounded-none">
                             <Zap className="w-5 h-5 text-amber-700" />
                           </div>
                           <span className="font-medium text-amber-900 text-sm">Peak Hours</span>
                        </div>
                        <span className="font-bold text-amber-900">5–8 PM</span>
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
                     <p className="text-sm text-slate-300 mb-6">Export your Green Button electric data or gas usage records for analysis.</p>
                     <div className="flex gap-2">
                       <Button className="flex-1 gap-2 bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm text-xs">
                         <Zap className="w-3 h-3" /> Electric Data
                       </Button>
                       <Button className="flex-1 gap-2 bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm text-xs">
                         <Flame className="w-3 h-3" /> Gas Data
                       </Button>
                     </div>
                   </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* BILLING TAB */}
            <TabsContent value="billing" className="space-y-6">

              {/* Quick Actions Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Equal Payment Plan */}
                <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-primary/10 rounded-none text-primary shrink-0">
                        <RefreshCw className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">Equal Payment Plan</h3>
                        <p className="text-xs text-muted-foreground mb-3">Pay the same amount every month based on your usage history.</p>
                        {equalPayEnrolled ? (
                          <div className="space-y-2">
                            <Badge className="bg-green-100 text-green-700 border-none">Enrolled</Badge>
                            <p className="text-xs text-muted-foreground">Your monthly amount: <span className="font-bold text-foreground">$115.00/mo</span></p>
                          </div>
                        ) : showEqualPayConfirm ? (
                          <div className="space-y-3">
                            <div className="bg-primary/5 p-3 rounded-none border border-primary/10">
                              <p className="text-xs text-muted-foreground mb-1">Estimated monthly amount</p>
                              <p className="text-xl font-bold text-primary">$115.00/mo</p>
                              <p className="text-xs text-muted-foreground mt-1">Based on your 12-month average</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 text-xs" onClick={() => { setEqualPayEnrolled(true); setShowEqualPayConfirm(false); }} data-testid="button-confirm-equal-pay">Confirm</Button>
                              <Button size="sm" variant="ghost" className="text-xs" onClick={() => setShowEqualPayConfirm(false)}>Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <Button size="sm" variant="outline" className="text-xs w-full bg-secondary/50" onClick={() => setShowEqualPayConfirm(true)} data-testid="button-enroll-equal-pay">
                            Enroll Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Deferred Payment */}
                <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-brand-orange/10 rounded-none text-brand-orange shrink-0">
                        <CalendarClock className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">Deferred Payment</h3>
                        <p className="text-xs text-muted-foreground mb-3">Split your balance over several months with a custom arrangement.</p>
                        <Link href="/payment-arrangement">
                          <Button size="sm" variant="outline" className="text-xs w-full bg-secondary/50" data-testid="button-deferred-payment">
                            Set Up Arrangement
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AutoPay */}
                <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-green-100 rounded-none text-green-600 shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">AutoPay</h3>
                        <p className="text-xs text-muted-foreground mb-3">Never miss a payment. We'll charge your account automatically each month.</p>
                        {autoPayEnrolled ? (
                          <div className="space-y-2">
                            <Badge className="bg-green-100 text-green-700 border-none">Active</Badge>
                            <p className="text-xs text-muted-foreground">Charged to Visa •••• 4821</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">Enable AutoPay</span>
                              <Switch checked={autoPayEnabled} onCheckedChange={setAutoPayEnabled} data-testid="switch-autopay" />
                            </div>
                            {autoPayEnabled && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                                <div className="bg-green-50/80 p-3 rounded-none border border-green-100 text-xs text-green-800">
                                  Your bill will be automatically paid from your default payment method on the due date each month.
                                </div>
                                <Button size="sm" className="w-full text-xs bg-green-600 hover:bg-green-700" onClick={() => { setAutoPayEnrolled(true); setAutoPayEnabled(false); }} data-testid="button-confirm-autopay">
                                  Activate AutoPay
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History */}
              <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">Transaction History</CardTitle>
                      <CardDescription>Your recent billing activity</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="bg-secondary/50 gap-2 self-start" data-testid="button-download-history">
                      <Download className="w-4 h-4" /> Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0 divide-y divide-border/50">
                    {transactionHistory.map((tx, i) => (
                      <div key={i} className="flex items-center justify-between py-3.5 px-2 hover:bg-secondary/30 transition-colors" data-testid={`row-transaction-${i}`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-none ${
                            tx.type === 'payment' ? 'bg-green-100 text-green-600' :
                            tx.type === 'fee' ? 'bg-red-100 text-red-600' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {tx.type === 'payment' ? <DollarSign className="w-4 h-4" /> :
                             tx.type === 'fee' ? <AlertTriangle className="w-4 h-4" /> :
                             <Receipt className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{tx.description}</p>
                            <p className="text-xs text-muted-foreground">{tx.date}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-semibold tabular-nums ${
                          tx.amount < 0 ? 'text-green-600' : tx.type === 'fee' ? 'text-red-600' : 'text-foreground'
                        }`}>
                          {tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                    <Button variant="ghost" className="text-sm text-primary" data-testid="button-view-all-transactions">
                      View All Transactions <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </TabsContent>

            {/* PROGRAMS TAB */}
            <TabsContent value="programs" className="space-y-6">
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Available Rebates & Programs</h3>
                <p className="text-muted-foreground">Take advantage of these offers to lower your bill and make your home more comfortable.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Program 1 */}
                 <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-3">
                            <div className="p-2.5 bg-green-100 rounded-xl text-green-600">
                              <Home className="w-6 h-6" />
                            </div>
                            Whole Home Energy Solutions
                         </CardTitle>
                       </div>
                       <CardDescription className="pt-3 text-sm">
                         Get a comprehensive home energy assessment, up to $7,500 in rebates, and interest-free financing for upgrades.
                       </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-4">
                       <Button variant="default" className="w-full bg-green-600 hover:bg-green-700 shadow-md">Apply Now</Button>
                    </CardFooter>
                 </Card>

                 {/* Program 2 */}
                 <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
                              <Snowflake className="w-6 h-6" />
                            </div>
                            HVAC Instant Rebates
                         </CardTitle>
                       </div>
                       <CardDescription className="pt-3 text-sm">
                         Save up to $900 instantly on ENERGY STAR® certified heat pumps, mini-splits, and central AC systems.
                       </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-4">
                       <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">Find a Contractor</Button>
                    </CardFooter>
                 </Card>

                 {/* Program 3 */}
                 <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-3">
                            <div className="p-2.5 bg-brand-orange/10 rounded-xl text-brand-orange">
                              <Tv className="w-6 h-6" />
                            </div>
                            Appliance Rebates
                         </CardTitle>
                       </div>
                       <CardDescription className="pt-3 text-sm">
                         Get cash back when you purchase qualifying energy-efficient appliances, like dehumidifiers and smart thermostats.
                       </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-4">
                       <Button variant="outline" className="w-full border-brand-orange/30 text-brand-orange hover:bg-brand-orange/10">Shop Appliances</Button>
                    </CardFooter>
                 </Card>

                 {/* Program 4 */}
                 <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-3">
                            <div className="p-2.5 bg-purple-100 rounded-xl text-purple-600">
                              <Power className="w-6 h-6" />
                            </div>
                            Appliance Recycling
                         </CardTitle>
                       </div>
                       <CardDescription className="pt-3 text-sm">
                         Schedule a free pickup for your old, working refrigerator or freezer and receive a cash rebate.
                       </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-4">
                       <Button variant="outline" className="w-full">Schedule Pickup</Button>
                    </CardFooter>
                 </Card>

                 {/* Program 5 */}
                 <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-3">
                            <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            Comfort Partners
                         </CardTitle>
                       </div>
                       <CardDescription className="pt-3 text-sm">
                         Free energy-saving improvements and education for income-eligible customers to help reduce utility bills.
                       </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-4">
                       <Button variant="outline" className="w-full">Check Eligibility</Button>
                    </CardFooter>
                 </Card>

                 {/* Existing Account Program */}
                 <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300"></div>
                    <CardHeader>
                       <div className="flex justify-between items-start">
                         <CardTitle className="flex items-center gap-3">
                            <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600">
                              <Leaf className="w-6 h-6" />
                            </div>
                            Paperless Billing
                         </CardTitle>
                         <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none shadow-none">Enrolled</Badge>
                       </div>
                       <CardDescription className="pt-3 text-sm">Saving trees and reducing clutter.</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-4">
                       <Button variant="ghost" className="w-full text-muted-foreground bg-secondary/50 hover:bg-secondary">Manage Settings</Button>
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
