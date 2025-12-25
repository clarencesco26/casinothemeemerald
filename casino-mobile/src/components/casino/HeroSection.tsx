import { defineComponent } from 'vue'
import { ChevronRight, Crown } from 'lucide-vue-next'

export default defineComponent({
  name: 'HeroSection',
  setup() {
    return () => (
      <section class="relative w-full overflow-hidden bg-gradient-to-b from-[#013220] to-[#051108] pt-12 pb-16 px-6">
        <div class="absolute inset-0 z-0 pointer-events-none">
          <div class="absolute top-[170px] left-[-100px] w-64 h-64 opacity-100 rotate-45" >
            <img src="/src/assets/images/red.png" alt="chip" class="w-full h-full object-contain" loading="lazy" />
          </div>
        </div>
        <div class="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] opacity-5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-[#013220] opacity-20 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3" />

        <div class="relative z-10 flex flex-col items-center text-center">
          <div class="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30">
            <Crown class="w-4 h-4 text-[#C5A059]" />
            <span class="text-[#C5A059] text-xs font-bold tracking-widest uppercase">Elite Status Unlocked</span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            Enter the <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#EEDCAA] to-[#C5A059]">VIP Room</span>
          </h1>

          <p class="text-gray-300 text-lg mb-8 max-w-xs mx-auto leading-relaxed">
            Exclusive high-stakes gaming for distinguished players.
          </p>

          <button
            type="button"
            class="group relative px-8 py-4 bg-gradient-to-r from-[#C5A059] to-[#8A6E36] rounded-lg shadow-[0_0_20px_rgba(197,160,89,0.4)] overflow-hidden"
          >
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span class="relative flex items-center gap-2 text-[#051108] font-bold text-lg tracking-wide">
              PLAY NOW
              <ChevronRight class="w-5 h-5" />
            </span>
          </button>
        </div>

        <div class="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]/30" />
        <div class="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]/30" />
      </section>
    )
  },
})
