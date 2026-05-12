import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800/80 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 md:p-5',
        className
      )}
    >
      {children}
    </div>
  )
}
