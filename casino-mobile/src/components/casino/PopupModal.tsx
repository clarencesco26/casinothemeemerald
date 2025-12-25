import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'PopupModal',
  props: {
    visible: { type: Boolean, required: true },
    title: { type: String, default: '' },
    onClose: { type: Function as PropType<() => void>, required: true },
  },
  setup(props, { slots }) {
    if (!props.visible) return () => null

    return () => (
      <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          class="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-100 transition-opacity duration-200"
          onClick={props.onClose}
        />

        <div class="relative w-full max-w-md">
          <div class="pointer-events-auto bg-[#0B1A0F]/90 backdrop-blur-xl text-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.4)] border border-[#C5A059]/35 overflow-hidden transform transition-all duration-250 ease-out translate-y-0 scale-100 vip-noise">
            <div class="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <span class="text-xs uppercase tracking-[0.22em] text-white/70 font-semibold">{props.title}</span>
              <button
                type="button"
                class="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-[#C5A059]/50 transition-colors"
                aria-label="Close popup"
                onClick={props.onClose}
              >
                <span class="text-lg leading-none">×</span>
              </button>
            </div>

            <div class="p-3">{slots.default?.()}</div>
          </div>
        </div>
      </div>
    )
  },
})
