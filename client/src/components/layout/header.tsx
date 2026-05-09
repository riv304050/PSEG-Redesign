import { Link, useLocation } from "wouter";
import { Menu, X, User, Search, ChevronDown, CreditCard, Zap, ShieldCheck, Leaf, Building2, HelpCircle, Home, FileText, AlertTriangle, Lightbulb, Phone, ArrowRight, LogOut, Wrench, Heart, BarChart3, Gauge, Shuffle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
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
    title: "My Home",
    sections: [
      {
        heading: "My Account",
        items: [
          { title: "View Bill", href: "/account/bill", description: "See current balance.", icon: FileText },
          { title: "Usage History", href: "/account/usage", description: "Track your consumption.", icon: BarChart3 },
          { title: "Update Profile", href: "/account/profile", description: "Manage contact info.", icon: User },
          { title: "Start / Stop Service", href: "/start-stop-service", description: "Move, start, or stop service.", icon: Zap },
        ]
      },
      {
        heading: "Worry Free Coverage",
        items: [
          { title: "My Coverage Plan", href: "https://worryfree.pseg.com/how-worryfree-works", description: "Protect your home appliances & systems.", icon: Heart, external: true },
          { title: "Schedule Service Appointment", href: "https://worryfree.pseg.com/how-worryfree-works", description: "Book a repair or maintenance visit.", icon: Wrench, external: true },
        ]
      },
      {
        heading: "Energy Efficiency",
        items: [
          { title: "My Energy Efficiency Programs", href: "/energy", description: "View your enrolled programs & savings.", icon: Leaf },
        ]
      },
      {
        heading: "Smart Meters & Rates",
        items: [
          { title: "Smart Meters & Time of Use Rates", href: "/account/smart-meter", description: "Understand your smart meter & rate options.", icon: Gauge },
          { title: "Energy Choice & Third Party Supply", href: "https://nj.myaccount.pseg.com/myservicepublic/energychoiceandthirdpartysuppliers", description: "Compare suppliers and choose your energy.", icon: Shuffle, external: true },
        ]
      },
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
      { title: "Payment Assistance", href: "/payment-arrangement", icon: HelpCircle },
      { title: "Billing Options", href: "/payments/options", icon: FileText },
      { title: "Understand Your Bill", href: "/payments/explain", icon: Lightbulb },
    ]
  },
  savings: {
    title: "Energy & Savings",
    items: [
      { title: "My Energy Plan", href: "/energy", description: "All programs, personalized." },
      { title: "Free Home Checkup", href: "/energy/home-assessment", description: "Free · 1 hour · Products included." },
      { title: "Rebates & Incentives", href: "/energy/rebates", description: "Up to $900 back." },
      { title: "Appliance Recycling", href: "/energy/recycling", description: "Free pickup + bill credit." },
      { title: "Demand Response", href: "/energy/demand-response", description: "Earn credits automatically." },
      { title: "Energy Marketplace", href: "https://marketplace.pseg.com/", description: "Shop smart products." },
    ]
  }
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-primary/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 mr-8 group">
          <div className="w-10 h-10 bg-white rounded-none flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-md">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">PSE&G</span>
        </Link>

        {/* Desktop Mega Menu */}
        <div className="hidden lg:flex items-center gap-1 flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              
              {/* My Home Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-base font-medium text-white/80 hover:text-white">My Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex w-[720px]">
                    {/* Featured card */}
                    <div className="w-52 shrink-0 p-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/80 to-primary p-5 no-underline outline-none focus:shadow-md"
                          href="/dashboard"
                        >
                          <Home className="h-6 w-6 text-white mb-2" />
                          <div className="mb-1 mt-2 text-base font-semibold text-white">
                            My Home
                          </div>
                          <p className="text-xs leading-tight text-white/80">
                            Manage your service, coverage, and energy all in one place.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </div>

                    {/* Sections */}
                    <div className="flex-1 grid grid-cols-2 gap-x-2 p-4">
                      {megaMenuData.account.sections.map((section) => (
                        <div key={section.heading} className="mb-4">
                          <p className="px-2 mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{section.heading}</p>
                          {section.items.map((item) => (
                            <NavigationMenuLink asChild key={item.title}>
                              <a
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                className="flex items-start gap-2.5 rounded-md p-2 hover:bg-accent transition-colors group"
                              >
                                <div className="mt-0.5 p-1.5 rounded bg-primary/8 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                  <item.icon className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium leading-none">{item.title}</div>
                                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.description}</p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Outages Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-base font-medium text-white/80 hover:text-white">Outages</NavigationMenuTrigger>
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
                <NavigationMenuTrigger className="bg-transparent text-base font-medium text-white/80 hover:text-white">Payments</NavigationMenuTrigger>
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
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-base font-medium text-white/80 hover:text-white")}>
                    Safety
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
               {/* Savings Dropdown */}
               <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-base font-medium text-white/80 hover:text-white">Savings</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[500px]">
                    <NavigationMenuLink asChild>
                      <a
                        href="/energy"
                        className="flex items-center gap-4 p-4 mb-3 bg-gradient-to-r from-green-600 to-emerald-700 no-underline outline-none hover:opacity-95 transition-opacity"
                      >
                        <Leaf className="h-6 w-6 text-white shrink-0" />
                        <div>
                          <div className="text-base font-bold text-white">My Energy Plan</div>
                          <p className="text-sm text-white/80">All programs in one place — personalized for your home.</p>
                        </div>
                      </a>
                    </NavigationMenuLink>
                    <ul className="grid grid-cols-2 gap-1">
                      {megaMenuData.savings.items.slice(1).map((item) => (
                        <ListItem key={item.title} href={item.href} title={item.title}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/business">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-base font-medium text-white/80 hover:text-white")}>
                    Business
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" className="gap-2 text-white/90 hover:text-white hover:bg-white/10 font-medium">
                  <User className="h-4 w-4" />
                  {user.firstName}
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="border-white/30 text-white hover:bg-white hover:text-primary" onClick={async () => { await logout(); setLocation("/"); }}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="hidden sm:flex gap-2 border-white/40 text-white hover:bg-white hover:text-primary transition-all">
                <User className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                   <Link href="/login" className="w-full">
                     <Button className="w-full gap-2">
                      <User className="h-4 w-4" />
                      Sign In / Register
                    </Button>
                   </Link>
                </div>
                
                <nav className="flex flex-col gap-2">
                  <MobileLink href="/dashboard" setIsOpen={setIsOpen}>My Home</MobileLink>
                  <MobileLink href="/report-outage" setIsOpen={setIsOpen}>Outages</MobileLink>
                  <MobileLink href="/pay-bill" setIsOpen={setIsOpen}>Payments</MobileLink>
                  <MobileLink href="/safety" setIsOpen={setIsOpen}>Safety</MobileLink>
                  <MobileLink href="/energy" setIsOpen={setIsOpen}>Energy & Savings</MobileLink>
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
