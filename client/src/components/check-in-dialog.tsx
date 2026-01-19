import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Coffee, Star, Camera, ChevronRight, ArrowLeft } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FlavorWheel } from "@/components/flavor-wheel";

export function CheckInDialog({ shopName, trigger }: { shopName: string, trigger: React.ReactNode }) {
  const [step, setStep] = useState<"form" | "tasting" | "success">("form");
  const [flavors, setFlavors] = useState<string[]>([]);
  
  // Brew details
  const [brewMethod, setBrewMethod] = useState("");
  const [beanName, setBeanName] = useState("");

  const handleCheckIn = () => {
    setStep("success");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-none shadow-2xl overflow-y-auto max-h-[90vh]">
        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-center">Check in at {shopName}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brew Method</label>
                  <div className="flex flex-wrap gap-2">
                    {["Pour Over", "Latte", "Cold Brew", "Espresso", "Drip", "Aeropress"].map(method => (
                      <button 
                        key={method} 
                        onClick={() => setBrewMethod(method)}
                        className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                          brewMethod === method 
                            ? "bg-primary text-white border-primary" 
                            : "border-border hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bean / Roast Details</label>
                  <Input 
                    placeholder="e.g. Ethiopia Yirgacheffe, Light Roast" 
                    value={beanName}
                    onChange={(e) => setBeanName(e.target.value)}
                    className="bg-white/50"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Vibe Check</label>
                  <div className="flex flex-wrap gap-2">
                    {["Productive", "Social", "Date Night", "Quiet", "Loud", "Cozy"].map(vibe => (
                      <button key={vibe} className="px-3 py-1.5 rounded-full border border-border text-xs hover:border-accent hover:text-accent transition-colors focus:bg-accent focus:text-white">
                        {vibe}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sweetness Level</label>
                  <Slider defaultValue={[50]} max={100} step={1} className="py-4" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Black Coffee</span>
                    <span>Sugar Bomb</span>
                  </div>
                </div>

                <Textarea placeholder="Add a note... (optional)" className="resize-none bg-secondary/20 border-none" />
                
                <Button 
                  className="w-full h-12 text-lg rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80" 
                  onClick={() => setStep("tasting")}
                >
                  Add Tasting Notes <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
                
                <Button variant="ghost" className="w-full" onClick={handleCheckIn}>
                  Skip & Check In
                </Button>
              </div>
            </motion.div>
          ) : step === "tasting" ? (
            <motion.div
              key="tasting"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
               <div className="flex items-center">
                 <Button variant="ghost" size="icon" onClick={() => setStep("form")} className="-ml-2">
                   <ArrowLeft className="w-5 h-5" />
                 </Button>
                 <DialogTitle className="text-xl font-serif text-center flex-1 pr-8">Flavor Profile</DialogTitle>
               </div>

               <FlavorWheel selected={flavors} onSelect={setFlavors} />

               <div className="pt-4">
                 <Button className="w-full h-12 text-lg rounded-xl" onClick={handleCheckIn}>
                   Complete Check-in
                 </Button>
               </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 flex flex-col items-center text-center space-y-4"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4"
              >
                <CheckCircle size={48} />
              </motion.div>
              
              <h2 className="text-3xl font-serif font-bold text-primary">Stamped!</h2>
              <p className="text-muted-foreground">
                You've successfully checked in at <br/> <span className="font-bold text-foreground">{shopName}</span>
              </p>
              
              {brewMethod && (
                <div className="text-sm bg-secondary/20 px-3 py-1 rounded-full text-primary font-medium">
                  {brewMethod} • {beanName || "House Blend"}
                </div>
              )}
              
              {flavors.length > 0 && (
                 <div className="flex flex-wrap gap-1 justify-center max-w-[80%] pt-2">
                  {flavors.map(s => (
                    <span key={s} className="text-[10px] border border-primary/20 px-2 py-0.5 rounded-full text-primary">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <div className="text-xl font-bold text-primary">+1</div>
                  <div className="text-xs uppercase">Visit</div>
                </div>
                 <div className="text-center p-3 bg-secondary/30 rounded-lg">
                  <div className="text-xl font-bold text-primary">5</div>
                  <div className="text-xs uppercase">Streak</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
