import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[hsl(var(--brand-orange))]/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-[hsl(var(--brand-orange))]" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3" data-testid="heading-404">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/">
            <a>
              <Button className="gap-2 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white" data-testid="button-return-home">
                Return Home <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
