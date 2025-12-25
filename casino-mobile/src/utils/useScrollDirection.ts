import { ref, onMounted, onUnmounted } from 'vue'

export type ScrollDirection = 'up' | 'down' | 'idle'

export default function useScrollDirection(threshold = 10) {
  const scrollDirection = ref<ScrollDirection>('up')
  const lastScrollY = ref(0)
  const ticking = ref(false)
  const debounceTimer = ref<number | null>(null)

  const updateScrollDirection = () => {
    const currentScrollY = window.scrollY
    const diff = currentScrollY - lastScrollY.value

    if (Math.abs(diff) < threshold) {
      ticking.value = false
      return
    }

    const newDirection = diff > 0 ? 'down' : 'up'
    
    // Clear any pending debounce
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value)
    }
    
    // Debounce direction changes to prevent bouncing
    debounceTimer.value = window.setTimeout(() => {
      if (scrollDirection.value !== newDirection) {
        scrollDirection.value = newDirection
      }
      lastScrollY.value = currentScrollY > 0 ? currentScrollY : 0
    }, 50)
    
    ticking.value = false
  }

  const onScroll = () => {
    if (!ticking.value) {
      window.requestAnimationFrame(updateScrollDirection)
      ticking.value = true
    }
  }

  onMounted(() => {
    lastScrollY.value = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value)
    }
  })

  return scrollDirection
}
