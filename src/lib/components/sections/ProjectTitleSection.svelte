<script lang="ts">
    import { CalendarIcon, GithubIcon, LinkIcon } from "@lucide/svelte";
    import Tag from "../ui/Tag.svelte";

    let { project } = $props();
</script>

<section class="project-title-wrapper page-padding">
    <div class="project-title-box">
        <h1 class="project-title">{project.title}</h1>
        <p class="project-description">{project.description}</p>

        <div class="project-tags">
            <Tag>
                <CalendarIcon />
                {project.period}
            </Tag>
            {#if project.url}
                <Tag href={project.url}>
                    <LinkIcon />
                    {project.url}
                </Tag>
            {/if}
            {#if project.github}
                <Tag href={project.github}>
                    <GithubIcon />
                    Code
                </Tag>
            {/if}
            {#each project.tags as tag}
                <Tag>{tag}</Tag>
            {/each}
        </div>
    </div>
</section>

<style>
    .project-title-box {
        margin-inline: auto;
        max-width: 1280px;
        padding: 48px 24px;
        background-color: #f5f5f5;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .project-description {
        max-width: 640px;
        color: #404040;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 8px;
    }

    @media (min-width: 640px) {
        .project-title-box {
            padding: 64px 56px;
        }
    }
</style>
