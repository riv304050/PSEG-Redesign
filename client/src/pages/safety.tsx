import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, HardHat, AlertTriangle, Lightbulb, Phone, ArrowRight, Flame } from "lucide-react";

export default function Safety() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-14 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))] text-sm font-semibold mb-4" data-testid="badge-safety">
            <ShieldCheck className="w-3.5 h-3.5" />
            Your Safety Matters
          </span>
          <h1 className="text-4xl font-bold text-white mb-3" data-testid="heading-safety">Safety & Preparedness</h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Your safety is our top priority. Learn how to protect your family and home from electrical and gas hazards.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="bg-red-50 border border-red-200 p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4" data-testid="card-emergency-banner">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="font-bold text-red-900">Smell Gas? Act Fast.</h2>
              <p className="text-sm text-red-700">Leave immediately. Do not use phones or light switches. Call from a safe distance.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a href="tel:911">
              <Button variant="destructive" className="gap-2" data-testid="button-call-911">
                <Phone className="w-4 h-4" /> Call 911
              </Button>
            </a>
            <a href="tel:1-800-880-7734">
              <Button className="gap-2 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white" data-testid="button-call-pseg-emergency">
                <Phone className="w-4 h-4" /> 1-800-880-7734
              </Button>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group" data-testid="card-gas-safety">
            <CardHeader>
              <div className="w-12 h-12 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center mb-3 group-hover:bg-[hsl(var(--brand-orange))] transition-colors">
                <ShieldCheck className="w-6 h-6 text-[hsl(var(--brand-orange))] group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-lg">Gas Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Learn the signs of a gas leak and what to do if you suspect one in your home.</p>
              <a href="#" className="inline-flex items-center gap-1.5 font-semibold text-sm text-[hsl(var(--brand-orange))] hover:gap-2.5 transition-all" data-testid="link-gas-safety">
                Read Guidelines <ArrowRight className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group" data-testid="card-storm-prep">
            <CardHeader>
              <div className="w-12 h-12 bg-amber-100 flex items-center justify-center mb-3 group-hover:bg-amber-500 transition-colors">
                <AlertTriangle className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-lg">Storm Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Build an emergency kit and prepare your home for severe weather events.</p>
              <a href="#" className="inline-flex items-center gap-1.5 font-semibold text-sm text-primary hover:gap-2.5 transition-all" data-testid="link-storm-prep">
                Get Storm Ready <ArrowRight className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group" data-testid="card-dig-safety">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                <HardHat className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-lg">Call Before You Dig</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Dial 811 before starting any digging project to avoid hitting underground lines.</p>
              <a href="#" className="inline-flex items-center gap-1.5 font-semibold text-sm text-primary hover:gap-2.5 transition-all" data-testid="link-dig-safety">
                Learn About 811 <ArrowRight className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group" data-testid="card-electrical-safety">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 flex items-center justify-center mb-3 group-hover:bg-yellow-500 transition-colors">
                <Lightbulb className="w-6 h-6 text-yellow-600 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-lg">Electrical Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Tips for preventing electrical fires and staying safe around power lines.</p>
              <a href="#" className="inline-flex items-center gap-1.5 font-semibold text-sm text-primary hover:gap-2.5 transition-all" data-testid="link-electrical-safety">
                Electrical Tips <ArrowRight className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
