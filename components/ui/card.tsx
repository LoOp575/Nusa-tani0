import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-gray-900/60 border border-gray-800/60 rounded-lg p-3 backdrop-blur-sm hover:border-emerald-500/20 transition-colors duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}
