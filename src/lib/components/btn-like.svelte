<script lang="ts">
	import { enhance } from '$app/forms';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Icon from './icon.svelte';
  
  type Props =
  { class?: string
  ; icon?: string
  ; id: string
  ; is_liked: boolean
  ; likes: number
  ; transition?: any
  ; y?: number
  }
  let {
    class: cls = '',
    icon = 'heart',
    id,
    is_liked,
    likes,
    transition = fly,
    y = 10
  }: Props = $props()
</script>

{#snippet button(liked, likes, icon_anim, y)}
	{@const options = { easing: backOut, duration: 500 }}

	<button class="text-lg flex items-center gap-x-2 {cls}">
		<span class="text-base" in:fly={{ y, ...options }}>{likes}</span>
		<span class="grid place-items-center" in:icon_anim={options}>
			<Icon {icon} fill={liked} />
		</span>
	</button>
{/snippet}

<form action="/?/likePost&id={id}" 
  method="post" class="mt-2 ms-auto" use:enhance
>
  {#if is_liked}
    {@render button(true, likes, transition, y)}
  {:else}
    {@render button(false, likes, transition, y)}
  {/if}
</form>