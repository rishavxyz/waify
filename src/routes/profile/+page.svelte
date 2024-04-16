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

    <p class="text-lg font-semibold mt-5">Your saved posts</p>
    <GetPost let:posts
        type="saved"
        search={{
            included_files: data.options.liked_posts,
            is_nsfw: null
        }}
        cache={data.options.cache}
    >
        <ShowPost {posts} liked_posts={data.options.liked_posts} blur_nsfw={data.options.is_blur_nsfw_enabled} />
    </GetPost>

</section>
