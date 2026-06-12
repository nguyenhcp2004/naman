import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId } from "../env"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: string
  params?: Record<string, string | number | boolean | null>
  revalidate?: number | false
}) {
  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate },
    perspective: "published",
  })
}
