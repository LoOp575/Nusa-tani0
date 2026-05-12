"use client"

import HeroSection from "@/components/sections/hero-section"
import TopCommodities from "@/components/sections/top-commodities"
import WeatherSection from "@/components/sections/weather-section"
import AIAssistantPreview from "@/components/sections/ai-assistant-preview"
import NewsSection from "@/components/sections/news-section"

export default function HomePage() {
  return (
    <div className="pb-4">
      <HeroSection />
      <TopCommodities />
      <WeatherSection />
      <AIAssistantPreview />
      <NewsSection />
    </div>
  )
}
