"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Coffee,
  Croissant,
  Store,
  UtensilsCrossed,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { SmoothScroll } from "@/components/smooth-scroll"
import { Button } from "@workspace/ui/components/button"

gsap.registerPlugin(ScrollTrigger)

type Industry = {
  name: string
  anchor: string
  summary: string
  description: string
  icon: LucideIcon
  image: string
  focus: string
  needs: string[]
}

const industries: Industry[] = [
  {
    name: "Bakery",
    anchor: "bakery",
    summary:
      "Production rhythm, cooling flow, and presentation counters for pastry-led stores.",
    description:
      "We plan bakery equipment around the day-to-day rhythm of proofing, baking, cooling, storing, and presenting fresh products.",
    icon: Croissant,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80",
    focus: "Bake / cool / display",
    needs: [
      "Deck and convection oven planning",
      "Cooling and proofing workflow",
      "Pastry display and storage layout",
    ],
  },
  {
    name: "Coffee",
    anchor: "coffee",
    summary:
      "Compact bar layouts that keep rush-hour service fast and consistent.",
    description:
      "Coffee concepts need short movements, reliable refrigeration, clean water flow, and counters that make every shift easier to run.",
    icon: Coffee,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80",
    focus: "Brew / serve / repeat",
    needs: [
      "Bar counter equipment setup",
      "Milk and ingredient refrigeration",
      "Compact workflow for small footprints",
    ],
  },
  {
    name: "Chain",
    anchor: "chain",
    summary:
      "Standardized equipment packages for brands opening the next location.",
    description:
      "For growing brands, we help turn one successful store into a repeatable equipment model across multiple sites.",
    icon: Store,
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80",
    focus: "Standardize / launch / scale",
    needs: [
      "Equipment package standardization",
      "Multi-site procurement support",
      "Opening schedule coordination",
    ],
  },
  {
    name: "Restaurant",
    anchor: "restaurant",
    summary:
      "Complete hot line, cold storage, prep, ventilation, and wash-up systems.",
    description:
      "Restaurant kitchens depend on every zone working together, from cold storage and prep to cooking line and dish return.",
    icon: UtensilsCrossed,
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80",
    focus: "Prep / cook / deliver",
    needs: [
      "Cooking line and prep planning",
      "Cold room and refrigeration setup",
      "Maintenance-ready equipment layout",
    ],
  },
]

const supportSteps = [
  {
    title: "Read the model",
    body: "Concept, menu, store size, service volume, and opening budget shape the first equipment direction.",
  },
  {
    title: "Build the kit",
    body: "We recommend a practical equipment mix that balances performance, space, maintenance, and growth.",
  },
  {
    title: "Keep it running",
    body: "Delivery, installation, warranty, and after-sales service stay connected after opening day.",
  },
]

