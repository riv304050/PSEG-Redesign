import { motion } from "framer-motion";
import { Receipt, BoltIcon, ArrowRightLeft, HandCoins, ShieldAlert, Headset } from "lucide-react";
import { Link } from "wouter";

export function ActionTiles() {
  const actions = [
    {
      icon: Receipt,
      label: "Pay My Bill",
      description: "Secure payment",
      href: "/pay-bill",
    },
    {
      icon: BoltIcon,
      label: "Report Outage",
      description: "Status & reporting",
      href: "/report-outage",
    },
    {
      icon: ArrowRightLeft,
      label: "Start/Stop Service",
      description: "Moving center",
      href: "/start-stop-service",
    },
    {
      icon: HandCoins,
      label: "Bill Assistance",
      description: "Get help paying",
      href: "/bill-assistance",
    },
    {
      icon: ShieldAlert,
      label: "Emergencies",
      description: "Gas & wire safety",
      href: "/report-outage",
    },
    {
      icon: Headset,
      label: "Support Center",
      description: "24/7 Service",
      href: "/support-center",
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 -mt-16 relative z-20 px-4">
      <div className="container mx-auto">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-border/50 bg-card shadow-xl"
        >
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <a className="block group h-full border-r border-b border-border/50 last:border-r-0 md:nth-3:border-r-0 lg:nth-3:border-r lg:last:border-r-0 hover:z-10 relative">
                <div className="h-full bg-card transition-all duration-300 hover:shadow-lg p-6 flex flex-col items-center text-center justify-center group-hover:bg-secondary/50">
                    <div className="mb-4 p-3 text-foreground/70 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                      <action.icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm md:text-base mb-1 transition-colors leading-tight">
                      {action.label}
                    </h3>
                    <p className="text-xs text-muted-foreground/80 font-medium">{action.description}</p>
                    
                    <div className="w-8 h-0.5 bg-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
