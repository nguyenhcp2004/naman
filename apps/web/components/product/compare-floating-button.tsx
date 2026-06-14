"use client"

import Link from "next/link"
import { ArrowLeftRight } from "lucide-react"

import { useCompareProducts } from "./use-compare-products"

export function CompareFloatingButton() {
  const { products } = useCompareProducts()

  if (products.length === 0) {
    return null
  }

  return (
    <Link
      href="/compare"
      className="fixed right-5 bottom-5 z-50 inline-flex h-14 items-center gap-3 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      aria-label={`Compare ${products.length} product${products.length === 1 ? "" : "s"}`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15">
        <ArrowLeftRight className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-background px-1 text-[11px] font-black text-foreground">
          {products.length}
        </span>
      </span>
      Compare
    </Link>
  )
}
