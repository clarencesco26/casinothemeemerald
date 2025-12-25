import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Crown } from 'lucide-react';
export function HeroSection() {
  return <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#013220] to-[#051108] pt-12 pb-16 px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] opacity-5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#013220] opacity-20 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30">
          <Crown className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[#C5A059] text-xs font-bold tracking-widest uppercase">
            Elite Status Unlocked
          </span>
        </motion.div>

        <motion.h1 initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.1
      }} className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
          Enter the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#EEDCAA] to-[#C5A059]">
            VIP Room
          </span>
        </motion.h1>

        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="text-gray-300 text-lg mb-8 max-w-xs mx-auto leading-relaxed">
          Exclusive high-stakes gaming for distinguished players.
        </motion.p>

        <motion.button initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} transition={{
        duration: 0.3
      }} className="group relative px-8 py-4 bg-gradient-to-r from-[#C5A059] to-[#8A6E36] rounded-lg shadow-[0_0_20px_rgba(197,160,89,0.4)] overflow-hidden">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center gap-2 text-[#051108] font-bold text-lg tracking-wide">
            PLAY NOW
            <ChevronRight className="w-5 h-5" />
          </span>
        </motion.button>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]/30" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]/30" />
    </section>;
}