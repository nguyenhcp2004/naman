import type { Metadata } from "next"

import { sanityFetch } from "../../sanity/lib/client"
import { PROJECT_PAGE_QUERY } from "../../sanity/lib/queries"
import type { ProjectPage as SanityProjectPage } from "../../sanity/types"
import { ProjectPageContent } from "./project-page-content"

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<SanityProjectPage>({ query: PROJECT_PAGE_QUERY })

  return {
    title: page?.seo?.title ?? page?.title ?? "Project",
    description:
      page?.seo?.description ??
      page?.sections?.[0]?.subtitle ??
      "Professional supplier of commercial kitchen and refrigeration equipment.",
    robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function ProjectPage() {
  const page = await sanityFetch<SanityProjectPage>({ query: PROJECT_PAGE_QUERY })

  return <ProjectPageContent page={page} />
}
