import Link from "next/link"

import { Button } from "@workspace/ui/components/button"

const navigationItems = [
  { label: "Project", href: "/project" },
  { label: "Service", href: "/service" },
  { label: "Company", href: "/company" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link className="flex items-center gap-3 font-semibold tracking-tight" href="/">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-sm text-primary-foreground shadow-lg shadow-primary/20">
            t
          </span>
          <span>QMaster</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {navigationItems.map((item) => (
            <Link className="transition hover:text-foreground" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Button asChild className="h-10 rounded-full px-5" size="sm">
          <Link href="/service">Get Started</Link>
        </Button>
      </div>
    </header>
  )
}
