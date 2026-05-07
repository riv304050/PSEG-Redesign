import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight,
  Building2, Layers, Users2, DollarSign, Shield,
  Lightbulb, Wind, Refrigerator, Wrench,
  CalendarDays, Sun, Cloud, Moon,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

type BuildingType = "garden" | "midrise" | "highrise" | "";

const BUILDING_TYPES = [
  {
    value: "garden",
    label: "Garden Apartments",
    sub: "1–3 stories",
    icon: Home,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    highlights: [
      "In-unit heating system upgrades",
      "Common area LED lighting",
      "Insulation and air sealing",
      "Common HVAC and domestic hot water",
      "60-month on-bill repayment",
    ],
  },
  {
    value: "midrise",
    label: "Mid-Rise Buildings",
    sub: "4–12 stories",
    icon: Building2,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    highlights: [
      "Central HVAC and chiller plant upgrades",
      "Elevator and common area efficiency",
      "LED retrofits in hallways and parking",
      "Building automation and controls",
      "60-month on-bill repayment",
    ],
  },
  {
    value: "highrise",
    label: "High-Rise & Mixed-Use",
    sub: "13+ stories",
    icon: Layers,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    highlights: [
      "Complex HVAC and central plant systems",
      "Commercial / residential mixed upgrade programs",
      "Full Engineered Solutions pathway available",
      "Highest per-project incentive potential",
      "Up to 120-month on-bill repayment",
    ],
  },
] as const;

