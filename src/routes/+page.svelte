<script lang="ts">
	import GetPost from '$lib/components/get-post.svelte';
	import ShowPost from '$lib/components/post.svelte';
	import { title } from '$lib/writable/title.js';

	export let data

	title.set(`Waifu lovers' home`)
</script>

<div class="mb-5">
    <h1 class="text-3xl font-semibold">Waify</h1>
    <p class="mt-2 opacity-75">Let your wet dreams come true</p>
</div>

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
	<ShowPost {posts}
		blur_nsfw={data.is_blur_nsfw_enabled}
		loved_posts={data.loved_posts}
	/>
</GetPost>

<div class="my-5 space-y-1">
	<p class="text-lg font-semibold">Widescreens</p>
	<p class="text-sm opacity-75">Perfect for desktop wallpapers</p>
</div>
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
	<ShowPost landscape
		{posts} blur_nsfw={data.is_blur_nsfw_enabled}
		loved_posts={data.loved_posts}
	/>
</GetPost>