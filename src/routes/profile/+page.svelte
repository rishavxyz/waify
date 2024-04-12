<script lang="ts">
	import { enhance } from "$app/forms";
	import { delay } from "$lib/utils/delay";
	import type { PageServerData } from "./$types";


    export let data: PageServerData
    export let form

    $: limit_value = data.settings.post_limit
    $: changes_saved = form?.success
    
    $: switches = [
        { title: 'Enable NSFW'
        , desc: `Enabling this you are confirming that you are over 18 years old. May contain aggressive or abusing content.`
        , input: { name: 'enable-nsfw', on: data.settings.is_nsfw_enabled }
        , disabled: false
        },
        { title: 'Blur NSFW images'
        , desc: `Blur all NSFW tagged images only on the feed. Vsible on other pages.`
        , input: { name: 'blur-nsfw', on: data.settings.is_blur_nsfw_enabled }
        , disabled: !data.settings.is_nsfw_enabled
        },
        { title: 'Enable GIFs'
        , desc: `You will see GIFs more often along with images.`
        , input: { name: 'enable-gifs', on: data.settings.is_gifs_enabled }
        , disabled: false
        },
    ]
</script>

<section class="space-y-5">
    <div>
        <h1 class="text-3xl font-semibold">Waify</h1>
        <p class="mt-2 opacity-75">Let your wet dreams come true</p>
    </div>
    
    <div class="divider">
        <p class="font-semibold">Account</p>
    </div>

    <div class="flex items-center gap-4">
        <div class="avatar placeholder">
            <div class="
                bg-gradient-to-br from-primary/75 to-secondary/75
                text-neutral-content rounded-full w-12"
            >
                <span class="text-xl font-semibold">👋</span>
            </div>
        </div> 
        <div class="space-y-0.5">
            <p class="text-lg font-semibold">Hello, Rishav!</p>
            <p class="text-sm opacity-75">How are you doing my friend?</p>
        </div>
    </div>

    <div class="divider">
        <p class="font-semibold">Settings</p>
    </div>

    <form action="?/update" method="post"
        class="space-y-5 form-control" use:enhance
    >
        {#each switches as { title, desc, input, disabled }, i (i)}
            <label class="label gap-x-4 cursor-pointer"
                class:opacity-50={disabled}
            >
                <div class="w-64 lg:max-w-sm space-y-2 text-balance">
                    <p class="font-semibold">{title}</p>
                    <p class="text-sm opacity-75">{desc}</p>
                </div> 
                <input type="checkbox" class="toggle" {disabled}
                    name={input.name} checked={input.on}
                />
            </label>
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
</section>
