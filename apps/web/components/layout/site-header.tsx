"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

const navigationItems = [
  { label: "Project", href: "/project" },
  { label: "Service", href: "/service" },
  { label: "Company", href: "/company" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between rounded-full border border-border/80 bg-background/90 px-3 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:h-20 sm:px-5">
        <Link className="group flex items-center gap-3 rounded-full pr-2 text-lg font-bold tracking-tight sm:text-xl" href="/">
          <span className="grid size-11 place-items-center rounded-full bg-primary text-base text-primary-foreground shadow-lg shadow-primary/25 transition group-hover:scale-105 sm:size-12 sm:text-lg">
            t
          </span>
          <span className="hidden sm:inline">QMaster</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1 text-base font-semibold text-muted-foreground sm:gap-3 sm:text-lg">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative px-3 py-2.5 transition hover:text-foreground sm:px-5 sm:py-3",
                  "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-300 sm:after:inset-x-4",
                  isActive
                    ? "text-foreground after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Button asChild className="hidden h-12 rounded-full px-6 text-base font-bold shadow-lg shadow-primary/15 sm:inline-flex" size="sm">
          <Link href="/service">Get Started</Link>
        </Button>
      </div>
    </header>
  )
}
