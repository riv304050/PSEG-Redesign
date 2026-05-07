import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, ArrowRight, CheckCircle2, ChevronLeft,
  ClipboardList, Pencil, HardHat, BarChart3,
  Building2, GraduationCap, Landmark, Factory, Home,
  DollarSign, Shield, Clock, FileText,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

type Sector = "hospital" | "school" | "municipality" | "commercial" | "multifamily" | "";

const SECTORS = [
  { value: "hospital", label: "Hospital / Healthcare", icon: Building2, color: "text-red-700", bg: "bg-red-100" },
  { value: "school", label: "School / University", icon: GraduationCap, color: "text-blue-700", bg: "bg-blue-100" },
  { value: "municipality", label: "Municipality / Nonprofit", icon: Landmark, color: "text-purple-700", bg: "bg-purple-100" },
  { value: "commercial", label: "Large Commercial / Industrial", icon: Factory, color: "text-orange-700", bg: "bg-orange-100" },
  { value: "multifamily", label: "Multifamily Building", icon: Home, color: "text-teal-700", bg: "bg-teal-100" },
] as const;

const SECTOR_CONTENT: Record<string, { headline: string; highlights: string[]; term: string }> = {
  hospital: {
    headline: "Reduce operating costs without disrupting patient care.",
    highlights: [
      "HVAC and chiller plant optimization",
      "Domestic hot water system upgrades",
      "LED lighting throughout patient areas and corridors",
      "Building automation and controls integration",
      "Infection-control-safe installation scheduling",
    ],
    term: "60-month on-bill repayment",
  },
  school: {
    headline: "Upgrade aging systems and redirect savings to the classroom.",
    highlights: [
      "HVAC and ventilation system overhauls",
      "LED lighting in classrooms, gyms, and parking",
      "Insulation and air sealing upgrades",
      "Building automation and scheduling controls",
      "Summer and holiday scheduling available",
    ],
    term: "60-month on-bill repayment",
  },
  municipality: {
    headline: "Stretch taxpayer dollars further with long-term energy savings.",
    highlights: [
      "Municipal buildings, libraries, and community centers",
      "Street and outdoor lighting retrofits",
      "Water and wastewater treatment facility upgrades",
      "Fleet garage and maintenance facility improvements",
      "No-cost design and bid documents provided",
    ],
    term: "60-month on-bill repayment",
  },
  commercial: {
    headline: "Custom solutions for complex, multi-system facilities.",
    highlights: [
      "Process HVAC and industrial cooling systems",
      "Variable speed drives and motor upgrades",
      "Compressed air system optimization",
      "Warehouse and high-bay LED lighting",
      "Engineered M&V over 12 months post-install",
    ],
    term: "60-month on-bill repayment",
  },
  multifamily: {
    headline: "Reduce operating costs and improve resident comfort.",
    highlights: [
      "Common area lighting and HVAC",
      "In-unit appliance and heating upgrades",
      "Domestic hot water system improvements",
      "Building envelope and insulation",
      "Extended 120-month repayment term available",
    ],
    term: "Up to 120-month on-bill repayment",
  },
};

const PROCESS_STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Free Energy Audit",
    description: "PSE&G's team visits your facility to identify efficiency opportunities, model costs and savings, and build a business case — at no cost to you.",
    detail: "Typically 1–3 site visits depending on facility complexity.",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Design & Bid Documents",
    description: "PSE&G covers the cost of engineering design and delivers bid-ready documents so you can competitively select your own contractors.",
    detail: "You retain control of contractor selection throughout.",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Construction",
    description: "PSE&G assists with project administration. Interest-free on-bill repayment begins after construction is complete — not during.",
    detail: "PSE&G cost share can reduce your simple payback by up to 6 years.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Commissioning & Verification",
    description: "All equipment is tested and commissioned. Energy savings are measured and verified over 12 months to confirm performance.",
    detail: "Full M&V report delivered at the end of the verification period.",
  },
];

