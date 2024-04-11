<script lang="ts">
  import '../app.pcss'
  import 'iconify-icon'

	import { page } from '$app/stores';
  import Icon from '$lib/components/icon.svelte';

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
      {@const active = $page.url.pathname == href}

      <li>
        <a {href} aria-label={name} class:active>
          <Icon {icon} fill={active} />
        </a>
      </li>
    {/each}
  </ul>
</nav>

<main class="max-w-4xl mx-auto p-4 mb-16 mb-40">
  <slot />
</main>
