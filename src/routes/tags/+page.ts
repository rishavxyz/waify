import type { PageLoad } from './$types';

export const load = (async ({ parent, url }) => {
    return await parent();
}) satisfies PageLoad;