export default function BusinessEngineeredSolutions() {
  const { user } = useAuth();
  const [sector, setSector] = useState<Sector>("");
  const [interestSubmitted, setInterestSubmitted] = useState(false);

  const sectorData = sector ? SECTOR_CONTENT[sector] : null;
  const selectedSector = SECTORS.find(s => s.value === sector);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10 max-w-6xl">
          <Link href="/business/energy">
            <a className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to Commercial Programs
            </a>
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" /> Engineered Solutions Program
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-2xl">
            Large-Scale Upgrades. No Upfront Cost.
          </h1>
          <p className="text-white/70 text-base max-w-xl mb-8">
            PSE&G covers your audit, design, and a portion of construction costs. You repay only the remainder — interest-free on your utility bill, after installation is complete.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: DollarSign, text: "No upfront cost" },
              { icon: FileText, text: "Free investment-grade audit" },
              { icon: Shield, text: "0% interest on-bill repayment" },
              { icon: Clock, text: "Reduces payback by up to 6 years" },
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

        {/* Sector Selector */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">What type of facility?</h2>
            {sector && (
              <button
                onClick={() => setSector("")}
                className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
              >
                Change
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {SECTORS.map((s) => {
              const Icon = s.icon;
              const isSelected = sector === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => setSector(s.value as Sector)}
                  className={`flex flex-col items-center gap-2 p-4 border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-card hover:border-primary/40 text-foreground"
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center ${isSelected ? "bg-white/10" : s.bg}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-white" : s.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-center leading-snug">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sector-specific content */}
          <AnimatePresence mode="wait">
            {sectorData && selectedSector && (
              <motion.div
                key={sector}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-card border-2 border-primary/20 p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-12 h-12 ${selectedSector.bg} flex items-center justify-center shrink-0`}>
                    <selectedSector.icon className={`w-6 h-6 ${selectedSector.color}`} />
                  </div>
                  <div>
                    <Badge className="bg-primary/10 text-primary border-none text-xs font-bold mb-1">{selectedSector.label.toUpperCase()}</Badge>
                    <p className="text-base font-semibold text-foreground">{sectorData.headline}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 mb-5">
                  {sectorData.highlights.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                  <Shield className="w-4 h-4 text-[hsl(var(--brand-orange))] shrink-0" />
                  <span className="text-sm font-medium text-foreground">{sectorData.term} · 0% interest · Starts after construction</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4-Step Process */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-2">How it works</h2>
          <p className="text-sm text-muted-foreground mb-8">Four structured steps — PSE&G guides you through each one.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="bg-card border border-border/50 p-6 relative overflow-hidden group hover:shadow-md transition-all duration-300"
                >
                  <div className="absolute top-4 right-4 text-5xl font-black text-border/30 leading-none select-none">
                    {step.number}
                  </div>
                  <div className="w-11 h-11 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-200">
                    <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{step.description}</p>
                  <p className="text-xs text-muted-foreground/70 italic">{step.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Financing Explainer */}
        <div className="mb-12 bg-primary/5 border border-primary/10 p-6 md:p-8">
          <h2 className="text-lg font-bold text-foreground mb-4">On-bill repayment — how the math works</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-5">
            {[
              { label: "Total project cost", value: "$400,000", sub: "Example hospital HVAC overhaul" },
              { label: "PSE&G cost share", value: "–$80,000", sub: "Incentives reduce your payback by up to 6 years" },
              { label: "Your repayment", value: "$320,000", sub: "~$5,333/mo over 60 months at 0% interest" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="text-center p-4 bg-card border border-border/50">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
                <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 text-xs text-amber-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>On-bill repayment begins <strong>after</strong> construction is complete — not during. Energy savings typically offset a significant portion of the monthly repayment.</span>
          </div>
        </div>

        {/* Get Started */}
        <div className="border-2 border-primary/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <Badge className="bg-primary/10 text-primary border-none text-xs font-bold mb-3">FREE · NO COMMITMENT</Badge>
              <h2 className="text-2xl font-bold text-foreground mb-2">Request a free energy audit</h2>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-xl">
                A PSE&G engineer visits your facility, assesses all major systems, and delivers a detailed report with cost and savings estimates. There's no obligation to proceed — and no cost for the audit.
              </p>

              <AnimatePresence mode="wait">
                {!interestSubmitted ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="grid sm:grid-cols-2 gap-3 mb-4 text-sm max-w-lg">
                      {[
                        { label: "Contact", value: `${user?.firstName || "—"} ${user?.lastName || ""}` },
                        { label: "Account #", value: user?.accountNumber || "—" },
                        { label: "Facility", value: `${user?.address || "—"}, ${user?.city || "NJ"}`, full: true },
                      ].map(({ label, value, full }) => (
                        <div key={label} className={`bg-secondary/50 px-3 py-2 ${full ? "sm:col-span-2" : ""}`}>
                          <p className="text-xs text-muted-foreground">{label}</p>
                          <p className="font-medium truncate">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        className="bg-primary hover:bg-primary/90 text-white"
                        onClick={() => setInterestSubmitted(true)}
                      >
                        Request Free Audit <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                      <a href="mailto:PSEG-CleanEnergy@pseg.com">
                        <Button variant="outline" className="border-border text-foreground w-full sm:w-auto">
                          Email an Adviser
                        </Button>
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      A PSE&G engineer will contact you within 3 business days to schedule.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 max-w-lg"
                  >
                    <div className="w-10 h-10 bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-green-900">Audit request received</p>
                      <p className="text-sm text-green-700">A PSE&G engineer will contact you within 3 business days to schedule your free facility assessment.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stats sidebar */}
            <div className="md:w-48 space-y-3 shrink-0">
              {[
                { number: "0%", label: "Interest on repayment" },
                { number: "6 yrs", label: "Max payback reduction" },
                { number: "$0", label: "Audit cost to you" },
                { number: "60 mo", label: "Standard OBR term" },
              ].map(({ number, label }) => (
                <div key={label} className="text-center p-4 bg-primary text-white">
                  <p className="text-2xl font-bold">{number}</p>
                  <p className="text-xs text-white/60 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
