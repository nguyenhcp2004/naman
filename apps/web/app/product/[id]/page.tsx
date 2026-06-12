"use client"

import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { 
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Plus,
  Compass,
  Layers,
  Thermometer,
  Expand,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Product } from "../types"
import { productsData } from "../data"
import { Blueprint } from "@/components/product/blueprint"
import { ProductCard } from "@/components/product/product-card"
import { QuoteDrawer } from "@/components/product/quote-drawer"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = React.use(params)
  
  // Find product by id
  const product = useMemo(() => {
    return productsData.find((p) => p.id === id)
  }, [id])

  // Quote Basket State (Shared via localStorage)
  const [quoteItems, setQuoteItems] = useState<{ product: Product; quantity: number }[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" })

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("quote_items")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setTimeout(() => {
          setQuoteItems(parsed)
        }, 0)
      } catch (e) {
        console.error(e)
      }
    }
    setTimeout(() => {
      setIsInitialized(true)
    }, 0)
  }, [])

  // Save to localStorage when quoteItems changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("quote_items", JSON.stringify(quoteItems))
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
    setIsQuoteOpen(true)
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

  // Get related products (same category, or other popular models, excluding current)
  const relatedProducts = useMemo(() => {
    if (!product) return []
    const sameCategory = productsData.filter((p) => p.category === product.category && p.id !== product.id)
    if (sameCategory.length >= 3) return sameCategory.slice(0, 3)
    
    // Fill in with other products if needed
    const others = productsData.filter((p) => p.id !== product.id && p.category !== product.category)
    return [...sameCategory, ...others].slice(0, 3)
  }, [product])

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

  const totalQuoteItems = quoteItems.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <div className="flex min-h-[calc(100vh-9rem)] w-full flex-col bg-background text-foreground relative">
      {/* Dynamic Header / Breadcrumbs */}
      <section className="border-b border-border/80 bg-muted/30 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
          {/* Breadcrumb Trail */}
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Link href="/product" className="hover:text-primary transition-colors">Catalog</Link>
              <span>/</span>
              <span className="text-foreground/80">{product.category}</span>
            </nav>
            <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl flex items-center gap-3">
              {product.model}
            </h1>
          </div>

          {/* Catalog & Basket Navigation controls */}
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" className="h-10 rounded border-border font-bold hover:bg-muted">
              <Link href="/product">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Equipment
              </Link>
            </Button>

            <button
              onClick={() => setIsQuoteOpen(true)}
              className="flex items-center gap-2.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow hover:bg-accent/90 transition-all cursor-pointer relative"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Quote Basket</span>
              {totalQuoteItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold border-2 border-white">
                  {totalQuoteItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-8 flex-1">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Blueprint/Image Visualizer */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative flex min-h-[320px] sm:min-h-[400px] items-center justify-center rounded-lg bg-muted/40 p-8 border border-border/60 overflow-hidden shadow-sm">
              {/* Premium indicator tag */}
              {product.isPremium && (
                <div className="absolute left-4 top-4 z-10">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(to_right,#8B7046,#b69c70)] px-3 py-1 text-xs font-bold text-white shadow-md">
                    <Sparkles className="h-3.5 w-3.5" />
                    Premium Series
                  </span>
                </div>
              )}

              {/* Technical Drawing SVG blueprint */}
              <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
                <Blueprint type={product.imageType} />
              </div>
            </div>
            
            {/* Visual Note / Guide */}
            <div className="rounded border border-border/80 bg-muted/20 p-4 text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground block mb-1">Industrial Blueprint Visualizer</span>
              Each model diagram displays the standard system config, compressor layout and drainage channels built into the 3Q hospitality line. Custom spec requests can be added during quote submission.
            </div>
          </div>

          {/* Right Column: Information, Specs, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Brand, Stock, Category */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded">
                  {product.category}
                </span>
                
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-foreground bg-accent px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-foreground/85" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground bg-muted border border-border px-2.5 py-1 rounded-full">
                    Indent Order (3-4 Wk Lead Time)
                  </span>
                )}
              </div>

              {/* Title & Name */}
              <h2 className="mt-4 text-3xl font-bold text-primary tracking-tight">
                {product.model}
              </h2>
              <p className="mt-1 text-lg text-secondary font-semibold">
                {product.name}
              </p>

              {/* Long Description */}
              <div className="mt-6 border-t border-border/60 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Description</h3>
                <p className="text-sm leading-relaxed text-foreground/90 font-sans">
                  {product.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Our commercial cooling equipment lines are engineered using standard industrial specifications to withstand extreme tropical kitchen temperatures up to 43°C. Features automated defrost, high-density polyurethane insulation, and digital microprocessor controller systems.
                </p>
              </div>

              {/* Specs Grid */}
              <div className="mt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Technical Specifications</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-3 border border-border/60 rounded bg-card p-3 shadow-xs">
                    <Expand className="h-5 w-5 text-primary/75 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[11px] font-bold text-muted-foreground uppercase">Dimensions (W x D x H)</span>
                      <span className="text-sm font-semibold font-mono text-foreground">{product.dimensions}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border border-border/60 rounded bg-card p-3 shadow-xs">
                    <Thermometer className="h-5 w-5 text-primary/75 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[11px] font-bold text-muted-foreground uppercase">Temperature Range</span>
                      <span className="text-sm font-semibold font-mono text-foreground">{product.tempRange}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border border-border/60 rounded bg-card p-3 shadow-xs">
                    <Layers className="h-5 w-5 text-primary/75 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[11px] font-bold text-muted-foreground uppercase">Capacity / Volume</span>
                      <span className="text-sm font-semibold font-mono text-foreground">{product.capacity}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border border-border/60 rounded bg-card p-3 shadow-xs">
                    <Compass className="h-5 w-5 text-primary/75 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[11px] font-bold text-muted-foreground uppercase">Refrigerant Gas</span>
                      <span className="text-sm font-semibold font-mono text-foreground">{product.refrigerant}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border border-border/60 rounded bg-card p-3 shadow-xs sm:col-span-2">
                    <Zap className="h-5 w-5 text-primary/75 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[11px] font-bold text-muted-foreground uppercase">Power Source & Requirements</span>
                      <span className="text-sm font-semibold font-mono text-foreground">{product.power}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => addToQuote(product)}
                className="flex-1 rounded h-12 font-bold bg-[#BED731] hover:bg-[#A8C428] text-primary-foreground shadow-md flex items-center justify-center gap-2.5 transition-all text-base cursor-pointer"
              >
                <Plus className="h-5 w-5" />
                Add to Quote Request
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="h-12 rounded border-border font-bold hover:bg-muted sm:px-6"
              >
                <Link href="/product">
                  Back to Catalog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Equipment Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border bg-muted/10 py-12 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h3 className="text-lg font-bold text-primary mb-1">Related Equipment</h3>
            <p className="text-xs text-muted-foreground mb-8">Other high-performance models matching your cooling requirements</p>
            
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

      {/* Quote Drawer / Side Modal */}
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
