export function from_now(time?: string|number|null, to_date?: false): number;
export function from_now(time?: string|number|null, to_date?: true): Date;

export function from_now(
  time: string|number|null = null, to_date: boolean = false
) {
  if (!time) {
    const date = new Date()
    return to_date ? date : +date
  }

  if (typeof time == 'string') {
    const date = new Date(time)
    return to_date ? date : +date
  }

  const date = new Date(Date.now() + time * 1000)

  return to_date ? date : +date
}