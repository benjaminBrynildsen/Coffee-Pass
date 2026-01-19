import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Map, Compass, Stamp, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Hide nav on onboarding
  if (location === "/") return <>{children}</>;

  const navItems = [
    { icon: Map, label: "Map", href: "/map" },
    { icon: Compass, label: "Trails", href: "/trails" },
    { icon: Stamp, label: "Passport", href: "/passport" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-border z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.label} href={item.href}>
                <div className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 cursor-pointer transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
                )}>
                  <item.icon 
                    size={24} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={cn("transition-transform", isActive && "scale-110")}
                  />
                  <span className="text-[10px] font-medium tracking-wide uppercase">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
