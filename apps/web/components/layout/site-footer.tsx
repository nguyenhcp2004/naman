"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Projects", href: "/project" },
      { label: "Services", href: "/service" },
      { label: "Company", href: "/company" },
      { label: "Contact us", href: "mailto:hello@qmaster.com" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Youtube", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
]


export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [cardLift, setCardLift] = useState(0)

  useEffect(() => {
    const updateCardLift = () => {
      const footer = footerRef.current

      if (!footer) return

      const { top } = footer.getBoundingClientRect()
      const progress = Math.min(Math.max((window.innerHeight - top) / (window.innerHeight * 0.8), 0), 1)

      setCardLift(Math.round(progress * -34))
    }

    updateCardLift()
    window.addEventListener("scroll", updateCardLift, { passive: true })
    window.addEventListener("resize", updateCardLift)

    return () => {
      window.removeEventListener("scroll", updateCardLift)
      window.removeEventListener("resize", updateCardLift)
    }
  }, [])

  return (
    <footer ref={footerRef} className="bg-background px-3 pb-4 pt-16 sm:px-5 sm:pt-20">
      <div className="relative mx-auto w-full max-w-7xl rounded-[1.75rem] border border-border/80 bg-primary px-5 pb-6 pt-32 text-primary-foreground shadow-2xl shadow-primary/20 sm:px-8 sm:pt-36 lg:px-16">
        <div
          className="absolute left-1/2 top-0 w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-[1.65rem] border border-border/80 bg-card p-6 text-card-foreground shadow-2xl shadow-primary/20 transition-transform duration-700 ease-out sm:p-8 lg:p-10"
          style={{ transform: `translate(-50%, calc(-62% + ${cardLift}px))` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_6%_95%,color-mix(in_oklch,var(--accent),transparent_58%),transparent_28%),radial-gradient(circle_at_85%_8%,color-mix(in_oklch,var(--primary),transparent_72%),transparent_28%),linear-gradient(90deg,color-mix(in_oklch,var(--background),var(--primary)_7%),var(--background)_58%)]" />
          <div className="absolute bottom-0 right-0 hidden h-full w-[52%] sm:block">
            <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-card to-transparent" />
            <Image
              alt="QMaster equipment showcase"
              className="object-cover object-[58%_72%]"
              fill
              sizes="(min-width: 1024px) 520px, 45vw"
              src="/images/footer-card.png"
            />
            <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,var(--card)_0%,transparent_34%),radial-gradient(circle_at_70%_40%,transparent_44%,var(--card)_92%)] opacity-25" />
          </div>

          <div className="relative max-w-xl">
            <h2 className="text-3xl font-bold tracking-[-0.055em] text-primary sm:text-5xl">
              Experience superior project operations
            </h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-muted-foreground">
              Clear workflows, reliable services, and sharper visibility for every team.
            </p>
            <Link
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
              href="/service"
            >
              Get started
            </Link>
          </div>
        </div>

        <div className="grid gap-10 pt-4 md:grid-cols-[1.1fr_1.4fr] lg:gap-20">
          <div>
            <Link className="inline-flex rounded-full bg-white px-4 py-3" href="/" aria-label="QMaster home">
              <Image alt="QMaster" className="h-9 w-auto" height={180} src="/images/logo.png" width={653} />
            </Link>
            <address className="mt-6 not-italic text-sm leading-6 text-primary-foreground/70">
              QMaster Operations Suite
              <br />
              Built for project, service, and company clarity
              <br />
              Phnom Penh, Cambodia
            </address>

            <div className="mt-7 grid max-w-md grid-cols-2 gap-6 text-sm">
              <div>
                <p className="mb-2 text-primary-foreground/50">Phone number</p>
                <a className="text-primary-foreground transition hover:text-accent" href="tel:+855000000000">
                  +855 00 000 000
                </a>
              </div>
              <div>
                <p className="mb-2 text-primary-foreground/50">Email</p>
                <a className="text-primary-foreground transition hover:text-accent" href="mailto:hello@qmaster.com">
                  hello@qmaster.com
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-medium text-accent">{group.title}</h3>
                <div className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <Link className="text-sm text-primary-foreground/80 transition hover:text-accent" href={link.href} key={link.label}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-20 text-center text-xs text-primary-foreground/55">© {new Date().getFullYear()} QMaster. All rights reserved.</p>
      </div>
    </footer>
  )
}
