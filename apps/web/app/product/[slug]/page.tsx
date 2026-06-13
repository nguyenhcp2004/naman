import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { Product } from "../types"
import { productsData } from "../data"
import { ProductDetail } from "@/components/product/product-detail"
import { notFound } from "next/navigation"

const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id, model, name, slug, category,
    tempRange, dimensions, capacity, refrigerant, power,
    inStock, isPremium, imageType, description
  }
`)

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
  if (val && typeof val === "object" && "_ref" in val) return (val as { _ref: string })._ref
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

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params

  let foundProduct: Product | null = null
  let allProducts: Product[] = []

  try {
    const [raw, rawAll] = await Promise.all([
      client.fetch<Record<string, unknown> | null>(PRODUCT_BY_SLUG_QUERY, { slug }),
      client.fetch<Record<string, unknown>[]>(PRODUCTS_QUERY),
    ])

    if (raw) {
      foundProduct = mapSanityProduct(raw)
    }
    allProducts = rawAll.map((r) => mapSanityProduct(r))
  } catch {
    // Fallback to mock data
    const mock = productsData.find((p) => p.id === slug)
    if (mock) {
      foundProduct = { ...mock, slug: mock.id }
    }
    allProducts = productsData.map((p) => ({ ...p, slug: p.id }))
  }


  // If not found in Sanity, try mock data fallback
  if (!foundProduct) {
    const mock = productsData.find((p) => p.id === slug)
    if (mock) {
      foundProduct = { ...mock, slug: mock.id }
      allProducts = productsData.map((p) => ({ ...p, slug: p.id }))
    }
  }

  if (!foundProduct) {
    notFound()
  }

  const product = foundProduct!

  // Get related products (same category first, then fill with others)
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      if (a.category === product.category && b.category !== product.category) return -1
      if (a.category !== product.category && b.category === product.category) return 1
      return 0
    })
    .slice(0, 3)

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}
