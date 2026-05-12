'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, User } from 'lucide-react'
import Card from '@/components/ui/card'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const predefinedResponses: string[] = [
  'Untuk meningkatkan hasil panen padi, pastikan Anda menggunakan benih unggul bersertifikat, melakukan pengolahan tanah yang baik, dan menerapkan pemupukan berimbang. Jarak tanam yang optimal adalah 25x25 cm dengan sistem jajar legowo 2:1 untuk meningkatkan populasi tanaman per hektar.',
  'Pupuk organik sangat baik untuk memperbaiki struktur tanah dan meningkatkan kandungan unsur hara mikro. Anda bisa membuat kompos dari sisa panen, kotoran ternak, dan dedaunan. Aplikasikan 2-3 ton/ha pupuk organik sebelum tanam, dilanjutkan dengan pupuk anorganik sesuai kebutuhan tanaman.',
  'Untuk pengendalian hama terpadu (PHT), kombinasikan metode kultur teknis, biologis, dan kimiawi. Gunakan varietas tahan hama, pertahankan musuh alami seperti laba-laba dan capung, serta terapkan pestisida secara bijaksana hanya jika populasi hama sudah melewati ambang ekonomi.',
  'Sistem irigasi tetes (drip irrigation) sangat efisien untuk tanaman hortikultura. Sistem ini menghemat air hingga 60% dibandingkan irigasi konvensional, mengurangi pertumbuhan gulma, dan memberikan air langsung ke zona perakaran tanaman. Investasi awal memang lebih tinggi tetapi ROI tercapai dalam 2-3 musim tanam.',
  'Rotasi tanaman penting untuk memutus siklus hama penyakit dan menjaga kesuburan tanah. Setelah padi, bisa ditanam kedelai atau kacang tanah yang memfiksasi nitrogen. Pola tanam padi-palawija-padi sangat disarankan untuk lahan sawah di Jawa.',
]

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'user',
    content: 'Tanaman apa yang cocok ditanam bulan Januari?',
  },
  {
    id: 2,
    role: 'assistant',
    content:
      'Bulan Januari merupakan puncak musim hujan di sebagian besar wilayah Indonesia, sehingga sangat ideal untuk menanam padi sawah. Curah hujan yang tinggi memastikan ketersediaan air yang cukup untuk fase vegetatif padi.\n\nSelain padi, tanaman yang cocok ditanam pada bulan Januari antara lain:\n\n1. Padi varietas Ciherang atau IR64 - tahan terhadap genangan dan memiliki umur panen 110-120 hari\n2. Kangkung dan bayam - sayuran yang tumbuh baik di kondisi lembab\n3. Talas dan keladi - umbi-umbian yang menyukai kelembaban tinggi\n\nPastikan juga menyiapkan sistem drainase yang baik untuk mengantisipasi genangan berlebih yang dapat menyebabkan busuk akar. Pemantauan cuaca harian melalui aplikasi BMKG sangat disarankan untuk mengoptimalkan jadwal tanam Anda.',
  },
  {
    id: 3,
    role: 'user',
    content: 'Bagaimana cara mengatasi hama wereng?',
  },
  {
    id: 4,
    role: 'assistant',
    content:
      'Hama wereng batang coklat (Nilaparvata lugens) merupakan salah satu hama utama padi yang bisa menyebabkan puso (gagal panen). Berikut strategi pengendalian terpadu yang disarankan:\n\n**Pencegahan:**\n- Gunakan varietas tahan wereng seperti Inpari 33, Inpari 34, atau Ciherang\n- Tanam serentak dengan petani sekitar untuk memutus siklus hidup hama\n- Jaga kebersihan lahan dari sisa-sisa tanaman yang bisa jadi inang\n\n**Pengendalian Biologis:**\n- Pertahankan musuh alami seperti laba-laba, kumbang Coccinellidae, dan parasitoid Anagrus\n- Hindari penyemprotan pestisida berlebihan yang membunuh musuh alami\n- Pasang lampu perangkap pada malam hari saat populasi tinggi\n\n**Pengendalian Kimia (jika diperlukan):**\n- Gunakan insektisida berbahan aktif BPMC atau imidakloprid\n- Aplikasikan hanya jika populasi sudah mencapai 10-20 ekor per rumpun\n- Semprot pada pagi atau sore hari untuk efektivitas maksimal\n\nMonitoring rutin 2-3 kali seminggu sangat penting untuk deteksi dini serangan wereng.',
  },
]

const suggestions = [
  'Cara meningkatkan hasil panen padi?',
  'Rekomendasi pupuk organik terbaik',
  'Pengendalian hama terpadu (PHT)',
  'Sistem irigasi untuk lahan kering',
  'Pola rotasi tanaman yang baik',
]

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: messageText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const randomResponse =
        predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)]
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: randomResponse,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          AI Agriculture Assistant
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Tanya seputar pertanian, tanaman, pupuk, dan cuaca
        </p>
      </div>

      {/* Chat Container */}
      <Card className="flex flex-col min-h-[70vh] !p-0 overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-emerald-500" />
                </div>
              )}
              <div
                className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">
                  {message.content}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 md:px-6 py-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSend(suggestion)}
                className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pertanyaan tentang pertanian..."
              className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
