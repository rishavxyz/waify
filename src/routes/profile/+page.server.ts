import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const actions: Actions = {
  async update({ cookies, request }) {
    const formData = await request.formData()
    const formEntry = Object.fromEntries(formData) as {
      'enable-nsfw': 'on', 'enable-gifs': 'on', 'blur-nsfw': 'on',
      limit: string
    }

    cookies.set('enable-nsfw', formEntry['enable-nsfw'],
    {
      path: '/', expires: new Date('2050')
    })

    cookies.set('blur-nsfw', formEntry['blur-nsfw'],
    {
      path: '/', expires: new Date('2050')
    })

    cookies.set('enable-gifs', formEntry['enable-gifs'],
    {
      path: '/', expires: new Date('2050')
    })

    cookies.set('post-limit', formEntry.limit,
    {
      path: '/', expires: new Date('2050')
    })

    return { success: true }
  }
}

export const load: PageServerLoad = ({ cookies }) => {
  const cookie_nsfw = cookies.get('enable-nsfw')
  const cookie_blur_nsfw = cookies.get('blur-nsfw')
  const cookie_gifs = cookies.get('enable-gifs')

  const is_nsfw_enabled = cookie_nsfw == 'on' ? true : false
  const is_blur_nsfw_enabled = cookie_blur_nsfw == 'on' ? true : false
  const is_gifs_enabled = cookie_gifs == 'on' ? true : false

  return {
    settings: {
      is_gifs_enabled,
      is_nsfw_enabled,
      is_blur_nsfw_enabled,
      post_limit: Number(cookies.get('post-limit') ?? 20)
    }
  }
}