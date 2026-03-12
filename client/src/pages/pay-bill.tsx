import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CreditCard, CheckCircle, ArrowRight, ArrowLeft, LogIn, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const lookupSchema = z.object({
  accountNumber: z.string().min(10, "Account number must be at least 10 digits").max(20),
  zipCode: z.string().min(5, "ZIP code must be 5 digits").max(5),
});

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const paymentSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiry: z.string().min(5, "Expiry date required (MM/YY)"),
  cvc: z.string().min(3, "CVC required"),
});

import { Link } from "wouter";

export default function PayBill() {
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState<any>(null);
  const [loginMode, setLoginMode] = useState("guest");
  
  const [donationType, setDonationType] = useState<"none" | "roundup" | "custom">("none");
  const [customDonation, setCustomDonation] = useState<string>("");

  const lookupForm = useForm<z.infer<typeof lookupSchema>>({
    resolver: zodResolver(lookupSchema),
    defaultValues: { accountNumber: "", zipCode: "" },
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { amount: "124.50", cardNumber: "", expiry: "", cvc: "" },
  });

  const onLookupSubmit = (values: z.infer<typeof lookupSchema>) => {
    simulateAccountFetch();
  };

  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    simulateAccountFetch();
  };

  const simulateAccountFetch = () => {
    // Mock lookup
    setTimeout(() => {
      setAccountData({
        name: "Jane Doe",
        address: "123 Maple Street, Newark, NJ 07102",
        balance: 124.50,
        dueDate: "Oct 24, 2025"
      });
      setStep(2);
    }, 800);
  };

  const onPaymentSubmit = (values: z.infer<typeof paymentSchema>) => {
    // Mock processing
    setTimeout(() => {
      setStep(3);
    }, 1000);
  };

  const watchedAmount = paymentForm.watch('amount');
  const baseAmount = parseFloat(watchedAmount) || 0;
  const roundUpAmount = Math.ceil(baseAmount) - baseAmount > 0 ? Math.ceil(baseAmount) - baseAmount : 1;
  const customAmount = parseFloat(customDonation) || 0;
  const donationValue = donationType === "roundup" ? roundUpAmount : (donationType === "custom" ? customAmount : 0);
  const totalPayment = baseAmount + donationValue;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 py-14 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-orange))] text-sm font-semibold mb-4" data-testid="badge-pay-bill">
            <CreditCard className="w-3.5 h-3.5" />
            Quick & Secure
          </span>
          <h1 className="text-4xl font-bold text-white mb-3" data-testid="heading-pay-bill">Pay Your Bill</h1>
          <p className="text-lg text-white/70 max-w-2xl">Securely pay your PSE&G bill online. Guest checkout available — no login required.</p>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-12 max-w-2xl px-4">
        <div className="flex justify-between items-center mb-8 px-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-10 h-10 flex items-center justify-center font-bold transition-colors ${step >= s ? 'bg-[hsl(var(--brand-orange))] text-white' : 'bg-muted text-muted-foreground'}`}>
                {s === 3 ? <CheckCircle className="w-6 h-6" /> : s}
              </div>
              <span className="text-xs mt-2 font-medium text-muted-foreground">
                {s === 1 ? "Identify" : s === 2 ? "Payment" : "Confirmation"}
              </span>
            </div>
          ))}
        </div>

        <Card className="border-border/50 shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                  <CardTitle>Find Your Account</CardTitle>
                  <CardDescription>Log in for saved methods or continue as a guest.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  
                  <Tabs defaultValue="guest" onValueChange={setLoginMode} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="guest">Guest Pay</TabsTrigger>
                      <TabsTrigger value="login">Log In</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="guest">
                      <Form {...lookupForm}>
                        <form onSubmit={lookupForm.handleSubmit(onLookupSubmit)} className="space-y-4">
                          <FormField
                            control={lookupForm.control}
                            name="accountNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 1234567890" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={lookupForm.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ZIP Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 07102" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full mt-4 bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white" disabled={lookupForm.formState.isSubmitting} data-testid="button-find-bill">
                            {lookupForm.formState.isSubmitting ? "Searching..." : "Find My Bill"}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>

                    <TabsContent value="login">
                      <Form {...loginForm}>
                         <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                          <FormField
                            control={loginForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Username / Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                           <Button type="submit" className="w-full mt-4 gap-2" disabled={loginForm.formState.isSubmitting}>
                            <LogIn className="w-4 h-4" />
                            {loginForm.formState.isSubmitting ? "Logging In..." : "Log In & Pay"}
                          </Button>
                          <div className="text-center">
                            <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                          </div>
                         </form>
                      </Form>
                    </TabsContent>
                  </Tabs>

                </CardContent>
              </motion.div>
            )}

            {step === 2 && accountData && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Payment Details</CardTitle>
                      <CardDescription>Review account and enter payment info.</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-muted-foreground">
                      Change Account
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-secondary/50 p-4 rounded-none border mb-6 text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Account Name:</span>
                      <span className="font-medium">{accountData.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Service Address:</span>
                      <span className="font-medium text-right">{accountData.address}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t mt-2">
                      <span className="font-bold text-primary">Current Balance:</span>
                      <span className="font-bold text-xl text-primary">${accountData.balance.toFixed(2)}</span>
                    </div>
                  </div>

                  <Form {...paymentForm}>
                    <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                      <FormField
                        control={paymentForm.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Amount ($)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* NJ Shares Donation Section */}
                      <div className="bg-[hsl(var(--brand-orange))]/5 border border-[hsl(var(--brand-orange))]/20 p-4 mt-6 mb-6">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 bg-[hsl(var(--brand-orange))]/10 p-1.5 text-[hsl(var(--brand-orange))] shrink-0">
                            <Heart className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-orange-900 text-sm mb-1">Help a neighbor in need with NJ SHARES</h4>
                            <p className="text-xs text-orange-800/80 mb-4 leading-relaxed">
                              Consider an optional, tax-deductible donation to help New Jersey families facing financial hardship keep their utilities on.
                            </p>
                            
                            <div className="space-y-4">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="roundup" 
                                    checked={donationType === "roundup"}
                                    onCheckedChange={(checked) => setDonationType(checked ? "roundup" : "none")}
                                  />
                                  <Label htmlFor="roundup" className="text-sm cursor-pointer font-normal">
                                    Round up my payment to the nearest dollar (+${roundUpAmount.toFixed(2)})
                                  </Label>
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                     id="custom-donation"
                                     checked={donationType === "custom"}
                                     onCheckedChange={(checked) => setDonationType(checked ? "custom" : "none")}
                                  />
                                  <Label htmlFor="custom-donation" className="text-sm cursor-pointer font-normal">
                                    Make a custom donation
                                  </Label>
                                </div>
                                
                                {donationType === "custom" && (
                                  <div className="pl-6 pt-1">
                                    <div className="relative w-32">
                                      <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">$</span>
                                      <Input 
                                        className="pl-7 h-9 text-sm bg-card" 
                                        placeholder="0.00" 
                                        value={customDonation}
                                        onChange={(e) => setCustomDonation(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={paymentForm.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Card Number</FormLabel>
                              <div className="relative">
                                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-9" placeholder="0000 0000 0000 0000" {...field} />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={paymentForm.control}
                          name="expiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry (MM/YY)</FormLabel>
                              <FormControl>
                                <Input placeholder="12/26" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={paymentForm.control}
                          name="cvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                        <Button type="submit" className="flex-[2] bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white" disabled={paymentForm.formState.isSubmitting} data-testid="button-submit-payment">
                          {paymentForm.formState.isSubmitting ? "Processing..." : `Pay $${totalPayment.toFixed(2)}`}
                        </Button>
                      </div>
                      <div className="text-center mt-4">
                         <Link href="/payment-arrangement">
                           <a className="text-sm text-primary hover:underline">Trouble paying? Set up an arrangement</a>
                         </Link>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  Your payment of <span className="font-semibold text-foreground">${totalPayment.toFixed(2)}</span> has been processed. A confirmation email has been sent to the address on file.
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => window.location.href = '/'}>Return Home</Button>
                  <Button>View Receipt</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
