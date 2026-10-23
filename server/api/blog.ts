/**
 * Blog API — serves the post list and individual posts from `content/blog/`.
 *
 * GET /api/blog                       → all posts (newest first)
 * GET /api/blog?collection=vue        → posts in one collection
 * GET /api/blog?limit=6&offset=0      → paginated slice, plus the total count
 * GET /api/blog?id=<slug>             → a single post with rendered body
 */

import { serverQueryContent } from '#content/server'
import { collectionMap } from '~/data/collections'
import type { BlogListItem, BlogListResponse } from '~/types/blog'

/** Derive the public slug from a content document's path. */
function slugOf(doc: any): string {
  return String(doc?._path || '').replace(/^\/blog\//, '')
}

function toListItem(doc: any): BlogListItem {
  const meta = collectionMap.get(doc.collection)
  return {
    slug: slugOf(doc),
    title: doc.title,
    description: doc.description || '',
    date: doc.date,
    readingTime: doc.readingTime || 1,
    tags: doc.tags || [],
    collection: doc.collection || 'essay',
    collectionName: meta?.name,
    collectionIcon: meta?.icon,
    originalUrl: doc.originalUrl,
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string | undefined
  const collection = query.collection as string | undefined
  const limit = Number(query.limit) || 0
  const offset = Number(query.offset) || 0

  // Single post (with body) — used as a fallback by the detail page.
  if (id) {
    const post = await serverQueryContent(event, 'blog', id).findOne()
    if (!post) {
      throw createError({ statusCode: 404, statusMessage: '文章未找到' })
    }
    return post
  }

  // Post list, optionally filtered by collection.
  let contentQuery = serverQueryContent(event, 'blog')
  if (collection) {
    contentQuery = contentQuery.where({ collection })
  }

  const docs = await contentQuery
    .only(['_path', 'title', 'description', 'date', 'readingTime', 'tags', 'collection', 'originalUrl'])
    .sort({ date: -1 })
    .find()

  const items = docs.map(toListItem)
  const total = items.length
  const page = limit ? items.slice(offset, offset + limit) : items.slice(offset)

  return { items: page, total } satisfies BlogListResponse
})
