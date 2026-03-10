import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileHeart, HandHelping, Users, ArrowRight } from "lucide-react";

export default function BillAssistance() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-6">Help Paying Your Bill</h1>
          <p className="text-xl text-muted-foreground">
            We understand that circumstances can change. We offer several payment assistance programs 
            and arrangements to help you stay on track.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <FileHeart className="w-6 h-6" />
              </div>
              <CardTitle>Payment Arrangements</CardTitle>
              <CardDescription>Spread your balance over time.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                If you're behind on your bill, you may qualify for a Deferred Payment Arrangement (DPA) 
                to pay your balance in manageable installments.
              </p>
              <Button className="w-full" variant="outline">Create Arrangement</Button>
            </CardContent>
          </Card>

          <Card className="h-full flex flex-col border-primary/20 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <HandHelping className="w-6 h-6" />
              </div>
              <CardTitle>LIHEAP & USF</CardTitle>
              <CardDescription>State and federal grants.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                Low Income Home Energy Assistance Program (LIHEAP) and Universal Service Fund (USF) 
                provide grants to help eligible households pay energy bills.
              </p>
              <Button className="w-full">Check Eligibility</Button>
            </CardContent>
          </Card>

          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <CardTitle>PAGE Program</CardTitle>
              <CardDescription>Temporary assistance.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                Payment Assistance for Gas and Electric (PAGE) helps those who are over the income 
                limits for LIHEAP but are struggling to pay.
              </p>
              <Button className="w-full" variant="outline">Apply Now</Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-none p-8 border shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Not sure what you qualify for?</h2>
              <p className="text-muted-foreground">Answer a few simple questions to find the right program for you.</p>
            </div>
            <Button size="lg" className="gap-2">
              Start Program Finder <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
