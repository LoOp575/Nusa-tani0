"use client"

import { motion } from "framer-motion"
import { Wheat, Sprout, TreePine, MapPin } from "lucide-react"
import Card from "@/components/ui/card"
import { nationalStats } from "@/data/stats"
import { formatNumber } from "@/lib/utils"

const icons = [Wheat, Sprout, TreePine, MapPin]

export default function NationalStats() {
  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Statistik Pertanian Nasional
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {nationalStats.map((stat, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
              >
                <Card className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                      <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                    {stat.label}
                  </p>
                  <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                    {formatNumber(stat.value)}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    {stat.unit}
                  </p>
                  {stat.change !== 0 && (
                    <p
                      className={`text-[11px] font-medium mt-1 ${
                        stat.change > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      {stat.change > 0 ? "+" : ""}
                      {stat.change}%
                    </p>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
