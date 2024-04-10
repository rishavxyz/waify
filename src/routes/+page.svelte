<script lang="ts">
	import Icon from '$lib/components/icon.svelte';
	import lazy_image_loading from '$lib/utils/lazy-image-loading'

	export let data
</script>

{#snippet post(image)}
	{@const params = new URLSearchParams(
		{ url: image.url
		, source: image.source
		,	artist: JSON.stringify(image.artist)
		,	date: image.uploaded_at
		, tags: JSON.stringify(image.tags)
		})
	}

	<a href="/{image.image_id}?{params}">
		<figure class="h-52 lg:h-80" style:background-color={image.dominant_color}
			use:lazy_image_loading={{ src: image.url }}
			on:image_loaded={node => node.target.classList.remove('h-52', 'lg:h-80')}
		/>
	</a>

	<div class="card-body !p-0 !pt-4">
		<div class="card-actions justify-between">

			<div class="flex flex-wrap gap-2">
				{#each image.tags.slice(0,2) as tag}
					<span class="badge badge-sm">{tag.name}</span>
				{/each}
			</div>

			<button class="btn btn-ghost btn-xs" aria-label="add to favorite">
				<Icon icon="heart" width="1.2em" />
			</button>

		</div>
	</div>
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