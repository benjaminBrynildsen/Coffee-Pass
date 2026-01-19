import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { MOCK_SHOPS, Shop } from "@/lib/mock-data";
import { Search, MapPin, Navigation, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Fix leaflet icon issue
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map center updates
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 2 });
  }, [center, map]);
  return null;
}

export default function MapPage() {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const defaultCenter: [number, number] = [38.6270, -90.1994]; // St. Louis

  // Filter shops
  const filteredShops = MOCK_SHOPS.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="relative w-full h-full bg-background">
      {/* Floating Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-[400]">
        <div className="relative shadow-xl">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
          <Input 
            className="pl-10 h-12 rounded-full border-none shadow-none bg-white/90 backdrop-blur-md text-lg" 
            placeholder="Search coffee, vibes, or brew..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapUpdater center={defaultCenter} />
        
        {filteredShops.map((shop) => (
          <Marker 
            key={shop.id} 
            position={[shop.lat, shop.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => setSelectedShop(shop),
            }}
          />
        ))}
      </MapContainer>

      {/* Shop Preview Card (Bottom Sheet style) */}
      {selectedShop && (
        <div className="absolute bottom-4 left-4 right-4 z-[400] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <Card className="overflow-hidden border-none shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
            <div className="flex p-4 gap-4">
              <div 
                className="w-24 h-24 rounded-xl bg-cover bg-center shrink-0" 
                style={{ backgroundImage: `url(${selectedShop.image})` }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-serif font-bold truncate">{selectedShop.name}</h3>
                  <Badge variant={selectedShop.isOpen ? "default" : "secondary"} className="text-xs">
                    {selectedShop.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">{selectedShop.address}</p>
                
                <div className="flex gap-1 mt-2 flex-wrap">
                  {selectedShop.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                  <span className="text-[10px] bg-primary/10 px-2 py-0.5 rounded-full text-primary">
                    {selectedShop.distance}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-px bg-border mt-0">
              <Link href={`/shop/${selectedShop.id}`} className="w-full">
                <Button variant="ghost" className="w-full rounded-none h-12 bg-white hover:bg-secondary/20">
                  <Info className="mr-2 h-4 w-4" /> Details
                </Button>
              </Link>
              <Button variant="ghost" className="w-full rounded-none h-12 bg-white hover:bg-secondary/20 text-primary">
                <Navigation className="mr-2 h-4 w-4" /> Go
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
