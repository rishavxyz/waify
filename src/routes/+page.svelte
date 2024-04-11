<script lang="ts">
	import { enhance } from '$app/forms';
	import { backOut } from 'svelte/easing';
	import { fade, fly, scale } from 'svelte/transition';

	import Icon from '$lib/components/icon.svelte';
	import lazy_image_loading from '$lib/utils/lazy-image-loading'

	export let data
</script>

{#snippet like_btn(liked, likes, icon_anim, y)}
	{@const options = { easing: backOut, duration: 500 }}

	<button class="text-lg flex gap-x-2">
		<span class="text-base" in:fly={{ y, ...options }}>{likes}</span>
		<span in:icon_anim={options}>
			<Icon icon="heart" fill={liked} />
		</span>
	</button>
{/snippet}

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
		}).toString()
	}
	{@const is_liked_post = data.liked_posts.includes(image.image_id)}
	{@const likes = is_liked_post ? image.favorites + 1 : image.favorites}

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

	<form action="?/likePost&id={image.image_id}" 
		method="post" class="mt-2 ms-auto" use:enhance
	>
		{#if is_liked_post}
			{@render like_btn(true, likes, scale, 10)}
		{:else}
			{@render like_btn(false, likes, fade, -10)}
		{/if}
	</form>
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