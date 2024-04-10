<script lang="ts">
  import { LinkPreview } from 'bits-ui'

  export let data

  const { metadata } = data
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
    <p class="text-sm text-neutral-content/60">On {metadata.date}</p>

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
  <div class="mt-2 flex flex-wrap gap-4">
    {#each metadata.tags as tag}
      <LinkPreview.Root>
        <LinkPreview.Trigger href="/#{tag.name}"
          class="btn btn-xs btn-neutral"
        >
          {tag.name}
        </LinkPreview.Trigger>
        <LinkPreview.Content sideOffset={8}
          class="w-[35ch] rounded-box bg-base-100 p-4 pt-2"
        >
          {#if tag.is_nsfw}
            <p class="badge badge-sm badge-error badge-outline"
            >NSFW</p>
          {/if}
          <p class="mt-1 text-sm capitalize">
            <span class="font-semibold">{tag.name}:</span>
            {tag.description}
          </p>
        </LinkPreview.Content>
      </LinkPreview.Root>
    {/each}
  </div>

  <button class="btn btn-square btn-primary text-2xl
    absolute -top-4 right-0"
    aria-label="add to favorite"
  >
    <iconify-icon icon="iconamoon:heart" />
  </button>
</section>
