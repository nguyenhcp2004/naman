import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-card/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} QMaster. Built for sharper operations.</p>
        <div className="flex gap-5">
          <Link className="transition hover:text-foreground" href="#">
            Privacy
          </Link>
          <Link className="transition hover:text-foreground" href="#">
            Terms
          </Link>
          <Link className="transition hover:text-foreground" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
