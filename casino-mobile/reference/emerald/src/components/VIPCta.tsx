import React from 'react';
import { motion } from 'framer-motion';
import { Check, Diamond } from 'lucide-react';
export function VIPCta() {
  const benefits = ['Personal Account Manager', 'Higher Betting Limits', 'Exclusive Tournaments', 'Instant Withdrawals'];
  return <section className="relative py-12 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#013220]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#013220] via-[#013220] to-[#051108]"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 flex items-center justify-center mb-4 border border-[#C5A059]">
            <Diamond className="w-6 h-6 text-[#C5A059]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Join Our Exclusive Circle
          </h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Unlock a world of premium rewards and personalized service.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-8">
          {benefits.map((benefit, index) => <motion.div key={index} initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} className="flex items-center gap-3 bg-[#051108]/50 p-3 rounded-lg border border-[#C5A059]/10">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C5A059] flex items-center justify-center">
                <Check className="w-3 h-3 text-[#051108] stroke-[3]" />
              </div>
              <span className="text-gray-200 text-sm font-medium">
                {benefit}
              </span>
            </motion.div>)}
        </div>

        <motion.button whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} className="w-full py-4 bg-[#C5A059] text-[#051108] font-bold text-lg rounded-lg shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] transition-shadow duration-300 uppercase tracking-wider">
          Apply for VIP
        </motion.button>
      </div>
    </section>;
}