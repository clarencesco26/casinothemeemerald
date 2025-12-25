import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';
export function SupportSection() {
  return <section className="bg-[#051108] py-12 px-6 border-t border-[#C5A059]/20">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-white mb-2">
          24/7 VIP Concierge
        </h2>
        <p className="text-gray-500 text-sm">
          Always here to assist you with premium support.
        </p>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-4 bg-[#013220]/30 border border-[#C5A059]/20 rounded-lg group hover:bg-[#013220]/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center group-hover:bg-[#C5A059] transition-colors duration-300">
              <MessageSquare className="w-5 h-5 text-[#C5A059] group-hover:text-[#051108]" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-sm">Live Chat</div>
              <div className="text-gray-500 text-xs">Instant response</div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-[#013220]/30 border border-[#C5A059]/20 rounded-lg hover:bg-[#013220]/50 transition-colors group">
            <Phone className="w-6 h-6 text-[#C5A059] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-gray-300 text-xs font-medium">Call Us</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-[#013220]/30 border border-[#C5A059]/20 rounded-lg hover:bg-[#013220]/50 transition-colors group">
            <Mail className="w-6 h-6 text-[#C5A059] mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-gray-300 text-xs font-medium">Email</span>
          </button>
        </div>
      </div>
    </section>;
}