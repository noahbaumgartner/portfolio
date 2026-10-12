<script lang="ts">
	import type { Component } from 'svelte';
	import type { PostDTO } from '$lib/dtos/PostDTO';
	import {
		Compass,
		Wheat,
		PersonStanding,
		PartyPopper,
		Scale,
		Search,
		Car,
		Image
	} from '@lucide/svelte';
	import { MeshGradient, PreviewCard } from '@noahbaumgartner/svelte-ui';

	let {
		post,
		orientation = 'horizontal'
	}: { post: PostDTO; orientation?: 'vertical' | 'horizontal' } = $props();

	const icons: Record<string, Component> = {
		compass: Compass,
		wheat: Wheat,
		'person-standing': PersonStanding,
		'party-popper': PartyPopper,
		scale: Scale,
		search: Search,
		car: Car,
		image: Image
	};
</script>

<PreviewCard
	href={`/posts/${post.slug}`}
	title={post.title}
	description={post.description}
	meta={post.period}
	icon={icons[post.icon]}
	{orientation}
>
	{#snippet media()}
		<MeshGradient colors={post.colors} seed={post.title} />
	{/snippet}
</PreviewCard>
