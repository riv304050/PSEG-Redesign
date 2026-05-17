import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Phone, Heart,
  Wallet, Home, Leaf, CreditCard, Clock, AlertCircle,
  ShieldCheck, Zap, HandCoins, Users, ExternalLink, CalendarCheck, AlertTriangle, Loader2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "situation" | "arrangement" | "income" | "audit" | "results";

type Situation = "past-due" | "high-monthly" | "high-usage" | "exploring";
type Arrangement = "yes" | "no";
type HouseholdSize = "1-2" | "3-4" | "5+";
type IncomeTier = "benefits" | "low" | "moderate" | "higher";
type Audit = "yes" | "no";

interface Answers {
  situation: Situation | null;
  arrangement: Arrangement | null;
  householdSize: HouseholdSize | null;
  income: IncomeTier | null;
  audit: Audit | null;
}

// Income thresholds by household size (NJ 2024 FPL-based, matching PSE&G program eligibility)
const COMFORT_THRESHOLDS: Record<HouseholdSize, number> = { "1-2": 46000, "3-4": 70000, "5+": 84000 };
const WEATHERIZATION_THRESHOLDS: Record<HouseholdSize, number> = { "1-2": 82000, "3-4": 125000, "5+": 150000 };

function getIncomeBrackets(size: HouseholdSize) {
  const low = COMFORT_THRESHOLDS[size];
  const mod = WEATHERIZATION_THRESHOLDS[size];
  const lowFmt = `$${(low / 1000).toFixed(0)}k`;
  const modFmt = `$${(mod / 1000).toFixed(0)}k`;
  return [
    { tier: "low" as IncomeTier, label: `Under ${lowFmt} per year`, description: "You likely qualify for free whole-home upgrades and financial assistance programs." },
    { tier: "moderate" as IncomeTier, label: `${lowFmt} – ${modFmt} per year`, description: "You may qualify for reduced-cost efficiency upgrades and payment tools." },
    { tier: "higher" as IncomeTier, label: `Over ${modFmt} per year`, description: "Free energy checkup and budget billing options are available to you." },
  ];
}

// ─── Program definitions ───────────────────────────────────────────────────────

interface Program {
  id: string;
  category: "payment" | "assistance" | "efficiency";
  title: string;
  eyebrow: string;
  description: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  headerBg: string;
  icon: React.ElementType;
  cta: string;
  href: string;
  isExternal?: boolean;
  isInteractive?: boolean;
  highlights: string[];
}

