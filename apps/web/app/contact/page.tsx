"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ClipboardList, Sparkles } from "lucide-react"

import { productsData } from "../product/data"
import { Product } from "../product/types"
import { ContactForm } from "@/components/contact/contact-form"
import { CompanyInfo } from "@/components/contact/company-info"

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
    
    // 2. If nothing in URL, try qmaster-quote-basket first
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
        console.error("Error reading localStorage qmaster-quote-basket")
      }
    }

    // 3. Fallback to quote_items if still empty
    if (loadedItems.length === 0) {
      try {
        const saved = localStorage.getItem("quote_items")
        if (saved) {
          const parsed = JSON.parse(saved)
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
        console.error("Error reading localStorage quote_items")
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
      if (items.length === 0) {
        localStorage.removeItem("qmaster-quote-basket")
        localStorage.removeItem("quote_items")
      } else {
        localStorage.setItem("qmaster-quote-basket", JSON.stringify(items))
        localStorage.setItem("quote_items", JSON.stringify(items))
      }
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
          localStorage.removeItem("quote_items")
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
          <h1 className="text-4xl font-bold tracking-tight text-primary dark:text-foreground sm:text-5xl mb-4 font-sans">
            Equipment Consultation & Quotation
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed font-sans">
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
            <ContactForm
              activeTab={activeTab}
              quoteItems={quoteItems}
              formData={formData}
              formSubmitted={formSubmitted}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onInputChange={handleInputChange}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onResetSubmitted={() => setFormSubmitted(false)}
            />
          </div>

          {/* Map & Company Info Side */}
          {activeTab === "general" && <CompanyInfo />}
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
