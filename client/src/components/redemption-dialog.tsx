import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Timer, QrCode, AlertTriangle } from "lucide-react";

interface RedemptionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  rewardTitle: string;
  rewardCode: string;
  onRedeemComplete: () => void;
}

export function RedemptionDialog({ 
  isOpen, 
  onOpenChange, 
  rewardTitle, 
  rewardCode,
  onRedeemComplete 
}: RedemptionDialogProps) {
  const [step, setStep] = useState<"confirm" | "reveal" | "done">("confirm");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "reveal" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setStep("done");
      onRedeemComplete();
    }
    return () => clearInterval(timer);
  }, [step, timeLeft, onRedeemComplete]);

  const handleOpenCode = () => {
    setStep("reveal");
  };

  const handleFinish = () => {
    setStep("done");
    onRedeemComplete();
    onOpenChange(false);
  };

  // Reset state when dialog closes/opens
  useEffect(() => {
    if (isOpen) {
      setStep("confirm");
      setTimeLeft(120);
    }
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Prevent closing if code is revealed but not done
      if (step === "reveal" && !open) return;
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md bg-card border-none shadow-2xl p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {step === "confirm" ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 space-y-6"
            >
              <div className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-2">
                  <Lock size={32} />
                </div>
                <DialogTitle className="text-2xl font-serif">Ready to redeem?</DialogTitle>
                <DialogDescription className="text-base">
                  Once you open the code, you can't open it again. Make sure the barista is ready.
                </DialogDescription>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button 
                  className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90" 
                  onClick={handleOpenCode}
                >
                  Open code
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full h-12 text-lg"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col h-full bg-primary text-primary-foreground"
            >
              {/* Header */}
              <div className="p-6 bg-black/10 text-center">
                <h3 className="font-serif font-bold text-xl">Coffee Pass Code</h3>
                <p className="text-white/70 text-sm">Show this to the barista</p>
              </div>

              {/* Code Area */}
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 bg-white text-black min-h-[300px]">
                <div className="w-full p-6 border-4 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center space-y-2">
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">PROMO CODE</div>
                  <div className="text-4xl font-mono font-bold tracking-wider text-black select-all">
                    {rewardCode}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg border border-amber-100">
                  <AlertTriangle size={16} />
                  <span className="text-xs font-bold">This code can't be reopened once closed.</span>
                </div>

                <div className="flex items-center gap-2 text-2xl font-mono font-bold text-primary">
                  <Timer className="animate-pulse" />
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-white border-t">
                <Button 
                  className="w-full h-14 text-xl font-bold rounded-xl" 
                  onClick={handleFinish}
                >
                  Done
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
