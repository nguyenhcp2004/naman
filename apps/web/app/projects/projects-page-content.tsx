"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Ruler,
  ShieldCheck,
} from "lucide-react"

import { SmoothScroll } from "@/components/smooth-scroll"
import { Button } from "@workspace/ui/components/button"
import { Marquee } from "@workspace/ui/components/marquee"

type ProjectSection = {
  _key?: string
  title?: string
  subtitle?: string
}

type ProjectCard = {
  _key?: string
  title?: string
  description?: string
}

type ProjectPage = {
  title?: string
  sections?: ProjectSection[]
  projectPlanningSteps?: string[]
  projectServices?: ProjectCard[]
  projectReferences?: ProjectCard[]
  projectMarqueeItems?: string[]
} | null

type ProjectsPageContentProps = {
  page: ProjectPage
}

const fallbackPlanningSteps = [
  "Review kitchen capacity, workflow, and refrigeration needs before equipment is specified.",
  "Coordinate layout, utilities, delivery timing, and installation requirements with each site.",
  "Support procurement and handover with clear specifications, documentation, and after-sales care.",
]

const fallbackServices = [
  {
    title: "Commercial kitchen equipment",
    description:
      "Professional supply support for food service environments that need dependable equipment.",
  },
  {
    title: "Refrigeration systems",
    description:
      "Cold storage, display, and preservation systems selected for daily operational reliability.",
  },
  {
    title: "Planning consultation",
    description:
      "Guidance for matching equipment specifications to kitchen workflow and site requirements.",
  },
  {
    title: "Installation support",
    description:
      "Delivery coordination, handover support, and after-sales care for commercial projects.",
  },
]

const fallbackScrollText = [
  "Kitchen equipment",
  "Cold storage",
  "Site planning",
  "Delivery support",
  "After-sales care",
]

const fallbackReferences = [
  {
    title: "Restaurant kitchen setup",
    description:
      "Supplied core cooking, preparation, and refrigeration equipment for a high-volume food service space.",
  },
  {
    title: "Hotel back-of-house upgrade",
    description:
      "Supported equipment selection and delivery planning for kitchen operations and cold storage areas.",
  },
  {
    title: "Retail refrigeration supply",
    description:
      "Provided dependable refrigeration equipment for product display, storage, and daily operations.",
  },
]

const referenceImages = [
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80",
  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80",
]

const planningIcons = [ClipboardCheck, Ruler, ShieldCheck]

gsap.registerPlugin(ScrollTrigger)

function withFallback<T>(items: T[] | undefined, fallback: T[]) {
  return items?.length ? items : fallback
}

