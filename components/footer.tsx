import Link from 'next/link'
import { Leaf } from 'lucide-react'

const footerLinks = [
  { name: 'Dashboard', href: '/' },
  { name: 'Komoditas', href: '/commodities' },
  { name: 'Provinsi', href: '/province' },
  { name: 'AI Assistant', href: '/ai-assistant' },
  { name: 'Cuaca', href: '/weather' },
  { name: 'Berita', href: '/news' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800/60 bg-white/60 dark:bg-gray-950/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              NusaTani
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; 2024 NusaTani
          </p>
        </div>
      </div>
    </footer>
  )
}
