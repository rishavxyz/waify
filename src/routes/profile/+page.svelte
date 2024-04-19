<script lang="ts">
    import GetPost from "$lib/components/get-post.svelte";
	import ShowPost from "$lib/components/post.svelte";

    export let data
</script>

<section class="space-y-5">
    <div>
        <h1 class="text-3xl font-semibold">Waify</h1>
        <p class="mt-2 opacity-75">Let your wet dreams come true</p>
    </div>
    
    <div class="divider" />

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
            <div class="!mt-2 flex gap-3 opacity-75">
                <a href="#_">Edit</a>
                <a href="/profile/settings">Settings</a>
            </div>
        </div>
    </div>

    {#if data.loved_posts.length > 0}
        <p class="text-lg font-semibold mt-5">Posts you loved</p>
        <GetPost let:posts
            type="saved"
            search={{
                included_files: data.loved_posts.map(post => post.id),
                is_nsfw: null
            }}
            cache={data.cache}
        >
            <ShowPost type="saved" {posts} loved_posts={data.loved_posts}
                blur_nsfw={data.is_blur_nsfw_enabled}
            />
        </GetPost>
    {:else}
        <div class="h-[50vh] grid place-items-center">
            <p class="text-center opacity-75">Liked posts will show up here</p>
        </div>
    {/if}

</section>
