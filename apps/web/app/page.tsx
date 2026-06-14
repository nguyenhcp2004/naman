import { CustomersSection } from "@/components/customers-section"
import { FeaturedStorySections } from "@/components/featured-story-sections"
import { HeroSlider } from "@/components/hero-slider"
import { OperatingLoopSection } from "@/components/operating-loop-section"
import { SmoothScroll } from "@/components/smooth-scroll"
import { sanityFetch } from "@/sanity/lib/client"
import { FEATURED_PRODUCTS_QUERY } from "@/sanity/lib/queries"
import { Product } from "./product/types"

export default async function Page() {
  let featuredProducts: Product[] = []

  try {
    const raw = await sanityFetch<Record<string, unknown>[]>({
      query: FEATURED_PRODUCTS_QUERY,
    })
    featuredProducts = (raw ?? []).map((r) => {
      const slug = (r.slug as { current?: string })?.current ?? ""
      return {
        id: slug || (r._id as string),
        model: r.model as string,
        name: r.name as string,
        image: typeof r.image === "string" ? r.image : undefined,
        slug,
        category: typeof r.category === "string" ? r.category : "",
        tempRange: r.tempRange as string,
        dimensions: r.dimensions as string,
        capacity: r.capacity as string,
        refrigerant: r.refrigerant as string,
        power: r.power as string,
        inStock: r.inStock as boolean,
        isPremium: r.isPremium as boolean,
        imageType: r.imageType as Product["imageType"],
        description: typeof r.description === "string" ? r.description : "",
      }
    })
  } catch {
    // silently fall back to empty — component handles empty state
  }

  console.log("Featured products:", featuredProducts);

  return (
    <>
      <SmoothScroll />

      <HeroSlider />

      <FeaturedStorySections products={featuredProducts} />

      <OperatingLoopSection />

      <CustomersSection />
    </>
  )
}
