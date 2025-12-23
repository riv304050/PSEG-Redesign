import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { IntelligentSearch } from "@/components/home/intelligent-search";
import { ActionTiles } from "@/components/home/action-tiles";
import { AlertBanner } from "@/components/home/alert-banner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ShieldCheck, Wallet, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AlertBanner />
      <Header />
      
      <main className="flex-1">
        <IntelligentSearch />
        <ActionTiles />
        
        {/* Promotional / Informational Zone */}
        <section className="py-16 px-4">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Energy Solutions for You</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Discover ways to save money, improve efficiency, and protect your home with our specialized programs.
                </p>
                <Button className="gap-2">
                  View All Programs <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <Leaf className="w-8 h-8 text-green-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Energy Efficiency</h3>
                    <p className="text-sm text-muted-foreground">Rebates and tips to lower your consumption.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">WorryFree Protection</h3>
                    <p className="text-sm text-muted-foreground">Cover your appliances from unexpected breakdowns.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-purple-500">
                  <CardContent className="p-6">
                    <Wallet className="w-8 h-8 text-purple-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Payment Assistance</h3>
                    <p className="text-sm text-muted-foreground">Programs to help you manage your energy costs.</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-primary/20 flex items-center justify-center">
                  <CardContent className="p-6 text-center">
                    <p className="font-medium text-primary">See 12 more programs</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory/Safety Section */}
        <section className="bg-white py-16 px-4 border-t">
          <div className="container">
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
