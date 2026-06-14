"use client"

import { motion } from "motion/react"

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

type ProjectPageContentProps = {
  page: ProjectPage
}

const fallbackPlanningSteps = [
  "Review kitchen capacity, workflow, and refrigeration needs before planning equipment.",
  "Coordinate layout, utilities, delivery timing, and installation requirements with each site.",
  "Support procurement and handover with clear specifications, documentation, and after-sales care.",
]

const fallbackServices = [
  {
    title: "Commercial kitchen equipment",
    description: "Professional supply support for food service environments that need dependable equipment.",
  },
  {
    title: "Refrigeration systems",
    description: "Cold storage, display, and preservation systems selected for daily operational reliability.",
  },
  {
    title: "Project consultation",
    description: "Guidance for matching equipment specifications to kitchen workflow and site requirements.",
  },
  {
    title: "Installation support",
    description: "Delivery coordination, handover support, and after-sales care for commercial projects.",
  },
]

const fallbackScrollText = ["Kitchen equipment", "Cold storage", "Site planning", "Delivery support", "After-sales care"]

const fallbackReferences = [
  {
    title: "Restaurant kitchen setup",
    description: "Supplied core cooking, preparation, and refrigeration equipment for a high-volume food service space.",
  },
  {
    title: "Hotel back-of-house upgrade",
    description: "Supported equipment selection and delivery planning for kitchen operations and cold storage areas.",
  },
  {
    title: "Retail refrigeration supply",
    description: "Provided dependable refrigeration equipment for product display, storage, and daily operations.",
  },
]

function withFallback<T>(items: T[] | undefined, fallback: T[]) {
  return items?.length ? items : fallback
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export function ProjectPageContent({ page }: ProjectPageContentProps) {
  const title = page?.title
  const sections = page?.sections ?? []
  const planningSection = sections[0]
  const servicesSection = sections[1]
  const referencesSection = sections[2]
  const planningSteps = withFallback(page?.projectPlanningSteps, fallbackPlanningSteps)
  const services = withFallback(page?.projectServices, fallbackServices)
  const references = withFallback(page?.projectReferences, fallbackReferences)
  const scrollText = withFallback(page?.projectMarqueeItems, fallbackScrollText)

  return (
    <main className="bg-background text-foreground">
      <motion.section
        animate="visible"
        className="mx-auto grid min-h-[calc(100svh-9rem)] w-full max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.85fr]"
        initial="hidden"
        variants={stagger}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <p className="mb-4 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent-foreground">
            Project
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-foreground md:text-7xl">
            {title ?? "Kitchen and refrigeration projects supplied with professional care."}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {planningSection?.subtitle ??
              "Plan, source, and deliver commercial kitchen and refrigeration equipment for restaurants, hotels, retail, and food service operations."}
          </p>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-black/10"
          variants={fadeUp}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Supply process</p>
          <div className="mt-6 space-y-4">
            {planningSteps.map((step, index) => (
              <motion.div
                className="flex gap-4 rounded-2xl border border-border bg-background p-4"
                key={step}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-muted-foreground">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <div className="mb-16 overflow-hidden border-y border-border bg-card py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          className="flex w-[200%] whitespace-nowrap"
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((group) => (
            <div className="flex w-1/2 shrink-0 justify-around gap-6" key={group}>
              {scrollText.map((item) => (
                <span
                  className="flex items-center gap-6 text-sm font-semibold uppercase tracking-[0.26em] text-muted-foreground"
                  key={`${group}-${item}`}
                >
                  {item}
                  <span className="size-2 rounded-full bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.section
        className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]"
        initial="hidden"
        variants={stagger}
        viewport={{ once: true, margin: "-120px" }}
        whileInView="visible"
      >
        <motion.div
          className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] opacity-80">Project planning</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            {planningSection?.title ?? "Turn equipment requirements into a practical supply plan."}
          </h2>
          <p className="mt-5 leading-7 opacity-80">
            {planningSection?.subtitle ??
              "From concept to installation, each project is planned around kitchen workflow, refrigeration performance, site constraints, and long-term reliability."}
          </p>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-border bg-card p-8"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {servicesSection?.title ?? "Our services"}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <motion.div
                className="rounded-2xl border border-border bg-background p-5"
                key={service._key ?? service.title}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <span className="mb-8 block h-1.5 w-12 rounded-full bg-accent" />
                <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                {service.description ? (
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
                ) : null}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8"
        initial="hidden"
        variants={stagger}
        viewport={{ once: true, margin: "-120px" }}
        whileInView="visible"
      >
        <motion.div
          className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="mb-3 w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-secondary-foreground">
              Project references
            </p>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              {referencesSection?.title ?? "Project references across kitchen and refrigeration environments."}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            {referencesSection?.subtitle ??
              "Example project types show how QMaster supports equipment needs from consultation through delivery and handover."}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {references.map((reference) => (
            <motion.article
              className="rounded-3xl border border-border bg-card p-6"
              key={reference._key ?? reference.title}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="mb-10 h-32 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--accent),transparent_20%),transparent_36%),linear-gradient(135deg,color-mix(in_oklch,var(--primary),white_10%),var(--primary))]" />
              <h3 className="text-2xl font-semibold tracking-tight">{reference.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{reference.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </main>
  )
}
