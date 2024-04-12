import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
  const liked_posts: number[] = JSON.parse(
    cookies.get('liked_posts') ?? '[]'
  )

  return {
    liked_posts
  }
}