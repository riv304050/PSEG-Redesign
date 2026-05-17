import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Zap, CheckCircle2, ArrowRight, Clock,
  Thermometer, Lightbulb, PlugZap, FileText,
  DollarSign, Wrench, Award, ChevronLeft, ChevronRight,
  CalendarDays, Sun, Cloud, Moon, Heart, Flame, Droplets,
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
  day.setDate(day.getDate() + 1);
  while (dates.length < 14) {
    if (day.getDay() !== 0) {
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

const AVAILABLE_DATES = getAvailableDates();
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const JUMP_LINKS = [
  { id: "comfort-partners", label: "Comfort Partners", sub: "No cost · Income-eligible", color: "border-l-purple-600 bg-purple-50 hover:bg-purple-100" },
  { id: "weatherization", label: "Home Weatherization", sub: "Reduced cost · Income-eligible", color: "border-l-emerald-600 bg-emerald-50 hover:bg-emerald-100" },
  { id: "free-checkup", label: "Free Home Energy Checkup", sub: "Free · All customers", color: "border-l-green-600 bg-green-50 hover:bg-green-100" },
  { id: "whole-home", label: "Whole Home Upgrade", sub: "~$100–200 · 0% financing", color: "border-l-blue-600 bg-blue-50 hover:bg-blue-100" },
];

export default function EnergyAssessment() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [scheduled, setScheduled] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [cpSubmitted, setCpSubmitted] = useState(false);
  const [wzSubmitted, setWzSubmitted] = useState(false);

  const address = user?.address ? `${user.address}, ${user.city || "NJ"}` : "123 Maple Avenue, Springfield, NJ";

  const visibleDates = AVAILABLE_DATES.slice(weekOffset * 7, weekOffset * 7 + 7);
  const canSchedule = selectedDate && selectedSlot;

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
            <Home className="w-3.5 h-3.5" /> Home Assessments
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Find the Right Home Assessment
          </h1>
          <p className="text-white/70 text-base max-w-xl">
            PSE&G offers three completely free programs. Your household income determines which one provides the most benefits — start with the one that fits.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">

        {/* Quick-jump nav */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
          {JUMP_LINKS.map(({ id, label, sub, color }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`border-l-4 ${color} px-3 py-2.5 transition-colors`}
            >
              <p className="text-sm font-semibold text-foreground leading-tight">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </a>
          ))}
        </div>

        {/* ── Comfort Partners ── */}
        <section id="comfort-partners" className="mb-10 scroll-mt-6">
          <div className="border-2 border-purple-300 bg-card overflow-hidden">
            <div className="bg-purple-700 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-white" />
                <div>
                  <span className="text-white font-bold text-sm block">COMFORT PARTNERS PROGRAM</span>
                  <span className="text-purple-200 text-xs">For lower-income households — the most enhanced benefits available</span>
                </div>
              </div>
              <Badge className="bg-white text-purple-800 border-none text-xs font-bold shrink-0">NO COST</Badge>
            </div>

            <div className="p-5 md:p-6">
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-3xl">
                PSE&G's Comfort Partners program delivers comprehensive whole-home energy upgrades at <strong className="text-foreground">little to no out-of-pocket cost</strong> for income-eligible customers. A program specialist assesses your home and coordinates all approved work — no upfront payment required.
              </p>

              <div className="grid md:grid-cols-3 gap-5 mb-6">
                {/* What's covered */}
                <div>
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">What may be covered</p>
                  <div className="space-y-2.5">
                    {[
                      { icon: Home, text: "Attic & wall insulation" },
                      { icon: Flame, text: "Heating system replacement" },
                      { icon: Droplets, text: "Water heater replacement" },
                      { icon: Zap, text: "Air sealing & weatherization" },
                      { icon: Lightbulb, text: "Energy-efficient lighting" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-purple-100 flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5 text-purple-700" />
                        </div>
                        <span className="text-sm text-foreground">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Income eligibility */}
                <div>
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">Income eligibility</p>
                  <div className="bg-purple-50 border border-purple-100 p-4">
                    <p className="text-xs text-purple-800 mb-3 leading-relaxed">
                      Based on ~225% of the Federal Poverty Level (NJ 2024 estimates):
                    </p>
                    <div className="space-y-1.5">
                      {[
                        ["1–2 person household", "Under ~$46,000/yr"],
                        ["3–4 person household", "Under ~$70,000/yr"],
                        ["5+ person household", "Under ~$84,000/yr"],
                      ].map(([size, range]) => (
                        <div key={size} className="flex justify-between gap-2 py-1.5 border-b border-purple-100 last:border-0 text-xs">
                          <span className="text-purple-900">{size}</span>
                          <span className="font-bold text-purple-900">{range}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-purple-600 mt-3">Eligibility confirmed during application. Additional factors may apply.</p>
                  </div>
                </div>

                {/* How it works */}
                <div>
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">How it works</p>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "Submit interest — PSE&G calls you within 2 business days" },
                      { step: "2", text: "Specialist visits your home to assess and confirm eligibility" },
                      { step: "3", text: "Approved upgrades are scheduled and completed at no cost" },
                    ].map(({ step, text }) => (
                      <div key={step} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-700 text-white text-xs font-bold shrink-0 mt-0.5">
                          {step}
                        </span>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {!cpSubmitted ? (
                <div className="bg-purple-50 border border-purple-200 p-4 max-w-lg">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Submit your interest — we'll confirm eligibility and call you within 2 business days.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-white border border-purple-100 p-2">
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium">{user?.firstName} {user?.lastName || "Johnson"}</p>
                    </div>
                    <div className="bg-white border border-purple-100 p-2">
                      <p className="text-xs text-muted-foreground">Account #</p>
                      <p className="font-medium">{user?.accountNumber || "123456789"}</p>
                    </div>
                    <div className="bg-white border border-purple-100 p-2 sm:col-span-2">
                      <p className="text-xs text-muted-foreground">Service Address</p>
                      <p className="font-medium">{address}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      className="bg-purple-700 hover:bg-purple-800 text-white"
                      onClick={() => setCpSubmitted(true)}
                    >
                      Submit Interest <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                    <a href="https://nj.gov/dca/dcaid/comfortpartners/" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                        Official Program Info
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 bg-purple-50 border border-purple-200 p-4 max-w-lg"
                >
                  <CheckCircle2 className="w-8 h-8 text-purple-600 shrink-0" />
                  <div>
                    <p className="font-bold text-purple-900">Interest submitted!</p>
                    <p className="text-sm text-purple-700">A PSE&G representative will call you within 2 business days to confirm eligibility and next steps.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── Home Weatherization ── */}
        <section id="weatherization" className="mb-10 scroll-mt-6">
          <div className="border-2 border-emerald-300 bg-card overflow-hidden">
            <div className="bg-emerald-700 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-white" />
                <div>
                  <span className="text-white font-bold text-sm block">HOME WEATHERIZATION PROGRAM</span>
                  <span className="text-emerald-200 text-xs">For moderate-income households — enhanced upgrades at reduced cost</span>
                </div>
              </div>
              <Badge className="bg-white text-emerald-800 border-none text-xs font-bold shrink-0">REDUCED COST</Badge>
            </div>

            <div className="p-5 md:p-6">
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-3xl">
                PSE&G's Home Weatherization program provides insulation, air sealing, and heating efficiency improvements at <strong className="text-foreground">significantly reduced or no cost</strong> for qualifying moderate-income households.
              </p>

              <div className="grid md:grid-cols-3 gap-5 mb-6">
                {/* What's included */}
                <div>
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">What's included</p>
                  <div className="space-y-2.5">
                    {[
                      { icon: Home, text: "Attic & wall insulation" },
                      { icon: Zap, text: "Air sealing & weatherization" },
                      { icon: Flame, text: "Heating improvements" },
                      { icon: Lightbulb, text: "Energy education" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-emerald-100 flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5 text-emerald-700" />
                        </div>
                        <span className="text-sm text-foreground">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Income eligibility */}
                <div>
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">Income eligibility</p>
                  <div className="bg-emerald-50 border border-emerald-100 p-4">
                    <p className="text-xs text-emerald-800 mb-3 leading-relaxed">
                      For households earning roughly 250%–400% of the Federal Poverty Level:
                    </p>
                    <div className="space-y-1.5">
                      {[
                        ["1–2 person household", "$46K – $82K/yr"],
                        ["3–4 person household", "$70K – $125K/yr"],
                        ["5+ person household", "$84K – $150K/yr"],
                      ].map(([size, range]) => (
                        <div key={size} className="flex justify-between gap-2 py-1.5 border-b border-emerald-100 last:border-0 text-xs">
                          <span className="text-emerald-900">{size}</span>
                          <span className="font-bold text-emerald-900">{range}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-emerald-600 mt-3">Eligibility confirmed during application. Additional factors may apply.</p>
                  </div>
                </div>

                {/* How it works */}
                <div>
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">How it works</p>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "Submit interest — PSE&G calls you within 2 business days" },
                      { step: "2", text: "Specialist visits your home to assess and confirm eligibility" },
                      { step: "3", text: "Approved work is completed at reduced or no cost" },
                    ].map(({ step, text }) => (
                      <div key={step} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-700 text-white text-xs font-bold shrink-0 mt-0.5">
                          {step}
                        </span>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {!wzSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 max-w-lg">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Submit your interest — we'll confirm eligibility and call you within 2 business days.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-white border border-emerald-100 p-2">
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium">{user?.firstName} {user?.lastName || "Johnson"}</p>
                    </div>
                    <div className="bg-white border border-emerald-100 p-2">
                      <p className="text-xs text-muted-foreground">Account #</p>
                      <p className="font-medium">{user?.accountNumber || "123456789"}</p>
                    </div>
                    <div className="bg-white border border-emerald-100 p-2 sm:col-span-2">
                      <p className="text-xs text-muted-foreground">Service Address</p>
                      <p className="font-medium">{address}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      className="bg-emerald-700 hover:bg-emerald-800 text-white"
                      onClick={() => setWzSubmitted(true)}
                    >
                      Submit Interest <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                    <a href="https://homeenergy.pseg.com/home-weatherization" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-100">
                        Official Program Info
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 p-4 max-w-lg"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-emerald-900">Interest submitted!</p>
                    <p className="text-sm text-emerald-700">A PSE&G representative will call you within 2 business days to confirm eligibility and next steps.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── Free Home Energy Checkup ── */}
        <section id="free-checkup" className="mb-10 scroll-mt-6">
          <div className="border-2 border-green-200 bg-card overflow-hidden">
            <div className="bg-green-600 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Home className="w-5 h-5 text-white" />
                <div>
                  <span className="text-white font-bold text-sm block">FREE HOME ENERGY CHECKUP</span>
                  <span className="text-green-200 text-xs">Available to all PSE&G customers — no income requirement</span>
                </div>
              </div>
              <Badge className="bg-white text-green-700 border-none text-xs font-bold shrink-0">FREE</Badge>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">About 1 hour · Products installed same day</span>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-3xl">
                A PSE&G energy advisor visits your home, installs efficiency products on the spot, and leaves you with a personalized report showing exactly where your money is going.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
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
                </div>

                {/* Inline scheduling */}
                <div>
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
                                      : "bg-background hover:bg-green-50 border border-transparent hover:border-green-300"
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
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-4">
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
                          onClick={() => setScheduled(true)}
                          disabled={!canSchedule}
                          className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-40 h-12 text-base font-semibold"
                        >
                          Confirm Free Checkup <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        {canSchedule && (
                          <p className="text-xs text-center text-muted-foreground mt-2">No commitment — reschedule or cancel anytime.</p>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                        <div className="w-14 h-14 bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-bold text-foreground text-lg mb-2">You're scheduled!</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {selectedDate && `${DAY_NAMES[selectedDate.getDay()]}, ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}`}
                          {selectedSlot && ` · ${TIME_SLOTS.find((s) => s.id === selectedSlot)?.range}`}
                        </p>
                        <div className="bg-green-50 border border-green-100 p-4 text-left space-y-2 mb-4">
                          <p className="text-xs font-bold text-green-900">What to expect</p>
                          {[
                            "PSE&G advisor arrives in a marked vehicle",
                            "Installs all products that day",
                            "Walkthrough of your custom savings report",
                            "Takes about 60 minutes total",
                          ].map((item) => (
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
            </div>
          </div>
        </section>

        {/* ── Whole Home Upgrade ── */}
        <section id="whole-home" className="mb-10 scroll-mt-6">
          <div className="border-2 border-border bg-card overflow-hidden">
            <div className="bg-primary px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Wrench className="w-5 h-5 text-white" />
                <div>
                  <span className="text-white font-bold text-sm block">WHOLE HOME UPGRADE PROGRAM</span>
                  <span className="text-white/60 text-xs">Paid contractor assessment · 0% on-bill financing for upgrades</span>
                </div>
              </div>
              <Badge className="bg-[hsl(var(--brand-orange))] text-white border-none text-xs font-bold shrink-0">0% FINANCING</Badge>
            </div>

            <div className="p-5 md:p-6">
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-3xl">
                A certified contractor performs a deep-dive assessment of your home's envelope, HVAC, and more. When you choose to proceed with upgrades, PSE&G finances them at <strong className="text-foreground">0% interest</strong> — payments go right on your monthly bill.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-5">
                <div>
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">What's included</p>
                  <div className="space-y-2">
                    {CONTRACTOR_INCLUDES.map(({ text }) => (
                      <div key={text} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[hsl(var(--brand-orange))] shrink-0" />
                        <span className="text-sm text-foreground">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-3">On-bill financing</p>
                  <div className="bg-primary/5 border border-primary/10 p-4 mb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      If your upgrades cost <strong className="text-foreground">$8,000</strong>, that's about{" "}
                      <strong className="text-foreground">$67/month</strong> over 10 years at <strong className="text-foreground">zero percent interest</strong>. Energy savings typically offset most or all of the payment.
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      {[["0%", "Interest"], ["10 yrs", "Max term"], ["$7,500", "Max financed"]].map(([val, label]) => (
                        <div key={label} className="text-center">
                          <p className="font-bold text-foreground text-base">{val}</p>
                          <p className="text-muted-foreground">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 p-3 text-xs text-amber-800">
                    <strong>Assessment fee: ~$100–200</strong> — paid to the contractor. No obligation to proceed with upgrades.
                  </div>
                </div>
              </div>

              <a href="https://homeenergy.pseg.com/find-contractor" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-primary/90 text-white h-11 font-semibold">
                  Find a Contractor Near Me <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                Opens PSE&G's approved contractor directory. Your zip code is pre-filled.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-foreground mb-4">Program Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-border/50 text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Feature</th>
                  <th className="text-center px-3 py-3 font-bold text-purple-700">Comfort Partners</th>
                  <th className="text-center px-3 py-3 font-bold text-emerald-700">Weatherization</th>
                  <th className="text-center px-3 py-3 font-bold text-green-700">Free Checkup</th>
                  <th className="text-center px-3 py-3 font-bold text-primary">Whole Home</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Cost to customer", cp: "Free", wz: "Reduced", std: "Free", wh: "~$100–200" },
                  { feature: "Income eligibility required", cp: "Yes", wz: "Yes", std: "No", wh: "No" },
                  { feature: "Insulation & air sealing", cp: "✓", wz: "✓", std: "—", wh: "✓" },
                  { feature: "Heating system upgrade", cp: "✓", wz: "✓", std: "—", wh: "✓" },
                  { feature: "Smart thermostat", cp: "—", wz: "—", std: "✓", wh: "—" },
                  { feature: "LED bulbs & power strips", cp: "—", wz: "—", std: "✓", wh: "—" },
                  { feature: "0% on-bill financing", cp: "—", wz: "—", std: "—", wh: "✓" },
                  { feature: "Custom savings report", cp: "✓", wz: "✓", std: "✓", wh: "✓" },
                ].map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-background" : "bg-secondary/20"}>
                    <td className="px-4 py-3 text-foreground font-medium">{row.feature}</td>
                    <td className="px-3 py-3 text-center text-muted-foreground">{row.cp}</td>
                    <td className="px-3 py-3 text-center text-muted-foreground">{row.wz}</td>
                    <td className="px-3 py-3 text-center text-muted-foreground">{row.std}</td>
                    <td className="px-3 py-3 text-center text-muted-foreground">{row.wh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Many customers complete the free checkup first, then apply for income-eligible programs or the whole-home upgrade for deeper improvements.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
