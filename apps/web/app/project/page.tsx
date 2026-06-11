import { sanityFetch } from "@/sanity/lib/client"
import { STATIC_PAGE_QUERY } from "@/sanity/lib/queries"
import type { StaticPage } from "@/sanity/types"

export default async function ProjectPage() {
  const page = await sanityFetch<StaticPage>({ query: STATIC_PAGE_QUERY, params: { pageType: "projects" } })

  return (
    <section className="mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-7xl flex-col justify-center px-5 py-16 sm:px-8">
      <p className="mb-4 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent-foreground">
        Project
      </p>
      <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-foreground md:text-7xl">
        {page?.section?.title ?? page?.title ?? "Manage projects with clarity from kickoff to delivery."}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        {page?.section?.subtitle ?? "Track initiatives, align stakeholders, and keep every milestone visible in one QMaster workspace."}
      </p>
    </section>
  )
}
