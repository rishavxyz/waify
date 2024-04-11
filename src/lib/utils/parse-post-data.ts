import { fdate } from './fdate'

type AnyObject = Record<string, unknown>

interface PostDataTypes
{ to_json?: [string, string][]
; format_date?: string | Date
; anything_else?: AnyObject
}

interface ParsedValues extends AnyObject
{ date?: string
; tags?: AnyObject[]
}

export function parse_post_data(options: PostDataTypes) {
  let parsed: ParsedValues = { ...options.anything_else }

  if ( options.format_date
  ) parsed.date = fdate(options.format_date)

  if (options.to_json) {
    options.to_json.every(
      ([name, string]) => parsed[name] = JSON.parse(string)
    )
  }
  
  return parsed
}