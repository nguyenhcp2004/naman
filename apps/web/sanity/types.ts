type Seo = {
  title?: string
  description?: string
  noIndex?: boolean
}

type ContentSection = {
  title?: string
  subtitle?: string
}

export type ProjectPage = {
  title?: string
  pageType?: string
  sections?: ContentSection[]
  seo?: Seo
} | null
