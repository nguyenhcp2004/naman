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
