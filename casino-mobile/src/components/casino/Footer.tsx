import { defineComponent } from 'vue'
import { Send, Users2 } from 'lucide-vue-next'
import systemSettings from '@/config/systemSettings'

export default defineComponent({
  name: 'Footer',
  setup() {
    return () => (
      <footer class="bg-[#051108] border-t border-[#C5A059] py-8 px-6 text-center">
        <div class="flex justify-center items-center gap-2 mb-6 opacity-50">
          <div class="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-[10px] text-white font-bold">
            18+
          </div>
          <div class="h-8 w-[1px] bg-white/20 mx-2" />
          <div class="text-white/60 text-xs text-left leading-tight">
            Play Responsibly.
            <br />
            Gambling can be addictive.
          </div>
        </div>

        <div class="flex justify-center gap-4 mb-8">
          {systemSettings.telegramLink && (
            <a
              href={systemSettings.telegramLink}
              class="w-10 h-10 rounded-full border border-[#C5A059]/50 bg-white/5 hover:bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center transition-colors"
              aria-label="Telegram"
              rel="noreferrer"
              target="_blank"
            >
              <Send class="w-5 h-5" />
            </a>
          )}

          {systemSettings.microsoftTeamsLink ? (
            <a
              href={systemSettings.microsoftTeamsLink}
              class="w-10 h-10 rounded-full border border-[#C5A059]/50 bg-white/5 hover:bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center transition-colors"
              aria-label="Microsoft Teams"
              rel="noreferrer"
              target="_blank"
            >
              <Users2 class="w-5 h-5" />
            </a>
          ) : (
            <div
              class="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/40 flex items-center justify-center text-[10px] font-semibold select-none"
              aria-label="Microsoft Teams unavailable"
            >
              MS
            </div>
          )}
        </div>

        <p class="text-gray-600 text-[10px]">
          © 2024 VIP Room Casino. All rights reserved.
          <br />
          Licensed and regulated by the Gaming Authority.
        </p>

        <div class="mt-8 bg-[#C5A059] py-3 px-6 -mx-6 -mb-8">
          <p class="text-[#051108] text-xs font-semibold text-center">
            🎰 Welcome to VIP Room • Premium Gaming Experience • 24/7 Support • Secure & Licensed
          </p>
        </div>
      </footer>
    )
  },
})
