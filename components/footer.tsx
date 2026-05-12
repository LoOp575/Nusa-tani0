import Link from 'next/link'

const footerLinks = [
  { name: 'Komoditas', href: '/commodities' },
  { name: 'Provinsi', href: '/province' },
  { name: 'AI', href: '/ai-assistant' },
  { name: 'Cuaca', href: '/weather' },
  { name: 'Berita', href: '/news' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/40 py-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <span className="text-[10px] text-gray-600">
          &copy; 2024 NusaTani
        </span>
        <div className="flex items-center gap-3">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] text-gray-500 hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
