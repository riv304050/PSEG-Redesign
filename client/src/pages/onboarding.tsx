import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle, Leaf, Smartphone, CalendarClock, CreditCard, ArrowRight, X } from "lucide-react";
import { Header } from "@/components/layout/header";

const steps = [
  {
    id: "alerts",
    title: "Stay in the Know",
    description: "Get real-time updates about your service when it matters most.",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-100",
    options: [
      { id: "outage_alerts", label: "Outage Alerts", desc: "Text me if power goes out in my area", default: true },
      { id: "billing_alerts", label: "Bill Reminders", desc: "Email me 3 days before due date", default: true },
      { id: "usage_alerts", label: "High Usage Alerts", desc: "Notify me if my usage spikes", default: false },
    ]
  },
  {
    id: "billing",
    title: "Simplify Your Payments",
    description: "Save time and trees with our automated billing options.",
    icon: Leaf,
    color: "text-green-600",
    bg: "bg-green-100",
    options: [
      { id: "paperless", label: "Go Paperless", desc: "Receive bills via email (Save $1/mo)", default: true },
      { id: "autopay", label: "AutoPay", desc: "Automatically deduct from bank account on due date", default: false },
      { id: "epp", label: "Equal Payment Plan", desc: "Pay the same amount every month", default: false },
    ]
  }
];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    outage_alerts: true,
    billing_alerts: true,
    usage_alerts: false,
    paperless: true,
    autopay: false,
    epp: false,
  });

  const handleToggle = (key: string) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setLocation("/dashboard");
    }
  };

  const skipAll = () => {
    setLocation("/dashboard");
  };

  const stepData = steps[currentStep];
  const Icon = stepData.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full grid md:grid-cols-5 bg-card rounded-none shadow-xl overflow-hidden min-h-[500px]">
          
          {/* Left Sidebar / Progress */}
          <div className="col-span-2 bg-primary p-8 text-white flex flex-col justify-between relative overflow-hidden">
             {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[hsl(var(--brand-orange))]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Welcome, Alex!</h2>
              <p className="text-white/80">Let's set up your account for success.</p>
              
              <div className="mt-12 space-y-6">
                {steps.map((step, idx) => (
                  <div key={step.id} className={`flex items-center gap-3 ${idx === currentStep ? "opacity-100" : "opacity-50"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${idx <= currentStep ? "bg-white text-primary border-white" : "border-white/50 text-white"}`}>
                      {idx < currentStep ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span className="font-medium">{step.title}</span>
                  </div>
                ))}
                <div className={`flex items-center gap-3 ${currentStep === steps.length ? "opacity-100" : "opacity-50"}`}>
                   <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-white/50 text-white">
                      <CheckCircle className="w-5 h-5" />
                   </div>
                   <span className="font-medium">All Set!</span>
                </div>
              </div>
            </div>
            
            <div className="relative z-10">
               <p className="text-xs text-white/60">Takes less than 1 minute</p>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="col-span-3 p-8 flex flex-col">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-full ${stepData.bg} ${stepData.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <Button variant="ghost" size="sm" onClick={skipAll} className="text-muted-foreground">Skip Setup</Button>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={stepData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-2">{stepData.title}</h3>
                  <p className="text-muted-foreground mb-8">{stepData.description}</p>

                  <div className="space-y-6">
                    {stepData.options.map((option) => (
                      <div key={option.id} className="flex items-start space-x-4 p-4 rounded-lg border hover:border-primary/50 transition-colors bg-secondary/30">
                        <Switch 
                          id={option.id} 
                          checked={preferences[option.id]}
                          onCheckedChange={() => handleToggle(option.id)}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor={option.id} className="font-semibold text-base cursor-pointer">
                            {option.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {option.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-8 flex justify-end">
              <Button onClick={nextStep} size="lg" className="gap-2 px-8 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white" data-testid="button-next-step">
                {currentStep === steps.length - 1 ? "Finish Setup" : "Next Step"} 
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
