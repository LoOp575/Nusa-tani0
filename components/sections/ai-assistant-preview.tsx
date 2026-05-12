"use client"

import { motion } from "framer-motion"
import { Bot, User, Sparkles } from "lucide-react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"

const suggestions = [
  "Tanaman apa yang cocok bulan ini?",
  "Pupuk terbaik untuk padi?",
  "Kenapa daun padi menguning?",
  "Cuaca di NTB minggu ini?",
]

export default function AIAssistantPreview() {
  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          AI Agriculture Assistant
        </h2>

        <div className="max-w-xl mx-auto">
          {/* Chat Preview Card */}
          <Card className="!bg-gray-950 !border-gray-800 overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
              <div className="p-1 rounded-md bg-emerald-500/10">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <span className="text-xs font-medium text-gray-300">
                NusaTani AI
              </span>
              <span className="ml-auto text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                Online
              </span>
            </div>

            {/* Chat messages */}
            <div className="py-3 space-y-3">
              {/* User message */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-start gap-2 justify-end"
              >
                <div className="bg-emerald-600 text-white text-xs rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                  Tanaman apa yang cocok ditanam bulan ini di Jawa Barat?
                </div>
                <div className="p-1 rounded-full bg-gray-800 shrink-0">
                  <User className="h-3 w-3 text-gray-400" />
                </div>
              </motion.div>

              {/* AI response */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-start gap-2"
              >
                <div className="p-1 rounded-full bg-emerald-500/10 shrink-0">
                  <Bot className="h-3 w-3 text-emerald-400" />
                </div>
                <div className="bg-gray-800/80 text-gray-200 text-xs rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] leading-relaxed">
                  Berdasarkan data cuaca dan kondisi tanah di Jawa Barat, saya merekomendasikan:
                  <strong className="text-emerald-400"> padi, jagung, dan kacang tanah</strong>.
                  Curah hujan cukup tinggi mendukung fase vegetatif.
                </div>
              </motion.div>
            </div>

            {/* Suggestion chips */}
            <div className="pt-3 border-t border-gray-800">
              <p className="text-[10px] text-gray-500 mb-2">Coba tanyakan:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-gray-700/80 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <div className="text-center mt-5">
            <Button href="/ai-assistant" variant="primary" size="sm">
              Buka AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
