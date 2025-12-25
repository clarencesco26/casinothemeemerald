import { defineComponent } from 'vue'

export default defineComponent(() => {
  return () => (
    <section class="page">
      <h1 class="page-title">Games</h1>
      <div class="grid">
        <div class="tile">Slots</div>
        <div class="tile">Roulette</div>
        <div class="tile">Blackjack</div>
        <div class="tile">Live</div>
      </div>
    </section>
  )
})
