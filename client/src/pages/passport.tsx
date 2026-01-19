import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, MapPin, Share2, Settings, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PassportPage() {
  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Header Profile */}
      <div className="bg-primary text-primary-foreground pt-12 pb-8 px-6 rounded-b-[2rem] shadow-xl relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white/20 shadow-2xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-accent text-white p-1.5 rounded-full border-2 border-primary shadow-lg">
              <Crown size={16} fill="currentColor" />
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-serif font-bold">Jane Doe</h1>
            <p className="text-primary-foreground/70 text-sm">Coffee Enthusiast • St. Louis</p>
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

        <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
          <Trophy size={20} className="text-primary" /> Recent Badges
        </h2>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1,2,3].map((i) => (
             <div key={i} className="aspect-square bg-card rounded-xl border border-border flex flex-col items-center justify-center p-2 text-center shadow-sm">
               <div className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center mb-2 text-2xl">
                 ☕️
               </div>
               <span className="text-[10px] font-bold text-primary">Early Bird</span>
             </div>
          ))}
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
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
            <div className="text-center py-10 text-muted-foreground">
              Detailed stats coming soon.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
