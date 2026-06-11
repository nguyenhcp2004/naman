import { defineQuery } from "next-sanity"

export const PROJECT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "staticPage" && pageType == "projects"][0]{
    title,
    pageType,
    sections[]{
      title,
      subtitle
    },
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
