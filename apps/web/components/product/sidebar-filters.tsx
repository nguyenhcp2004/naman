import * as React from "react"
import { Filter, Snowflake, Activity, RotateCcw } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

interface SidebarFiltersProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  tempFilter: "all" | "chilled" | "frozen"
  setTempFilter: (filter: "all" | "chilled" | "frozen") => void
  stockFilter: boolean
  setStockFilter: (filter: boolean) => void
  premiumFilter: boolean
  setPremiumFilter: (filter: boolean) => void
  onResetFilters: () => void
}

export function SidebarFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  tempFilter,
  setTempFilter,
  stockFilter,
  setStockFilter,
  premiumFilter,
  setPremiumFilter,
  onResetFilters
}: SidebarFiltersProps) {
  return (
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
                cat === selectedCategory
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
        onClick={onResetFilters}
        className="w-full flex items-center justify-center gap-2 text-xs font-semibold h-10 border-border hover:bg-muted"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset All Filters
      </Button>
    </aside>
  )
}
