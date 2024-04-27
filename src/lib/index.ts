import { dev } from "$app/environment"

// place files you want to import through the `$lib` alias in this folder.
export const api_url = `https://api.waifu.im/search`
export const disable_post = dev
export const clg = (...data: any[]) => { if (dev) console.log(data) }