<script>
	import { intoView } from '$lib/actions/intoView';

	import Icon from '$lib/components/Icon.svelte';
	import Main from '$lib/components/Main.svelte';
	import Search from '$lib/components/Search.svelte';
	import { datas } from '$lib/stores';

	const locations = ['int hall', 'int coul'];
	const formats = ['120x160', 'plv classique', 'plv speciale'];

	let poster = {
		titleId: undefined,
		location: locations[0],
		type: formats[0]
	};

	let focused = false;
	let query = '';
	/**
	 * @type {HTMLInputElement}
	 */
	let input;
</script>

<svelte:head>
	<title>{import.meta.env.APP_NAME} - Affiches</title>
</svelte:head>

<Main
	--rows="auto 1fr auto"
	on:submit={() => {
		$datas.posters = [...$datas.posters, { ...poster }];
		query = '';
		input.focus();
	}}
>
	<button on:click={() => ($datas.posters = [])}>Réinitialiser</button>
	<ul class:focused>
		{#each $datas.posters as poster, i}
			<li use:intoView={i === $datas.posters.length - 1}>
				<input
					type="text"
					bind:value={$datas.titles[$datas.titles.findIndex((t) => t._id === poster.titleId)].name}
				/>
				<input type="text" bind:value={poster.location} />
				<input type="text" bind:value={poster.type} />
				<button
					on:click={() => {
						$datas.posters = $datas.posters.filter((p) => p !== poster);
					}}><Icon name="trash" /></button
				>
			</li>
		{/each}
	</ul>

	<svelte:fragment slot="form">
		<Search
			bind:focused
			bind:input
			bind:query
			bind:value={poster.titleId}
			options={$datas.titles.map((title) => ({
				value: title._id,
				label: title.name
			}))}
			autofocus
			placeholder="Nom"
		/>
		<Search
			bind:value={poster.location}
			options={locations.map((location) => ({
				value: location,
				label: location
			}))}
			placeholder="Lieu"
		/>
		<Search
			bind:value={poster.type}
			options={formats.map((format) => ({
				value: format,
				label: format
			}))}
			placeholder="Format"
		/>
		<button><Icon name="plus" /></button>
	</svelte:fragment>
</Main>

<style lang="scss">
	ul {
		padding: 1em;
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
				height: 2em;
			}
		}
	}
</style>
