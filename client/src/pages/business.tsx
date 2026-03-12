import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Building2, Zap, Truck, ArrowRight, CheckCircle2, Phone } from "lucide-react";

export default function Business() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-14 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))] text-sm font-semibold mb-4" data-testid="badge-business">
            <Building2 className="w-3.5 h-3.5" />
            For Business
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3" data-testid="heading-business">Powering Your Business Success</h1>
          <p className="text-lg text-white/70 max-w-2xl mb-8">
            Whether you're a small startup or a large enterprise, we have tailored energy solutions to help your business thrive and manage costs.
          </p>
          <div className="flex gap-3">
            <Button size="lg" className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white gap-2" data-testid="button-login-mybusiness">
              Log In to MyBusiness <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" data-testid="button-view-rates">
              View Rates
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Efficiency Direct", desc: "Turnkey energy efficiency solutions for businesses. Custom assessments and retrofit programs to reduce operating costs.", icon: Zap, accent: true },
            { title: "Economic Development", desc: "Incentives for businesses expanding in our territory. Tax credits, infrastructure support, and rate options.", icon: Building2, accent: false },
            { title: "Electric Vehicles", desc: "Charging infrastructure programs for your fleet or workplace. Rebates and installation support.", icon: Truck, accent: true },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border/50 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group" data-testid={`card-business-${i}`}>
              <div className={`w-12 h-12 flex items-center justify-center mb-4 transition-colors ${item.accent ? 'bg-[hsl(var(--brand-orange))]/10 group-hover:bg-[hsl(var(--brand-orange))]' : 'bg-primary/10 group-hover:bg-primary'}`}>
                <item.icon className={`w-6 h-6 transition-colors ${item.accent ? 'text-[hsl(var(--brand-orange))] group-hover:text-white' : 'text-primary group-hover:text-white'}`} />
              </div>
              <h3 className="font-bold text-xl mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
              <a href="#" className={`inline-flex items-center gap-1.5 font-semibold text-sm hover:gap-2.5 transition-all ${item.accent ? 'text-[hsl(var(--brand-orange))]' : 'text-primary'}`}>
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border/50 p-8 text-center" data-testid="section-business-support">
          <h2 className="text-xl font-bold text-foreground mb-2">Business Solutions Center</h2>
          <p className="text-muted-foreground mb-4 text-sm">Our dedicated team is ready to help your business. Call <a href="tel:1-855-249-7734" className="font-semibold text-[hsl(var(--brand-orange))] hover:underline">1-855-249-7734</a> (Mon-Fri, 8 AM - 5:30 PM)</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
