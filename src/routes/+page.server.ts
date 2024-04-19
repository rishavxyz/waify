import { from_now } from "$lib/utils/from-now";
import type { Actions } from "./$types";

type Post = {
  id: string, at: number
}

export const actions: Actions = {
  async loved_post({ cookies, url }) {
    const image_id = url.searchParams.get('id') as string

    const loved_posts: Post[] = JSON.parse(
      cookies.get('loved_posts') ?? '[]'
    )

    let loved_posts_new: Post[] = []
    const post: Post = {
      id: image_id,
      at: from_now()
    }

    if (loved_posts.some(post_ => post_.id == image_id)) {
      loved_posts_new = loved_posts.filter(post_ => post_.id != image_id)
    } else {
      loved_posts_new = [...loved_posts, post]
    }

    cookies.set
    ( 'loved_posts'
    , JSON.stringify(loved_posts_new)
    , { path: '/', expires: new Date('2050') }
    )
  }
}

