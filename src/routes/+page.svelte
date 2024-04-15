<script lang="ts">
	import GetPost from '$lib/components/get-post.svelte';
	import ShowPost from '$lib/components/post.svelte';
	import { lazy_image_loading } from '$lib/utils/lazy-image-loading.js';

	export let data
</script>

<GetPost let:posts
	cache={data.cache}
	search={{
		is_nsfw: data.is_nsfw_enabled
		? null : data.is_force_nsfw_enabled
		? true : false,
		gif: data.is_gifs_enabled,
		limit: data.post_limit
	}}
	type="posts"
>
	{#if !posts}
		<ShowPost placeholder animate posts={Array(10)}
			blur_nsfw liked_posts={[]}
		/>
	{:else}
		<ShowPost {posts}
			blur_nsfw={data.is_blur_nsfw_enabled}
			liked_posts={data.liked_posts}
		/>
	{/if}
</GetPost>

<p class="my-5 text-lg font-semibold">Great for wide screens</p>
<GetPost let:posts
	cache={data.cache}
	search={{
		is_nsfw: data.is_nsfw_enabled
		? null : data.is_force_nsfw_enabled
		? true : false,
		gif: data.is_gifs_enabled,
		limit: 10,
		orientation: 'landscape'
	}}
	type="wide"
>
	{#if !posts}
		<div class="loading loading-dots" />
	{:else}
		<section class="carousel gap-x-4 carousel-center">
			{#each posts as post}
				<div class="carousel-item h-52 w-[85%]"
					style:background-color={post.dominant_color}
					use:lazy_image_loading={{
						src: post.url,
						blur_nsfw: data.is_blur_nsfw_enabled,
					}}
				/> 
			{/each}
		</section>
	{/if}
</GetPost>