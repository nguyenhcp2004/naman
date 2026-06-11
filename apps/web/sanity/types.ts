type Seo = {
  title?: string
  description?: string
  noIndex?: boolean
  image?: SanityImage
}

type ContentSection = {
  _key?: string
  title?: string
  subtitle?: string
}

type ProjectCard = {
  _key?: string
  title?: string
  description?: string
}

export type ProjectPage = {
  title?: string
  pageType?: string
  sections?: ContentSection[]
  projectPlanningSteps?: string[]
  projectServices?: ProjectCard[]
  projectReferences?: ProjectCard[]
  projectMarqueeItems?: string[]
  seo?: Seo
} | null
type SanityImage = {
  asset?: {
    _id?: string
    url?: string
    metadata?: {
      lqip?: string
      dimensions?: {
        width?: number
        height?: number
      }
    }
  }
  alt?: string
}



type LinkValue = {
  label?: string
  linkType?: "internal" | "external"
  path?: string
  url?: string
}

export type SiteSettings = {
  siteTitle?: string
  phone?: string
  email?: string
  address?: string
  mainNavigation?: LinkValue[]
  seo?: Seo
} | null

export type LandingPage = {
  title?: string
  hero?: {
    eyebrow?: string
    title?: string
    description?: string
    image?: SanityImage
    callToAction?: LinkValue
  }
  intro?: {
    title?: string
    subtitle?: string
  }
  seo?: Seo
} | null

export type StaticPage = {
  title?: string
  pageType?: string
  heroImage?: SanityImage
  section?: {
    title?: string
    subtitle?: string
  }
  seo?: Seo
} | null
