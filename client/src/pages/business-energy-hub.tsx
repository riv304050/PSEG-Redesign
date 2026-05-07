import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Zap, ArrowRight, DollarSign, Award,
  Clock, Shield, Star, ChevronRight, CheckCircle2,
  Wrench, BarChart3, Users2, Home, AlertCircle,
  TrendingDown, Bolt,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

// Jun 30 2026 deadline for 50%+ Prescriptive incentives
const DEADLINE = new Date("2026-06-30T23:59:59");
function daysUntilDeadline() {
  const diff = DEADLINE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const FACILITY_TYPES = [
  { label: "Small Business", value: "small", icon: Building2 },
  { label: "Commercial / Industrial", value: "commercial", icon: Bolt },
  { label: "Hospital / School / Municipality", value: "institution", icon: Award },
  { label: "Multifamily (3+ units)", value: "multifamily", icon: Home },
];

const DEMAND_LEVELS = [
  { label: "Under 100 kW", value: "low" },
  { label: "100 – 300 kW", value: "mid" },
  { label: "Over 300 kW", value: "high" },
  { label: "Not sure", value: "unknown" },
];

type FacilityType = "small" | "commercial" | "institution" | "multifamily" | "";
type DemandLevel = "low" | "mid" | "high" | "unknown" | "";

function getFeaturedPrograms(facility: FacilityType, demand: DemandLevel): string[] {
  if (facility === "multifamily") return ["multifamily"];
  if (facility === "institution") return ["engineered"];
  if (facility === "small" || demand === "low" || demand === "mid") return ["direct-install"];
  if (demand === "high") return ["prescriptive", "engineered"];
  return ["direct-install", "prescriptive"];
}

const journeySteps = [
  { label: "Site Assessment", href: "/business/direct-install", icon: Wrench, desc: "Free, on-site" },
  { label: "Equipment Rebates", href: "/business/prescriptive", icon: DollarSign, desc: "Up to 50% back" },
  { label: "Energy Management", href: "/business/energy-management", icon: BarChart3, desc: "Optimize existing" },
  { label: "Engineered Solutions", href: "/business/engineered-solutions", icon: Zap, desc: "No upfront cost" },
  { label: "Multifamily", href: "/business/multifamily", icon: Home, desc: "3+ units" },
];

const allPrograms = [
  {
    id: "direct-install",
    title: "Direct Install Program",
    description: "Free on-site energy audit for small and midsize businesses. PSE&G covers installation upfront — you repay the rest interest-free on your bill.",
    badge: "FREE AUDIT",
    badgeClass: "bg-green-100 text-green-800",
    value: "< 300 kW avg peak demand",
    cta: "Schedule Free Audit",
    href: "/business/direct-install",
    icon: Wrench,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    external: false,
  },
  {
    id: "prescriptive",
    title: "Prescriptive Rebates",
    description: "Get 50%+ back on eligible equipment — HVAC, lighting, refrigeration, food service, motors, and more. Point-of-sale rebates available at participating distributors.",
    badge: "50%+ INCENTIVES",
    badgeClass: "bg-orange-100 text-orange-800",
    value: "Ends June 30, 2026",
    cta: "Browse Rebates",
    href: "/business/prescriptive",
    icon: DollarSign,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    external: false,
    urgent: true,
  },
  {
    id: "engineered",
    title: "Engineered Solutions",
    description: "Comprehensive, custom energy upgrades for hospitals, schools, municipalities, and large commercial facilities — with no upfront cost and a free investment-grade audit.",
    badge: "NO UPFRONT COST",
    badgeClass: "bg-blue-100 text-blue-800",
    value: "Up to 6-yr payback reduction",
    cta: "Get a Free Audit",
    href: "/business/engineered-solutions",
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    external: false,
  },
  {
    id: "multifamily",
    title: "Multifamily Program",
    description: "Energy efficiency upgrades for apartment buildings with 3+ units. Free no-cost assessment, rebates through Trade Allies, and on-bill repayment options.",
    badge: "3+ UNITS",
    badgeClass: "bg-purple-100 text-purple-800",
    value: "Garden, mid-rise & high-rise",
    cta: "Schedule Assessment",
    href: "/business/multifamily",
    icon: Home,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    external: false,
  },
  {
    id: "energy-management",
    title: "Energy Management",
    description: "Optimize what you already have. Virtual Commissioning (VCx®) requires no paperwork and no site visits — or go deeper with real-time MBCx monitoring and SEM coaching.",
    badge: "COMPLIMENTARY",
    badgeClass: "bg-teal-100 text-teal-800",
    value: "VCx, MBCx, SEM, RCx",
    cta: "Explore Programs",
    href: "/business/energy-management",
    icon: BarChart3,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
    external: false,
  },
];

export default function BusinessEnergyHub() {
  const { user } = useAuth();
  const [qualifierStep, setQualifierStep] = useState<"prompt" | "questions" | "done">("prompt");
  const [facilityType, setFacilityType] = useState<FacilityType>("");
  const [demandLevel, setDemandLevel] = useState<DemandLevel>("");
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);

  const daysLeft = daysUntilDeadline();

  function handleQualify() {
    if (!facilityType || !demandLevel) return;
    setFeaturedIds(getFeaturedPrograms(facilityType, demandLevel));
    setQualifierStep("done");
  }

  const programs =
    qualifierStep === "done" && featuredIds.length > 0
      ? [
          ...allPrograms.filter((p) => featuredIds.includes(p.id)),
          ...allPrograms.filter((p) => !featuredIds.includes(p.id)),
        ]
      : allPrograms;

  const topProgram = qualifierStep === "done" && featuredIds.length > 0
    ? allPrograms.find((p) => p.id === featuredIds[0])
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10 max-w-6xl">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))] text-xs font-semibold mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Commercial Energy Efficiency
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 max-w-2xl">
            Energy Programs for Your Business
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mb-8">
            PSE&G's commercial programs cover small businesses, large institutions, and everything in between.{" "}
            <span className="text-white font-semibold">Answer 2 questions</span> to find the right fit.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: Clock, text: "Free on-site assessments" },
              { icon: DollarSign, text: "50%+ equipment incentives" },
              { icon: Shield, text: "0% interest on-bill repayment" },
              { icon: Star, text: "22,000+ businesses served" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon className="w-4 h-4 text-[hsl(var(--brand-orange))]" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Urgency Banner */}
      {daysLeft > 0 && (
        <div className="bg-[hsl(var(--brand-orange))] text-white">
          <div className="container mx-auto px-4 py-3 max-w-6xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Prescriptive Program: 50%+ increased incentives on eligible equipment —{" "}
                <span className="underline underline-offset-2">{daysLeft} days left</span> (expires June 30, 2026)
              </span>
            </div>
            <Link href="/business/prescriptive">
              <a className="text-sm font-bold underline underline-offset-2 whitespace-nowrap hover:text-white/80 transition-colors">
                Browse Rebates →
              </a>
            </Link>
          </div>
        </div>
      )}

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">

        {/* Business Qualifier */}
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
                <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-800 p-6 md:p-8 text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-[hsl(var(--brand-orange))]/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Users2 className="w-4 h-4 text-blue-200" />
                        <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Find your program</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold mb-2">Which programs are right for your business?</h2>
                      <p className="text-blue-100 text-sm max-w-md leading-relaxed">
                        Two quick questions help us surface the programs that match your facility type and energy use — so you're not sorting through options that don't apply.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Button
                        className="bg-white text-primary hover:bg-blue-50 font-semibold shadow-md"
                        onClick={() => setQualifierStep("questions")}
                      >
                        Find My Programs <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                      <button
                        className="text-blue-200 hover:text-white text-sm underline underline-offset-4 transition-colors"
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
                    Takes about 10 seconds. We'll reorder the programs to show your best fit first.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3">What type of facility?</p>
                      <div className="grid grid-cols-2 gap-2">
                        {FACILITY_TYPES.map((f) => {
                          const Icon = f.icon;
                          return (
                            <button
                              key={f.value}
                              onClick={() => setFacilityType(f.value as FacilityType)}
                              className={`flex items-center gap-2 py-3 px-3 text-sm font-medium border-2 transition-all text-left ${
                                facilityType === f.value
                                  ? "border-primary bg-primary text-white"
                                  : "border-border bg-background text-foreground hover:border-primary/40"
                              }`}
                            >
                              <Icon className="w-4 h-4 shrink-0" />
                              {f.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3">Average peak electricity demand?</p>
                      <div className="space-y-2">
                        {DEMAND_LEVELS.map((d) => (
                          <button
                            key={d.value}
                            onClick={() => setDemandLevel(d.value as DemandLevel)}
                            className={`w-full py-3 px-4 text-sm font-medium border-2 text-left transition-all ${
                              demandLevel === d.value
                                ? "border-primary bg-primary text-white"
                                : "border-border bg-background text-foreground hover:border-primary/40"
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={handleQualify}
                      disabled={!facilityType || !demandLevel}
                      className="bg-primary text-white disabled:opacity-40"
                    >
                      Show My Programs <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                    <button
                      className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors"
                      onClick={() => setQualifierStep("done")}
                    >
                      Skip for now
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Your answers are used only to surface relevant programs and are not stored or shared.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Qualifier Result Banner */}
        {qualifierStep === "done" && topProgram && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4 p-4 md:p-5 bg-blue-50 border border-blue-200"
          >
            <div className="p-2 bg-blue-100 shrink-0">
              <CheckCircle2 className="w-5 h-5 text-blue-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-blue-900">
                Based on your answers, we recommend starting with the{" "}
                <span className="font-bold">{topProgram.title}</span>
              </p>
              <p className="text-xs text-blue-700 mt-0.5">{topProgram.description}</p>
            </div>
            <Link href={topProgram.href}>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shrink-0 w-full sm:w-auto">
                {topProgram.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </motion.div>
        )}

        {qualifierStep === "done" && featuredIds.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-start gap-3 p-4 bg-blue-50 border border-blue-100"
          >
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              <span className="font-semibold">All programs are available to your business.</span> The Direct Install Program is the easiest starting point — free on-site audit, no commitment required.
            </p>
          </motion.div>
        )}

        {/* Journey Stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-foreground">Your Commercial Energy Journey</h2>
            <span className="text-xs text-muted-foreground hidden sm:block">Start with a free assessment — we'll map out the rest</span>
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
                onClick={() => {
                  setQualifierStep("questions");
                  setFacilityType("");
                  setDemandLevel("");
                  setFeaturedIds([]);
                }}
                className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
              >
                Update answers
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((program, i) => {
              const Icon = program.icon;
              const isFeatured = featuredIds.includes(program.id);
              const card = (
                <Card className={`h-full border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden ${
                  isFeatured ? "ring-2 ring-primary/40" : ""
                }`}>
                  {isFeatured && (
                    <div className="bg-primary text-white text-xs font-bold text-center py-1.5 tracking-wide">
                      RECOMMENDED FOR YOU
                    </div>
                  )}
                  {(program as any).urgent && !isFeatured && (
                    <div className="bg-[hsl(var(--brand-orange))] text-white text-xs font-bold text-center py-1.5 tracking-wide">
                      ENDS JUNE 30, 2026 — {daysLeft} DAYS LEFT
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
                  <Link href={program.href}>
                    <a className="block h-full">{card}</a>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { number: "22,000+", label: "Businesses served" },
            { number: "35,000+", label: "Projects completed" },
            { number: "$960M", label: "Annual customer savings" },
            { number: "0%", label: "On-bill repayment interest" },
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
              <p className="text-white/60 text-sm">
                A free on-site assessment is the easiest first step. An energy adviser visits your facility, identifies the best upgrades, and walks you through your options — no commitment required.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/business/direct-install">
                <Button size="lg" className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white shadow-lg w-full sm:w-auto">
                  Schedule Free Audit <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a href="tel:1-844-300-7734">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                  Call 1-844-300-7734
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
