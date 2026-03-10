import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, MapPin, AlertTriangle, Phone, CheckCircle, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const reportSchema = z.object({
  address: z.string().min(5, "Please enter a valid address"),
  phone: z.string().min(10, "Valid phone number required"),
  issueType: z.enum(["no-power", "part-power", "flickering", "wires-down", "gas-smell"]),
  details: z.string().optional(),
});

export default function ReportOutage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      address: "",
      phone: "",
      issueType: "no-power",
      details: "",
    },
  });

  const onSubmit = (values: z.infer<typeof reportSchema>) => {
    if (values.issueType === "gas-smell" || values.issueType === "wires-down") {
      setIsEmergency(true);
      return;
    }
    // Mock API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-12 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Zap className="h-8 w-8 text-amber-500" />
            Report an Outage
          </h1>
          <p className="text-muted-foreground">Tell us about your power or gas issue so we can help.</p>
        </div>

        {isEmergency ? (
           <Card className="border-red-200 bg-red-50 shadow-lg">
             <CardContent className="pt-6 text-center py-12">
               <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                 <AlertTriangle className="w-10 h-10" />
               </div>
               <h2 className="text-2xl font-bold text-red-700 mb-4">Emergency Detected</h2>
               <p className="text-lg text-red-800 mb-6 max-w-lg mx-auto">
                 For gas leaks or downed wires, please clear the area immediately for your safety.
               </p>
               <div className="bg-card p-6 rounded-none border border-red-200 inline-block">
                 <p className="text-sm text-muted-foreground mb-2">Call our emergency line immediately:</p>
                 <a href="tel:1-800-880-7734" className="text-3xl font-bold text-red-600 hover:underline">1-800-880-PSEG (7734)</a>
                 <p className="text-xs text-muted-foreground mt-2">Or call 911</p>
               </div>
               <div className="mt-8">
                <Button variant="outline" onClick={() => setIsEmergency(false)}>Go Back</Button>
               </div>
             </CardContent>
           </Card>
        ) : isSubmitted ? (
          <Card className="border-green-200 bg-green-50 shadow-lg">
            <CardContent className="pt-6 text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Report Received</h2>
              <p className="text-green-700 mb-8">
                Thank you. We have logged your report for <strong>{form.getValues("address")}</strong>.
              </p>
              
              <div className="bg-card p-6 rounded-none border border-green-200 max-w-lg mx-auto text-left mb-8 shadow-sm">
                <h3 className="font-semibold text-lg border-b pb-3 mb-4">Current Outage Status</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Estimated Restoration</p>
                      <p className="text-xl font-bold text-foreground">Today at 4:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Crew Status</p>
                      <p className="text-lg font-semibold text-foreground">En Route</p>
                      <p className="text-sm text-muted-foreground mt-0.5">Dispatched at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-secondary/50 text-muted-foreground rounded-none shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Suspected Cause</p>
                      <p className="text-lg font-semibold text-foreground">Tree Contact</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Text updates will be sent to {form.getValues("phone") || "your phone"}
                  </p>
                </div>
              </div>

              <Button onClick={() => window.location.href = '/'}>Return Home</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Details</CardTitle>
                  <CardDescription>Please provide accurate information to help our crews.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location of Issue</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-9" placeholder="Enter street address, city, zip" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-9" placeholder="(555) 555-5555" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="issueType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>What is the problem?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid sm:grid-cols-2 gap-4"
                              >
                                {[
                                  { id: "no-power", label: "No Power", icon: Zap },
                                  { id: "part-power", label: "Partial Power", icon: Zap },
                                  { id: "flickering", label: "Lights Flickering", icon: Zap },
                                  { id: "wires-down", label: "Downed Wires", icon: AlertTriangle, className: "text-red-600" },
                                  { id: "gas-smell", label: "Smell Gas", icon: AlertTriangle, className: "text-red-600" },
                                ].map((item) => (
                                  <FormItem key={item.id}>
                                    <FormControl>
                                      <RadioGroupItem value={item.id} className="peer sr-only" />
                                    </FormControl>
                                    <FormLabel className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all ${item.className || ''}`}>
                                      <item.icon className="mb-3 h-6 w-6" />
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="details"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Details (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Did you hear a loud noise? See a fallen tree branch?" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Submitting Report..." : "Submit Report"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-800 text-lg">Safety First</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-900 space-y-3">
                  <p>• Stay at least 30 feet away from downed wires.</p>
                  <p>• Do not touch anything that downed wires are touching.</p>
                  <p>• If you smell gas, leave immediately.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">View Outage Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md relative mb-4 overflow-hidden group cursor-pointer">
                     <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                        <MapPin className="h-8 w-8 text-white drop-shadow-lg" />
                     </div>
                     <img src="https://placehold.co/600x400/e2e8f0/94a3b8?text=Outage+Map+Preview" alt="Map" className="w-full h-full object-cover" />
                  </div>
                  <Button variant="outline" className="w-full">Open Interactive Map</Button>
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
