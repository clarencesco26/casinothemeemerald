import { defineComponent, ref, computed, reactive } from 'vue'
import { Gem, Crown, Clover, Coins, Star, Dice5, Heart, Diamond, Club, Spade, Play } from 'lucide-vue-next'

const categories = ['Blackjack', 'Roulette', 'Slots'] as const
const suits = ['♠', '♥', '♦', '♣']

type Category = (typeof categories)[number]

type Card = {
  rank: string
  value: number
  suit: '♠' | '♥' | '♦' | '♣'
}

type BJState = {
  bet: number
  player: Card[]
  dealer: Card[]
  status: 'idle' | 'playing' | 'resolved'
  message: string
}

type RouletteBet = {
  type: 'color' | 'number'
  value: string | number
  amount: number
}

type RouletteState = {
  selectedBet: number
  bets: Record<string, RouletteBet>
  spinning: boolean
  result: { num: number; color: 'red' | 'black' | 'green' } | null
  message: string
}

type SlotState = {
  bet: number
  reels: SlotSymbol[]
  result: string
}

type SlotSymbol = {
  key: string
  Icon: any
}

const slotSymbols: SlotSymbol[] = [
  { key: 'gem', Icon: Gem },
  { key: 'crown', Icon: Crown },
  { key: 'clover', Icon: Clover },
  { key: 'coins', Icon: Coins },
  { key: 'star', Icon: Star },
  { key: 'dice', Icon: Dice5 },
]

const deck: Card[] = (() => {
  const ranks: Array<[string, number]> = [
    ['A', 11],
    ['K', 10],
    ['Q', 10],
    ['J', 10],
    ['10', 10],
    ['9', 9],
    ['8', 8],
    ['7', 7],
    ['6', 6],
    ['5', 5],
    ['4', 4],
    ['3', 3],
    ['2', 2],
  ]
  const suits: Card['suit'][] = ['♠', '♥', '♦', '♣']
  const d: Card[] = []
  suits.forEach((suit) => {
    ranks.forEach(([rank, value]) => d.push({ rank, value, suit }))
  })
  return d
})()

function drawCard(): Card {
  return deck[Math.floor(Math.random() * deck.length)]!
}

function total(hand: Card[]) {
  const values = hand.map((c) => c.value)
  let sum = values.reduce((a, b) => a + b, 0)
  while (sum > 21 && values.includes(11)) {
    const idx = values.indexOf(11)
    if (idx >= 0) {
      values[idx] = 1
      sum = values.reduce((a, b) => a + b, 0)
    } else break
  }
  return sum
}

