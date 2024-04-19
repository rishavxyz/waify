export function fdate(
  date: string | Date | number, options?: Intl.DateTimeFormatOptions
): string {
  return new Date(date).toLocaleDateString('en-us', options ??
    { month: 'short'
    , day: 'numeric'
    , year: 'numeric'
    , weekday: 'short'
    }
  )
}

