<script lang="ts">
	import { goto } from '$app/navigation';
	import { api_url } from '$lib';
	import type {Post} from '$lib/types.js'
	import { createEventDispatcher } from 'svelte';
	import type { Action } from 'svelte/action';

	let posts: Post[] = $state([])

	const get_posts: Action<
		HTMLElement, {
			cache: 'hit'|'miss',
			search: any,
			tags?: string[],
			ids?: string[],
			type: 'posts'|'wide'|'related'|'saved'
		}, {
			'on:loading': (e: Event)=> void,
			'on:loaded': (e: CustomEvent)=> void,
			'on:error': (e: CustomEvent)=> void,
			'on:end': (e: Event)=> void
		}
	> = (node, options) => {
		
		if ( typeof localStorage == 'undefined'
			|| typeof sessionStorage == 'undefined'
		) goto('/error?' + new URLSearchParams({
			reason: 'This site need access to browser storage.'
		}))

		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				node.dispatchEvent(new Event('loading'))

				const cached_data: Post[] | null = JSON.parse(
					localStorage.getItem(options.type) ?? 'null'
				)

				if (options.cache == 'hit' && cached_data) {
					posts = cached_data
					node.dispatchEvent(new CustomEvent('loaded', { detail: cached_data }))
				} else {
					if (cached_data) {
						// because cookie will be deleted after 10 min
						// but storage data won't 
						localStorage.removeItem(options.type)
					}
					const search_params = new URLSearchParams(options.search)

					options.tags?.forEach(tag => search_params.append('included_tags', tag))
					options.ids?.forEach(id => search_params.append('included_files', id))

					console.log(search_params.toString())

					fetch(api_url + '?' + search_params)
					.then(res => res.json())
					.then((data: { images: Post[] }) => {
						posts = data.images
						node.dispatchEvent(new CustomEvent('loaded', { detail: data.images }))
						localStorage.setItem(options.type, JSON.stringify(data.images ?? null))
					})
					.catch(error =>
						node.dispatchEvent(new CustomEvent('error', { detail: error }))
					)
					.finally(() =>
						node.dispatchEvent(new Event('end'))
					)
				}
			} else return
		})
		observer.observe(node)

		return {
			destroy: ()=> observer.disconnect()
		}
	}

  let {
    cache,
		class: cls,
		type,
		search,
		tags,
		ids
  }:{
		cache: 'hit'|'miss';
		search: Record<string, unknown>|string;
		tags?: string[],
		ids?: any[],
		type: 'posts'|'wide'|'related'|'saved';
		class?: string;
  } = $props()

	const dispatch = createEventDispatcher()
</script>

<div class={cls} use:get_posts={{
		cache, search, type, tags, ids
	}}
	on:loading={() => dispatch('loading')}
	on:loaded={(e) => dispatch('loaded', e.detail)}
  on:error={(e: any) => dispatch('error', e)}
	on:end={() => dispatch('end')}
>
	<slot {posts} />
</div>

