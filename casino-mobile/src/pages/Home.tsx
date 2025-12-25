import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import Navbar from '@/components/casino/Navbar'
import HeroSection from '@/components/casino/HeroSection'
import GameCategories from '@/components/casino/GameCategories'
import GameGrid, { type Game as GameCardType } from '@/components/casino/GameGrid'
import Footer from '@/components/casino/Footer'
import PopupModal from '@/components/casino/PopupModal'
import PopupCarousel from '@/components/casino/PopupCarousel'
import { getPopupSets, pickRandom, type PopupItem } from '@/utils/popupService'
import siteData from '../../site.json'
import { applyRedirectDomain } from '@/config/systemSettings'
import PracticeLobby from '@/components/casino/PracticeLobby'

type BoardCard = GameCardType

const normalizeBoards = (): { categories: string[]; boardsByCategory: Record<string, BoardCard[]> } => {
  const raw = (siteData as any)?.data?.categories ?? []
  const categories: string[] = []
  const boardsByCategory: Record<string, BoardCard[]> = {}

  raw
    .filter(Boolean)
    .sort((a: any, b: any) => (a?.orderNum ?? 0) - (b?.orderNum ?? 0))
    .forEach((cat: any, idx: number) => {
      const catName = cat?.title || `Category ${idx + 1}`
      categories.push(catName)

      const boards = (cat?.boards ?? []).map((b: any, bi: number) => ({
        id: b?.id ?? `${catName}-${bi}`,
        brandName: b?.brandName ?? 'Brand',
        title: b?.title ?? '',
        prize: b?.prize ?? '',
        prizeDescription: b?.prizeDescription ?? '',
        brandImage: b?.brandImage ?? '',
        href: applyRedirectDomain(b?.href ?? ''),
        isHot: Boolean(b?.isPinned),
      })) as BoardCard[]

      boardsByCategory[catName] = boards
    })

  if (!categories.length) {
    categories.push('All Websites')
    boardsByCategory['All Websites'] = []
  }

  return { categories, boardsByCategory }
}

const { categories: mappedCategories, boardsByCategory } = normalizeBoards()

const padToSixteen = (items: BoardCard[]): BoardCard[] => {
  const seed: BoardCard =
    items[0] ?? {
      id: 'seed-1',
      brandName: 'VIP Brand',
      title: 'Exclusive Offer',
      prize: '$100 Bonus',
      prizeDescription: 'Premium entry bonus',
      brandImage: '',
      href: '',
      isHot: true,
    }

  const out = [...items]
  let i = 0
  while (out.length < 16) {
    const base = items[i % items.length] ?? seed
    out.push({
      ...base,
      id: `${base.id ?? 'extra'}-${out.length + 1}`,
      brandName: base.brandName || `VIP Brand ${out.length + 1}`,
      title: base.title || 'Exclusive Offer',
      prize: base.prize || '$100 Bonus',
      prizeDescription: base.prizeDescription || 'Premium entry bonus',
    })
    i += 1
  }
  return out.slice(0, 16)
}

export default defineComponent(() => {
  const activeCategory = ref<string>(mappedCategories[0] || 'All Websites')
  const setActiveCategory = (category: string) => {
    activeCategory.value = category
  }

  const popupVisible = ref(false)
  const popupStage = ref<1 | 2 | 3 | null>(null)
  const firstCarouselItems = ref<PopupItem[]>([])
  const secondCarouselItems = ref<PopupItem[]>([])
  const bigSingleItem = ref<PopupItem | null>(null)

  const setBodyLock = (locked: boolean) => {
    if (locked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  watch(popupVisible, (val) => setBodyLock(val))

  onUnmounted(() => setBodyLock(false))

  const startFlow = () => {
    const { first, bigSingle, second } = getPopupSets()
    firstCarouselItems.value = first
    secondCarouselItems.value = second
    bigSingleItem.value = pickRandom(bigSingle)

    const hasFirst = firstCarouselItems.value.length > 0
    const hasBig = Boolean(bigSingleItem.value)
    const hasSecond = secondCarouselItems.value.length > 0

    if (!hasFirst && !hasBig && !hasSecond) {
      return
    }

    if (hasFirst) {
      popupStage.value = 1
      popupVisible.value = true
      return
    }
    if (hasBig) {
      popupStage.value = 2
      popupVisible.value = true
      return
    }
    if (hasSecond) {
      popupStage.value = 3
      popupVisible.value = true
      return
    }
  }

  const openNextStage = (fromStage: 1 | 2 | 3) => {
    if (fromStage === 1) {
      if (bigSingleItem.value) {
        popupStage.value = 2
        popupVisible.value = true
        return
      }
      if (secondCarouselItems.value.length) {
        popupStage.value = 3
        popupVisible.value = true
        return
      }
      return
    }

    if (fromStage === 2) {
      if (secondCarouselItems.value.length) {
        popupStage.value = 3
        popupVisible.value = true
        return
      }
      return
    }

    // stage 3 done
  }

  const handleClosePopup = () => {
    const closedStage = popupStage.value
    popupVisible.value = false
    popupStage.value = null

    if (closedStage) {
      // slight delay to avoid flicker
      setTimeout(() => openNextStage(closedStage), 150)
    }
  }

  onMounted(() => {
    startFlow()
  })

  const visibleBlocks = computed(() => {
    const selectedBoards = boardsByCategory[activeCategory.value] || []
    const padded = padToSixteen(selectedBoards)
    return {
      a: { title: `${activeCategory.value} (${padded.length} found)`, games: padded },
      b: null,
    }
  })

  return () => (
    <div class="min-h-screen w-full bg-[#051108] font-sans text-white">
      <div class="max-w-md mx-auto bg-[#051108] shadow-2xl min-h-screen relative">
        <Navbar />
        <HeroSection />
        <GameCategories
          activeCategory={activeCategory.value}
          categories={mappedCategories}
          onSelect={setActiveCategory}
        />

        <div class="px-4 pt-4 pb-2 bg-[#051108]">
          <div class="relative">
            <input
              type="text"
              placeholder="Search websites"
              class="w-full rounded-2xl bg-[#0B1A12] border border-[#C5A059]/30 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-[#C5A059] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-5 h-5 text-white/70 absolute right-4 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <div class="min-h-[400px]">
          <GameGrid title={visibleBlocks.value.a.title} games={visibleBlocks.value.a.games} />
        </div>

        <PracticeLobby />

        <Footer />

        {popupVisible.value && popupStage.value === 1 && firstCarouselItems.value.length > 0 && (
          <PopupModal visible title="Exclusive Offers" onClose={handleClosePopup}>
            <PopupCarousel items={firstCarouselItems.value} />
          </PopupModal>
        )}

        {popupVisible.value && popupStage.value === 2 && bigSingleItem.value && (
          <PopupModal visible title="Featured Bonus" onClose={handleClosePopup}>
            <a
              href={bigSingleItem.value.href}
              rel="noreferrer"
              target="_blank"
              class="block overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <img
                src={bigSingleItem.value.imageUrl}
                alt="featured"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </a>
          </PopupModal>
        )}

        {popupVisible.value && popupStage.value === 3 && secondCarouselItems.value.length > 0 && (
          <PopupModal visible title="More Promos" onClose={handleClosePopup}>
            <PopupCarousel items={secondCarouselItems.value} />
          </PopupModal>
        )}
      </div>
    </div>
  )
})

