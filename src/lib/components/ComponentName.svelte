<script lang="ts">
    let { name, position }: { name: string; position: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' } = $props();
    
    const positionClasses = {
        'top-left': 'left-3 top-2',
        'top-right': 'right-3 top-2',
        'bottom-right': 'right-3 bottom-2',
        'bottom-left': 'left-3 bottom-2'
    };
</script>

<span class={`${positionClasses[position] || 'right-3 bottom-2'} absolute text-xs text-neutral-300 font-[Source_Code_Pro]`}>
    {name}
</span>