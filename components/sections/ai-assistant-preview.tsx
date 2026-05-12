"use client"

import { Bot, Sparkles } from "lucide-react"

const suggestions = [
  "Tanaman cocok bulan ini?",
  "Pupuk terbaik padi?",
  "Daun padi menguning?",
  "Cuaca NTB minggu ini?",
]

export default function AIAssistantPreview() {
  return (
    <section className="py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-lg p-3 glow-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-emerald-500/10">
                <Sparkles className="h-3 w-3 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                AI Agriculture Assistant
              </span>
              <span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                Online
              </span>
            </div>
            <a
              href="/ai-assistant"
              className="text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Buka Chat
            </a>
          </div>

          {/* Quick message preview */}
          <div className="flex items-start gap-2 mb-2.5">
            <Bot className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Berdasarkan data cuaca dan kondisi tanah, saya merekomendasikan <span className="text-emerald-400">padi, jagung, dan kacang tanah</span> untuk penanaman bulan ini.
            </p>
          </div>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <span
                key={s}
                className="text-[9px] px-2 py-0.5 rounded-full border border-gray-700/60 text-gray-500 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
