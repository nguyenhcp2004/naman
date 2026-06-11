import Image from "next/image"
import Link from "next/link"

import { CustomersSection } from "@/components/customers-section"
import { FeaturedStorySections } from "@/components/featured-story-sections"
import { HeroSlider } from "@/components/hero-slider"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Button } from "@workspace/ui/components/button"
import { sanityFetch } from "@/sanity/lib/client"
import { LANDING_PAGE_QUERY } from "@/sanity/lib/queries"
import type { LandingPage } from "@/sanity/types"

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

export default async function Page() {
  const page = await sanityFetch<LandingPage>({ query: LANDING_PAGE_QUERY })
  const hero = page?.hero
  const cta = hero?.callToAction
  const ctaHref = cta?.linkType === "external" ? cta.url : cta?.path

  return (
    <>
      <SmoothScroll />

      <HeroSlider />

      <FeaturedStorySections />

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

      <CustomersSection />
    </>
  )
}
