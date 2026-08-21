<script lang="ts">
    import { CalendarIcon, GithubIcon, LinkIcon } from "@lucide/svelte";
    import Tag from "../ui/Tag.svelte";

    let { post } = $props();
</script>

<section class="post-title-wrapper page-padding">
    <div class="post-title-box">
        <h1 class="post-title">{post.title}</h1>
        <p class="post-description">{post.description}</p>

        <div class="post-tags">
            <Tag>
                <CalendarIcon />
                {post.period}
            </Tag>
            {#if post.url}
                <Tag href={post.url}>
                    <LinkIcon />
                    {post.url}
                </Tag>
            {/if}
            {#if post.github}
                <Tag href={post.github}>
                    <GithubIcon />
                    Code
                </Tag>
            {/if}
            {#each post.tags as tag}
                <Tag>{tag}</Tag>
            {/each}
        </div>
    </div>
</section>

<style>
    .post-title-box {
        margin-inline: auto;
        max-width: 1280px;
        padding: 48px 24px;
        background-color: var(--color-surface);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .post-description {
        max-width: 640px;
        color: var(--color-text-secondary);
    }

    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 8px;
    }

    @media (min-width: 640px) {
        .post-title-box {
            padding: 64px 56px;
        }
    }
</style>
