<script>
	import { page } from '$app/stores';
	import { intoView } from '$lib/actions/intoView';
	import Icon from '$lib/components/Icon.svelte';
	import Main from '$lib/components/Main.svelte';
	import Search from '$lib/components/Search.svelte';
	import { datas } from '$lib/stores';

	/**
	 * @type {HTMLInputElement}
	 */
	let input;
	let value = '';
	let query = '';
	let focused = false;

	$: led = $datas.leds[$page.params.index];
</script>

<Main
	--rows="1fr auto"
	on:submit={() => {
		led.films = [...led.films, value];

		query = '';
		input.focus();
	}}
>
	<ul class:focused>
		{#each led.films as _id, i}
			<li use:intoView={i === led.films.length - 1}>
				<input
					type="text"
					bind:value={$datas.titles[$datas.titles.findIndex((t) => t._id === _id)].name}
				/>
				<button
					on:click={() => {
						led.films = led.films.filter((_, index) => index !== i);
					}}><Icon name="trash" /></button
				>
			</li>
		{/each}
	</ul>

	<svelte:fragment slot="form">
		<Search
			bind:focused
			bind:input
			bind:value
			bind:query
			placeholder="Film"
			options={$datas.titles.map((t) => ({
				label: t.name,
				value: t._id
			}))}
		/>
		<button><Icon name="plus" /></button>
	</svelte:fragment>
</Main>

<style lang="scss">
	ul {
		list-style: none;
		overflow-y: auto;

		transition-property: padding-bottom;

		&.focused {
			padding-bottom: 16em;
		}
	}

	li {
		display: flex;

		& > * {
			flex: 1;
		}

		button {
			:global(svg) {
				width: 2em;
			}
		}
	}
</style>
