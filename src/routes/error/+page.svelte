<script>
	import { page } from '$app/stores';

  const { data } = $props()
</script>

<div class="grid place-items-center h-full p-4">
  <div class="space-y-2">{$page.url.searchParams.get('reason')}</div>
</div>