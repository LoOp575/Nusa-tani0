"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Thermometer, Droplets, CloudRain, Lightbulb, Wind } from "lucide-react"
import Card from "@/components/ui/card"
import { weatherData as fallbackWeather } from "@/data/weather"

type RealtimeWeather = {
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
  condition: string
  location?: string
  updatedAt?: string
  source?: string
  recommendations: string[]
}

export default function WeatherSection() {
  const [weatherData, setWeatherData] = useState<RealtimeWeather>(fallbackWeather)
  const [isLoading, setIsLoading] = useState(true)
  const [isRealtime, setIsRealtime] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadWeather() {
      try {
        const response = await fetch("/api/weather", { cache: "no-store" })
        if (!response.ok) throw new Error("Weather API error")

        const data = await response.json()
        if (isMounted) {
          setWeatherData(data)
          setIsRealtime(true)
        }
      } catch (error) {
        if (isMounted) {
          setWeatherData(fallbackWeather)
          setIsRealtime(false)
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadWeather()

    return () => {
      isMounted = false
    }
  }, [])

  const updatedLabel = weatherData.updatedAt
    ? new Date(weatherData.updatedAt).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Data lokal"

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6 text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
            Cuaca Realtime & Rekomendasi Pertanian
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {isLoading
              ? "Mengambil data cuaca terbaru..."
              : `${isRealtime ? "Live" : "Fallback"} • ${weatherData.location || "Jakarta, Indonesia"} • ${updatedLabel}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Kondisi Cuaca Saat Ini
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {weatherData.condition}
                  </p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  isRealtime
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                }`}>
                  {isRealtime ? "Realtime" : "Demo"}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3">
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
                    Lembap
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
                    Hujan
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1.5">
                    <Wind className="h-4 w-4 text-gray-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {weatherData.windSpeed}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    km/jam
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

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
                  Rekomendasi Otomatis
                </h3>
              </div>

              <blockquote className="border-l-2 border-emerald-500 pl-3 mb-4">
                <p className="text-xs italic text-gray-600 dark:text-gray-300 leading-relaxed">
                  &ldquo;Rekomendasi berubah mengikuti suhu, kelembapan, hujan, dan angin terbaru.&rdquo;
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
