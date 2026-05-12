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
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              NusaTani
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; 2024 NusaTani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
