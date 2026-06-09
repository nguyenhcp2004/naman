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
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-full border border-border/80 bg-background/88 px-3 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:px-4">
        <Link className="group flex items-center gap-3 rounded-full pr-2 font-semibold tracking-tight" href="/">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-sm text-primary-foreground shadow-lg shadow-primary/25 transition group-hover:scale-105">
            t
          </span>
          <span className="hidden sm:inline">QMaster</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1 text-sm font-medium text-muted-foreground sm:gap-3">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative px-3 py-2 transition hover:text-foreground sm:px-4",
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

        <Button asChild className="hidden h-10 rounded-full px-5 shadow-lg shadow-primary/15 sm:inline-flex" size="sm">
          <Link href="/service">Get Started</Link>
        </Button>
      </div>
    </header>
  )
}
