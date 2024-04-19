<script lang="ts">
	import type { Post } from '$lib/types';
	import { fdate } from '$lib/utils/fdate';
	import { lazy_image_loading } from '$lib/utils/lazy-image-loading';
  import ButtonLike from './btn-like.svelte'

  interface Props
  { loved_posts: {id: string, at:number}[]
	; blur_nsfw: boolean
	; posts: Post[] | null
	; placeholder?: number
	; class?: string
	; classChild?: string
	; overrideClass?: boolean
	; landscape?: boolean
	; type?: string
  }

  let {
    loved_posts,
    blur_nsfw,
    posts,
		placeholder = 10,
    class: cls,
		classChild,
		landscape = false,
		type
	}: Props = $props()

	function posts_to_sorted(posts: Post[]) {
		if (type != 'saved') return posts

			let post_id_to_date: any = {}

			loved_posts.forEach(post =>
				post_id_to_date[post.id] = post.at
			)

			return posts.toSorted((fst, snd) => {
				const fst_date = post_id_to_date[fst.image_id]
				const snd_date = post_id_to_date[snd.image_id]

				return snd_date - fst_date
			})
	}
</script>

<section class="columns-2 lg:columns-3 [&>article]:break-inside-avoid {cls}">

	{#if !posts}
		{#each Array(placeholder) as _}
			<article class="mb-4 card animate-pulse" class:span-all={landscape}>
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
				{ url: image.url
				, source: image.source
				,	artist: JSON.stringify(image.artist)
				,	date: image.date
				, tags: JSON.stringify(image.tags)
				, background_color: image.dominant_color
				, extension: image.extension
				, height: image.height
				, width: image.width
				, is_nsfw: image.is_nsfw
				, loves: image.loves
				, loved_at: image.loved_at
				, byte_size: image.byte_size
				}).toString()
			}
			{@const is_loved = loved_posts.some(post_ => post_.id == image.image_id)}
			{@const loves = is_loved ? +image.loves + 1 : +image.loves}

			<a href="/{image.image_id}?{params}">
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

			<ButtonLike id={image.image_id} {is_loved} {loves} />
		{/snippet}

		{#each posts_to_sorted(posts) as image (image.image_id)}
			{@const is_landscape = landscape || image.width > image.height}
			{@const is_very_tall = landscape ? false : +image.width * 1.8 < +image.height}

			{#if is_landscape || is_very_tall}
				<article class="my-4 card {classChild ?? 'span-all'}">
					{@render post(image)}
				</article>
			{:else}
				<article class="mb-4 card {classChild}">
					{@render post(image)}
				</article>
			{/if}
		{:else}
			<p class="my-4 opacity-75 text-center [column-span:all]">No posts to show</p>
		{/each}
	{/if}
</section>


<style>
	.span-all {
		column-span: all;
	}
</style>