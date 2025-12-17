<script lang="ts">
    let { name, variant = "light", position }: { name: string; variant?: "light" | "dark"; position: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' } = $props();
    
    const positionClasses = {
        'top-left': 'left-3 top-2',
        'top-right': 'right-3 top-2',
        'bottom-right': 'right-3 bottom-2',
        'bottom-left': 'left-3 bottom-2'
    };
</script>

<span class={["absolute text-xs text-neutral-300 font-[Source_Code_Pro]", positionClasses[position] || 'right-3 bottom-2', variant === 'light' ? 'text-neutral-300' : 'text-neutral-500']}>
    {name}
</span>