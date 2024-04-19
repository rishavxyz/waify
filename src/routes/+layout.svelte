<script lang="ts">
  import '../app.pcss'

  import Icon from '$lib/components/ico.svelte';
	import { fly, scale } from 'svelte/transition';
	import type { IconName } from '$lib/types';

  export let data

  const links: Array<[string, string, IconName]> = [
    ['Home', '/', 'home'],
    ['Tags', '/tags', 'tags'],
    ['Profile', '/profile', 'user'],
  ]
</script>

<nav class="fixed bottom-4 right-4 z-50">
  <ul class="space-x-1 bg-base-200 shadow
    menu menu-horizontal rounded-box"
  >
    {#each links as [name, href, icon] (name)}
      {@const active = data.url == href}

      <li>
        <a {href} aria-label={name} class:active>
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
