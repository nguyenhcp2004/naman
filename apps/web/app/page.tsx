import { CustomersSection } from "@/components/customers-section"
import { FeaturedStorySections } from "@/components/featured-story-sections"
import { HeroSlider } from "@/components/hero-slider"
import { OperatingLoopSection } from "@/components/operating-loop-section"
import { SmoothScroll } from "@/components/smooth-scroll"

export default async function Page() {
  return (
    <>
      <SmoothScroll />

      <HeroSlider />

      <FeaturedStorySections />

      <OperatingLoopSection />

      <CustomersSection />
    </>
  )
}
