import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { IntelligentSearch } from "@/components/home/intelligent-search";
import { ActionTiles } from "@/components/home/action-tiles";
import { AlertBanner } from "@/components/home/alert-banner";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ShieldCheck, Wallet, AlertTriangle, DollarSign, TrendingDown, Lightbulb, Users, Building2, Search, HandCoins, Zap, BarChart3, CheckCircle2, Heart, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AlertBanner />
      <Header />

      <main className="flex-1">
        <IntelligentSearch />
        <ActionTiles />

        {/* Bill Help Center CTA */}
        <section className="px-4 py-10 bg-[hsl(var(--brand-orange))]/5 border-y border-[hsl(var(--brand-orange))]/15">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[hsl(var(--brand-orange))] flex items-center justify-center shrink-0">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[hsl(var(--brand-orange))] uppercase tracking-wider mb-1">Bill Help Center</p>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                    "My bill is too high. I don't know what to do."
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1 max-w-xl">
                    We hear this every day — and we have more answers than most people expect. Payment arrangements, income assistance, free home upgrades, and more. Let's find what fits your situation.
                  </p>
                </div>
              </div>
              <Link href="/bill-help">
                <a className="shrink-0">
                  <Button
                    size="lg"
                    className="gap-2 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white whitespace-nowrap shadow-lg"
                    data-testid="button-bill-help-center"
                  >
                    Get Help Now <ChevronRight className="w-5 h-5" />
                  </Button>
                </a>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto">

            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[hsl(var(--brand-orange))]/10 text-[hsl(var(--brand-orange))] text-sm font-semibold mb-4" data-testid="badge-rising-costs">
                <TrendingDown className="w-3.5 h-3.5" />
                Addressing Rising Energy Costs
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-fighting-costs">We're Fighting to Keep Your Bills Manageable</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Energy costs are rising nationwide. PSE&G is investing in infrastructure, clean energy, and customer programs to help offset the impact on your monthly bill.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                className="bg-card border border-border/50 p-8 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                data-testid="card-assistance-finder"
              >
                <div className="w-14 h-14 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--brand-orange))] transition-colors duration-300">
                  <Search className="w-7 h-7 text-[hsl(var(--brand-orange))] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Assistance Finder</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Not sure what programs you qualify for? Our personalized tool matches you with savings, rebates, and payment assistance based on your situation.
                </p>
                <Link href="/bill-assistance">
                  <a className="inline-flex items-center gap-2 text-[hsl(var(--brand-orange))] font-semibold text-sm hover:gap-3 transition-all" data-testid="link-assistance-finder">
                    Find Your Savings <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border/50 p-8 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                data-testid="card-payment-options"
              >
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                  <HandCoins className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Flexible Payment Options</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Struggling with a high bill? We offer Equal Payment Plans, deferred arrangements, and budget billing so you're never caught off guard.
                </p>
                <Link href="/payment-arrangement">
                  <a className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all" data-testid="link-payment-options">
                    Explore Options <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border/50 p-8 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                data-testid="card-efficiency-programs"
              >
                <div className="w-14 h-14 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--brand-orange))] transition-colors duration-300">
                  <Lightbulb className="w-7 h-7 text-[hsl(var(--brand-orange))] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Cut Your Usage, Cut Your Bill</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Get up to $7,500 in rebates, free home energy assessments, and smart meter insights to help you use less and save more.
                </p>
                <Link href="/savings">
                  <a className="inline-flex items-center gap-2 text-[hsl(var(--brand-orange))] font-semibold text-sm hover:gap-3 transition-all" data-testid="link-efficiency-programs">
                    View Programs <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary overflow-hidden mb-16 relative"
              data-testid="section-cost-commitment"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12 relative z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))] text-xs font-bold uppercase tracking-wider mb-5">
                    <DollarSign className="w-3 h-3" />
                    Cost Transparency
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-4">Understanding Your Bill</h2>
                  <p className="text-white/70 text-base mb-6 leading-relaxed">
                    We believe you deserve to know exactly where your money goes. Rising energy costs are driven by infrastructure upgrades, fuel prices, and clean energy investments — but we're working to minimize the impact on you.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--brand-orange))] shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">$4.2B invested in grid modernization to reduce outages and improve efficiency</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--brand-orange))] shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">$250M+ in rebates and incentives returned to customers</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--brand-orange))] shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Lowest delivery rates among NJ utilities for 5 consecutive years</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/dashboard">
                      <a>
                        <Button className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white gap-2" data-testid="button-view-breakdown">
                          View My Bill Breakdown <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </Link>
                    <Link href="/bill-assistance">
                      <a>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2" data-testid="button-get-help">
                          Get Bill Help
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="p-8 md:p-12 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 text-center">
                      <p className="text-3xl font-bold text-[hsl(var(--brand-orange))]">15%</p>
                      <p className="text-white/60 text-xs mt-2">Average savings with our efficiency programs</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 text-center">
                      <p className="text-3xl font-bold text-white">$115</p>
                      <p className="text-white/60 text-xs mt-2">Equal Payment Plan avg monthly amount</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 text-center">
                      <p className="text-3xl font-bold text-white">$7,500</p>
                      <p className="text-white/60 text-xs mt-2">Max rebates available per household</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 text-center">
                      <p className="text-3xl font-bold text-[hsl(var(--brand-orange))]">0%</p>
                      <p className="text-white/60 text-xs mt-2">Interest on payment arrangements</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
              <div>
                <span className="text-sm font-bold text-[hsl(var(--brand-orange))] uppercase tracking-wider mb-2 block">For You</span>
                <h2 className="text-3xl font-bold text-foreground mb-4">Programs That Put Money Back in Your Pocket</h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  From income-based assistance to smart home upgrades, we have programs designed to lower your costs — no matter your situation.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 p-4 bg-card border border-border/50 hover:border-[hsl(var(--brand-orange))]/30 transition-colors group cursor-pointer" data-testid="card-program-liheap">
                    <div className="w-10 h-10 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center shrink-0 group-hover:bg-[hsl(var(--brand-orange))] transition-colors">
                      <Wallet className="w-5 h-5 text-[hsl(var(--brand-orange))] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">LIHEAP & USF Programs</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Income-eligible grants up to $2,000+ to cover energy bills</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card border border-border/50 hover:border-[hsl(var(--brand-orange))]/30 transition-colors group cursor-pointer" data-testid="card-program-comfort">
                    <div className="w-10 h-10 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center shrink-0 group-hover:bg-[hsl(var(--brand-orange))] transition-colors">
                      <Leaf className="w-5 h-5 text-[hsl(var(--brand-orange))] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Comfort Partners</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Free weatherization and energy upgrades for qualifying homes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card border border-border/50 hover:border-primary/30 transition-colors group cursor-pointer" data-testid="card-program-smart-meter">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                      <BarChart3 className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Smart Meter Insights</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">See exactly when and where you use the most energy — then cut it</p>
                    </div>
                  </div>
                </div>
                <Link href="/savings">
                  <a>
                    <Button className="gap-2 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white" data-testid="button-all-programs">
                      View All Programs <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" alt="Modern home with energy efficient features" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-[hsl(var(--brand-orange))] text-white p-5 shadow-xl max-w-[220px] hidden md:block" data-testid="card-savings-stat">
                  <p className="text-3xl font-bold">$847</p>
                  <p className="text-sm text-white/80 mt-1">Average annual savings for enrolled customers</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/50 overflow-hidden" data-testid="section-business">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    <Building2 className="w-3 h-3" />
                    For Business
                  </span>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Managing Costs for Your Business</h2>
                  <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                    We understand energy costs impact your bottom line. Discover tailored rate options, demand response programs, and efficiency incentives designed for businesses of all sizes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/business">
                      <a>
                        <Button size="lg" className="gap-2" data-testid="button-business-solutions">
                          Business Solutions <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </Link>
                    <Button size="lg" variant="outline" className="bg-transparent hover:bg-secondary/50" data-testid="button-business-rates">
                      View Rates & Tariffs
                    </Button>
                  </div>
                </div>
                <div className="h-64 md:h-full min-h-[300px] relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1000" alt="Business professionals" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-card/30 to-transparent md:bg-gradient-to-t" />
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="bg-primary py-14 px-4 border-t border-white/10" data-testid="section-safety">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-white mb-3">Smell Gas? Act Fast.</h2>
                <p className="text-white/60 mb-6">
                  If you smell a rotten egg odor, leave the area immediately and call 911 or PSE&G at 1-800-880-PSEG (7734). Do not use phones or light switches nearby.
                </p>
                <Link href="/safety">
                  <a>
                    <Button className="gap-2 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white" data-testid="button-gas-safety">
                      <AlertTriangle className="w-4 h-4" />
                      Gas Safety Tips
                    </Button>
                  </a>
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Emergency Line</p>
                  <a href="tel:1-800-880-7734" className="text-2xl font-bold text-[hsl(var(--brand-orange))] hover:text-white transition-colors">1-800-880-7734</a>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="text-center">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Customer Service</p>
                  <a href="tel:1-800-436-7734" className="text-2xl font-bold text-white/80 hover:text-white transition-colors">1-800-436-7734</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
