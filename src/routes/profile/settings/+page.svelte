<script lang="ts">
	import { enhance } from "$app/forms";
	import { delay } from "$lib/utils/delay";
	import { slide } from "svelte/transition";

    export let data;
    export let form

    $: limit_value = data.options.post_limit
    $: changes_saved = form?.success

    $: switches = [
        { title: 'Enable NSFW'
        , desc: `Enabling this you are confirming that you are over 18 years old. May contain aggressive or abusing content.`
        , input: { name: 'enable-nsfw', on: data.options.is_nsfw_enabled }
        , disabled: false
        },
        { title: 'Blur NSFW images'
        , desc: `Blur all NSFW tagged images only on the feed. Vsible on other pages.`
        , input: { name: 'blur-nsfw', on: data.options.is_blur_nsfw_enabled }
        , disabled: !data.options.is_nsfw_enabled
        },
        { title: 'Only NSFW mode'
        , desc: `Only show NSFW tagged images. Some non-NSFW images may still be visible.`
        , input: { name: 'force-nsfw', on: data.options.is_force_nsfw_enabled }
        , disabled: !data.options.is_nsfw_enabled
        },
        { title: 'Force GIFs'
        , desc: `Mainly show GIFs along with some still images.`
        , input: { name: 'enable-gifs', on: data.options.is_gifs_enabled }
        , disabled: false
        },
    ]
</script>
    
    <form action="?/update" method="post"
        class="space-y-5 form-control" use:enhance
    >
        {#each switches as { title, desc, input, disabled }, i (i)}
            {#if !disabled}
                <label transition:slide class="label gap-x-4 cursor-pointer">
                    <div class="w-64 lg:max-w-sm space-y-2 text-balance">
                        <p class="font-semibold">{title}</p>
                        <p class="text-sm opacity-75">{desc}</p>
                    </div> 
                    <input type="checkbox" class="toggle"
                        name={input.name} checked={input.on}
                    />
                </label>
            {/if}
        {/each}
        <!-- post limit -->
        <label>
            <p class="mb-3 font-semibold">Maximum post limit</p>
            <input type="range" min="10" max="30" step="5"
                bind:value={limit_value} class="range" name="limit"
            />
            <div class="w-full flex justify-between text-xs px-1">
                {#each Array(5) as _, i}
                    {@const value = 10 + 5 * i}
                    <div class="flex flex-col items-center">
                        <div class="p-0.5 rounded-full mb-1"
                            class:bg-base-content={value == limit_value}
                        />
                        <span>{value}</span>
                    </div>
                {/each}
            </div>
        </label>

        <button class="w-full btn
            btn-{changes_saved ? 'success' : 'primary'}"
            on:click={async () => {
                await delay(5000)
                changes_saved = false
            }}
        >{#if changes_saved}
            Chnages saved
        {:else}
            Save changes
        {/if}
        </button>
    </form>