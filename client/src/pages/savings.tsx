import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, DollarSign, Home, Sun, ArrowRight, TrendingDown, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Savings() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-14 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))] text-sm font-semibold mb-4" data-testid="badge-savings">
            <Leaf className="w-3.5 h-3.5" />
            Save Money & Energy
          </span>
          <h1 className="text-4xl font-bold text-white mb-3" data-testid="heading-savings">Energy Efficiency & Savings</h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Save money and reduce your carbon footprint. Get up to $7,500 in rebates and free home energy assessments.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border/50 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group" data-testid="card-home-assessment">
            <div className="w-14 h-14 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--brand-orange))] transition-colors">
              <Home className="w-7 h-7 text-[hsl(var(--brand-orange))] group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Home Energy Assessment</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Get a personalized analysis of your home's energy use and receive free energy-saving products installed on the spot.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--brand-orange))] shrink-0" /> Free for all PSE&G customers
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--brand-orange))] shrink-0" /> LED bulbs and smart power strips included
              </li>
            </ul>
            <Button className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white gap-2" data-testid="button-schedule-assessment">
              Schedule Assessment <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="bg-card border border-border/50 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group" data-testid="card-rebates">
            <div className="w-14 h-14 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--brand-orange))] transition-colors">
              <DollarSign className="w-7 h-7 text-[hsl(var(--brand-orange))] group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Rebates & Discounts</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Find instant rebates on smart thermostats, energy-efficient appliances, and HVAC equipment.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--brand-orange))] shrink-0" /> Up to $900 on HVAC systems
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--brand-orange))] shrink-0" /> $7,500 max per household
              </li>
            </ul>
            <Button className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white gap-2" data-testid="button-browse-marketplace">
              Browse Marketplace <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="heading-popular-programs">Popular Programs</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { title: "Smart Thermostats", desc: "Save up to 10% on heating and cooling", icon: Sun, accent: true },
            { title: "Appliance Recycling", desc: "Free pickup + $50 rebate for old units", icon: Leaf, accent: false },
            { title: "Solar Information", desc: "Learn about solar options for your home", icon: Sun, accent: false },
          ].map((item, i) => (
            <Card key={i} className="border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group" data-testid={`card-program-${i}`}>
              <CardContent className="p-6 flex items-start gap-4">
                <div className={`w-10 h-10 flex items-center justify-center shrink-0 transition-colors ${item.accent ? 'bg-[hsl(var(--brand-orange))]/10 group-hover:bg-[hsl(var(--brand-orange))]' : 'bg-primary/10 group-hover:bg-primary'}`}>
                  <item.icon className={`w-5 h-5 transition-colors ${item.accent ? 'text-[hsl(var(--brand-orange))] group-hover:text-white' : 'text-primary group-hover:text-white'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary p-8 relative overflow-hidden" data-testid="section-savings-cta">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Ready to lower your energy bill?</h2>
              <p className="text-white/60 text-sm">Our efficiency programs have saved customers an average of $847 per year.</p>
            </div>
            <Link href="/dashboard">
              <a>
                <Button size="lg" className="gap-2 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white shrink-0" data-testid="button-view-usage">
                  View My Usage <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
