import * as React from "react"
import { Sparkles, Plus } from "lucide-react"

import { Product } from "@/app/product/types"
import { Button } from "@workspace/ui/components/button"
import { Blueprint } from "./blueprint"

interface ProductCardProps {
  product: Product
  onAddToQuote: (product: Product) => void
}

export function ProductCard({ product, onAddToQuote }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded bg-white p-4 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
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
        <Blueprint type={product.imageType} />
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
          onClick={() => onAddToQuote(product)}
          className="w-full rounded h-10 font-bold bg-primary text-white hover:bg-primary/95 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add to Quote Request
        </Button>
      </div>
    </div>
  )
}
