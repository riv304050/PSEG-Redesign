import { Link, useLocation } from "wouter";
import { Menu, X, User, Search, ChevronDown, CreditCard, Zap, ShieldCheck, Leaf, Building2, HelpCircle, Home, FileText, AlertTriangle, Lightbulb, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const megaMenuData = {
  account: {
    title: "Account",
    items: [
      { title: "Log In / Register", href: "/account", description: "Access your dashboard." },
      { title: "View Bill", href: "/account/bill", description: "See current balance." },
      { title: "Update Profile", href: "/account/profile", description: "Manage contact info." },
      { title: "Usage History", href: "/account/usage", description: "Track your consumption." },
    ]
  },
  outages: {
    title: "Outages",
    featured: {
      title: "Outage Center",
      description: "Report an issue, view the outage map, or check restoration status.",
      href: "/report-outage",
      image: "bg-amber-50"
    },
    items: [
      { title: "Report Outage", href: "/report-outage", icon: Zap },
      { title: "View Outage Map", href: "/outages/map", icon: Home },
      { title: "Storm Safety", href: "/safety", icon: ShieldCheck },
      { title: "Get Alerts", href: "/outages/alerts", icon: Phone },
    ]
  },
  payments: {
    title: "Payments",
    featured: {
      title: "Pay Your Bill",
      description: "Quick, secure payment options without logging in.",
      href: "/pay-bill",
      image: "bg-blue-50"
    },
    items: [
      { title: "Make a Payment", href: "/pay-bill", icon: CreditCard },
      { title: "Payment Assistance", href: "/payments/assistance", icon: HelpCircle },
      { title: "Billing Options", href: "/payments/options", icon: FileText },
      { title: "Understand Your Bill", href: "/payments/explain", icon: Lightbulb },
    ]
  },
  savings: {
    title: "Energy & Savings",
    items: [
      { title: "Home Energy Assessment", href: "/savings", description: "Personalized audit." },
      { title: "Rebates & Discounts", href: "/savings/rebates", description: "Get money back." },
      { title: "Marketplace", href: "/savings/marketplace", description: "Shop efficiency." },
      { title: "Energy Tips", href: "/savings/tips", description: "Lower your usage." },
    ]
  }
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 mr-8">
          <img src="/attached_assets/logo.svg" alt="PSE&G Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Mega Menu */}
        <div className="hidden lg:flex items-center gap-1 flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              
              {/* Account Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-base font-medium text-foreground/80 hover:text-primary">Account</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/80 to-primary p-6 no-underline outline-none focus:shadow-md"
                          href="/account"
                        >
                          <User className="h-6 w-6 text-white mb-2" />
                          <div className="mb-2 mt-2 text-lg font-medium text-white">
                            My Account
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Manage your service, pay bills, and track usage all in one place.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {megaMenuData.account.items.map((item) => (
                      <ListItem key={item.title} href={item.href} title={item.title}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Outages Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-base font-medium text-foreground/80 hover:text-primary">Outages</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {megaMenuData.outages.items.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                           <a href={item.href} className="flex select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group items-center gap-3">
                             <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                               <item.icon className="h-4 w-4" />
                             </div>
                             <div>
                               <div className="text-sm font-medium leading-none">{item.title}</div>
                             </div>
                           </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="col-span-2 mt-2">
                       <div className="bg-amber-50 p-4 rounded-lg flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-amber-900 text-sm">Check Outage Status</h4>
                            <p className="text-amber-700 text-xs mt-1">See updates for your area instantly.</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-amber-200 text-amber-900 hover:bg-amber-100">Check Now</Button>
                       </div>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Payments Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-base font-medium text-foreground/80 hover:text-primary">Payments</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {megaMenuData.payments.items.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                           <a href={item.href} className="flex select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group items-center gap-3">
                             <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                               <item.icon className="h-4 w-4" />
                             </div>
                             <div>
                               <div className="text-sm font-medium leading-none">{item.title}</div>
                             </div>
                           </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                     <li className="col-span-2 mt-2">
                       <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-blue-900 text-sm">Need help paying?</h4>
                            <p className="text-blue-700 text-xs mt-1">Explore our assistance programs.</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-blue-200 text-blue-900 hover:bg-blue-100">Learn More</Button>
                       </div>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/safety">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-base font-medium text-foreground/80 hover:text-primary")}>
                    Safety
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
               {/* Savings Dropdown */}
               <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-base font-medium text-foreground/80 hover:text-primary">Savings</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-600 to-green-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/savings"
                        >
                          <Leaf className="h-6 w-6 text-white mb-2" />
                          <div className="mb-2 mt-2 text-lg font-medium text-white">
                            Go Green
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Discover rebates and tips to save energy and money.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {megaMenuData.savings.items.map((item) => (
                      <ListItem key={item.title} href={item.href} title={item.title}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/business">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-base font-medium text-foreground/80 hover:text-primary")}>
                    Business
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted/50">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Button variant="outline" className="hidden sm:flex gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
            <User className="h-4 w-4" />
            Sign In
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                   <Button className="w-full gap-2">
                    <User className="h-4 w-4" />
                    Sign In / Register
                  </Button>
                </div>
                
                <nav className="flex flex-col gap-2">
                  <MobileLink href="/account" setIsOpen={setIsOpen}>Account</MobileLink>
                  <MobileLink href="/report-outage" setIsOpen={setIsOpen}>Outages</MobileLink>
                  <MobileLink href="/pay-bill" setIsOpen={setIsOpen}>Payments</MobileLink>
                  <MobileLink href="/safety" setIsOpen={setIsOpen}>Safety</MobileLink>
                  <MobileLink href="/savings" setIsOpen={setIsOpen}>Energy & Savings</MobileLink>
                  <MobileLink href="/business" setIsOpen={setIsOpen}>Business</MobileLink>
                  <MobileLink href="/help" setIsOpen={setIsOpen}>Help & Contact</MobileLink>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = ({ className, title, children, href, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

const MobileLink = ({ href, children, setIsOpen }: any) => {
  const [location] = useLocation();
  const isActive = location === href;
  
  return (
    <Link href={href}>
      <a
        className={cn(
          "flex items-center justify-between text-lg font-medium py-3 px-4 rounded-md transition-colors hover:bg-muted",
          isActive ? "bg-primary/5 text-primary" : "text-foreground"
        )}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </a>
    </Link>
  );
}
