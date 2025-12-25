import { defineComponent } from 'vue'
import { Play } from 'lucide-vue-next'

export type GameCardProps = {
  brandName: string
  title: string
  prize: string
  prizeDescription?: string
  brandImage?: string
  href?: string
  isHot?: boolean
}

export default defineComponent({
  name: 'GameCard',
  props: {
    brandName: { type: String, required: true },
    title: { type: String, default: '' },
    prize: { type: String, default: '' },
    prizeDescription: { type: String, default: '' },
    brandImage: { type: String, default: '' },
    href: { type: String, default: '' },
    isHot: { type: Boolean, default: false },
  },
  setup(props) {
    return () => (
      <div class="relative w-64 flex-shrink-0 select-none">
        <div class="relative aspect-[3/4] rounded-[32px] overflow-hidden border border-[#C5A059]/50 bg-[#0B1510] shadow-[0_12px_36px_rgba(0,0,0,0.4)]">
          <div class="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 via-transparent to-[#22C55E]/10" />
          <div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/70" />
          <div class="absolute inset-0 vip-noise opacity-70" />

          <div class="relative flex flex-col items-center h-full px-5 py-6 gap-4 text-center">
            {props.brandImage && (
              <div class="w-full rounded-xl h-16 overflow-hidden px-3">
                <img src={props.brandImage} alt={props.brandName} class="h-full w-full object-contain" loading="lazy" />
              </div>
            )}

            <div class="space-y-1">
              <h3 class="text-xl font-black tracking-tight bg-gradient-to-r from-[#FCD34D] via-[#FBBF24] to-[#6EE7B7] text-transparent bg-clip-text drop-shadow-[0_6px_14px_rgba(251,191,36,0.35)]">
                {props.brandName}
              </h3>
              <p class="text-white/80 text-sm line-clamp-1">{props.title}</p>
            </div>

            <div class="space-y-1 mt-2">
              <p class="text-2xl font-extrabold text-[#A7F3D0] drop-shadow-[0_0_10px_rgba(110,231,183,0.65)]">{props.prize}</p>
              {props.prizeDescription && <p class="text-white/70 text-xs">{props.prizeDescription}</p>}
            </div>

            <div class="mt-auto w-full">
              <div class="w-full py-3 rounded-full bg-gradient-to-r from-[#4ADE80] to-[#34D399] text-[#0B1510] font-semibold text-base shadow-[0_14px_34px_rgba(52,211,153,0.38)] flex items-center justify-center gap-2 border border-[#C5A059]/60">
                <span>Visit Website</span>
                <Play class="w-4 h-4" />
              </div>
            </div>
          </div>

          {props.isHot && (
            <div class="absolute top-3 right-3 px-3 py-1 bg-[#22D3EE] text-[#0B1510] text-[11px] font-bold uppercase tracking-[0.08em] rounded-full shadow">
              Hot
            </div>
          )}

          <div class="absolute inset-0 opacity-20 pointer-events-none">
            <div class="absolute inset-0 rounded-[32px] ring-2 ring-transparent" />
          </div>
        </div>
      </div>
    )
  },
})
