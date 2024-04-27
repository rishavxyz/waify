<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    const _tags = [
        {
            name: 'waifu',
            desc: 'A female anime/manga character'
        },
        {
            name: 'maid',
            desc: 'Cute womans or girl employed to do domestic work in their working uniform'
        },
        {
            name: 'oppai',
            desc: 'Girls with large breasts'
        },
        {
            name: 'selfies',
            desc: 'A photo-like image of a waifu'
        },
        {
            name: 'uniform',
            desc: 'Girls wearing any kind of uniform, cosplay etc...'
        },
        {
            name: 'marin kitagawa',
            desc: 'One of two main protagonists (alongside Wakana Gojo) in the anime and manga series My Dress-Up Darling'
        },
        {
            name: 'mori calliope',
            desc: 'An English Virtual YouTuber (VTuber) associated with hololive as part of its first-generation English branch of Vtubers'
        },
        {
            name: 'raiden-shogun',
            desc: 'Genshin Impact\'s Raiden Shogun is a fierce lady in the Genshin ranks'
        },
        {
            name: 'kamisato-ayaka',
            desc: 'A playable Cryo character in Genshin Impact'
        }
    ]
</script>

<p class="text-lg font-semibold mb-5">Most searched tags</p>

<section class="grid gap-4 lg:grid-cols-2">
    {#each _tags as tag}
        {@const href = '/tags/' + tag.name.replace(' ', '-')}

        <a {href} title={tag.name}>
            <div class="card bg-gradient-to-br from-pink-800 to-primary/50 aspect-video">
                <div class="card-body">
                    <p class="card-title capitalize">{tag.name}</p>
                    <p class="text-balance opacity-75">{tag.desc}.</p>
                </div>
            </div>
        </a>
    {/each}
</section>

<p class="mt-12 text-sm text-center text-balance opacity-75">
    This page is currently under development. Expecting new UI and other changes.
</p>