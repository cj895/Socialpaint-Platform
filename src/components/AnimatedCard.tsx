import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  index?: number
  elevated?: boolean
  onClick?: () => void
}

export default function AnimatedCard({ children, className = '', index = 0, elevated = false, onClick }: AnimatedCardProps) {
  const base = elevated
    ? 'bg-white rounded-[16px] p-5 sm:p-6 border border-[rgba(35,31,35,0.08)]'
    : 'bg-[#ececec] rounded-[20px] p-6 sm:p-8'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={elevated ? { y: -4, boxShadow: '0px 4px 40px rgba(0,0,0,0.06)' } : undefined}
      className={`${base} ${className}`}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      {children}
    </motion.div>
  )
}
