/**
 * Collections API — returns every 文集 with its article count.
 *
 * GET /api/collections
 */

import { serverQueryContent } from '#content/server'
import { collections } from '~/data/collections'
import type { BlogCollectionWithCount } from '~/types/blog'

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event, 'blog').only(['collection']).find()

  const counts: Record<string, number> = {}
  for (const doc of docs) {
    if (doc.collection) counts[doc.collection] = (counts[doc.collection] || 0) + 1
  }

  return collections
    .slice()
    .sort((a, b) => a.order - b.order)
    .map<BlogCollectionWithCount>(c => ({ ...c, count: counts[c.slug] || 0 }))
})
