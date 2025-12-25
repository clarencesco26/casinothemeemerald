import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'GameCategories',
  props: {
    activeCategory: {
      type: String,
      required: true,
    },
    categories: {
      type: Array as PropType<string[]>,
      required: true,
    },
    onSelect: {
      type: Function as PropType<(category: string) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="w-full bg-[#051108] border-b border-[#C5A059]/20">
        <div class="flex justify-between px-4 overflow-x-auto no-scrollbar gap-2">
          {props.categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => props.onSelect(category)}
              class="relative px-4 py-4 flex-1 text-center min-w-[110px] rounded-2xl transition-all duration-300"
            >
              <span
                class={
                  `relative z-10 text-sm font-semibold tracking-[0.08em] transition-colors duration-300 ` +
                  (props.activeCategory === category ? 'text-[#C5A059]' : 'text-gray-400')
                }
              >
                {category}
              </span>
              {props.activeCategory === category && (
                <>
                  <div class="absolute inset-0 bg-gradient-to-t from-[#C5A059]/10 via-transparent to-transparent rounded-2xl" />
                  <div class="absolute bottom-1 left-6 right-6 h-[3px] rounded-full bg-gradient-to-r from-[#C5A059] via-[#FBBF24] to-[#6EE7B7] shadow-[0_0_12px_rgba(197,160,89,0.6)]" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  },
})
