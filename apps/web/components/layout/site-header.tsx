"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

const navigationItems = [
  { label: "Product", href: "/product" },
  { label: "Projects", href: "/projects" },
  { label: "Service", href: "/service" },
  { label: "Markets", href: "/industries" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 12)

    updateScrolled()
    window.addEventListener("scroll", updateScrolled, { passive: true })

    return () => window.removeEventListener("scroll", updateScrolled)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-out",
        isScrolled && "px-3 pt-2 sm:px-5 sm:pt-3"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full items-center justify-between transition-all duration-500 ease-out",
          isScrolled
            ? "h-14 max-w-[calc(100%-1.5rem)] rounded-full border border-border/60 bg-background/95 px-3 shadow-lg shadow-primary/10 backdrop-blur-xl sm:h-16 sm:max-w-5xl sm:px-5"
            : "h-16 max-w-7xl border-b border-border/10 bg-background/40 px-4 sm:h-20 sm:px-6"
        )}
      >
        <Link
          className="group flex items-center rounded-full pr-1.5"
          href="/"
          aria-label="QMaster home"
        >
          <Image
            alt="QMaster"
            className={cn(
              "h-9 w-auto transition-all duration-300 group-hover:scale-105 sm:h-11",
              isScrolled && "h-8 sm:h-10"
            )}
            height={180}
            priority
            src="/images/logo.png"
            width={653}
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-0.5 text-sm font-semibold text-muted-foreground sm:gap-1.5 sm:text-base"
        >
          {navigationItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative px-2 py-1.5 transition hover:text-foreground sm:px-3.5 sm:py-2",
                  "after:absolute after:inset-x-2 after:bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-300 sm:after:inset-x-3",
                  isActive
                    ? "text-foreground after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Button
          asChild
          className={cn(
            "h-9 rounded-full px-4 text-sm font-bold shadow-lg shadow-primary/15 transition-all duration-300 sm:h-10 sm:px-5 sm:text-base",
            isScrolled ? "inline-flex" : "hidden sm:inline-flex"
          )}
          size="sm"
        >
          <Link href="/service">Get Started</Link>
        </Button>
      </div>
    </header>
  )
}
