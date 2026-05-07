import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Zap, CheckCircle2, ArrowRight, Clock,
  Lightbulb, Wind, Refrigerator, FileText,
  DollarSign, Wrench, ChevronLeft, ChevronRight,
  CalendarDays, Sun, Cloud, Moon, Users2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  let day = new Date(today);
  day.setDate(day.getDate() + 2); // 2-day lead time for commercial
  while (dates.length < 14) {
    if (day.getDay() !== 0 && day.getDay() !== 6) { // Mon–Fri only
      dates.push(new Date(day));
    }
    day.setDate(day.getDate() + 1);
  }
  return dates;
}

const TIME_SLOTS = [
  { id: "morning", label: "Morning", range: "8 AM – 12 PM", icon: Sun },
  { id: "afternoon", label: "Afternoon", range: "12 PM – 4 PM", icon: Cloud },
  { id: "late", label: "Late Afternoon", range: "2 PM – 5 PM", icon: Moon },
];

const AUDIT_INCLUDES = [
  { icon: Lightbulb, text: "Full lighting audit — fixtures, controls & daylight harvesting" },
  { icon: Wind, text: "HVAC & rooftop unit efficiency assessment" },
  { icon: Refrigerator, text: "Commercial refrigeration & walk-in cooler review" },
  { icon: FileText, text: "Custom savings report with prioritized upgrade list" },
];

const PRESCRIPTIVE_INCLUDES = [
  { text: "Broader equipment scope: food service, motors, gas systems" },
  { text: "Point-of-sale rebates at participating distributors" },
  { text: "Choose any PSE&G-approved Trade Ally contractor" },
  { text: "Stackable with Direct Install incentives (where eligible)" },
  { text: "Up to 50%+ increased incentives through June 30, 2026" },
];

const COMPARISON_ROWS = [
  { feature: "Lighting retrofits", direct: true, prescriptive: true },
  { feature: "HVAC / RTU upgrades", direct: true, prescriptive: true },
  { feature: "Commercial refrigeration", direct: true, prescriptive: true },
  { feature: "Food service equipment", direct: false, prescriptive: true },
  { feature: "Gas systems & boilers", direct: false, prescriptive: true },
  { feature: "Motors & drives", direct: true, prescriptive: true },
  { feature: "PSE&G covers upfront costs", direct: true, prescriptive: false },
  { feature: "Point-of-sale rebate option", direct: false, prescriptive: true },
  { feature: "Interest-free on-bill repayment", direct: true, prescriptive: true },
  { feature: "Facility size limit", direct: "< 300 kW", prescriptive: "Any size", special: true },
];

