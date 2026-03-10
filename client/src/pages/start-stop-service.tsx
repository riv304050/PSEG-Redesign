import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const serviceSchema = z.object({
  serviceType: z.enum(["start", "stop", "move"]),
  address: z.string().min(5, "Valid address required"),
  date: z.string().min(1, "Date required"),
});

export default function StartStopService() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceType: "start",
      address: "",
      date: "",
    },
  });

  const onSubmit = (values: z.infer<typeof serviceSchema>) => {
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-12 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Start, Stop, or Move Service</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Moving to a new home? We're here to make your transition as smooth as possible. 
            Select an option below to get started.
          </p>
        </div>

        {submitted ? (
          <Card className="max-w-md mx-auto text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Request Received!</h2>
              <p className="text-muted-foreground mb-6">
                We've started processing your request. You will receive a confirmation email shortly with next steps.
              </p>
              <Button onClick={() => window.location.href = '/'}>Return Home</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Service Request</CardTitle>
                  <CardDescription>Tell us what you need to do.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="guest" className="w-full mb-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="guest">Guest Request</TabsTrigger>
                      <TabsTrigger value="login">Log In (Faster)</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <div className="bg-primary/5 p-6 rounded-lg text-center border border-primary/10 mt-4">
                        <p className="mb-4 text-sm">Log in to pre-fill your address and account details.</p>
                        <Button>Log In to Start</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="guest">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                          <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>I want to...</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-3 gap-4"
                                  >
                                    {[
                                      { id: "start", label: "Start Service" },
                                      { id: "stop", label: "Stop Service" },
                                      { id: "move", label: "Move Service" },
                                    ].map((item) => (
                                      <FormItem key={item.id}>
                                        <FormControl>
                                          <RadioGroupItem value={item.id} className="peer sr-only" />
                                        </FormControl>
                                        <FormLabel className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer h-24 text-center font-medium transition-all">
                                          {item.label}
                                        </FormLabel>
                                      </FormItem>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-9" placeholder="123 Main St, Apt 4B" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date Required</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-9" type="date" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Processing..." : "Continue"}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-900 text-lg">New Customer?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-800">
                  <p className="mb-4">Welcome to PSE&G! You'll need:</p>
                  <ul className="list-disc list-inside space-y-1 ml-1 mb-4">
                    <li>Social Security Number</li>
                    <li>Lease or Deed</li>
                    <li>Valid ID</li>
                  </ul>
                  <p>Processing usually takes 24-48 hours.</p>
                </CardContent>
              </Card>
              
               <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our moving specialists are available Mon-Fri, 8am-5pm.
                  </p>
                  <Button variant="outline" className="w-full">Call 1-800-436-PSEG</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
