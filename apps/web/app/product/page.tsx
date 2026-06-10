"use client"

import { useState, useMemo } from "react"
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ShoppingBag, 
  X, 
  Send, 
  Check, 
  RotateCcw, 
  Sparkles,
  Plus,
  Minus,
  Snowflake,
  Activity,
  FileText
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"

// Product Interface
interface Product {
  id: string
  model: string
  name: string
  category: string
  tempRange: string
  dimensions: string
  capacity: string
  refrigerant: string
  power: string
  inStock: boolean
  isPremium: boolean
  imageType: "upright-chiller" | "upright-freezer" | "underbench" | "showcase" | "ice-machine" | "coldroom"
  description: string
}

// Sample Commercial Refrigeration Products
const productsData: Product[] = [
  {
    id: "kr-7001",
    model: "KR-7001 Chiller",
    name: "Single Door Upright Gastronorm Chiller",
    category: "Upright Chillers",
    tempRange: "+1°C to +8°C",
    dimensions: "740 x 830 x 2000 mm",
    capacity: "650 Liters",
    refrigerant: "R290 Eco-Friendly",
    power: "230V / 50Hz / 350W",
    inStock: true,
    isPremium: true,
    imageType: "upright-chiller",
    description: "Heavy-duty commercial chiller built for busy restaurant kitchens. High-grade 304 stainless steel interior and exterior."
  },
  {
    id: "kf-7002",
    model: "KF-7002 Freezer",
    name: "Single Door Upright Gastronorm Freezer",
    category: "Upright Freezers",
    tempRange: "-18°C to -22°C",
    dimensions: "740 x 830 x 2000 mm",
    capacity: "650 Liters",
    refrigerant: "R290 Eco-Friendly",
    power: "230V / 50Hz / 680W",
    inStock: true,
    isPremium: false,
    imageType: "upright-freezer",
    description: "Reliable deep-freeze storage with auto-defrost and digital temperature controller for optimal food safety."
  },
  {
    id: "kr-1400",
    model: "KR-1400 Dual Chiller",
    name: "Double Door Upright Chiller",
    category: "Upright Chillers",
    tempRange: "+1°C to +8°C",
    dimensions: "1400 x 830 x 2000 mm",
    capacity: "1300 Liters",
    refrigerant: "R290 Eco-Friendly",
    power: "230V / 50Hz / 550W",
    inStock: true,
    isPremium: true,
    imageType: "upright-chiller",
    description: "Large capacity dual-door chiller featuring self-closing doors, fan-forced cooling, and heavy-duty lockable castors."
  },
  {
    id: "uc-240",
    model: "UC-240 Underbench",
    name: "Two Door Underbench Commercial Chiller",
    category: "Underbench Cabinets",
    tempRange: "+2°C to +8°C",
    dimensions: "1200 x 600 x 850 mm",
    capacity: "240 Liters",
    refrigerant: "R600a",
    power: "230V / 50Hz / 280W",
    inStock: true,
    isPremium: false,
    imageType: "underbench",
    description: "Space-saving under-counter chiller with flat stainless steel worktop. Ideal for prep stations and bars."
  },
  {
    id: "uf-240",
    model: "UF-240 Underbench",
    name: "Two Door Underbench Commercial Freezer",
    category: "Underbench Cabinets",
    tempRange: "-15°C to -20°C",
    dimensions: "1200 x 600 x 850 mm",
    capacity: "240 Liters",
    refrigerant: "R290 Eco-Friendly",
    power: "230V / 50Hz / 450W",
    inStock: false,
    isPremium: false,
    imageType: "underbench",
    description: "Compact commercial freezer designed to fit under standard work counters with front-breathing ventilation."
  },
  {
    id: "cs-120",
    model: "CS-120 Showcase",
    name: "Premium Heated/Chilled Cake Showcase",
    category: "Display Showcases",
    tempRange: "+2°C to +10°C",
    dimensions: "1200 x 700 x 1200 mm",
    capacity: "350 Liters",
    refrigerant: "R134a",
    power: "230V / 50Hz / 420W",
    inStock: true,
    isPremium: true,
    imageType: "showcase",
    description: "Elegant curved double-glazed glass display with warm LED illumination to maximize your bakery retail sales."
  },
  {
    id: "im-80",
    model: "IM-80 Ice Maker",
    name: "Self-Contained Commercial Ice Machine",
    category: "Ice Machines",
    tempRange: "N/A (Ice Production)",
    dimensions: "660 x 690 x 920 mm",
    capacity: "80 kg / 24 hrs (40kg Bin)",
    refrigerant: "R290 Eco-Friendly",
    power: "230V / 50Hz / 620W",
    inStock: true,
    isPremium: false,
    imageType: "ice-machine",
    description: "Produces crystal-clear gourmet bullet ice cubes. Perfect for bars, hotels, and healthcare institutions."
  },
  {
    id: "cr-3000",
    model: "CR-3000 Coldroom",
    name: "Modular Walk-In Cold Room System",
    category: "Cold Storage",
    tempRange: "-2°C to +5°C",
    dimensions: "2000 x 2000 x 2200 mm",
    capacity: "8,000 Liters (Customizable)",
    refrigerant: "R449A / Split System",
    power: "400V / 3Phase / 1500W",
    inStock: false,
    isPremium: true,
    imageType: "coldroom",
    description: "Heavy-duty modular panel cold room with monoblock or remote refrigeration unit, complete with sliding door."
  },
  {
    id: "bc-130",
    model: "BC-130 Backbar",
    name: "Single Door Under-counter Glass Chiller",
    category: "Display Showcases",
    tempRange: "0°C to +10°C",
    dimensions: "500 x 520 x 850 mm",
    capacity: "130 Liters",
    refrigerant: "R600a",
    power: "230V / 50Hz / 180W",
    inStock: true,
    isPremium: false,
    imageType: "showcase",
    description: "Glass door back-bar beverage display cooler with digital temperature management and internal fan distribution."
  }
]

