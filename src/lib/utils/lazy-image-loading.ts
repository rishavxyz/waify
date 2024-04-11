import type { Action } from 'svelte/action'

type Props = {
  src: string;
  width?: number;
  height?: number;
  blur_nsfw?: boolean;
}

const lazy_image_loading: Action<
  HTMLElement, Props, {
    'on:image_loaded': (event: {
      detail: HTMLImageElement, target: HTMLElement
    }) => void 
  }
> = (node, props) => {
  const img_url = props.src
  const img = new Image()

  function image_loaded() {
    node.appendChild(img)
    node.dispatchEvent(
      new CustomEvent('image_loaded', { detail: img })
    )
  }

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      if (img.src) {
        img.removeEventListener('load', image_loaded)
        return
      }
      img.src = img_url
      img.addEventListener('load', image_loaded)
      return
    } else return // more safety
  })
  observer.observe(node)

  return {
    destroy() {
      observer.disconnect()
    }
  }
}

export default lazy_image_loading