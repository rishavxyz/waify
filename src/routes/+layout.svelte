<script lang="ts">
  import '../app.pcss'

  import Icon from '$lib/components/ico.svelte';
	import { fly } from 'svelte/transition';
	import type { IconName } from '$lib/types';
  import waify from '$lib/waify.jpg'
	import { title } from '$lib/writable/title';
  
  export let data

  const links: Array<[string, string, IconName]> = [
    ['Home', '/', 'home'],
    ['Tags', '/tags', 'tags'],
    ['Profile', '/profile', 'user'],
  ]
</script>

<svelte:head>
  <title>{`Waify | ${$title}`}</title>
  <meta name="title" content={`Waify | ${$title}`} />
  <meta name="description" content="Waify is a anime waifu browsing platform, curated pictures uploaded by users, provided by waifu.im." />
  <meta property="og:description" content="Waify is a anime waifu browsing platform, curated pictures uploaded by users, provided by waifu.im." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://waify.vercel.app/" />
  <meta property="og:site_name" content="Waify" />
  <meta property="og:image" content={waify} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="400" />
  <meta property="og:image:height" content="300" />
  <meta property="og:image:alt" content="A beautiful waifu with green eyes under a tree" />
</svelte:head>

<nav class="fixed bottom-4 right-4 z-50">
  <ul class="space-x-1 bg-base-200 shadow
    menu menu-horizontal rounded-box"
  >
    {#each links as [name, href, icon] (name)}
      {@const active = data.url == href}

      <li>
        <a {href} aria-label={name} title={name} class:active>
          <Icon name={icon} width={20} fill={active} />
        </a>
      </li>
    {/each}
  </ul>
</nav>

{#key data.url}
  <main class="max-w-4xl mx-auto p-4 mb-16 min-h-screen"
    in:fly={{ delay: 400, duration: 400, y: 50 }}
    out:fly={{ duration: 400, y: -50 }}
  >
    <slot />
  </main>
{/key}
