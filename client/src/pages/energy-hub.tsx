import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, Home, Zap, ArrowRight, DollarSign, Recycle,
  TrendingDown, ShoppingBag, Award, Clock, Shield, Star,
  ChevronRight, Users, CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

// PSE&G Comfort Partners eligibility — ~225% of Federal Poverty Level (NJ 2024)
const INCOME_THRESHOLDS: Record<string, number> = {
  "1-2": 46000,
  "3-4": 70000,
  "5+": 85000,
};

const HOUSEHOLD_SIZES = [
  { label: "1–2 people", value: "1-2" },
  { label: "3–4 people", value: "3-4" },
  { label: "5 or more", value: "5+" },
];

const INCOME_BRACKETS = [
  { label: "Under $35,000", value: 25000 },
  { label: "$35,000 – $52,000", value: 43000 },
  { label: "$52,000 – $75,000", value: 63000 },
  { label: "$75,000 – $100,000", value: 87000 },
  { label: "Over $100,000", value: 115000 },
];

const journeySteps = [
  { label: "Free Checkup", href: "/energy/home-assessment", icon: Home, desc: "Start here" },
  { label: "Home Upgrades", href: "/energy/home-assessment", icon: Zap, desc: "0% financing" },
  { label: "Rebates", href: "/energy/rebates", icon: DollarSign, desc: "Up to $900 back" },
  { label: "Recycling", href: "/energy/recycling", icon: Recycle, desc: "$50 credit" },
  { label: "Demand Response", href: "/energy/demand-response", icon: TrendingDown, desc: "Earn credits" },
];

const basePrograms = [
  {
    id: "assessment",
    title: "Free Home Energy Checkup",
    description: "One hour, completely free. Walk away with a smart thermostat, LED bulbs, and a custom savings report.",
    badge: "FREE",
    badgeClass: "bg-green-100 text-green-800",
    value: "$250+ in free products",
    cta: "Schedule Now",
    href: "/energy/home-assessment",
    icon: Home,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    featured: true,
    external: false,
  },
  {
    id: "upgrade",
    title: "Home Upgrade Program",
    description: "A licensed contractor goes deep — insulation, HVAC, air sealing. Upgrades go on your bill at 0% interest.",
    badge: "0% FINANCING",
    badgeClass: "bg-blue-100 text-blue-800",
    value: "Up to $7,500 in upgrades",
    cta: "Find a Contractor",
    href: "/energy/home-assessment#contractor",
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    featured: false,
    external: false,
  },
  {
    id: "rebates",
    title: "Rebates & Incentives",
    description: "Get money back on HVAC, appliances, and EV chargers. Your account info is pre-filled — just upload a receipt.",
    badge: "UP TO $900",
    badgeClass: "bg-orange-100 text-orange-800",
    value: "Instant rebates",
    cta: "View Rebates",
    href: "/energy/rebates",
    icon: DollarSign,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    featured: false,
    external: false,
  },
  {
    id: "recycling",
    title: "Appliance Recycling",
    description: "Old fridge or freezer sitting in the basement? We pick it up for free and credit your bill.",
    badge: "$50 CREDIT",
    badgeClass: "bg-purple-100 text-purple-800",
    value: "$25–$50 bill credit",
    cta: "Schedule Pickup",
    href: "/energy/recycling",
    icon: Recycle,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    featured: false,
    external: false,
  },
  {
    id: "demand",
    title: "Demand Response",
    description: "Earn bill credits when the grid gets busy. Enroll once — your smart devices do the rest automatically.",
    badge: "EARN CREDITS",
    badgeClass: "bg-teal-100 text-teal-800",
    value: "Up to $120/year",
    cta: "Enroll in 1 Click",
    href: "/energy/demand-response",
    icon: TrendingDown,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
    featured: false,
    external: false,
  },
  {
    id: "marketplace",
    title: "Energy Marketplace",
    description: "Shop smart thermostats, LED lighting, and efficiency products with exclusive PSE&G customer pricing.",
    badge: "SHOP NOW",
    badgeClass: "bg-slate-100 text-slate-700",
    value: "Customer pricing",
    cta: "Browse Products",
    href: "https://marketplace.pseg.com/",
    icon: ShoppingBag,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    featured: false,
    external: true,
  },
];

