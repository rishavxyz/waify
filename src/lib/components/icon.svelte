<script lang="ts">
  type Props = 
  { iconSet?: string
  ; icon: string
  ; fill?: boolean
  ; fillType?: 'fill' | 'duotone'
  ; width?: string
  ; height?: string
  ; wrap_with?: string
  ; class?: string
  ; label?: string
  ; restProps?: Record<string, string>
  }

  let
  { iconSet = 'iconamoon'
  , icon: _icon
  , fill = false
  , fillType = 'fill'
  , width = '1em'
  , height = width
  }: Props = $props()

  let icon = $derived(
    fill
    ? `${iconSet}:${_icon}-${fillType}`
    : `${iconSet}:${_icon}`
  )
</script>

<iconify-icon {icon} {width} {height} />