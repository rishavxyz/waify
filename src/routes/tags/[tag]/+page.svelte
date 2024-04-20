<script lang="ts">
	import GetPost from '$lib/components/get-post.svelte';
	import ShowPost from '$lib/components/post.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<p class="my-5 text-lg font-semibold capitalize">{data.tag}</p>
<GetPost let:posts
	cache={data.cache}
	search={{
		is_nsfw: data.is_nsfw_enabled
		? null : data.is_force_nsfw_enabled
		? true : false,
		gif: data.is_gifs_enabled,
		limit: data.post_limit,
        included_tags: [data.tag]
	}}
	type="tag"
>
	<ShowPost {posts}
		blur_nsfw={data.is_blur_nsfw_enabled}
		loved_posts={data.loved_posts}
	/>
</GetPost>