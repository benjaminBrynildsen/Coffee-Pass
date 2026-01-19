import { MOCK_TRAILS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function TrailsPage() {
  return (
    <div className="min-h-screen bg-background pb-safe px-6 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-primary">Curated Trails</h1>
        <p className="text-muted-foreground">Explore the city through themed coffee adventures.</p>
      </div>

      <div className="grid gap-6">
        {MOCK_TRAILS.map((trail, idx) => (
          <Link key={trail.id} href={`/trail/${trail.id}`}>
            <Card className="overflow-hidden border-none shadow-lg group cursor-pointer hover:shadow-xl transition-all">
              <div className="relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${trail.image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-1">{trail.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-1">{trail.description}</p>
                    </div>
                  </div>
                </div>

                {idx > 1 && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                    <Lock size={12} /> PRO
                  </div>
                )}
              </div>
              
              <CardContent className="p-4 bg-card">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{trail.completed} of {trail.total} visited</span>
                  </div>
                  <Progress value={(trail.completed / trail.total) * 100} className="h-2" />
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0 font-medium">
                      View Trail <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
