import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, Home, Zap, ArrowRight, DollarSign, Recycle,
  TrendingDown, ShoppingBag, Award, Clock, Shield, Star,
  ChevronRight, CheckCircle2, Heart, HelpCircle,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

type AssessmentResult = "comfort-partners" | "weatherization" | "standard" | null;

// Income thresholds — approximate NJ 2024 FPL percentages
const COMFORT_THRESHOLDS: Record<string, number> = {
  "1-2": 46000,
  "3-4": 70000,
  "5+": 84000,
};

const WEATHERIZATION_THRESHOLDS: Record<string, number> = {
  "1-2": 82000,
  "3-4": 125000,
  "5+": 150000,
};

const HOUSEHOLD_SIZES = [
  { label: "1–2 people", value: "1-2" },
  { label: "3–4 people", value: "3-4" },
  { label: "5 or more", value: "5+" },
];

const INCOME_BRACKETS = [
  { label: "Under $40,000", value: 30000 },
  { label: "$40,000 – $55,000", value: 47000 },
  { label: "$55,000 – $75,000", value: 65000 },
  { label: "$75,000 – $100,000", value: 87000 },
  { label: "Over $100,000", value: 115000 },
];

function getAssessmentResult(size: string, income: number): AssessmentResult {
  const comfortMax = COMFORT_THRESHOLDS[size] ?? 46000;
  const weatherMax = WEATHERIZATION_THRESHOLDS[size] ?? 82000;
  if (income < comfortMax) return "comfort-partners";
  if (income < weatherMax) return "weatherization";
  return "standard";
}

const FREE_ASSESSMENTS = [
  {
    id: "comfort-partners" as const,
    title: "Comfort Partners",
    eyebrow: "For lower-income households",
    description:
      "Whole-home upgrades at little to no out-of-pocket cost — insulation, heating systems, water heaters, air sealing, and more.",
    badge: "NO COST",
    badgeClass: "bg-purple-100 text-purple-800",
    borderClass: "border-purple-200",
    headerClass: "bg-purple-700",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    matchBannerClass: "bg-purple-600",
    icon: Heart,
    cta: "Check Eligibility",
    href: "/energy/home-assessment#comfort-partners",
    includes: ["Insulation at no cost", "Heating system upgrades", "Water heater replacement", "Air sealing"],
  },
  {
    id: "weatherization" as const,
    title: "Home Weatherization",
    eyebrow: "For moderate-income households",
    description:
      "Insulation, air sealing, and heating improvements with significantly reduced or no out-of-pocket cost.",
    badge: "REDUCED COST",
    badgeClass: "bg-emerald-100 text-emerald-800",
    borderClass: "border-emerald-200",
    headerClass: "bg-emerald-700",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    matchBannerClass: "bg-emerald-600",
    icon: Award,
    cta: "Check Eligibility",
    href: "/energy/home-assessment#weatherization",
    includes: ["Insulation upgrades", "Air sealing", "Heating improvements", "Energy education"],
  },
  {
    id: "standard" as const,
    title: "Free Home Energy Checkup",
    eyebrow: "Available to all PSE&G customers",
    description:
      "One-hour visit from a PSE&G energy advisor. Walk away with a smart thermostat, LED bulbs, and a custom savings report — installed that day.",
    badge: "FREE",
    badgeClass: "bg-green-100 text-green-800",
    borderClass: "border-green-200",
    headerClass: "bg-green-700",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    matchBannerClass: "bg-green-600",
    icon: Home,
    cta: "Schedule Now",
    href: "/energy/home-assessment",
    includes: ["Smart thermostat ($250 value)", "LED bulbs for your home", "Advanced power strips", "Custom savings report"],
  },
];

const otherPrograms = [
  {
    id: "upgrade",
    title: "Whole Home Upgrade",
    description: "A licensed contractor goes deep — insulation, HVAC, air sealing. Upgrades go on your bill at 0% interest.",
    badge: "0% FINANCING",
    badgeClass: "bg-blue-100 text-blue-800",
    value: "Up to $7,500 financed",
    cta: "Find a Contractor",
    href: "/energy/home-assessment#whole-home",
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
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
    external: true,
  },
];

