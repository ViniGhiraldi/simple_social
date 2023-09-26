import * as React from "react"

import { cn } from "@/lib/utils"

export interface LiProps
  extends React.LiHTMLAttributes<HTMLLIElement> {}

const Li = React.forwardRef<HTMLLIElement, LiProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        className={cn(
          "flex gap-6 px-4 py-3 w-full bg-transparent transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </li>
    )
  }
)
Li.displayName = "Li"

export { Li }
