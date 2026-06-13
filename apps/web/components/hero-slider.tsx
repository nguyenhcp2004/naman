"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const slides = [
  {
    image: "/images/hero-banner.png",
    eyebrow: "QMaster Operations",
    title: "Reliable equipment. Clearer service. Calmer teams.",
    description: "Connect real assets, project work, and service pressure into one clean command rhythm.",
  },
  {
    image: "/images/hero-banner-2.png",
    eyebrow: "Commercial Systems",
    title: "Built for kitchens, sites, and teams that cannot slow down.",
    description: "Keep the work visible so every action has an owner and every team knows what is next.",
  },
]

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = slides[activeIndex] ?? slides[0]!

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[72svh] overflow-hidden bg-primary text-white lg:min-h-[78svh]">
      {slides.map((slide, index) => (
        <Image
          alt={slide.title}
          className="object-cover object-[center_88%] transition-opacity duration-700 ease-out"
          data-active={activeIndex === index}
          fill
          key={slide.image}
          priority={index === 0}
          sizes="100vw"
          src={slide.image}
          style={{ opacity: activeIndex === index ? 1 : 0 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/8 to-transparent" />

      <div className="relative mx-auto flex min-h-[72svh] w-full max-w-7xl items-center justify-end px-5 py-16 sm:px-8 lg:min-h-[78svh]">
        <div className="max-w-2xl text-right">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-accent">{activeSlide.eyebrow}</p>
          <h1 className="text-4xl font-bold tracking-[-0.06em] text-white drop-shadow-lg sm:text-5xl lg:text-6xl">{activeSlide.title}</h1>
          <p className="ml-auto mt-5 max-w-xl text-base leading-7 text-white/82 drop-shadow sm:text-lg">{activeSlide.description}</p>

          <div className="mt-10 flex justify-end gap-3">
            {slides.map((slide, index) => (
              <button
                aria-label={`Show slide ${index + 1}`}
                className="h-1.5 rounded-full bg-white/35 transition-all data-[active=true]:w-10 data-[active=true]:bg-accent data-[active=false]:w-5"
                data-active={activeIndex === index}
                key={slide.image}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
