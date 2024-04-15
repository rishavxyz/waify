import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Post } from "$lib/types";

import { api_url } from "$lib";
import { from_now } from "$lib/utils/from-now";

type ReturnType =  {
  is_blur_nsfw_enabled: boolean,
  liked_posts: number[],
  cache: 'hit'|'miss',
  posts: Post[],
}

export const actions: Actions = {
  async likePost({ cookies, url }) {
    const image_id = url.searchParams.get('id')! as string

    const liked_posts: number[] = JSON.parse(
      cookies.get('liked_posts') ?? '[]'
    )

    let ids: number[] = []

    if (liked_posts.includes(+image_id)
    ) ids = liked_posts.filter(id => id != +image_id)
    else ids = [...liked_posts, +image_id]

    cookies.set
    ( 'liked_posts'
    , JSON.stringify(ids)
    , { path: '/', expires: new Date('2050') }
    )
  }
}

export const load: PageServerLoad = async ({
  parent, cookies, fetch
}) => {
  const options = await parent()
  
  const liked_posts = options.liked_posts
  const is_blur_nsfw_enabled = options.is_blur_nsfw_enabled
  const cache = options.cache

  if (cache == 'hit') return {
    is_blur_nsfw_enabled,
    liked_posts,
    cache
  } as ReturnType

  const ten_min = 9000
  cookies.set('timeout', String(from_now(ten_min)), {
    path: '/', expires: from_now(ten_min, true)
  })

  return {
    is_blur_nsfw_enabled,
    liked_posts,
    cache
  } as ReturnType
}
