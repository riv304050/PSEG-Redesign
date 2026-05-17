import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, ArrowRight, CheckCircle2, Upload, ChevronLeft,
  Snowflake, Thermometer, Wind, Flame, Zap, Car, PlugZap,
  Refrigerator, WashingMachine, Droplets, ShoppingBag, X,
  CalendarDays, Hash, AlertCircle, Clock,
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
}

const HVAC_PRODUCTS: RebateProduct[] = [
  {
    id: "central-ac",
    name: "Central Air Conditioner",
    rebate: "$400",
    rebateValue: 400,
    description: "ENERGY STAR® certified central AC system replacement or new installation.",
    requirements: "≥ 16 SEER rating · Must be installed by licensed contractor",
    icon: Snowflake,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    popular: true,
  },
  {
    id: "heat-pump",
    name: "Heat Pump (Central)",
    rebate: "$900",
    rebateValue: 900,
    description: "High-efficiency central heat pump — heating and cooling in one system.",
    requirements: "≥ 15.2 SEER2 / ≥ 8.1 HSPF2 · ENERGY STAR® certified",
    icon: Wind,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    popular: true,
  },
  {
    id: "mini-split",
    name: "Ductless Mini-Split",
    rebate: "$500",
    rebateValue: 500,
    description: "ENERGY STAR® ductless mini-split heat pump for room-by-room efficiency.",
    requirements: "≥ 16 SEER / ≥ 8.0 HSPF · ENERGY STAR® certified",
    icon: Wind,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
  },
  {
    id: "smart-thermostat",
    name: "Smart Thermostat",
    rebate: "$100",
    rebateValue: 100,
    description: "Wi-Fi connected, ENERGY STAR® certified smart thermostat.",
    requirements: "ENERGY STAR® certified · Must be compatible with existing HVAC",
    icon: Thermometer,
    iconBg: "bg-[hsl(var(--brand-orange))]/10",
    iconColor: "text-[hsl(var(--brand-orange))]",
  },
  {
    id: "heat-pump-water-heater",
    name: "Heat Pump Water Heater",
    rebate: "$400",
    rebateValue: 400,
    description: "ENERGY STAR® heat pump water heater — uses 3x less energy than standard electric.",
    requirements: "≥ 2.0 UEF · ENERGY STAR® certified · 40–80 gallon capacity",
    icon: Droplets,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
  },
  {
    id: "gas-water-heater",
    name: "Gas Water Heater",
    rebate: "$75",
    rebateValue: 75,
    description: "High-efficiency natural gas water heater with ENERGY STAR® certification.",
    requirements: "≥ 0.67 UEF · ENERGY STAR® certified",
    icon: Flame,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
  },
];

const APPLIANCE_PRODUCTS: RebateProduct[] = [
  {
    id: "refrigerator",
    name: "ENERGY STAR® Refrigerator",
    rebate: "$50",
    rebateValue: 50,
    description: "ENERGY STAR® certified refrigerator or freezer replacement.",
    requirements: "ENERGY STAR® certified · Must replace a working unit",
    icon: Refrigerator,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
    popular: true,
  },
  {
    id: "clothes-washer",
    name: "Clothes Washer",
    rebate: "$50",
    rebateValue: 50,
    description: "ENERGY STAR® certified front-load or top-load clothes washer.",
    requirements: "ENERGY STAR® certified · CEF ≤ 3.2",
    icon: WashingMachine,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
  },
  {
    id: "dehumidifier",
    name: "Dehumidifier",
    rebate: "$30",
    rebateValue: 30,
    description: "ENERGY STAR® certified whole-home or portable dehumidifier.",
    requirements: "ENERGY STAR® certified · ≥ 30 pint capacity",
    icon: Droplets,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    id: "power-strip",
    name: "Advanced Power Strip",
    rebate: "$10",
    rebateValue: 10,
    description: "Smart power strip that cuts standby power to entertainment systems.",
    requirements: "Tier 2 certified · Eliminates phantom load",
    icon: Zap,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
  },
];

