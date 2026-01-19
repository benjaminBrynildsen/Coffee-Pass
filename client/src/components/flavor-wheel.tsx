import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type FlavorCategory = 
  | "Fruity" 
  | "Floral" 
  | "Sweet" 
  | "Nutty" 
  | "Spices" 
  | "Roasted" 
  | "Vegetal" 
  | "Fermented";

const FLAVORS: { category: FlavorCategory; color: string; subflavors: string[] }[] = [
  { category: "Fruity", color: "#e91e63", subflavors: ["Berry", "Citrus", "Dried Fruit"] },
  { category: "Floral", color: "#e040fb", subflavors: ["Jasmine", "Rose", "Chamomile"] },
  { category: "Sweet", color: "#ff9800", subflavors: ["Caramel", "Vanilla", "Honey"] },
  { category: "Nutty", color: "#795548", subflavors: ["Almond", "Hazelnut", "Peanut"] },
  { category: "Spices", color: "#d32f2f", subflavors: ["Cinnamon", "Clove", "Pepper"] },
  { category: "Roasted", color: "#3e2723", subflavors: ["Smoke", "Tobacco", "Toast"] },
  { category: "Vegetal", color: "#4caf50", subflavors: ["Grass", "Herb", "Olive"] },
  { category: "Fermented", color: "#9c27b0", subflavors: ["Winey", "Kombucha"] }
];

interface FlavorWheelProps {
  onSelect?: (flavors: string[]) => void;
  selected?: string[];
}

export function FlavorWheel({ onSelect, selected = [] }: FlavorWheelProps) {
  const [activeCategory, setActiveCategory] = useState<FlavorCategory | null>(null);

  const toggleFlavor = (flavor: string) => {
    const newSelection = selected.includes(flavor)
      ? selected.filter(f => f !== flavor)
      : [...selected, flavor];
    onSelect?.(newSelection);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-64 h-64">
        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Tasting</div>
            <div className="text-xl font-serif font-bold text-primary">Notes</div>
          </div>
        </div>

        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {FLAVORS.map((flavor, index) => {
            const total = FLAVORS.length;
            const sliceAngle = 360 / total;
            const startAngle = index * sliceAngle;
            const endAngle = startAngle + sliceAngle;
            
            // Convert polar to cartesian
            const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
            const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
            const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
            const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

            const isSelected = flavor.subflavors.some(f => selected.includes(f));
            const isActive = activeCategory === flavor.category;

            return (
              <g key={flavor.category} onClick={() => setActiveCategory(isActive ? null : flavor.category)}>
                <path
                  d={`M50,50 L${x1},${y1} A50,50 0 0,1 ${x2},${y2} Z`}
                  fill={flavor.color}
                  fillOpacity={isActive || isSelected ? 0.9 : 0.3}
                  stroke="white"
                  strokeWidth="0.5"
                  className="cursor-pointer transition-all duration-300 hover:opacity-100"
                />
                {/* Label roughly in middle of slice */}
                <foreignObject
                  x={50 + 35 * Math.cos((Math.PI * (startAngle + sliceAngle/2)) / 180) - 10}
                  y={50 + 35 * Math.sin((Math.PI * (startAngle + sliceAngle/2)) / 180) - 5}
                  width="20"
                  height="10"
                  transform={`rotate(${90}, ${50 + 35 * Math.cos((Math.PI * (startAngle + sliceAngle/2)) / 180)}, ${50 + 35 * Math.sin((Math.PI * (startAngle + sliceAngle/2)) / 180)})`}
                >
                  <div className="text-[3px] text-white text-center font-bold leading-none select-none pointer-events-none drop-shadow-md">
                    {flavor.category}
                  </div>
                </foreignObject>
              </g>
            );
          })}
          {/* Inner Circle to create donut */}
          <circle cx="50" cy="50" r="15" fill="var(--color-card)" />
        </svg>
      </div>

      {/* Sub-flavor selection */}
      <div className="h-24 w-full px-4">
        {activeCategory ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {FLAVORS.find(f => f.category === activeCategory)?.subflavors.map(sub => (
              <button
                key={sub}
                onClick={() => toggleFlavor(sub)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs border transition-all",
                  selected.includes(sub)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary"
                )}
              >
                {sub}
              </button>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-sm text-muted-foreground pt-4">
            Tap a color slice to reveal specific notes
          </div>
        )}
      </div>
      
      {/* Selected tags display */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center max-w-[80%]">
          {selected.map(s => (
            <span key={s} className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
