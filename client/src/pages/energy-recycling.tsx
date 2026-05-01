import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Recycle, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight,
  Sun, Cloud, Moon, CalendarDays, MapPin, DollarSign,
  Refrigerator, Wind, Droplets,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface Appliance {
  id: string;
  name: string;
  credit: string;
  creditValue: number;
  description: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  note?: string;
}

const APPLIANCES: Appliance[] = [
  {
    id: "refrigerator",
    name: "Refrigerator",
    credit: "$50",
    creditValue: 50,
    description: "Full-size or mini fridge, must be working",
    icon: Refrigerator,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    id: "chest-freezer",
    name: "Chest Freezer",
    credit: "$50",
    creditValue: 50,
    description: "Working chest or stand-up freezer",
    icon: Refrigerator,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    id: "upright-freezer",
    name: "Upright Freezer",
    credit: "$50",
    creditValue: 50,
    description: "Working upright standalone freezer",
    icon: Refrigerator,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
  },
  {
    id: "room-ac",
    name: "Room Air Conditioner",
    credit: "$25",
    creditValue: 25,
    description: "Window or portable AC unit, must be working",
    icon: Wind,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    note: "Max 2 units per household",
  },
  {
    id: "dehumidifier",
    name: "Dehumidifier",
    credit: "$25",
    creditValue: 25,
    description: "Portable or whole-home dehumidifier",
    icon: Droplets,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
  },
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning", range: "8 AM – 12 PM", icon: Sun },
  { id: "afternoon", label: "Afternoon", range: "12 PM – 4 PM", icon: Cloud },
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  let day = new Date(today);
  day.setDate(day.getDate() + 3); // 3-day lead time
  while (dates.length < 10) {
    if (day.getDay() !== 0 && day.getDay() !== 6) { // weekdays only
      dates.push(new Date(day));
    }
    day.setDate(day.getDate() + 1);
  }
  return dates;
}

const AVAILABLE_DATES = getAvailableDates();

type Step = 1 | 2 | 3 | "done";

const STEPS = [
  { num: 1, label: "Select Appliance" },
  { num: 2, label: "Pick a Date" },
  { num: 3, label: "Confirm" },
];

