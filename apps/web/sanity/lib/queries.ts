import { defineQuery } from "next-sanity"

export const PROJECT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "staticPage" && pageType == "projects"][0]{
    title,
    pageType,
    sections[]{
      _key,
      title,
      subtitle
    },
    projectPlanningSteps,
    projectServices[]{
      _key,
      title,
      description
    },
    projectReferences[]{
      _key,
      title,
      description
    },
    projectMarqueeItems,
    seo{
      title,
      description,
      noIndex
    }
  }
`)

const imageFields = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  crop,
  hotspot
`

const seoFields = /* groq */ `
  title,
  description,
  noIndex,
  image { ${imageFields} }
`

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    siteTitle,
    phone,
    email,
    address,
    mainNavigation[]{
      label,
      linkType,
      path,
      url
    },
    seo { ${seoFields} }
  }
`)

export const LANDING_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "landingPage"][0]{
    title,
    "hero": heroSlides[0]{
      eyebrow,
      title,
      description,
      image { ${imageFields} },
      callToAction{
        label,
        linkType,
        path,
        url
      }
    },
    intro{
      title,
      subtitle
    },
    seo { ${seoFields} }
  }
`)

export const STATIC_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "staticPage" && pageType == $pageType][0]{
    title,
    pageType,
    heroImage { ${imageFields} },
    "section": sections[0]{
      title,
      subtitle
    },
    seo { ${seoFields} }
  }
`)

export const FEATURED_PRODUCTS_QUERY = defineQuery(/* groq */ `
  *[_type == "product"] | order(model asc) [0...4] {
    _id,
    model,
    name,
    slug,
    "image": images[0].asset->url,
    category,
    tempRange,
    dimensions,
    capacity,
    refrigerant,
    power,
    inStock,
    isPremium,
    imageType,
    description
  }
`)
