import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { GameCategories } from '../components/GameCategories';
import { GameGrid } from '../components/GameGrid';
import { VIPCta } from '../components/VIPCta';
import { SupportSection } from '../components/SupportSection';
import { Footer } from '../components/Footer';
// Mock Data
const slotsData = [{
  id: '1',
  name: 'Emerald Fortune',
  minStake: '$50',
  image: 'from-green-900 to-emerald-600',
  isHot: true
}, {
  id: '2',
  name: 'Golden Pharaoh',
  minStake: '$25',
  image: 'from-yellow-700 to-yellow-500'
}, {
  id: '3',
  name: 'Royal Sevens',
  minStake: '$100',
  image: 'from-purple-900 to-purple-600',
  isHot: true
}, {
  id: '4',
  name: "Dragon's Hoard",
  minStake: '$40',
  image: 'from-red-900 to-red-600'
}, {
  id: '5',
  name: 'Mystic Moon',
  minStake: '$30',
  image: 'from-blue-900 to-blue-600'
}];
const tableData = [{
  id: '6',
  name: 'VIP Blackjack',
  minStake: '$200',
  image: 'from-gray-900 to-gray-700',
  isHot: true
}, {
  id: '7',
  name: 'European Roulette',
  minStake: '$50',
  image: 'from-red-900 to-black'
}, {
  id: '8',
  name: 'Baccarat Gold',
  minStake: '$150',
  image: 'from-yellow-800 to-yellow-600'
}, {
  id: '9',
  name: 'Poker High Roller',
  minStake: '$500',
  image: 'from-green-900 to-green-700',
  isHot: true
}];
const liveData = [{
  id: '10',
  name: 'Live Roulette',
  minStake: '$10',
  image: 'from-red-800 to-red-600'
}, {
  id: '11',
  name: 'Live Blackjack',
  minStake: '$25',
  image: 'from-gray-800 to-gray-600',
  isHot: true
}, {
  id: '12',
  name: 'Crazy Time',
  minStake: '$5',
  image: 'from-pink-800 to-purple-600'
}];
export function CasinoHome() {
  const [activeCategory, setActiveCategory] = useState('Slots');
  return <div className="min-h-screen w-full bg-[#051108] font-sans text-white">
      <div className="max-w-md mx-auto bg-[#051108] shadow-2xl min-h-screen relative">
        <Navbar />
        <HeroSection />
        <GameCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="min-h-[400px]">
          {activeCategory === 'Slots' && <>
              <GameGrid title="Popular Slots" games={slotsData} />
              <GameGrid title="New Arrivals" games={[...slotsData].reverse()} />
            </>}

          {activeCategory === 'Table Games' && <>
              <GameGrid title="High Stakes Tables" games={tableData} />
              <GameGrid title="Classic Favorites" games={[...tableData].reverse()} />
            </>}

          {activeCategory === 'Live Casino' && <GameGrid title="Live Action" games={liveData} />}
        </div>

        <VIPCta />
        <SupportSection />
        <Footer />
      </div>
    </div>;
}