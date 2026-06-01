/** Blog-related TypeScript interfaces */

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  date: string
  readingTime: number // in minutes
  tags: string[]
  coverImage?: string
  content: string // raw markdown
  published: boolean
}

export interface BlogListItem {
  id: string
  slug: string
  title: string
  description: string
  date: string
  readingTime: number
  tags: string[]
  coverImage?: string
}

/** Convert full BlogPost to list-friendly summary */
export function toBlogListItem(post: BlogPost): BlogListItem {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    readingTime: post.readingTime,
    tags: post.tags,
    coverImage: post.coverImage,
  }
}
