import { MOCK_FEED } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Trophy, MapPin } from "lucide-react";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background pb-safe">
      <div className="p-6 sticky top-0 bg-background/95 backdrop-blur z-10 border-b border-border">
        <h1 className="text-2xl font-serif font-bold text-primary">Activity Feed</h1>
      </div>

      <div className="p-4 space-y-4">
        {MOCK_FEED.map((item) => (
          <Card key={item.id} className="border-border shadow-sm">
            <CardContent className="p-4 flex gap-4">
              <Avatar className="h-10 w-10 border border-border">
                {/* Find user in MOCK_FRIENDS (simplified) */}
                <AvatarImage src={`https://images.unsplash.com/photo-${item.userId === 'u2' ? '1500648767791-00dcc994a43e' : '1494790108377-be9c29b29330'}?auto=format&fit=crop&q=80&w=200`} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium leading-none">{item.title}</p>
                  <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                
                {item.type === "CHECKIN" && (
                  <div className="inline-flex items-center gap-1 text-xs text-primary bg-primary/5 px-2 py-1 rounded-full mt-2">
                    <Coffee size={12} /> Checked In
                  </div>
                )}
                {item.type === "REWARD_UNLOCKED" && (
                  <div className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full mt-2">
                    <Trophy size={12} /> Reward Unlocked
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
