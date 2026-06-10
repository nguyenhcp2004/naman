"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { useEffect, useRef } from "react"

const insights = [
  { value: "100%", label: "Khách hàng\nhài lòng" },
  { value: "8+", label: "Năm kinh nghiệm\nvận hành" },
  { value: "100+", label: "Dự án\nđã hoàn thành" },
]

const projects = [
  { title: "Nhật ký vận hành", image: "/images/hero-banner.png", from: { x: 650, y: -1180, rotate: -8 } },
  { title: "Thị trường thiết bị", image: "/images/hero-banner-2.png", from: { x: 40, y: -1210, rotate: 5 } },
  { title: "Quản lý doanh nghiệp", image: "/images/footer-card.png", from: { x: 670, y: -1260, rotate: 7 } },
  { title: "Bảo trì bảo dưỡng", image: "/images/hero-banner.png", from: { x: 20, y: -1290, rotate: -6 } },
]

gsap.registerPlugin(ScrollTrigger)

export function FeaturedStorySections() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const context = gsap.context(() => {
      gsap.from("[data-know-title]", {
        backgroundPositionX: "100%",
        ease: "none",
        scrollTrigger: { trigger: "[data-know-title]", scrub: 1, start: "top 85%", end: "bottom center" },
      })

      gsap.from("[data-reveal]", {
        y: 56,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-know-section]", start: "top 72%" },
      })

      gsap.to("[data-stack-preview]", {
        opacity: 0,
        scale: 0.92,
        ease: "none",
        scrollTrigger: { trigger: "[data-project-section]", scrub: 1.1, start: "top 92%", end: "top 58%" },
      })

      gsap.fromTo(
        "[data-project-card]",
        (index: number) => ({
          x: projects[index]?.from.x ?? 0,
          y: projects[index]?.from.y ?? -800,
          rotate: projects[index]?.from.rotate ?? 0,
          scale: 0.64,
          zIndex: projects.length - index,
        }),
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          zIndex: 1,
          ease: "none",
          stagger: 0.02,
          scrollTrigger: { trigger: "[data-project-section]", scrub: 1.1, start: "top 92%", end: "top 18%" },
        },
      )
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-20 text-foreground lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_14%,color-mix(in_oklch,var(--accent),transparent_58%),transparent_22%),linear-gradient(180deg,color-mix(in_oklch,var(--background),var(--primary)_4%),var(--background)_54%)]" />
      <div className="absolute right-0 top-20 hidden h-[620px] w-52 bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary),transparent_74%)_1px,transparent_1.8px)] bg-[length:14px_14px] opacity-25 lg:block" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div data-know-section className="relative grid min-h-[690px] gap-10 overflow-visible lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative z-20" data-reveal>
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold tracking-wide text-muted-foreground">
              <span className="size-2 rounded-full bg-accent shadow-[0_0_18px_rgba(190,215,49,0.75)]" />
              Bạn có biết ?
            </p>
            <h2
              data-know-title
              className="max-w-2xl bg-[linear-gradient(90deg,var(--primary)_0%,var(--primary)_50%,color-mix(in_oklch,var(--primary),transparent_82%)_50%)] bg-[length:200%_100%] bg-clip-text text-5xl font-bold leading-[0.95] tracking-[-0.065em] text-transparent sm:text-6xl lg:text-7xl"
            >
              Những giải pháp tạo ra để phát triển cùng doanh nghiệp.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
              Từ ý tưởng đến sản phẩm hoàn chỉnh, QMaster tạo ra giải pháp phù hợp cho từng mô hình vận hành.
            </p>

            <div className="mt-10 grid max-w-2xl gap-5 sm:grid-cols-3">
              {insights.map((item) => (
                <div data-reveal className="rounded-2xl border border-border bg-card p-7 text-center shadow-2xl shadow-primary/8" key={item.label}>
                  <p className="text-4xl font-bold tracking-[-0.06em] text-primary sm:text-5xl">{item.value}</p>
                  <p className="mt-4 whitespace-pre-line text-base leading-6 text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none relative hidden min-h-[520px] lg:block">
            <div className="absolute inset-0 bg-[linear-gradient(color-mix(in_oklch,var(--primary),transparent_92%)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklch,var(--primary),transparent_92%)_1px,transparent_1px)] bg-[length:54px_54px]" />
            <div data-stack-preview className="absolute -right-24 top-32 h-[330px] w-[560px] xl:-right-32">
              {projects.map((project, index) => (
                <div
                  className="absolute left-1/2 top-1/2 h-72 w-[470px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.45rem] border border-border bg-card shadow-2xl shadow-primary/14"
                  key={`stack-${project.title}`}
                  style={{
                    transform: `translate(-50%, -50%) translate(${(index - 1.5) * 18}px, ${index * 10}px) rotate(${[-7, 4, 7, -5][index]}deg)`,
                    zIndex: index + 1,
                  }}
                >
                  <Image
                    alt={project.title}
                    className="object-cover object-[center_82%]"
                    fill
                    sizes="470px"
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/58 via-transparent to-transparent" />
                  <div className="absolute right-5 top-5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
                    {project.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div data-project-section className="relative -mt-10 min-h-[1040px] pt-20 lg:min-h-[1130px]">
          <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.22em] text-primary">
                <span className="size-2 rounded-full bg-accent" />
                Các dự án nổi bật
              </p>
              <h2 className="max-w-3xl text-4xl font-bold tracking-[-0.055em] text-primary sm:text-6xl">
                Giải pháp vận hành tối ưu
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-muted-foreground">
              Công nghệ vận hành đồng hành cùng thiết bị, đội ngũ và thương hiệu.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:px-10">
            {projects.map((project) => (
              <article
                data-project-card
                className="group overflow-hidden rounded-[1.65rem] border border-border bg-card shadow-2xl shadow-primary/10 will-change-transform md:even:translate-y-24"
                key={project.title}
              >
                <div className="relative h-[330px] overflow-hidden bg-muted lg:h-[390px]">
                  <Image
                    alt={project.title}
                    className="object-cover object-[center_82%] transition duration-700 group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/72 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
                    {project.title}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-14 flex size-20 items-center justify-center rounded-full border border-border bg-card text-4xl font-light text-primary shadow-xl shadow-primary/10">
            +
          </div>
        </div>
      </div>
    </section>
  )
}