export function ProjectsPageContent({ page }: ProjectsPageContentProps) {
  const pageRef = useRef<HTMLElement>(null)
  const title = page?.title
  const sections = page?.sections ?? []
  const planningSection = sections[0]
  const servicesSection = sections[1]
  const referencesSection = sections[2]
  const planningSteps = withFallback(
    page?.projectPlanningSteps,
    fallbackPlanningSteps
  )
  const services = withFallback(page?.projectServices, fallbackServices)
  const references = withFallback(page?.projectReferences, fallbackReferences)
  const scrollText = withFallback(page?.projectMarqueeItems, fallbackScrollText)

  useEffect(() => {
    const pageElement = pageRef.current
    if (!pageElement) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) return

    const context = gsap.context(() => {
      gsap.from("[data-hero-copy] > *", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      })

      gsap.from("[data-hero-visual]", {
        y: 54,
        opacity: 0,
        scale: 0.96,
        rotate: -2,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      })

      gsap.from("[data-project-title]", {
        backgroundPositionX: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "[data-project-title]",
          scrub: 1,
          start: "top 84%",
          end: "bottom center",
        },
      })

      gsap.utils
        .toArray<HTMLElement>("[data-reveal-group]")
        .forEach((group) => {
          const targets = group.querySelectorAll("[data-reveal]")

          gsap.from(targets, {
            y: 48,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "transform",
            scrollTrigger: {
              trigger: group,
              start: "top 76%",
            },
          })
        })

      gsap.from("[data-reference-card]", {
        y: 62,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.12,
        clearProps: "transform",
        scrollTrigger: {
          trigger: "[data-reference-grid]",
          start: "top 76%",
        },
      })
    }, pageElement)

    return () => context.revert()
  }, [])

  return (
    <>
      <SmoothScroll />

      <main
        ref={pageRef}
        className="overflow-hidden bg-background text-foreground"
      >
        <section className="relative isolate px-5 py-16 sm:px-8 lg:py-20">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,color-mix(in_oklch,var(--accent),transparent_55%),transparent_28%),radial-gradient(circle_at_82%_18%,color-mix(in_oklch,var(--primary),transparent_78%),transparent_34%)]" />
          <div className="mx-auto grid min-h-[calc(100dvh-9rem)] w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div data-hero-copy>
              <p className="mb-5 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold tracking-[0.22em] text-accent-foreground uppercase">
                Projects
              </p>
              <h1 className="max-w-4xl text-4xl leading-[0.98] font-bold tracking-[-0.06em] text-primary sm:text-6xl lg:text-7xl">
                {title ?? "Kitchen projects supplied with control."}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {planningSection?.subtitle ??
                  "QMaster plans, supplies, and supports commercial kitchen equipment for demanding food-service environments."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full px-7 text-sm font-bold"
                >
                  <Link href="/service">Start a project</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full px-7 text-sm font-bold"
                >
                  <Link href="#references">View references</Link>
                </Button>
              </div>
            </div>

            <div className="relative min-h-[380px] sm:min-h-[520px]">
              <div
                data-hero-visual
                className="absolute inset-x-0 top-4 h-[76%] overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/15 sm:right-0 sm:left-6"
              >
                <Image
                  alt="Commercial kitchen project installation"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/15 to-transparent" />
              </div>

              <div
                data-hero-visual
                className="absolute right-0 bottom-0 left-4 rounded-[1.5rem] border border-white/15 bg-primary p-5 text-primary-foreground shadow-2xl shadow-primary/25 sm:left-auto sm:w-[58%] sm:p-6"
              >
                <p className="text-sm font-semibold text-accent">
                  Planned supply chain
                </p>
                <p className="mt-3 text-3xl font-black tracking-[-0.07em] sm:text-5xl">
                  03 steps
                </p>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/75">
                  Site review, equipment package, delivery and handover support.
                </p>
              </div>

              <div
                data-hero-visual
                className="absolute top-0 right-4 hidden w-44 overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-xl shadow-primary/10 sm:block lg:w-52"
              >
                <Image
                  alt="Chef checking commercial kitchen preparation"
                  className="aspect-[4/5] object-cover"
                  height={420}
                  sizes="(min-width: 1024px) 13vw, 28vw"
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80"
                  width={320}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-y border-border bg-card py-4">
          <Marquee
            pauseOnHover
            repeat={6}
            className="py-0 [--duration:30s] [--gap:2rem]"
          >
            {scrollText.map((item) => (
              <span
                className="flex shrink-0 items-center gap-8 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase sm:text-sm"
                key={item}
              >
                {item}
                <span className="size-2 rounded-full bg-accent" />
              </span>
            ))}
          </Marquee>
        </div>

        <section
          data-reveal-group
          className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:py-24"
        >
          <div
            data-reveal
            className="rounded-[2rem] border border-border bg-primary p-7 text-primary-foreground shadow-2xl shadow-primary/15 sm:p-9"
          >
            <h2 className="max-w-xl text-3xl leading-tight font-bold tracking-[-0.045em] sm:text-5xl">
              {planningSection?.title ??
                "Turn equipment requirements into a practical supply plan."}
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-primary-foreground/75">
              {planningSection?.subtitle ??
                "Each project is planned around kitchen workflow, refrigeration performance, site constraints, and long-term reliability."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {planningSteps.map((step, index) => {
              const Icon = planningIcons[index % planningIcons.length]!

              return (
                <article
                  data-reveal
                  className="grid gap-5 rounded-[1.5rem] border border-border bg-card p-5 shadow-xl shadow-primary/5 sm:grid-cols-[4rem_1fr]"
                  key={step}
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black tracking-[0.16em] text-muted-foreground uppercase">
                      0{index + 1}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {step}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section
          data-reveal-group
          className="bg-background px-5 pb-16 sm:px-8 lg:pb-24"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div data-reveal className="max-w-3xl">
              <h2
                data-project-title
                className="bg-[linear-gradient(90deg,var(--primary)_0%,var(--primary)_50%,color-mix(in_oklch,var(--primary),transparent_82%)_50%)] bg-[length:200%_100%] bg-clip-text text-3xl leading-tight font-bold tracking-[-0.045em] text-transparent sm:text-5xl"
              >
                {servicesSection?.title ??
                  "Services that keep projects moving."}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                {servicesSection?.subtitle ??
                  "From consultation to equipment handover, every service is organized around clearer project execution."}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => (
                <article
                  data-reveal
                  className="group rounded-[1.5rem] border border-border bg-card p-6 shadow-xl shadow-primary/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                  key={service._key ?? service.title}
                >
                  <span className="mb-9 block h-1.5 w-12 rounded-full bg-accent transition group-hover:w-20" />
                  <h3 className="text-xl font-bold tracking-[-0.03em] text-card-foreground">
                    {service.title}
                  </h3>
                  {service.description ? (
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          data-reveal-group
          className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-28"
          id="references"
        >
          <div data-reveal className="max-w-3xl">
            <h2 className="text-3xl leading-tight font-bold tracking-[-0.045em] text-primary sm:text-5xl">
              {referencesSection?.title ??
                "References across working kitchens."}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              {referencesSection?.subtitle ??
                "Example project types show how QMaster supports equipment needs from planning through delivery and handover."}
            </p>
          </div>

          <div data-reference-grid className="mt-8 grid gap-5 lg:grid-cols-3">
            {references.map((reference, index) => (
              <article
                data-reference-card
                className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-primary/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                key={reference._key ?? reference.title}
              >
                <div className="relative min-h-64 overflow-hidden bg-muted">
                  <Image
                    alt={`${reference.title} project reference`}
                    className="object-cover transition duration-700 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 30vw, 92vw"
                    src={referenceImages[index % referenceImages.length]!}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2 text-sm font-bold text-primary">
                    <CheckCircle2 className="size-4 text-accent" />
                    Reference
                  </div>
                  <h3 className="text-2xl font-bold tracking-[-0.04em] text-card-foreground">
                    {reference.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {reference.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section data-reveal-group className="px-5 pb-[20rem] sm:px-8">
          <div
            data-reveal
            className="mx-auto flex w-full max-w-7xl flex-col gap-6 rounded-[2rem] border border-border bg-primary p-7 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h2 className="max-w-2xl text-3xl leading-tight font-bold tracking-[-0.045em] sm:text-5xl">
                Ready to plan the next kitchen?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-primary-foreground/75 sm:text-base sm:leading-7">
                Share the site, menu, and operating model. We will turn it into
                a practical equipment direction.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 w-fit rounded-full bg-accent px-7 text-sm font-bold text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/service">
                Talk to QMaster
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
