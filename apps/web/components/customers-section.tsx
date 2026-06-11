"use client"

import { type COBEOptions } from "cobe"

import { Globe } from "@workspace/ui/components/globe"
import { Marquee } from "@workspace/ui/components/marquee"

const CUSTOM_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1], // white earth
  markerColor: [0.05, 0.31, 0.56], // Corporate Navy #0D4E8E (default dot)
  glowColor: [1, 1, 1], // white glow
  markers: [
    // Vietnam — accent hubs
    { location: [10.8231, 106.6297], size: 0.10, color: [0.745, 0.843, 0.192] }, // HCMC
    { location: [21.0278, 105.8342], size: 0.09, color: [0.745, 0.843, 0.192] }, // Hanoi
    { location: [16.0544, 108.2022], size: 0.07, color: [0.745, 0.843, 0.192] }, // Da Nang
    { location: [10.3463, 107.0843], size: 0.05, color: [0.745, 0.843, 0.192] }, // Vung Tau
    { location: [20.8449, 106.6881], size: 0.05, color: [0.745, 0.843, 0.192] }, // Hai Phong
    { location: [18.6733, 105.6921], size: 0.04, color: [0.745, 0.843, 0.192] }, // Vinh
    { location: [13.7698, 109.2072], size: 0.04, color: [0.745, 0.843, 0.192] }, // Quy Nhon
    { location: [10.0333, 105.7833], size: 0.04, color: [0.745, 0.843, 0.192] }, // Can Tho
    { location: [21.3020, 103.8880], size: 0.04, color: [0.745, 0.843, 0.192] }, // Son La
    // Southeast Asia — accent
    { location: [1.3521, 103.8198], size: 0.07, color: [0.745, 0.843, 0.192] }, // Singapore
    { location: [13.7563, 100.5018], size: 0.06, color: [0.745, 0.843, 0.192] }, // Bangkok
    { location: [3.139, 101.6869], size: 0.06, color: [0.745, 0.843, 0.192] }, // Kuala Lumpur
    { location: [-6.2088, 106.8456], size: 0.06, color: [0.745, 0.843, 0.192] }, // Jakarta
    { location: [14.0583, 108.2772], size: 0.05, color: [0.745, 0.843, 0.192] }, // Pleiku (Central Highlands)
    { location: [21.9842, 96.0844], size: 0.04, color: [0.745, 0.843, 0.192] }, // Mandalay
    // Global — accent
    { location: [40.7128, -74.006], size: 0.08, color: [0.745, 0.843, 0.192] }, // New York
    { location: [51.5074, -0.1278], size: 0.07, color: [0.745, 0.843, 0.192] }, // London
    { location: [48.8566, 2.3522], size: 0.06, color: [0.745, 0.843, 0.192] }, // Paris
    { location: [35.6762, 139.6503], size: 0.07, color: [0.745, 0.843, 0.192] }, // Tokyo
    { location: [37.5665, 126.978], size: 0.06, color: [0.745, 0.843, 0.192] }, // Seoul
    { location: [22.3193, 114.1694], size: 0.07, color: [0.745, 0.843, 0.192] }, // Hong Kong
    { location: [31.2304, 121.4737], size: 0.07, color: [0.745, 0.843, 0.192] }, // Shanghai
    { location: [39.9042, 116.4074], size: 0.07, color: [0.745, 0.843, 0.192] }, // Beijing
    { location: [25.2048, 55.2708], size: 0.06, color: [0.745, 0.843, 0.192] }, // Dubai
    { location: [-33.8688, 151.2093], size: 0.06, color: [0.745, 0.843, 0.192] }, // Sydney
    { location: [55.7558, 37.6173], size: 0.06, color: [0.745, 0.843, 0.192] }, // Moscow
    { location: [19.4326, -99.1332], size: 0.06, color: [0.745, 0.843, 0.192] }, // Mexico City
    { location: [-23.5505, -46.6333], size: 0.06, color: [0.745, 0.843, 0.192] }, // Sao Paulo
    { location: [28.6139, 77.209], size: 0.07, color: [0.745, 0.843, 0.192] }, // New Delhi
    { location: [1.2921, 36.8219], size: 0.05, color: [0.745, 0.843, 0.192] }, // Nairobi

    // Secondary cities — primary navy (inherit from markerColor)
    { location: [18.9694, 72.8311], size: 0.05 }, // Mumbai
    { location: [31.5497, 74.3436], size: 0.04 }, // Lahore
    { location: [-26.2041, 28.0473], size: 0.04 }, // Johannesburg
    { location: [30.0444, 31.2357], size: 0.04 }, // Cairo
    { location: [41.0082, 28.9784], size: 0.04 }, // Istanbul
    { location: [52.5200, 13.4050], size: 0.04 }, // Berlin
    { location: [41.9028, 12.4964], size: 0.04 }, // Rome
    { location: [-34.6037, -58.3816], size: 0.04 }, // Buenos Aires
    { location: [37.7749, -122.4194], size: 0.04 }, // San Francisco
    { location: [34.0522, -118.2437], size: 0.04 }, // Los Angeles
    { location: [43.6532, -79.3832], size: 0.04 }, // Toronto
    { location: [52.3702, 4.8952], size: 0.03 }, // Amsterdam
    { location: [59.3293, 18.0686], size: 0.03 }, // Stockholm
    { location: [47.6062, -122.3321], size: 0.03 }, // Seattle
    { location: [37.5665, 126.978], size: 0.03 }, // Seoul small (extra dot)
    { location: [21.0278, 105.8342], size: 0.03 }, // Hanoi small (extra dot)
  ],
}

const brandImages = Array.from({ length: 14 }, (_, i) => i + 1)

function BrandLogo({ index }: { index: number }) {
  return (
    <figure className="relative flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-border bg-card p-3 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/partner/brand_${index}.jpg`}
        alt={`Partner brand ${index}`}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
      />
    </figure>
  )
}

export function CustomersSection() {
  return (
    <section className="relative overflow-hidden bg-background pb-36 pt-16 lg:pb-52 lg:pt-20">
      {/* top border line */}
      <div className="absolute inset-x-0 top-0 h-px bg-border" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* heading */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-3 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(190,215,49,0.75)]" />
            Partners & Customers
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.055em] text-primary sm:text-4xl">
            Trusted by{" "}
            <span className="text-accent-foreground">leading brands</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Over 100 businesses operate with QMaster every day.
          </p>
        </div>

        {/* globe */}
        <div className="relative mx-auto flex h-[320px] w-full max-w-lg items-center justify-center md:h-[380px]">
          <Globe
            config={CUSTOM_GLOBE_CONFIG}
            className="absolute inset-0 mx-auto w-full max-w-[320px] md:max-w-[380px]"
          />
        </div>

        {/* marquee brands */}
        <div className="relative mt-6 overflow-hidden">
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

          <Marquee reverse pauseOnHover repeat={2} className="[--duration:40s]">
            {brandImages.map((i) => (
              <BrandLogo key={i} index={i} />
            ))}
          </Marquee>

          <Marquee pauseOnHover repeat={2} className="mt-3 [--duration:35s]">
            {[...brandImages].reverse().map((i) => (
              <BrandLogo key={i} index={i} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
