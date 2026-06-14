import type { Metadata } from "next"

import { sanityFetch } from "../../sanity/lib/client"
import { PROJECT_PAGE_QUERY } from "../../sanity/lib/queries"
import type { ProjectPage as SanityProjectPage } from "../../sanity/types"
import { ProjectsPageContent } from "./projects-page-content"

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<SanityProjectPage>({
    query: PROJECT_PAGE_QUERY,
  })

  return {
    title: page?.seo?.title ?? page?.title ?? "Projects",
    description:
      page?.seo?.description ??
      page?.sections?.[0]?.subtitle ??
      "Commercial kitchen and refrigeration projects planned, supplied, and supported by QMaster.",
    robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function ProjectsPage() {
  const page = await sanityFetch<SanityProjectPage>({
    query: PROJECT_PAGE_QUERY,
  })

  return <ProjectsPageContent page={page} />
}
