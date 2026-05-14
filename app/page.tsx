"use client"

import { motion } from "framer-motion"
import NationalStats from "@/components/sections/national-stats"
import TopCommodities from "@/components/sections/top-commodities"
import WeatherSection from "@/components/sections/weather-section"
import ProvincePreview from "@/components/sections/province-preview"
import NewsSection from "@/components/sections/news-section"

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

function DashboardHeader() {
  return (
    <section className="pt-5 md:pt-7">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm dark:border-emerald-900/40 dark:bg-gray-900/70 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                NusaTani Dashboard
              </p>
              <h1 className="mt-1 text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
                Monitor pangan, cuaca, dan pergerakan provinsi
              </h1>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-gray-500 dark:text-gray-400 md:text-sm">
                Tampilan utama sekarang fokus ke data cepat: harga pangan nasional, statistik produksi, cuaca realtime, dan ranking provinsi.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center md:min-w-[320px]">
              <div className="rounded-xl bg-emerald-50 px-3 py-2 dark:bg-emerald-900/20">
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300">Status</p>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Live</p>
              </div>
              <div className="rounded-xl bg-sky-50 px-3 py-2 dark:bg-sky-900/20">
                <p className="text-[10px] text-sky-700 dark:text-sky-300">Fokus</p>
                <p className="text-sm font-bold text-sky-800 dark:text-sky-200">Pangan</p>
              </div>
              <div className="rounded-xl bg-amber-50 px-3 py-2 dark:bg-amber-900/20">
                <p className="text-[10px] text-amber-700 dark:text-amber-300">Mode</p>
                <p className="text-sm font-bold text-amber-800 dark:text-amber-200">Ringkas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const sections = [
    <TopCommodities key="commodities" />,
    <NationalStats key="stats" />,
    <WeatherSection key="weather" />,
    <ProvincePreview key="province" />,
    <NewsSection key="news" />,
  ]

  return (
    <div className="pb-8">
      <DashboardHeader />
      <div className="space-y-1 md:space-y-2">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {section}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
