<script lang="ts">
	import Icon from '$lib/components/icon.svelte';
	import { delay } from '$lib/utils/delay';
	import type { PageData } from './$types';

  export let data: PageData

  const { metadata } = data

  let loading = false
  let downloaded: 'no' | 'yes' | 'failed' = 'no'
</script>

{#snippet social_link(url, name)}
  <a href={url} target="_blank"
    rel="noopener noreferrer"
    class="btn btn-xs btn-neutral capitalize"
  >
    {name}
  </a>
{/snippet}

<figure class="-m-4 lg:m-0">
  <img src={metadata.url} alt="a beautiful waifu" />
</figure>

<section class="mt-12 relative bg-base-200 p-4 rounded-box">
  <!-- artist -->
  <div class="space-y-1">
    <p class="text-xl">By {metadata.artist?.name ?? 'annonymous'}</p>
    <p class="text-sm opacity-75">On {metadata.date}</p>

    {#if metadata.artist}
      <p class="!mt-5">Follow atrist on</p>
      <div>
        {#if metadata.artist.patreon}
          {@render social_link(metadata.artist.patreon, 'patreon')}
        {:else if metadata.artist.pixiv}
          {@render social_link(metadata.artist.pixiv, 'pixIV')}
        {:else if metadata.artist.twitter}
          {@render social_link(metadata.artist.twitter, 'twitter')}
        {:else if metadata.artist.deviant_art}
          {@render social_link(metadata.artist.deviant_art, 'deviant art')}
        {/if}
      </div>
    {/if}
  </div>

  <!-- tags -->
  <p class="mt-5">Tags</p>
  <div class="mt-2 space-x-2">
    {#each metadata.tags as tag, i}
      {#if i > 0}&comma;{/if}
      <a href="/" class="link">#{tag.name}</a>
    {/each}
  </div>

  <button class="btn btn-square text-2xl absolute -top-4 right-0"
    class:btn-primary={downloaded == 'no'}
    class:btn-success={downloaded == 'yes'}
    class:btn-error={downloaded == 'failed'}
    aria-label="Download image"
    on:click={() => {
      loading = true
      fetch(metadata.url)
      .then(res => res.blob())
      .then(async blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'waify-'.concat(
          metadata.id, metadata.extension
        )
        document.body.appendChild(a)
        await delay(2000)
        a.click()
        document.body.removeChild(a)
        downloaded = 'yes'
      })
      .catch(()=> {
        alert('Something went wrong')
        downloaded = 'failed'
      })
      .finally(async ()=> {
        loading = false
        await delay(5000)
        downloaded = 'no'
      })
    }}
  >{#if loading}
      <span class="loading loading-spinner" />
    {:else if downloaded == 'yes'}
      <Icon icon="check-circle-1" />
    {:else}
      <Icon icon="upload" />
    {/if}
  </button>
</section>
