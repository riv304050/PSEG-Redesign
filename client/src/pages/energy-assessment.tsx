import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Zap, CheckCircle2, ArrowRight, Clock,
  Thermometer, Lightbulb, PlugZap, FileText,
  DollarSign, Wrench, Award, ChevronLeft, ChevronRight,
  CalendarDays, Sun, Cloud, Moon,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

// Generate the next 14 available weekdays
function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  let day = new Date(today);
  day.setDate(day.getDate() + 1);
  while (dates.length < 14) {
    if (day.getDay() !== 0) { // exclude Sundays
      dates.push(new Date(day));
    }
    day.setDate(day.getDate() + 1);
  }
  return dates;
}

const TIME_SLOTS = [
  { id: "morning", label: "Morning", range: "8 AM – 12 PM", icon: Sun },
  { id: "afternoon", label: "Afternoon", range: "12 PM – 4 PM", icon: Cloud },
  { id: "evening", label: "Evening", range: "4 PM – 7 PM", icon: Moon },
];

const FREE_INCLUDES = [
  { icon: Thermometer, text: "ENERGY STAR® smart thermostat ($250 value)" },
  { icon: Lightbulb, text: "LED light bulbs for your entire home" },
  { icon: PlugZap, text: "Advanced power strips" },
  { icon: FileText, text: "Custom energy savings report" },
];

const CONTRACTOR_INCLUDES = [
  { text: "Insulation assessment & upgrade plan" },
  { text: "HVAC system performance analysis" },
  { text: "Air sealing & duct testing" },
  { text: "Window and door efficiency review" },
  { text: "Personalized upgrade roadmap" },
];

const COMPARISON_ROWS = [
  { feature: "Energy usage analysis", free: true, contractor: true },
  { feature: "Smart thermostat (installed)", free: true, contractor: false },
  { feature: "LED bulbs & power strips", free: true, contractor: false },
  { feature: "Custom savings report", free: true, contractor: true },
  { feature: "Insulation & air sealing", free: false, contractor: true },
  { feature: "HVAC deep-dive", free: false, contractor: true },
  { feature: "Window & door audit", free: false, contractor: true },
  { feature: "On-bill financing (0%)", free: false, contractor: true },
  { feature: "Cost", free: "Free", contractor: "~$100–200", special: true },
];

