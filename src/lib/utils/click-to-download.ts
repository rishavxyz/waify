import type { Action } from "svelte/action";
import { delay } from "./delay"

type Options =
{ url: string
; id: string
; extension: string
; filename?: string
}

async function fetch_and_download(options: Options & {
  onstart: ()=> void,
  onend: ()=> void,
  onerror: ()=> void,
  event: Event
}) {
  options.event.preventDefault()
  try {
    options.onstart()
    const req = await fetch(options.url)
    const res = await req.blob()

    const url = URL.createObjectURL(res)
    const a = document.createElement('a')

    a.href = url
    a.download = options.filename
    ?? 'waify'.concat(
      '-', options.id,
      options.extension
    )

    document.body.appendChild(a)
    await delay(3000)
    a.click()
    document.body.removeChild(a)
  } catch (_) {
    options.onerror()
  } finally {
    options.onend()
  }
}

export const click_to_download: Action<
  HTMLButtonElement, Options, {
    'on:start': () => void
    'on:end': () => void
    'on:error': () => void
  }
> = (node, options) => {

  function onstart() {
    node.dispatchEvent(new CustomEvent('start'))
  }
  function onend() {
    node.dispatchEvent(new CustomEvent('end'))
  }
  function onerror() {
    node.dispatchEvent(new CustomEvent('error'))
  }

  node.addEventListener('click', event => fetch_and_download(
    { ...options
    , event
    , onstart
    , onend
    , onerror
    }
  ))

  return {
    destroy() {
      node.removeEventListener('click', event => fetch_and_download(
        { ...options
        , event
        , onstart
        , onend
        , onerror
        }
      ))
    },
  }
}