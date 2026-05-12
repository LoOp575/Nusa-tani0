import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NusaTani - AI Agriculture Intelligence Platform Indonesia',
  description:
    'Platform data dan AI untuk pertanian Indonesia. Analisis komoditas, prediksi cuaca, dan rekomendasi cerdas untuk petani dan stakeholder agrikultur.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#0a0e1a] text-gray-100 min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
