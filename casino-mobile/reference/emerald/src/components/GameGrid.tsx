import React from 'react';
import { motion } from 'framer-motion';
import { GameCard } from './GameCard';
import { ChevronRight } from 'lucide-react';
interface GameGridProps {
  title: string;
  games: Array<{
    id: string;
    name: string;
    minStake: string;
    image: string;
    isHot?: boolean;
  }>;
}
export function GameGrid({
  title,
  games
}: GameGridProps) {
  return <div className="py-6 border-b border-[#C5A059]/10 bg-[#051108]">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-white text-lg font-bold tracking-wide">{title}</h2>
        <button className="flex items-center text-[#C5A059] text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex overflow-x-auto px-4 gap-4 pb-4 no-scrollbar snap-x snap-mandatory">
        {games.map((game, index) => <motion.div key={game.id} initial={{
        opacity: 0,
        x: 20
      }} whileInView={{
        opacity: 1,
        x: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: index * 0.1
      }} className="snap-start">
            <GameCard {...game} />
          </motion.div>)}
      </div>
    </div>;
}