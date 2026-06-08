export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-card/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} QMaster. Built for sharper operations.</p>
        <div className="flex gap-5">
          <a className="transition hover:text-foreground" href="#">
            Privacy
          </a>
          <a className="transition hover:text-foreground" href="#">
            Terms
          </a>
          <a className="transition hover:text-foreground" href="#">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
