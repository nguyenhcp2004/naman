"use client"

import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.24 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        "translate-y-10 opacity-0 transition duration-1000 ease-out will-change-transform",
        isVisible && "translate-y-0 opacity-100",
        className,
      )}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
