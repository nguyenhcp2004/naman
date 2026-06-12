"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  ClipboardList,
  Sparkles,
  Info
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { productsData } from "../product/data"
import { Product } from "../product/types"
import { Blueprint } from "@/components/product/blueprint"

function ContactContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"products" | "general">("general")
  
  // Quote items state
  const [quoteItems, setQuoteItems] = useState<{ product: Product; quantity: number }[]>([])
  
  // Form input states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    companyName: "",
    description: ""
  })
  
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load products from URL query or localStorage on mount
  useEffect(() => {
    // 1. Try URL parameters first (e.g. ?products=kr-7001:2,kf-7002:1)
    const urlProducts = searchParams.get("products")
    const loadedItems: { product: Product; quantity: number }[] = []
    
    if (urlProducts) {
      const parts = urlProducts.split(",")
      parts.forEach(part => {
        const [id, qtyStr] = part.split(":")
        const qty = qtyStr ? parseInt(qtyStr, 10) : 1
        const product = productsData.find(p => p.id === id)
        if (product) {
          loadedItems.push({ product, quantity: qty })
        }
      })
    }
    
    // 2. If nothing in URL, try localStorage
    if (loadedItems.length === 0) {
      try {
        const stored = localStorage.getItem("qmaster-quote-basket")
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            parsed.forEach((item: { product?: { id: string }; productId?: string; quantity?: number }) => {
              const product = productsData.find(p => p.id === (item.product?.id || item.productId))
              if (product) {
                loadedItems.push({ product, quantity: item.quantity || 1 })
              }
            })
          }
        }
      } catch {
        console.error("Error reading localStorage")
      }
    }

    if (loadedItems.length > 0) {
      setTimeout(() => {
        setQuoteItems(loadedItems)
        setActiveTab("products")
      }, 0)
    }
  }, [searchParams])

  // Save to localStorage when quoteItems changes
  const saveToLocalStorage = (items: typeof quoteItems) => {
    try {
      localStorage.setItem("qmaster-quote-basket", JSON.stringify(items))
    } catch {
      console.error("Error writing to localStorage")
    }
  }

  // Handle quantity changes
  const updateQuantity = (productId: string, delta: number) => {
    const updated = quoteItems.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : null
      }
      return item
    }).filter((item): item is { product: Product; quantity: number } => item !== null)
    
    setQuoteItems(updated)
    saveToLocalStorage(updated)
  }

  const removeItem = (productId: string) => {
    const updated = quoteItems.filter(item => item.product.id !== productId)
    setQuoteItems(updated)
    saveToLocalStorage(updated)
    if (updated.length === 0) {
      setActiveTab("general")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
      
      // Clear basket if products tab was submitted
      if (activeTab === "products") {
        setQuoteItems([])
        try {
          localStorage.removeItem("qmaster-quote-basket")
        } catch {
          // ignore storage errors
        }
      }
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessType: "",
        companyName: "",
        description: ""
      })
    }, 1500)
  }

  return (
    <div className="min-h-[calc(100vh-9rem)] w-full bg-background text-foreground py-12 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <p className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-accent-foreground shadow-sm">
            Contact & Consultation
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-primary dark:text-foreground sm:text-5xl mb-4">
            Equipment Consultation & Quotation
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Our commercial engineers are ready to design industrial refrigeration solutions, optimize kitchen layouts, and provide detailed, cost-effective quote sheets for your project.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-muted p-1 border border-border/80">
            <button
              onClick={() => setActiveTab("products")}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "products"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ClipboardList className="h-4 w-4" />
              <span>Selected Products ({quoteItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("general")}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "general"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>General Request & Info</span>
            </button>
          </div>
        </div>

        {/* Main Workspace Layout */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Form Side */}
          <div className={`${activeTab === "products" ? "lg:col-span-12" : "lg:col-span-7"} transition-all`}>
            {formSubmitted ? (
              <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-xl shadow-primary/5 flex flex-col items-center justify-center space-y-4 max-w-2xl mx-auto my-8">
                <div className="h-16 w-16 rounded-full bg-accent/25 flex items-center justify-center text-primary animate-bounce">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary dark:text-foreground">Request Submitted Successfully!</h3>
                <p className="text-sm text-muted-foreground max-w-md font-sans">
                  Thank you. Your request has been received. Our commercial supply engineers will review your specifications and contact you shortly.
                </p>
                <div className="pt-4 flex gap-4">
                  <Button onClick={() => setFormSubmitted(false)} variant="outline" className="rounded-full px-6 font-bold h-11">
                    Send another request
                  </Button>
                  <Button asChild className="rounded-full px-6 font-bold h-11 bg-primary text-white hover:bg-primary/95">
                    <Link href="/product">Continue browsing</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-primary/5">
                <h2 className="text-xl font-bold text-primary dark:text-foreground mb-6 flex items-center gap-2 pb-3 border-b border-border">
                  {activeTab === "products" ? "1. Selected Equipment & Contact Details" : "1. Register for Consultation"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Active tab is products: show selected products list */}
                  {activeTab === "products" && (
                    <div className="space-y-4 mb-8">
                      {quoteItems.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
                          <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-semibold text-muted-foreground">No products selected yet.</p>
                          <p className="text-xs text-muted-foreground mt-1 mb-4">Add cooling units and industrial equipment items from the main catalog to request specs & pricing.</p>
                          <Button asChild variant="outline" className="rounded-full h-10 px-6 font-bold">
                            <Link href="/product">Browse Equipment</Link>
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div className="grid gap-3 max-h-[350px] overflow-y-auto pr-1 mb-4">
                            {quoteItems.map((item) => (
                              <div key={item.product.id} className="flex gap-4 p-4 rounded-xl border border-border bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 transition-all items-center">
                                <div className="h-16 w-16 bg-card dark:bg-muted/20 rounded-lg flex items-center justify-center border border-border/80 shrink-0 shadow-sm">
                                  <Blueprint type={item.product.imageType} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <h4 className="text-sm font-bold text-primary dark:text-foreground truncate">{item.product.model}</h4>
                                      <p className="text-xs text-muted-foreground line-clamp-1">{item.product.name}</p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeItem(item.product.id)}
                                      className="text-muted-foreground hover:text-destructive p-1 rounded-full hover:bg-destructive/10 transition-all shrink-0 cursor-pointer"
                                      title="Remove from list"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                  
                                  {/* Info and Quantity block */}
                                  <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                                    <span className="text-[10px] font-semibold font-mono text-muted-foreground bg-muted/80 dark:bg-muted/20 px-2 py-0.5 rounded border border-border">
                                      {item.product.dimensions}
                                    </span>
                                    <div className="flex items-center gap-3">
                                      <button
                                        type="button"
                                        onClick={() => updateQuantity(item.product.id, -1)}
                                        className="rounded-full border border-border bg-card hover:bg-muted dark:hover:bg-muted/40 h-7 w-7 flex items-center justify-center shadow-sm transition-all cursor-pointer"
                                      >
                                        <Minus className="h-3 w-3 text-foreground" />
                                      </button>
                                      <span className="text-sm font-bold w-4 text-center text-foreground">{item.quantity}</span>
                                      <button
                                        type="button"
                                        onClick={() => updateQuantity(item.product.id, 1)}
                                        className="rounded-full border border-border bg-card hover:bg-muted dark:hover:bg-muted/40 h-7 w-7 flex items-center justify-center shadow-sm transition-all cursor-pointer"
                                      >
                                        <Plus className="h-3 w-3 text-foreground" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end pb-4 border-b border-border">
                            <Button asChild variant="outline" className="rounded-full h-9 px-4 text-xs font-bold gap-1">
                              <Link href="/product">
                                <span>Add other products</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Customer Information Inputs */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-secondary dark:text-foreground uppercase tracking-wider mb-2">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full h-11 border border-border bg-muted/50 dark:bg-muted/10 focus:bg-background dark:focus:bg-background px-4 text-sm rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-sans text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary dark:text-foreground uppercase tracking-wider mb-2">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="09xx xxx xxx"
                        className="w-full h-11 border border-border bg-muted/50 dark:bg-muted/10 focus:bg-background dark:focus:bg-background px-4 text-sm rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-sans text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary dark:text-foreground uppercase tracking-wider mb-2">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@company.com"
                      className="w-full h-11 border border-border bg-muted/50 dark:bg-muted/10 focus:bg-background dark:focus:bg-background px-4 text-sm rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-sans text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-secondary dark:text-foreground uppercase tracking-wider mb-2">
                        Business Type <span className="text-muted-foreground font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          className="w-full h-11 border border-border bg-muted/50 dark:bg-muted/10 focus:bg-background dark:focus:bg-background px-4 text-sm rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-sans text-foreground appearance-none cursor-pointer"
                        >
                          <option value="" className="dark:bg-card">Select business type...</option>
                          <option value="Restaurant" className="dark:bg-card">Restaurant</option>
                          <option value="Cafe" className="dark:bg-card">Cafe & Bakery</option>
                          <option value="Hotel" className="dark:bg-card">Hotel & Resort</option>
                          <option value="Supermarket" className="dark:bg-card">Supermarket / Convenience Store</option>
                          <option value="Kitchen" className="dark:bg-card">Commercial Kitchen & Canteen</option>
                          <option value="Other" className="dark:bg-card">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary dark:text-foreground uppercase tracking-wider mb-2">
                        Company Name <span className="text-muted-foreground font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Company Name LLC"
                        className="w-full h-11 border border-border bg-muted/50 dark:bg-muted/10 focus:bg-background dark:focus:bg-background px-4 text-sm rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-sans text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary dark:text-foreground uppercase tracking-wider mb-2">
                      Special Requirements / Notes <span className="text-muted-foreground font-normal">(Optional)</span>
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="E.g., customized shelf partitions, optional glass doors, custom size Walk-in coldroom layout request..."
                      className="w-full border border-border bg-muted/50 dark:bg-muted/10 focus:bg-background dark:focus:bg-background p-4 text-sm rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none font-sans text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || (activeTab === "products" && quoteItems.length === 0)}
                    className="w-full rounded-lg h-12 font-bold bg-accent text-accent-foreground hover:bg-accent/95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                    ) : (
                      <>
                        <span>Submit Quote Request</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Map & Company Info Side (Only shown or wider on general consultation) */}
          {activeTab === "general" && (
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Company Info Card */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-primary/5 flex flex-col gap-6">
                <h2 className="text-xl font-bold text-primary dark:text-foreground pb-3 border-b border-border flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-accent-foreground" />
                  <span>Contact Information</span>
                </h2>

                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-foreground flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary dark:text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary dark:text-foreground">Company Address</p>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed font-sans">
                        149C Truong Dinh, Nhieu Loc Ward, District 3, HCMC
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-foreground flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary dark:text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary dark:text-foreground">Hotline Phone</p>
                      <Link href="tel:0931613788" className="text-muted-foreground mt-0.5 block hover:text-primary dark:hover:text-accent transition-all font-semibold font-sans">
                        0931 613 788
                      </Link>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-foreground flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary dark:text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary dark:text-foreground">Business Email</p>
                      <Link href="mailto:nguyenhainam17052004@gmail.com" className="text-muted-foreground mt-0.5 block hover:text-primary dark:hover:text-accent transition-all font-semibold break-all font-sans">
                        nguyenhainam17052004@gmail.com
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl shadow-primary/5 flex flex-col h-[320px] lg:flex-1 min-h-[300px]">
                <div className="bg-muted px-6 py-3 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-secondary dark:text-foreground uppercase tracking-wider">Location Map</span>
                  <Link 
                    href="https://maps.google.com/?q=149C+Trương+Định,+phường+Nhiêu+Lộc,+tp+HCM" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[11px] font-bold text-primary dark:text-accent hover:underline"
                  >
                    View on Google Maps
                  </Link>
                </div>
                <iframe
                  title="QMaster Office Location Map"
                  src="https://maps.google.com/maps?q=149C%20Tr%C6%B0%C6%A1ng%20%C4%90%E1%BB%8Bnh,%20ph%C6%B0%C6%A1ng%20Nhi%C3%AAu%20L%E1%BB%99c,%20tp%20HCM&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full flex-1 border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-9rem)] w-full flex items-center justify-center bg-background">
        <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <ContactContent />
    </Suspense>
  )
}
