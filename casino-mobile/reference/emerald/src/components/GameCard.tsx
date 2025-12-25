import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
interface GameCardProps {
  name: string;
  minStake: string;
  image: string;
  isHot?: boolean;
}
export function GameCard({
  name,
  minStake,
  image,
  isHot
}: GameCardProps) {
  return <motion.div whileHover={{
    y: -5
  }} className="group relative w-40 flex-shrink-0 cursor-pointer">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#C5A059]/20 group-hover:border-[#C5A059] transition-colors duration-300 bg-[#013220]">
        {/* Placeholder Image Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${image} opacity-80`} />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#051108] via-transparent to-transparent opacity-90" />

        {/* Hot Badge */}
        {isHot && <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#C5A059] rounded text-[#051108] text-[10px] font-bold uppercase tracking-wider">
            Hot
          </div>}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-bold text-sm mb-1 leading-tight">
            {name}
          </h3>
          <p className="text-[#C5A059] text-xs font-medium">Min: {minStake}</p>
        </div>

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
            <Play className="w-4 h-4 text-[#051108] ml-0.5 fill-current" />
          </div>
        </div>
      </div>
    </motion.div>;
}