"use client"

import { motion } from "framer-motion"
import { Bot, User, Sparkles } from "lucide-react"
import Card from "@/components/ui/card"
import Button from "@/components/ui/button"

const suggestions = [
  "Tanaman apa yang cocok bulan ini?",
  "Pupuk terbaik untuk padi?",
  "Kenapa daun padi menguning?",
  "Bagaimana cuaca di NTB minggu ini?",
]

export default function AIAssistantPreview() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
          AI Agriculture Assistant
        </h2>

        <div className="max-w-2xl mx-auto">
          {/* Chat Preview Card */}
          <Card className="!bg-gray-950 !border-gray-800 overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-2 pb-4 border-b border-gray-800">
              <div className="p-1.5 rounded-lg bg-emerald-500/10">
                <Sparkles className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-gray-300">
                NusaTani AI
              </span>
              <span className="ml-auto text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                Online
              </span>
            </div>

            {/* Chat messages */}
            <div className="py-4 space-y-4">
              {/* User message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-start gap-2 justify-end"
              >
                <div className="bg-emerald-600 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                  Tanaman apa yang cocok ditanam bulan ini di Jawa Barat?
                </div>
                <div className="p-1.5 rounded-full bg-gray-800 shrink-0">
                  <User className="h-3.5 w-3.5 text-gray-400" />
                </div>
              </motion.div>

              {/* AI response */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-start gap-2"
              >
                <div className="p-1.5 rounded-full bg-emerald-500/10 shrink-0">
                  <Bot className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div className="bg-gray-800/80 text-gray-200 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
                  Berdasarkan data cuaca dan kondisi tanah di Jawa Barat bulan ini, saya merekomendasikan:
                  <strong className="text-emerald-400"> padi, jagung, dan kacang tanah</strong>.
                  Curah hujan yang cukup tinggi sangat mendukung fase vegetatif tanaman padi.
                </div>
              </motion.div>
            </div>

            {/* Suggestion chips */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-3">Coba tanyakan:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="text-xs px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <div className="text-center mt-8">
            <Button href="/ai-assistant" variant="primary" size="lg">
              Buka AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
