import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  BarChart3, ArrowRight, CheckCircle2, ChevronLeft,
  Zap, Wrench, Users2, Building2, Monitor,
  TrendingDown, Bell, Activity, Shield,
  Star, ExternalLink,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

const PROGRAMS = [
  {
    id: "vcx",
    name: "Virtual Commissioning (VCx®)",
    tagline: "Start saving in days — no paperwork, no site visits.",
    badge: "COMPLIMENTARY",
    badgeClass: "bg-orange-100 text-orange-800",
    icon: Monitor,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    featured: true,
    bestFor: "Any PSE&G business customer",
    highlights: [
      "Zero enrollment paperwork",
      "No on-site visits required",
      "Delivered virtually by Power TakeOff",
      "Individualized facility analysis",
      "Measured and verified savings",
    ],
    description:
      "VCx® uses interval meter data and building information to identify operational savings — without anyone visiting your facility. Power TakeOff delivers personalized energy recommendations with M&V-backed results. No forms, no scheduling. Just sign up and receive your analysis.",
    cta: "Enroll in VCx®",
    href: "https://bizenergy.pseg.com/energy-management-program",
    external: true,
  },
  {
    id: "mbcx",
    name: "Monitoring-Based Commissioning (MBCx)",
    tagline: "Continuous monitoring that catches waste before it costs you.",
    badge: "REAL-TIME",
    badgeClass: "bg-blue-100 text-blue-800",
    icon: Activity,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    featured: false,
    bestFor: "Buildings with a BMS / EMS already installed",
    highlights: [
      "Software integrates with your existing BMS",
      "Real-time performance monitoring",
      "Automated alerts when equipment underperforms",
      "Identifies savings opportunities continuously",
      "Monthly energy performance reports",
    ],
    description:
      "MBCx software pairs with your building's energy management system and monitors performance around the clock. When equipment drifts from optimal settings — a stuck valve, a scheduling error, a failing sensor — you get an alert before it becomes a costly problem.",
    cta: "Learn About MBCx",
    href: "https://bizenergy.pseg.com/energy-management-program",
    external: true,
  },
  {
    id: "sem",
    name: "Strategic Energy Management (SEM)",
    tagline: "Long-term behavior and operational change for large industrial facilities.",
    badge: "LARGE INDUSTRIAL",
    badgeClass: "bg-orange-100 text-orange-800",
    icon: TrendingDown,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    featured: false,
    bestFor: "Large industrial & manufacturing facilities",
    highlights: [
      "Customized energy action plans",
      "Real-time consumption tracking",
      "Continuous performance benchmarking",
      "Staff energy champion training",
      "No major capital investment required",
    ],
    description:
      "SEM focuses on operational and behavioral changes — not equipment. Working with your team, PSE&G develops customized energy action plans, establishes real-time monitoring, and drives sustained reductions through engagement and accountability. Most savings are achieved without capital investment.",
    cta: "Learn About SEM",
    href: "https://bizenergy.pseg.com/energy-management-program",
    external: true,
  },
  {
    id: "rcx",
    name: "Retro-Commissioning (RCx)",
    tagline: "Get more out of the equipment you already have.",
    badge: "HVAC FOCUSED",
    badgeClass: "bg-blue-100 text-blue-800",
    icon: Wrench,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    featured: false,
    bestFor: "Buildings with aging or underperforming HVAC",
    highlights: [
      "HVAC maintenance, tune-up, and adjustment",
      "Boiler, chiller, and refrigeration optimization",
      "Minimal or no capital investment needed",
      "Incentives available for qualifying work",
      "Rapid payback — often under 2 years",
    ],
    description:
      "RCx identifies and corrects operational inefficiencies in existing HVAC systems — without replacing them. Tune-ups, set-point adjustments, control sequences, and maintenance corrections often deliver 10–20% energy savings with minimal upfront cost.",
    cta: "Learn About RCx",
    href: "https://bizenergy.pseg.com/energy-management-program",
    external: true,
  },
  {
    id: "bop",
    name: "Building Operations Program",
    tagline: "Expert support and certification for your facilities team.",
    badge: "MIDSIZE OPERATIONS",
    badgeClass: "bg-blue-100 text-blue-800",
    icon: Users2,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    featured: false,
    bestFor: "Midsize commercial & institutional buildings",
    highlights: [
      "Expert on-site maintenance support",
      "Building Operator Certification (BOC) training",
      "Equipment performance optimization",
      "Ongoing coaching for facility staff",
      "Ongoing energy performance reviews",
    ],
    description:
      "The Building Operations Program provides hands-on support for the people who manage your building day-to-day. Includes the nationally recognized Building Operator Certification program and direct expert coaching to help your team identify and eliminate waste continuously.",
    cta: "Learn About BOP",
    href: "https://bizenergy.pseg.com/energy-management-program",
    external: true,
  },
];

