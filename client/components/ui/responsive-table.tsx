import React from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveTableWrapperProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveTableWrapper({ children, className }: ResponsiveTableWrapperProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-[640px]">
        {children}
      </div>
    </div>
  )
}

export default ResponsiveTableWrapper
