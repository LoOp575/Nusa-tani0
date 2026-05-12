"use client"

import { motion } from "framer-motion"
import Button from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/40 via-transparent to-transparent dark:from-emerald-950/10 dark:via-transparent dark:to-transparent" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.02] dark:opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            NusaTani
          </h1>
          <p className="text-sm md:text-base font-medium text-emerald-600 dark:text-emerald-400 mb-3">
            AI Agriculture Intelligence Platform Indonesia
          </p>
          <p className="max-w-lg mx-auto text-sm md:text-base text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            Platform data dan AI pertanian Indonesia untuk insight komoditas, cuaca realtime, dan analisis pertanian nasional.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5"
        >
          <Button href="/commodities" variant="primary" size="md">
            Lihat Komoditas
          </Button>
          <Button href="/ai-assistant" variant="secondary" size="md">
            Tanya AI Pertanian
          </Button>
          <Button href="/province" variant="ghost" size="md">
            Data Nasional
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
