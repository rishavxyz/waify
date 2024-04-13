import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
  const cookie_nsfw = cookies.get('enable-nsfw')
  const cookie_blur_nsfw = cookies.get('blur-nsfw')
  const cookie_force_nsfw = cookies.get('force-nsfw')
  const cookie_gifs = cookies.get('enable-gifs')

  const is_nsfw_enabled = cookie_nsfw == 'on' ? true : false
  const is_blur_nsfw_enabled = cookie_blur_nsfw == 'on' ? true : false
  const is_force_nsfw_enabled = cookie_force_nsfw == 'on' ? true : false
  const is_gifs_enabled = cookie_gifs == 'on' ? true : false
  const post_limit = Number(cookies.get('post-limit') ?? 20)
  const liked_posts: number[] = JSON.parse(
    cookies.get('liked_posts') ?? '[]'
  )

  return {
    is_nsfw_enabled,
    is_blur_nsfw_enabled,
    is_force_nsfw_enabled,
    is_gifs_enabled,
    post_limit,
    liked_posts
  }
}