import { fdate } from './fdate'

type AnyObject = Record<string, string>

interface PostDataTypes
{ to_json?: [string, string][]
; format_date?: string | Date
; rest: AnyObject
}

type Artist =
{ name: string
; deviant_art?: string
; patreon?: string
; pixiv?: string
; twitter?: string
}

type Tag =
{ tag_id: string
; name: string
; is_nsfw: boolean
}

interface ParseValues
{ extension?: string
; image_id?: string
; date?: string
; artist?: Artist | null
; url?: string
; tags?: Tag[]
}

export function parse_post_data(options: PostDataTypes): ParseValues {
  let parsed: ParseValues & AnyObject = { ...options.rest }

  if ( options.format_date
  ) parsed.date = fdate(options.format_date)

  if (options.to_json) {
    options.to_json.every(
      ([name, string]) => parsed[name] = JSON.parse(string)
    )
  }

  return parsed
}