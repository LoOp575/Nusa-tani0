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
    'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm',
  secondary:
    'bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700',
  ghost:
    'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-300',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
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
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
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
