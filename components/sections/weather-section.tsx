"use client"

import { Thermometer, Droplets, CloudRain, Bot } from "lucide-react"
import { weatherData } from "@/data/weather"

export default function WeatherSection() {
  return (
    <section className="py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Weather compact */}
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Cuaca Hari Ini
              </h3>
              <a
                href="/weather"
                className="text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Detail
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <Thermometer className="h-3.5 w-3.5 text-orange-400" />
                <div>
                  <p className="text-sm font-bold text-white">{weatherData.temperature}°C</p>
                  <p className="text-[9px] text-gray-500">Suhu</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-3.5 w-3.5 text-blue-400" />
                <div>
                  <p className="text-sm font-bold text-white">{weatherData.humidity}%</p>
                  <p className="text-[9px] text-gray-500">Kelembapan</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CloudRain className="h-3.5 w-3.5 text-sky-400" />
                <div>
                  <p className="text-sm font-bold text-white">{weatherData.rainfall}mm</p>
                  <p className="text-[9px] text-gray-500">Curah Hujan</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insight compact */}
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <Bot className="h-3.5 w-3.5 text-emerald-400" />
                <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  AI Insight
                </h3>
              </div>
              <a
                href="/ai-assistant"
                className="text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Buka AI
              </a>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed mb-2">
              &ldquo;Curah hujan tinggi minggu ini. Disarankan menunda pemupukan dan fokus pada drainase lahan.&rdquo;
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[9px] px-2 py-0.5 rounded-full border border-gray-700 text-gray-400">
                Tunda pemupukan
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full border border-gray-700 text-gray-400">
                Perbaiki drainase
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full border border-gray-700 text-gray-400">
                Monitor hama
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
