import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'MobileLayout',
  setup(_props, { slots }) {
    return () => (
      <div class="app-shell">
        <header class="app-header">
          <div class="app-title">Casino</div>
        </header>

        <main class="app-main">{slots.default?.()}</main>

        <nav class="app-nav" aria-label="Primary">
          <RouterLink class="nav-item" to="/">
            Home
          </RouterLink>
          <RouterLink class="nav-item" to="/games">
            Games
          </RouterLink>
          <RouterLink class="nav-item" to="/wallet">
            Wallet
          </RouterLink>
        </nav>
      </div>
    )
  },
})