const categories = [
  "All Categories",
  "Upright Chillers",
  "Upright Freezers",
  "Underbench Cabinets",
  "Display Showcases",
  "Ice Machines",
  "Cold Storage"
]

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
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

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
    // In a real app, send data to API
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

  // Blueprint SVG Renderers for a premium, custom industrial look
  const renderProductBlueprint = (type: string) => {
    switch (type) {
      case "upright-chiller":
      case "upright-freezer":
        return (
          <svg viewBox="0 0 160 200" className="w-full h-44 text-primary/30 stroke-current fill-none">
            <rect x="30" y="10" width="100" height="180" rx="3" strokeWidth="1.5" />
            <line x1="30" y1="90" x2="130" y2="90" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="80" y1="10" x2="80" y2="190" strokeWidth="0.75" strokeDasharray="3 3" />
            <rect x="40" y="20" width="80" height="15" rx="1" strokeWidth="0.75" fill="currentColor" className="fill-primary/5" />
            <text x="50" y="30" fontSize="8" className="fill-primary font-mono font-semibold">Q-TEMP CONTROL</text>
            <rect x="115" y="80" width="6" height="30" rx="1" strokeWidth="1" />
            <rect x="42" y="50" width="76" height="30" strokeWidth="0.75" />
            <rect x="42" y="100" width="76" height="30" strokeWidth="0.75" />
            <rect x="42" y="145" width="76" height="30" strokeWidth="0.75" />
          </svg>
        )
      case "underbench":
        return (
          <svg viewBox="0 0 200 130" className="w-full h-44 text-primary/30 stroke-current fill-none">
            <rect x="20" y="20" width="160" height="90" rx="3" strokeWidth="1.5" />
            <rect x="18" y="15" width="164" height="6" rx="1" strokeWidth="1.5" fill="currentColor" className="fill-primary/5" />
            <line x1="100" y1="20" x2="100" y2="110" strokeWidth="1.5" />
            <rect x="85" y="50" width="6" height="25" rx="1" strokeWidth="1" />
            <rect x="109" y="50" width="6" height="25" rx="1" strokeWidth="1" />
            <circle cx="100" cy="30" r="2" strokeWidth="0.75" fill="currentColor" />
            <line x1="20" y1="110" x2="30" y2="125" strokeWidth="1.5" />
            <line x1="180" y1="110" x2="170" y2="125" strokeWidth="1.5" />
          </svg>
        )
      case "showcase":
        return (
          <svg viewBox="0 0 180 150" className="w-full h-44 text-primary/30 stroke-current fill-none">
            <path d="M 20 130 L 20 60 A 60 60 0 0 1 120 20 L 160 20 L 160 130 Z" strokeWidth="1.5" />
            <line x1="20" y1="130" x2="160" y2="130" strokeWidth="1.5" />
            <rect x="25" y="130" width="130" height="15" strokeWidth="1" fill="currentColor" className="fill-primary/5" />
            <line x1="30" y1="85" x2="150" y2="85" strokeWidth="1" />
            <line x1="45" y1="50" x2="140" y2="50" strokeWidth="1" />
            <text x="35" y="115" fontSize="8" className="fill-primary font-mono">DOUBLE GLAZED</text>
          </svg>
        )
      case "ice-machine":
        return (
          <svg viewBox="0 0 160 160" className="w-full h-44 text-primary/30 stroke-current fill-none">
            <rect x="30" y="20" width="100" height="120" rx="3" strokeWidth="1.5" />
            <rect x="40" y="35" width="80" height="35" rx="1" strokeWidth="1" fill="currentColor" className="fill-primary/5" />
            <line x1="40" y1="52" x2="120" y2="52" strokeWidth="0.75" strokeDasharray="2 2" />
            <rect x="40" y="85" width="80" height="40" rx="2" strokeWidth="1" />
            <circle cx="50" cy="105" r="4" strokeWidth="0.75" />
            <text x="62" y="110" fontSize="7" className="fill-primary font-mono">ICE CHAMBER</text>
          </svg>
        )
      case "coldroom":
      default:
        return (
          <svg viewBox="0 0 180 160" className="w-full h-44 text-primary/30 stroke-current fill-none">
            <rect x="20" y="20" width="140" height="120" rx="1" strokeWidth="1.5" />
            <rect x="35" y="20" width="90" height="120" strokeWidth="0.75" strokeDasharray="3 3" />
            <rect x="70" y="35" width="40" height="90" strokeWidth="1.5" />
            <circle cx="78" cy="80" r="3" strokeWidth="1" fill="currentColor" />
            <text x="75" y="135" fontSize="8" className="fill-primary font-mono font-semibold">MONOBLOCK</text>
          </svg>
        )
    }
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
              <span className="text-2xl font-bold text-primary">{filteredProducts.length}</span>
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
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold border-2 border-white">
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
        <aside className="hidden w-64 shrink-0 flex-col space-y-6 md:flex">
          {/* Category List */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Filter className="h-3.5 w-3.5" />
              Categories
            </h3>
            <div className="flex flex-col space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left rounded px-3 py-2 text-sm font-medium transition-all ${
                    (cat === selectedCategory) 
                      ? "bg-primary text-primary-foreground font-bold" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Temperature Range Filter */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Snowflake className="h-3.5 w-3.5" />
              Temperature Range
            </h3>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground">
                <input 
                  type="radio" 
                  name="temp" 
                  checked={tempFilter === "all"} 
                  onChange={() => setTempFilter("all")}
                  className="accent-primary"
                />
                All Temperatures
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground">
                <input 
                  type="radio" 
                  name="temp" 
                  checked={tempFilter === "chilled"} 
                  onChange={() => setTempFilter("chilled")}
                  className="accent-primary"
                />
                Chilled (+1°C to +10°C)
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground">
                <input 
                  type="radio" 
                  name="temp" 
                  checked={tempFilter === "frozen"} 
                  onChange={() => setTempFilter("frozen")}
                  className="accent-primary"
                />
                Frozen (-22°C to -15°C)
              </label>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Stock and Premium Status Checklist */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Activity className="h-3.5 w-3.5" />
              Availability & Grade
            </h3>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground">
                <input 
                  type="checkbox" 
                  checked={stockFilter} 
                  onChange={(e) => setStockFilter(e.target.checked)}
                  className="rounded border-border text-accent focus:ring-accent accent-accent h-4 w-4"
                />
                In Stock / Ready to Ship
              </label>
              <label className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground">
                <input 
                  type="checkbox" 
                  checked={premiumFilter} 
                  onChange={(e) => setPremiumFilter(e.target.checked)}
                  className="rounded border-border text-accent focus:ring-accent accent-accent h-4 w-4"
                />
                Premium Grade (304 SS)
              </label>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Reset Filters */}
          <Button 
            variant="outline" 
            onClick={resetFilters} 
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold h-10 border-border hover:bg-muted"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset All Filters
          </Button>
        </aside>

        {/* Catalog List / Grid Area */}
        <div className="flex-1 flex flex-col space-y-6">
          {/* Search Bar & Sort Dropdowns */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card border border-border p-4 rounded-lg shadow-sm">
            {/* Search Input following DESIGN.md input rules */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-primary/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by model, name or specs..."
                className="w-full h-11 rounded border border-border bg-[#F1F1F1] pl-11 pr-4 text-sm text-primary placeholder-primary/50 outline-none focus:border-primary focus:bg-white transition-all"
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

            {/* Mobile Filters Toggle & Sort Options */}
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
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All Categories")}><X className="h-3 w-3" /></button>
                </span>
              )}
              {tempFilter !== "all" && (
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                  {tempFilter === "chilled" ? "Chilled Only" : "Frozen Only"}
                  <button onClick={() => setTempFilter("all")}><X className="h-3 w-3" /></button>
                </span>
              )}
              {stockFilter && (
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                  In Stock
                  <button onClick={() => setStockFilter(false)}><X className="h-3 w-3" /></button>
                </span>
              )}
              {premiumFilter && (
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                  Premium Grade
                  <button onClick={() => setPremiumFilter(false)}><X className="h-3 w-3" /></button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full max-w-[150px] truncate">
                  &ldquo;{searchTerm}&rdquo;
                  <button onClick={() => setSearchTerm("")}><X className="h-3 w-3" /></button>
                </span>
              )}
              <button 
                onClick={resetFilters}
                className="text-xs font-semibold text-primary underline hover:text-primary/80 ml-auto"
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
              <div
                key={product.id}
                className="group relative flex flex-col justify-between rounded bg-white p-4 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Visual Status Badges */}
                <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
                  {product.isPremium && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(to_right,#8B7046,#b69c70)] px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
                      <Sparkles className="h-2.5 w-2.5" />
                      Premium
                    </span>
                  )}
                  {product.inStock ? (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                      In Stock
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted border border-border px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                      Indent Order
                    </span>
                  )}
                </div>

                {/* Blueprint Drawing Container */}
                <div className="relative mb-4 flex items-center justify-center rounded bg-muted/30 p-2 overflow-hidden border border-border/40">
                  {renderProductBlueprint(product.imageType)}
                </div>

                {/* Info & Specs */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-primary truncate">
                    {product.model}
                  </h3>
                  <h4 className="mt-0.5 text-xs text-secondary font-medium line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  {/* Technical Specifications list */}
                  <div className="mt-4 border-t border-border/60 pt-3">
                    <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] font-medium">
                      <div>
                        <dt className="text-muted-foreground font-semibold">Dimensions:</dt>
                        <dd className="text-foreground truncate font-mono">{product.dimensions}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground font-semibold">Temp Range:</dt>
                        <dd className="text-foreground truncate font-mono">{product.tempRange}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground font-semibold">Capacity:</dt>
                        <dd className="text-foreground truncate font-mono">{product.capacity}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground font-semibold">Refrigerant:</dt>
                        <dd className="text-foreground truncate font-mono">{product.refrigerant}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-3 border-t border-border/40">
                  <Button
                    onClick={() => addToQuote(product)}
                    className="w-full rounded h-10 font-bold bg-primary text-white hover:bg-primary/95 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    Add to Quote Request
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Drawer / Side Modal */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-sm transition-opacity">
          <div className="relative flex h-full w-full max-w-md flex-col bg-card shadow-2xl animate-in slide-in-from-right duration-250">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Quote Request List</h3>
              </div>
              <button 
                onClick={() => setIsQuoteOpen(false)}
                className="rounded-full p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {quoteSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center h-full space-y-3">
                  <div className="h-12 w-12 rounded-full bg-accent/25 flex items-center justify-center text-primary">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold">Request Submitted!</h4>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Thank you. Our commercial supply engineers are processing your details and will email your formal catalog quotation back shortly.
                  </p>
                </div>
              ) : quoteItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center h-full text-muted-foreground space-y-3">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                  <p className="text-sm font-semibold">Your quote list is empty.</p>
                  <p className="text-xs max-w-xs">Add cooling units and industrial equipment items from the main catalog layout to request specs & price pricing.</p>
                  <Button variant="outline" onClick={() => setIsQuoteOpen(false)} className="mt-2 h-9 rounded font-bold">
                    Browse Equipment
                  </Button>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-border">
                    {quoteItems.map((item) => (
                      <div key={item.product.id} className="flex gap-4 py-3 first:pt-0">
                        <div className="h-16 w-16 bg-muted/50 rounded flex items-center justify-center border border-border/60 shrink-0">
                          {renderProductBlueprint(item.product.imageType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-primary truncate">{item.product.model}</h4>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">{item.product.name}</p>
                          <span className="text-[10px] font-semibold font-mono text-secondary-foreground">{item.product.dimensions}</span>
                          
                          {/* Quantity Counter */}
                          <div className="flex items-center gap-3 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="rounded border border-border h-6 w-6 flex items-center justify-center hover:bg-muted"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="rounded border border-border h-6 w-6 flex items-center justify-center hover:bg-muted"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromQuote(item.product.id)}
                          className="text-muted-foreground hover:text-destructive self-start p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Customer Information Form */}
                  <form onSubmit={submitQuoteRequest} className="border-t border-border pt-4 space-y-3.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      Contact details
                    </h4>
                    <div>
                      <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Company / Representative Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Klaus Hospitality Group"
                        className="w-full h-10 border border-border bg-[#F1F1F1] px-3 text-sm rounded outline-none focus:border-primary focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Business Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="purchasing@klaushospitality.com"
                        className="w-full h-10 border border-border bg-[#F1F1F1] px-3 text-sm rounded outline-none focus:border-primary focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Contact Phone *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+1 (555) 019-2834"
                        className="w-full h-10 border border-border bg-[#F1F1F1] px-3 text-sm rounded outline-none focus:border-primary focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Special Requirements / Notes</label>
                      <textarea 
                        name="notes" 
                        rows={3}
                        value={formData.notes}
                        onChange={handleFormChange}
                        placeholder="E.g., customized shelf partitions, optional glass doors, custom size Walk-in coldroom layout request..."
                        className="w-full border border-border bg-[#F1F1F1] p-3 text-sm rounded outline-none focus:border-primary focus:bg-white resize-none"
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full rounded h-11 font-bold bg-accent text-accent-foreground hover:bg-accent/95 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-3"
                    >
                      <Send className="h-4 w-4" />
                      Request Quote Quotation
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Filter Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm md:hidden">
          <div className="w-80 h-full bg-card p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter Equipment
                </h3>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold border ${
                        cat === selectedCategory 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : "bg-muted border-border text-muted-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Temperature</h4>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="radio" 
                      name="mobile-temp" 
                      checked={tempFilter === "all"} 
                      onChange={() => setTempFilter("all")} 
                    />
                    All Temperatures
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="radio" 
                      name="mobile-temp" 
                      checked={tempFilter === "chilled"} 
                      onChange={() => setTempFilter("chilled")} 
                    />
                    Chilled Only
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="radio" 
                      name="mobile-temp" 
                      checked={tempFilter === "frozen"} 
                      onChange={() => setTempFilter("frozen")} 
                    />
                    Frozen Only
                  </label>
                </div>
              </div>

              {/* Stock and grade */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Grades</h4>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="checkbox" 
                      checked={stockFilter} 
                      onChange={(e) => setStockFilter(e.target.checked)} 
                    />
                    In Stock
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="checkbox" 
                      checked={premiumFilter} 
                      onChange={(e) => setPremiumFilter(e.target.checked)} 
                    />
                    Premium Grade
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border mt-6">
              <Button 
                onClick={() => setMobileFiltersOpen(false)} 
                className="w-full rounded h-10 font-bold"
              >
                Apply Filters
              </Button>
            </div>
          </div>
          {/* Backdrop Click */}
          <div className="flex-1" onClick={() => setMobileFiltersOpen(false)} />
        </div>
      )}
    </div>
  )
}