const PROGRAMS: Record<string, Program> = {
  paymentArrangement: {
    id: "paymentArrangement",
    category: "payment",
    title: "Deferred Payment Arrangement",
    eyebrow: "For past-due balances",
    description:
      "Spread your past-due balance over future monthly bills so you can catch up without a lump-sum payment — at 0% interest. Keep your service active while you pay.",
    badge: "0% INTEREST",
    badgeColor: "bg-blue-100 text-blue-800",
    borderColor: "border-blue-200",
    headerBg: "bg-blue-700",
    icon: CreditCard,
    cta: "Set Up an Arrangement",
    href: "/payment-arrangement",
    highlights: ["No interest or fees", "Installments added to your monthly bill", "Keep service active while you pay"],
  },
  billExtension: {
    id: "billExtension",
    category: "payment",
    title: "Bill Extension",
    eyebrow: "Need more time to pay",
    description:
      "Get extra time to pay your current bill without penalty. A bill extension gives you breathing room when you need it most.",
    badge: "NO FEE",
    badgeColor: "bg-slate-100 text-slate-700",
    borderColor: "border-slate-200",
    headerBg: "bg-slate-700",
    icon: Clock,
    cta: "Request an Extension",
    href: "",
    isInteractive: true,
    highlights: ["Extra time until your next meter read date", "No fees or penalties", "One extension available per month"],
  },
  equalPaymentPlan: {
    id: "equalPaymentPlan",
    category: "payment",
    title: "Equal Payment Plan",
    eyebrow: "Smooth out the peaks and valleys",
    description:
      "Instead of high summer and winter bills, pay the same predictable amount every month — budgeted based on your usage history. Annual true-up settles any difference.",
    badge: "BUDGET BILLING",
    badgeColor: "bg-primary/10 text-primary",
    borderColor: "border-primary/20",
    headerBg: "bg-primary",
    icon: HandCoins,
    cta: "Enroll in Equal Payment Plan",
    href: "https://nj.myaccount.pseg.com/viewmybill/equalpaymentplanpublic",
    isExternal: true,
    highlights: ["Same amount every month", "Annual true-up to settle any difference", "No more bill shock in summer or winter"],
  },
  usf: {
    id: "usf",
    category: "assistance",
    title: "Universal Service Fund (USF) + Fresh Start",
    eyebrow: "NJ state monthly bill reduction",
    description:
      "USF reduces your monthly PSE&G bill by $20–$200 every single month — not a one-time credit. The Fresh Start Program can also forgive past-due balances over $60 once every 5 years.",
    badge: "MONTHLY DISCOUNT",
    badgeColor: "bg-orange-100 text-orange-800",
    borderColor: "border-orange-200",
    headerBg: "bg-orange-600",
    icon: Wallet,
    cta: "Apply at pseg.com/EnergyAssistance",
    href: "https://nj.pseg.com/saveenergyandmoney/gethelppayingyourbill/energyassistance",
    isExternal: true,
    highlights: ["$20–$200 off your bill every month", "Fresh Start forgives past-due balances over $60", "Available year-round · renters and homeowners qualify", "Call 1-800-510-3102 to apply by phone"],
  },
  liheap: {
    id: "liheap",
    category: "assistance",
    title: "LIHEAP",
    eyebrow: "Federal heating & cooling assistance",
    description:
      "A federally funded grant averaging $360 for heating and $300 for cooling. Emergency LIHEAP provides an additional $800 if you've received a shut-off notice. No past-due balance required.",
    badge: "FEDERAL GRANT",
    badgeColor: "bg-amber-100 text-amber-800",
    borderColor: "border-amber-200",
    headerBg: "bg-amber-600",
    icon: ShieldCheck,
    cta: "Apply at pseg.com/EnergyAssistance",
    href: "https://nj.pseg.com/saveenergyandmoney/gethelppayingyourbill/energyassistance",
    isExternal: true,
    highlights: ["~$360 heating grant · ~$300 cooling grant", "Emergency LIHEAP: up to $800 extra for shut-off notices", "Renters and homeowners qualify", "Apply Oct 1–Jun 30 online · year-round in person"],
  },
  shares: {
    id: "shares",
    category: "assistance",
    title: "PAGE / SHARES Energy Grants",
    eyebrow: "Emergency assistance — requires a past-due balance",
    description:
      "Payment Assistance for Gas and Electric (PAGE) and SHARES grants help customers in a temporary financial crisis pay their past-due energy balance. Must complete LIHEAP/USF application first.",
    badge: "EMERGENCY GRANT",
    badgeColor: "bg-red-100 text-red-700",
    borderColor: "border-red-200",
    headerBg: "bg-red-600",
    icon: Heart,
    cta: "Apply at apply.sharesnation.org",
    href: "https://apply.sharesnation.org/login",
    isExternal: true,
    highlights: ["Covers past-due energy balances", "Also helps with phone, internet, and water bills", "Complete LIHEAP or USF application first", "Call 1-866-657-4273 · good faith payment up to $100 may apply"],
  },
  lifeline: {
    id: "lifeline",
    category: "assistance",
    title: "NJ Lifeline Credit",
    eyebrow: "For seniors & disabled adults",
    description:
      "An annual $225 credit on your PSE&G bill for qualifying seniors (65+) or disabled adults (18+) receiving Social Security disability benefits.",
    badge: "$225 ANNUAL CREDIT",
    badgeColor: "bg-purple-100 text-purple-800",
    borderColor: "border-purple-200",
    headerBg: "bg-purple-700",
    icon: Users,
    cta: "Learn About NJ Lifeline",
    href: "https://nj.pseg.com/saveenergyandmoney/gethelppayingyourbill/backontrack",
    isExternal: true,
    highlights: ["$225 credit applied to your annual bill", "Age 65+ or receiving SS disability benefits", "Single income under $54,943 · married under $62,390", "Call 1-800-792-9745 to apply"],
  },
  comfortPartners: {
    id: "comfortPartners",
    category: "efficiency",
    title: "Comfort Partners",
    eyebrow: "Free whole-home upgrades for lower-income households",
    description:
      "A no-cost program that upgrades your home's insulation, heating system, water heater, and more — making your home more efficient and your bills permanently lower.",
    badge: "NO COST",
    badgeColor: "bg-purple-100 text-purple-800",
    borderColor: "border-purple-200",
    headerBg: "bg-purple-700",
    icon: Home,
    cta: "Check Eligibility",
    href: "/energy/home-assessment#comfort-partners",
    highlights: ["Insulation & air sealing", "Heating system replacement", "Water heater upgrades", "Saves hundreds per year"],
  },
  weatherization: {
    id: "weatherization",
    category: "efficiency",
    title: "Home Weatherization",
    eyebrow: "Reduced-cost efficiency upgrades",
    description:
      "Insulation, air sealing, and heating improvements at significantly reduced or no out-of-pocket cost — permanently cutting your monthly energy use.",
    badge: "REDUCED COST",
    badgeColor: "bg-emerald-100 text-emerald-800",
    borderColor: "border-emerald-200",
    headerBg: "bg-emerald-700",
    icon: Leaf,
    cta: "Check Eligibility",
    href: "/energy/home-assessment#weatherization",
    highlights: ["Insulation upgrades", "Air sealing", "Heating improvements", "Lower usage = lower bills forever"],
  },
  freeCheckup: {
    id: "freeCheckup",
    category: "efficiency",
    title: "Free Home Energy Checkup",
    eyebrow: "Available to every PSE&G customer",
    description:
      "A PSE&G advisor visits your home, installs a smart thermostat and LED bulbs, and gives you a custom savings plan — in about an hour, at no cost.",
    badge: "FREE",
    badgeColor: "bg-green-100 text-green-800",
    borderColor: "border-green-200",
    headerBg: "bg-green-700",
    icon: Zap,
    cta: "Schedule Now",
    href: "/energy/home-assessment",
    highlights: ["Smart thermostat installed ($250 value)", "LED bulbs for your home", "Custom savings report"],
  },
};

