import React from 'react';
export function Footer() {
  return <footer className="bg-[#051108] border-t border-[#C5A059] py-8 px-6 text-center">
      <div className="flex justify-center items-center gap-2 mb-6 opacity-50">
        <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-[10px] text-white font-bold">
          18+
        </div>
        <div className="h-8 w-[1px] bg-white/20 mx-2"></div>
        <div className="text-white/60 text-xs text-left leading-tight">
          Play Responsibly.
          <br />
          Gambling can be addictive.
        </div>
      </div>

      <div className="flex justify-center gap-6 mb-8 text-[#C5A059] text-xs font-medium tracking-wide">
        <a href="#" className="hover:text-white transition-colors">
          Terms
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Privacy
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Fair Play
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Affiliates
        </a>
      </div>

      <p className="text-gray-600 text-[10px]">
        © 2024 VIP Room Casino. All rights reserved. <br />
        Licensed and regulated by the Gaming Authority.
      </p>
    </footer>;
}