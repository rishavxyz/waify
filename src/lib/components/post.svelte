<script lang="ts">
	import type { Post } from '$lib/types';
	import { lazy_image_loading } from '$lib/utils/lazy-image-loading';
  import ButtonLike from './btn-like.svelte'

  interface Props
  { liked_posts: number[]
	; blur_nsfw: boolean
	; posts: Post[]
	; placeholder?: boolean
	; animate?: boolean
	; class?: string
  }

  let {
    liked_posts,
    blur_nsfw,
    posts,
    class: cls = '',
		placeholder = false,
		animate = false
	}: Props = $props()

</script>

<section class="columns-2 lg:columns-3 [&>article]:break-inside-avoid {cls}">
	{#if placeholder}
		{#each posts as _}
			<article class="mb-4 card" class:animate-pulse={animate}>
				<div class="bg-base-100 h-52 lg:h-80" />
				<div class="mt-3 self-end flex gap-x-2">
					<div class="bg-base-100 p-2" />
					<div class="bg-base-100 py-2 px-3" />
				</div>
			</article>
		{/each}
	{:else}
		{#snippet post(image)}
			{@const params = new URLSearchParams(
				{ image_id: image.image_id
				, url: image.url
				, source: image.source
				,	artist: JSON.stringify(image.artist)
				,	date: image.uploaded_at
				, tags: JSON.stringify(image.tags)
				, background_color: image.dominant_color
				, extension: image.extension
				, height: image.height
				, width: image.width
				, is_nsfw: image.is_nsfw
				, likes: image.favorites
				, byte_size: image.byte_size
				}).toString()
			}
			{@const is_liked = liked_posts.includes(image.image_id)}
			{@const likes = is_liked ? image.favorites + 1 : image.favorites}

			<a href="/view?{params}">
				<figure class="h-52 lg:h-80" style:background-color={image.dominant_color}
					use:lazy_image_loading={{ src: image.url }}
					on:image_loaded={node => {
						node.target.classList.remove('h-52', 'lg:h-80')
						if (blur_nsfw) {
							if (image.is_nsfw)
							node.detail.style.filter = 'blur(2rem)'
						}
						node.detail.draggable = false
						node.detail.alt = ''
					}}
				/>
			</a>

			<ButtonLike id={image.image_id} {is_liked} {likes} />
		{/snippet}

		{#each posts as image, i (image?.image_id ?? i)}
			{@const is_landscape = image.width > image.height}
			{@const is_very_tall = +image.width * 1.8 < +image.height}

			{#if is_landscape || is_very_tall}
				<article class="my-4 card [column-span:all]">
					{@render post(image)}
				</article>
			{:else}
				<article class="mb-4 card">
					{@render post(image)}
				</article>
			{/if}
		{:else}
				<p class="opacity-75 text-center [column-span:all]">No posts to show</p>
		{/each}
	{/if}
</section>