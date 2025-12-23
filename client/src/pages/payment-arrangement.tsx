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
  CreditCard,
  Calculator,
  Calendar
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  
  // Calculations
  const downPaymentValue = parseFloat(downPayment) || 0;
  const remainingBalance = totalBalance - downPaymentValue;
  const monthlyPayment = remainingBalance / months;

  const handleEnroll = () => {
    // Mock enrollment
    setStep(3); // Success step
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          
          <Button variant="ghost" className="mb-6 pl-0 gap-2 hover:bg-transparent hover:text-primary" onClick={() => setLocation("/dashboard")}>
             <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-4">Payment Assistance Options</h1>
            <p className="text-lg text-muted-foreground">
              We understand that sometimes you might need a little extra time or help with your bill. 
              Review our payment arrangement options below to find a plan that works for you.
            </p>
          </div>

          <Tabs defaultValue="installments" className="space-y-8" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 p-1 bg-muted rounded-xl">
              <TabsTrigger value="installments" className="py-3 text-base data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                Pay in Installments
              </TabsTrigger>
              <TabsTrigger value="extension" className="py-3 text-base data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                Due Date Extension
              </TabsTrigger>
            </TabsList>

            {/* INSTALLMENT PLAN CONTENT */}
            <TabsContent value="installments" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                
                {/* Information Column */}
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      How it works
                    </h3>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <span>Break your existing balance into smaller monthly payments.</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <span>Pay current charges plus your installment amount on time.</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <span>No penalty for paying off your plan early.</span>
                      </li>
                    </ul>
                  </div>

                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">Important</AlertTitle>
                    <AlertDescription className="text-amber-700 text-xs mt-1">
                      If you break a payment plan, you may not be offered another one in the future and could risk service disconnection.
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Interaction Column */}
                <div className="md:col-span-2">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 1: CONFIGURATION */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <Card className="border-t-4 border-t-primary">
                          <CardHeader>
                            <CardTitle>Create Your Plan</CardTitle>
                            <CardDescription>Customize your payments to fit your budget.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-8">
                            
                            {/* Balance Info */}
                            <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                              <span className="font-medium text-muted-foreground">Total Past Due Balance</span>
                              <span className="text-2xl font-bold text-foreground">${totalBalance.toFixed(2)}</span>
                            </div>

                            {/* Down Payment Input */}
                            <div className="space-y-3">
                              <Label className="text-base font-semibold">1. Make a Down Payment (Optional)</Label>
                              <p className="text-sm text-muted-foreground">Paying a portion now reduces your monthly installments.</p>
                              <div className="relative max-w-xs">
                                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <Input 
                                  type="number" 
                                  className="pl-10 text-lg" 
                                  value={downPayment} 
                                  onChange={(e) => setDownPayment(e.target.value)} 
                                />
                              </div>
                            </div>

                            {/* Slider for Months */}
                            <div className="space-y-6">
                              <div className="flex justify-between items-center">
                                <Label className="text-base font-semibold">2. Choose Installment Period</Label>
                                <span className="text-lg font-bold text-primary">{months} Months</span>
                              </div>
                              <Slider 
                                defaultValue={[3]} 
                                max={12} 
                                min={2} 
                                step={1} 
                                value={[months]} 
                                onValueChange={(vals) => setMonths(vals[0])}
                                className="py-4" 
                              />
                              <div className="flex justify-between text-xs text-muted-foreground px-1">
                                <span>2 Months</span>
                                <span>6 Months</span>
                                <span>12 Months</span>
                              </div>
                            </div>

                            {/* Summary Calculation */}
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 space-y-3">
                              <div className="flex justify-between text-sm">
                                <span>Remaining Balance:</span>
                                <span>${remainingBalance.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Number of Installments:</span>
                                <span>{months}</span>
                              </div>
                              <div className="pt-3 border-t border-blue-200 flex justify-between items-center">
                                <span className="font-bold text-blue-900">Your Monthly Installment:</span>
                                <span className="text-2xl font-bold text-blue-700">${monthlyPayment.toFixed(2)}</span>
                              </div>
                              <p className="text-xs text-blue-600 mt-2">
                                *This amount will be added to your regular monthly bill.
                              </p>
                            </div>

                          </CardContent>
                          <CardFooter className="flex justify-end gap-4 border-t pt-6">
                            <Button variant="ghost" onClick={() => setLocation("/dashboard")}>Cancel</Button>
                            <Button className="gap-2 px-8" onClick={() => setStep(2)}>
                              Review Plan <ArrowRight className="w-4 h-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    )}

                    {/* STEP 2: REVIEW */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                         <Card className="border-t-4 border-t-primary">
                          <CardHeader>
                            <CardTitle>Review & Confirm</CardTitle>
                            <CardDescription>Please review the details of your payment arrangement.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-4 border rounded-xl p-6 bg-slate-50/50">
                               <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="text-muted-foreground">Total Past Due:</div>
                                  <div className="font-semibold text-right">${totalBalance.toFixed(2)}</div>
                                  
                                  <div className="text-muted-foreground">Down Payment (Due Now):</div>
                                  <div className="font-semibold text-right text-green-600">-${downPaymentValue.toFixed(2)}</div>
                                  
                                  <div className="text-muted-foreground">Amount Financed:</div>
                                  <div className="font-semibold text-right">${remainingBalance.toFixed(2)}</div>
                                  
                                  <div className="col-span-2 h-px bg-slate-200 my-2" />
                                  
                                  <div className="text-lg font-bold text-primary">Monthly Installment:</div>
                                  <div className="text-lg font-bold text-right text-primary">${monthlyPayment.toFixed(2)}</div>
                                  
                                  <div className="text-muted-foreground">Duration:</div>
                                  <div className="text-right">{months} Months</div>
                                  
                                  <div className="text-muted-foreground">First Installment Due:</div>
                                  <div className="text-right">Jan 25, 2026</div>
                               </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 border rounded-lg bg-white">
                               <Checkbox id="terms" className="mt-1" />
                               <div className="grid gap-1.5 leading-none">
                                 <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                   I agree to the terms and conditions
                                 </Label>
                                 <p className="text-xs text-muted-foreground">
                                   I understand that I must pay my regular monthly bill PLUS this installment amount on time to keep this arrangement active.
                                 </p>
                               </div>
                            </div>

                          </CardContent>
                          <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="ghost" onClick={() => setStep(1)}>
                              <ArrowLeft className="w-4 h-4 mr-2" /> Back
                            </Button>
                            <Button className="gap-2 px-8 bg-green-600 hover:bg-green-700" onClick={handleEnroll}>
                              Confirm Arrangement <CheckCircle2 className="w-4 h-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    )}

                    {/* STEP 3: SUCCESS */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 bg-white rounded-xl shadow-sm border"
                      >
                         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                           <CheckCircle2 className="w-10 h-10" />
                         </div>
                         <h2 className="text-3xl font-bold text-foreground mb-4">You're All Set!</h2>
                         <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
                           Your payment arrangement has been successfully created. A confirmation email has been sent to your inbox.
                         </p>
                         
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
                           <Button onClick={() => setLocation("/dashboard")} className="gap-2">
                             Return to Dashboard <ChevronRight className="w-4 h-4" />
                           </Button>
                           <Button variant="outline" className="gap-2">
                             <Calendar className="w-4 h-4" /> Add Reminders to Calendar
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
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <CalendarClock className="w-5 h-5 text-primary" />
                      About Extensions
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      A due date extension moves your due date up to 30 days into the future, giving you extra time to pay the balance in full.
                    </p>
                     <ul className="space-y-4 text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                        <span>Continue to pay your regular monthly bill.</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                        <span>Available for residential gas or electric customers.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2">
                   <Card className="border-t-4 border-t-blue-500">
                     <CardHeader>
                       <CardTitle>Request Due Date Extension</CardTitle>
                       <CardDescription>Select a new date to pay your current balance.</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="p-4 bg-slate-50 rounded-lg">
                           <p className="text-sm font-medium mb-2">Current Due Date: <span className="text-red-600">Dec 26, 2025</span></p>
                           <p className="text-sm font-medium">Balance Due: <span className="text-foreground">$142.50</span></p>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>Select New Due Date</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                             {[10, 15, 20, 30].map(days => (
                               <Button key={days} variant="outline" className="h-auto py-4 flex flex-col gap-1 hover:border-primary hover:bg-primary/5">
                                 <span className="font-bold text-lg">+{days} Days</span>
                                 <span className="text-xs text-muted-foreground">Jan {days + 5}</span>
                               </Button>
                             ))}
                          </div>
                        </div>
                     </CardContent>
                     <CardFooter className="flex justify-end gap-4 border-t pt-6">
                        <Button variant="ghost">Cancel</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">Confirm Extension</Button>
                     </CardFooter>
                   </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* FAQ Section */}
          <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I know what I’m supposed to pay?</AccordionTrigger>
                <AccordionContent>
                  When you have a payment plan, you are agreeing to pay the current charges plus the agreed payment plan amount every month until the plan is fulfilled. These amounts are clearly visible on your bill each month.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I change my payment plan later?</AccordionTrigger>
                <AccordionContent>
                  We cannot make changes to an existing payment plan. To cancel or change it, you must pay off the total balance of the current plan first.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What happens if I miss a payment?</AccordionTrigger>
                <AccordionContent>
                  If you break a payment plan, you may not be offered a payment plan in the future and could have your service shut off. It is critical to make both your regular monthly payment and your installment payment on time.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
