export interface Data
{ date: string
; image_id: number
; url: string
; extension: string
; source: string
; is_nsfw: string
; height: string
; width: string
; likes: string
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