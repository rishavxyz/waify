import { fdate } from "$lib/utils/fdate";
import type { PageLoad } from "./$types";
import type { Data, Post } from "$lib/types";

export const load: PageLoad = async ({ params, url, parent }) => {
  const {
    artist, tags, date, is_nsfw, ...rest
  } = Object.fromEntries(
    url.searchParams
  ) as unknown as Data & {
    artist: string, tags: string
  }
  
  const post: Post = {
    ...rest,
    image_id: +params.image_id,
    artist: JSON.parse(artist),
    tags: JSON.parse(tags),
    is_nsfw: JSON.parse(is_nsfw),
    date: fdate(+date)
  }

  const options = await parent()
  return { post, ...options }
};