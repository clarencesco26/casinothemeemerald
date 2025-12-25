import { defineComponent, type PropType } from 'vue'
import GameCard, { type GameCardProps } from './GameCard'
import greenChip from '@/assets/images/green.png'
import blackChip from '@/assets/images/black.png'

export type Game = {
  id: string | number
} & GameCardProps

export default defineComponent({
  name: 'GameGrid',
  props: {
    title: { type: String, required: true },
    games: {
      type: Array as PropType<Game[]>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="relative py-6 border-b border-[#C5A059]/10 bg-[#051108] overflow-hidden" style={{ maxHeight: '720px' }}>
        <div class="absolute top-[-40px] right-[-130px] w-64 h-64 opacity-100 -rotate-45 scale-y-[-1] scale-x-[-1]">
          <img src={greenChip} alt="decor" class="w-full h-full object-contain" loading="lazy" />
        </div>
        <div class="absolute bottom-[-110px] left-[-90px] w-64 h-64 opacity-100 -rotate-90 ">
          <img src={blackChip} alt="decor" class="w-full h-full object-contain" loading="lazy" />
        </div>

        <div class="px-4 mb-4">
          <h2 class="text-white text-lg font-bold tracking-wide">{props.title}</h2>
        </div>

        <div class="px-4 pb-6 overflow-y-auto no-scrollbar" style={{ maxHeight: '650px' }}>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {props.games.map((game) => (
              <div key={game.id} class="flex justify-center">
                <GameCard
                  brandName={game.brandName}
                  title={game.title}
                  prize={game.prize}
                  prizeDescription={game.prizeDescription}
                  brandImage={game.brandImage}
                  href={game.href}
                  isHot={game.isHot}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
})
