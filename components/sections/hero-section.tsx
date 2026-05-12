"use client"

import { motion } from "framer-motion"
import { Activity, Wheat, MapPin, Sprout } from "lucide-react"
import Button from "@/components/ui/button"
import { nationalStats } from "@/data/stats"
import { formatNumber } from "@/lib/utils"

const statIcons = [Wheat, Sprout, Activity, MapPin]

export default function HeroSection() {
  return (
    <section className="w-full pt-6 pb-4 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5"
        >
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white glow-text">
              NusaTani
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              AI Agriculture Intelligence Platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button href="/commodities" variant="primary" size="sm">
              Komoditas
            </Button>
            <Button href="/ai-assistant" variant="secondary" size="sm">
              AI Assistant
            </Button>
            <Button href="/province" variant="ghost" size="sm">
              Data Nasional
            </Button>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2"
        >
          {nationalStats.map((stat, index) => {
            const Icon = statIcons[index]
            return (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 bg-gray-900/50 border border-gray-800/50 rounded-lg px-3 py-2.5"
              >
                <Icon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 truncate">{stat.label}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-white">
                      {formatNumber(stat.value)}
                    </span>
                    {stat.change !== 0 && (
                      <span
                        className={`text-[10px] font-medium ${
                          stat.change > 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {stat.change > 0 ? "+" : ""}{stat.change}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
