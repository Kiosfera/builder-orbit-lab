import React from 'react'
import { Button, ButtonProps } from './button'
import { cn } from '@/lib/utils'

interface ResponsiveButtonProps extends ButtonProps {
  mobileText?: string
  fullWidthOnMobile?: boolean
}

export function ResponsiveButton({
  children,
  mobileText,
  fullWidthOnMobile = false,
  className,
  ...props
}: ResponsiveButtonProps) {
  return (
    <Button
      className={cn(
        fullWidthOnMobile && 'w-full sm:w-auto',
        className
      )}
      {...props}
    >
      {mobileText ? (
        <>
          <span className="sm:hidden">{mobileText}</span>
          <span className="hidden sm:inline">{children}</span>
        </>
      ) : (
        children
      )}
    </Button>
  )
}

export default ResponsiveButton