export default defineComponent({
  name: 'PracticeLobby',
  setup() {
    const balance = ref(10000)
    const active = ref<Category>('Blackjack')

    const blackjack = reactive<BJState>({ bet: 500, player: [], dealer: [], status: 'idle', message: '' })
    const roulette = reactive<RouletteState>({ selectedBet: 50, bets: {}, spinning: false, result: null, message: '' })
    const slots = reactive<SlotState>({ bet: 200, reels: [slotSymbols[0]!, slotSymbols[1]!, slotSymbols[2]!], result: '' })

    const isBroke = computed(() => balance.value <= 0)

    const popupMessage = computed(() => {
      if (balance.value >= 100000) return 'Congratulations, You are now a true gambler!'
      if (balance.value <= 0) return 'Better luck next time!'
      return ''
    })

    const suitIcons: Record<Card['suit'], any> = {
      '♠': Spade,
      '♥': Heart,
      '♦': Diamond,
      '♣': Club,
    }

    const renderCard = (card: Card, idx: number, hidden = false) => {
      const isRed = card.suit === '♥' || card.suit === '♦'
      const SuitIcon = suitIcons[card.suit]
      return (
        <div
          key={`${card.rank}-${card.suit}-${idx}`}
          class={`w-16 h-24 max-[420px]:w-14 max-[420px]:h-20 rounded-xl relative overflow-hidden border ${hidden ? 'border-[#C5A059]' : 'border-white/20'} shadow-[0_10px_22px_rgba(0,0,0,0.45)] bg-white`}
        >
          {hidden ? (
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C5A059] via-[#F4E4B8] to-[#C5A059] text-[#051108] font-extrabold text-2xl">
              <Gem class="w-6 h-6" />
            </div>
          ) : (
            <div class="w-full h-full flex flex-col items-center justify-between py-2 text-[#051108]">
              <div class={`text-xl font-bold ${isRed ? 'text-[#DC2626]' : 'text-[#051108]'}`}>{card.rank}</div>
              <div class={`text-2xl ${isRed ? 'text-[#DC2626]' : 'text-[#051108]'}`}>
                <SuitIcon class="w-5 h-5" />
              </div>
              <div class={`text-sm font-semibold ${isRed ? 'text-[#DC2626]' : 'text-[#051108]'}`}>{card.rank}</div>
            </div>
          )}
          <div class="absolute inset-0 pointer-events-none opacity-30" style="background: radial-gradient(circle at 30% 30%, rgba(197,160,89,0.25), transparent 50%);"></div>
        </div>
      )
    }

    const clampBet = (bet: number) => Math.max(10, Math.min(bet, Math.max(balance.value, 10)))

    const startBlackjack = () => {
      if (isBroke.value) return
      blackjack.bet = clampBet(blackjack.bet)
      blackjack.player = [drawCard(), drawCard()]
      blackjack.dealer = [drawCard(), drawCard()]
      blackjack.status = 'playing'
      blackjack.message = ''
    }

    const settleBlackjack = () => {
      const p = total([...blackjack.player])
      const d = total([...blackjack.dealer])
      if (p > 21) {
        balance.value -= blackjack.bet
        blackjack.message = 'Player busts. Dealer wins.'
      } else if (d > 21 || p > d) {
        balance.value += blackjack.bet
        blackjack.message = 'Player wins!'
      } else if (p < d) {
        balance.value -= blackjack.bet
        blackjack.message = 'Dealer wins.'
      } else {
        blackjack.message = 'Push.'
      }
      blackjack.status = 'resolved'
    }

    const hit = () => {
      if (blackjack.status !== 'playing') return
      blackjack.player.push(drawCard())
      if (total([...blackjack.player]) > 21) {
        settleBlackjack()
      }
    }

    const stand = () => {
      if (blackjack.status !== 'playing') return
      while (total([...blackjack.dealer]) < 17) {
        blackjack.dealer.push(drawCard())
      }
      settleBlackjack()
    }

    const redNumbers = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])
    const rouletteNumbers = Array.from({ length: 37 }, (_, i) => i)

    const totalRouletteBet = computed(() =>
      Object.values(roulette.bets).reduce((sum, bet) => sum + bet.amount, 0)
    )

    const placeRouletteBet = (type: 'color' | 'number', value: string | number) => {
      if (isBroke.value || roulette.spinning) return
      const nextTotal = totalRouletteBet.value + roulette.selectedBet
      if (nextTotal > balance.value) return
      const key = `${type}-${value}`
      const existing = roulette.bets[key]
      roulette.bets = {
        ...roulette.bets,
        [key]: {
          type,
          value,
          amount: (existing?.amount ?? 0) + roulette.selectedBet,
        },
      }
    }

    const clearRouletteBets = () => {
      roulette.bets = {}
    }

    const spinRoulette = () => {
      if (roulette.spinning || !Object.keys(roulette.bets).length || isBroke.value) return
      const totalBet = totalRouletteBet.value
      if (totalBet <= 0 || totalBet > balance.value) return
      balance.value -= totalBet
      roulette.spinning = true
      roulette.message = ''

      setTimeout(() => {
        const num = rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)] as number
        const color: 'red' | 'black' | 'green' = num === 0 ? 'green' : redNumbers.has(num) ? 'red' : 'black'
        roulette.result = { num, color }

        let totalWin = 0
        Object.values(roulette.bets).forEach((bet) => {
          if (bet.type === 'number' && bet.value === num) {
            totalWin += bet.amount * 36
          } else if (bet.type === 'color' && bet.value === color) {
            totalWin += bet.amount * 2
          }
        })

        if (totalWin > 0) {
          balance.value += totalWin
          roulette.message = `Win $${totalWin.toLocaleString()}`
        } else {
          roulette.message = 'No win this spin.'
        }

        roulette.spinning = false
        roulette.bets = {}
      }, 1200)
    }

    const spinSlots = () => {
      if (isBroke.value) return
      slots.bet = clampBet(slots.bet)
      const reels = [slotSymbols, slotSymbols, slotSymbols].map((s) => s[Math.floor(Math.random() * s.length)]).filter((r) => r !== undefined) as SlotSymbol[]
      slots.reels = reels
      const [a, b, c] = reels
      if (a && b && c && a.key === b.key && b.key === c.key) {
        const win = slots.bet * 5
        balance.value += win
        slots.result = `Jackpot! +$${win}`
      } else if (a && b && c && (a.key === b.key || b.key === c.key || a.key === c.key)) {
        const win = slots.bet * 2
        balance.value += win
        slots.result = `Nice hit! +$${win}`
      } else {
        balance.value -= slots.bet
        slots.result = `No win. -$${slots.bet}`
      }
    }

    const resetPracticeBalance = () => {
      balance.value = 10000
      blackjack.player = []
      blackjack.dealer = []
      blackjack.status = 'idle'
      blackjack.message = ''
      roulette.bets = {}
      roulette.spinning = false
      roulette.result = null
      roulette.message = ''
      slots.result = ''
      slots.reels = [slotSymbols[0]!, slotSymbols[1]!, slotSymbols[2]!]
    }

    return () => (
      <div class="relative">
        <section class="mt-[50px] px-4 mb-[50px] bg-[#051108]">
          <div class="relative overflow-hidden rounded-3xl border border-[#C5A059]/40 bg-gradient-to-b from-[#0C1A12] via-[#07130E] to-[#050C08] p-5 shadow-[0_20px_40px rgba(0,0,0,0.55)]">
          <div class="absolute inset-0 pointer-events-none opacity-50" style="background: radial-gradient(circle at 20% 20%, rgba(197,160,89,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05), transparent 35%), linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0));" />
          <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-soft-light" style="background-image: url('data:image/svg+xml,%3Csvg width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M0 39.5H40V40H0z%27 fill=%27%23ffffff%27 fill-opacity=%270.08%27/%3E%3C/svg%3E');" />

          <div class="relative flex items-start justify-between mb-4">
            <div>
              <h2 class="text-white text-xl font-bold tracking-tight">Casino Practice Lobby</h2>
              <p class="text-white/60 text-sm mt-1">Play calm, collect bonuses, stay elite.</p>
            </div>
          </div>

          <div class="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                class={`px-3 py-2 rounded-2xl border transition duration-200 ${
                  active.value === cat
                    ? 'border-[#C5A059] bg-gradient-to-r from-[#C5A059]/25 to-[#E8D2A6]/20 text-[#E8D2A6] shadow-[0_10px_24px_rgba(197,160,89,0.28)]'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-[#C5A059]/60 hover:text-[#E8D2A6]'
                }`}
                onClick={() => (active.value = cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div class="flex items-center justify-between mb-4 text-sm text-white/80">
            <span class="font-medium text-white">Balance: ${balance.value.toLocaleString()}</span>
            {popupMessage.value && (
              <div class="text-[11px] px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#FCD34D] font-semibold shadow-[0_6px_16px_rgba(197,160,89,0.25)]">
                {popupMessage.value}
              </div>
            )}
          </div>

          {active.value === 'Blackjack' && (
            <div class="space-y-5 text-white/80 text-sm">
              <div class="rounded-3xl p-5 relative overflow-hidden border border-[#C5A059]/50 bg-gradient-to-br from-[#013220] via-[#0A1A12] to-[#051108] shadow-[0_20px_38px_rgba(0,0,0,0.55)]">
                <div class="absolute inset-0 opacity-15 pointer-events-none" style="background: radial-gradient(circle at 20% 20%, rgba(197,160,89,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05), transparent 40%);"></div>
                <div class="absolute inset-0 opacity-08 pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M0 39.5H40V40H0z%27 fill=%27%23ffffff%27 fill-opacity=%270.08%27/%3E%3C/svg%3E');"></div>

                <div class="relative flex items-start justify-between mb-4">
                  <div>
                    <div class="flex items-center gap-2 text-xs text-[#E8D2A6] uppercase tracking-[0.08em]">
                      <span>Blackjack</span>
                      <span class="w-1 h-1 rounded-full bg-[#E8D2A6]"></span>
                      <span>High Roller</span>
                    </div>
                    <h3 class="text-white text-xl font-bold tracking-tight">Emerald Blackjack</h3>
                    <p class="text-white/60 text-xs mt-1">Get 21 or beat the dealer.</p>
                  </div>
                  <div class="text-right text-xs text-white/60">
                    <div>Status</div>
                    <div class="text-[#FCD34D] font-semibold capitalize">{blackjack.status}</div>
                  </div>
                </div>

                <div class="grid gap-4">
                  <div class="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div class="text-white font-semibold mb-2">Dealer</div>
                    <div class="hidden min-[370px]:grid grid-cols-2 gap-5 sm:gap-3 justify-items-center">
                      {blackjack.dealer.length ? (
                        blackjack.dealer.map((card, idx) => renderCard(card, idx, blackjack.status === 'playing' && idx === 1))
                      ) : (
                        <span class="text-white/40">No cards yet</span>
                      )}
                    </div>
                    <div class="flex min-[370px]:hidden flex-wrap gap-5 justify-start">
                      {blackjack.dealer.length ? (
                        blackjack.dealer.map((card, idx) => {
                          const SuitIcon = suitIcons[card.suit]
                          const isRed = card.suit === '♥' || card.suit === '♦'
                          return (
                            <div
                              key={`dealer-compact-${idx}`}
                              class={`px-2 py-1 rounded-lg border border-[#C5A059]/40 bg-white/5 text-[12px] font-semibold flex items-center gap-1 ${
                                isRed ? 'text-[#F87171]' : 'text-white'
                              }`}
                            >
                              <span>{card.rank}</span>
                              <SuitIcon class="w-3 h-3" />
                            </div>
                          )
                        })
                      ) : (
                        <span class="text-white/40 text-xs">No cards yet</span>
                      )}
                    </div>
                    <div class="mt-2 text-[11px] sm:text-xs text-white/60 leading-tight text-right">
                      Total {blackjack.status === 'playing' ? '??' : total([...blackjack.dealer]) || 0}
                    </div>
                  </div>

                  <div class="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div class="text-white font-semibold mb-2">Your Hand</div>
                    <div class="hidden min-[370px]:grid grid-cols-2 gap-5 sm:gap-3 justify-items-center">
                      {blackjack.player.length ? (
                        blackjack.player.map((card, idx) => renderCard(card, idx))
                      ) : (
                        <span class="text-white/40">No cards yet</span>
                      )}
                    </div>
                    <div class="flex min-[370px]:hidden flex-wrap gap-5 justify-start">
                      {blackjack.player.length ? (
                        blackjack.player.map((card, idx) => {
                          const SuitIcon = suitIcons[card.suit]
                          const isRed = card.suit === '♥' || card.suit === '♦'
                          return (
                            <div
                              key={`player-compact-${idx}`}
                              class={`px-2 py-1 rounded-lg border border-[#C5A059]/40 bg-white/5 text-[12px] font-semibold flex items-center gap-1 ${
                                isRed ? 'text-[#F87171]' : 'text-white'
                              }`}
                            >
                              <span>{card.rank}</span>
                              <SuitIcon class="w-3 h-3" />
                            </div>
                          )
                        })
                      ) : (
                        <span class="text-white/40 text-xs">No cards yet</span>
                      )}
                    </div>
                    <div class="mt-2 text-[11px] sm:text-xs text-white/60 leading-tight text-right">
                      Total {total([...blackjack.player]) || 0}
                    </div>
                  </div>
                </div>

                <div class="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div class="flex flex-wrap items-start gap-3 flex-1">
                    <label class="text-white/70">Bet</label>
                    <input
                      type="number"
                      min="10"
                      class="w-24 px-3 py-2 rounded-lg border border-[#C5A059]/30 bg-[#0B1A12] text-white focus:border-[#C5A059] focus:outline-none"
                      value={blackjack.bet}
                      onInput={(e: Event) => (blackjack.bet = Number((e.target as HTMLInputElement).value) || 0)}
                      disabled={isBroke.value || blackjack.status === 'playing'}
                    />
                    <div class="flex gap-2 flex-wrap">
                      {[50, 100, 250].map((chip) => (
                        <button
                          key={chip}
                          class={`px-3 py-2 rounded-xl border text-xs transition ${
                            blackjack.bet === chip
                              ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#E8D2A6]'
                              : 'border-white/10 bg-white/5 text-white/70 hover:border-[#C5A059]/60 hover:text-[#E8D2A6]'
                          }`}
                          onClick={() => (blackjack.bet = chip)}
                          disabled={isBroke.value || blackjack.status === 'playing'}
                        >
                          ${chip}
                        </button>
                      ))}
                    </div>
                  </div>

                {blackjack.status === 'playing' ? (
                  <div class="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex-1">
                    <button
                      class={`w-full px-4 py-3 rounded-2xl font-semibold text-base transition duration-150 ${
                        isBroke.value
                          ? 'bg-white/10 text-white/40 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#C5A059] via-[#F4E4B8] to-[#C5A059] text-[#0B1510] shadow-[0_12px_24px_rgba(197,160,89,0.35)] hover:translate-y-[1px]'
                      }`}
                      onClick={hit}
                      disabled={isBroke.value}
                    >
                      Hit
                    </button>
                    <button
                      class={`w-full px-4 py-3 rounded-2xl font-semibold text-base transition duration-150 ${
                        isBroke.value
                          ? 'bg-white/10 text-white/40 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#013220] to-[#051108] text-[#C5A059] border border-[#C5A059]/70 hover:translate-y-[1px]'
                      }`}
                      onClick={stand}
                      disabled={isBroke.value}
                    >
                      Stand
                    </button>
                  </div>
                ) : (
                    <button
                      class={`w-full sm:w-auto flex-1 px-4 py-3 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition duration-150 ${
                        isBroke.value
                          ? 'bg-white/10 text-white/40 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#C5A059] via-[#F4E4B8] to-[#C5A059] text-[#0B1510] shadow-[0_14px_28px_rgba(197,160,89,0.4)] hover:translate-y-[1px]'
                      }`}
                      onClick={startBlackjack}
                      disabled={isBroke.value}
                    >
                      {blackjack.status === 'resolved' ? 'New Hand' : `Deal $${blackjack.bet}`}
                    </button>
                  )}
                </div>

                {blackjack.message && (
                  <div class="mt-3 text-center text-base font-semibold text-[#FCD34D]">
                    {blackjack.message}
                  </div>
                )}
              </div>
            </div>
          )}

          {active.value === 'Roulette' && (
            <div class="space-y-5 text-white/80 text-sm">
              <div class="rounded-3xl p-5 relative overflow-hidden border border-[#C5A059]/50 bg-gradient-to-br from-[#013220] via-[#0A1A12] to-[#051108] shadow-[0_20px_38px_rgba(0,0,0,0.55)]">
                <div class="absolute inset-0 opacity-15 pointer-events-none" style="background: radial-gradient(circle at 20% 20%, rgba(197,160,89,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05), transparent 40%);"></div>
                <div class="absolute inset-0 opacity-08 pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M0 39.5H40V40H0z%27 fill=%27%23ffffff%27 fill-opacity=%270.08%27/%3E%3C/svg%3E');"></div>

                <div class="relative flex items-start justify-between mb-4">
                  <div>
                    <div class="flex items-center gap-2 text-xs text-[#E8D2A6] uppercase tracking-[0.08em]">
                      <span>Roulette</span>
                      <span class="w-1 h-1 rounded-full bg-[#E8D2A6]"></span>
                      <span>High Roller</span>
                    </div>
                    <h3 class="text-white text-xl font-bold tracking-tight">Emerald Roulette</h3>
                    <p class="text-white/60 text-xs mt-1">Place bets, spin, and chase the wheel.</p>
                  </div>
                  <div class="text-right text-xs text-white/60">
                    <div>Total Bet</div>
                    <div class="text-[#FCD34D] font-semibold">${totalRouletteBet.value.toLocaleString()}</div>
                  </div>
                </div>

                <div class="flex items-center justify-center py-4">
                  <div class={`relative w-44 h-44 rounded-full border-4 border-[#C5A059] shadow-[0_16px_34px_rgba(0,0,0,0.55)] ${roulette.spinning ? 'animate-spin' : ''}`}
                    style="background: conic-gradient(from 0deg, #DC2626 0deg, #000000 10deg, #DC2626 20deg, #000000 30deg, #DC2626 40deg, #000000 50deg, #DC2626 60deg, #000000 70deg, #DC2626 80deg, #000000 90deg, #DC2626 100deg, #000000 110deg, #DC2626 120deg, #000000 130deg, #DC2626 140deg, #000000 150deg, #DC2626 160deg, #000000 170deg, #DC2626 180deg, #000000 190deg, #DC2626 200deg, #000000 210deg, #DC2626 220deg, #000000 230deg, #DC2626 240deg, #000000 250deg, #DC2626 260deg, #000000 270deg, #DC2626 280deg, #000000 290deg, #DC2626 300deg, #000000 310deg, #DC2626 320deg, #000000 330deg, #DC2626 340deg, #000000 350deg); animation-duration: 1.2s;">
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-14 h-14 rounded-full bg-gradient-to-br from-[#C5A059] via-[#F4E4B8] to-[#C5A059] text-[#051108] font-bold text-xl flex items-center justify-center">
                        {roulette.result ? roulette.result.num : '?'}
                      </div>
                    </div>
                  </div>
                </div>

                {roulette.result && !roulette.spinning && (
                  <div class="text-center text-base font-semibold text-[#FCD34D] mb-2 flex items-center justify-center gap-2">
                    <span>Result:</span>
                    <span class={`w-3 h-3 rounded-full inline-block ${
                      roulette.result.color === 'red'
                        ? 'bg-red-500'
                        : roulette.result.color === 'black'
                        ? 'bg-black'
                        : 'bg-green-500'
                    }`}></span>
                    <span>{roulette.result.num}</span>
                  </div>
                )}

                {roulette.message && (
                  <div class="text-center text-sm text-[#E8D2A6]">{roulette.message}</div>
                )}

                <div class="mt-4 space-y-3">
                  <div class="flex flex-wrap items-start gap-3">
                    <label class="text-white/70">Bet</label>
                    <input
                      type="number"
                      min="10"
                      class="w-24 px-3 py-2 rounded-lg border border-[#C5A059]/30 bg-[#0B1A12] text-white focus:border-[#C5A059] focus:outline-none"
                      value={roulette.selectedBet}
                      onInput={(e: Event) => (roulette.selectedBet = Number((e.target as HTMLInputElement).value) || 0)}
                      disabled={isBroke.value || roulette.spinning}
                    />
                    <div class="flex gap-2 flex-wrap">
                      {[50, 100, 250].map((chip) => (
                        <button
                          key={chip}
                          class={`px-3 py-2 rounded-xl border text-xs transition ${
                            roulette.selectedBet === chip
                              ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#E8D2A6]'
                              : 'border-white/10 bg-white/5 text-white/70 hover:border-[#C5A059]/60 hover:text-[#E8D2A6]'
                          }`}
                          onClick={() => (roulette.selectedBet = chip)}
                          disabled={isBroke.value || roulette.spinning}
                        >
                          ${chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <button
                      class={`relative py-3 px-4 rounded-xl font-semibold text-sm transition ${
                        roulette.spinning ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[1px]'
                      } ${'border border-[#C5A059] bg-gradient-to-br from-[#C5A059]/20 to-[#C5A059]/10 text-[#E8D2A6]'}`}
                      onClick={() => placeRouletteBet('color', 'red')}
                      disabled={roulette.spinning || isBroke.value}
                    >
                      Red (2x)
                      {roulette.bets['color-red'] && (
                        <div class="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-[#051108] border border-[#C5A059] text-[#C5A059]">
                          ${roulette.bets['color-red'].amount}
                        </div>
                      )}
                    </button>
                    <button
                      class={`relative py-3 px-4 rounded-xl font-semibold text-sm transition ${
                        roulette.spinning ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[1px]'
                      } ${'border border-[#C5A059] bg-gradient-to-br from-[#0B0B0B] to-[#051108] text-[#E8D2A6]'}`}
                      onClick={() => placeRouletteBet('color', 'black')}
                      disabled={roulette.spinning || isBroke.value}
                    >
                      Black (2x)
                      {roulette.bets['color-black'] && (
                        <div class="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-[#051108] border border-[#C5A059] text-[#C5A059]">
                          ${roulette.bets['color-black'].amount}
                        </div>
                      )}
                    </button>
                  </div>

                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[0, 3, 7, 12, 18, 21, 27, 32].map((num) => (
                      <button
                        key={num}
                        class={`relative py-3 px-3 rounded-xl font-semibold text-xs transition border ${
                          roulette.spinning ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[1px]'
                        } ${'border-[#C5A059]/60 bg-white/5 text-white/80'}`}
                        onClick={() => placeRouletteBet('number', num)}
                        disabled={roulette.spinning || isBroke.value}
                      >
                        {num} (36x)
                        {roulette.bets[`number-${num}`] && (
                          <div class="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#051108] border border-[#C5A059] text-[#C5A059]">
                            ${roulette.bets[`number-${num}`]?.amount}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div class="flex items-center justify-between text-xs text-white/70">
                    <span>Total Bet: ${totalRouletteBet.value.toLocaleString()}</span>
                    <button
                      class="underline text-[#E8D2A6] disabled:opacity-40"
                      onClick={clearRouletteBets}
                      disabled={roulette.spinning || !Object.keys(roulette.bets).length}
                    >
                      Clear all
                    </button>
                  </div>

                  <button
                    class={`w-full px-4 py-3 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition duration-150 ${
                      roulette.spinning || isBroke.value || !Object.keys(roulette.bets).length
                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#C5A059] via-[#F4E4B8] to-[#C5A059] text-[#0B1510] shadow-[0_14px_28px_rgba(197,160,89,0.4)] hover:translate-y-[1px]'
                    }`}
                    onClick={spinRoulette}
                    disabled={roulette.spinning || isBroke.value || !Object.keys(roulette.bets).length}
                  >
                    {roulette.spinning ? 'Spinning...' : 'Spin Wheel'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {active.value === 'Slots' && (
            <div class="space-y-5 text-white/80 text-sm">
              <div class="rounded-3xl p-5 relative overflow-hidden border border-[#C5A059]/50 bg-gradient-to-br from-[#013220] via-[#0A1A12] to-[#051108] shadow-[0_20px_38px_rgba(0,0,0,0.55)]">
                <div class="absolute inset-0 opacity-20 pointer-events-none" style="background: radial-gradient(circle at 20% 20%, rgba(197,160,89,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.06), transparent 40%);"></div>
                <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M0 39.5H40V40H0z%27 fill=%27%23ffffff%27 fill-opacity=%270.08%27/%3E%3C/svg%3E');"></div>

                <div class="relative flex items-start justify-between mb-4">
                  <div>
                    <div class="flex items-center gap-2 text-xs text-[#E8D2A6] uppercase tracking-[0.08em]">
                      <span>Slots</span>
                      <span class="w-1 h-1 rounded-full bg-[#E8D2A6]"></span>
                      <span>High Roller</span>
                    </div>
                    <h3 class="text-white text-xl font-bold tracking-tight">Emerald Slots</h3>
                    <p class="text-white/60 text-xs mt-1">Match 3 symbols to win big.</p>
                  </div>
                  <div class="text-right text-xs text-white/60">
                    <div>Jackpot</div>
                    <div class="text-[#FCD34D] font-semibold">x5</div>
                  </div>
                </div>

                <div class="flex items-center justify-center gap-3 py-4 px-3 rounded-2xl border border-white/10 bg-black/20 shadow-inner">
                  {slots.reels.map((r, idx) => (
                    <div
                      key={idx}
                      class="w-20 h-20 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-[0_12px_26px_rgba(0,0,0,0.45)]"
                    >
                      <r.Icon class="w-9 h-9 text-[#E8D2A6]" />
                    </div>
                  ))}
                </div>

                <div class="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div class="flex flex-wrap items-start gap-3">
                    <label class="text-white/70">Bet</label>
                    <input
                      type="number"
                      min="10"
                      class="w-24 px-3 py-2 rounded-lg border border-[#C5A059]/30 bg-[#0B1A12] text-white focus:border-[#C5A059] focus:outline-none"
                      value={slots.bet}
                      onInput={(e: Event) => (slots.bet = Number((e.target as HTMLInputElement).value) || 0)}
                      disabled={isBroke.value}
                    />
                    <div class="flex gap-2 flex-wrap">
                      {[50, 100, 250].map((chip) => (
                        <button
                          key={chip}
                          class={`px-3 py-2 rounded-xl border text-xs transition ${
                            slots.bet === chip
                              ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#E8D2A6]'
                              : 'border-white/10 bg-white/5 text-white/70 hover:border-[#C5A059]/60 hover:text-[#E8D2A6]'
                          }`}
                          onClick={() => (slots.bet = chip)}
                          disabled={isBroke.value}
                        >
                          ${chip}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    class={`w-full sm:w-auto flex-1 px-4 py-3 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition duration-150 ${
                      isBroke.value
                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#C5A059] via-[#F4E4B8] to-[#C5A059] text-[#0B1510] shadow-[0_14px_28px_rgba(197,160,89,0.4)] hover:translate-y-[1px]'
                    }`}
                    onClick={spinSlots}
                    disabled={isBroke.value}
                  >
                    <Play class="w-5 h-5" />
                    {isBroke.value ? 'Add Balance to Spin' : `Spin $${slots.bet}`}
                  </button>
                </div>
              </div>

              <div class="rounded-2xl p-4 border border-[#C5A059]/30 bg-white/5">
                <h4 class="text-xs font-semibold text-[#E8D2A6] mb-3 tracking-[0.08em]">PAYTABLE</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-white flex items-center gap-1">
                      <Gem class="w-4 h-4" /> <Gem class="w-4 h-4" /> <Gem class="w-4 h-4" />
                    </span>
                    <span class="text-[#C5A059]">10x Bet</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-white flex items-center gap-1">
                      <Crown class="w-4 h-4" /> <Crown class="w-4 h-4" /> <Crown class="w-4 h-4" /> (or any 3)
                    </span>
                    <span class="text-[#C5A059]">5x Bet</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-white">Any 2 match</span>
                    <span class="text-[#C5A059]">2x Bet</span>
                  </div>
                </div>
              </div>

              {slots.result && <div class="text-[#FCD34D] text-sm">{slots.result}</div>}
            </div>
          )}
        </div>
      </section>

      {isBroke.value && (
        <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div class="relative w-full max-w-sm rounded-3xl border border-[#C5A059]/50 bg-gradient-to-b from-[#0C1A12] via-[#07130E] to-[#050C08] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.65)]">
            <div class="flex items-center justify-between mb-2">
              <div class="text-xs uppercase tracking-[0.12em] text-[#E8D2A6]">Practice Balance</div>
              <div class="text-xs text-white/60">Status</div>
            </div>
            <h3 class="text-white text-xl font-bold">Better luck next time</h3>
            <p class="text-white/70 text-sm mt-2">Your practice balance is empty. Refresh to reload your stack and keep playing.</p>

            <div class="mt-4 flex flex-col gap-2">
              <button
                class="w-full px-4 py-3 rounded-2xl font-semibold text-base bg-gradient-to-r from-[#C5A059] via-[#F4E4B8] to-[#C5A059] text-[#0B1510] shadow-[0_14px_28px_rgba(197,160,89,0.4)] hover:translate-y-[1px] transition"
                  onClick={resetPracticeBalance}
              >
                Refresh Balance
              </button>
              <div class="text-center text-xs text-white/50">You can’t place bets until you refresh.</div>
            </div>
          </div>
        </div>
      )}
    </div>
    )
  },
})