// Simulated MBCx dashboard alerts for visual interest
const MOCK_ALERTS = [
  { type: "warning", system: "Chiller #2", message: "Operating 18% above baseline — inspect condenser coils", time: "2h ago" },
  { type: "info", system: "AHU-3 Schedule", message: "Weekend override left active — estimated $340 waste", time: "6h ago" },
  { type: "success", system: "Lighting Zone B", message: "Occupancy sensors performing as expected — no action needed", time: "1d ago" },
];

const ALERT_STYLES = {
  warning: { bar: "bg-amber-500", dot: "bg-amber-500", text: "text-amber-800", bg: "bg-amber-50 border-amber-100" },
  info: { bar: "bg-blue-500", dot: "bg-blue-500", text: "text-blue-800", bg: "bg-blue-50 border-blue-100" },
  success: { bar: "bg-[hsl(var(--brand-orange))]", dot: "bg-[hsl(var(--brand-orange))]", text: "text-orange-800", bg: "bg-orange-50 border-orange-100" },
};

export default function BusinessEnergyManagement() {
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10 max-w-6xl">
          <Link href="/business/energy">
            <a className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to Commercial Programs
            </a>
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-300 text-xs font-semibold mb-4">
            <BarChart3 className="w-3.5 h-3.5" /> Energy Management Programs
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 max-w-2xl">
            Save Energy Without Replacing Equipment
          </h1>
          <p className="text-white/70 text-base max-w-xl mb-8">
            Five programs that optimize what you already have — from virtual audits requiring zero paperwork to real-time monitoring and hands-on operational coaching.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: Zap, text: "VCx® — no paperwork, no site visits" },
              { icon: Bell, text: "MBCx — real-time equipment alerts" },
              { icon: Shield, text: "All programs complimentary" },
              { icon: Star, text: "Works alongside equipment upgrades" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon className="w-4 h-4 text-blue-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">

        {/* Featured VCx CTA */}
        <div className="mb-10 bg-gradient-to-r from-green-600 to-emerald-700 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center gap-5 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-orange-200" />
                <span className="text-orange-200 text-xs font-semibold uppercase tracking-wide">Easiest starting point</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Start with VCx® — takes minutes, zero paperwork</h2>
              <p className="text-orange-100 text-sm max-w-lg leading-relaxed">
                Virtual Commissioning uses your meter data to find savings opportunities — no site visits, no enrollment forms. PSE&G's partner Power TakeOff delivers a personalized facility analysis with measured results. It's the fastest way to start saving.
              </p>
            </div>
            <div className="shrink-0">
              <AnimateEnrollButton submitted={enrollSubmitted} onSubmit={() => setEnrollSubmitted(true)} />
            </div>
          </div>
        </div>

        {/* Program Cards */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-2">All Energy Management Programs</h2>
          <p className="text-sm text-muted-foreground mb-6">Programs can be combined — most customers run VCx® alongside equipment upgrades from Direct Install or Prescriptive.</p>
          <div className="space-y-4">
            {PROGRAMS.map((program, i) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className={`bg-card border ${program.featured ? "border-orange-200 ring-1 ring-orange-200/60" : "border-border/50"} overflow-hidden`}
                >
                  {program.featured && (
                    <div className="bg-[hsl(var(--brand-orange))] text-white text-xs font-bold text-center py-1.5 tracking-wide">
                      RECOMMENDED — ZERO EFFORT TO START
                    </div>
                  )}
                  <div className="p-6 md:p-7">
                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 ${program.iconBg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-6 h-6 ${program.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-bold text-foreground">{program.name}</h3>
                            <Badge className={`${program.badgeClass} border-none text-xs font-bold`}>{program.badge}</Badge>
                          </div>
                          <p className="text-sm font-medium text-muted-foreground mb-3">{program.tagline}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{program.description}</p>
                          <div className="flex items-center gap-2 mb-4">
                            <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <span className="text-xs text-muted-foreground">Best for: <span className="font-medium text-foreground">{program.bestFor}</span></span>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-1.5">
                            {program.highlights.map(h => (
                              <div key={h} className="flex items-center gap-2 text-xs text-foreground">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                                {h}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="md:w-40 shrink-0">
                        <a href={program.href} target="_blank" rel="noopener noreferrer">
                          <Button
                            className={`w-full ${program.featured ? "bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90" : "bg-primary hover:bg-primary/90"} text-white`}
                          >
                            {program.cta}
                            {program.external && <ExternalLink className="w-3.5 h-3.5 ml-1.5" />}
                          </Button>
                        </a>
                      </div>
                    </div>

                    {/* MBCx dashboard preview */}
                    {program.id === "mbcx" && (
                      <div className="mt-5 pt-5 border-t border-border/40">
                        <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">Example MBCx alerts</p>
                        <div className="space-y-2">
                          {MOCK_ALERTS.map((alert, idx) => {
                            const styles = ALERT_STYLES[alert.type as keyof typeof ALERT_STYLES];
                            return (
                              <div key={idx} className={`flex items-start gap-3 p-3 border ${styles.bg} text-xs`}>
                                <div className={`w-1.5 h-1.5 ${styles.dot} rounded-full mt-1.5 shrink-0`} />
                                <div className="flex-1 min-w-0">
                                  <span className="font-semibold text-foreground">{alert.system}: </span>
                                  <span className={styles.text}>{alert.message}</span>
                                </div>
                                <span className="text-muted-foreground whitespace-nowrap shrink-0">{alert.time}</span>
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Alerts are delivered via email and the MBCx dashboard.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* How programs stack */}
        <div className="mb-12 p-6 md:p-8 bg-card border border-border/50">
          <h2 className="text-lg font-bold text-foreground mb-4">How these programs work together</h2>
          <div className="space-y-3">
            {[
              { step: "Start", desc: "Enroll in VCx® — get a personalized analysis of your facility in days, no forms required.", accent: true },
              { step: "Optimize", desc: "Add MBCx to monitor performance in real-time and catch equipment drift before it wastes money." },
              { step: "Upgrade", desc: "Use Direct Install or Prescriptive to upgrade the equipment VCx® and MBCx identified." },
              { step: "Sustain", desc: "SEM or Building Operations keeps your team engaged and ensures savings don't slip over time." },
            ].map(({ step, desc, accent }) => (
              <div key={step} className={`flex items-start gap-4 p-4 ${accent ? "bg-primary/5 border border-primary/10" : "bg-secondary/30"}`}>
                <div className={`w-16 text-xs font-bold shrink-0 pt-0.5 ${accent ? "text-primary" : "text-muted-foreground"}`}>{step}</div>
                <p className="text-sm text-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 md:p-8 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--brand-orange))]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Not sure which program fits?</h3>
              <p className="text-white/60 text-sm">
                A free Direct Install audit identifies the best combination of equipment upgrades and management programs for your specific facility.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/business/direct-install">
                <Button size="lg" className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white shadow-lg w-full sm:w-auto">
                  Schedule Free Audit <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a href="mailto:PSEG-CleanEnergy@pseg.com">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                  Email an Adviser
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

function AnimateEnrollButton({ submitted, onSubmit }: { submitted: boolean; onSubmit: () => void }) {
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-3"
      >
        <CheckCircle2 className="w-5 h-5 text-orange-200 shrink-0" />
        <div>
          <p className="text-white font-semibold text-sm">Enrollment submitted</p>
          <p className="text-orange-200 text-xs">Power TakeOff will contact you within 2 business days.</p>
        </div>
      </motion.div>
    );
  }
  return (
    <Button
      size="lg"
      className="bg-white text-orange-700 hover:bg-orange-50 font-semibold shadow-md w-full"
      onClick={onSubmit}
    >
      Enroll in VCx® — Free <ArrowRight className="w-4 h-4 ml-1" />
    </Button>
  );
}
