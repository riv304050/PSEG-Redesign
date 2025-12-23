import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AlertBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-amber-50 border-b border-amber-200"
      >
        <div className="container mx-auto py-3 px-4 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-sm text-amber-900">
              <span className="font-bold">Weather Alert:</span> Heavy storms expected in the region. Please report any outages immediately.
              <a href="#" className="underline ml-2 hover:text-amber-700 font-medium">View Outage Map</a>
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-amber-500 hover:text-amber-700 transition-colors"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Dismiss</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
