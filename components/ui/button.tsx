import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

const variants = {
  primary:
    'bg-emerald-500/90 hover:bg-emerald-500 text-white border border-emerald-400/20',
  secondary:
    'bg-gray-800/60 hover:bg-gray-800 text-gray-200 border border-gray-700/60',
  ghost:
    'bg-transparent hover:bg-white/5 text-gray-400 hover:text-white border border-transparent',
}

const sizes = {
  sm: 'px-2.5 py-1 text-[11px]',
  md: 'px-3 py-1.5 text-xs',
  lg: 'px-4 py-2 text-sm',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  href,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200',
    variants[variant],
    sizes[size],
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
