"use client"

import { motion } from "framer-motion"
import HeroSection from "@/components/sections/hero-section"
import NationalStats from "@/components/sections/national-stats"
import TopCommodities from "@/components/sections/top-commodities"
import WeatherSection from "@/components/sections/weather-section"
import AIAssistantPreview from "@/components/sections/ai-assistant-preview"
import ProvincePreview from "@/components/sections/province-preview"
import NewsSection from "@/components/sections/news-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <NationalStats />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <TopCommodities />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <WeatherSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <AIAssistantPreview />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <ProvincePreview />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <NewsSection />
      </motion.div>
    </main>
  )
}
