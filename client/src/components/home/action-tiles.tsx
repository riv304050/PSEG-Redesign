import { motion } from "framer-motion";
import { CreditCard, Zap, Home, FileQuestion, LifeBuoy, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export function ActionTiles() {
  const actions = [
    {
      icon: CreditCard,
      label: "Pay My Bill",
      description: "View balance & make payments",
      href: "/pay-bill",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Zap,
      label: "Report Outage",
      description: "Check status or report issue",
      href: "/report-outage",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      icon: Home,
      label: "Start/Stop Service",
      description: "Moving? Update your service",
      href: "#",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: FileQuestion,
      label: "Help Paying Bill",
      description: "Assistance programs & plans",
      href: "#",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: AlertTriangle,
      label: "Emergencies",
      description: "Gas leaks & downed wires",
      href: "/report-outage",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: LifeBuoy,
      label: "Support Center",
      description: "FAQs & customer service",
      href: "#",
      color: "text-primary",
      bg: "bg-primary/5"
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
      <div className="container">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <a className="block group h-full">
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden">
                  <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${action.bg} ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{action.label}</h3>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
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