export default function EnergyHub() {
  const { user } = useAuth();
  const [quizStep, setQuizStep] = useState<"none" | "quiz" | "result">("none");
  const [householdSize, setHouseholdSize] = useState("");
  const [incomeValue, setIncomeValue] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult>(null);

  const firstName = user?.firstName || "Alex";

  function handleQuiz() {
    if (!householdSize || !incomeValue) return;
    setAssessmentResult(getAssessmentResult(householdSize, incomeValue));
    setQuizStep("result");
  }

  function resetQuiz() {
    setQuizStep("none");
    setHouseholdSize("");
    setIncomeValue(0);
    setAssessmentResult(null);
  }

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
            Start with the free assessment that matches your household.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: Clock, text: "3 free assessment options" },
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

        {/* ── Assessment Finder ── */}
        <div className="mb-12">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shrink-0">1</span>
              <h2 className="text-xl font-bold text-foreground">Find Your Free Home Assessment</h2>
            </div>
            <p className="text-muted-foreground text-sm ml-8">
              PSE&G offers three free programs — your income level determines which one provides the most benefits.
            </p>
          </div>

          {/* 3 Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {FREE_ASSESSMENTS.map((program) => {
              const Icon = program.icon;
              const isMatch = assessmentResult === program.id;
              const isDimmed = assessmentResult !== null && !isMatch;

              return (
                <motion.div
                  key={program.id}
                  animate={{ opacity: isDimmed ? 0.45 : 1, scale: isMatch ? 1.01 : 1 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  {isMatch && (
                    <div className={`${program.matchBannerClass} text-white text-xs font-bold text-center py-1.5 tracking-wide`}>
                      YOUR BEST MATCH
                    </div>
                  )}
                  <div className={`border-2 ${isMatch ? program.borderClass : "border-border/50"} bg-card h-full flex flex-col`}>
                    <div className={`${program.headerClass} px-4 py-3 flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-white" />
                        <span className="text-white font-bold text-xs tracking-wide uppercase">{program.title}</span>
                      </div>
                      <Badge className={`${program.badgeClass} border-none text-xs font-bold`}>{program.badge}</Badge>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{program.eyebrow}</p>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{program.description}</p>
                      <div className="space-y-1.5 mb-4">
                        {program.includes.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <Link href={program.href}>
                        <a className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-[hsl(var(--brand-orange))] transition-colors mt-auto">
                          {program.cta} <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quiz / Result */}
          <AnimatePresence mode="wait">
            {quizStep === "none" && (
              <motion.div
                key="prompt"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="border border-dashed border-border/60 p-4 flex flex-col sm:flex-row sm:items-center gap-4 bg-secondary/20"
              >
                <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0" />
                <p className="text-sm text-muted-foreground flex-1">
                  <span className="font-semibold text-foreground">Not sure which program applies to you?</span>{" "}
                  Answer 2 quick questions to find out — takes about 10 seconds.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setQuizStep("quiz")}
                  className="shrink-0"
                >
                  Find My Program <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </motion.div>
            )}

            {quizStep === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="border border-border/50 bg-card p-5 md:p-6"
              >
                <h3 className="text-base font-bold text-foreground mb-1">Two quick questions</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  This helps us highlight the right program for your household.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-5">
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
                    onClick={handleQuiz}
                    disabled={!householdSize || !incomeValue}
                    className="bg-primary text-white disabled:opacity-40"
                  >
                    Show My Program <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <button
                    onClick={resetQuiz}
                    className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Your information is used only to show relevant programs and is not stored or shared.
                </p>
              </motion.div>
            )}

            {quizStep === "result" && assessmentResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                {(() => {
                  const matched = FREE_ASSESSMENTS.find((p) => p.id === assessmentResult)!;
                  const Icon = matched.icon;
                  return (
                    <div className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 border ${matched.borderClass} bg-card`}>
                      <div className={`p-2 ${matched.iconBg} shrink-0`}>
                        <Icon className={`w-5 h-5 ${matched.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          Based on your household: <span>{matched.title}</span> is your best match
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {assessmentResult === "comfort-partners" &&
                            "You may qualify for whole-home upgrades at little to no cost. Eligibility is confirmed when you apply."}
                          {assessmentResult === "weatherization" &&
                            "You may qualify for insulation and heating upgrades at significantly reduced cost. Eligibility is confirmed when you apply."}
                          {assessmentResult === "standard" &&
                            "The free checkup is available to all PSE&G customers — smart thermostat, LED bulbs, and a savings report, all at no cost."}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Link href={matched.href}>
                          <Button size="sm" className="bg-primary text-white">
                            {matched.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                        <button
                          onClick={resetQuiz}
                          className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4 transition-colors"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── More Ways to Save ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shrink-0">2</span>
            <h2 className="text-xl font-bold text-foreground">More Ways to Save</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherPrograms.map((program, i) => {
              const Icon = program.icon;
              const card = (
                <Card className="h-full border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden">
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
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
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
              <p className="text-white/60 text-sm">The free checkup is available to all customers — one hour, no cost, and you walk away with real products installed.</p>
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
