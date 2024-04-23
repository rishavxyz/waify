import { dev } from "$app/environment"

// place files you want to import through the `$lib` alias in this folder.
export const api_url = `https://api.waifu.im/search`
export const disable_post = true
export const clg = (...data: any[]) => { if (dev) console.log(data) }