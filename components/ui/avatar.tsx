"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
))
AvatarRoot.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarRoot> {
  src: React.ComponentPropsWithoutRef<typeof AvatarImage>["src"]
  name: string
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarRoot>, AvatarProps>(
  ({ src, name, ...props }, ref) => (
    <AvatarRoot ref={ref} {...props}>
      <AvatarImage src={src} alt="Avatar" />
      <AvatarFallback className="bg-red-900">
        {name
          .split(" ")
          .reduce(
            (prev, cur, index, arr) =>
              prev + (index === 0 || index === arr.length - 1 ? cur.charAt(0) : ""),
            ""
          )}
      </AvatarFallback>
    </AvatarRoot>
  )
)
Avatar.displayName = "Avatar"

export { AvatarRoot, AvatarImage, AvatarFallback, Avatar }
