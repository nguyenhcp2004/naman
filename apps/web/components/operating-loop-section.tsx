const steps = ["Map the operation", "Align the team", "Track every signal", "Improve every cycle"]

export function OperatingLoopSection() {
  return (
    <section className="relative overflow-hidden bg-background px-5 py-20 sm:px-8 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-border" />
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-border bg-card p-7 shadow-2xl shadow-primary/10 sm:p-10">
          <p className="w-fit rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-foreground">
            Operating loop
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.055em] text-primary sm:text-5xl">
            From messy activity to measurable momentum.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            QMaster gives every team a shared rhythm: capture work, clarify ownership, monitor progress, and learn from
            each cycle.
          </p>
        </div>

        <div className="grid gap-4">
          {steps.map((step, index) => (
            <div
              className="flex items-center gap-5 rounded-3xl border border-border bg-card p-5 shadow-lg shadow-primary/5"
              key={step}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-card-foreground">{step}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  A practical layer that keeps the operation visible and moving.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
