import * as React from "react"
import { Filter, X } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

interface MobileFiltersModalProps {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  tempFilter: "all" | "chilled" | "frozen"
  setTempFilter: (filter: "all" | "chilled" | "frozen") => void
  stockFilter: boolean
  setStockFilter: (filter: boolean) => void
  premiumFilter: boolean
  setPremiumFilter: (filter: boolean) => void
}

export function MobileFiltersModal({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  setSelectedCategory,
  tempFilter,
  setTempFilter,
  stockFilter,
  setStockFilter,
  premiumFilter,
  setPremiumFilter
}: MobileFiltersModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200">
      <div className="w-80 h-full bg-card p-6 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Equipment
            </h3>
            <button onClick={onClose} aria-label="Close filters">
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
            onClick={onClose}
            className="w-full rounded h-10 font-bold"
          >
            Apply Filters
          </Button>
        </div>
      </div>
      {/* Backdrop Click */}
      <div className="flex-1" onClick={onClose} />
    </div>
  )
}
