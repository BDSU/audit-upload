import * as React from "react"
import { cn } from "@/lib/utils"

const AccordionIcon = React.forwardRef<SVGSVGElement, React.HTMLAttributes<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("lucide lucide-plus", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path
        d="M12 5v14"
        className="group-data-[state=closed]:-scale-y-100 scale-y-0 origin-center transition-transform duration-200"
      />
    </svg>
  )
)
AccordionIcon.displayName = "AccordionIcon"
export { AccordionIcon }
