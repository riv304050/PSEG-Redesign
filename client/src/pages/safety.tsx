import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, HardHat, AlertTriangle, Lightbulb } from "lucide-react";

export default function Safety() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto py-12">
        <h1 className="text-4xl font-bold text-foreground mb-6">Safety & Preparedness</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-12">
          Your safety is our top priority. Learn how to protect your family and home from electrical and gas hazards.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <ShieldCheck className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Gas Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Learn the signs of a gas leak and what to do if you suspect one in your home.</p>
              <a href="#" className="text-primary font-medium hover:underline">Read Guidelines →</a>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <AlertTriangle className="w-10 h-10 text-amber-500 mb-2" />
              <CardTitle>Storm Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Build an emergency kit and prepare your home for severe weather events.</p>
              <a href="#" className="text-primary font-medium hover:underline">Get Storm Ready →</a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <HardHat className="w-10 h-10 text-orange-600 mb-2" />
              <CardTitle>Call Before You Dig</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Dial 811 before starting any digging project to avoid hitting underground lines.</p>
              <a href="#" className="text-primary font-medium hover:underline">Learn About 811 →</a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Lightbulb className="w-10 h-10 text-yellow-500 mb-2" />
              <CardTitle>Electrical Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Tips for preventing electrical fires and staying safe around power lines.</p>
              <a href="#" className="text-primary font-medium hover:underline">Electrical Tips →</a>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
