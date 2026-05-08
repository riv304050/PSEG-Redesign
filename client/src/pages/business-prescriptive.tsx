import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, ArrowRight, CheckCircle2, ChevronLeft,
  Lightbulb, Wind, Refrigerator, Utensils, Flame,
  Zap, X, AlertCircle, Clock, ExternalLink, Hash,
  Upload, CalendarDays,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";

const DEADLINE = new Date("2026-06-30T23:59:59");
function daysLeft() {
  return Math.max(0, Math.ceil((DEADLINE.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
}

interface RebateProduct {
  id: string;
  name: string;
  rebate: string;
  rebateValue: number;
  description: string;
  requirements: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  popular?: boolean;
  pointOfSale?: boolean;
}

const LIGHTING_PRODUCTS: RebateProduct[] = [
  {
    id: "led-interior",
    name: "LED Interior Fixtures",
    rebate: "$30–$75/fixture",
    rebateValue: 50,
    description: "Replace fluorescent or HID fixtures with LED in offices, warehouses, and retail spaces.",
    requirements: "DLC Listed · ≥ 80 lumens/watt · Trade Ally installation",
    icon: Lightbulb,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
    popular: true,
    pointOfSale: true,
  },
  {
    id: "led-parking",
    name: "LED Parking & Exterior",
    rebate: "$75–$200/fixture",
    rebateValue: 125,
    description: "Upgrade parking lots, canopies, and building exteriors to LED — largest per-unit incentive.",
    requirements: "DLC Listed · ≥ 80 lumens/watt · Must replace HID or fluorescent",
    icon: Lightbulb,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    popular: true,
    pointOfSale: true,
  },
  {
    id: "occupancy-sensors",
    name: "Occupancy / Vacancy Sensors",
    rebate: "$25–$60/sensor",
    rebateValue: 40,
    description: "Automated lighting controls that cut energy waste in low-traffic areas.",
    requirements: "NEMA certified · Compatible with existing LED or new install",
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    id: "led-exit-signs",
    name: "LED Exit Signs",
    rebate: "$10/sign",
    rebateValue: 10,
    description: "Replace incandescent exit signs with ENERGY STAR® LED units.",
    requirements: "ENERGY STAR® certified · Must replace non-LED sign",
    icon: Lightbulb,
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
  },
];

const HVAC_PRODUCTS: RebateProduct[] = [
  {
    id: "rtu",
    name: "Rooftop Unit (RTU)",
    rebate: "$500–$2,500",
    rebateValue: 1500,
    description: "High-efficiency packaged HVAC rooftop unit for commercial buildings.",
    requirements: "≥ 16 SEER / ≥ 13 EER · ENERGY STAR® certified · Trade Ally installation",
    icon: Wind,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    popular: true,
  },
  {
    id: "vrf",
    name: "Variable Refrigerant Flow (VRF)",
    rebate: "$1,000–$5,000",
    rebateValue: 3000,
    description: "Multi-zone VRF system — simultaneous heating and cooling across zones.",
    requirements: "≥ 14 IEER · COP ≥ 3.3 · Engineered design required",
    icon: Wind,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
    popular: true,
  },
  {
    id: "vsd",
    name: "Variable Speed Drive (VSD)",
    rebate: "$100–$500/HP",
    rebateValue: 300,
    description: "Add variable speed drives to HVAC fans and pumps for significant motor savings.",
    requirements: "≥ 1 HP motor · Replaces fixed-speed application · Trade Ally required",
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    id: "bms",
    name: "Building Management System",
    rebate: "Up to $5,000",
    rebateValue: 5000,
    description: "Automated building controls for HVAC, lighting, and equipment scheduling.",
    requirements: "New install or major expansion · Must include HVAC control · 12-mo M&V",
    icon: Wind,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
];

const REFRIGERATION_PRODUCTS: RebateProduct[] = [
  {
    id: "walkin-led",
    name: "Walk-In LED Lighting",
    rebate: "$25–$50/fixture",
    rebateValue: 37,
    description: "LED lighting upgrade inside walk-in coolers and freezers.",
    requirements: "DLC Listed · Rated for cold storage · Replaces fluorescent",
    icon: Refrigerator,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
    popular: true,
    pointOfSale: true,
  },
  {
    id: "ec-fan-motors",
    name: "EC Fan Motors",
    rebate: "$50–$150/motor",
    rebateValue: 100,
    description: "Electronically commutated (EC) fan motors for display cases and walk-ins.",
    requirements: "≥ 1/15 HP · Replaces shaded pole or PSC motor",
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    id: "antisweat",
    name: "Anti-Sweat Heater Controls",
    rebate: "$15–$25/door",
    rebateValue: 20,
    description: "Demand-controlled anti-sweat heaters reduce wasted energy on display case doors.",
    requirements: "Humidity sensor required · Replaces constant-duty heaters",
    icon: Refrigerator,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
  },
  {
    id: "door-gaskets",
    name: "Refrigerated Display Case Doors",
    rebate: "$200–$500/door",
    rebateValue: 350,
    description: "Add doors to open refrigerated display cases — one of the highest-ROI upgrades.",
    requirements: "Replaces open/doorless case · Must be new door addition · Trade Ally required",
    icon: Refrigerator,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    popular: true,
  },
];

const FOOD_SERVICE_PRODUCTS: RebateProduct[] = [
  {
    id: "commercial-fridge",
    name: "Commercial Refrigerator / Freezer",
    rebate: "$100–$400",
    rebateValue: 250,
    description: "ENERGY STAR® certified reach-in commercial refrigerators and freezers.",
    requirements: "ENERGY STAR® certified · Replaces existing working unit",
    icon: Refrigerator,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
    popular: true,
    pointOfSale: true,
  },
  {
    id: "ice-machine",
    name: "Ice Machine",
    rebate: "$150–$350",
    rebateValue: 250,
    description: "ENERGY STAR® commercial ice machines with low energy and water consumption.",
    requirements: "ENERGY STAR® certified · ≥ 500 lbs/day capacity",
    icon: Utensils,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    id: "dishwasher",
    name: "Commercial Dishwasher",
    rebate: "$300–$500",
    rebateValue: 400,
    description: "ENERGY STAR® high-temperature or low-temperature commercial dishwashers.",
    requirements: "ENERGY STAR® certified · Rack conveyor or door type",
    icon: Utensils,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    id: "fryer",
    name: "High-Efficiency Fryer",
    rebate: "$400–$600",
    rebateValue: 500,
    description: "ENERGY STAR® certified commercial deep fryers — 30–50% more efficient.",
    requirements: "ENERGY STAR® certified · Oil capacity ≥ 15 lbs",
    icon: Flame,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    popular: true,
  },
];

const GAS_PRODUCTS: RebateProduct[] = [
  {
    id: "gas-boiler",
    name: "High-Efficiency Gas Boiler",
    rebate: "$2,000–$8,000",
    rebateValue: 5000,
    description: "Condensing gas boiler with AFUE ≥ 90% for commercial space heating.",
    requirements: "AFUE ≥ 90% · Replaces existing boiler ≤ 82% AFUE · Licensed contractor",
    icon: Flame,
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
    popular: true,
  },
  {
    id: "unit-heater",
    name: "High-Efficiency Unit Heater",
    rebate: "$400–$1,200",
    rebateValue: 800,
    description: "Condensing gas unit heaters for warehouses, garages, and large open spaces.",
    requirements: "Thermal efficiency ≥ 80% · Replaces existing non-condensing unit",
    icon: Flame,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
  },
  {
    id: "water-heater",
    name: "Commercial Water Heater",
    rebate: "$300–$700",
    rebateValue: 500,
    description: "High-efficiency natural gas or condensing water heater for commercial facilities.",
    requirements: "UEF ≥ 0.80 (gas) · ENERGY STAR® certified",
    icon: Flame,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    pointOfSale: true,
  },
];

interface SubmittedApp {
  id: string;
  name: string;
  amount: string;
  date: string;
  status: "pending" | "approved" | "paid";
}

const STATUS_STYLES: Record<SubmittedApp["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  paid: "bg-orange-100 text-orange-800",
};

export default function BusinessPrescriptive() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<RebateProduct | null>(null);
  const [claimPath, setClaimPath] = useState<"pos" | "traditional" | "">("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [fileLabel, setFileLabel] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedApps, setSubmittedApps] = useState<SubmittedApp[]>([]);

  const days = daysLeft();

  function openDrawer(product: RebateProduct) {
    setSelectedProduct(product);
    setClaimPath("");
    setPurchaseDate("");
    setModelNumber("");
    setFileLabel("");
    setSubmitted(false);
    setDrawerOpen(true);
  }

  function handleSubmit() {
    if (!purchaseDate || !modelNumber) return;
    setSubmittedApps(prev => [{
      id: `a${Date.now()}`,
      name: selectedProduct!.name,
      amount: selectedProduct!.rebate,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "pending",
    }, ...prev]);
    setSubmitted(true);
  }

  const canSubmit = purchaseDate && modelNumber;

  const ProductCard = ({ product }: { product: RebateProduct }) => {
    const Icon = product.icon;
    return (
      <div className="bg-card border border-border/50 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 ${product.iconBg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${product.iconColor}`} />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-lg font-bold text-foreground leading-tight text-right">{product.rebate}</span>
            <span className="text-xs text-muted-foreground">incentive</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 mb-1">
          <h3 className="font-bold text-foreground text-sm">{product.name}</h3>
          {product.popular && (
            <Badge className="bg-[hsl(var(--brand-orange))]/10 text-[hsl(var(--brand-orange))] border-none text-[10px] font-bold">POPULAR</Badge>
          )}
          {product.pointOfSale && (
            <Badge className="bg-orange-100 text-orange-800 border-none text-[10px] font-bold">POINT-OF-SALE</Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-2 leading-relaxed flex-1">{product.description}</p>
        <p className="text-xs text-muted-foreground/70 italic mb-4">{product.requirements}</p>
        <Button
          size="sm"
          className="w-full bg-primary hover:bg-primary/90 text-white mt-auto"
          onClick={() => openDrawer(product)}
        >
          Start Application <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-12 md:py-14 relative z-10 max-w-6xl">
          <Link href="/business/energy">
            <a className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to Commercial Programs
            </a>
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))] text-xs font-semibold mb-4">
            <DollarSign className="w-3.5 h-3.5" /> Prescriptive Rebates
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            50%+ Back on Commercial Equipment
          </h1>
          <p className="text-white/70 text-base max-w-xl mb-4">
            Get incentives on lighting, HVAC, refrigeration, food service, and gas systems. Point-of-sale rebates available at participating distributors — or submit after installation.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              "Any PSE&G business customer",
              "Use your own Trade Ally contractor",
              "Rebates processed in 4–6 weeks",
            ].map((label) => (
              <div key={label} className="flex items-center gap-2 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--brand-orange))]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Urgency banner */}
      {days > 0 && (
        <div className="bg-[hsl(var(--brand-orange))] text-white">
          <div className="container mx-auto px-4 py-3 max-w-6xl flex items-center gap-2 text-sm font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Increased incentives of 50%+ on eligible equipment expire in <strong>{days} days</strong> — June 30, 2026</span>
          </div>
        </div>
      )}

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">

        {/* Submitted applications */}
        {submittedApps.length > 0 && (
          <div className="mb-8 p-4 bg-card border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">My Applications</h3>
              <span className="text-xs text-muted-foreground">{submittedApps.length} submitted</span>
            </div>
            <div className="space-y-2">
              {submittedApps.map((a) => (
                <div key={a.id} className="flex items-center justify-between text-sm py-2 border-t border-border/30">
                  <span className="font-medium text-foreground">{a.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{a.date}</span>
                    <span className="font-bold text-foreground text-xs">{a.amount}</span>
                    <Badge className={`${STATUS_STYLES[a.status]} border-none text-xs capitalize`}>{a.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="lighting">
          <TabsList className="bg-card/80 border border-border/50 h-auto p-1 w-full flex flex-wrap mb-8 rounded-none gap-1">
            {[
              { value: "lighting", label: "Lighting", icon: Lightbulb },
              { value: "hvac", label: "HVAC", icon: Wind },
              { value: "refrigeration", label: "Refrigeration", icon: Refrigerator },
              { value: "food-service", label: "Food Service", icon: Utensils },
              { value: "gas", label: "Gas & Water", icon: Flame },
            ].map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white text-sm"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="lighting">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground">Lighting</h2>
              <p className="text-sm text-muted-foreground">LED retrofits with the fastest payback of any commercial upgrade</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LIGHTING_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </TabsContent>

          <TabsContent value="hvac">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground">HVAC</h2>
              <p className="text-sm text-muted-foreground">Largest incentive amounts — up to $5,000+ on qualifying systems</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HVAC_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </TabsContent>

          <TabsContent value="refrigeration">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground">Commercial Refrigeration</h2>
              <p className="text-sm text-muted-foreground">Walk-in coolers, display cases, motors, and controls</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {REFRIGERATION_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </TabsContent>

          <TabsContent value="food-service">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground">Food Service Equipment</h2>
              <p className="text-sm text-muted-foreground">ENERGY STAR® commercial kitchen equipment — restaurants, cafeterias, and hotels</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FOOD_SERVICE_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="mt-6 p-4 bg-secondary/50 border border-border/50 flex items-start gap-3">
              <Utensils className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Looking for the full food service equipment list?{" "}
                <a
                  href="https://bizsave.pseg.com/wp-content/uploads/2022/06/2025-Prescriptive-Incentive-Guide-V1.0.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 font-medium inline-flex items-center gap-1"
                >
                  Download the 2026 Incentive Guide <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="gas">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground">Gas & Water Heating</h2>
              <p className="text-sm text-muted-foreground">High-efficiency boilers, unit heaters, and commercial water heaters</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GAS_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </TabsContent>
        </Tabs>

        {/* Trade Ally callout */}
        <div className="mt-10 p-5 bg-blue-50 border border-blue-100 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-1">Need a Trade Ally contractor?</h3>
            <p className="text-sm text-blue-700">
              Most Prescriptive rebates require installation by a PSE&G-approved Trade Ally. Find one near you or have your existing contractor apply for Trade Ally status.
            </p>
          </div>
          <a
            href="https://bizenergy.pseg.com/trade-ally-locator"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white shrink-0 w-full sm:w-auto">
              Find a Trade Ally <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Button>
          </a>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 p-6 md:p-8 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[hsl(var(--brand-orange))]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Not sure what to upgrade first?</h3>
              <p className="text-white/60 text-sm">
                A free on-site energy audit from the Direct Install Program identifies the highest-ROI opportunities across your whole facility.
              </p>
            </div>
            <Link href="/business/direct-install">
              <Button className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white shrink-0">
                Schedule Free Audit <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Application Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={`${isMobile ? "h-[90vh] rounded-t-2xl" : "w-[440px]"} overflow-y-auto p-0`}
        >
          <div className="sticky top-0 bg-card z-10 border-b border-border/50">
            <SheetHeader className="p-5 pb-4">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-lg">Start Application</SheetTitle>
                <button onClick={() => setDrawerOpen(false)} className="p-1.5 hover:bg-secondary rounded-none transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </SheetHeader>
          </div>

          <div className="p-5">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {selectedProduct && (
                    <>
                      {/* Product summary */}
                      <div className="flex items-center gap-3 p-4 bg-secondary/50 mb-5">
                        <div className={`w-10 h-10 ${selectedProduct.iconBg} flex items-center justify-center shrink-0`}>
                          <selectedProduct.icon className={`w-5 h-5 ${selectedProduct.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">{selectedProduct.name}</p>
                          <p className="text-xs text-muted-foreground">{selectedProduct.requirements}</p>
                        </div>
                        <span className="text-base font-bold text-foreground shrink-0">{selectedProduct.rebate}</span>
                      </div>

                      {/* Rebate path selector */}
                      {!claimPath && (
                        <div className="mb-5">
                          <p className="text-sm font-bold text-foreground mb-3">How would you like to claim?</p>
                          <div className="space-y-2">
                            {selectedProduct.pointOfSale && (
                              <button
                                onClick={() => setClaimPath("pos")}
                                className="w-full text-left p-4 border-2 border-border hover:border-primary/50 transition-all"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-[hsl(var(--brand-orange))] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
                                  <div>
                                    <p className="text-sm font-semibold text-foreground">Point-of-Sale (Instant)</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Rebate deducted immediately at a participating distributor. No waiting.</p>
                                  </div>
                                </div>
                              </button>
                            )}
                            <button
                              onClick={() => setClaimPath("traditional")}
                              className="w-full text-left p-4 border-2 border-border hover:border-primary/50 transition-all"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
                                <div>
                                  <p className="text-sm font-semibold text-foreground">Traditional (Post-Install)</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">Submit invoice after installation. Credited to your PSE&G bill in 4–6 weeks.</p>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}

                      {claimPath === "pos" && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="p-4 bg-orange-50 border border-orange-200 mb-5">
                            <p className="text-sm font-semibold text-orange-900 mb-2">Point-of-Sale next steps</p>
                            <ol className="space-y-2 text-xs text-orange-800 list-decimal list-inside">
                              <li>Find a participating distributor near you</li>
                              <li>Ask for the PSE&G Prescriptive rebate at the counter</li>
                              <li>Rebate is deducted from your purchase price on the spot</li>
                              <li>Distributor submits the rebate claim on your behalf</li>
                            </ol>
                          </div>
                          <a
                            href="https://bizenergy.pseg.com/prescriptive-program"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="w-full h-12 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white font-semibold">
                              Find Participating Distributors <ExternalLink className="w-4 h-4 ml-1" />
                            </Button>
                          </a>
                          <button
                            className="w-full mt-2 text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                            onClick={() => setClaimPath("")}
                          >
                            Switch to Traditional claim
                          </button>
                        </motion.div>
                      )}

                      {claimPath === "traditional" && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                          {/* Pre-filled account info */}
                          <div className="mb-5">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Business Account (pre-filled)</p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="bg-secondary/40 px-3 py-2">
                                <p className="text-xs text-muted-foreground">Contact</p>
                                <p className="font-medium truncate">{user?.firstName} {user?.lastName || "Johnson"}</p>
                              </div>
                              <div className="bg-secondary/40 px-3 py-2">
                                <p className="text-xs text-muted-foreground">Account #</p>
                                <p className="font-medium">{user?.accountNumber || "123456789"}</p>
                              </div>
                              <div className="bg-secondary/40 px-3 py-2 col-span-2">
                                <p className="text-xs text-muted-foreground">Facility Address</p>
                                <p className="font-medium truncate">{user?.address || "123 Commerce Blvd"}, {user?.city || "Newark"}, NJ</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4 mb-5">
                            <div>
                              <Label htmlFor="install-date" className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                                <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                                Installation Date
                              </Label>
                              <Input
                                id="install-date"
                                type="date"
                                value={purchaseDate}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                className="rounded-none"
                              />
                            </div>
                            <div>
                              <Label htmlFor="model-num" className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                                <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                                Model / Part Number
                              </Label>
                              <Input
                                id="model-num"
                                placeholder="e.g. DLC-LED-5000K-50W"
                                value={modelNumber}
                                onChange={(e) => setModelNumber(e.target.value)}
                                className="rounded-none"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                                <Upload className="w-3.5 h-3.5 text-muted-foreground" />
                                Trade Ally Invoice
                              </Label>
                              <label
                                htmlFor="invoice-upload"
                                className="flex flex-col items-center justify-center gap-2 py-6 border-2 border-dashed border-border hover:border-primary/40 bg-secondary/20 cursor-pointer transition-colors"
                              >
                                <Upload className="w-6 h-6 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {fileLabel || "Tap to upload invoice"}
                                </span>
                                <span className="text-xs text-muted-foreground/60">JPG, PNG, or PDF · Max 10MB</span>
                                <input
                                  id="invoice-upload"
                                  type="file"
                                  accept="image/*,.pdf"
                                  className="sr-only"
                                  onChange={(e) => setFileLabel(e.target.files?.[0]?.name || "")}
                                />
                              </label>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 mb-5 text-xs text-amber-800">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>Incentive credited to your PSE&G bill within 4–6 weeks of approval. Installation must be completed by an approved Trade Ally.</span>
                          </div>

                          <Button
                            onClick={handleSubmit}
                            disabled={!canSubmit}
                            className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-white disabled:opacity-40"
                          >
                            Submit Application <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                          <button
                            className="w-full mt-2 text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                            onClick={() => setClaimPath("")}
                          >
                            Back to claim options
                          </button>
                        </motion.div>
                      )}
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-16 h-16 bg-orange-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-9 h-9 text-[hsl(var(--brand-orange))]" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Your application for the{" "}
                    <strong>{selectedProduct?.name}</strong> incentive has been received.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Clock className="w-4 h-4" />
                    <span>Review and billing credit within 4–6 weeks</span>
                  </div>
                  <Button variant="outline" className="w-full mb-3" onClick={() => setDrawerOpen(false)}>
                    Browse More Rebates
                  </Button>
                  <Button className="w-full bg-primary text-white" onClick={() => setDrawerOpen(false)}>
                    Done
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
}
