"use client"

import { useState, useMemo, useEffect } from "react"
import { 
  Search, 
  SlidersHorizontal, 
  ShoppingBag, 
  X
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"

import { Product } from "./types"
import { productsData, categories } from "./data"
import { ProductCard } from "@/components/product/product-card"
import { SidebarFilters } from "@/components/product/sidebar-filters"
import { MobileFiltersModal } from "@/components/product/mobile-filters-modal"
import { QuoteDrawer } from "@/components/product/quote-drawer"

export default function ProductPage() {
  // Filters & State
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [tempFilter, setTempFilter] = useState<"all" | "chilled" | "frozen">("all")
  const [stockFilter, setStockFilter] = useState(false)
  const [premiumFilter, setPremiumFilter] = useState(false)
  const [sortBy, setSortBy] = useState<"model" | "capacity-asc" | "capacity-desc">("model")
  
  // Quote Basket State
  const [quoteItems, setQuoteItems] = useState<{ product: Product; quantity: number }[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

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

  // Memoized Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => {
        // Search term filter
        const matchesSearch = 
          p.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())

        // Category filter
        const matchesCategory = 
          selectedCategory === "All Categories" || p.category === selectedCategory

        // Temperature filter
        let matchesTemp = true
        if (tempFilter === "chilled") {
          matchesTemp = p.tempRange.includes("+") || p.tempRange.includes("0°C")
        } else if (tempFilter === "frozen") {
          matchesTemp = p.tempRange.includes("-")
        }

        // Stock filter
        const matchesStock = !stockFilter || p.inStock

        // Premium filter
        const matchesPremium = !premiumFilter || p.isPremium

        return matchesSearch && matchesCategory && matchesTemp && matchesStock && matchesPremium
      })
      .sort((a, b) => {
        if (sortBy === "capacity-asc") {
          return parseInt(a.capacity) - parseInt(b.capacity)
        }
        if (sortBy === "capacity-desc") {
          return parseInt(b.capacity) - parseInt(a.capacity)
        }
        return a.model.localeCompare(b.model)
      })
  }, [searchTerm, selectedCategory, tempFilter, stockFilter, premiumFilter, sortBy])

  // Quote functions
  const addToQuote = (product: Product) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
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

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All Categories")
    setTempFilter("all")
    setStockFilter(false)
    setPremiumFilter(false)
    setSortBy("model")
  }

  return (
    <div className="flex min-h-[calc(100vh-9rem)] w-full flex-col bg-background text-foreground relative">
      {/* Category / Product Header Section */}
      <section className="border-b border-border/80 bg-muted/30 px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent-foreground">
              Equipment Catalog
            </p>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Commercial Refrigeration
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Explore 3Q Hospitality Supply&apos;s industry-grade line of cooling systems, display counters, and heavy-duty cold storage units.
            </p>
          </div>

          {/* Quick Stats / Feedback */}
          <div className="flex items-center gap-6 rounded-lg border border-border bg-card p-4 shadow-sm md:w-auto">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">{filteredProducts.length}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Models Displayed</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="flex items-center gap-2.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow hover:bg-accent/90 transition-all cursor-pointer relative"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Quote Basket</span>
              {quoteItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold border-2 border-white dark:border-background">
                  {quoteItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalog Area */}
      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 py-8 md:flex-row md:gap-8 lg:px-8">
        {/* Desktop Sidebar Filters */}
        <SidebarFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          tempFilter={tempFilter}
          setTempFilter={setTempFilter}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          premiumFilter={premiumFilter}
          setPremiumFilter={setPremiumFilter}
          onResetFilters={resetFilters}
        />

        {/* Catalog List / Grid Area */}
        <div className="flex-1 flex flex-col space-y-6">
          {/* Search Bar & Sort Dropdowns */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card border border-border p-4 rounded-lg shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-foreground/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by model, name or specs..."
                className="w-full h-11 rounded border border-border bg-muted/65 dark:bg-muted/20 pl-11 pr-4 text-sm text-foreground placeholder-muted-foreground/60 outline-none focus:border-primary focus:bg-background transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded border border-border px-3 py-2.5 text-sm font-semibold hover:bg-muted md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "model" | "capacity-asc" | "capacity-desc")}
                className="rounded border border-border bg-card px-3 py-2.5 text-sm font-semibold text-foreground outline-none cursor-pointer focus:border-primary"
              >
                <option value="model">Sort by Model Code</option>
                <option value="capacity-asc">Capacity: Low to High</option>
                <option value="capacity-desc">Capacity: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategory !== "All Categories" || tempFilter !== "all" || stockFilter || premiumFilter || searchTerm) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">Active:</span>
              {selectedCategory !== "All Categories" && (
                <span className="inline-flex items-center gap-1 bg-primary/15 dark:bg-muted text-foreground dark:text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All Categories")}><X className="h-3 w-3" /></button>
                </span>
              )}
              {tempFilter !== "all" && (
                <span className="inline-flex items-center gap-1 bg-primary/15 dark:bg-muted text-foreground dark:text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                  {tempFilter === "chilled" ? "Chilled Only" : "Frozen Only"}
                  <button onClick={() => setTempFilter("all")}><X className="h-3 w-3" /></button>
                </span>
              )}
              {stockFilter && (
                <span className="inline-flex items-center gap-1 bg-primary/15 dark:bg-muted text-foreground dark:text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                  In Stock
                  <button onClick={() => setStockFilter(false)}><X className="h-3 w-3" /></button>
                </span>
              )}
              {premiumFilter && (
                <span className="inline-flex items-center gap-1 bg-primary/15 dark:bg-muted text-foreground dark:text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                  Premium Grade
                  <button onClick={() => setPremiumFilter(false)}><X className="h-3 w-3" /></button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 bg-primary/15 dark:bg-muted text-foreground dark:text-accent text-xs font-semibold px-2.5 py-1 rounded-full max-w-[150px] truncate">
                  &ldquo;{searchTerm}&rdquo;
                  <button onClick={() => setSearchTerm("")}><X className="h-3 w-3" /></button>
                </span>
              )}
              <button 
                onClick={resetFilters}
                className="text-xs font-semibold text-primary dark:text-accent underline hover:text-primary/80 dark:hover:text-accent/80 ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center p-12 bg-card border border-border rounded-lg shadow-inner">
              <SlidersHorizontal className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-bold text-foreground">No matching products found</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Try widening your search terms or turning off category / status filter tags to see other commercial cooling models.
              </p>
              <Button onClick={resetFilters} className="mt-6 rounded px-6 font-bold h-10">
                Show All Models
              </Button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToQuote={addToQuote}
              />
            ))}
          </div>
        </div>
      </section>

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

      {/* Mobile Drawer Filter Modal */}
      <MobileFiltersModal
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        tempFilter={tempFilter}
        setTempFilter={setTempFilter}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        premiumFilter={premiumFilter}
        setPremiumFilter={setPremiumFilter}
      />
    </div>
  )
}
