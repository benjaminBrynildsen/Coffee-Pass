import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, MapPin, Share2, Settings, Crown, Gift, Lock, CheckCircle2, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MOCK_REWARDS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import { RedemptionDialog } from "@/components/redemption-dialog";
import { useState } from "react";

export default function PassportPage() {
  const [redeemReward, setRedeemReward] = useState<{id: string, title: string, code: string} | null>(null);
  
  // Local state to track redeemed status for this session since we don't have a real backend
  const [redeemedIds, setRedeemedIds] = useState<string[]>([]);

  const handleRedeemComplete = (id: string) => {
    setRedeemedIds(prev => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      <RedemptionDialog 
        isOpen={!!redeemReward}
        onOpenChange={(open) => !open && setRedeemReward(null)}
        rewardTitle={redeemReward?.title || ""}
        rewardCode={redeemReward?.code || ""}
        onRedeemComplete={() => redeemReward && handleRedeemComplete(redeemReward.id)}
      />

      {/* Header Profile */}
      <div className="bg-primary text-primary-foreground pt-12 pb-8 px-6 rounded-b-[2rem] shadow-xl relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white/20 shadow-2xl">
              <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" />
              <AvatarFallback>DH</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-accent text-white p-1.5 rounded-full border-2 border-primary shadow-lg">
              <Crown size={16} fill="currentColor" />
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-serif font-bold">Dustin Henderson</h1>
            <p className="text-primary-foreground/70 text-sm">Science & Coffee Nerd • Hawkins</p>
          </div>

          <div className="flex gap-6 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold">24</div>
              <div className="text-xs opacity-70 uppercase tracking-wider">Visits</div>
            </div>
            <div className="text-center border-l border-white/20 pl-6">
              <div className="text-2xl font-bold">5</div>
              <div className="text-xs opacity-70 uppercase tracking-wider">Trails</div>
            </div>
            <div className="text-center border-l border-white/20 pl-6">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs opacity-70 uppercase tracking-wider">Cities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="rewards" className="space-y-6">
            {/* Status Banner */}
            <div className="bg-secondary/20 border border-secondary p-4 rounded-xl flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                <Gift size={20} />
              </div>
              <div>
                <p className="font-bold text-primary">You're close!</p>
                <p className="text-sm text-muted-foreground">2 cafés away from your next reward ☕️</p>
              </div>
            </div>

            {/* Unlocked Rewards */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-600" /> Ready to Redeem
              </h3>
              {MOCK_REWARDS.filter(r => r.status === "UNLOCKED" && !redeemedIds.includes(r.id)).map(reward => (
                <Card key={reward.id} className="border-l-4 border-l-green-500 shadow-md bg-gradient-to-r from-white to-green-50/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-100 border-none">Unlocked</Badge>
                        <h4 className="font-bold text-lg">{reward.title}</h4>
                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                        {reward.expiryDate && (
                          <p className="text-xs text-amber-600 mt-1 font-medium">{reward.expiryDate}</p>
                        )}
                      </div>
                      {reward.type === "PARTNER" && (
                        <div className="bg-primary/5 p-2 rounded-lg">
                          <QrCode size={24} className="text-primary" />
                        </div>
                      )}
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10"
                      onClick={() => setRedeemReward({
                        id: reward.id,
                        title: reward.title,
                        code: reward.code || "COFFEEPASS"
                      })}
                    >
                      Redeem at Café
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* In Progress */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                <Trophy size={18} className="text-primary" /> In Progress
              </h3>
              {MOCK_REWARDS.filter(r => r.status === "LOCKED").map(reward => (
                <Card key={reward.id} className="border-border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold text-primary">{reward.title}</h4>
                      {reward.type === "PARTNER" && <Badge variant="outline" className="text-[10px]">Partner</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                    
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>{reward.criteria}</span>
                        <span>{reward.progress} / {reward.total}</span>
                      </div>
                      <Progress value={(reward.progress / reward.total) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-secondary/30 flex items-center justify-center shrink-0">
                  <Calendar size={20} className="text-primary/60" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-primary">Sump Coffee</h4>
                    <span className="text-xs text-muted-foreground">2d ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Checked in with a Pour Over.</p>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="stats">
             {/* Subscription Banner */}
            <Card className="bg-gradient-to-r from-amber-700 to-amber-900 border-none text-white shadow-lg mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Crown size={120} />
              </div>
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold font-serif mb-1">Upgrade to Coffee Pass National</h3>
                    <p className="text-sm text-white/80 max-w-[80%]">Unlock unlimited trails, advanced stats, and exclusive tastings.</p>
                  </div>
                </div>
                <Button className="w-full bg-white text-amber-900 hover:bg-white/90 border-none font-bold">
                  Get Pass Access
                </Button>
              </CardContent>
            </Card>

            <div className="text-center py-10 text-muted-foreground">
              More stats coming soon.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
