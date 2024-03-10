"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { AccordionIcon } from "@/components/accordion-icon"
import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideChevronUp } from "lucide-react"

const Collapsible = CollapsiblePrimitive.Root

interface CollapsibleTriggerButtonProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> {
  variant?: "plus" | "chevron"
}

const CollapsibleTriggerButton = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  CollapsibleTriggerButtonProps
>(({ className, children, variant = "plus", ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    className={cn("group flex flex-row w-full items-center justify-between text-xl", className)}
    {...props}
    ref={ref}
  >
    {children}
    <div className="h-10 w-10 inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
      {variant === "plus" && <AccordionIcon />}
      {variant === "chevron" && <LucideChevronUp className="group-data-[state=closed]:rotate-180 transition-transform" />}
    </div>
  </CollapsiblePrimitive.CollapsibleTrigger>
))
CollapsibleTriggerButton.displayName = "CollapsableTriggerButton"

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    className={cn(
      "group/collapsible data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden transition-all duration-500",
      className
    )}
    {...props}
    ref={ref}
  />
))
CollapsibleContent.displayName = CollapsiblePrimitive.CollapsibleContent.displayName

export { Collapsible, CollapsibleTriggerButton, CollapsibleContent }