export default function EnergyRecycling() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [selectedAppliance, setSelectedAppliance] = useState<Appliance | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);

  const address = user?.address
    ? `${user.address}, ${user.city || "Springfield"}, ${user.state || "NJ"} ${user.zip || "07001"}`
    : "123 Maple Avenue, Springfield, NJ 07001";

  const visibleDates = AVAILABLE_DATES.slice(weekOffset * 5, weekOffset * 5 + 5);

  function formatDate(d: Date) {
    return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-14 relative z-10 max-w-6xl">
          <Link href="/energy">
            <a className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to My Energy Plan
            </a>
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            <Recycle className="w-3.5 h-3.5" /> Appliance Recycling
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Retire Your Old Appliance, Earn a Bill Credit
          </h1>
          <p className="text-white/70 text-base max-w-xl">
            We pick up your old, working appliance for free and credit your bill within one billing cycle. Takes about 3 minutes to schedule.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-3xl">

        {step !== "done" && (
          <div className="mb-8">
            {/* Step indicator */}
            <div className="flex items-center gap-0 mb-2">
              {STEPS.map((s, i) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className={`flex items-center gap-2 shrink-0 ${i > 0 ? "ml-auto" : ""}`}>
                    <div className={`w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors ${
                      step === s.num
                        ? "bg-primary text-white"
                        : (typeof step === "number" && step > s.num) || step === "done"
                        ? "bg-green-500 text-white"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {((typeof step === "number" && step > s.num) || step === "done")
                        ? <CheckCircle2 className="w-4 h-4" />
                        : s.num}
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                      typeof step === "number" && step > s.num ? "bg-green-500" : "bg-border"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              {STEPS.map(s => (
                <span key={s.num} className={step === s.num ? "text-primary font-semibold" : ""}>{s.label}</span>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* Step 1: Select Appliance */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold text-foreground mb-2">What are you recycling?</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Appliance must be in working condition. We'll recycle it safely and credit your bill.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {APPLIANCES.map((a) => {
                  const Icon = a.icon;
                  const isSelected = selectedAppliance?.id === a.id;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setSelectedAppliance(a)}
                      className={`flex items-center gap-4 p-4 border-2 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40 bg-card"
                      }`}
                    >
                      <div className={`w-12 h-12 ${a.iconBg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-6 h-6 ${a.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-foreground text-sm">{a.name}</p>
                          <span className={`text-sm font-bold shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                            {a.credit}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{a.description}</p>
                        {a.note && <p className="text-xs text-amber-600 mt-0.5">{a.note}</p>}
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedAppliance}
                className="w-full h-12 text-base bg-primary text-white disabled:opacity-40"
              >
                Continue <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Pick a Date */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold text-foreground mb-1">Pick a Pickup Date</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Weekdays only. Please have the appliance accessible and near the door.
              </p>

              {/* Selected appliance reminder */}
              {selectedAppliance && (
                <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 mb-5">
                  <div className={`w-8 h-8 ${selectedAppliance.iconBg} flex items-center justify-center shrink-0`}>
                    <selectedAppliance.icon className={`w-4 h-4 ${selectedAppliance.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{selectedAppliance.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedAppliance.credit} bill credit</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2">
                    Change
                  </button>
                </div>
              )}

              {/* Date picker */}
              <div className="bg-secondary/30 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-foreground">Available dates</p>
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
                <div className="grid grid-cols-5 gap-2">
                  {visibleDates.map((date) => {
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`flex flex-col items-center py-3 px-1 border-2 text-xs transition-all ${
                          isSelected
                            ? "border-primary bg-primary text-white"
                            : "border-border bg-background hover:border-primary/40"
                        }`}
                      >
                        <span className="font-medium text-[10px] mb-0.5 opacity-70">{DAY_NAMES[date.getDay()]}</span>
                        <span className="font-bold text-sm">{date.getDate()}</span>
                        <span className="text-[10px] opacity-70">{MONTH_NAMES[date.getMonth()]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-5"
                >
                  <p className="text-sm font-semibold text-foreground mb-2">Pick a window</p>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map(({ id, label, range, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setSelectedSlot(id)}
                        className={`flex items-center gap-3 p-4 border-2 text-left transition-all ${
                          selectedSlot === id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40 bg-card"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{label}</p>
                          <p className="text-xs text-muted-foreground">{range}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <Button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedSlot}
                className="w-full h-12 text-base bg-primary text-white disabled:opacity-40"
              >
                Review Pickup <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <button onClick={() => setStep(1)} className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-3 transition-colors">
                ← Back
              </button>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold text-foreground mb-1">Confirm Your Pickup</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Everything looks good? Hit confirm and we'll take it from there.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-4 p-4 bg-card border border-border/50">
                  <Recycle className="w-5 h-5 text-purple-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Appliance</p>
                    <p className="font-semibold text-foreground">{selectedAppliance?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-card border border-border/50">
                  <CalendarDays className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Pickup Date & Time</p>
                    <p className="font-semibold text-foreground">
                      {selectedDate && formatDate(selectedDate)} ·{" "}
                      {TIME_SLOTS.find(s => s.id === selectedSlot)?.label}{" "}
                      ({TIME_SLOTS.find(s => s.id === selectedSlot)?.range})
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card border border-border/50">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Pickup Address</p>
                    <p className="font-semibold text-foreground">{address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200">
                  <DollarSign className="w-5 h-5 text-green-700 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-green-600">Bill Credit</p>
                    <p className="font-bold text-green-800 text-lg">{selectedAppliance?.credit} applied to your next bill</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-3 text-xs text-amber-800 mb-5">
                Please have the appliance accessible and within 10 feet of the door. The crew will call 30 minutes before arrival.
              </div>

              <Button
                onClick={() => setStep("done")}
                className="w-full h-12 text-base bg-primary text-white"
              >
                Confirm Pickup <CheckCircle2 className="w-4 h-4 ml-1" />
              </Button>
              <button onClick={() => setStep(2)} className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-3 transition-colors">
                ← Back
              </button>
            </motion.div>
          )}

          {/* Success */}
          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-11 h-11 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Pickup Scheduled!</h2>
              <p className="text-muted-foreground mb-1">
                {selectedDate && formatDate(selectedDate)} ·{" "}
                {TIME_SLOTS.find(s => s.id === selectedSlot)?.range}
              </p>
              <p className="text-muted-foreground text-sm mb-6">{address}</p>

              <div className="bg-green-50 border border-green-200 p-4 text-left mb-6 max-w-sm mx-auto">
                <p className="text-sm font-bold text-green-900 mb-3">What happens next</p>
                {[
                  "Confirmation emailed to " + (user?.email || "your email"),
                  "Crew calls 30 min before arrival",
                  selectedAppliance?.credit + " applied to your next bill",
                  "Old appliance is recycled responsibly",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-green-800 mb-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/energy">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Back to My Energy Plan
                  </Button>
                </Link>
                <Link href="/energy/rebates">
                  <Button className="w-full sm:w-auto bg-primary text-white">
                    Browse Rebates Too <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
