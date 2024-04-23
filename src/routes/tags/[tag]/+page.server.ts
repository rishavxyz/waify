import type { PageServerLoad } from "./$types";

export const load = (async ({ params, cookies }) => {
    const tag = params.tag

    // const cookie_tag = cookies.get('most-used-tags')

    // if (cookie_tag) {
    //     const most_used_tags: {
    //         name: number // tag_name: count
    //     } = JSON.parse(cookie_tag)

    //     const cur_tag = Object.entries(
    //         most_used_tags
    //     ).filter(data => data[0] == tag)[0]

    //     if ()
    // }


    return { tag }
}) satisfies PageServerLoad;