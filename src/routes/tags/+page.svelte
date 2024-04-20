<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    const tags = {
        "versatile": [
            "maid",
            "waifu",
            "marin-kitagawa",
            "mori-calliope",
            "raiden-shogun",
            "oppai",
            "selfies",
            "uniform",
            "kamisato-ayaka"
        ],
        "nsfw": [
            "ass",
            "hentai",
            "milf",
            "oral",
            "paizuri",
            "ecchi",
            "ero"
        ]
    }
</script>

<p class="text-lg font-semibold my-5">Most searched tags</p>

<section class="grid grid-cols-2 gap-2">
    {#if data.is_nsfw_enabled}
        {#each tags['nsfw'] as tag}
            <a href="/tags/{tag}" class="btn capitalize">{tag}</a>
        {/each}
    {/if}
    {#each tags['versatile'] as tag}
        <a href="/tags/{tag}" class="btn capitalize">{tag}</a>
    {/each}
</section>

<p class="mt-12 text-sm text-center text-balance opacity-75">
    This page is currently under development. Expecting new UI and other changes.
</p>