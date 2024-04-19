<script lang="ts">
	import GetPost from '$lib/components/get-post.svelte';
	import ShowPost from '$lib/components/post.svelte';

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