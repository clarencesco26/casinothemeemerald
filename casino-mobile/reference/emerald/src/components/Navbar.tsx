import React from 'react';
import { Menu, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
export function Navbar() {
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.5
  }} className="sticky top-0 z-50 w-full bg-[#051108]/95 backdrop-blur-md border-b border-[#C5A059]/30 px-4 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8A6E36] flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.3)]">
          <span className="text-[#051108] font-bold text-lg">V</span>
        </div>
        <span className="text-white font-bold text-lg tracking-wider">
          VIP<span className="text-[#C5A059]">ROOM</span>
        </span>
      </div>

      {/* Right Side: Balance & Menu */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#013220] px-3 py-1.5 rounded-full border border-[#C5A059]/30">
          <Coins className="w-4 h-4 text-[#C5A059]" />
          <span className="text-white font-medium text-sm">$10,250.00</span>
        </div>
        <button className="text-[#C5A059] hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>;
}