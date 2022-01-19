import { browser } from '$app/env';
import { writable } from 'svelte/store';

/**
 * @typedef {{
 * 	titleId: string;
 * 	group?: {
 * 		ads: string[];
 * 		closed: boolean;
 *  }
 * }} Ad
 *
 * @typedef {{
 * 	titleId: string;
 * 	location: string;
 * 	type: string;
 * }} Poster
 *
 * @typedef {{
 * 	_id: string;
 * 	film: string;
 * 	start: string;
 * 	end: string;
 * 	dimension: string;
 * 	room: number;
 * 	ads: Ad[]
 * }} MovieAd
 *
 * @typedef {{
 * 	_id: string;
 * 	name: string;
 * 	type: string;
 * 	group?: {
 * 	    suffix: string;
 * 		start: string;
 * 		end: string;
 * 	}
 * }} Title
 */

const key = '__STORE_KEY__';
export const init = {
	week: 1,
	code: 70,
	city: 'MONTPELLIER',
	circuit: 'CGR',
	name: 'MEGA CGR LATTES',

	titles: /** @type {Title[]} */ ([]),
	posters: /** @type {Poster[]} */ ([]),
	movieAds: /** @type {MovieAd[]} */ ([]),
	leds: [
		{
			title: 'panneaux LEDs isolés',
			subTitle: "Liste des films présents dans la rotation d'affiches fixes:",
			films: [],
			hall: 6,
			hallways: 0,
			outdoors: 0
		},
		{
			title: 'blocs 1 de 3 panneaux',
			subTitle: 'Liste des films présents sur un des 3 panneaux du bloc (5 maximum):',
			films: [],
			hall: 2,
			hallways: 0,
			outdoors: 0
		},
		{
			title: 'blocs 2 de 3 panneaux',
			subTitle: 'Liste des films présents sur un des 3 panneaux du bloc (5 maximum):',
			films: [],
			hall: 2,
			hallways: 0,
			outdoors: 0
		},
		{
			title: 'blocs 3 de 3 panneaux',
			subTitle: 'Liste des films présents sur un des 3 panneaux du bloc (5 maximum):',
			films: [],
			hall: 0,
			hallways: 0,
			outdoors: 0
		}
	]
};

/**
 *
 * @returns {import("svelte/store").Writable<typeof init>}
 */
const makeDatas = () => {
	if (!browser) return;
	const store = writable(JSON.parse(localStorage.getItem(key)) || init);

	store.subscribe((v) => localStorage.setItem(key, JSON.stringify(v)));

	return store;
};

export const datas = makeDatas();
