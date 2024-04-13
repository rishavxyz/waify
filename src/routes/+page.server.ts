import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import type { Post } from "$lib/types";

import waifus from '$lib/data.json'
import { api_url } from "$lib";
import { from_now } from "$lib/utils/from-now";

type ReturnType =  {
  is_blur_nsfw_enabled: boolean,
  liked_posts: number[],
  cache: 'hit'|'miss',
  posts?: Post[],
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
  
  const is_nsfw_enabled = options.is_nsfw_enabled
  const liked_posts = options.liked_posts
  const is_blur_nsfw_enabled = options.is_blur_nsfw_enabled

  const timeout = JSON.parse(
    cookies.get('timeout') ?? 'null'
  ) as number | null

  if (timeout &&
    Date.now() < from_now(timeout)
  ) {
    console.log('cache hit')
    return {
      is_blur_nsfw_enabled,
      liked_posts,
      cache: 'hit'
    } as ReturnType
  }

  const search_params = new URLSearchParams(
    { limit: String(options.post_limit)
    , is_nsfw: String(is_nsfw_enabled)
    , gif: String(options.is_gifs_enabled)
    }
  ).toString()

  const req = await fetch(
    [api_url, search_params].join('?')
  )
  const res = await req.json()

  const posts = res.images as Post[]
  
  console.log('cache miss')
  cookies.set('timeout', String(from_now(300)), {
    path: '/', expires: from_now(300, true)
  })

  return {
    is_blur_nsfw_enabled,
    liked_posts,
    posts,
    cache: 'miss'
  } as ReturnType
}
