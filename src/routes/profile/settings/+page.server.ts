import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const actions: Actions = {
  async update({ cookies, request }) {
    const formData = await request.formData()
    const formEntry = Object.fromEntries(formData) as {
      'enable-nsfw': 'on', 'enable-gifs': 'on', 'blur-nsfw': 'on',
      limit: string
    }

    // cause a reload to refresh posts
    cookies.delete('timeout', { path: '/' })

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

export const load: PageServerLoad = async ({ parent }) => {
  const options = await parent()

  return {
    options
  }
}