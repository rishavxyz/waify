<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageServerData } from "./$types";


    export let data:PageServerData

    $: limit_value = data.settings.post_limit ?? 20
    const nsfw = false
    const gifs = false
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

    <!-- stat -->
    <!-- <div class="mx-auto flex gap-4 items-center">
        <span class="text-primary" aria-label="certified badge">
            <Icon icon="certificate-badge" fill />
        </span>
    </div> -->

    <div class="divider">
        <p class="font-semibold">Settings</p>
    </div>

    <form action="?/update" method="post" class="space-y-5 form-control"
        use:enhance
    >
        <!-- nsfw -->
        <label class="label gap-x-4 cursor-pointer">
            <div class="max-w-64 space-y-2 text-balance">
                <p class="font-semibold">Enable NSFW</p>
                <p class="text-xs opacity-75">
                    Enabling this you are confirming you are over 18 years old.
                </p>
            </div> 
            <input type="checkbox" class="toggle" name="enable-nsfw"
                checked={data.settings.is_nsfw_enabled}
            />
        </label>
        <!-- gifs -->
        <label class="label gapx-x-4 cursor-pointer">
            <div class="max-w-64 space-y-2 text-balance">
                <p class="font-semibold">Force show GIFs</p>
                <p class="text-xs opacity-75">
                    Show GIFs more often along with images.
                </p>
            </div> 
            <input type="checkbox" class="toggle" name="enable-gifs"
                checked={data.settings.is_gifs_enabled}
            />
        </label>
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

        <button class="w-full btn">Save changes</button>
    </form>
</section>
