import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileHeart, HandHelping, Users, ArrowRight, DollarSign, CheckCircle2, TrendingDown, Phone, Search } from "lucide-react";
import { Link } from "wouter";

export default function BillAssistance() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-14 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))] text-sm font-semibold mb-4" data-testid="badge-assistance">
            <TrendingDown className="w-3.5 h-3.5" />
            We're Here to Help
          </span>
          <h1 className="text-4xl font-bold text-white mb-3" data-testid="heading-assistance">Help Paying Your Bill</h1>
          <p className="text-lg text-white/70 max-w-2xl">
            We understand that circumstances can change. We offer several payment assistance programs and arrangements to help you stay on track.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="h-full flex flex-col border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group" data-testid="card-payment-arrangements">
            <CardHeader>
              <div className="w-12 h-12 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--brand-orange))] transition-colors">
                <FileHeart className="w-6 h-6 text-[hsl(var(--brand-orange))] group-hover:text-white transition-colors" />
              </div>
              <CardTitle>Payment Arrangements</CardTitle>
              <CardDescription>Spread your balance over time.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                If you're behind on your bill, you may qualify for a Deferred Payment Arrangement (DPA) to pay your balance in manageable installments at 0% interest.
              </p>
              <Link href="/payment-arrangement">
                <a>
                  <Button className="w-full bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white gap-2" data-testid="button-create-arrangement">
                    Create Arrangement <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </Link>
            </CardContent>
          </Card>

          <Card className="h-full flex flex-col border-[hsl(var(--brand-orange))]/20 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group" data-testid="card-liheap">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <HandHelping className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <CardTitle>LIHEAP & USF</CardTitle>
              <CardDescription>State and federal grants.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                Low Income Home Energy Assistance Program (LIHEAP) and Universal Service Fund (USF) provide grants up to $2,000+ to help eligible households.
              </p>
              <Button className="w-full gap-2" data-testid="button-check-eligibility">
                Check Eligibility <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="h-full flex flex-col border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group" data-testid="card-page-program">
            <CardHeader>
              <div className="w-12 h-12 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--brand-orange))] transition-colors">
                <Users className="w-6 h-6 text-[hsl(var(--brand-orange))] group-hover:text-white transition-colors" />
              </div>
              <CardTitle>PAGE Program</CardTitle>
              <CardDescription>Temporary assistance.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                Payment Assistance for Gas and Electric (PAGE) helps those who are over the income limits for LIHEAP but are struggling to pay.
              </p>
              <Button className="w-full gap-2" variant="outline" data-testid="button-apply-page">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border/50 p-6 flex items-start gap-4 hover:shadow-md transition-all group" data-testid="card-comfort-partners">
            <div className="w-10 h-10 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center shrink-0 group-hover:bg-[hsl(var(--brand-orange))] transition-colors">
              <DollarSign className="w-5 h-5 text-[hsl(var(--brand-orange))] group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Comfort Partners</h3>
              <p className="text-sm text-muted-foreground">Free weatherization and energy upgrades for income-eligible households. Reduce your usage and your bill at no cost.</p>
            </div>
          </div>
          <div className="bg-card border border-border/50 p-6 flex items-start gap-4 hover:shadow-md transition-all group" data-testid="card-equal-payment">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
              <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Equal Payment Plan</h3>
              <p className="text-sm text-muted-foreground">Spread your costs evenly over 12 months. No surprises — pay about the same each month regardless of season.</p>
            </div>
          </div>
        </div>

        <div className="bg-primary p-8 relative overflow-hidden" data-testid="section-program-finder">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[hsl(var(--brand-orange))]/20 flex items-center justify-center shrink-0">
                <Search className="w-7 h-7 text-[hsl(var(--brand-orange))]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Not sure what you qualify for?</h2>
                <p className="text-white/60 text-sm">Answer a few simple questions to find the right program for you.</p>
              </div>
            </div>
            <Button size="lg" className="gap-2 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white shrink-0" data-testid="button-program-finder">
              Start Program Finder <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">Need immediate help? Call <a href="tel:1-800-357-2262" className="font-semibold text-[hsl(var(--brand-orange))] hover:underline">1-800-357-2262</a> (Mon-Fri, 7:30 AM - 8:00 PM)</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
