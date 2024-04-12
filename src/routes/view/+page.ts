import { fdate } from "$lib/utils/fdate";
import type { PageLoad } from "./$types";

interface Data
{ date: string
; id: string
; url: string
; extension: string
; source: string
; is_nsfw: string
; height: string
; width: string
; likes: string
; byte_size: string
}

interface Artist
{ name: string
; patreon?: string
; pixiv?: string
; twitter?: string
; deviant_art?: string
}

interface Tag
{ tag_id: string
; name: string
; desc: string
}

type Post = Data &
{ artist?: Artist
; tags: Tag[]
}

export const load: PageLoad = async ({ url, parent }) => {
  const {
    artist, tags, date, is_nsfw, ...rest
  } = Object.fromEntries(
    url.searchParams
  ) as unknown as Data & {
    artist: string, tags: string
  }
  
  const post: Post = {
    ...rest,
    artist: JSON.parse(artist),
    tags: JSON.parse(tags),
    is_nsfw: JSON.parse(is_nsfw),
    date: fdate(date)
  }

  const layoutData = await parent()

  return { post, layoutData }
};