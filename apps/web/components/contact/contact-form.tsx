import Link from "next/link"
import { Check, Info, Trash2, Minus, Plus, ArrowRight } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Product } from "@/app/product/types"
import { Blueprint } from "@/components/product/blueprint"

interface ContactFormProps {
  activeTab: "products" | "general"
  quoteItems: { product: Product; quantity: number }[]
  formData: {
    name: string
    email: string
    phone: string
    businessType: string
    companyName: string
    description: string
  }
  formSubmitted: boolean
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onUpdateQuantity: (productId: string, delta: number) => void
  onRemoveItem: (productId: string) => void
  onResetSubmitted: () => void
}

export function ContactForm({
  activeTab,
  quoteItems,
  formData,
  formSubmitted,
  isSubmitting,
  onSubmit,
  onInputChange,
  onUpdateQuantity,
  onRemoveItem,
  onResetSubmitted
}: ContactFormProps) {
  if (formSubmitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-xl shadow-primary/5 flex flex-col items-center justify-center space-y-4 max-w-2xl mx-auto my-8">
        <div className="h-16 w-16 rounded-full bg-accent/25 flex items-center justify-center text-primary animate-bounce">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-primary dark:text-foreground">Request Submitted Successfully!</h3>
        <p className="text-sm text-muted-foreground max-w-md font-sans">
          Thank you. Your request has been received. Our commercial supply engineers will review your specifications and contact you shortly.
        </p>
        <div className="pt-4 flex gap-4">
          <Button onClick={onResetSubmitted} variant="outline" className="rounded-full px-6 font-bold h-11">
            Send another request
          </Button>
          <Button asChild className="rounded-full px-6 font-bold h-11 bg-primary text-white hover:bg-primary/95">
            <Link href="/product">Continue browsing</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-primary/5">
      <h2 className="text-xl font-bold text-primary dark:text-foreground mb-6 flex items-center gap-2 pb-3 border-b border-border">
        {activeTab === "products" ? "1. Selected Equipment & Contact Details" : "1. Register for Consultation"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
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
                            onClick={() => onRemoveItem(item.product.id)}
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
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="rounded-full border border-border bg-card hover:bg-muted dark:hover:bg-muted/40 h-7 w-7 flex items-center justify-center shadow-sm transition-all cursor-pointer"
                            >
                              <Minus className="h-3 w-3 text-foreground" />
                            </button>
                            <span className="text-sm font-bold w-4 text-center text-foreground">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
            onChange={onInputChange}
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
                onChange={onInputChange}
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
              onChange={onInputChange}
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
            onChange={onInputChange}
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
  )
}