// ─── Result routing logic ─────────────────────────────────────────────────────

function getRecommendations(answers: Answers): Program[] {
  const { situation, arrangement, income, householdSize } = answers;
  const results: Program[] = [];
  const isPastDue = situation === "past-due";
  const isHighUsage = situation === "high-usage";
  const size = householdSize ?? "3-4";

  // Derive tier from household size + income for accurate eligibility
  // (benefits fast-track to low regardless of income dollar amount)
  let isLowIncome = income === "benefits";
  let isModerate = false;
  if (income === "low") isLowIncome = true;
  else if (income === "moderate") isModerate = true;
  // For "higher", both remain false → standard programs only

  // ── High-usage path: efficiency programs only ────────────────────────────
  if (isHighUsage) {
    if (isLowIncome) {
      results.push(PROGRAMS.comfortPartners);
    } else if (isModerate) {
      results.push(PROGRAMS.weatherization);
      results.push(PROGRAMS.freeCheckup);
    } else {
      results.push(PROGRAMS.freeCheckup);
      results.push(PROGRAMS.weatherization);
    }
    const seen = new Set<string>();
    return results.filter((p) => { if (seen.has(p.id)) return false; seen.add(p.id); return true; });
  }

  // ── Payment options ──────────────────────────────────────────────────────
  if (isPastDue) {
    if (arrangement === "no") results.push(PROGRAMS.paymentArrangement);
    results.push(PROGRAMS.billExtension);
  }

  if (!isPastDue || isLowIncome || isModerate) {
    results.push(PROGRAMS.equalPaymentPlan);
  }

  // ── Financial assistance by income ───────────────────────────────────────
  if (isLowIncome) {
    results.push(PROGRAMS.usf);
    results.push(PROGRAMS.liheap);
    if (isPastDue) results.push(PROGRAMS.shares);
    results.push(PROGRAMS.lifeline);
  }

  // ── Efficiency programs by income ────────────────────────────────────────
  if (isLowIncome) {
    results.push(PROGRAMS.comfortPartners);
  } else if (isModerate) {
    results.push(PROGRAMS.weatherization);
    results.push(PROGRAMS.freeCheckup);
  } else {
    results.push(PROGRAMS.freeCheckup);
  }

  // Deduplicate
  const seen = new Set<string>();
  return results.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

// ─── Step components ──────────────────────────────────────────────────────────

function OptionButton({
  selected,
  onClick,
  icon: Icon,
  label,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: React.ElementType;
  label: string;
  description?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-5 border-2 transition-all duration-200 flex items-start gap-4 group ${
        selected
          ? "border-[hsl(var(--brand-orange))] bg-[hsl(var(--brand-orange))]/5"
          : "border-border/60 bg-card hover:border-[hsl(var(--brand-orange))]/40 hover:bg-[hsl(var(--brand-orange))]/5"
      }`}
    >
      {Icon && (
        <div
          className={`w-10 h-10 shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
            selected ? "bg-[hsl(var(--brand-orange))] text-white" : "bg-muted text-muted-foreground group-hover:bg-[hsl(var(--brand-orange))]/20"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${selected ? "text-foreground" : "text-foreground"}`}>{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>}
      </div>
      {selected && <CheckCircle2 className="w-5 h-5 text-[hsl(var(--brand-orange))] shrink-0 mt-0.5" />}
    </button>
  );
}

// ─── Category label map ───────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<Program["category"], { label: string; color: string }> = {
  payment: { label: "Payment Options", color: "text-blue-700" },
  assistance: { label: "Financial Assistance", color: "text-orange-700" },
  efficiency: { label: "Energy Efficiency", color: "text-green-700" },
};

function ProgramCard({ program }: { program: Program }) {
  if (program.isInteractive) return <BillExtensionCard program={program} />;

  const Icon = program.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card border-2 ${program.borderColor} overflow-hidden`}
    >
      <div className={`${program.headerBg} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wider">{program.eyebrow}</p>
            <h3 className="text-white font-bold text-base leading-tight">{program.title}</h3>
          </div>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 ${program.badgeColor} whitespace-nowrap`}>
          {program.badge}
        </span>
      </div>

      <div className="p-6">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{program.description}</p>
        <ul className="space-y-1.5 mb-5">
          {program.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-foreground/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
              {h}
            </li>
          ))}
        </ul>
        {program.isExternal ? (
          <a href={program.href} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
              {program.cta} <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </a>
        ) : (
          <Link href={program.href}>
            <a>
              <Button size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
                {program.cta} <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </a>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── Bill Extension interactive widget ───────────────────────────────────────

// Simulates what would come from the billing API
function mockBillingData() {
  const today = new Date();
  // Bill due date: 10 days from now (typical)
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + 10);
  // Next meter read: ~28 days from today (monthly cycle)
  const nextMeterRead = new Date(today);
  nextMeterRead.setDate(today.getDate() + 28);
  // Simulate whether an extension was already used this month (false by default for demo)
  const alreadyUsedThisMonth = false;
  return { dueDate, nextMeterRead, alreadyUsedThisMonth };
}

function fmt(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" });
}

type ExtensionState = "idle" | "confirming" | "loading" | "success" | "blocked";

function BillExtensionCard({ program }: { program: Program }) {
  const { dueDate, nextMeterRead, alreadyUsedThisMonth } = mockBillingData();
  const [state, setState] = useState<ExtensionState>(alreadyUsedThisMonth ? "blocked" : "idle");

  function handleConfirm() {
    setState("loading");
    // Simulate API call
    setTimeout(() => setState("success"), 1400);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card border-2 ${program.borderColor} overflow-hidden`}
    >
      {/* Header */}
      <div className={`${program.headerBg} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wider">{program.eyebrow}</p>
            <h3 className="text-white font-bold text-base leading-tight">{program.title}</h3>
          </div>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 ${program.badgeColor} whitespace-nowrap`}>
          {program.badge}
        </span>
      </div>

      <div className="p-6">
        {/* Blocked state — already used this month */}
        {state === "blocked" && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 p-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Extension already used this month</p>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                You can request one bill extension per billing period. Your next eligibility resets after your next meter read on <strong>{fmt(nextMeterRead)}</strong>.
              </p>
              <p className="text-xs text-amber-700 mt-2">Need more help? Call us at <a href="tel:1-800-436-7734" className="underline font-medium">1-800-436-7734</a>.</p>
            </div>
          </div>
        )}

        {/* Success state */}
        {state === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-3 bg-green-50 border border-green-200 p-4"
          >
            <CalendarCheck className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900">Extension confirmed</p>
              <p className="text-xs text-green-800 mt-1 leading-relaxed">
                Your payment due date has been extended to <strong>{fmt(nextMeterRead)}</strong>. No fees or penalties will apply as long as payment is received by that date.
              </p>
              <p className="text-xs text-green-700 mt-2">A confirmation will appear on your account within a few minutes.</p>
            </div>
          </motion.div>
        )}

        {/* Idle / confirming / loading state */}
        {(state === "idle" || state === "confirming" || state === "loading") && (
          <>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{program.description}</p>

            {/* Date summary */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-muted/50 border border-border/60 p-3">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">Current due date</p>
                <p className="text-sm font-bold text-foreground">{fmt(dueDate)}</p>
              </div>
              <div className={`p-3 border-2 transition-colors ${state === "confirming" || state === "loading" ? "bg-green-50 border-green-300" : "bg-muted/50 border-border/60"}`}>
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">Extended to</p>
                <p className={`text-sm font-bold ${state === "confirming" || state === "loading" ? "text-green-800" : "text-foreground"}`}>{fmt(nextMeterRead)}</p>
              </div>
            </div>

            {/* Business rule note */}
            <p className="text-xs text-muted-foreground mb-5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              One extension per billing period · cannot extend past your next meter read date
            </p>

            {state === "idle" && (
              <Button
                size="sm"
                className="gap-2 bg-foreground text-background hover:bg-foreground/90"
                onClick={() => setState("confirming")}
              >
                Request Extension <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}

            {state === "confirming" && (
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  className="gap-2 bg-green-700 hover:bg-green-800 text-white"
                  onClick={handleConfirm}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Confirm — extend to {fmt(nextMeterRead)}
                </Button>
                <button
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
                  onClick={() => setState("idle")}
                >
                  Cancel
                </button>
              </div>
            )}

            {state === "loading" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting your extension request…
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function BillHelp() {
  const [step, setStep] = useState<Step>("situation");
  const [answers, setAnswers] = useState<Answers>({
    situation: null,
    arrangement: null,
    householdSize: null,
    income: null,
    audit: null,
  });

  const isPastDue = answers.situation === "past-due";
  const isHighUsage = answers.situation === "high-usage";
  const totalSteps = isPastDue ? 4 : isHighUsage ? 2 : 3;
  const currentStepNum =
    step === "situation" ? 1
    : step === "arrangement" ? 2
    : step === "income" ? (isPastDue ? 3 : 2)
    : step === "audit" ? (isPastDue ? 4 : 3)
    : totalSteps;

  function goBack() {
    if (step === "results") {
      if (isHighUsage) { setStep("income"); return; }
      setStep(answers.income === "benefits" || answers.income === "low" ? "audit" : "income");
      return;
    }
    if (step === "audit") { setStep("income"); return; }
    if (step === "income") { setStep(isPastDue ? "arrangement" : "situation"); return; }
    if (step === "arrangement") { setStep("situation"); return; }
  }

  function restart() {
    setAnswers({ situation: null, arrangement: null, householdSize: null, income: null, audit: null });
    setStep("situation");
  }

  // ── Step: Situation ──────────────────────────────────────────────────────
  function handleSituation(val: Situation) {
    setAnswers((a) => ({ ...a, situation: val }));
    if (val === "past-due") setStep("arrangement");
    else setStep("income");
    // high-usage also goes to income — results will filter to EE programs only
  }

  // ── Step: Arrangement ────────────────────────────────────────────────────
  function handleArrangement(val: Arrangement) {
    setAnswers((a) => ({ ...a, arrangement: val }));
    setStep("income");
  }

  // ── Step: Income ─────────────────────────────────────────────────────────
  function handleHouseholdSize(val: HouseholdSize) {
    setAnswers((a) => ({ ...a, householdSize: val, income: null }));
  }

  function handleIncome(val: IncomeTier) {
    setAnswers((a) => ({ ...a, income: val }));
    const isLow = val === "benefits" || val === "low";
    // high-usage skips the audit question — go straight to EE results
    if (isHighUsage) { setStep("results"); return; }
    if (isLow) setStep("audit");
    else setStep("results");
  }

  // ── Step: Audit ──────────────────────────────────────────────────────────
  function handleAudit(val: Audit) {
    setAnswers((a) => ({ ...a, audit: val }));
    setStep("results");
  }

  const recommendations = step === "results" ? getRecommendations(answers) : [];
  const grouped = {
    payment: recommendations.filter((p) => p.category === "payment"),
    assistance: recommendations.filter((p) => p.category === "assistance"),
    efficiency: recommendations.filter((p) => p.category === "efficiency"),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary pt-14 pb-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))] text-xs font-bold uppercase tracking-wider mb-5">
                <Heart className="w-3 h-3" />
                Bill Help Center
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                My bill is too high.<br />
                <span className="text-[hsl(var(--brand-orange))]">Let's figure this out together.</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
                PSE&G offers more ways to help than most customers realize. Answer a few quick questions and we'll show you every option that applies to your situation — no judgment, no pressure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Wizard */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-2xl">
            <AnimatePresence mode="wait">

              {/* ── STEP: Situation ──────────────────────────────────────── */}
              {step === "situation" && (
                <motion.div
                  key="situation"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepHeader
                    step={1}
                    total={3}
                    question="What's going on with your bill?"
                    sub="Select the option that best describes your situation."
                  />
                  <div className="space-y-3 mt-6">
                    <OptionButton
                      selected={answers.situation === "past-due"}
                      onClick={() => handleSituation("past-due")}
                      icon={AlertCircle}
                      label="I have a past-due balance I can't pay right now"
                      description="You've received a notice or your account is behind — and you need options to avoid service disruption."
                    />
                    <OptionButton
                      selected={answers.situation === "high-monthly"}
                      onClick={() => handleSituation("high-monthly")}
                      icon={CreditCard}
                      label="My monthly bill is consistently too high"
                      description="You're paying on time but the amount feels unmanageable — you want to lower what you owe each month."
                    />
                    <OptionButton
                      selected={answers.situation === "high-usage"}
                      onClick={() => handleSituation("high-usage")}
                      icon={Zap}
                      label="My usage is higher than ever — I need to take control"
                      description="Your consumption has gone up and you want to understand how to use less energy and permanently lower your bill."
                    />
                    <OptionButton
                      selected={answers.situation === "exploring"}
                      onClick={() => handleSituation("exploring")}
                      icon={Users}
                      label="I want to see all the options available to me"
                      description="Just looking to understand what assistance and savings programs you might qualify for."
                    />
                  </div>
                </motion.div>
              )}

              {/* ── STEP: Arrangement ───────────────────────────────────── */}
              {step === "arrangement" && (
                <motion.div
                  key="arrangement"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepHeader
                    step={2}
                    total={4}
                    question="Have you had a payment arrangement with PSE&G this calendar year?"
                    sub="This helps us understand which options are available to you right now."
                  />
                  <div className="space-y-3 mt-6">
                    <OptionButton
                      selected={answers.arrangement === "yes"}
                      onClick={() => handleArrangement("yes")}
                      icon={CheckCircle2}
                      label="Yes, I've had a payment arrangement this year"
                      description="You've already set up an installment plan at some point in 2025."
                    />
                    <OptionButton
                      selected={answers.arrangement === "no"}
                      onClick={() => handleArrangement("no")}
                      icon={CreditCard}
                      label="No, I haven't had one this year"
                      description="You haven't set up a payment arrangement in 2025."
                    />
                  </div>
                  <BackButton onClick={goBack} />
                </motion.div>
              )}

              {/* ── STEP: Income ─────────────────────────────────────────── */}
              {step === "income" && (
                <motion.div
                  key="income"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepHeader
                    step={isPastDue ? 3 : 2}
                    total={isPastDue ? 4 : isHighUsage ? 2 : 3}
                    question="Tell us about your household"
                    sub={isHighUsage
                      ? "This helps us match you with the right energy efficiency program — some are free, some are reduced-cost."
                      : "This is completely confidential and helps us match you with programs you're most likely to qualify for."}
                  />

                  {/* Part 1: Household size */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-foreground mb-3">How many people live in your home?</p>
                    <div className="grid grid-cols-3 gap-3">
                      {(["1-2", "3-4", "5+"] as HouseholdSize[]).map((size) => (
                        <button
                          key={size}
                          onClick={() => handleHouseholdSize(size)}
                          className={`py-4 border-2 text-center transition-all duration-200 ${
                            answers.householdSize === size
                              ? "border-[hsl(var(--brand-orange))] bg-[hsl(var(--brand-orange))]/5"
                              : "border-border/60 bg-card hover:border-[hsl(var(--brand-orange))]/40"
                          }`}
                        >
                          <p className={`text-2xl font-bold ${answers.householdSize === size ? "text-[hsl(var(--brand-orange))]" : "text-foreground"}`}>
                            {size === "5+" ? "5+" : size.replace("-", "–")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {size === "1-2" ? "people" : size === "3-4" ? "people" : "or more"}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Part 2: Income — revealed once size is selected */}
                  <AnimatePresence>
                    {answers.householdSize && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="mt-6"
                      >
                        <p className="text-sm font-semibold text-foreground mb-3">What's your approximate annual household income?</p>
                        <div className="space-y-3">
                          {/* Benefits fast-track — always shown first */}
                          <OptionButton
                            selected={answers.income === "benefits"}
                            onClick={() => handleIncome("benefits")}
                            icon={ShieldCheck}
                            label="Someone receives SNAP, Medicaid, SSI, or NJ FamilyCare"
                            description="Government benefits typically qualify you for the most comprehensive programs regardless of income."
                          />
                          {/* Dynamic brackets based on household size */}
                          {getIncomeBrackets(answers.householdSize).map(({ tier, label, description }) => (
                            <OptionButton
                              key={tier}
                              selected={answers.income === tier}
                              onClick={() => handleIncome(tier)}
                              icon={tier === "low" ? Wallet : tier === "moderate" ? Home : Zap}
                              label={label}
                              description={description}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <BackButton onClick={goBack} />
                </motion.div>
              )}

              {/* ── STEP: Audit ──────────────────────────────────────────── */}
              {step === "audit" && (
                <motion.div
                  key="audit"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepHeader
                    step={answers.situation === "past-due" ? 4 : 3}
                    total={answers.situation === "past-due" ? 4 : 3}
                    question="Has your home had a free energy assessment or audit in the past year?"
                    sub="This determines whether we can offer you a whole-home upgrade visit as part of your recommendations."
                  />
                  <div className="space-y-3 mt-6">
                    <OptionButton
                      selected={answers.audit === "yes"}
                      onClick={() => handleAudit("yes")}
                      icon={CheckCircle2}
                      label="Yes, we've had one in the past 12 months"
                    />
                    <OptionButton
                      selected={answers.audit === "no"}
                      onClick={() => handleAudit("no")}
                      icon={Home}
                      label="No, we haven't — or I'm not sure"
                    />
                  </div>
                  <BackButton onClick={goBack} />
                </motion.div>
              )}

              {/* ── RESULTS ──────────────────────────────────────────────── */}
              {step === "results" && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Result header */}
                  <div className={`p-5 mb-8 flex items-start gap-4 ${isHighUsage ? "bg-emerald-50 border border-emerald-200" : "bg-green-50 border border-green-200"}`}>
                    <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${isHighUsage ? "bg-emerald-600" : "bg-green-600"}`}>
                      {isHighUsage ? <Zap className="w-5 h-5 text-white" /> : <CheckCircle2 className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${isHighUsage ? "text-emerald-900" : "text-green-900"}`}>
                        {isHighUsage
                          ? `Here are ${recommendations.length} program${recommendations.length !== 1 ? "s" : ""} that can help you use less energy and lower your bill for good.`
                          : `We found ${recommendations.length} program${recommendations.length !== 1 ? "s" : ""} that may apply to you.`}
                      </p>
                      <p className={`text-xs mt-1 leading-relaxed ${isHighUsage ? "text-emerald-800" : "text-green-800"}`}>
                        {isHighUsage
                          ? "These upgrades reduce the energy your home consumes — the most lasting way to lower your bill."
                          : "These are personalized to your answers. Review each one — applying for multiple programs is encouraged and common."}
                      </p>
                    </div>
                  </div>

                  {/* Payment programs */}
                  {grouped.payment.length > 0 && (
                    <ResultGroup label="Payment Options" color="text-blue-700" programs={grouped.payment} />
                  )}

                  {/* Assistance programs */}
                  {grouped.assistance.length > 0 && (
                    <ResultGroup label="Financial Assistance" color="text-orange-700" programs={grouped.assistance} />
                  )}

                  {/* Efficiency programs */}
                  {grouped.efficiency.length > 0 && (
                    <ResultGroup label="Reduce Your Usage, Reduce Your Bill" color="text-green-700" programs={grouped.efficiency} />
                  )}

                  {/* Call center fallback */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 bg-primary p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-[hsl(var(--brand-orange))]/20 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-[hsl(var(--brand-orange))]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">Need to talk to someone?</p>
                      <p className="text-white/70 text-xs mt-0.5">Our customer service team can walk you through every option and help you enroll.</p>
                    </div>
                    <a href="tel:1-800-436-7734" className="shrink-0">
                      <Button className="gap-2 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white whitespace-nowrap">
                        <Phone className="w-4 h-4" />
                        1-800-436-7734
                      </Button>
                    </a>
                  </motion.div>

                  {/* Restart */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={restart}
                      className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                    >
                      Start over with different answers
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function StepHeader({
  step, total, question, sub,
}: {
  step: number; total: number; question: string; sub?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 transition-all duration-300 ${i < step ? "bg-[hsl(var(--brand-orange))]" : "bg-border"}`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
        Step {step} of {total}
      </p>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">{question}</h2>
      {sub && <p className="text-sm text-muted-foreground leading-relaxed">{sub}</p>}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="w-4 h-4" /> Back
    </button>
  );
}

function ResultGroup({ label, color, programs }: { label: string; color: string; programs: Program[] }) {
  return (
    <div className="mb-8">
      <h3 className={`text-xs font-bold uppercase tracking-wider ${color} mb-3`}>{label}</h3>
      <div className="space-y-4">
        {programs.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <ProgramCard program={p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
