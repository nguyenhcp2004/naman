import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { Product } from "./types"
import { productsData } from "./data"
import { ProductCatalog } from "@/components/product/product-catalog"

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
    const loaded: { product: Product; quantity: number }[] = []
    
    // 1. Try qmaster-quote-basket first
    try {
      const stored = localStorage.getItem("qmaster-quote-basket")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          parsed.forEach((item: { product?: { id: string }; productId?: string; quantity?: number }) => {
            const product = productsData.find(p => p.id === (item.product?.id || item.productId))
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
              const product = productsData.find(p => p.id === (item.product?.id || item.productId))
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
      } else {
        return [...prev, { product, quantity: 1 }]
      }
    })
const PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] | order(model asc) {
    _id, model, name, slug, category,
    tempRange, dimensions, capacity, refrigerant, power,
    inStock, isPremium, imageType, description
  }
`)

function resolveCategory(val: unknown): string {
  if (typeof val === "string") return val
  if (val && typeof val === "object" && "title" in val) return (val as { title: string }).title
  return ""
}

function serializePortableText(val: unknown): string {
  if (typeof val === "string") return val
  if (!Array.isArray(val)) return ""
  return val
    .filter((block: Record<string, unknown>) => block._type === "block")
    .map((block: Record<string, unknown>) => {
      const children = block.children as Record<string, unknown>[]
      return children.map((c) => c.text ?? "").join("")
    })
    .join("\n")
}

function mapSanityProduct(raw: Record<string, unknown>, index: number): Product {
  const slug = (raw.slug as { current?: string })?.current ?? ""
  return {
    id: slug || raw._id as string,
    model: raw.model as string,
    name: raw.name as string,
    slug,
    category: resolveCategory(raw.category),
    tempRange: raw.tempRange as string,
    dimensions: raw.dimensions as string,
    capacity: raw.capacity as string,
    refrigerant: raw.refrigerant as string,
    power: raw.power as string,
    inStock: raw.inStock as boolean,
    isPremium: raw.isPremium as boolean,
    imageType: raw.imageType as Product["imageType"],
    description: serializePortableText(raw.description),
  }
}

export default async function ProductPage() {
  let products: Product[] = []

  try {
    const raw = await client.fetch<Record<string, unknown>[]>(PRODUCTS_QUERY)
    if (raw.length > 0) {
      products = raw.map((r, i) => mapSanityProduct(r, i))
    } else {
      // Fallback to mock data when Sanity has no products
      products = productsData.map((p) => ({ ...p, slug: p.id }))
    }
  } catch {
    // Fallback to mock data on error
    products = productsData.map((p) => ({ ...p, slug: p.id }))
  }

  return <ProductCatalog products={products} />
}
