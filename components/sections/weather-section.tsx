"use client"

import { motion } from "framer-motion"
import { Thermometer, Droplets, CloudRain, Lightbulb } from "lucide-react"
import Card from "@/components/ui/card"
import { weatherData } from "@/data/weather"

export default function WeatherSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Cuaca & Rekomendasi Pertanian
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weather Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Kondisi Cuaca Hari Ini
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                {weatherData.condition}
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Thermometer className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {weatherData.temperature}°C
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Suhu
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Droplets className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {weatherData.humidity}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Kelembapan
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <CloudRain className="h-6 w-6 text-sky-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {weatherData.rainfall}mm
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Curah Hujan
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Recommendation Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Rekomendasi AI
                </h3>
              </div>

              <blockquote className="border-l-2 border-emerald-500 pl-3 mb-5">
                <p className="text-sm italic text-gray-600 dark:text-gray-300">
                  &ldquo;Curah hujan tinggi minggu ini. Disarankan menunda pemupukan.&rdquo;
                </p>
              </blockquote>

              <ul className="space-y-3">
                {weatherData.recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
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
