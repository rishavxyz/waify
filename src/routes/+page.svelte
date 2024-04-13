<script lang="ts">
	import PostCard from '$lib/components/post.svelte';
	import type {Post} from '$lib/types.js'

	import { onMount } from 'svelte';

	export let data

	let posts = [] as Post[]
	
	onMount(() => {
		if (typeof localStorage == 'undefined')
		throw Error('ERROR: LocalStorage is not defined')

		if (data.cache == 'hit') {
			const cached_data = JSON.parse(
				localStorage.getItem('posts') ?? 'null'
			) as { posts: Post[] } | null

			if (cached_data) posts = cached_data.posts
		}
		else if (data.cache == 'miss') {
			localStorage.setItem('posts', JSON.stringify(
				{ posts: data.posts }
			))
		}
	})
</script>

{#if !data.posts && posts.length == 0}
	<PostCard placeholder animate posts={Array(5)}
		blur_nsfw={false} liked_posts={[]}
	/>
{:else}
	<PostCard
		blur_nsfw={data.is_blur_nsfw_enabled}
		liked_posts={data.liked_posts}
		posts={data.posts ?? posts}
	/>
{/if}