<script lang="ts">
	import icons from '../icon.json'

  type Props = {
    name: keyof typeof icons,
    width?: string|number,
    height?: string|number,
    fill?: boolean,
    class?: string
  }

  let {
    width, 
    height,
    class: cls,
    name,
    fill
  }: Props = $props()
</script>

{#snippet svg(fill, width, height)}
  {@const icon = icons[name]}
  {@const type = fill ? 'fill' : 'body'}

  <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" class={cls} 
    width={width ?? icon.width}
    height={height ?? width ?? icon.height}
  >
    {@html icon[type]}
  </svg>
{/snippet}

{#if fill}
  {@render svg(true, width, height)}
{:else}
  {@render svg(false, width, height)}
{/if}