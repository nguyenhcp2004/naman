import { Button } from "@workspace/ui/components/button"

const metrics = ["Default*", "Cards", "Dashboard", "Mail"]
const points = [42, 50, 39, 36, 34, 39, 41, 70]

export default function Page() {
  return (
    <>
      <section className="relative grid min-h-[calc(100svh-4rem)] place-items-center overflow-hidden bg-background px-6 py-10 text-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,color-mix(in_oklch,var(--primary),transparent_80%),transparent_28%),radial-gradient(circle_at_84%_16%,color-mix(in_oklch,var(--accent-foreground),transparent_74%),transparent_24%),linear-gradient(135deg,color-mix(in_oklch,var(--background),black_7%),var(--background))]" />
        <div className="absolute inset-x-0 top-0 h-px bg-border" />
        <div className="relative grid w-full max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card/90 p-7 shadow-2xl shadow-black/20 backdrop-blur md:p-10">
            <div>
              <div className="mb-10 flex items-center gap-3 text-sm font-semibold tracking-tight">
                <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">t</span>
                QMaster
              </div>
              <p className="mb-4 w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-secondary-foreground">
                Brand Theme
              </p>
              <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] text-card-foreground md:text-7xl">
                QMaster blue leads. Lime stays as the accent.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground md:text-lg">
                The tokens now follow the logo reference: deep QMaster blue as primary, bright #bfd731 as accent, and clean neutral surfaces for light and dark modes.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-11 rounded-full px-6">Launch Preview</Button>
              <Button size="lg" variant="outline" className="h-11 rounded-full px-6">View Tokens</Button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-4 shadow-2xl shadow-black/20 md:p-5">
            <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-foreground" />
                <span className="size-3 rounded-full bg-muted" />
                <span className="size-3 rounded-full bg-accent" />
                <span className="size-3 rounded-full bg-secondary" />
              </div>
              <span className="text-sm font-semibold">Default*</span>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {metrics.map((item) => (
                <span
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground"
                  data-active={item === "Cards"}
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-5">
                <svg viewBox="0 0 260 120" className="h-36 w-full overflow-visible">
                  <polyline
                    fill="none"
                    points={points.map((point, index) => `${index * 36 + 8},${110 - point}`).join(" ")}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  {points.map((point, index) => (
                    <circle cx={index * 36 + 8} cy={110 - point} fill="currentColor" key={point + index} r="4" />
                  ))}
                </svg>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="text-sm text-muted-foreground">Accent</p>
                <div className="mt-4 h-3 rounded-full bg-muted">
                  <div className="h-3 w-3/4 rounded-full bg-primary" />
                </div>
                <p className="mt-6 text-4xl font-semibold tracking-tight text-accent">#bfd731</p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 md:col-span-2">
                <h2 className="text-2xl font-semibold tracking-tight">Upgrade your subscription</h2>
                <p className="mt-2 max-w-md text-muted-foreground">A branded card component showing the new contrast, border, input, and button treatments.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <div className="rounded-xl border border-input bg-card px-4 py-3 text-sm text-muted-foreground">Evil Rabbit</div>
                  <div className="rounded-xl border border-input bg-card px-4 py-3 text-sm text-muted-foreground">example@acme.co</div>
                  <Button className="rounded-xl px-5">Upgrade</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
