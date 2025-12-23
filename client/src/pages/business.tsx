import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function Business() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="flex-1">
            <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2 block">For Business</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Powering Your Business Success</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Whether you're a small startup or a large enterprise, we have tailored energy solutions to help your business thrive.
            </p>
            <div className="flex gap-4">
              <Button size="lg">Log In to MyBusiness</Button>
              <Button size="lg" variant="outline">View Rates</Button>
            </div>
          </div>
          <div className="flex-1 w-full h-[400px] bg-muted rounded-xl relative overflow-hidden">
             <img src="https://placehold.co/800x600/e2e8f0/475569?text=Modern+Office+Space" alt="Office" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-l-4 border-l-primary">
            <h3 className="font-bold text-xl mb-3">Efficiency Direct</h3>
            <p className="text-muted-foreground mb-4">Turnkey energy efficiency solutions for businesses.</p>
            <a href="#" className="font-medium text-primary hover:underline">Learn More</a>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border border-l-4 border-l-primary">
            <h3 className="font-bold text-xl mb-3">Economic Development</h3>
            <p className="text-muted-foreground mb-4">Incentives for businesses expanding in our territory.</p>
            <a href="#" className="font-medium text-primary hover:underline">Learn More</a>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border border-l-4 border-l-primary">
            <h3 className="font-bold text-xl mb-3">Electric Vehicles</h3>
            <p className="text-muted-foreground mb-4">Charging infrastructure programs for your fleet or workplace.</p>
            <a href="#" className="font-medium text-primary hover:underline">Learn More</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
