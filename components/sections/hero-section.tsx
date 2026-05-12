"use client"

import { motion } from "framer-motion"
import Button from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-emerald-50/30 dark:from-emerald-950/20 dark:via-transparent dark:to-emerald-950/10" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.05]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Floating dots */}
        <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-emerald-500/20 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 h-1.5 w-1.5 rounded-full bg-emerald-500/30 animate-pulse delay-300" />
        <div className="absolute bottom-1/4 right-1/4 h-2.5 w-2.5 rounded-full bg-emerald-500/15 animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/6 h-1.5 w-1.5 rounded-full bg-emerald-400/25 animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3">
            NusaTani
          </h1>
          <p className="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-4">
            AI Agriculture Intelligence Platform Indonesia
          </p>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8">
            Platform data dan AI pertanian Indonesia untuk insight komoditas, cuaca realtime, dan analisis pertanian nasional.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button href="/commodities" variant="primary" size="lg">
            Lihat Komoditas
          </Button>
          <Button href="/ai-assistant" variant="secondary" size="lg">
            Tanya AI Pertanian
          </Button>
          <Button href="/province" variant="ghost" size="lg">
            Data Nasional
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
