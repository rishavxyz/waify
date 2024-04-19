<script lang="ts">
	import { enhance } from '$app/forms';
	import { backOut, elasticOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import Icon from './ico.svelte';
	import type { IconName } from '$lib/types';
	import { twMerge } from 'tailwind-merge';
  
  type Props =
  { class?: string
  ; class_form?: string
  ; icon?: IconName
  ; icon_width?: number|string
  ; id: number
  ; is_loved: boolean
  ; loves: number
  ; transition?: any
  ; y?: number
  }
  let {
    class: cls,
    class_form = 'mt-2 self-end',
    icon = 'heart',
    icon_width = 20,
    id,
    is_loved,
    loves,
    y = 10
  }: Props = $props()
</script>

{#snippet button(liked, loves, y, icon_transition_name)}
	{@const options = { easing: backOut, duration: 500 }}
  {@const transition = icon_transition_name == 'fly' ? fly : scale}
  {@const transition_options = icon_transition_name == 'fly'
    ? { x: -y, easing: elasticOut, duration: 1500 }
    : { ...options }
  }

	<button class={twMerge('text-lg flex items-center gap-x-2', cls)}>
		<span class="text-base" in:fly={{ y, ...options }}>{loves}</span>
		<span class="grid place-items-center" in:transition={transition_options}>
			<Icon name={icon} width={icon_width} fill={liked} />
		</span>
	</button>
{/snippet}

<form action="/?/loved_post&id={id}" 
  method="post" class={class_form} use:enhance
>
  {#if is_loved}
    {@render button(true, loves, y, 'scale')}
  {:else}
    {@render button(false, loves, -y, 'fly')}
  {/if}
</form>