const EV_PRODUCTS: RebateProduct[] = [
  {
    id: "ev-charger",
    name: "Level 2 EV Charger",
    rebate: "$250",
    rebateValue: 250,
    description: "240V Level 2 home charger — charges your EV up to 5x faster than a standard outlet.",
    requirements: "ENERGY STAR® certified · Must be installed by licensed electrician",
    icon: PlugZap,
    iconBg: "bg-[hsl(var(--brand-orange))]/10",
    iconColor: "text-[hsl(var(--brand-orange))]",
    popular: true,
  },
  {
    id: "ev-smart-charging",
    name: "Smart EV Charging",
    rebate: "$50",
    rebateValue: 50,
    description: "Wi-Fi enabled smart charger that charges during off-peak hours automatically.",
    requirements: "Must be enrolled in Demand Response program",
    icon: Car,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
];

interface SubmittedRebate {
  id: string;
  name: string;
  amount: string;
  date: string;
  status: "pending" | "approved" | "paid";
}

const MOCK_SUBMITTED: SubmittedRebate[] = [
  { id: "r1", name: "Smart Thermostat", amount: "$100", date: "Mar 12, 2026", status: "paid" },
];

const STATUS_STYLES: Record<SubmittedRebate["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  paid: "bg-[hsl(var(--brand-orange))]/10 text-[hsl(var(--brand-orange))]",
};

export default function EnergyRebates() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<RebateProduct | null>(null);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [fileLabel, setFileLabel] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedRebates, setSubmittedRebates] = useState<SubmittedRebate[]>(MOCK_SUBMITTED);

  function openDrawer(product: RebateProduct) {
    setSelectedProduct(product);
    setPurchaseDate("");
    setModelNumber("");
    setFileLabel("");
    setSubmitted(false);
    setDrawerOpen(true);
  }

  function handleSubmit() {
    if (!purchaseDate || !modelNumber) return;
    const newRebate: SubmittedRebate = {
      id: `r${Date.now()}`,
      name: selectedProduct!.name,
      amount: selectedProduct!.rebate,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "pending",
    };
    setSubmittedRebates(prev => [newRebate, ...prev]);
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
            <span className="text-xl font-bold text-foreground">{product.rebate}</span>
            <span className="text-xs text-muted-foreground">rebate</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-foreground text-sm">{product.name}</h3>
          {product.popular && (
            <Badge className="bg-[hsl(var(--brand-orange))]/10 text-[hsl(var(--brand-orange))] border-none text-[10px] font-bold">POPULAR</Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-2 leading-relaxed flex-1">{product.description}</p>
        <p className="text-xs text-muted-foreground/70 italic mb-4">{product.requirements}</p>
        <Button
          size="sm"
          className="w-full bg-primary hover:bg-primary/90 text-white mt-auto"
          onClick={() => openDrawer(product)}
        >
          Claim Rebate <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
          <Link href="/energy">
            <a className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to My Energy Plan
            </a>
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))] text-xs font-semibold mb-4">
            <DollarSign className="w-3.5 h-3.5" /> Rebates & Incentives
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Get Money Back on Qualifying Purchases
          </h1>
          <p className="text-white/70 text-base max-w-xl mb-4">
            Your account info is already pre-filled. Just tell us what you bought, upload your receipt, and we'll handle the rest.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Up to $900 on HVAC", color: "text-white/70" },
              { label: "Up to $7,500 total", color: "text-white/70" },
              { label: "Typically processed in 4–6 weeks", color: "text-white/70" },
            ].map(({ label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--brand-orange))]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">

        {/* Submitted rebates banner */}
        {submittedRebates.length > 0 && (
          <div className="mb-8 p-4 bg-card border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">My Rebate Submissions</h3>
              <span className="text-xs text-muted-foreground">{submittedRebates.length} submitted</span>
            </div>
            <div className="space-y-2">
              {submittedRebates.map((r) => (
                <div key={r.id} className="flex items-center justify-between text-sm py-2 border-t border-border/30">
                  <span className="font-medium text-foreground">{r.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                    <span className="font-bold text-foreground">{r.amount}</span>
                    <Badge className={`${STATUS_STYLES[r.status]} border-none text-xs capitalize`}>
                      {r.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="hvac">
          <TabsList className="bg-card/80 border border-border/50 h-auto p-1 w-full md:w-auto flex mb-8 rounded-none">
            <TabsTrigger value="hvac" className="flex-1 md:flex-none px-5 py-2.5 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white">
              HVAC & Heating
            </TabsTrigger>
            <TabsTrigger value="appliances" className="flex-1 md:flex-none px-5 py-2.5 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white">
              Appliances
            </TabsTrigger>
            <TabsTrigger value="ev" className="flex-1 md:flex-none px-5 py-2.5 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white">
              EV & Smart Tech
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hvac">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">HVAC & Heating</h2>
                <p className="text-sm text-muted-foreground">Up to $900 back on qualifying systems</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HVAC_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </TabsContent>

          <TabsContent value="appliances">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">Appliances</h2>
                <p className="text-sm text-muted-foreground">Cash back on ENERGY STAR® certified appliances</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {APPLIANCE_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="mt-6 p-4 bg-secondary/50 border border-border/50 flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Looking to purchase? Visit the{" "}
                <a href="https://marketplace.pseg.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 font-medium">
                  PSE&G Energy Marketplace
                </a>{" "}
                for ENERGY STAR® certified appliances at exclusive customer pricing.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="ev">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">EV Charging & Smart Technology</h2>
                <p className="text-sm text-muted-foreground">Rebates on chargers + bonus credits for smart charging</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EV_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="mt-6 p-5 bg-teal-50 border border-teal-100 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-teal-900 mb-1">Pair your charger with Demand Response</h3>
                <p className="text-sm text-teal-700">
                  Enroll your smart charger in Demand Response and earn up to <strong>$120/year in credits</strong> for charging at off-peak times.
                </p>
              </div>
              <Link href="/energy/demand-response">
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white shrink-0">
                  Enroll Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        {/* Financing callout */}
        <div className="mt-10 p-6 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[hsl(var(--brand-orange))]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Need to finance the purchase?</h3>
              <p className="text-white/60 text-sm">Put qualifying upgrades on your PSE&G bill at 0% interest through the Home Upgrade Program.</p>
            </div>
            <Link href="/energy/home-assessment#contractor">
              <Button className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white shrink-0">
                Learn About Financing <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Rebate Claim Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={`${isMobile ? "h-[85vh] rounded-t-2xl" : "w-[420px]"} overflow-y-auto p-0`}
        >
          <div className="sticky top-0 bg-card z-10 border-b border-border/50">
            <SheetHeader className="p-5 pb-4">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-lg">Claim Rebate</SheetTitle>
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
                        <span className="text-xl font-bold text-foreground shrink-0">{selectedProduct.rebate}</span>
                      </div>

                      {/* Pre-filled account info */}
                      <div className="mb-5">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Your Account (pre-filled)</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-secondary/40 px-3 py-2">
                            <p className="text-xs text-muted-foreground">Name</p>
                            <p className="font-medium truncate">{user?.firstName} {user?.lastName || "Johnson"}</p>
                          </div>
                          <div className="bg-secondary/40 px-3 py-2">
                            <p className="text-xs text-muted-foreground">Account #</p>
                            <p className="font-medium">{user?.accountNumber || "123456789"}</p>
                          </div>
                          <div className="bg-secondary/40 px-3 py-2 col-span-2">
                            <p className="text-xs text-muted-foreground">Address</p>
                            <p className="font-medium truncate">{user?.address || "123 Maple Ave"}, {user?.city || "Springfield"}, NJ</p>
                          </div>
                        </div>
                      </div>

                      {/* Form fields */}
                      <div className="space-y-4 mb-5">
                        <div>
                          <Label htmlFor="purchase-date" className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                            Purchase Date
                          </Label>
                          <Input
                            id="purchase-date"
                            type="date"
                            value={purchaseDate}
                            onChange={(e) => setPurchaseDate(e.target.value)}
                            className="rounded-none"
                          />
                        </div>
                        <div>
                          <Label htmlFor="model-number" className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                            <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                            Model / Serial Number
                          </Label>
                          <Input
                            id="model-number"
                            placeholder="e.g. XR16-024-230"
                            value={modelNumber}
                            onChange={(e) => setModelNumber(e.target.value)}
                            className="rounded-none"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                            <Upload className="w-3.5 h-3.5 text-muted-foreground" />
                            Receipt Upload
                          </Label>
                          <label
                            htmlFor="receipt-upload"
                            className="flex flex-col items-center justify-center gap-2 py-6 border-2 border-dashed border-border hover:border-primary/40 bg-secondary/20 cursor-pointer transition-colors"
                          >
                            <Upload className="w-6 h-6 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {fileLabel || "Tap to upload receipt"}
                            </span>
                            <span className="text-xs text-muted-foreground/60">JPG, PNG, or PDF · Max 10MB</span>
                            <input
                              id="receipt-upload"
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
                        <span>Rebate will be applied as a credit on your PSE&G bill within 4–6 weeks of approval.</span>
                      </div>

                      <Button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-white disabled:opacity-40"
                      >
                        Submit Rebate Claim <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
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
                  <div className="w-16 h-16 bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-9 h-9 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Rebate Submitted!</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Your <strong>{selectedProduct?.rebate}</strong> rebate for the{" "}
                    <strong>{selectedProduct?.name}</strong> has been submitted.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Clock className="w-4 h-4" />
                    <span>Credited to your bill in 4–6 weeks</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mb-3"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Browse More Rebates
                  </Button>
                  <Button
                    className="w-full bg-primary text-white"
                    onClick={() => setDrawerOpen(false)}
                  >
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
