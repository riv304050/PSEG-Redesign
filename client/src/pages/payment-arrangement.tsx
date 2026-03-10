import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  ArrowRight,
  CalendarClock, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  Info,
  Calendar
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentArrangement() {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("installments");
  const [step, setStep] = useState(1);
  const [months, setMonths] = useState(3);
  const [downPayment, setDownPayment] = useState("50");
  
  const totalBalance = 450.00;
  
  const downPaymentValue = parseFloat(downPayment) || 0;
  const remainingBalance = totalBalance - downPaymentValue;
  const monthlyPayment = remainingBalance / months;

  const handleEnroll = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 px-4 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          
          <Button variant="ghost" className="mb-6 pl-0 gap-2 hover:bg-transparent hover:text-primary" onClick={() => setLocation("/dashboard")}>
             <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-3">Payment Assistance</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We understand things come up. Choose an option below to find a plan that works for you.
            </p>
          </div>

          <Tabs defaultValue="installments" className="space-y-8" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2 p-1.5 bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm rounded-none h-auto">
              <TabsTrigger value="installments" className="py-3 text-sm font-semibold rounded-none data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
                Pay in Installments
              </TabsTrigger>
              <TabsTrigger value="extension" className="py-3 text-sm font-semibold rounded-none data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
                Due Date Extension
              </TabsTrigger>
            </TabsList>

            {/* INSTALLMENT PLAN CONTENT */}
            <TabsContent value="installments" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="md:col-span-1 space-y-4">
                  <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                        <Info className="w-4 h-4 text-primary" />
                        How it works
                      </h3>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span>Break your balance into smaller monthly payments.</span>
                        </li>
                        <li className="flex gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span>Pay current charges plus your installment on time.</span>
                        </li>
                        <li className="flex gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span>No penalty for paying off early.</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Alert className="bg-amber-50/80 border-amber-200/60 backdrop-blur-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800 text-sm">Important</AlertTitle>
                    <AlertDescription className="text-amber-700 text-xs mt-1">
                      Breaking a payment plan may affect your eligibility for future arrangements.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="md:col-span-2">
                  <AnimatePresence mode="wait">
                    
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm">
                          <CardHeader>
                            <CardTitle className="text-xl">Create Your Plan</CardTitle>
                            <CardDescription>Customize payments to fit your budget.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            
                            <div className="bg-secondary/50 p-4 rounded-none flex justify-between items-center border border-border/50">
                              <span className="text-sm font-medium text-muted-foreground">Total Past Due Balance</span>
                              <span className="text-2xl font-bold text-foreground">${totalBalance.toFixed(2)}</span>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-sm font-semibold">1. Down Payment (Optional)</Label>
                              <p className="text-xs text-muted-foreground">A down payment reduces your monthly installments.</p>
                              <div className="relative max-w-xs">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type="number" 
                                  className="pl-9 bg-card/80" 
                                  value={downPayment} 
                                  onChange={(e) => setDownPayment(e.target.value)} 
                                  data-testid="input-down-payment"
                                />
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <Label className="text-sm font-semibold">2. Installment Period</Label>
                                <span className="text-base font-bold text-primary">{months} Months</span>
                              </div>
                              <Slider 
                                defaultValue={[3]} 
                                max={12} 
                                min={2} 
                                step={1} 
                                value={[months]} 
                                onValueChange={(vals) => setMonths(vals[0])}
                                className="py-4" 
                                data-testid="slider-months"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>2 mo</span>
                                <span>6 mo</span>
                                <span>12 mo</span>
                              </div>
                            </div>

                            <div className="bg-primary/5 p-5 rounded-none border border-primary/10 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Remaining Balance</span>
                                <span>${remainingBalance.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Installments</span>
                                <span>{months}</span>
                              </div>
                              <div className="pt-3 border-t border-primary/10 flex justify-between items-center">
                                <span className="font-bold text-foreground">Monthly Payment</span>
                                <span className="text-2xl font-bold text-primary" data-testid="text-monthly-payment">${monthlyPayment.toFixed(2)}</span>
                              </div>
                              <p className="text-xs text-muted-foreground pt-1">
                                *Added to your regular monthly bill.
                              </p>
                            </div>

                          </CardContent>
                          <CardFooter className="flex justify-end gap-3 border-t border-white/40 pt-6">
                            <Button variant="ghost" onClick={() => setLocation("/dashboard")}>Cancel</Button>
                            <Button className="gap-2 px-6" onClick={() => setStep(2)} data-testid="button-review">
                              Review Plan <ArrowRight className="w-4 h-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                         <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm">
                          <CardHeader>
                            <CardTitle className="text-xl">Review & Confirm</CardTitle>
                            <CardDescription>Please review the details of your arrangement.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-4 border border-border/50 rounded-none p-5 bg-secondary/50">
                               <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="text-muted-foreground">Total Past Due</div>
                                  <div className="font-semibold text-right">${totalBalance.toFixed(2)}</div>
                                  
                                  <div className="text-muted-foreground">Down Payment</div>
                                  <div className="font-semibold text-right text-green-600">-${downPaymentValue.toFixed(2)}</div>
                                  
                                  <div className="text-muted-foreground">Amount Financed</div>
                                  <div className="font-semibold text-right">${remainingBalance.toFixed(2)}</div>
                                  
                                  <div className="col-span-2 h-px bg-slate-200 my-1" />
                                  
                                  <div className="font-bold text-primary">Monthly Installment</div>
                                  <div className="font-bold text-right text-primary">${monthlyPayment.toFixed(2)}</div>
                                  
                                  <div className="text-muted-foreground">Duration</div>
                                  <div className="text-right">{months} Months</div>
                                  
                                  <div className="text-muted-foreground">First Due</div>
                                  <div className="text-right">Jan 25, 2026</div>
                               </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 border border-border/50 rounded-none bg-card/80">
                               <Checkbox id="terms" className="mt-0.5" data-testid="checkbox-terms" />
                               <div className="grid gap-1 leading-none">
                                 <Label htmlFor="terms" className="text-sm font-medium leading-snug">
                                   I agree to the terms and conditions
                                 </Label>
                                 <p className="text-xs text-muted-foreground">
                                   I understand I must pay my regular bill plus this installment on time.
                                 </p>
                               </div>
                            </div>

                          </CardContent>
                          <CardFooter className="flex justify-between border-t border-border/50 pt-6">
                            <Button variant="ghost" onClick={() => setStep(1)} data-testid="button-back">
                              <ArrowLeft className="w-4 h-4 mr-2" /> Back
                            </Button>
                            <Button className="gap-2 px-6" onClick={handleEnroll} data-testid="button-confirm">
                              Confirm Arrangement <CheckCircle2 className="w-4 h-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 bg-card backdrop-blur-md rounded-none shadow-sm border border-border/50"
                      >
                         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                           <CheckCircle2 className="w-8 h-8" />
                         </div>
                         <h2 className="text-2xl font-bold text-foreground mb-3">You're All Set!</h2>
                         <p className="text-muted-foreground max-w-md mx-auto mb-8">
                           Your payment arrangement has been created. A confirmation has been sent to your email.
                         </p>
                         
                         <div className="flex flex-col sm:flex-row gap-3 justify-center">
                           <Button onClick={() => setLocation("/dashboard")} className="gap-2" data-testid="button-return-dashboard">
                             Return to Dashboard <ChevronRight className="w-4 h-4" />
                           </Button>
                           <Button variant="outline" className="gap-2 bg-secondary/50">
                             <Calendar className="w-4 h-4" /> Add to Calendar
                           </Button>
                         </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            </TabsContent>

            {/* EXTENSION TAB */}
            <TabsContent value="extension">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                        <CalendarClock className="w-4 h-4 text-primary" />
                        About Extensions
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Move your due date up to 30 days into the future for extra time to pay in full.
                      </p>
                       <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>Continue paying your regular monthly bill.</span>
                        </li>
                        <li className="flex gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>Available for residential gas or electric customers.</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2">
                   <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm">
                     <CardHeader>
                       <CardTitle className="text-xl">Request Extension</CardTitle>
                       <CardDescription>Select a new date to pay your current balance.</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="p-4 bg-secondary/50 rounded-none border border-border/50">
                           <p className="text-sm mb-1">Current Due Date: <span className="font-semibold text-red-600">Dec 26, 2025</span></p>
                           <p className="text-sm">Balance Due: <span className="font-semibold text-foreground">$142.50</span></p>
                        </div>
                        
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold">Select New Due Date</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                             {[10, 15, 20, 30].map(days => (
                               <Button key={days} variant="outline" className="h-auto py-4 flex flex-col gap-1 bg-card/80 hover:border-primary hover:bg-primary/5 rounded-none" data-testid={`button-extension-${days}`}>
                                 <span className="font-bold text-base">+{days} Days</span>
                                 <span className="text-xs text-muted-foreground">Jan {days + 5}</span>
                               </Button>
                             ))}
                          </div>
                        </div>
                     </CardContent>
                     <CardFooter className="flex justify-end gap-3 border-t border-white/40 pt-6">
                        <Button variant="ghost">Cancel</Button>
                        <Button data-testid="button-confirm-extension">Confirm Extension</Button>
                     </CardFooter>
                   </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12">
            <Card className="bg-card backdrop-blur-md border-border/50 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-slate-200/60">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">How do I know what I'm supposed to pay?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      When you have a payment plan, you agree to pay current charges plus the plan amount each month. These are clearly shown on your bill.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-slate-200/60">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">Can I change my payment plan later?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Changes to an existing plan aren't possible. To modify it, you'd need to pay off the current plan balance first.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-slate-200/60">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">What happens if I miss a payment?</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      Missing payments may affect future plan eligibility and could impact your service. It's important to make both regular and installment payments on time.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
