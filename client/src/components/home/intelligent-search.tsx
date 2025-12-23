import { useState } from "react";
import { Search, ArrowRight, Mic, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import comfortImage from "@assets/generated_images/cozy_warm_living_room_interior.png";

export function IntelligentSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = [
    "My power went out",
    "I can't pay my bill",
    "Move service next week",
    "Is this text from PSE&G a scam?"
  ];

  return (
    <div className="relative w-full bg-primary overflow-hidden min-h-[550px] flex items-center justify-center">
      {/* Background Image with Warm Overlay for Comfort */}
      <div className="absolute inset-0 z-0">
         <motion.img 
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
           src={comfortImage} 
           alt="Comfortable Home" 
           className="w-full h-full object-cover" 
         />
      </div>
      {/* Gradient overlay - Darker at bottom for text readability, but letting warmth shine through */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />

      <div className="relative z-10 container grid lg:grid-cols-2 gap-12 px-4 py-20 items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-100 text-sm font-medium mb-4 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Reliable comfort for your home
             </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            How can we <br/>help today?
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/90 mb-10 max-w-lg leading-relaxed"
          >
            From reporting an outage to finding payment assistance, we're here to keep your life comfortable and connected.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`relative bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl transition-all duration-300 ${isFocused ? 'ring-4 ring-amber-400/30' : ''}`}
          >
            <div className="flex items-center px-4 h-16">
              <Search className="w-6 h-6 text-primary/50 mr-3" />
              <input
                type="text"
                placeholder="Type 'pay bill', 'report outage', or ask a question..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/60 h-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
              {query && (
                <Button size="icon" variant="ghost" className="text-primary hover:bg-primary/10">
                  <ArrowRight className="w-5 h-5" />
                </Button>
              )}
              {!query && (
                <Button size="icon" variant="ghost" className="text-primary/50 hover:bg-primary/10 hover:text-primary">
                  <Mic className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Intelligent Suggestions Dropdown */}
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-border/50 bg-white rounded-b-lg overflow-hidden"
                >
                  <div className="p-2">
                    <p className="text-xs font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">Suggested Actions</p>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-3 text-foreground hover:bg-muted rounded-md transition-colors flex items-center group"
                        onClick={() => setQuery(suggestion)}
                      >
                        <span className="flex-1">{suggestion}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Right side empty space for the image to show through */}
        <div className="hidden lg:block"></div>
      </div>
    </div>
  );
}
