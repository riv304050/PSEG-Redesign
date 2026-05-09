import { Link, useLocation } from "wouter";
import { Menu, X, User, Search, ChevronDown, CreditCard, Zap, ShieldCheck, Leaf, Building2, HelpCircle, Home, FileText, AlertTriangle, Lightbulb, Phone, ArrowRight, LogOut, Wrench, Heart, BarChart3, Gauge, Shuffle, Flame, Wind, MapPin, Bell } from "lucide-react";
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
    title: "Outages & Gas Safety",
    outageItems: [
      { title: "Report an Outage", href: "/report-outage", icon: Zap, description: "Tell us about a power outage." },
      { title: "View Outage Map", href: "/outages/map", icon: MapPin, description: "See current outages in your area." },
      { title: "Get Alerts", href: "/outages/alerts", icon: Bell, description: "Sign up for restoration updates." },
      { title: "Check Restoration Status", href: "/report-outage", icon: ArrowRight, description: "Track your outage status." },
    ],
    gasItems: [
      { title: "Smell Gas? Act Immediately", href: "/safety#gas", icon: Flame, description: "Leave now, don't use electronics, call 911.", emergency: true },
      { title: "Gas Safety Information", href: "/safety", icon: ShieldCheck, description: "Know the signs of a gas leak." },
      { title: "Carbon Monoxide Safety", href: "/safety#co", icon: Wind, description: "Symptoms, prevention & what to do." },
      { title: "Home Safety Checkup", href: "/safety", icon: Home, description: "Schedule a free safety inspection." },
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

              {/* Outages & Gas Safety Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-base font-medium text-white/80 hover:text-white">Outages & Gas Safety</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[680px]">
                    {/* Gas leak emergency banner */}
                    <a href="/safety#gas" className="flex items-center gap-4 px-5 py-4 bg-red-700 hover:bg-red-800 transition-colors no-underline">
                      <div className="p-2 rounded-full bg-white/20 shrink-0">
                        <Flame className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">Smell Gas? Leave immediately.</div>
                        <p className="text-xs text-red-200 mt-0.5">Don't use lights or electronics. Go outside and call <span className="font-semibold text-white">1-800-880-7734</span> or 911.</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/70 shrink-0" />
                    </a>

                    {/* Two-column section grid */}
                    <div className="grid grid-cols-2 gap-0 p-4">
                      {/* Outages column */}
                      <div className="pr-4 border-r border-border">
                        <p className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Outages</p>
                        {megaMenuData.outages.outageItems.map((item) => (
                          <NavigationMenuLink asChild key={item.title}>
                            <a href={item.href} className="flex items-start gap-2.5 rounded-md p-2 hover:bg-accent transition-colors group">
                              <div className="mt-0.5 p-1.5 rounded bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
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

                      {/* Gas Safety column */}
                      <div className="pl-4">
                        <p className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Gas Safety</p>
                        {megaMenuData.outages.gasItems.map((item) => (
                          <NavigationMenuLink asChild key={item.title}>
                            <a href={item.href} className="flex items-start gap-2.5 rounded-md p-2 hover:bg-accent transition-colors group">
                              <div className={cn(
                                "mt-0.5 p-1.5 rounded transition-colors shrink-0",
                                item.emergency
                                  ? "bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white"
                                  : "bg-orange-100 text-orange-700 group-hover:bg-orange-600 group-hover:text-white"
                              )}>
                                <item.icon className="h-3.5 w-3.5" />
                              </div>
                              <div>
                                <div className={cn("text-sm font-medium leading-none", item.emergency && "text-red-700")}>{item.title}</div>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.description}</p>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
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
                
                <nav className="flex flex-col gap-1">
                  <MobileExpandSection title="My Home" setIsOpen={setIsOpen} subLinks={[
                    { title: "View Bill", href: "/account/bill" },
                    { title: "Start / Stop Service", href: "/start-stop-service" },
                    { title: "My Coverage Plan", href: "https://worryfree.pseg.com/how-worryfree-works", external: true },
                    { title: "Energy Efficiency Programs", href: "/energy" },
                    { title: "Energy Choice & Third Party Supply", href: "https://nj.myaccount.pseg.com/myservicepublic/energychoiceandthirdpartysuppliers", external: true },
                  ]} />
                  <MobileLink href="/report-outage" setIsOpen={setIsOpen}>Outages & Gas Safety</MobileLink>
                  <MobileLink href="/pay-bill" setIsOpen={setIsOpen}>Payments</MobileLink>
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

const MobileExpandSection = ({ title, subLinks, setIsOpen }: { title: string; subLinks: { title: string; href: string; external?: boolean }[]; setIsOpen: (v: boolean) => void }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-lg font-medium py-3 px-4 rounded-md transition-colors hover:bg-muted text-foreground"
      >
        {title}
        <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-200", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="ml-4 mb-1 flex flex-col gap-0.5 border-l-2 border-primary/20 pl-3">
          {subLinks.map((link) =>
            link.external ? (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base py-2 px-3 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            ) : (
              <Link key={link.title} href={link.href}>
                <a
                  className="block text-base py-2 px-3 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </a>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
