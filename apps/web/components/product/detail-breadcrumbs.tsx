import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Product } from "@/app/product/types"

interface DetailBreadcrumbsProps {
  product: Product
  totalQuoteItems: number
  onOpenQuote: () => void
}

export function DetailBreadcrumbs({ product, totalQuoteItems, onOpenQuote }: DetailBreadcrumbsProps) {
  return (
    <section className="border-b border-border bg-muted/40 px-5 py-4 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Link href="/product" className="hover:text-foreground dark:hover:text-accent transition-colors">Catalog</Link>
          <span>/</span>
          <Link 
            href={`/product?category=${encodeURIComponent(product.category)}`} 
            className="hover:text-foreground dark:hover:text-accent transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground/80 font-bold">{product.model}</span>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="h-9 rounded-sm border-border text-xs font-bold hover:bg-muted">
            <Link href="/product">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to Catalog
            </Link>
          </Button>

          <button
            onClick={onOpenQuote}
            className="flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-accent-foreground shadow hover:bg-accent/90 transition-all cursor-pointer relative"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Quote Basket</span>
            {totalQuoteItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground font-bold border-2 border-white dark:border-background">
                {totalQuoteItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
