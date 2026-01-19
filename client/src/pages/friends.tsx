import { useState } from "react";
import { MOCK_FRIENDS } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState("following");

  return (
    <div className="min-h-screen bg-background pb-safe">
      <div className="p-6 sticky top-0 bg-background/95 backdrop-blur z-10 space-y-4 border-b border-border">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-primary">Friends</h1>
          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search people..." className="pl-9 bg-secondary/30 border-none" />
        </div>

        <Tabs defaultValue="following" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="suggested">Suggested</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4">
        {activeTab === "following" && (
          <div className="space-y-4">
            {MOCK_FRIENDS.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between p-3 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-sm">{friend.name}</h3>
                    <p className="text-xs text-muted-foreground">{friend.username}</p>
                    <p className="text-[10px] text-primary mt-1">Collected {friend.stats.collected} cafés</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Following
                </Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "suggested" && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide px-2">Suggested for you</h3>
            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
                    <div className="space-y-2">
                       <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                       <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                  <Button size="sm" className="h-8 text-xs gap-1">
                    <UserPlus size={14} /> Follow
                  </Button>
                </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
