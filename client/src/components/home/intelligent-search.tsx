import { useState } from "react";
import { Search, ArrowRight, Mic, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function IntelligentSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [, setLocation] = useLocation();

  const suggestions = [
    { text: "I need help paying my bill", href: "/bill-assistance" },
    { text: "My power went out", href: "/report-outage" },
    { text: "Move my service", href: "/start-stop-service" },
    { text: "Ways to lower my bill", href: "/savings" }
  ];

  const handleSuggestionClick = (href: string) => {
    setLocation(href);
  };

  const handleSearch = () => {
     if (query.toLowerCase().includes("bill") || query.toLowerCase().includes("pay")) setLocation("/pay-bill");
     else if (query.toLowerCase().includes("outage") || query.toLowerCase().includes("power")) setLocation("/report-outage");
     else if (query.toLowerCase().includes("move") || query.toLowerCase().includes("service")) setLocation("/start-stop-service");
     else if (query.toLowerCase().includes("save") || query.toLowerCase().includes("lower")) setLocation("/savings");
     else if (query.toLowerCase().includes("help") || query.toLowerCase().includes("support")) setLocation("/support-center");
     else setLocation("/support-center");
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="bg-primary">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 px-4 py-16 lg:py-24 items-center relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[hsl(var(--brand-orange))]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[hsl(var(--brand-orange))]/20 border border-[hsl(var(--brand-orange))]/30 text-[hsl(var(--brand-orange))] text-sm font-semibold mb-5 backdrop-blur-md" data-testid="badge-hero">
                <TrendingDown className="w-3.5 h-3.5" />
                We're working to keep your costs down
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-5 leading-[1.1]"
            >
              Your energy.<br />Your budget.<br />
              <span className="text-[hsl(var(--brand-orange))]">Our commitment.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/80 mb-10 max-w-lg leading-relaxed"
            >
              We know costs are rising. That's why we're investing in programs, rebates, and payment options to help you manage your energy bills.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`relative bg-white/95 backdrop-blur-sm shadow-2xl transition-all duration-300 ${isFocused ? 'ring-4 ring-[hsl(var(--brand-orange))]/30' : ''}`}
            >
              <div className="flex items-center px-4 h-14">
                <Search className="w-5 h-5 text-primary/40 mr-3" />
                <input
                  type="text"
                  placeholder="Pay bill, report outage, find assistance..."
                  className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground/50 h-full"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  data-testid="input-hero-search"
                />
                {query ? (
                  <Button size="sm" className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-white" onClick={handleSearch} data-testid="button-hero-search">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button size="icon" variant="ghost" className="text-primary/40 hover:bg-primary/5 hover:text-primary">
                    <Mic className="w-5 h-5" />
                  </Button>
                )}
              </div>

              <AnimatePresence>
                {isFocused && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-border/30 bg-white overflow-hidden"
                  >
                    <div className="p-2">
                      <p className="text-xs font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">Quick Actions</p>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2.5 text-foreground hover:bg-[hsl(var(--brand-orange))]/5 transition-colors flex items-center group"
                          onMouseDown={() => handleSuggestionClick(suggestion.href)}
                          data-testid={`button-suggestion-${index}`}
                        >
                          <span className="flex-1 text-sm">{suggestion.text}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[hsl(var(--brand-orange))]" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-4 relative z-10"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[hsl(var(--brand-orange))]/20 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-[hsl(var(--brand-orange))]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Average Customer Savings</p>
                  <p className="text-white/60 text-xs">Through our efficiency programs</p>
                </div>
              </div>
              <p className="text-4xl font-bold text-white">$847<span className="text-lg text-white/50 font-normal">/year</span></p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-5 text-center">
                <p className="text-3xl font-bold text-[hsl(var(--brand-orange))]">$250M+</p>
                <p className="text-white/60 text-xs mt-1">In rebates distributed</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-5 text-center">
                <p className="text-3xl font-bold text-white">1.8M</p>
                <p className="text-white/60 text-xs mt-1">Customers served</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
