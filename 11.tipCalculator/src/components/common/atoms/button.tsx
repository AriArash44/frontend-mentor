import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "font-bold rounded-sm py-2 cursor-pointer text-lg",
  {
    variants: {
      variant: {
        default:
          "bg-green-900 text-white hover:bg-green-400 hover:text-green-900",
        secondary:
          "bg-green-400 text-green-900 disabled:bg-gray-300 disabled:opacity-30 disabled:text-gray-400 disabled:cursor-not-allowed",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button }