import type { Action } from 'svelte/action'

type Props = {
  src: string;
  width?: number;
  height?: number;
  blur_nsfw?: boolean;
}

export const lazy_image_loading: Action<
  HTMLElement, Props, {
    'on:image_loaded': (event: {
      detail: HTMLImageElement, target: HTMLElement
    }) => void 
  }
> = (node, props) => {
  const img_url = props.src
  const img = new Image()
  // article->(super_el) > a > figure->(node)
  const super_el = node.parentNode?.parentElement!

  function image_loaded() {
    node.appendChild(img)
    node.dispatchEvent(
      new CustomEvent('image_loaded', { detail: img })
    )
    super_el.setAttribute('data-loaded', 'true')
  }

  function remove_el() {
    super_el.innerHTML = `
    <div role="alert" class="h-52 bg-base-100 p-4 grid place-items-center">
      <div class="text-center">
        <p class="font-semibold text-sm">
          Failed to load this post
        </p>
        <button onclick="this.parentNode.parentNode.parentNode.remove()"
          class="mt-4 btn btn-xs btn-info">Dismiss</button
        >
      </div>
    </div>
    `
  }

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {

      if (super_el.getAttribute('data-loaded')) {
        img.removeEventListener('load', image_loaded)
        img.removeEventListener('error', remove_el)
        return
      }
      img.src = img_url
      img.addEventListener('load', image_loaded)
      img.addEventListener('error', remove_el)
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