export default function IndustriesPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const featuredIndustry = industries[0]!
  const secondaryIndustries = industries.slice(1)

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reduceMotion) return

    const context = gsap.context(() => {
      gsap.from("[data-hero-copy] > *", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      })

      gsap.from("[data-hero-image]", {
        y: 54,
        opacity: 0,
        scale: 0.96,
        rotate: -2,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      })

      gsap.from("[data-section-title]", {
        backgroundPositionX: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "[data-section-title]",
          scrub: 1,
          start: "top 84%",
          end: "bottom center",
        },
      })

      gsap.from("[data-market-card]", {
        y: 42,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        clearProps: "transform",
        scrollTrigger: {
          trigger: "[data-market-grid]",
          start: "top 78%",
        },
      })

      gsap.from("[data-support-image]", {
        x: -70,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-support-section]",
          start: "top 74%",
        },
      })

      gsap.from("[data-support-copy] > *", {
        y: 42,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-support-section]",
          start: "top 68%",
        },
      })
    }, page)

    return () => context.revert()
  }, [])

  return (
    <>
      <SmoothScroll />

      <div ref={pageRef} className="pb-[20rem]">
        <section className="relative isolate overflow-hidden bg-background px-5 py-14 sm:px-8 lg:py-20">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_12%,color-mix(in_oklch,var(--accent),transparent_58%),transparent_30%),radial-gradient(circle_at_92%_10%,color-mix(in_oklch,var(--primary),transparent_78%),transparent_32%)]" />
          <div className="mx-auto grid min-h-[calc(100dvh-10rem)] w-full max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-2xl" data-hero-copy>
              <p className="mb-5 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold tracking-[0.22em] text-accent-foreground uppercase">
                Markets we serve
              </p>
              <h1 className="text-4xl leading-[0.98] font-bold tracking-[-0.06em] text-primary sm:text-6xl lg:text-7xl">
                Markets built for kitchens that scale.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                QMaster plans equipment around how each food business earns,
                serves, and grows.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full px-7 text-sm font-bold"
                >
                  <Link href="/service">Talk to our team</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full px-7 text-sm font-bold"
                >
                  <Link href="#segments">View markets</Link>
                </Button>
              </div>
            </div>

            <div className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-[560px]">
              <div
                className="absolute top-6 left-0 h-[76%] w-[68%] overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/15 will-change-transform"
                data-hero-image
              >
                <Image
                  alt="Commercial kitchen team preparing service"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-primary/10 to-transparent" />
                <div className="absolute right-5 bottom-5 left-5 rounded-3xl border border-white/15 bg-white/12 p-4 text-white shadow-2xl backdrop-blur-md">
                  <p className="text-sm font-semibold">One equipment partner</p>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    From first concept to daily maintenance.
                  </p>
                </div>
              </div>

              <div
                className="absolute top-0 right-0 w-[48%] overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-xl shadow-primary/10 will-change-transform"
                data-hero-image
              >
                <Image
                  alt="Fresh bakery counter"
                  className="aspect-[4/5] object-cover"
                  height={520}
                  sizes="(min-width: 1024px) 24vw, 42vw"
                  src={featuredIndustry.image}
                  width={420}
                />
              </div>

              <div
                className="absolute right-6 bottom-0 w-[58%] rounded-[1.5rem] border border-border bg-card p-5 shadow-2xl shadow-primary/10 will-change-transform sm:p-6"
                data-hero-image
              >
                <p className="text-5xl font-black tracking-[-0.08em] text-primary">
                  04
                </p>
                <p className="mt-2 text-sm leading-6 font-semibold text-card-foreground">
                  focused market models: bakery, coffee, chain, and restaurant.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="segments"
          className="scroll-mt-24 bg-background px-5 py-16 sm:px-8 lg:py-24"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <h2
                className="bg-[linear-gradient(90deg,var(--primary)_0%,var(--primary)_50%,color-mix(in_oklch,var(--primary),transparent_82%)_50%)] bg-[length:200%_100%] bg-clip-text text-3xl leading-tight font-bold tracking-[-0.05em] text-transparent sm:text-5xl lg:text-[3.25rem]"
                data-section-title
              >
                Different concepts need different equipment logic.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                A bakery is not a coffee bar. A chain rollout is not a single
                restaurant. We map equipment to the operating model first.
              </p>
            </div>

            <div
              className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]"
              data-market-grid
            >
              <IndustryFeature industry={featuredIndustry} />

              <div className="grid gap-4 lg:grid-rows-3">
                {secondaryIndustries.map((industry) => (
                  <IndustryCompactCard
                    industry={industry}
                    key={industry.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-background px-5 py-16 sm:px-8 lg:pt-0 lg:pb-28"
          data-support-section
        >
          <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div
                className="relative min-h-[320px] overflow-hidden bg-muted will-change-transform lg:min-h-full"
                data-support-image
              >
                <Image
                  alt="Chef preparing a commercial kitchen for service"
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
              </div>

              <div className="p-7 sm:p-10 lg:p-12" data-support-copy>
                <h2 className="max-w-xl text-4xl leading-tight font-bold tracking-[-0.055em] text-primary sm:text-5xl">
                  One partner from concept to daily operations.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                  We translate the business model into equipment choices that
                  are practical to run, easy to service, and ready to scale.
                </p>

                <div className="mt-10 grid gap-4">
                  {supportSteps.map((step, index) => (
                    <div
                      className="grid gap-4 rounded-3xl border border-border bg-background p-5 sm:grid-cols-[4rem_1fr]"
                      key={step.title}
                    >
                      <p className="text-4xl font-black tracking-[-0.08em] text-accent-foreground/30">
                        0{index + 1}
                      </p>
                      <div>
                        <h3 className="text-xl font-bold tracking-[-0.03em] text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  size="lg"
                  className="mt-8 h-12 rounded-full px-7 text-sm font-bold"
                >
                  <Link href="/product">
                    Browse equipment
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function IndustryFeature({ industry }: { industry: Industry }) {
  const Icon = industry.icon

  return (
    <article
      className="group relative min-h-[560px] scroll-mt-24 overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10 sm:min-h-[600px] lg:min-h-[560px]"
      data-market-card
      id={industry.anchor}
    >
      <Image
        alt={`${industry.name} business model`}
        className="object-cover transition duration-700 group-hover:scale-105"
        fill
        sizes="(min-width: 1024px) 58vw, 100vw"
        src={industry.image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground sm:p-8 lg:p-6">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-black/20 lg:size-12">
          <Icon className="size-6 lg:size-5" />
        </div>
        <p className="mt-6 text-sm font-semibold text-accent lg:mt-4">
          {industry.focus}
        </p>
        <h3 className="mt-2 text-5xl font-bold tracking-[-0.06em] sm:text-6xl lg:text-5xl">
          {industry.name}
        </h3>
        <p className="mt-3 max-w-xl text-base leading-7 text-primary-foreground/78 lg:text-sm lg:leading-6">
          {industry.description}
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3 lg:mt-4">
          {industry.needs.map((need) => (
            <div
              className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md lg:p-3"
              key={need}
            >
              <CheckCircle2 className="size-5 text-accent lg:size-4" />
              <p className="mt-3 text-sm leading-6 font-medium text-primary-foreground/82 lg:mt-2 lg:text-xs lg:leading-5">
                {need}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

function IndustryCompactCard({ industry }: { industry: Industry }) {
  const Icon = industry.icon

  return (
    <Link
      className="group grid scroll-mt-24 overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-primary/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 md:grid-cols-[0.42fr_0.58fr] lg:min-h-0"
      data-market-card
      href={`#${industry.anchor}`}
      id={industry.anchor}
    >
      <div className="relative min-h-56 overflow-hidden bg-muted md:min-h-full">
        <Image
          alt={`${industry.name} equipment planning`}
          className="object-cover transition duration-700 group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 35vw, 100vw"
          src={industry.image}
        />
      </div>
      <div className="p-6 lg:p-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition group-hover:bg-accent group-hover:text-accent-foreground lg:size-10">
          <Icon className="size-5" />
        </div>
        <p className="mt-6 text-sm font-semibold text-muted-foreground lg:mt-3 lg:text-xs">
          {industry.focus}
        </p>
        <h3 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-card-foreground lg:text-2xl">
          {industry.name}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground lg:line-clamp-2 lg:text-xs lg:leading-5">
          {industry.summary}
        </p>
        <span className="mt-6 inline-flex items-center text-sm font-bold text-primary lg:mt-4">
          View model
          <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
