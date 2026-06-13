import * as React from "react"
import { ShoppingBag, X, Check, Minus, Plus, FileText, Send } from "lucide-react"

import { Product } from "@/app/product/types"
import { Button } from "@workspace/ui/components/button"
import { Blueprint } from "./blueprint"

interface QuoteDrawerProps {
  isOpen: boolean
  onClose: () => void
  quoteItems: { product: Product; quantity: number }[]
  updateQuantity: (productId: string, delta: number) => void
  removeFromQuote: (productId: string) => void
  quoteSubmitted: boolean
  onSubmitQuote: (e: React.FormEvent) => void
  formData: { name: string; email: string; phone: string; notes: string }
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function QuoteDrawer({
  isOpen,
  onClose,
  quoteItems,
  updateQuantity,
  removeFromQuote,
  quoteSubmitted,
  onSubmitQuote,
  formData,
  onFormChange
}: QuoteDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div className="relative flex h-full w-full max-w-md flex-col bg-card shadow-2xl animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Quote Request List</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            aria-label="Close quote drawer"
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
              <p className="text-xs max-w-xs">Add cooling units and industrial equipment items from the main catalog layout to request specs & pricing.</p>
              <Button variant="outline" onClick={onClose} className="mt-2 h-9 rounded font-bold">
                Browse Equipment
              </Button>
            </div>
          ) : (
            <>
              <div className="divide-y divide-border">
                {quoteItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 py-3 first:pt-0">
                    <div className="h-16 w-16 bg-muted/50 rounded flex items-center justify-center border border-border/60 shrink-0">
                      <Blueprint type={item.product.imageType} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate">{item.product.model}</h4>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">{item.product.name}</p>
                      <span className="text-[10px] font-semibold font-mono text-secondary-foreground">{item.product.dimensions}</span>

                      {/* Quantity Counter */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="rounded border border-border h-6 w-6 flex items-center justify-center hover:bg-muted"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="rounded border border-border h-6 w-6 flex items-center justify-center hover:bg-muted"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromQuote(item.product.id)}
                      className="text-muted-foreground hover:text-destructive self-start p-1"
                      aria-label="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Customer Information Form */}
              <form onSubmit={onSubmitQuote} className="border-t border-border pt-4 space-y-3.5">
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
                    onChange={onFormChange}
                    placeholder="Klaus Hospitality Group"
                    className="w-full h-10 border border-border bg-muted/70 dark:bg-muted/20 px-3 text-sm rounded outline-none focus:border-primary dark:focus:border-accent focus:bg-background"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={onFormChange}
                    placeholder="purchasing@klaushospitality.com"
                    className="w-full h-10 border border-border bg-muted/70 dark:bg-muted/20 px-3 text-sm rounded outline-none focus:border-primary dark:focus:border-accent focus:bg-background"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={onFormChange}
                    placeholder="+1 (555) 019-2834"
                    className="w-full h-10 border border-border bg-muted/70 dark:bg-muted/20 px-3 text-sm rounded outline-none focus:border-primary dark:focus:border-accent focus:bg-background"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">Special Requirements / Notes</label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={onFormChange}
                    placeholder="E.g., customized shelf partitions, optional glass doors, custom size Walk-in coldroom layout request..."
                    className="w-full border border-border bg-muted/70 dark:bg-muted/20 p-3 text-sm rounded outline-none focus:border-primary dark:focus:border-accent focus:bg-background resize-none"
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
  )
}