function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  let day = new Date(today);
  day.setDate(day.getDate() + 2);
  while (dates.length < 14) {
    if (day.getDay() !== 0 && day.getDay() !== 6) {
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

const UPGRADE_CATEGORIES = [
  { icon: Lightbulb, label: "Lighting", desc: "Common areas, parking, hallways, exterior", color: "bg-yellow-100 text-yellow-700" },
  { icon: Wind, label: "HVAC", desc: "Central systems, in-unit heating, ventilation", color: "bg-blue-100 text-blue-700" },
  { icon: Refrigerator, label: "Appliances", desc: "In-unit appliances in owner-managed units", color: "bg-slate-100 text-slate-700" },
  { icon: Wrench, label: "Building Envelope", desc: "Insulation, air sealing, weatherization", color: "bg-green-100 text-green-700" },
  { icon: DollarSign, label: "Domestic Hot Water", desc: "Central boilers and heat pump water heaters", color: "bg-orange-100 text-orange-700" },
  { icon: Home, label: "In-Unit Improvements", desc: "For buildings with owner-controlled units", color: "bg-teal-100 text-teal-700" },
];

const AVAILABLE_DATES = getAvailableDates();
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function BusinessMultifamily() {
  const { user } = useAuth();
  const [buildingType, setBuildingType] = useState<BuildingType>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [scheduled, setScheduled] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  const address = user?.address ? `${user.address}, ${user.city || "NJ"}` : "200 Riverside Dr, Newark, NJ";
  const selectedBuilding = BUILDING_TYPES.find(b => b.value === buildingType);
  const visibleDates = AVAILABLE_DATES.slice(weekOffset * 7, weekOffset * 7 + 7);
  const canSchedule = selectedDate && selectedSlot;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-14 relative z-10 max-w-6xl">
          <Link href="/business/energy">
            <a className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to Commercial Programs
            </a>
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            <Home className="w-3.5 h-3.5" /> Multifamily Program
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Upgrades for Apartment Buildings
          </h1>
          <p className="text-white/70 text-base max-w-xl mb-8">
            For buildings with 3 or more units. Free no-cost assessment, rebates through Trade Allies, and interest-free on-bill repayment — with no disruption to residents.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: Users2, text: "3+ unit buildings" },
              { icon: DollarSign, text: "Rebates + on-bill repayment" },
              { icon: Shield, text: "0% interest financing" },
              { icon: Home, text: "Garden, mid-rise & high-rise" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon className="w-4 h-4 text-purple-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">

        {/* Building Type Selector */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">What type of building?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {BUILDING_TYPES.map((b) => {
              const Icon = b.icon;
              const isSelected = buildingType === b.value;
              return (
                <button
                  key={b.value}
                  onClick={() => setBuildingType(b.value as BuildingType)}
                  className={`flex items-start gap-4 p-5 border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className={`w-11 h-11 flex items-center justify-center shrink-0 ${isSelected ? "bg-primary" : b.iconBg}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-white" : b.iconColor}`} />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>{b.label}</p>
                    <p className="text-xs text-muted-foreground">{b.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selectedBuilding && (
              <motion.div
                key={buildingType}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-card border border-border/50 p-5 md:p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <selectedBuilding.icon className={`w-4 h-4 ${selectedBuilding.iconColor}`} />
                  <p className="text-sm font-bold text-foreground">{selectedBuilding.label} — eligible upgrades</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedBuilding.highlights.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                {buildingType === "highrise" && (
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <p className="text-sm text-muted-foreground">
                      High-rise buildings may qualify for the{" "}
                      <Link href="/business/engineered-solutions">
                        <a className="text-primary font-semibold underline underline-offset-2">Engineered Solutions Program</a>
                      </Link>
                      {" "}— offering a full investment-grade audit, design documents, and up to 120-month repayment.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* What we upgrade */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-2">What gets upgraded</h2>
          <p className="text-sm text-muted-foreground mb-6">Scope is determined during the free assessment based on your building's systems.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {UPGRADE_CATEGORIES.map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="bg-card border border-border/50 p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
                <div className={`w-9 h-9 flex items-center justify-center shrink-0 ${color.split(" ")[0]}`}>
                  <Icon className={`w-4 h-4 ${color.split(" ")[1]}`} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Scheduler */}
        <div className="mb-12 border-2 border-border bg-card">
          <div className="bg-primary px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">FREE NO-COST ASSESSMENT</span>
            </div>
            <Badge className="bg-white text-primary border-none text-xs font-bold">FREE</Badge>
          </div>

          <div className="p-5 md:p-6">
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              A PSE&G energy specialist visits your property, reviews energy consumption and billing, and develops a customized upgrade plan. No cost, no obligation.
            </p>

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
                                ? "bg-primary text-white"
                                : "bg-background hover:bg-primary/10 hover:border-primary/30 border border-transparent"
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
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border hover:border-primary/30 bg-background"
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
                    <span>Property address: {address}</span>
                  </div>

                  <Button
                    onClick={() => setScheduled(true)}
                    disabled={!canSchedule}
                    className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-40 h-12 text-base font-semibold"
                  >
                    Schedule Free Assessment <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  {canSchedule && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      No commitment — a PSE&G specialist will confirm within 1 business day.
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
                  <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">Assessment Requested!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedDate && `${DAY_NAMES[selectedDate.getDay()]}, ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}`}
                    {selectedSlot && ` · ${TIME_SLOTS.find(s => s.id === selectedSlot)?.range}`}
                  </p>
                  <div className="bg-primary/5 border border-primary/10 p-4 text-left space-y-2 mb-4">
                    <p className="text-xs font-bold text-foreground">What happens next</p>
                    {[
                      "PSE&G specialist confirms within 1 business day",
                      "On-site visit covers all common areas and systems",
                      "Customized upgrade plan delivered within 2 weeks",
                      "You choose which upgrades to move forward with",
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 md:p-8 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--brand-orange))]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Large or complex building?</h3>
              <p className="text-white/60 text-sm">
                High-rise and mixed-use buildings may qualify for the Engineered Solutions Program — with a free investment-grade audit, bid-ready design documents, and extended 120-month repayment.
              </p>
            </div>
            <Link href="/business/engineered-solutions">
              <Button size="lg" className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white shadow-lg shrink-0">
                Explore Engineered Solutions <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
