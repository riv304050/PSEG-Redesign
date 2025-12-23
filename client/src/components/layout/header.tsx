import { Link, useLocation } from "wouter";
import { Menu, X, User, Search, ChevronDown } from "lucide-react";
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

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: "Account", href: "/account", featured: true },
    { label: "Outages", href: "/report-outage" },
    { label: "Payments", href: "/pay-bill" },
    { label: "Safety", href: "/safety" },
    { label: "Energy & Savings", href: "/savings" },
    { label: "Business", href: "/business" },
    { label: "Help & Contact", href: "/help" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <img src="/attached_assets/logo.svg" alt="PSE&G Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav - Using Navigation Menu for a premium feel */}
        <div className="hidden lg:flex items-center gap-1 flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <Link href={item.href}>
                    <a className={cn(
                      navigationMenuTriggerStyle(), 
                      "bg-transparent text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:bg-muted",
                      location === item.href && "text-primary bg-primary/5"
                    )}>
                      {item.label}
                    </a>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Button variant="outline" className="hidden sm:flex gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
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
                
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link key={item.label} href={item.href}>
                      <a
                        className={cn(
                          "flex items-center justify-between text-lg font-medium py-3 px-4 rounded-md transition-colors hover:bg-muted",
                          location === item.href ? "bg-primary/5 text-primary" : "text-foreground"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
