/** Blog-related TypeScript interfaces */

/** A curated collection (文集) that groups related posts. */
export interface BlogCollection {
  slug: string
  name: string
  icon: string
  order: number
  description: string
}

/** Collection enriched with its article count at request time. */
export interface BlogCollectionWithCount extends BlogCollection {
  count: number
}

/** List-friendly summary of a blog post. */
export interface BlogListItem {
  slug: string
  title: string
  description: string
  date: string
  readingTime: number
  tags: string[]
  /** Collection slug this post belongs to. */
  collection: string
  /** Resolved collection metadata for display. */
  collectionName?: string
  collectionIcon?: string
  originalUrl?: string
}

/** Full blog post, including rendered body and raw markdown. */
export interface BlogPost extends BlogListItem {
  body?: unknown
  wordage?: number
}

/** Paginated list response from `/api/blog`. */
export interface BlogListResponse {
  items: BlogListItem[]
  /** Total number of posts matching the query, ignoring limit/offset. */
  total: number
}
