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

        <nav class="w-full px-4 py-4 bg-[#04150d]/85 backdrop-blur-xl border-b border-[#C5A059]/40 shadow-[0_10px_30px_rgba(0,0,0,0.25)]" />
      </header>
    )
  },
})