const weatherizationProgram = {
  id: "weatherization",
  title: "Home Weatherization Program",
  description: "Based on your household info, you qualify for enhanced benefits — deeper upgrades with little to no out-of-pocket cost.",
  badge: "YOU QUALIFY",
  badgeClass: "bg-emerald-100 text-emerald-800",
  value: "Significantly reduced cost",
  cta: "See Your Benefits",
  href: "/energy/home-assessment#weatherization",
  icon: Award,
  iconBg: "bg-emerald-100",
  iconColor: "text-emerald-700",
  featured: true,
  external: false,
  highlight: true,
};

export default function EnergyHub() {
  const { user } = useAuth();
  const [qualifierStep, setQualifierStep] = useState<"prompt" | "questions" | "done">("prompt");
  const [householdSize, setHouseholdSize] = useState("");
  const [incomeValue, setIncomeValue] = useState(0);
  const [isQualified, setIsQualified] = useState<boolean | null>(null);

  const firstName = user?.firstName || "Alex";

  function handleQualify() {
    if (!householdSize || !incomeValue) return;
    const threshold = INCOME_THRESHOLDS[householdSize] ?? 50000;
    setIsQualified(incomeValue < threshold);
    setQualifierStep("done");
  }

  const programs = isQualified
    ? [basePrograms[0], weatherizationProgram, ...basePrograms.slice(1)]
    : basePrograms;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10 max-w-6xl">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 text-xs font-semibold mb-4">
            <Leaf className="w-3.5 h-3.5" />
            Energy Efficiency Programs
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 max-w-2xl">
            {firstName}'s Home Energy Plan
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mb-8">
            Based on your usage, you could save up to{" "}
            <span className="text-white font-semibold">$1,240 this year</span>.
            We made it easy — most programs take under 5 minutes to start.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: Clock, text: "1-hour free checkup" },
              { icon: DollarSign, text: "Up to $7,500 in rebates" },
              { icon: Shield, text: "0% financing on upgrades" },
              { icon: Star, text: "Avg $847/year saved" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon className="w-4 h-4 text-[hsl(var(--brand-orange))]" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">

        {/* Income Qualifier */}
        <AnimatePresence mode="wait">
          {qualifierStep !== "done" && (
            <motion.div
              key={qualifierStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mb-10"
            >
              {qualifierStep === "prompt" ? (
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 md:p-8 text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-green-200" />
                        <span className="text-green-200 text-xs font-semibold uppercase tracking-wide">Personalize your programs</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold mb-2">Find out what you qualify for</h2>
                      <p className="text-green-100 text-sm max-w-md leading-relaxed">
                        Two quick questions unlock programs you may not know about — including enhanced benefits with little to no out-of-pocket cost.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Button
                        className="bg-white text-green-700 hover:bg-green-50 font-semibold shadow-md"
                        onClick={() => setQualifierStep("questions")}
                      >
                        Check Eligibility <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                      <button
                        className="text-green-200 hover:text-white text-sm underline underline-offset-4 transition-colors"
                        onClick={() => setQualifierStep("done")}
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border/50 p-6 md:p-8">
                  <h2 className="text-lg font-bold text-foreground mb-1">Two quick questions</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    This helps us surface the right programs. Takes about 10 seconds.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3">Household size</p>
                      <div className="flex gap-2">
                        {HOUSEHOLD_SIZES.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => setHouseholdSize(s.value)}
                            className={`flex-1 py-3 px-2 text-sm font-medium border-2 transition-all ${
                              householdSize === s.value
                                ? "border-primary bg-primary text-white"
                                : "border-border bg-background text-foreground hover:border-primary/40"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3">Annual household income</p>
                      <div className="space-y-2">
                        {INCOME_BRACKETS.map((b) => (
                          <button
                            key={b.value}
                            onClick={() => setIncomeValue(b.value)}
                            className={`w-full py-2.5 px-4 text-sm font-medium border-2 text-left transition-all ${
                              incomeValue === b.value
                                ? "border-primary bg-primary text-white"
                                : "border-border bg-background text-foreground hover:border-primary/40"
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={handleQualify}
                      disabled={!householdSize || !incomeValue}
                      className="bg-primary text-white disabled:opacity-40"
                    >
                      See My Programs <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                    <button
                      className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors"
                      onClick={() => setQualifierStep("done")}
                    >
                      Skip for now
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Your information is used only to show relevant programs and is not stored or shared.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Qualification result banners */}
        {qualifierStep === "done" && isQualified === true && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4 p-4 md:p-5 bg-emerald-50 border border-emerald-200"
          >
            <div className="p-2 bg-emerald-100 shrink-0">
              <Award className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-emerald-900">Good news — you qualify for enhanced benefits</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                The Home Weatherization Program covers deeper upgrades with significantly reduced out-of-pocket cost for eligible households.
              </p>
            </div>
            <Link href="/energy/home-assessment#weatherization">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 w-full sm:w-auto">
                See Your Benefits <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </motion.div>
        )}

        {qualifierStep === "done" && isQualified === false && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-start gap-3 p-4 bg-blue-50 border border-blue-100"
          >
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              <span className="font-semibold">You qualify for all standard programs</span> — including the free checkup, up to $7,500 in rebates, and 0% financing on upgrades.
            </p>
          </motion.div>
        )}

        {/* Journey Stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-foreground">Your Energy Journey</h2>
            <span className="text-xs text-muted-foreground">Start anywhere — we recommend starting with your free checkup</span>
          </div>
          <div className="overflow-x-auto pb-1 -mx-4 px-4">
            <div className="flex items-start gap-0 min-w-max">
              {journeySteps.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <Link href={step.href}>
                    <a className="flex flex-col items-center gap-2 px-3 group">
                      <div className={`w-11 h-11 flex items-center justify-center border-2 transition-all duration-200 ${
                        i === 0
                          ? "bg-primary border-primary text-white shadow-md"
                          : "border-border bg-background text-muted-foreground group-hover:border-primary group-hover:text-primary"
                      }`}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div className="text-center">
                        <p className={`text-xs font-semibold whitespace-nowrap ${i === 0 ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{step.desc}</p>
                      </div>
                    </a>
                  </Link>
                  {i < journeySteps.length - 1 && (
                    <div className="w-8 h-0.5 bg-border mb-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">All Programs</h2>
            {qualifierStep === "done" && (
              <button
                onClick={() => { setQualifierStep("questions"); setHouseholdSize(""); setIncomeValue(0); }}
                className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
              >
                Update eligibility
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((program, i) => {
              const Icon = program.icon;
              const card = (
                <Card className={`h-full border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden ${
                  (program as any).highlight ? "ring-2 ring-emerald-400/60" : program.featured ? "ring-1 ring-primary/20" : ""
                }`}>
                  {(program as any).highlight && (
                    <div className="bg-emerald-500 text-white text-xs font-bold text-center py-1.5 tracking-wide">
                      ENHANCED BENEFIT — YOU QUALIFY
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${program.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shrink-0`}>
                        <Icon className={`w-6 h-6 ${program.iconColor}`} />
                      </div>
                      <Badge className={`${program.badgeClass} border-none text-xs font-bold shrink-0`}>
                        {program.badge}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-foreground mb-2 leading-snug">{program.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{program.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                      <span className="text-xs font-medium text-muted-foreground">{program.value}</span>
                      <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-[hsl(var(--brand-orange))] transition-colors">
                        {program.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="h-full"
                >
                  {program.external ? (
                    <a href={program.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                      {card}
                    </a>
                  ) : (
                    <Link href={program.href}>
                      <a className="block h-full">{card}</a>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { number: "184,000+", label: "Checkups completed" },
            { number: "$847", label: "Avg annual savings" },
            { number: "$7,500", label: "Max rebates available" },
            { number: "0%", label: "Financing interest rate" },
          ].map(({ number, label }) => (
            <div key={label} className="text-center p-4 bg-card border border-border/50">
              <p className="text-2xl font-bold text-foreground">{number}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 p-6 md:p-8 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--brand-orange))]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Not sure where to start?</h3>
              <p className="text-white/60 text-sm">The free checkup is the easiest first step. One hour, no cost, and you walk away with real products.</p>
            </div>
            <Link href="/energy/home-assessment">
              <Button size="lg" className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white shrink-0 shadow-lg">
                Start with Free Checkup <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
