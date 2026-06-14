"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftRight, Check, Plus, Sparkles } from "lucide-react"

import { Product } from "@/app/product/types"
import { Button } from "@workspace/ui/components/button"
import { Blueprint } from "./blueprint"
import {
  MAX_COMPARE_PRODUCTS,
  useCompareProducts,
} from "./use-compare-products"

interface ProductCardProps {
  product: Product
  onAddToQuote: (product: Product) => void
}

export function ProductCard({ product, onAddToQuote }: ProductCardProps) {
  const { addProduct, isFull, products, removeProduct } = useCompareProducts()
  const isCompared = products.some((item) => item.id === product.id)
  const compareDisabled = isFull && !isCompared

  const handleCompareClick = () => {
    if (isCompared) {
      removeProduct(product.id)
      return
    }

    addProduct(product)
  }

  return (
    <div className="group relative flex flex-col justify-between rounded border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Visual Status Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
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
          <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
            Indent Order
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleCompareClick}
        disabled={compareDisabled}
        className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-border/60 backdrop-blur transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-45"
        aria-label={
          isCompared
            ? `Remove ${product.model} from compare list`
            : compareDisabled
              ? `Compare list is limited to ${MAX_COMPARE_PRODUCTS} products`
              : `Add ${product.model} to compare list`
        }
        title={
          isCompared
            ? "Remove from compare"
            : compareDisabled
              ? `Maximum ${MAX_COMPARE_PRODUCTS} products`
              : "Add to compare"
        }
      >
        {isCompared ? (
          <Check className="h-4.5 w-4.5" />
        ) : (
          <ArrowLeftRight className="h-4.5 w-4.5" />
        )}
      </button>

      {/* Image / Blueprint Drawing Container */}
      <Link
        href={`/product/${product.id}`}
        className="relative mb-4 flex cursor-pointer items-center justify-center overflow-hidden rounded border border-border/40 bg-muted/30 transition-colors hover:bg-muted/50"
      >
        {product.image ? (
          <div className="relative h-48 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover object-center transition duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="p-2">
            <Blueprint type={product.imageType} />
          </div>
        )}
      </Link>

      {/* Info & Specs */}
      <div>
        <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
          {product.category}
        </span>
        <Link
          href={`/product/${product.id}`}
          className="block cursor-pointer hover:underline"
        >
          <h3 className="mt-1 truncate text-sm font-bold text-foreground">
            {product.model}
          </h3>
        </Link>
        <h4 className="mt-0.5 line-clamp-1 text-xs font-medium text-secondary">
          {product.name}
        </h4>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {/* Technical Specifications list */}
        <div className="mt-4 border-t border-border/60 pt-3">
          <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] font-medium">
            <div>
              <dt className="font-semibold text-muted-foreground">
                Dimensions:
              </dt>
              <dd className="truncate font-mono text-foreground">
                {product.dimensions}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-muted-foreground">
                Temp Range:
              </dt>
              <dd className="truncate font-mono text-foreground">
                {product.tempRange}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-muted-foreground">Capacity:</dt>
              <dd className="truncate font-mono text-foreground">
                {product.capacity}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-muted-foreground">
                Refrigerant:
              </dt>
              <dd className="truncate font-mono text-foreground">
                {product.refrigerant}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 border-t border-border/40 pt-3">
        <Button
          onClick={() => onAddToQuote(product)}
          className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded bg-primary font-bold text-white transition-all hover:bg-primary/95"
        >
          <Plus className="h-4 w-4" />
          Add to Quote Request
        </Button>
      </div>
    </div>
  )
}
