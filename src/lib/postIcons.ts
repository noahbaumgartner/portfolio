import type { Component } from 'svelte';
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

export const postIcons: Record<string, Component> = {
	compass: Compass,
	wheat: Wheat,
	'person-standing': PersonStanding,
	'party-popper': PartyPopper,
	scale: Scale,
	search: Search,
	car: Car,
	image: Image
};
