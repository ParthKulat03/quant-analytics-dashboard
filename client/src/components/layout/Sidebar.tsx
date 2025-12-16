import { Home, BarChart2, Activity, Bell, Settings, PieChart, Layers } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Overview", href: "/" },
    { icon: Activity, label: "Live Analytics", href: "/analytics" },
    { icon: Layers, label: "Order Book", href: "/orderbook" },
    { icon: BarChart2, label: "Backtest", href: "/backtest" },
    { icon: Bell, label: "Alerts", href: "/alerts" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="h-screen w-16 md:w-64 border-r border-border bg-sidebar flex flex-col transition-all duration-300">
      <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-border">
        <PieChart className="h-6 w-6 text-primary mr-0 md:mr-2" />
        <span className="font-bold text-lg hidden md:block tracking-tight">Quant<span className="text-primary">Analytics</span></span>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-2 px-2 md:px-4">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center p-2 rounded-md transition-all duration-200 group cursor-pointer",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                <span className="ml-3 hidden md:block font-medium">{item.label}</span>
                {isActive && <div className="ml-auto w-1 h-1 rounded-full bg-primary hidden md:block" />}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-medium">Jane Doe</span>
            <span className="text-xs text-muted-foreground">Quant Trader</span>
          </div>
        </div>
      </div>
    </div>
  );
}
