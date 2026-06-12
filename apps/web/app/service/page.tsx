"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@workspace/ui/components/button"

const services = [
  {
    title: "Equipment Installation",
    desc: "Site survey, layout planning, transport, and installation of commercial kitchen equipment to safety standards.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    title: "Preventive Maintenance",
    desc: "Scheduled maintenance based on usage frequency — full inspection and part replacement before failure occurs.",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80",
  },
  {
    title: "Emergency Repair",
    desc: "24/7 hotline support with on-site technician arrival within 2 hours for urgent kitchen equipment breakdowns.",
    image: "https://images.unsplash.com/photo-1613923255260-af243a4e0f52?w=600&q=80",
  },
  {
    title: "Safety Inspection",
    desc: "Gas, electrical, and plumbing system certification for commercial kitchens — compliant with fire safety regulations.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
  },
  {
    title: "Kitchen Design Consulting",
    desc: "Floor-plan optimization from cooking lines and cold storage to exhaust systems — designed for workflow efficiency.",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
  },
]

const steps = [
  { step: "01", title: "Request Intake", desc: "Call or submit a request online. Our team captures all details within 30 minutes." },
  { step: "02", title: "Site Survey & Quote", desc: "A certified technician inspects equipment on-site and sends a detailed quote within 4 hours." },
  { step: "03", title: "Service Execution", desc: "Our crew carries out installation, repair, or maintenance following ISO 9001 procedures." },
  { step: "04", title: "Acceptance & Handover", desc: "Test-run every piece of equipment with you present. Sign off and receive operation guidance." },
  { step: "05", title: "Aftercare & Warranty", desc: "30-day active follow-up. 12–24 month warranty on parts and labor depending on equipment." },
]

const equipment = [
  { name: "Commercial Ranges", count: "130+" },
  { name: "Rice Steamers", count: "85+" },
  { name: "Convection Ovens", count: "60+" },
  { name: "Dishwashers", count: "40+" },
  { name: "Exhaust Hoods", count: "70+" },
  { name: "Refrigeration Units", count: "95+" },
]

const stats = [
  { value: "15+", label: "Years in\nkitchen operations" },
  { value: "500+", label: "Equipment\nserviced" },
  { value: "98%", label: "Client\nsatisfaction" },
  { value: "2h", label: "Avg. emergency\nresponse" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const easeOut = [0.25, 0.1, 0.25, 1] as const

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut } },
}

export default function ServicePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,color-mix(in_oklch,var(--primary),transparent_82%)_0%,transparent_42%)]" />
        <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl flex-col justify-center gap-10 px-5 pb-8 pt-12 sm:px-8 lg:flex-row lg:items-start lg:pb-0 lg:justify-start lg:pt-35">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <motion.p
              className="mb-4 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent-foreground"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              Our Services
            </motion.p>
            <h1 className="text-5xl font-bold tracking-[-0.055em] text-primary md:text-7xl">
              Your kitchen
              <br />
              <span className="text-accent-foreground">never stops.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              We keep commercial kitchens running at peak performance — installation, maintenance, repair,
              and safety certification for restaurants, hotels, and F&B chains.
            </p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button asChild size="lg" className="h-12 rounded-full px-7 text-sm font-bold">
                <Link href="tel:0931613788">Call now: 0931 613 788</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-7 text-sm font-bold">
                <Link href="#services">View services</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative min-h-[300px] w-full overflow-hidden rounded-[1.75rem] border border-border shadow-2xl shadow-primary/10 lg:min-h-[460px] lg:max-w-lg"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: easeOut }}
          >
            <Image
              alt="Modern commercial kitchen"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section id="services" className="bg-background px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">
                <span className="size-2 rounded-full bg-accent" />
                What we do
              </p>
              <h2 className="max-w-2xl text-4xl font-bold tracking-[-0.055em] text-primary sm:text-5xl">
                End-to-end kitchen equipment services
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-muted-foreground">
              From first install to long-term maintenance — one partner for your entire kitchen system.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {services.map((svc) => (
              <motion.article
                key={svc.title}
                variants={itemVariants}
                className="group overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-xl shadow-primary/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="relative h-52 overflow-hidden bg-muted">
                  <Image
                    alt={svc.title}
                    className="object-cover transition duration-700 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    src={svc.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold tracking-tight text-card-foreground">{svc.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{svc.desc}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="relative overflow-hidden bg-background px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_50%,color-mix(in_oklch,var(--primary),transparent_76%)_0%,transparent_42%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-border" />

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            className="mx-auto mb-16 max-w-2xl text-center"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <p className="mb-4 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">
              <span className="size-2 rounded-full bg-accent shadow-[0_0_18px_rgba(190,215,49,0.75)]" />
              How it works
            </p>
            <h2 className="text-4xl font-bold tracking-[-0.055em] text-primary sm:text-5xl">
              From request to handover
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-muted-foreground">
              A transparent 5-step process that keeps every service on time and on spec.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 lg:grid-cols-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {steps.map((s) => (
              <motion.div
                key={s.step}
                variants={itemVariants}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-lg shadow-primary/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10"
              >
                <p className="text-5xl font-black tracking-[-0.08em] text-primary/15 transition group-hover:text-primary/30">
                  {s.step}
                </p>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-card-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Equipment Types ── */}
      <section className="bg-background px-5 py-20 sm:px-8 lg:py-28">
        <div className="absolute inset-x-0 h-px bg-border" />
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            className="relative mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">
                <span className="size-2 rounded-full bg-accent" />
                Equipment expertise
              </p>
              <h2 className="max-w-2xl text-4xl font-bold tracking-[-0.055em] text-primary sm:text-5xl">
                500+ kitchen units serviced
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-muted-foreground">
              We have hands-on experience with major local and international equipment brands.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {equipment.map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/30"
              >
                <p className="font-bold tracking-tight text-card-foreground">{item.name}</p>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-bold text-accent-foreground">
                  {item.count}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-border shadow-2xl shadow-primary/10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <div className="relative h-64 overflow-hidden bg-muted sm:h-72 lg:h-80">
              <Image
                alt="Commercial kitchen equipment at QMaster"
                className="object-cover"
                fill
                sizes="100vw"
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/72 via-background/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Trusted partner</p>
              <p className="mt-2 max-w-sm text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
                Your equipment runs like new — guaranteed.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative bg-background px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            className="rounded-[2rem] border border-border bg-primary p-8 shadow-2xl shadow-primary/20 sm:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-[-0.055em] text-primary-foreground sm:text-5xl">
                Why QMaster?
              </h2>
              <p className="mt-4 text-base leading-7 text-primary-foreground/70">
                A decade of keeping Vietnam&apos;s finest kitchens running without a hitch.
              </p>
            </div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.value}
                  variants={itemVariants}
                  className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 text-center backdrop-blur"
                >
                  <p className="text-4xl font-bold tracking-[-0.05em] text-accent sm:text-5xl">{stat.value}</p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-5 text-primary-foreground/70">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
