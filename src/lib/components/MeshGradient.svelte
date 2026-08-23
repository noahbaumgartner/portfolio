<script lang="ts">
    let { colors, seed = "", class: className }: { colors: string[]; seed?: string; class?: string } = $props();

    function hashSeed(str: string) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
        }
        return h >>> 0;
    }

    function mulberry32(a: number) {
        return function () {
            a |= 0;
            a = (a + 0x6d2b79f5) | 0;
            let t = Math.imul(a ^ (a >>> 15), 1 | a);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    const blobs = $derived.by(() => {
        const rand = mulberry32(hashSeed(seed || colors.join("")));
        return colors.map((color, i) => ({
            color,
            x: 10 + rand() * 80,
            y: 10 + rand() * 80,
            size: 70 + rand() * 60,
            blur: rand() * 20,
            z: i
        }));
    });
</script>

<div class={["mesh-gradient", className]} style="background-color: {colors[0]}">
    {#each blobs as blob (blob.z)}
        <div
            class="mesh-blob"
            style="left: {blob.x}%; top: {blob.y}%; width: {blob.size}%; height: {blob.size}%; background-color: {blob.color}; filter: blur({blob.blur}px);"
        ></div>
    {/each}
</div>

<style>
    .mesh-gradient {
        position: relative;
        overflow: hidden;
    }

    .mesh-blob {
        position: absolute;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
</style>
