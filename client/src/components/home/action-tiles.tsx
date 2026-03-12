import { motion } from "framer-motion";
import { Receipt, BoltIcon, ArrowRightLeft, HandCoins, ShieldAlert, Headset, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function ActionTiles() {
  const actions = [
    {
      icon: Receipt,
      label: "Pay My Bill",
      description: "Quick & secure payment",
      href: "/pay-bill",
      accent: true,
    },
    {
      icon: BoltIcon,
      label: "Report Outage",
      description: "Status & reporting",
      href: "/report-outage",
      accent: false,
    },
    {
      icon: ArrowRightLeft,
      label: "Start/Stop Service",
      description: "Moving made easy",
      href: "/start-stop-service",
      accent: false,
    },
    {
      icon: HandCoins,
      label: "Bill Assistance",
      description: "Programs & payment help",
      href: "/bill-assistance",
      accent: true,
    },
    {
      icon: ShieldAlert,
      label: "Safety & Emergencies",
      description: "Gas & wire safety",
      href: "/safety",
      accent: false,
    },
    {
      icon: Headset,
      label: "Contact Us",
      description: "We're here to help",
      href: "/support-center",
      accent: false,
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-10 -mt-10 relative z-20 px-4">
      <div className="container mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {actions.map((action, index) => (
            <motion.div key={index} variants={item}>
              <Link href={action.href}>
                <a className="block group h-full" data-testid={`tile-${action.label.replace(/\s+/g, "-").toLowerCase()}`}>
                  <div className={`h-full bg-card border border-border/50 transition-all duration-300 p-5 flex flex-col items-center text-center justify-center hover:shadow-lg hover:-translate-y-1 ${action.accent ? 'hover:border-[hsl(var(--brand-orange))]/50' : 'hover:border-primary/30'}`}>
                    <div className={`mb-3 p-3 transition-all duration-300 ${action.accent ? 'text-[hsl(var(--brand-orange))] bg-[hsl(var(--brand-orange))]/10 group-hover:bg-[hsl(var(--brand-orange))] group-hover:text-white' : 'text-primary/60 bg-primary/5 group-hover:bg-primary group-hover:text-white'}`}>
                      <action.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1 leading-tight">
                      {action.label}
                    </h3>
                    <p className="text-xs text-muted-foreground/70">{action.description}</p>
                    <ArrowRight className={`w-4 h-4 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 ${action.accent ? 'text-[hsl(var(--brand-orange))]' : 'text-primary'}`} />
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
