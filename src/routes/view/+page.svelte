<script lang="ts">
  import { click_to_download } from '$lib/utils/click-to-download';
	import { delay } from '$lib/utils/delay';
	import type { PageData } from './$types';
  import { pretty_size } from '$lib/utils/pretty-size';
	import Icon from '$lib/components/icon.svelte';
  import ButtonLike from '$lib/components/btn-like.svelte';

  export let data: PageData

  const { post } = data

  let loading = false
  let downloaded: 'no' | 'yes' | 'failed' = 'no'

	$: is_liked = data.liked_posts.includes(+post.id)
	$: likes = is_liked ? +post.likes + 1 : +post.likes
</script>

{#snippet social_link(url, name)}
  {@const icon = name.toLowerCase()}

  <a href={url} target="_blank"
    rel="noopener noreferrer"
    class="text-2xl"
  >
    <Icon iconSet="simple-icons" {icon} />
  </a>
{/snippet}

<figure class="-m-4 lg:m-0">
  <img src={post.url} alt="a beautiful waifu" />
</figure>

<section class="relative mt-12 space-y-5 bg-base-100 p-4 rounded-box">
  <!-- like btn -->
  <ButtonLike class="btn btn-accent !text-2xl
    flex-row-reverse absolute -top-4 right-0 shadow"
    id={post.id} {is_liked} {likes}
  />

  <!-- artist -->
  <div class="flex flex-wrap items-end justify-between gap-5">
    <div class="flex-grow">
      <p class="text-xl">By {post.artist?.name ?? 'annonymous'}</p>
      <p class="mt-1 text-sm opacity-75">{post.date}</p>
    </div>

    {#if post.artist}
      <div class="flex gap-3 flex-wrap">
        {#if post.artist.patreon}
          {@render social_link(post.artist.patreon, 'Patreon')}
        {:else if post.artist.pixiv}
          {@render social_link(post.artist.pixiv, 'PixIV')}
        {:else if post.artist.twitter}
          {@render social_link(post.artist.twitter, 'Twitter')}
        {:else if post.artist.deviant_art}
          {@render social_link(post.artist.deviant_art, 'DeviantArt')}
        {/if}
      </div>
    {/if}
  </div>

  <!-- source -->
  <p>
    <!-- Original post&colon; -->
    <a href={post.source} target="_blank"
      rel="noopener noreferrer" class="capitalize link link-accent">
      <!-- {post.source.replace(/http.?\:\/\/|www\.|\..*/ig, '')} -->
      See original post
    </a>
  </p>

  <!-- tags -->
  <div class="space-x-3">
    {#each post.tags as tag}
      <a href="/" class="link no-underline">#{tag.name}</a>
    {/each}
  </div>

  <!-- stats -->
  <div class="flex flex-wrap items-center gap-4 divide-x divide-neutral/25">
    <div>
      <p class="text-sm opacity-75">Resolution</p>
      <p>{post.width}x{post.height}</p>
    </div>
    <div class="ps-5">
      <p class="text-sm opacity-75">Size</p>
      <p>{pretty_size(post.byte_size)}</p>
    </div>
    <button class="btn btn-circle text-2xl ms-auto"
      class:btn-primary={downloaded == 'no'}
      class:btn-success={downloaded == 'yes'}
      class:btn-error={downloaded == 'failed'}
      aria-label="Download image"
      use:click_to_download={
        { extension: post.extension
        , id: post.id
        , url: post.url
        }
      }
      on:start={async () => {
        downloaded = 'no'
        loading = true
      }}
      on:error={() => {
        downloaded = 'failed'
        alert(
          'Something went wrong\nCannot download at the moment'
        )
      }}
      on:end={async () => {
        loading = false
        downloaded = 'yes'
        await delay(8000)
        downloaded = 'no'
      }}
    >{#if loading}
        <span class="loading loading-spinner" />
      {:else if downloaded == 'yes'}
        <Icon icon="check-circle-1" />
      {:else}
        <Icon icon="upload" />
      {/if}
    </button>
  </div>

</section>
