<script>
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { datas } from '$lib/stores';

	/**
	 * @type {import("$lib/stores").Title}
	 */
	export let title;

	/**
	 * @type {{ x: number, y: number }}
	 */
	let menu;

	/**
	 * @param {HTMLElement} node
	 */
	const clickoutside = (node) => {
		const down = (e) => {
			if (!node.contains(e.target)) {
				menu = undefined;
			}
		};

		addEventListener('mousedown', down);

		return {
			destroy() {
				removeEventListener('mousedown', down);
			}
		};
	};
</script>

{#if menu}
	<div style="--x: {menu.x}px; --y: {menu.y}px" use:clickoutside in:scale={{ easing: expoOut }}>
		{#if title.group}
			<input type="text" bind:value={title.group.start} />
			<input type="text" bind:value={title.group.end} />
			<input type="text" bind:value={title.group.suffix} />
			<button on:click={() => (title.group = undefined)}>Supprimer ce groupe</button>
		{:else}
			<button
				on:click={() => {
					title.group = {
						start: `Début ${title.name}`,
						end: `Fin ${title.name}`,
						suffix: title.type
					};
				}}>Créer un groupe</button
			>
		{/if}
	</div>
{/if}

<li
	on:contextmenu={(e) => {
		e.preventDefault();
		menu = { x: e.clientX, y: e.clientY };
	}}
>
	<input type="text" bind:value={title.name} />
	<input type="text" bind:value={title.type} />
	<button
		on:click={() => {
			$datas.titles = $datas.titles.filter((t) => t !== title);
		}}>-</button
	>
</li>

<style lang="scss">
	div {
		display: grid;
		position: fixed;

		top: var(--y);
		left: var(--x);

		border-radius: 1em;
		border-top-left-radius: 0.5em;
		transform-origin: top left;

		background-color: white;
		padding: 1em;
		box-shadow: 0 0.5em 1.25em -0.5em rgba(0, 0, 0, 0.5);
	}
</style>
