import { motion } from "framer-motion";
import { CreditCard, Zap, Home, FileQuestion, LifeBuoy, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export function ActionTiles() {
  const actions = [
    {
      icon: CreditCard,
      label: "Pay My Bill",
      description: "Secure payment",
      href: "/pay-bill",
      borderColor: "group-hover:border-blue-200",
      iconColor: "text-blue-600",
      gradient: "from-blue-50 to-white"
    },
    {
      icon: Zap,
      label: "Report Outage",
      description: "Status & reporting",
      href: "/report-outage",
      borderColor: "group-hover:border-amber-200",
      iconColor: "text-amber-600",
      gradient: "from-amber-50 to-white"
    },
    {
      icon: Home,
      label: "Start/Stop Service",
      description: "Moving center",
      href: "#",
      borderColor: "group-hover:border-green-200",
      iconColor: "text-green-600",
      gradient: "from-green-50 to-white"
    },
    {
      icon: FileQuestion,
      label: "Bill Assistance",
      description: "Get help paying",
      href: "#",
      borderColor: "group-hover:border-purple-200",
      iconColor: "text-purple-600",
      gradient: "from-purple-50 to-white"
    },
    {
      icon: AlertTriangle,
      label: "Emergencies",
      description: "Gas & wire safety",
      href: "/report-outage",
      borderColor: "group-hover:border-red-200",
      iconColor: "text-red-600",
      gradient: "from-red-50 to-white"
    },
    {
      icon: LifeBuoy,
      label: "Support Center",
      description: "24/7 Service",
      href: "#",
      borderColor: "group-hover:border-sky-200",
      iconColor: "text-sky-600",
      gradient: "from-sky-50 to-white"
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <a className="block group h-full">
                <Card className={`h-full border border-border/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden ${action.borderColor} group-hover:border`}>
                  <CardContent className="p-0 h-full">
                    <div className={`h-1.5 w-full bg-gradient-to-r ${action.gradient.replace('to-white', '')} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="p-6 flex flex-col items-center text-center h-full justify-center">
                      <div className={`mb-4 p-3 rounded-2xl bg-slate-50 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 ${action.iconColor}`}>
                        <action.icon className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm md:text-base mb-1 group-hover:text-primary transition-colors leading-tight">
                        {action.label}
                      </h3>
                      <p className="text-xs text-muted-foreground/80 font-medium">{action.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
