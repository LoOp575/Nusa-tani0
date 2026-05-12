"use client"

import { motion } from "framer-motion"
import { Thermometer, Droplets, CloudRain, Lightbulb } from "lucide-react"
import Card from "@/components/ui/card"
import { weatherData } from "@/data/weather"

export default function WeatherSection() {
  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Cuaca & Rekomendasi Pertanian
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weather Card */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Kondisi Cuaca Hari Ini
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {weatherData.condition}
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="flex justify-center mb-1.5">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {weatherData.temperature}°C
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Suhu
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1.5">
                    <Droplets className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {weatherData.humidity}%
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Kelembapan
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1.5">
                    <CloudRain className="h-4 w-4 text-sky-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {weatherData.rainfall}mm
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Curah Hujan
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Recommendation Card */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Rekomendasi AI
                </h3>
              </div>

              <blockquote className="border-l-2 border-emerald-500 pl-3 mb-4">
                <p className="text-xs italic text-gray-600 dark:text-gray-300 leading-relaxed">
                  &ldquo;Curah hujan tinggi minggu ini. Disarankan menunda pemupukan.&rdquo;
                </p>
              </blockquote>

              <ul className="space-y-2">
                {weatherData.recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-500 shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
