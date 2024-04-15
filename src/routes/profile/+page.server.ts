import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const options = await parent()

  return {
    options
  }
}