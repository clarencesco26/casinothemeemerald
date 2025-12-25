import React from 'react';
import { motion } from 'framer-motion';
interface GameCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}
const categories = ['Slots', 'Table Games', 'Live Casino'];
export function GameCategories({
  activeCategory,
  setActiveCategory
}: GameCategoriesProps) {
  return <div className="w-full bg-[#051108] border-b border-[#C5A059]/20 sticky top-[72px] z-40">
      <div className="flex justify-between px-4 overflow-x-auto no-scrollbar">
        {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className="relative px-4 py-4 flex-1 text-center min-w-[100px]">
            <span className={`relative z-10 text-sm font-bold tracking-wide transition-colors duration-300 ${activeCategory === category ? 'text-[#C5A059]' : 'text-gray-400'}`}>
              {category}
            </span>
            {activeCategory === category && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]" initial={false} transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }} />}
            {activeCategory === category && <div className="absolute inset-0 bg-gradient-to-t from-[#C5A059]/10 to-transparent" />}
          </button>)}
      </div>
    </div>;
}