import type { Post } from "$lib/types"

type Props = {
  fallback: Post[];
  name: 'posts' | 'saved' | 'related',
  cache: 'hit'|'miss'
}

export function get_posts({ name, fallback, cache }: Props) {
  const storage = name == 'posts' ? localStorage : sessionStorage

  switch (cache) {
    case 'hit': {
      const cached_posts = JSON.parse(
        storage.getItem(name) ?? ''
      ) as Post[]

      return cached_posts
    }
    case 'miss': {
      storage.setItem(name, JSON.stringify(fallback))
      return fallback
    }
  }
}