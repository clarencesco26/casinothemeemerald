import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MarqueeBanner',
  props: {
    text: { type: String, required: true },
    visible: { type: Boolean, required: true },
  },
  setup(props) {
    return () => (
      <div
        class={
          'w-full bg-[#013220] border-b border-[#C5A059]/30 overflow-hidden transition-all duration-150 ease-out ' +
          (props.visible ? 'max-h-[32px] opacity-100' : 'max-h-0 opacity-0')
        }
        style={{ willChange: 'max-height, opacity' }}
      >
        <div class="whitespace-nowrap h-[32px]">
          <div class="inline-flex animate-marquee" style={{ transform: 'translateZ(0)' }}>
            <div class="flex items-center shrink-0 whitespace-nowrap">
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index} class="px-4 py-2 text-[11px] font-bold tracking-[0.25em] text-[#C5A059]">
                  {props.text}
                  <span class="px-4 opacity-60">•</span>
                </span>
              ))}
            </div>
            <div class="flex items-center shrink-0 whitespace-nowrap" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index} class="px-4 py-2 text-[11px] font-bold tracking-[0.25em] text-[#C5A059]">
                  {props.text}
                  <span class="px-4 opacity-60">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
})
