<script lang="ts">
  import '../app.pcss'
  import 'iconify-icon'

  import Icon from '$lib/components/icon.svelte';
	import { fly } from 'svelte/transition';

  export let data

  const links = [
    ['Home', '/', 'home'],
    ['Profile', '/profile', 'profile']
  ]
</script>

<nav class="fixed bottom-4 right-4 z-50">
  <ul class="space-x-1.5 bg-base-200 shadow
    menu menu-horizontal rounded-box [&>li>a]:text-lg"
  >
    {#each links as [name, href, icon]}
      {@const active = data.url == href}

      <li>
        <a {href} aria-label={name} class:active>
          <Icon {icon} fill={active} />
        </a>
      </li>
    {/each}
  </ul>
</nav>

{#key data.url}
<main class="max-w-4xl mx-auto p-4 mb-40 min-h-screen"
  in:fly={{ delay: 400, duration: 400, y: 50 }}
  out:fly={{ duration: 400, y: -50 }}
>
  <slot />
</main>
{/key}
