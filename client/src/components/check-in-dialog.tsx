import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Coffee, Star, Camera } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

export function CheckInDialog({ shopName, trigger }: { shopName: string, trigger: React.ReactNode }) {
  const [step, setStep] = useState("form"); // form, success

  const handleCheckIn = () => {
    setStep("success");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-none shadow-2xl">
        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-center">Check in at {shopName}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What are you drinking?</label>
                  <div className="flex flex-wrap gap-2">
                    {["Pour Over", "Latte", "Cold Brew", "Espresso", "Tea"].map(drink => (
                      <button key={drink} className="px-3 py-1.5 rounded-full border border-border text-sm hover:border-primary hover:bg-primary/5 transition-colors focus:bg-primary focus:text-white">
                        {drink}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">How's the vibe?</label>
                  <Slider defaultValue={[50]} max={100} step={1} className="py-4" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Quiet</span>
                    <span>Lively</span>
                  </div>
                </div>

                <Textarea placeholder="Add a note... (optional)" className="resize-none bg-secondary/20 border-none" />
                
                <Button className="w-full h-12 text-lg rounded-xl" onClick={handleCheckIn}>
                  Confirm Check-in
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
