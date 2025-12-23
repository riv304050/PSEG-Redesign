import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PayBill from "@/pages/pay-bill";
import ReportOutage from "@/pages/report-outage";
import Safety from "@/pages/safety";
import Savings from "@/pages/savings";
import Business from "@/pages/business";
import StartStopService from "@/pages/start-stop-service";
import BillAssistance from "@/pages/bill-assistance";
import SupportCenter from "@/pages/support-center";
import AuthPage from "@/pages/auth";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import PaymentArrangement from "@/pages/payment-arrangement";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={AuthPage} />
      <Route path="/register" component={AuthPage} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/payment-arrangement" component={PaymentArrangement} />
      <Route path="/account" component={Dashboard} /> {/* Map Account to Dashboard */}
      <Route path="/pay-bill" component={PayBill} />
      <Route path="/report-outage" component={ReportOutage} />
      <Route path="/safety" component={Safety} />
      <Route path="/savings" component={Savings} />
      <Route path="/business" component={Business} />
      <Route path="/start-stop-service" component={StartStopService} />
      <Route path="/bill-assistance" component={BillAssistance} />
      <Route path="/support-center" component={SupportCenter} />
      
      {/* Fallback routes for demo links */}
      <Route path="/account" component={Home} /> 
      <Route path="/outages" component={ReportOutage} />
      <Route path="/payments" component={PayBill} />
      <Route path="/help" component={SupportCenter} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
