import { useState } from "react";
import { Search, ArrowRight, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import generatedImage from "@assets/generated_images/vector_art_of_a_smart_home_with_clean_lines.png";

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
    <div className="relative w-full bg-primary overflow-hidden min-h-[500px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
         <img src={generatedImage} alt="Smart Home Background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/90 to-primary/80" />

      <div className="relative z-10 container max-w-3xl px-4 py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          How can we help today?
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/80 mb-10"
        >
          Ask a question or describe what you need.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`relative bg-white rounded-lg shadow-2xl transition-all duration-300 ${isFocused ? 'ring-4 ring-white/20' : ''}`}
        >
          <div className="flex items-center px-4 h-16">
            <Search className="w-6 h-6 text-primary/50 mr-3" />
            <input
              type="text"
              placeholder="Type something like 'pay my bill' or 'report outage'..."
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
    </div>
  );
}
