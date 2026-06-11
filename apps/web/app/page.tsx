import Image from "next/image"
import Link from "next/link"

import { CustomersSection } from "@/components/customers-section"
import { FeaturedStorySections } from "@/components/featured-story-sections"
import { HeroSlider } from "@/components/hero-slider"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Button } from "@workspace/ui/components/button"

const stats = [
  { value: "42%", label: "faster operation reviews" },
  { value: "18k", label: "tracked service actions" },
  { value: "99.8%", label: "workflow visibility" },
]

const features = [
  {
    title: "Project Control",
    description: "Plan work, assign ownership, and see delivery risk before it becomes a delay.",
  },
  {
    title: "Service Rhythm",
    description: "Standardize requests, field actions, approvals, and follow-up in one reliable flow.",
  },
  {
    title: "Company Clarity",
    description: "Give leaders a focused operating picture across teams, locations, and priorities.",
  },
]

const steps = ["Map the operation", "Align the team", "Track every signal", "Improve every cycle"]
const chartPoints = [54, 62, 58, 72, 69, 84, 79, 92]

export default function Page() {
  return (
    <>
      <SmoothScroll />

      <HeroSlider />

      <FeaturedStorySections />

      <CustomersSection />

      <section className="bg-muted px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-foreground">What QMaster connects</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-[-0.055em] text-primary sm:text-5xl">
                One system for the work that usually gets scattered.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-muted-foreground">
              Built for teams that need practical control: fewer blind spots, faster handoffs, and cleaner accountability.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => (
              <article className="group rounded-[1.75rem] border border-border bg-card p-6 shadow-xl shadow-primary/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10" key={feature.title}>
                <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-card-foreground">{feature.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
              QMaster gives every team a shared rhythm: capture work, clarify ownership, monitor progress, and learn from each cycle.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div className="flex items-center gap-5 rounded-3xl border border-border bg-card p-5 shadow-lg shadow-primary/5" key={step}>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-card-foreground">{step}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">A practical layer that keeps the operation visible and moving.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-5 pb-28 sm:px-8">
        <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Equipment-ready operations</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.055em] text-primary sm:text-5xl">
              Designed for teams managing real assets, real sites, and real service pressure.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Whether your workflow starts with a project plan or a service request, QMaster keeps the physical and digital operation connected.
            </p>
            <Button asChild className="mt-8 h-12 rounded-full px-7 text-base font-bold">
              <Link href="/company">See how it works</Link>
            </Button>
          </div>
          <div className="relative min-h-[320px] bg-muted lg:min-h-[520px]">
            <Image
              alt="Commercial equipment managed by QMaster"
              className="object-cover object-[54%_70%]"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="/images/footer-card.png"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--card)_0%,transparent_28%),radial-gradient(circle_at_78%_22%,transparent_42%,var(--card)_112%)] opacity-30" />
          </div>
        </div>
      </section>
    </>
  )
}