const AVAILABLE_DATES = getAvailableDates();
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function BusinessDirectInstall() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [scheduled, setScheduled] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  const businessName = user?.firstName ? `${user.firstName}'s Business` : "Your Business";
  const address = user?.address ? `${user.address}, ${user.city || "NJ"}` : "123 Commerce Blvd, Newark, NJ";

  const visibleDates = AVAILABLE_DATES.slice(weekOffset * 7, weekOffset * 7 + 7);
  const canSchedule = selectedDate && selectedSlot;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-14 relative z-10 max-w-6xl">
          <Link href="/business/energy">
            <a className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to Commercial Programs
            </a>
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 text-xs font-semibold mb-4">
            <Wrench className="w-3.5 h-3.5" /> Direct Install Program
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Free On-Site Energy Audit for Your Business
          </h1>
          <p className="text-white/70 text-base max-w-xl">
            A PSE&G energy adviser visits your facility, identifies the best upgrades, and PSE&G covers installation upfront. You repay only what's left — interest-free on your bill.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">

        {/* Eligibility Notice */}
        <div className="mb-8 flex items-start gap-3 p-4 bg-blue-50 border border-blue-100">
          <Users2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Eligibility:</span> PSE&G business customers with average annual peak demand under 300 kW, or less than 40,000 therms of annual gas consumption. Excludes public education, municipal, state, and federal facilities.
          </p>
        </div>

        {/* Two Tracks */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {/* Track 1: Direct Install */}
          <div className="border-2 border-green-200 bg-card relative overflow-hidden">
            <div className="bg-green-600 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">DIRECT INSTALL PROGRAM</span>
              </div>
              <Badge className="bg-white text-green-700 border-none text-xs font-bold">FREE AUDIT</Badge>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">2–4 hours on-site · Businesses under 300 kW</span>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                A PSE&G energy adviser performs a comprehensive audit of your facility. PSE&G covers upfront installation costs — any remaining balance is repaid interest-free on your monthly bill.
              </p>

              <div className="space-y-2.5 mb-6">
                <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">What the audit covers</p>
                {AUDIT_INCLUDES.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-green-100 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-green-700" />
                    </div>
                    <span className="text-sm text-foreground">{text}</span>
                  </div>
                ))}
              </div>

              {/* On-bill repayment explainer */}
              <div className="bg-primary/5 border border-primary/10 p-4 mb-5">
                <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">How on-bill repayment works</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  If your upgrades cost <strong className="text-foreground">$15,000</strong>, PSE&G's incentives typically cover 50–80%. The remainder — say{" "}
                  <strong className="text-foreground">$5,000</strong> — is repaid at{" "}
                  <strong className="text-foreground">$84/month</strong> over 5 years at{" "}
                  <strong className="text-foreground">zero percent interest</strong>.
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-center">
                    <p className="font-bold text-foreground text-base">0%</p>
                    <p className="text-muted-foreground">Interest</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="font-bold text-foreground text-base">60 mo</p>
                    <p className="text-muted-foreground">Typical term</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="font-bold text-foreground text-base">$0</p>
                    <p className="text-muted-foreground">Upfront cost</p>
                  </div>
                </div>
              </div>

              {/* Inline Scheduling */}
              <AnimatePresence mode="wait">
                {!scheduled ? (
                  <motion.div key="picker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="bg-secondary/40 p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-foreground">Pick a date</p>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
                            disabled={weekOffset === 0}
                            className="w-7 h-7 flex items-center justify-center border border-border hover:bg-background disabled:opacity-30 transition-colors"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setWeekOffset(Math.min(1, weekOffset + 1))}
                            disabled={weekOffset >= 1}
                            className="w-7 h-7 flex items-center justify-center border border-border hover:bg-background disabled:opacity-30 transition-colors"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {visibleDates.map((date) => {
                          const isSelected = selectedDate?.toDateString() === date.toDateString();
                          return (
                            <button
                              key={date.toISOString()}
                              onClick={() => setSelectedDate(date)}
                              className={`flex flex-col items-center py-2 px-1 text-xs transition-all ${
                                isSelected
                                  ? "bg-green-600 text-white"
                                  : "bg-background hover:bg-green-50 hover:border-green-300 border border-transparent"
                              }`}
                            >
                              <span className="font-medium text-[10px] mb-0.5 opacity-70">{DAY_NAMES[date.getDay()]}</span>
                              <span className="font-bold">{date.getDate()}</span>
                              <span className="text-[10px] opacity-70">{MONTH_NAMES[date.getMonth()]}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mb-4"
                      >
                        <p className="text-sm font-semibold text-foreground mb-2">Pick a time</p>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map(({ id, label, range, icon: Icon }) => (
                            <button
                              key={id}
                              onClick={() => setSelectedSlot(id)}
                              className={`flex flex-col items-center py-3 px-2 text-xs border-2 transition-all ${
                                selectedSlot === id
                                  ? "border-green-600 bg-green-50 text-green-800"
                                  : "border-border hover:border-green-300 bg-background"
                              }`}
                            >
                              <Icon className="w-4 h-4 mb-1 opacity-60" />
                              <span className="font-semibold">{label}</span>
                              <span className="text-muted-foreground mt-0.5">{range}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>Facility address: {address}</span>
                    </div>

                    <Button
                      onClick={() => setScheduled(true)}
                      disabled={!canSchedule}
                      className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-40 h-12 text-base font-semibold"
                    >
                      Request Free Audit <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    {canSchedule && (
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        No commitment — a PSE&G adviser will confirm within 1 business day.
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-14 h-14 bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-2">Audit Request Submitted!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {selectedDate && `${DAY_NAMES[selectedDate.getDay()]}, ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}`}
                      {selectedSlot && ` · ${TIME_SLOTS.find(s => s.id === selectedSlot)?.range}`}
                    </p>
                    <div className="bg-green-50 border border-green-100 p-4 text-left space-y-2 mb-4">
                      <p className="text-xs font-bold text-green-900">What happens next</p>
                      {[
                        "A PSE&G energy adviser confirms within 1 business day",
                        "On-site audit takes 2–4 hours (no disruption to operations)",
                        "You receive a custom savings report with recommended upgrades",
                        "Choose which upgrades to proceed with — no obligation",
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-green-800">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Confirmation sent to {user?.email || "your business email"}.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Track 2: Trade Ally / Prescriptive */}
          <div className="border-2 border-border bg-card relative overflow-hidden">
            <div className="bg-primary px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">PRESCRIPTIVE REBATE PROGRAM</span>
              </div>
              <Badge className="bg-[hsl(var(--brand-orange))] text-white border-none text-xs font-bold">50%+ BACK</Badge>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Any PSE&G business · Use your own contractor</span>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Already have a contractor or replacing equipment soon? Get <strong className="text-foreground">50%+ back</strong> on a wider range of commercial equipment — including food service, gas systems, and motors — using any PSE&G-approved Trade Ally.
              </p>

              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">What you can access</p>
                {PRESCRIPTIVE_INCLUDES.map(({ text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--brand-orange))] shrink-0" />
                    <span className="text-sm text-foreground">{text}</span>
                  </div>
                ))}
              </div>

              {/* Two rebate paths */}
              <div className="bg-[hsl(var(--brand-orange))]/5 border border-[hsl(var(--brand-orange))]/20 p-4 mb-5">
                <p className="text-xs font-bold text-foreground mb-3 uppercase tracking-wide">Two ways to claim</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[hsl(var(--brand-orange))] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Point-of-Sale</p>
                      <p className="text-xs text-muted-foreground">Deducted immediately at participating distributors. No waiting — the rebate reduces your purchase price on the spot.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Traditional (Post-Install)</p>
                      <p className="text-xs text-muted-foreground">Submit proof of purchase and installation after the fact. Credited to your PSE&G bill within 4–6 weeks.</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/business/prescriptive">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold">
                  Browse Prescriptive Rebates <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Includes a Trade Ally locator and full equipment catalog.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Which program fits your situation?</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-border/50">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground w-1/2">Feature</th>
                  <th className="text-center px-4 py-3 text-sm font-bold text-green-700 w-1/4">Direct Install</th>
                  <th className="text-center px-4 py-3 text-sm font-bold text-primary w-1/4">Prescriptive</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-background" : "bg-secondary/20"}>
                    <td className="px-4 py-3 text-sm text-foreground">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      {row.special ? (
                        <span className="text-sm font-semibold text-green-700">{row.direct as string}</span>
                      ) : row.direct ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground text-lg leading-none">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.special ? (
                        <span className="text-sm font-semibold text-primary">{row.prescriptive as string}</span>
                      ) : row.prescriptive ? (
                        <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                      ) : (
                        <span className="text-muted-foreground text-lg leading-none">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Many businesses use both — Direct Install for a free audit first, then Prescriptive for equipment beyond the program scope.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="p-6 md:p-8 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--brand-orange))]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Questions? Talk to an energy adviser.</h3>
              <p className="text-white/60 text-sm">
                Our commercial team can walk you through eligibility, scope, and the best combination of programs for your facility.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="mailto:PSEG-CleanEnergy@pseg.com">
                <Button size="lg" className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white shadow-lg w-full sm:w-auto">
                  Email an Adviser <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
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
