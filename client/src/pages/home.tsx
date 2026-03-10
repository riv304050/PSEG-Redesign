import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { IntelligentSearch } from "@/components/home/intelligent-search";
import { ActionTiles } from "@/components/home/action-tiles";
import { AlertBanner } from "@/components/home/alert-banner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ShieldCheck, Wallet, AlertTriangle, Armchair, Building2, Zap, BarChart3, Users } from "lucide-react";
import energyImage from "@assets/generated_images/energy_efficiency_home_concept.png";
import businessImage from "@assets/generated_images/modern_small_business_owner.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AlertBanner />
      <Header />
      
      <main className="flex-1">
        <IntelligentSearch />
        <ActionTiles />
        
        {/* Promotional / Informational Zone */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {/* Worry-Free Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div>
                <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2 block">Your Comfort</span>
                <h2 className="text-3xl font-bold text-foreground mb-4">Worry-Free Comfort for Your Home</h2>
                <p className="text-muted-foreground text-lg mb-6">
                   Your home is your sanctuary. We're dedicated to keeping it comfortable year-round with reliable energy and protection plans for your heating and cooling systems.
                </p>
                <ul className="space-y-3 mb-8">
                   <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700"><Armchair className="w-4 h-4"/></div>
                      <span className="font-medium text-foreground/80">Reliable heating & cooling</span>
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700"><ShieldCheck className="w-4 h-4"/></div>
                      <span className="font-medium text-foreground/80">24/7 Appliance protection</span>
                   </li>
                </ul>
                <Button className="gap-2 bg-foreground text-white hover:bg-primary">
                  Explore Protection Plans <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                 <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=1000" alt="Comfortable Family Home" className="w-full h-full object-cover" />
                 </div>
                 {/* Floating card */}
                 <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-none shadow-xl max-w-[200px] hidden md:block border-l-4 border-amber-400">
                    <p className="text-sm font-bold text-foreground">"The peace of mind is worth every penny."</p>
                    <div className="flex text-amber-400 mt-2">★★★★★</div>
                 </div>
              </div>
            </div>

            {/* Energy Efficiency Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="order-2 md:order-1 relative">
                 <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img src={energyImage} alt="Energy Efficiency" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -top-6 -right-6 bg-card p-4 rounded-none shadow-xl hidden md:block border-r-4 border-green-500">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-5 h-5 text-green-500" />
                      <span className="font-bold text-foreground">Save Money</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Reduce your monthly bill</p>
                 </div>
              </div>
              <div className="order-1 md:order-2">
                <span className="text-sm font-bold text-green-600 uppercase tracking-wider mb-2 block">Energy Efficiency</span>
                <h2 className="text-3xl font-bold text-foreground mb-4">Smart Savings for a Greener Future</h2>
                <p className="text-muted-foreground text-lg mb-6">
                   Take control of your energy usage with our comprehensive efficiency programs. From smart thermostats to home audits, we help you save money while helping the planet.
                </p>
                <ul className="space-y-3 mb-8">
                   <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700"><Leaf className="w-4 h-4"/></div>
                      <span className="font-medium text-foreground/80">Rebates on efficient appliances</span>
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700"><BarChart3 className="w-4 h-4"/></div>
                      <span className="font-medium text-foreground/80">Free home energy audits</span>
                   </li>
                </ul>
                <Button className="gap-2 bg-green-700 text-white hover:bg-green-800">
                  View Efficiency Programs <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Business Callout Section */}
            <div className="bg-primary/5 rounded-3xl overflow-hidden border border-primary/10">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                    <Building2 className="w-3 h-3" />
                    For Business
                  </span>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Powering Your Business Success</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    We understand that reliable energy is the heartbeat of your business. Discover tailored solutions, economic development incentives, and dedicated support for companies of all sizes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="gap-2">
                      Business Solutions <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="bg-card hover:bg-secondary/50">
                      View Rates & Tariffs
                    </Button>
                  </div>
                </div>
                <div className="h-64 md:h-full relative overflow-hidden">
                   <img src={businessImage} alt="Small Business Owner" className="absolute inset-0 w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent md:bg-gradient-to-t" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Regulatory/Safety Section */}
        <section className="bg-card py-16 px-4 border-t">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-foreground mb-3">Smell Gas? Act Fast.</h2>
                <p className="text-muted-foreground mb-6">
                  If you smell a rotten egg odor, leave the area immediately and call 911 or PSE&G at 1-800-880-PSEG (7734). Do not use phones or light switches nearby.
                </p>
                <Button variant="destructive" className="gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Gas Safety Tips
                </Button>
              </div>
              <div className="relative h-64 w-full md:w-1/3 bg-muted rounded-xl overflow-hidden flex items-center justify-center">
                {/* Abstract graphic representing safety */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 opacity-50"></div>
                <AlertTriangle className="w-24 h-24 text-amber-500 opacity-20" />
                <p className="relative z-10 font-bold text-amber-800/60">Safety First</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
