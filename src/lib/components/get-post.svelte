<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { api_url } from '$lib';
	import type {Post} from '$lib/types.js'
	import { from_now } from '$lib/utils/from-now';
	import { createEventDispatcher } from 'svelte';
	import type { Action } from 'svelte/action';

	let posts: Post[] | null = $state(null)

	type Options = {
		cache: 'hit'|'miss',
		search: any,
		type: 'posts'|'wide'|'related'|'saved'
	}

	const get_posts: Action<
		HTMLElement, Options, {
			'on:loading': (e: Event)=> void,
			'on:loaded': (e: CustomEvent)=> void,
			'on:error': (e: CustomEvent)=> void,
			'on:end': (e: Event)=> void
		}
	> = (node, options) => {
		/** TODO:
		 * I need a fallback, instead of showing
		 * a stupid error
		*/
		if ( typeof localStorage == 'undefined'
			|| typeof sessionStorage == 'undefined'
		) goto('/error?reason=' +
			encodeURI('This site needs access to browser storage')
		)

		function fetch_and_serve() {
			const search_params = new URLSearchParams()
			const params = options.search as Record<string, any|any[]>

			for (let key in params) {
				if (Array.isArray(params[key])) {
					params[key].forEach((value: string) => // not string but auto-converted
						search_params.append(key, value)
					)
				} else search_params.set(key, params[key])
			}

			const is_cached = options.cache == 'hit'

			fetch(api_url + '?' + search_params, {
				cache: is_cached ? 'force-cache' : 'default'
			})
			.then(res => res.json())
			.then((data: { images: any[] }) => {
				const _posts: Post[] = data.images.map(post => {
					const {
						byte_size, uploaded_at, dominant_color, extension, height,
						image_id, is_nsfw, favorites, source, tags, url, width,
						artist
					} = post

					return { // from_now() so it will take 13 chars, SAVES SPACE
						byte_size, date: from_now(uploaded_at), dominant_color, extension, height,
						image_id, is_nsfw, loves: favorites, source, tags, url, width,
						artist, loved_at: null
					}
				})
				posts = _posts
				node.dispatchEvent(new CustomEvent('loaded', { detail: _posts }))
				localStorage.setItem(options.type, JSON.stringify(_posts ?? null))
			})
			.catch(error =>
				node.dispatchEvent(new CustomEvent('error', { detail: error }))
			)
			.finally(() =>
				node.dispatchEvent(new Event('end'))
			)
		}

		node.dispatchEvent(new Event('loading'))

		const cached_data: Post[] | null = JSON.parse(
			localStorage.getItem(options.type) ?? 'null'
		)
		const ids: number[] = options.search.included_files

		if (options.cache == 'hit' && cached_data) {
			/**
			 * Below validates if the liked_post cookie has
			 * been changed and the old data is still stored
			 * in the localStorage.
			 * 
			 * REASON: Data are stored for 10 minutes and
			 * within 10 minutes if the user likes/dislikes
			 * one or multiple post/s then we don't want to
			 * return the old saved data as there is a chnage.
			*/
			if (options.type == 'saved' && cached_data.length != ids.length) {
				localStorage.removeItem('saved')
				fetch_and_serve()
			} else if (options.type == 'related') {
				/**
				 * This check is because if the image_id changes
				 * then we don't want to load from cache
				 */
				const related_id = localStorage.getItem('related-id')

				if (related_id != $page.params.image_id) {
					localStorage.setItem('related-id', $page.params.image_id)
					fetch_and_serve()
				} else {
					posts = cached_data
					node.dispatchEvent(new CustomEvent('loaded',{ detail:cached_data }))
				}
			} else {
				posts = cached_data
				node.dispatchEvent(new CustomEvent('loaded',{ detail:cached_data }))
			}
		} else {
			if (cached_data) {
				/**
					* because cookie will be deleted after
					* 10 min but storage data won't 
					*/ 
				localStorage.removeItem(options.type)
			}
			if (options.type == 'related') {
				localStorage.setItem('related-id', $page.params.image_id)
			}
			fetch_and_serve()
		}
	}

  let {
    cache,
		type,
		search,
  }: Options = $props()

	/**
	 * createEventDispatcher is deprecated in Runes
	 * but still it gives great types and magical
	 * syntactic sugar event listeners
	 */
	const dispatch = createEventDispatcher()
</script>

<div aria-hidden="true"
	use:get_posts={{
		cache, search, type
	}}
	on:loading={() => dispatch('loading')}
	on:loaded={(e) => dispatch('loaded', e.detail)}
  on:error={(e: any) => dispatch('error', e)}
	on:end={() => dispatch('end')}
/>

<slot {posts} />
