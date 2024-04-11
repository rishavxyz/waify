import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import waifus from '$lib/data.json'

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
  fetch, setHeaders, cookies
}) => {
  // const cookie_nsfw = cookies.get('enable-nsfw')
  // const cookie_gifs = cookies.get('enable-gifs')
  // const limit = cookies.get('post-limit') ?? '20'

  // const is_nsfw_enabled = cookie_nsfw == 'on' ? 'true' : 'false'
  // const is_gifs_enabled = cookie_gifs == 'on' ? 'true' : 'false'

  // const searchParams = new URLSearchParams(
  //   { is_nsfw: is_nsfw_enabled
  //   , gif: is_gifs_enabled
  //   , limit
  //   }
  // ).toString()

  // const req = await fetch('https://api.waifu.im/search?'+ searchParams)

  // if (!req.ok) throw error(500, 'Cannot fetch from server')

  // const res = await req.json()

  // setHeaders({ 'cache-control': 'max-age=600' })

  const liked_posts: number[] = JSON.parse(
    cookies.get('liked_posts') ?? '[]'
  )
  const cookie_blur_nsfw = cookies.get('blur-nsfw')
  const cookie_nsfw = cookies.get('enable-nsfw')
  const cookie_gifs = cookies.get('enable-gifs')

  const is_nsfw_enabled = cookie_nsfw == 'on' ? true : false
  const is_blur_nsfw_enabled = cookie_blur_nsfw == 'on' ? true : false

  const posts = waifus.images.slice(
    0, +(cookies.get('post-limit') ?? 20)
  ).filter(
    post => is_nsfw_enabled ? true : !post.is_nsfw
  )

  return {
    is_blur_nsfw_enabled,
    liked_posts,
    posts
  }
}
