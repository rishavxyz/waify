import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url, depends }) => {
  const { date: _date
        , artist
        , tags
        , ...rest
  } = Object.fromEntries(url.searchParams)

  const date = new Date(_date).toLocaleDateString('en-us',
    { month: 'short'
    , day: 'numeric'
    , year: 'numeric'
    , weekday: 'short'
    }
  )

  depends('load:more')

  return {
    metadata:
    { artist: JSON.parse(artist)
    , tags: JSON.parse(tags)
    , date
    , ...rest
    }
  }
};