<script lang="ts">
    let { title }: { title: string } = $props();
</script>

<section class="title-wrapper page-padding">
    <div class="title-box">
        <h1 class="title">{title}</h1>
    </div>
</section>

<style>
    .title-box {
        margin-inline: auto;
        max-width: 1280px;
        padding: 48px 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title {
        text-align: center;
    }

    @media (min-width: 640px) {
        .title-box {
            padding: 64px 24px;
        }
    }
</style>
