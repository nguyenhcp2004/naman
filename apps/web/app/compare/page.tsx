"use client"

import Link from "next/link"
import { ArrowLeft, Trash2, X } from "lucide-react"

import { Product } from "@/app/product/types"
import { Blueprint } from "@/components/product/blueprint"
import {
  MAX_COMPARE_PRODUCTS,
  useCompareProducts,
} from "@/components/product/use-compare-products"
import { Button } from "@workspace/ui/components/button"

const comparisonRows: { label: string; value: (product: Product) => string }[] =
  [
    { label: "Category", value: (product) => product.category },
    { label: "Temperature", value: (product) => product.tempRange },
    { label: "Dimensions", value: (product) => product.dimensions },
    { label: "Capacity", value: (product) => product.capacity },
    { label: "Refrigerant", value: (product) => product.refrigerant },
    { label: "Power", value: (product) => product.power },
    {
      label: "Availability",
      value: (product) => (product.inStock ? "In Stock" : "Indent Order"),
    },
  ]

export default function ComparePage() {
  const { clearProducts, products, removeProduct } = useCompareProducts()

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-muted/20 px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/product"
              className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
            <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
              Product Comparison
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-5xl">
              Compare Equipment
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Review up to {MAX_COMPARE_PRODUCTS} selected models side by side
              before requesting a quote.
            </p>
          </div>

          {products.length > 0 && (
            <Button
              variant="outline"
              onClick={clearProducts}
              className="rounded font-bold"
            >
              <Trash2 className="h-4 w-4" />
              Clear Compare
            </Button>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {products.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center">
            <h2 className="text-xl font-black text-foreground">
              No products selected
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Add products from the catalog using the compare icon in the
              top-right corner of each product card.
            </p>
            <Button asChild className="mt-6 rounded font-bold">
              <Link href="/product">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
            <div
              className="grid min-w-[760px]"
              style={{
                gridTemplateColumns: `180px repeat(${products.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="border-r border-b border-border bg-muted/40 p-4 text-xs font-black tracking-wider text-muted-foreground uppercase">
                Model
              </div>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative border-r border-b border-border p-4 last:border-r-0"
                >
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-destructive hover:text-white"
                    aria-label={`Remove ${product.model} from compare list`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/product/${product.id}`}
                    className="block pr-8 hover:underline"
                  >
                    <h2 className="text-sm font-black text-foreground">
                      {product.model}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {product.name}
                    </p>
                  </Link>
                  <div className="mt-4 flex h-36 items-center justify-center rounded bg-muted/30 p-3">
                    <Blueprint type={product.imageType} />
                  </div>
                </div>
              ))}

              {comparisonRows.map((row) => (
                <div key={row.label} className="contents">
                  <div className="border-r border-b border-border bg-muted/30 p-4 text-xs font-black tracking-wider text-muted-foreground uppercase">
                    {row.label}
                  </div>
                  {products.map((product) => (
                    <div
                      key={`${product.id}-${row.label}`}
                      className="border-r border-b border-border p-4 text-sm font-semibold text-foreground last:border-r-0"
                    >
                      {row.value(product)}
                    </div>
                  ))}
                </div>
              ))}

              <div className="border-r border-border bg-muted/30 p-4 text-xs font-black tracking-wider text-muted-foreground uppercase">
                Action
              </div>
              {products.map((product) => (
                <div
                  key={`${product.id}-action`}
                  className="border-r border-border p-4 last:border-r-0"
                >
                  <Button asChild className="w-full rounded font-bold">
                    <Link href={`/product/${product.id}`}>View Details</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
