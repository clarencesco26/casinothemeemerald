import { defineComponent, computed, shallowRef } from 'vue'
import useScrollDirection from '@/utils/useScrollDirection'
import MarqueeBanner from '@/components/casino/MarqueeBanner'

export default defineComponent({
  name: 'Navbar',
  setup() {
    const bannerText = shallowRef('WELCOME TO VIP ROOM')
    const scrollDirection = useScrollDirection(50)

    const bannerVisible = computed(() => scrollDirection.value !== 'down')

    return () => (
      <header class="sticky top-0 z-50 w-full" style={{ contain: 'layout' }}>
        <MarqueeBanner text={bannerText.value} visible={bannerVisible.value} />

        <nav class="w-full px-4 py-4 flex items-center justify-between bg-[#04150d]/85 backdrop-blur-xl border-b border-[#C5A059]/40 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8A6E36] flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.35)]">
              <span class="text-[#051108] font-black text-lg font-display">V</span>
            </div>
            <span class="text-white font-black text-lg tracking-[0.08em] font-display">
              VIP<span class="text-[#C5A059]">ROOM</span>
            </span>
          </div>
        </nav>
      </header>
    )
  },
})
