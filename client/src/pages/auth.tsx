import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Mail, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Validation Schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  accountNumber: z.string().optional(),
});

const mfaSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

export default function AuthPage() {
  const [location, setLocation] = useLocation();
  const [view, setView] = useState<"login" | "register" | "mfa" | "magic-sent">("login");
  const [email, setEmail] = useState("");

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", accountNumber: "" },
  });

  const mfaForm = useForm<z.infer<typeof mfaSchema>>({
    resolver: zodResolver(mfaSchema),
    defaultValues: { code: "" },
  });

  const onLogin = (values: z.infer<typeof loginSchema>) => {
    setEmail(values.email);
    // Mock successful credential check, move to MFA
    setTimeout(() => setView("mfa"), 800);
  };

  const onRegister = (values: z.infer<typeof registerSchema>) => {
    setEmail(values.email);
    // Mock successful registration, move to dashboard or MFA
    setTimeout(() => setLocation("/onboarding"), 1000);
  };

  const onMfaSubmit = (values: z.infer<typeof mfaSchema>) => {
    // Mock verify - go to onboarding flow instead of direct home
    setTimeout(() => setLocation("/onboarding"), 800);
  };

  const sendMagicLink = () => {
    const e = loginForm.getValues("email");
    if (!e) return; // Should show error
    setEmail(e);
    setView("magic-sent");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Visual */}
        <div className="hidden md:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-slate-900 opacity-90 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
            alt="Office background" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 text-white max-w-lg">
            <h2 className="text-4xl font-bold mb-6">Welcome to Your Energy Hub</h2>
            <ul className="space-y-4 text-lg text-white/90">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-brand-orange" />
                <span>Pay bills securely in seconds</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-brand-orange" />
                <span>Track your real-time energy usage</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-brand-orange" />
                <span>Get personalized efficiency tips</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Forms */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md space-y-8">
            <AnimatePresence mode="wait">
              {view === "login" && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Sign In</h1>
                    <p className="text-muted-foreground mt-2">Access your account dashboard</p>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Button variant="outline" className="w-full gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.64 3.4 1.63-3.12 1.88-2.68 5.39.1 6.54-.68 1.98-1.57 3.5-2.15 4.84zm-3.26-17.93c.69 1.63-1.44 3.21-2.75 3.02-1.01-.05-1.92-.92-1.7-2.93.94-.13 1.98.36 2.45.99.7.9.89 1.93 2 1.92z"/>
                      </svg>
                      Apple
                    </Button>
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-slate-50 px-2 text-muted-foreground">Or verify with</span>
                    </div>
                  </div>

                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
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
                            <div className="flex items-center justify-between">
                              <FormLabel>Password</FormLabel>
                              <Button 
                                type="button" 
                                variant="link" 
                                className="px-0 font-normal h-auto text-xs"
                                onClick={sendMagicLink}
                              >
                                Forgot password / Use Magic Link?
                              </Button>
                            </div>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                        {loginForm.formState.isSubmitting ? "Signing In..." : "Sign In"}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 text-center text-sm">
                    Don't have an account?{" "}
                    <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => setView("register")}>
                      Register Now
                    </Button>
                  </div>
                </motion.div>
              )}

              {view === "register" && (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-6">
                    <Button variant="ghost" className="pl-0 gap-2 mb-4" onClick={() => setView("login")}>
                      <ArrowLeft className="w-4 h-4" /> Back to Login
                    </Button>
                    <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
                    <p className="text-muted-foreground mt-2">Manage your home's energy seamlessly.</p>
                  </div>

                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="name@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Create Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Found on your bill" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full mt-4" disabled={registerForm.formState.isSubmitting}>
                        {registerForm.formState.isSubmitting ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              )}

              {view === "mfa" && (
                <motion.div
                  key="mfa"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Verify it's you</h2>
                  <p className="text-muted-foreground mb-8">
                    We sent a 6-digit code to <strong>{email}</strong>. Enter it below to continue.
                  </p>

                  <Form {...mfaForm}>
                    <form onSubmit={mfaForm.handleSubmit(onMfaSubmit)} className="space-y-6">
                      <FormField
                        control={mfaForm.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input 
                                className="text-center text-3xl tracking-widest h-14" 
                                placeholder="000000" 
                                maxLength={6} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={mfaForm.formState.isSubmitting}>
                        {mfaForm.formState.isSubmitting ? "Verifying..." : "Verify & Sign In"}
                      </Button>
                    </form>
                  </Form>
                  
                  <div className="mt-6">
                    <Button variant="link" onClick={() => setView("login")}>Try another method</Button>
                  </div>
                </motion.div>
              )}

              {view === "magic-sent" && (
                <motion.div
                  key="magic"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                  <p className="text-muted-foreground mb-8">
                    We sent a magic sign-in link to <strong>{email}</strong>. Click the link to log in instantly.
                  </p>
                  <Button variant="outline" onClick={() => setView("login")}>Back to Sign In</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
