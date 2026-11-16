import type { Component } from 'svelte';
import {
	Compass,
	Wheat,
	PersonStanding,
	PartyPopper,
	Scale,
	Search,
	Car,
	Image,
	Orbit,
	Flame,
	Utensils,
	Component as ComponentIcon
} from '@lucide/svelte';

export const postIcons: Record<string, Component> = {
	compass: Compass,
	wheat: Wheat,
	'person-standing': PersonStanding,
	'party-popper': PartyPopper,
	scale: Scale,
	search: Search,
	car: Car,
	image: Image,
	orbit: Orbit,
	flame: Flame,
	utensils: Utensils,
	component: ComponentIcon
};
