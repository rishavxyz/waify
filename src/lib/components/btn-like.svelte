<script lang="ts">
	import { enhance } from '$app/forms';
	import { backOut, elasticOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import Icon from './icon.svelte';
  
  type Props =
  { class?: string
  ; class_form?: string
  ; icon?: string
  ; id: number
  ; is_liked: boolean
  ; likes: number
  ; transition?: any
  ; y?: number
  }
  let {
    class: cls,
    class_form = 'mt-2 self-end',
    icon = 'heart',
    id,
    is_liked,
    likes,
    y = 10
  }: Props = $props()
</script>

{#snippet button(liked, likes, y, icon_transition_name)}
	{@const options = { easing: backOut, duration: 500 }}
  {@const transition = icon_transition_name == 'fly' ? fly : scale}
  {@const transition_options = icon_transition_name == 'fly'
  ? { x: -y, easing: elasticOut, duration: 1500 }
  : { ...options }
  }

	<button class="text-lg flex items-center gap-x-2 {cls}">
		<span class="text-base" in:fly={{ y, ...options }}>{likes}</span>
		<span class="grid place-items-center" in:transition={transition_options}>
			<Icon {icon} fill={liked} />
		</span>
	</button>
{/snippet}

<form action="/?/likePost&id={id}" 
  method="post" class={class_form} use:enhance
>
  {#if is_liked}
    {@render button(true, likes, y, 'scale')}
  {:else}
    {@render button(false, likes, -y, 'fly')}
  {/if}
</form>