"use client"

import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import {
  Sparkles,
  Plus,
  CheckCircle2,
  Info,
  Check,
  ArrowLeft,
  AlertCircle
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Product } from "@/app/product/types"
import { productsData } from "@/app/product/data"
import { Blueprint } from "@/components/product/blueprint"
import { ProductCard } from "@/components/product/product-card"
import { QuoteDrawer } from "@/components/product/quote-drawer"
import { DetailBreadcrumbs } from "@/components/product/detail-breadcrumbs"
import { DetailTabs } from "@/components/product/detail-tabs"

type TabType = "specs" | "downloads" | "warranty"

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>("specs")

  // Quote Basket State (Shared via localStorage)
  const [quoteItems, setQuoteItems] = useState<{ product: Product; quantity: number }[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" })

  // Load from localStorage on mount
  useEffect(() => {
    const loaded: { product: Product; quantity: number }[] = []
    
    // 1. Try qmaster-quote-basket first
    try {
      const stored = localStorage.getItem("qmaster-quote-basket")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          parsed.forEach((item: { product?: { id: string }; productId?: string; quantity?: number }) => {
              const product = productsData.find((p: Product) => p.id === (item.product?.id || item.productId))
              if (product) {
                loaded.push({ product, quantity: item.quantity || 1 })
              }
            })
          }
        }
      } catch (e) {
        console.error("Error reading quote basket from localStorage", e)
      }

      // 2. Try quote_items if nothing was loaded
      if (loaded.length === 0) {
        try {
          const saved = localStorage.getItem("quote_items")
          if (saved) {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed)) {
              parsed.forEach((item: { product?: { id: string }; productId?: string; quantity?: number }) => {
                const product = productsData.find((p: Product) => p.id === (item.product?.id || item.productId))
              if (product) {
                loaded.push({ product, quantity: item.quantity || 1 })
              }
            })
          }
        }
      } catch (e) {
        console.error("Error reading quote_items from localStorage", e)
      }
    }

    if (loaded.length > 0) {
      setTimeout(() => {
        setQuoteItems(loaded)
      }, 0)
    }
    setTimeout(() => {
      setIsInitialized(true)
    }, 0)
  }, [])

  // Save to localStorage when quoteItems changes
  useEffect(() => {
    if (isInitialized) {
      try {
        if (quoteItems.length === 0) {
          localStorage.removeItem("qmaster-quote-basket")
          localStorage.removeItem("quote_items")
        } else {
          localStorage.setItem("qmaster-quote-basket", JSON.stringify(quoteItems))
          localStorage.setItem("quote_items", JSON.stringify(quoteItems))
        }
      } catch (e) {
        console.error("Error saving to localStorage", e)
      }
    }
  }, [quoteItems, isInitialized])

  // Quote functions
  const addToQuote = (prod: Product) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === prod.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product: prod, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: string, delta: number) => {
    setQuoteItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : null
        }
        return item
      }).filter((item): item is { product: Product; quantity: number } => item !== null)
    )
  }

  const removeFromQuote = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setQuoteSubmitted(true)
    setTimeout(() => {
      setQuoteItems([])
      setQuoteSubmitted(false)
      setIsQuoteOpen(false)
      setFormData({ name: "", email: "", phone: "", notes: "" })
    }, 3000)
  }

  const totalQuoteItems = quoteItems.reduce((acc, i) => acc + i.quantity, 0)

  const highlights = [
    "High-grade 304 stainless steel construction inside and out",
    "Digital microprocessor temperature controller with external display",
    "Environmentally friendly refrigerant with high thermodynamic efficiency",
    "High-performance fan-assisted cooling system for rapid pull-down",
    "Magnetic chamber seals for superior thermal isolation and door-close assist"
  ]

  if (!product) {
    return (
      <div className="flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center bg-background p-6 text-center">
        <AlertCircle className="h-14 w-14 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-foreground">Equipment Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md">
          The refrigeration model you are looking for might have been discontinued or moved to a different catalog series.
        </p>
        <Button asChild className="mt-6 rounded font-bold h-11 bg-primary text-white">
          <Link href="/product">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalog
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-9rem)] w-full flex-col bg-background text-foreground relative font-sans">
      {/* Top Breadcrumbs / Info Bar */}
      <DetailBreadcrumbs
        product={product}
        totalQuoteItems={totalQuoteItems}
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      {/* Main product display card */}
      <section className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8 flex-1">
        <div className="grid gap-8 lg:grid-cols-12 bg-card border border-border/80 rounded shadow-xs p-6 md:p-8">

          {/* Left Side: Drawing + Key Highlights */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative flex aspect-square items-center justify-center rounded border border-[#0D4E8E]/10 bg-gradient-to-br from-[#0D4E8E]/5 to-[#0D4E8E]/0 p-8 overflow-hidden shadow-inner group">
              {product.isPremium && (
                <div className="absolute left-4 top-4 z-10">
                  <span className="inline-flex items-center gap-1 rounded bg-[linear-gradient(to_right,#8B7046,#b69c70)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    <Sparkles className="h-3 w-3" />
                    Premium Series
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,78,142,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,78,142,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
              <div className="w-full max-w-[280px] aspect-square flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105">
                <Blueprint type={product.imageType} />
              </div>
            </div>

            <div className="rounded border border-border bg-muted/20 p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary dark:text-accent" />
                Key Highlights
              </h4>
              <ul className="space-y-2 text-xs leading-relaxed text-foreground/80">
                {highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Product Details & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-accent bg-primary/10 dark:bg-muted px-2 py-0.5 rounded">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-foreground bg-accent px-2 py-0.5 rounded">
                    <CheckCircle2 className="h-3 w-3" />
                    Ready to Ship
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded">
                    Indent Order (3-4 Weeks)
                  </span>
                )}
              </div>

              <h2 className="mt-3 text-sm font-bold text-secondary-foreground uppercase tracking-widest font-mono">
                Model: {product.id.toUpperCase()}
              </h2>
              <h1 className="mt-1 text-3xl font-bold text-foreground tracking-tight md:text-4xl leading-tight">
                {product.model}
              </h1>
              <p className="mt-1 text-base text-muted-foreground font-semibold">
                {product.name}
              </p>

              <div className="mt-5 border-t border-border/80 pt-5">
                <p className="text-sm leading-relaxed text-foreground/90 font-sans">
                  {product.description}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Our professional food-grade systems are specifically configured for hot kitchens, keeping storage contents safely chilled or frozen even under constant usage. Built with a forced-air cooling unit, digital temperature monitor, and energy-optimized compressor assemblies.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border border-border/85 bg-muted/10 p-3.5 rounded flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Temperature Range</span>
                  <span className="text-base font-bold text-foreground font-mono mt-1">{product.tempRange}</span>
                </div>
                <div className="border border-border/85 bg-muted/10 p-3.5 rounded flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Storage Capacity</span>
                  <span className="text-base font-bold text-foreground font-mono mt-1">{product.capacity}</span>
                </div>
                <div className="border border-border/85 bg-muted/10 p-3.5 rounded flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Power Requirements</span>
                  <span className="text-base font-bold text-foreground font-mono mt-1">{product.power.split('/')[2] || product.power}</span>
                </div>
                <div className="border border-border/85 bg-muted/10 p-3.5 rounded flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Outer Dimensions</span>
                  <span className="text-base font-bold text-foreground font-mono mt-1">{product.dimensions}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToQuote(product)}
                className="flex-1 rounded h-12 font-bold bg-[#BED731] hover:bg-[#A8C428] text-primary-foreground shadow flex items-center justify-center gap-2.5 transition-all text-sm uppercase tracking-wider cursor-pointer font-sans"
              >
                <Plus className="h-4.5 w-4.5" />
                Add to Quote Basket
              </button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded border-border text-sm font-bold uppercase tracking-wider hover:bg-muted sm:px-8"
              >
                <Link href="/product">
                  Browse Catalog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="mx-auto w-full max-w-7xl px-5 py-6 lg:px-8">
        <DetailTabs
          product={product}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </section>

      {/* Related Equipment Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-12 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h3 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wider">Related Equipment</h3>
            <p className="text-xs text-muted-foreground mb-8">Other commercial cooling solutions matching your catalog requirements</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToQuote={addToQuote}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote Drawer */}
      <QuoteDrawer
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        quoteItems={quoteItems}
        updateQuantity={updateQuantity}
        removeFromQuote={removeFromQuote}
        quoteSubmitted={quoteSubmitted}
        onSubmitQuote={submitQuoteRequest}
        formData={formData}
        onFormChange={handleFormChange}
      />
    </div>
  )
}
