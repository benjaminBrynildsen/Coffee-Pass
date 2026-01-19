import { useRoute, Link } from "wouter";
import { MOCK_TRAILS, MOCK_SHOPS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Lock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrailDetail() {
  const [match, params] = useRoute("/trail/:id");
  const trailId = match ? params.id : null;
  const trail = MOCK_TRAILS.find(t => t.id === trailId);

  if (!trail) return <div>Trail not found</div>;

  const trailShops = trail.shops.map(id => MOCK_SHOPS.find(s => s.id === id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Hero */}
      <div className="relative h-64">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${trail.image})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <Link href="/trails">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 left-4 text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeft />
          </Button>
        </Link>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-3xl font-serif font-bold mb-2">{trail.title}</h1>
          <p className="text-white/90">{trail.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-6">
        <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
          <div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Progress</div>
            <div className="text-2xl font-bold text-primary">{trail.completed} / {trail.total}</div>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {trail.completed === trail.total ? <CheckCircle /> : <Lock />}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-primary">Stops</h2>
          
          <div className="relative border-l-2 border-dashed border-border ml-4 space-y-8 pb-4">
            {trailShops.map((shop, index) => (
              <div key={shop!.id} className="relative pl-8">
                <div className={cn(
                  "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2",
                  index < trail.completed ? "bg-primary border-primary" : "bg-background border-muted-foreground"
                )} />
                
                <Link href={`/shop/${shop!.id}`}>
                  <div className="bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-primary">{shop!.name}</h3>
                      {index < trail.completed && <CheckCircle size={16} className="text-green-600" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin size={12} /> {shop!.address}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
