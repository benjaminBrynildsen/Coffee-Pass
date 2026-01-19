import { useRoute, Link } from "wouter";
import { MOCK_SHOPS, MOCK_REWARDS, MOCK_FRIENDS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Star, Share2, CheckCircle, Camera, Gauge, Gift, Users } from "lucide-react";
import { motion } from "framer-motion";
import { CheckInDialog } from "@/components/check-in-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ShopDetail() {
  const [match, params] = useRoute("/shop/:id");
  const shopId = match ? params.id : null;
  const shop = MOCK_SHOPS.find(s => s.id === shopId);
  const rewards = MOCK_REWARDS.filter(r => r.shopId === shopId && r.status !== "REDEEMED");
  
  // Mock friends who visited (randomize based on shop ID for demo)
  const friendsVisited = MOCK_FRIENDS.slice(0, parseInt(shopId || "0") % 2 === 0 ? 2 : 1);

  if (!shop) return <div>Shop not found</div>;

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Hero Image */}
      <div className="relative h-72 w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${shop.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <Link href="/map">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 left-4 text-white hover:bg-black/20 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft />
          </Button>
        </Link>
        
        <div className="absolute top-4 right-4 flex gap-2">
           <Button variant="ghost" size="icon" className="text-white hover:bg-black/20 rounded-full backdrop-blur-sm">
            <Share2 size={20} />
          </Button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-bold mb-2"
          >
            {shop.name}
          </motion.h1>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <MapPin size={14} />
            <span>{shop.address}</span>
            <span>•</span>
            <span>{shop.distance}</span>
          </div>
        </div>
      </div>

      {/* Social Strip */}
      {friendsVisited.length > 0 && (
        <div className="px-6 pb-2">
          <div className="flex items-center gap-3 py-3 border-b border-border">
            <div className="flex -space-x-3">
              {friendsVisited.map(friend => (
                <Avatar key={friend.id} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback>{friend.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-bold text-primary">
                {friendsVisited.map(f => f.name.split(" ")[0]).join(", ")}
              </span>
              <span className="text-muted-foreground"> have been here</span>
            </div>
          </div>
          {friendsVisited.length > 1 && (
            <div className="pt-2 text-xs text-muted-foreground">
              <span className="font-medium text-primary">Steve</span> usually gets: <span className="italic">Oat Milk Latte</span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="px-6 py-6 space-y-8">
        {/* Actions */}
        <div className="flex gap-4">
          <CheckInDialog 
            shopName={shop.name}
            trigger={
              <Button className="flex-1 h-12 text-lg rounded-xl shadow-lg bg-primary text-primary-foreground hover:bg-primary/90">
                <CheckCircle className="mr-2 h-5 w-5" /> Check In
              </Button>
            }
          />
          
           <Button variant="outline" className="flex-1 h-12 text-lg rounded-xl border-primary/20 text-primary hover:bg-primary/5">
            <Camera className="mr-2 h-5 w-5" /> Add Photo
          </Button>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between py-4 border-y border-border">
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Match</div>
            <div className="text-xl font-bold text-accent">{shop.rating}%</div>
          </div>
          <div className="text-center border-l border-border pl-8">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Visits</div>
            <div className="text-xl font-bold">1.2k</div>
          </div>
           <div className="text-center border-l border-border pl-8">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Open</div>
            <div className="text-xl font-bold text-green-600">Now</div>
          </div>
        </div>

        {/* About */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {shop.tags.filter(t => t.includes("House") || t.includes("Sweet")).map(tag => (
              <Badge key={tag} className="px-3 py-1 text-sm bg-amber-100 text-amber-900 hover:bg-amber-200 border-none">
                <Star size={12} className="mr-1 inline" /> {tag}
              </Badge>
            ))}
             {shop.tags.filter(t => t.includes("Vibe")).map(tag => (
              <Badge key={tag} className="px-3 py-1 text-sm bg-purple-100 text-purple-900 hover:bg-purple-200 border-none">
                 ✨ {tag.replace("Vibe: ", "")}
              </Badge>
            ))}
             {shop.tags.filter(t => t.includes("Machine")).map(tag => (
              <Badge key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-900 hover:bg-slate-200 border-none">
                 <Gauge size={12} className="mr-1 inline" /> {tag.replace("Machine: ", "")}
              </Badge>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-serif font-bold text-primary mb-2">The Experience</h2>
            <p className="text-muted-foreground leading-relaxed">
              {shop.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {shop.tags.filter(t => !t.includes("House") && !t.includes("Sweet") && !t.includes("Vibe") && !t.includes("Machine")).map(tag => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm bg-secondary/50 hover:bg-secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          {rewards.length > 0 && (
            <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 flex items-start gap-3">
              <div className="bg-white p-2 rounded-full shadow-sm text-orange-500">
                <Gift size={16} />
              </div>
              <div>
                <p className="text-sm font-bold text-orange-900">Reward Available Here</p>
                <p className="text-xs text-orange-700">{rewards[0].description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Location & Hours */}
        <div className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-primary">Details</h2>
          <div className="bg-card p-4 rounded-xl border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <Clock size={16} /> Monday - Friday
              </span>
              <span className="font-medium">7am - 7pm</span>
            </div>
             <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <Clock size={16} /> Weekends
              </span>
              <span className="font-medium">8am - 6pm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
