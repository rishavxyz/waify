import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import waifus from '$lib/data.json'

export const load: PageServerLoad = async ({
  fetch, setHeaders, cookies
}) => {
  const cookie_nsfw = cookies.get('enable-nsfw')
  const cookie_gifs = cookies.get('enable-gifs')
  const limit = cookies.get('post-limit') ?? '20'

  const is_nsfw_enabled = cookie_nsfw == 'on' ? 'true' : 'false'
  const is_gifs_enabled = cookie_gifs == 'on' ? 'true' : 'false'

  const searchParams = new URLSearchParams(
    { is_nsfw: is_nsfw_enabled
    , gif: is_gifs_enabled
    , limit
    }
  ).toString()

  // const req = await fetch('https://api.waifu.im/search?'+ searchParams)

  // if (!req.ok) throw error(500, 'Cannot fetch from server')

  // const res = await req.json()

  // setHeaders({ 'cache-control': 'max-age=600' })

  return {
    posts: waifus.images
  }
}
