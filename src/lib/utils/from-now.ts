export function from_now(time?: null, to_date?: false): number;
export function from_now(time?: number, to_date?: false): number;
export function from_now(time?: null, to_date?: true): Date;
export function from_now(time?: number, to_date?: true): Date;

export function from_now(
  time: number|null = null, to_date: boolean = false
) {
  if (!time) return to_date ? new Date() : Date.now()

  const date = new Date(Date.now() + time * 1000)

  return to_date ? date : +date
}