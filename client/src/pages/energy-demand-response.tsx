import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingDown, ArrowRight, CheckCircle2, ChevronLeft,
  Thermometer, Zap, Bell, DollarSign, Clock,
  Shield, Users, Calendar,
  Info, PlugZap,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";

interface Device {
  id: string;
  name: string;
  description: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  connected: boolean;
}

const DEVICES: Device[] = [
  {
    id: "thermostat",
    name: "Smart Thermostat",
    description: "Received at your free energy checkup",
    icon: Thermometer,
    iconBg: "bg-[hsl(var(--brand-orange))]/10",
    iconColor: "text-[hsl(var(--brand-orange))]",
    connected: true,
  },
  {
    id: "ev-charger",
    name: "Level 2 EV Charger",
    description: "Charges during off-peak hours",
    icon: PlugZap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    connected: false,
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "We notify you",
    description: "On high-demand days (typically 6–8 times/year), you'll get a heads-up the night before via app or text.",
    icon: Bell,
    color: "bg-teal-100",
    iconColor: "text-teal-700",
  },
  {
    step: "2",
    title: "Your devices adjust",
    description: "Your smart thermostat pre-cools your home before the event, then dials back slightly during peak hours.",
    icon: Thermometer,
    color: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    step: "3",
    title: "You earn credits",
    description: "After each event, credits are automatically applied to your PSE&G bill. No action needed.",
    icon: DollarSign,
    color: "bg-[hsl(var(--brand-orange))]/10",
    iconColor: "text-[hsl(var(--brand-orange))]",
  },
];

const PAST_EVENTS = [
  { date: "Jul 24, 2025", time: "2 PM – 7 PM", duration: "5 hrs", credit: "$14.50", status: "credited" },
  { date: "Aug 8, 2025", time: "3 PM – 6 PM", duration: "3 hrs", credit: "$10.00", status: "credited" },
];

