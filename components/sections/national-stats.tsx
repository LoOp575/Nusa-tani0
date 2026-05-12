"use client"

import { motion } from "framer-motion"
import { Wheat, Sprout, TreePine, MapPin } from "lucide-react"
import Card from "@/components/ui/card"
import { nationalStats } from "@/data/stats"
import { formatNumber } from "@/lib/utils"

const icons = [Wheat, Sprout, TreePine, MapPin]

export default function NationalStats() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Statistik Pertanian Nasional
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {nationalStats.map((stat, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="flex justify-center mb-3">
                    <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                      <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(stat.value)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {stat.unit}
                  </p>
                  {stat.change !== 0 && (
                    <p
                      className={`text-xs font-medium mt-2 ${
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
