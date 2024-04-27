import type { PageServerLoad } from "./$types";

export const load = (async ({ params, cookies }) => {
    const tag = params.tag

    return { tag }
}) satisfies PageServerLoad;