"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-xs tracking-widest uppercase font-mono transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-transparent hover:text-foreground hover:border-foreground border border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-transparent hover:text-destructive border border-transparent hover:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-border bg-transparent hover:bg-white/5 hover:text-foreground hover:border-white/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // New technical variant
        technical: "bg-transparent border border-white/20 text-white/70 hover:text-white hover:border-white hover:bg-white/5",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        xs: "h-6 gap-1 px-2 text-[10px] has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 px-8 has-[>svg]:px-6",
        icon: "size-10",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        "perspective-900 tilt-3d sheen-3d press-depth",
        buttonVariants({ variant, size, className })
      )}
      onPointerMove={(e: React.PointerEvent) => {
        const el = e.currentTarget as HTMLElement
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        const ry = (px - 0.5) * 10
        const rx = (0.5 - py) * 10
        el.style.setProperty("--rx", `${rx}deg`)
        el.style.setProperty("--ry", `${ry}deg`)
        el.style.setProperty("--tz", "8px")
        el.style.setProperty("--sheen-x", `${px * 100}%`)
        el.style.setProperty("--sheen-y", `${py * 100}%`)
        el.dataset.tiltActive = "true"
        props.onPointerMove?.(e)
      }}
      onPointerLeave={(e: React.PointerEvent) => {
        const el = e.currentTarget as HTMLElement
        el.style.setProperty("--rx", "0deg")
        el.style.setProperty("--ry", "0deg")
        el.style.setProperty("--tz", "0px")
        el.dataset.tiltActive = "false"
        props.onPointerLeave?.(e)
      }}
      {...props}
    />
  )
}

export { Button, buttonVariants }
