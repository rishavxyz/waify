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
		liked_posts={data.liked_posts}
	/>
</GetPost>

<p class="my-5 text-lg font-semibold">Widescreens</p>
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
		liked_posts={data.liked_posts}
	/>
</GetPost>