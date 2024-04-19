import icons from './icon.json'

export interface Data
{ date: number|string
; image_id: number
; url: string
; extension: string
; source: string
; is_nsfw: string
; height: string
; width: string
; loves: number
; loved_at: number|null
; byte_size: string
; dominant_color: string
}

export interface Artist
{ name: string
; patreon?: string
; pixiv?: string
; twitter?: string
; deviant_art?: string
}

export interface Tag
{ tag_id: string
; name: string
; desc: string
}

export interface Post extends Data
{ artist?: Artist
; tags: Tag[]
}

export interface Options
{ is_nsfw_enabled: boolean
; is_blur_nsfw_enabled: boolean
; is_force_nsfw_enabled: boolean
; is_gifs_enabled: boolean
; post_limit: number
; loved_posts: {id: string, at:number}[]
; timeout: number
; cache: 'hit'|'miss'
; url: string
}

export type IconName = keyof typeof icons