export default function EnergyDemandResponse() {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [deviceToggles, setDeviceToggles] = useState<Record<string, boolean>>({
    thermostat: true,
    "ev-charger": false,
  });

  const totalCredits = PAST_EVENTS.reduce((sum, e) => sum + parseFloat(e.credit.replace("$", "")), 0);

  function handleEnroll() {
    setEnrolling(true);
    setTimeout(() => {
      setEnrolled(true);
      setEnrolling(false);
    }, 900);
  }

  function toggleDevice(id: string) {
    setDeviceToggles(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-14 relative z-10 max-w-6xl">
          <Link href="/energy">
            <a className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to My Energy Plan
            </a>
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/20 text-teal-300 text-xs font-semibold mb-4">
            <TrendingDown className="w-3.5 h-3.5" /> Demand Response
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Get Paid to Save Energy
          </h1>
          <p className="text-white/70 text-base max-w-xl mb-6">
            Earn bill credits when the grid gets busy. You enroll once — your smart devices handle the rest automatically. Most customers never notice the difference.
          </p>
          <div className="flex flex-wrap gap-5">
            {[
              { icon: DollarSign, text: "Up to $120/year in credits" },
              { icon: Users, text: "213,000+ customers enrolled" },
              { icon: Zap, text: "6–8 events per year" },
              { icon: Shield, text: "Cancel anytime" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-white/70">
                <Icon className="w-4 h-4 text-teal-400" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">

        {/* How it works */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-5">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map(({ step, title, description, icon: Icon, color, iconColor }) => (
              <div key={step} className="bg-card border border-border/50 p-5 relative">
                <span className="absolute top-4 right-4 text-4xl font-black text-border/50 select-none">{step}</span>
                <div className={`w-11 h-11 ${color} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment / Enrolled state */}
        <div className="mb-10">
          <AnimatePresence mode="wait">
            {!enrolled ? (
              <motion.div
                key="not-enrolled"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-card border-2 border-teal-200 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-foreground">Enroll in Demand Response</h2>
                        <Badge className="bg-teal-100 text-teal-800 border-none text-xs">1-Click Enroll</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                        Your smart thermostat is already connected. Flip the switch to enroll. On demand response days, your thermostat will pre-cool your home 30 minutes before the event — you may not notice any change in comfort.
                      </p>

                      {/* Devices */}
                      <div className="space-y-3 mb-6">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Your devices</p>
                        {DEVICES.map((device) => {
                          const Icon = device.icon;
                          return (
                            <div key={device.id} className="flex items-center gap-3 p-4 bg-secondary/40 border border-border/30">
                              <div className={`w-10 h-10 ${device.iconBg} flex items-center justify-center shrink-0`}>
                                <Icon className={`w-5 h-5 ${device.iconColor}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground">{device.name}</p>
                                <p className="text-xs text-muted-foreground">{device.description}</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {!device.connected && (
                                  <span className="text-xs text-muted-foreground">Not connected</span>
                                )}
                                <Switch
                                  checked={device.connected && deviceToggles[device.id]}
                                  onCheckedChange={() => device.connected && toggleDevice(device.id)}
                                  disabled={!device.connected}
                                  className="data-[state=checked]:bg-teal-600"
                                />
                              </div>
                            </div>
                          );
                        })}
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" />
                          Add more devices after enrollment in your account settings.
                        </p>
                      </div>

                      {/* Credit estimate */}
                      <div className="bg-teal-50 border border-teal-100 p-4 mb-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-teal-900">Your estimated annual credit</p>
                            <p className="text-xs text-teal-700 mt-0.5">Based on 7 events/year and your current thermostat</p>
                          </div>
                          <p className="text-2xl font-bold text-teal-700">~$85</p>
                        </div>
                      </div>

                      <Button
                        onClick={handleEnroll}
                        disabled={enrolling}
                        className="w-full md:w-auto h-12 px-8 bg-teal-600 hover:bg-teal-700 text-white text-base font-semibold"
                      >
                        {enrolling ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Enrolling...
                          </span>
                        ) : (
                          <>Enroll Now — It's Free <ArrowRight className="w-4 h-4 ml-1" /></>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        No commitment. Cancel anytime from your account settings.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="enrolled"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Enrolled dashboard */}
                <div className="flex items-center gap-3 p-5 bg-teal-50 border border-teal-200 mb-6">
                  <div className="w-10 h-10 bg-teal-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-teal-900">You're enrolled in Demand Response</p>
                    <p className="text-sm text-teal-700">Smart thermostat is active. Credits will appear on your bill after each event.</p>
                  </div>
                  <Badge className="bg-teal-600 text-white border-none">Active</Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-card border border-border/50 p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">${totalCredits.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Credits earned</p>
                  </div>
                  <div className="bg-card border border-border/50 p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">{PAST_EVENTS.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">Events this year</p>
                  </div>
                  <div className="bg-card border border-border/50 p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">0</p>
                    <p className="text-xs text-muted-foreground mt-1">Events upcoming</p>
                  </div>
                </div>

                {/* Connected devices */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Connected Devices</h3>
                  <div className="space-y-2">
                    {DEVICES.map((device) => {
                      const Icon = device.icon;
                      const isActive = device.connected && deviceToggles[device.id];
                      return (
                        <div key={device.id} className="flex items-center gap-3 p-4 bg-card border border-border/50">
                          <div className={`w-9 h-9 ${device.iconBg} flex items-center justify-center shrink-0`}>
                            <Icon className={`w-4 h-4 ${device.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{device.name}</p>
                            <p className="text-xs text-muted-foreground">{device.description}</p>
                          </div>
                          {device.connected ? (
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-medium ${isActive ? "text-teal-700" : "text-muted-foreground"}`}>
                                {isActive ? "Active" : "Paused"}
                              </span>
                              <Switch
                                checked={isActive}
                                onCheckedChange={() => toggleDevice(device.id)}
                                className="data-[state=checked]:bg-teal-600"
                              />
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">Not connected</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Event History */}
                <div>
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Event History</h3>
                  <div className="bg-card border border-border/50 divide-y divide-border/40">
                    {PAST_EVENTS.map((event, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{event.date}</p>
                            <p className="text-xs text-muted-foreground">{event.time} · {event.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-[hsl(var(--brand-orange))]">{event.credit}</span>
                          <Badge className="bg-[hsl(var(--brand-orange))]/10 text-[hsl(var(--brand-orange))] border-none text-xs capitalize">
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {PAST_EVENTS.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-6">No events yet this season.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FAQ */}
        <div className="bg-secondary/30 border border-border/50 p-6">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Common Questions</h3>
          <div className="space-y-4">
            {[
              {
                q: "Will my home be uncomfortable during an event?",
                a: "Your thermostat pre-cools your home 30 minutes before the event begins, so the temperature barely changes. Most customers report no difference in comfort.",
              },
              {
                q: "What if I'm having guests or it's a special occasion?",
                a: "You can opt out of any individual event from the app or your account. No penalty, no questions asked.",
              },
              {
                q: "How do I get my credits?",
                a: "Credits are automatically applied to your PSE&G bill after each event — usually within one billing cycle.",
              },
              {
                q: "How do I cancel?",
                a: "You can cancel anytime from your account settings. Any credits already earned are yours to keep.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="text-sm font-semibold text-foreground mb-1">{q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
