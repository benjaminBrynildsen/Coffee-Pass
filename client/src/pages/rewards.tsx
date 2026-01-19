import { MOCK_REWARDS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, CheckCircle2, Trophy, QrCode } from "lucide-react";
import { useState } from "react";
import { RedemptionDialog } from "@/components/redemption-dialog";

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState("earned");
  const [redeemReward, setRedeemReward] = useState<{id: string, title: string, code: string} | null>(null);
  const [redeemedIds, setRedeemedIds] = useState<string[]>([]);

  const handleRedeemComplete = (id: string) => {
    setRedeemedIds(prev => [...prev, id]);
  };

  const unlockedRewards = MOCK_REWARDS.filter(r => r.status === "UNLOCKED" && !redeemedIds.includes(r.id));
  const lockedRewards = MOCK_REWARDS.filter(r => r.status === "LOCKED");
  const redeemedRewards = MOCK_REWARDS.filter(r => redeemedIds.includes(r.id) || r.status === "REDEEMED");

  return (
    <div className="min-h-screen bg-background pb-safe">
      <RedemptionDialog 
        isOpen={!!redeemReward}
        onOpenChange={(open) => !open && setRedeemReward(null)}
        rewardTitle={redeemReward?.title || ""}
        rewardCode={redeemReward?.code || ""}
        onRedeemComplete={() => redeemReward && handleRedeemComplete(redeemReward.id)}
      />

      {/* Header & Progress Card */}
      <div className="p-6 bg-primary text-primary-foreground rounded-b-[2rem] shadow-xl space-y-6">
        <h1 className="text-2xl font-serif font-bold">Rewards</h1>
        
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-start">
             <div>
               <h2 className="font-bold text-lg">Next Reward</h2>
               <p className="text-sm text-white/80">You're 2 cafés away from a free month ☕️</p>
             </div>
             <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
               <Gift size={20} />
             </div>
          </div>
          <Progress value={80} className="h-2 bg-white/20" />
          <p className="text-[10px] text-white/60 uppercase tracking-wide">Check in at any cafe to move progress</p>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="earned" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="earned">Earned</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
          </TabsList>

          <TabsContent value="earned" className="space-y-4">
             {unlockedRewards.length === 0 && (
               <div className="text-center py-10 text-muted-foreground">
                 No rewards to redeem yet. Keep exploring!
               </div>
             )}
             {unlockedRewards.map(reward => (
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
                    
                    {reward.rewardSource === "POS_CODE" ? (
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10"
                        onClick={() => setRedeemReward({
                          id: reward.id,
                          title: reward.title,
                          code: reward.code || "COFFEEPASS"
                        })}
                      >
                        Use Code
                      </Button>
                    ) : (
                       <Button variant="outline" className="w-full border-green-600 text-green-700 font-bold h-10">
                        Show to Barista
                      </Button>
                    )}
                  </CardContent>
                </Card>
             ))}
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            {lockedRewards.map(reward => (
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
          </TabsContent>

          <TabsContent value="redeemed" className="space-y-4">
             {redeemedRewards.length === 0 && (
               <div className="text-center py-10 text-muted-foreground">
                 No redeemed rewards yet.
               </div>
             )}
             {redeemedRewards.map(reward => (
               <Card key={reward.id} className="opacity-60 bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-700">{reward.title}</h4>
                      <Badge variant="secondary">Redeemed</Badge>
                    </div>
                    <p className="text-sm text-gray-500">{reward.description}</p>
                  </CardContent>
               </Card>
             ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
