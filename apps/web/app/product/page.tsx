import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { Product } from "./types"
import { productsData } from "./data"
import { ProductCatalog } from "@/components/product/product-catalog"

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

function mapSanityProduct(raw: Record<string, unknown>): Product {
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
      products = raw.map((r) => mapSanityProduct(r))
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
