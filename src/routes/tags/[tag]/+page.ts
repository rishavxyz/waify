import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    return {
        tag: params.tag
    };
}) satisfies PageLoad;