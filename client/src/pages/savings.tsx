import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, DollarSign, Home, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Savings() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold text-foreground mb-6">Energy & Savings</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-12">
          Save money and reduce your carbon footprint with our energy efficiency programs and rebates.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <Home className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Home Energy Assessment</h2>
            <p className="text-muted-foreground mb-6">
              Get a personalized analysis of your home's energy use and receive free energy-saving products.
            </p>
            <Button className="bg-green-700 hover:bg-green-800">Schedule Assessment</Button>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <DollarSign className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Rebates & Discounts</h2>
            <p className="text-muted-foreground mb-6">
              Find instant rebates on smart thermostats, appliances, and heating/cooling equipment.
            </p>
            <Button className="bg-blue-700 hover:bg-blue-800">Browse Marketplace</Button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Popular Programs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Smart Thermostats", icon: Sun },
            { title: "Appliance Recycling", icon: Leaf },
            { title: "Solar Information", icon: Sun },
          ].map((item, i) => (
            <Card key={i} className="hover:shadow-md cursor-pointer transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-lg">{item.title}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
