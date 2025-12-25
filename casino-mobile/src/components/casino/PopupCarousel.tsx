import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { PopupItem } from '@/utils/popupService'

export default defineComponent({
  name: 'PopupCarousel',
  props: {
    items: { type: Array as PropType<PopupItem[]>, required: true },
  },
  setup(props) {
    const activeIndex = ref(0)
    const startX = ref(0)
    const deltaX = ref(0)

    watch(
      () => props.items,
      () => {
        activeIndex.value = 0
      }
    )

    const clampIndex = (idx: number) => {
      const max = Math.max(props.items.length - 1, 0)
      if (idx < 0) return 0
      if (idx > max) return max
      return idx
    }

    const goTo = (idx: number) => {
      activeIndex.value = clampIndex(idx)
    }

    const next = () => goTo(activeIndex.value + 1)
    const prev = () => goTo(activeIndex.value - 1)

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        startX.value = e.touches[0].clientX
        deltaX.value = 0
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        deltaX.value = e.touches[0].clientX - startX.value
      }
    }

    const onTouchEnd = () => {
      if (Math.abs(deltaX.value) > 40) {
        if (deltaX.value < 0) next()
        else prev()
      }
      deltaX.value = 0
    }

    return () => (
      <div class="relative">
        <div
          class="overflow-hidden rounded-xl border border-white/10 bg-white/5"
          onTouchstart={onTouchStart}
          onTouchmove={onTouchMove}
          onTouchend={onTouchEnd}
        >
          <div
            class="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex.value * 100}%)` }}
          >
            {props.items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                class="min-w-full block"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  src={item.imageUrl}
                  alt="offer"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        {props.items.length > 1 && (
          <div class="flex justify-center gap-2 mt-3">
            {props.items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                class={`w-2 h-2 rounded-full ${idx === activeIndex.value ? 'bg-[#C5A059]' : 'bg-white/30'}`}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
})
