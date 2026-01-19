import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Sun, Moon, Briefcase, BookOpen, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "intro",
    title: "Welcome to BrewPassport",
    subtitle: "Your guide to the best coffee in the city.",
    type: "intro"
  },
  {
    id: "roast",
    title: "How do you like your roast?",
    subtitle: "We'll recommend shops based on your taste.",
    options: [
      { id: "light", label: "Light & Fruity", icon: Sun },
      { id: "medium", label: "Balanced Medium", icon: Coffee },
      { id: "dark", label: "Dark & Bold", icon: Moon },
    ]
  },
  {
    id: "vibe",
    title: "What's your vibe?",
    subtitle: "Where do you usually drink your coffee?",
    options: [
      { id: "work", label: "Productivity", icon: Briefcase },
      { id: "quiet", label: "Quiet Reading", icon: BookOpen },
      { id: "social", label: "Socializing", icon: Users },
      { id: "go", label: "On the Go", icon: Zap },
    ]
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Record<string, any>>({});
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      setLocation("/map");
    }
  };

  const handleSelect = (key: string, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const step = STEPS[currentStep];

  return (
    <div className="h-screen w-full bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md space-y-8 z-10"
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-serif text-primary tracking-tight">
              {step.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {step.subtitle}
            </p>
          </div>

          {step.type === "intro" ? (
             <div className="flex justify-center py-8">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="relative w-48 h-48 border border-border rounded-full flex items-center justify-center bg-card shadow-lg"
               >
                 <Coffee className="w-16 h-16 text-primary" strokeWidth={1.5} />
               </motion.div>
             </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {step.options?.map((option) => {
                const isSelected = preferences[step.id] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(step.id, option.id)}
                    className={cn(
                      "flex items-center p-4 rounded-xl border transition-all duration-300",
                      isSelected 
                        ? "border-primary bg-primary/5 shadow-md" 
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-full mr-4 transition-colors",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-secondary/30 text-primary"
                    )}>
                      <option.icon size={24} />
                    </div>
                    <span className="text-lg font-medium text-foreground">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <Button 
            onClick={handleNext}
            className="w-full h-14 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
            size="lg"
            disabled={step.id !== "intro" && !preferences[step.id]}
          >
            {currentStep === STEPS.length - 1 ? "Start Exploring" : "Continue"}
          </Button>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 flex space-x-2">
        {STEPS.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === currentStep ? "w-8 bg-primary" : "w-2 bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
