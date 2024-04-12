<script lang="ts">
	import ButtonLike from '$lib/components/btn-like.svelte'
	import { lazy_image_loading } from '$lib/utils/lazy-image-loading'

	export let data
</script>

{#snippet post(image)}
	{@const params = new URLSearchParams(
		{ id: image.image_id
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
	{@const is_liked = data.liked_posts.includes(image.image_id)}
	{@const likes = is_liked ? image.favorites + 1 : image.favorites}

	<a href="/view?{params}">
		<figure class="h-52 lg:h-80" style:background-color={image.dominant_color}
			use:lazy_image_loading={{ src: image.url }}
			on:image_loaded={node => {
				node.target.classList.remove('h-52', 'lg:h-80')
				if (data.is_blur_nsfw_enabled) {
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

<section class="columns-2 lg:columns-3 [&>article]:break-inside-avoid">
	{#each data.posts as image, i (image.image_id)}
		{@const is_landscape = image.width > image.height}
		{@const is_very_tall = image.width * 1.8 < image.height}

		{#if is_landscape || is_very_tall}
			<article class="my-4 card card-compact [column-span:all]">
				{@render post(image)}
			</article>
		{:else}
			<article class="mb-4 card card-compact">
				{@render post(image)}
			</article>
		{/if}

	{/each}
</section>