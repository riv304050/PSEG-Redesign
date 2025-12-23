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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pay-bill" component={PayBill} />
      <Route path="/report-outage" component={ReportOutage} />
      <Route path="/safety" component={Safety} />
      <Route path="/savings" component={Savings} />
      <Route path="/business" component={Business} />
      {/* Fallback routes for demo links */}
      <Route path="/account" component={Home} /> 
      <Route path="/outages" component={ReportOutage} />
      <Route path="/payments" component={PayBill} />
      <Route path="/help" component={Home} />
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
