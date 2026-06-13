"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const GG_MAP_URL =
  "https://www.google.com/maps/search/149C+Truong+Dinh,+phuong+Nhieu+Loc,+tp+HCM"

type FooterLink = {
  label: string
  href?: string
}

type FooterLinkGroup = {
  title: string
  links: FooterLink[]
}

const footerLinks: FooterLinkGroup[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Services", href: "/service" },
      { label: "Company", href: "/company" },
      { label: "Contact us", href: "mailto:nguyenhainam17052004@gmail.com" },
    ],
  },
  {
    title: "Office Hours",
    links: [
      { label: "Mon - Fri: 8:00 AM - 5:30 PM" },
      { label: "Sat: 8:00 AM - 12:00 PM" },
      { label: "Sun: Closed" },
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
      const progress = Math.min(
        Math.max((window.innerHeight - top) / (window.innerHeight * 0.8), 0),
        1
      )

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
    <footer
      ref={footerRef}
      className="bg-background px-3 pt-16 pb-4 sm:px-5 sm:pt-20"
    >
      <div className="relative mx-auto w-full max-w-7xl rounded-[1.75rem] border border-border/80 bg-primary px-5 pt-32 pb-6 text-primary-foreground shadow-2xl shadow-primary/20 sm:px-8 sm:pt-36 lg:px-16">
        <div
          className="absolute top-0 left-1/2 w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-[1.65rem] border border-border/80 bg-card p-6 text-card-foreground shadow-2xl shadow-primary/20 transition-transform duration-700 ease-out sm:p-8 lg:p-10"
          style={{ transform: `translate(-50%, calc(-62% + ${cardLift}px))` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_6%_95%,color-mix(in_oklch,var(--accent),transparent_58%),transparent_28%),radial-gradient(circle_at_85%_8%,color-mix(in_oklch,var(--primary),transparent_72%),transparent_28%),linear-gradient(90deg,color-mix(in_oklch,var(--background),var(--primary)_7%),var(--background)_58%)]" />
          <div className="absolute right-0 bottom-0 hidden h-full w-[52%] sm:block">
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
              Clear workflows, reliable services, and sharper visibility for
              every team.
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
            <Link
              className="inline-flex rounded-full bg-white px-4 py-3"
              href="/"
              aria-label="QMaster home"
            >
              <Image
                alt="QMaster"
                className="h-9 w-auto"
                height={180}
                src="/images/logo.png"
                width={653}
              />
            </Link>
            <address className="mt-6 text-sm leading-6 text-primary-foreground/70 not-italic">
              <a
                className="flex items-start gap-2 text-primary-foreground/70 transition hover:text-accent"
                href={GG_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  149C Truong Dinh, Nhieu Loc Ward
                  <br />
                  Ho Chi Minh City, Vietnam
                </span>
              </a>
            </address>

            <div className="mt-5 flex flex-col gap-4 text-sm">
              <a
                className="flex items-center gap-2 text-primary-foreground transition hover:text-accent"
                href="tel:0931613788"
              >
                <Phone className="size-4 shrink-0 text-accent" />
                0931 613 788
              </a>
              <a
                className="flex items-center gap-2 text-primary-foreground transition hover:text-accent"
                href="mailto:nguyenhainam17052004@gmail.com"
              >
                <Mail className="size-4 shrink-0 text-accent" />
                nguyenhainam17052004@gmail.com
              </a>

              {/* Social icons */}
              <div className="mt-2 flex items-center gap-2">
                <a
                  className="flex size-9 items-center justify-center rounded-lg border border-primary-foreground/20 text-primary-foreground/80 transition hover:border-accent hover:bg-accent/10 hover:text-accent"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  className="flex size-9 items-center justify-center rounded-lg border border-primary-foreground/20 text-primary-foreground/80 transition hover:border-accent hover:bg-accent/10 hover:text-accent"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  className="flex size-9 items-center justify-center rounded-lg border border-primary-foreground/20 text-primary-foreground/80 transition hover:border-accent hover:bg-accent/10 hover:text-accent"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect width="16" height="16" x="4" y="4" rx="4" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M17.5 6.5h.01" />
                  </svg>
                </a>
                <a
                  className="flex size-9 items-center justify-center rounded-lg border border-primary-foreground/20 text-primary-foreground/80 transition hover:border-accent hover:bg-accent/10 hover:text-accent"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <svg
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.46 3.5 12 3.5 12 3.5s-7.46 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12c0 1.95.16 3.88.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.92.55 9.38.55 9.38.55s7.46 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14c.33-1.93.5-3.86.5-5.81 0-1.95-.17-3.88-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-medium text-accent">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) =>
                    link.href ? (
                      <Link
                        className="block w-full text-sm text-primary-foreground/80 transition hover:text-accent"
                        href={link.href}
                        key={link.label}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span
                        className="block w-full text-sm text-primary-foreground/60"
                        key={link.label}
                      >
                        {link.label}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-20 text-center text-xs text-primary-foreground/55">
          © {new Date().getFullYear()} QMaster. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
