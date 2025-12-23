import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CreditCard, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const lookupSchema = z.object({
  accountNumber: z.string().min(10, "Account number must be at least 10 digits").max(20),
  zipCode: z.string().min(5, "ZIP code must be 5 digits").max(5),
});

const paymentSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiry: z.string().min(5, "Expiry date required (MM/YY)"),
  cvc: z.string().min(3, "CVC required"),
});

export default function PayBill() {
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState<any>(null);

  const lookupForm = useForm<z.infer<typeof lookupSchema>>({
    resolver: zodResolver(lookupSchema),
    defaultValues: { accountNumber: "", zipCode: "" },
  });

  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { amount: "124.50", cardNumber: "", expiry: "", cvc: "" },
  });

  const onLookupSubmit = (values: z.infer<typeof lookupSchema>) => {
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto py-12 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Pay Your Bill</h1>
          <p className="text-muted-foreground">Securely pay your PSE&G bill online without logging in.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 px-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                {s === 3 ? <CheckCircle className="w-6 h-6" /> : s}
              </div>
              <span className="text-xs mt-2 font-medium text-muted-foreground">
                {s === 1 ? "Find Account" : s === 2 ? "Payment" : "Confirmation"}
              </span>
            </div>
          ))}
          <div className="absolute left-0 w-full top-5 -z-10 px-12">
             {/* Progress line connector (visual only for mockup simplicity) */}
          </div>
        </div>

        <Card className="border-none shadow-lg overflow-hidden">
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
                  <CardDescription>Enter your account number and ZIP code to locate your bill.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
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
                      <Button type="submit" className="w-full mt-4" disabled={lookupForm.formState.isSubmitting}>
                        {lookupForm.formState.isSubmitting ? "Searching..." : "Find My Bill"}
                      </Button>
                    </form>
                  </Form>
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
                  <div className="bg-slate-50 p-4 rounded-lg border mb-6 text-sm">
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
                        <Button type="submit" className="flex-[2]" disabled={paymentForm.formState.isSubmitting}>
                          {paymentForm.formState.isSubmitting ? "Processing..." : `Pay $${paymentForm.getValues('amount')}`}
                        </Button>
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
                  Your payment of <span className="font-semibold text-foreground">${paymentForm.getValues('amount')}</span> has been processed. A confirmation email has been sent to the address on file.
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