const AVAILABLE_DATES = getAvailableDates();

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function EnergyAssessment() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [scheduled, setScheduled] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showWeatherizationForm, setShowWeatherizationForm] = useState(false);
  const [weatherizationSubmitted, setWeatherizationSubmitted] = useState(false);

  const address = user?.address ? `${user.address}, ${user.city || "NJ"}` : "123 Maple Avenue, Springfield, NJ";
  const firstName = user?.firstName || "Alex";

  const visibleDates = AVAILABLE_DATES.slice(weekOffset * 7, weekOffset * 7 + 7);
  const canSchedule = selectedDate && selectedSlot;

  function handleSchedule() {
    if (!canSchedule) return;
    setScheduled(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-14 relative z-10 max-w-6xl">
          <Link href="/energy">
            <a className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to My Energy Plan
            </a>
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 text-xs font-semibold mb-4">
            <Home className="w-3.5 h-3.5" /> Home Assessment
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Start with a Free Home Energy Checkup
          </h1>
          <p className="text-white/70 text-base max-w-xl">
            The easiest first step. One hour, completely free, and you walk away with real products installed and a custom savings report.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">

        {/* Two Tracks */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {/* Track 1: Free PSE&G Assessment */}
          <div className="border-2 border-green-200 bg-card relative overflow-hidden">
            <div className="bg-green-600 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">FREE HOME ENERGY CHECKUP</span>
              </div>
              <Badge className="bg-white text-green-700 border-none text-xs font-bold">FREE</Badge>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">About 1 hour · All PSE&G customers</span>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                A PSE&G energy advisor visits your home, installs efficiency products on the spot, and leaves you with a personalized report showing exactly where your money is going.
              </p>

              <div className="space-y-2.5 mb-6">
                <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">What you get — at no cost</p>
                {FREE_INCLUDES.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-green-100 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-green-700" />
                    </div>
                    <span className="text-sm text-foreground">{text}</span>
                  </div>
                ))}
              </div>

              {/* Inline Scheduling */}
              <AnimatePresence mode="wait">
                {!scheduled ? (
                  <motion.div
                    key="picker"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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
                      <span>Service address: {address}</span>
                    </div>

                    <Button
                      onClick={handleSchedule}
                      disabled={!canSchedule}
                      className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-40 h-12 text-base font-semibold"
                    >
                      Confirm Free Checkup <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    {canSchedule && (
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        No commitment — reschedule or cancel anytime.
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
                    <h3 className="font-bold text-foreground text-lg mb-2">You're scheduled!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {selectedDate && `${DAY_NAMES[selectedDate.getDay()]}, ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}`}
                      {selectedSlot && ` · ${TIME_SLOTS.find(s => s.id === selectedSlot)?.range}`}
                    </p>
                    <div className="bg-green-50 border border-green-100 p-4 text-left space-y-2 mb-4">
                      <p className="text-xs font-bold text-green-900">What to expect</p>
                      {["PSE&G advisor arrives in a marked vehicle", "Installs all products that day", "Walkthrough of your custom savings report", "Takes about 60 minutes total"].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-green-800">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Confirmation sent to {user?.email || "your email"}. You can reschedule anytime.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Track 2: Contractor Assessment */}
          <div className="border-2 border-border bg-card relative overflow-hidden">
            <div className="bg-primary px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">WHOLE HOME UPGRADE PROGRAM</span>
              </div>
              <Badge className="bg-[hsl(var(--brand-orange))] text-white border-none text-xs font-bold">0% FINANCING</Badge>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Licensed contractor · Paid assessment · Upgrades on your bill</span>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                A certified contractor performs a deep-dive assessment of your home's envelope, HVAC, and more. When you choose to do upgrades, PSE&G finances them at <strong className="text-foreground">0% interest</strong> — payments go right on your monthly bill.
              </p>

              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">What's included</p>
                {CONTRACTOR_INCLUDES.map(({ text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--brand-orange))] shrink-0" />
                    <span className="text-sm text-foreground">{text}</span>
                  </div>
                ))}
              </div>

              {/* On-bill financing explainer */}
              <div className="bg-primary/5 border border-primary/10 p-4 mb-5">
                <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">How on-bill financing works</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  If your upgrades cost <strong className="text-foreground">$8,000</strong>, that's about{" "}
                  <strong className="text-foreground">$67/month</strong> added to your bill over 10 years — at <strong className="text-foreground">zero percent interest</strong>. Your energy savings typically offset most or all of the payment.
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-center">
                    <p className="font-bold text-foreground text-base">0%</p>
                    <p className="text-muted-foreground">Interest</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="font-bold text-foreground text-base">10 yrs</p>
                    <p className="text-muted-foreground">Max term</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="font-bold text-foreground text-base">$7,500</p>
                    <p className="text-muted-foreground">Max financed</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-3 text-xs text-amber-800 mb-5">
                <strong>Assessment fee: ~$100–200</strong> — paid to the contractor directly. Only proceed with upgrades if you want to; there's no obligation.
              </div>

              <a
                href="https://homeenergy.pseg.com/find-contractor"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold">
                  Find a Contractor Near Me <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Opens PSE&G's approved contractor directory. Your zip code is pre-filled.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Which is right for you?</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-border/50">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground w-1/2">Feature</th>
                  <th className="text-center px-4 py-3 text-sm font-bold text-green-700 w-1/4">Free Checkup</th>
                  <th className="text-center px-4 py-3 text-sm font-bold text-primary w-1/4">Home Upgrade</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-background" : "bg-secondary/20"}>
                    <td className="px-4 py-3 text-sm text-foreground">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      {row.special ? (
                        <span className="text-sm font-bold text-green-700">{row.free as string}</span>
                      ) : row.free ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground text-lg leading-none">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.special ? (
                        <span className="text-sm font-semibold text-foreground">{row.contractor as string}</span>
                      ) : row.contractor ? (
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
          <p className="text-xs text-muted-foreground mt-3">Many customers do the free checkup first, then the contractor program for deeper upgrades.</p>
        </div>

        {/* Weatherization Section */}
        <div id="weatherization" className="border-2 border-emerald-200 bg-emerald-50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div className="w-12 h-12 bg-emerald-100 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-emerald-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-emerald-900">Home Weatherization Program</h2>
                <Badge className="bg-emerald-600 text-white border-none text-xs">Enhanced Benefits</Badge>
              </div>
              <p className="text-sm text-emerald-800 mb-4 leading-relaxed max-w-2xl">
                PSE&G's Comfort Partners program provides <strong>deeper energy efficiency upgrades</strong> with significantly reduced or no out-of-pocket costs for income-eligible households. Includes insulation, heating system upgrades, weatherization, and more.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {[
                  "Insulation at little to no cost",
                  "Heating system upgrades covered",
                  "Air sealing & weatherization",
                  "Energy education included",
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {!showWeatherizationForm && !weatherizationSubmitted && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => setShowWeatherizationForm(true)}
                  >
                    Check My Eligibility <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <a href="https://homeenergy.pseg.com/home-weatherization" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-100">
                      Learn More
                    </Button>
                  </a>
                </div>
              )}

              <AnimatePresence>
                {showWeatherizationForm && !weatherizationSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="bg-white border border-emerald-200 p-4 max-w-lg">
                      <p className="text-sm font-semibold text-foreground mb-3">
                        Submit your interest — we'll confirm eligibility and call you within 2 business days.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3 mb-4 text-sm">
                        <div className="bg-secondary/50 p-2">
                          <p className="text-xs text-muted-foreground">Name</p>
                          <p className="font-medium">{user?.firstName} {user?.lastName || "Johnson"}</p>
                        </div>
                        <div className="bg-secondary/50 p-2">
                          <p className="text-xs text-muted-foreground">Account #</p>
                          <p className="font-medium">{user?.accountNumber || "123456789"}</p>
                        </div>
                        <div className="bg-secondary/50 p-2 sm:col-span-2">
                          <p className="text-xs text-muted-foreground">Service Address</p>
                          <p className="font-medium">{address}</p>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => setWeatherizationSubmitted(true)}
                      >
                        Submit Interest <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {weatherizationSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 flex items-center gap-3 bg-white border border-emerald-200 p-4 max-w-lg"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-900">Interest submitted!</p>
                      <p className="text-sm text-emerald-700">A PSE&G representative will call you within 2 business days to confirm eligibility and next steps.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
