import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
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
import EnergyHub from "@/pages/energy-hub";
import EnergyAssessment from "@/pages/energy-assessment";
import EnergyRebates from "@/pages/energy-rebates";
import EnergyRecycling from "@/pages/energy-recycling";
import EnergyDemandResponse from "@/pages/energy-demand-response";
import BusinessEnergyHub from "@/pages/business-energy-hub";
import BusinessDirectInstall from "@/pages/business-direct-install";
import BusinessPrescriptive from "@/pages/business-prescriptive";
import BusinessEngineeredSolutions from "@/pages/business-engineered-solutions";
import BusinessMultifamily from "@/pages/business-multifamily";
import BusinessEnergyManagement from "@/pages/business-energy-management";
import BillHelp from "@/pages/bill-help";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={AuthPage} />
      <Route path="/register" component={AuthPage} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/payment-arrangement" component={PaymentArrangement} />
      <Route path="/account" component={Dashboard} />
      <Route path="/pay-bill" component={PayBill} />
      <Route path="/report-outage" component={ReportOutage} />
      <Route path="/safety" component={Safety} />
      <Route path="/savings" component={Savings} />
      <Route path="/business" component={Business} />
      <Route path="/start-stop-service" component={StartStopService} />
      <Route path="/bill-assistance" component={BillAssistance} />
      <Route path="/bill-help" component={BillHelp} />
      <Route path="/support-center" component={SupportCenter} />
      <Route path="/outages" component={ReportOutage} />
      <Route path="/payments" component={PayBill} />
      <Route path="/help" component={SupportCenter} />
      {/* Energy Efficiency Programs */}
      <Route path="/energy" component={EnergyHub} />
      {/* Commercial Energy Programs */}
      <Route path="/business/energy" component={BusinessEnergyHub} />
      <Route path="/business/direct-install" component={BusinessDirectInstall} />
      <Route path="/business/prescriptive" component={BusinessPrescriptive} />
      <Route path="/business/engineered-solutions" component={BusinessEngineeredSolutions} />
      <Route path="/business/multifamily" component={BusinessMultifamily} />
      <Route path="/business/energy-management" component={BusinessEnergyManagement} />
      <Route path="/energy/home-assessment" component={EnergyAssessment} />
      <Route path="/energy/rebates" component={EnergyRebates} />
      <Route path="/energy/recycling" component={EnergyRecycling} />
      <Route path="/energy/demand-response" component={EnergyDemandResponse} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
