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
    } catch (e) {
      console.error("Error writing to localStorage", e)
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
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4">
            Tư Vấn & Báo Giá Thiết Bị
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Đội ngũ kỹ sư thương mại của QMaster luôn sẵn sàng cung cấp các giải pháp làm lạnh công nghiệp, sơ đồ thiết kế bếp và bảng báo giá chi tiết, tối ưu chi phí cho dự án của bạn.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-muted p-1 border border-border/80">
            <button
              onClick={() => setActiveTab("products")}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "products"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ClipboardList className="h-4 w-4" />
              <span>Sản phẩm cần tư vấn ({quoteItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("general")}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "general"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Tư vấn chung & Liên hệ</span>
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
                <h3 className="text-2xl font-bold text-primary">Gửi Yêu Cầu Thành Công!</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Cảm ơn bạn. Yêu cầu báo giá và tư vấn của bạn đã được tiếp nhận. Đội ngũ kỹ sư thương mại của chúng tôi sẽ xử lý thông tin và phản hồi sớm nhất qua Email / Số điện thoại của bạn.
                </p>
                <div className="pt-4 flex gap-4">
                  <Button onClick={() => setFormSubmitted(false)} variant="outline" className="rounded-full px-6 font-bold h-11">
                    Gửi yêu cầu khác
                  </Button>
                  <Button asChild className="rounded-full px-6 font-bold h-11 bg-primary text-white">
                    <Link href="/product">Tiếp tục xem sản phẩm</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-primary/5">
                <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 pb-3 border-b border-border">
                  {activeTab === "products" ? "1. Danh sách thiết bị & Thông tin liên hệ" : "1. Nhập thông tin đăng ký tư vấn"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Active tab is products: show selected products list */}
                  {activeTab === "products" && (
                    <div className="space-y-4 mb-8">
                      {quoteItems.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
                          <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-semibold text-muted-foreground">Chưa có sản phẩm nào được chọn.</p>
                          <p className="text-xs text-muted-foreground mt-1 mb-4">Quay lại danh mục sản phẩm để thêm vào danh sách tư vấn báo giá.</p>
                          <Button asChild variant="outline" className="rounded-full h-10 px-6 font-bold">
                            <Link href="/product">Xem sản phẩm</Link>
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div className="grid gap-3 max-h-[350px] overflow-y-auto pr-1 mb-4">
                            {quoteItems.map((item) => (
                              <div key={item.product.id} className="flex gap-4 p-4 rounded-xl border border-border bg-muted/40 hover:bg-muted/60 transition-all items-center">
                                <div className="h-16 w-16 bg-white rounded-lg flex items-center justify-center border border-border/80 shrink-0 shadow-sm">
                                  <Blueprint type={item.product.imageType} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <h4 className="text-sm font-bold text-primary truncate">{item.product.model}</h4>
                                      <p className="text-xs text-muted-foreground line-clamp-1">{item.product.name}</p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeItem(item.product.id)}
                                      className="text-muted-foreground hover:text-destructive p-1 rounded-full hover:bg-destructive/10 transition-all shrink-0"
                                      title="Xóa khỏi danh sách"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                  
                                  {/* Info and Quantity block */}
                                  <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                                    <span className="text-[10px] font-semibold font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                                      {item.product.dimensions}
                                    </span>
                                    <div className="flex items-center gap-3">
                                      <button
                                        type="button"
                                        onClick={() => updateQuantity(item.product.id, -1)}
                                        className="rounded-full border border-border bg-white h-7 w-7 flex items-center justify-center hover:bg-muted shadow-sm transition-all"
                                      >
                                        <Minus className="h-3 w-3" />
                                      </button>
                                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                      <button
                                        type="button"
                                        onClick={() => updateQuantity(item.product.id, 1)}
                                        className="rounded-full border border-border bg-white h-7 w-7 flex items-center justify-center hover:bg-muted shadow-sm transition-all"
                                      >
                                        <Plus className="h-3 w-3" />
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
                                <span>Thêm sản phẩm khác</span>
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
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                        Họ và tên <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nguyễn Văn A"
                        className="w-full h-11 border border-border bg-muted/50 px-4 text-sm rounded-lg outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                        Số điện thoại <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="09xx xxx xxx"
                        className="w-full h-11 border border-border bg-muted/50 px-4 text-sm rounded-lg outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@company.com"
                      className="w-full h-11 border border-border bg-muted/50 px-4 text-sm rounded-lg outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-sans"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                        Loại mô hình kinh doanh <span className="text-muted-foreground font-normal">(Không bắt buộc)</span>
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full h-11 border border-border bg-muted/50 px-4 text-sm rounded-lg outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-sans appearance-none"
                      >
                        <option value="">Chọn loại mô hình...</option>
                        <option value="Restaurant">Nhà hàng / Quán ăn</option>
                        <option value="Cafe">Cà phê / Bánh ngọt</option>
                        <option value="Hotel">Khách sạn / Resort</option>
                        <option value="Supermarket">Siêu thị / Cửa hàng tiện lợi</option>
                        <option value="Kitchen">Bếp công nghiệp / Căng tin</option>
                        <option value="Other">Mô hình khác</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                        Tên công ty <span className="text-muted-foreground font-normal">(Không bắt buộc)</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Công ty TNHH QMaster"
                        className="w-full h-11 border border-border bg-muted/50 px-4 text-sm rounded-lg outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                      Mô tả / Yêu cầu chi tiết <span className="text-muted-foreground font-normal">(Không bắt buộc)</span>
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Mô tả thêm các yêu cầu đặc thù về kích thước, loại cửa kính, nhiệt độ cần đạt hoặc dịch vụ lắp đặt đi kèm..."
                      className="w-full border border-border bg-muted/50 p-4 text-sm rounded-lg outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all resize-none font-sans"
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
                        <span>Gửi Yêu Cầu Tư Vấn & Báo Giá</span>
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
                <h2 className="text-xl font-bold text-primary pb-3 border-b border-border flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-accent-foreground" />
                  <span>Thông tin liên hệ</span>
                </h2>

                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary">Địa chỉ công ty</p>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed">
                        149C Trương Định, phường Nhiêu Lộc, tp HCM
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary">Số điện thoại hotline</p>
                      <Link href="tel:0931613788" className="text-muted-foreground mt-0.5 block hover:text-primary transition-all font-semibold">
                        0931 613 788
                      </Link>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary">Địa chỉ Email</p>
                      <Link href="mailto:nguyenhainam17052004@gmail.com" className="text-muted-foreground mt-0.5 block hover:text-primary transition-all font-semibold break-all">
                        nguyenhainam17052004@gmail.com
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl shadow-primary/5 flex flex-col h-[320px] lg:flex-1 min-h-[300px]">
                <div className="bg-muted px-6 py-3 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">Bản đồ chỉ đường</span>
                  <Link 
                    href="https://maps.google.com/?q=149C+Trương+Định,+phường+Nhiêu+Lộc,+tp+HCM" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[11px] font-bold text-primary hover:underline"
                  >
                    Xem trên Google Maps
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
      <div className="min-h-[calc(100vh-9rem)] w-full flex items-center justify-center">
        <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <ContactContent />
    </Suspense>
  )
}
