<script>
	import { base } from "$app/paths";

	import { datas } from "$lib/stores";
	import { Momento } from "$lib/utils/Momento";
	import Icon from "./Icon.svelte";

	import Search from "./Search.svelte";

	/**
	 * @type {import("$lib/stores").MovieAd}
	 */
	export let movieAd;

	/**
	 * @type {string[]}
	 */
	export let dimensions;
</script>

<div class="head">
	<Search
		bind:query={movieAd.film}
		options={$datas.titles.map((title) => ({
			value: title.name,
			label: title.name
		}))}
		placeholder="Film"
		bottom
	/>
	<button
		on:click={() => {
			$datas.movieAds = $datas.movieAds.filter((m) => m !== movieAd);
		}}
	>
		<Icon name="trash" />
	</button>
	<a href="{base}/movieAds/{movieAd._id}">
		<button>
			<Icon name="eye" />
		</button>
	</a>
	<button>
		<label style="display: flex; align-items: center; gap: .5em">
			Terminé <input type="checkbox" bind:checked={movieAd.done} />
		</label>
	</button>
</div>
<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
	Un film <Search
		style="display: inline-block; width: 5em;"
		bind:query={movieAd.dimension}
		options={dimensions.map((value) => ({
			value,
			label: value
		}))}
	/>
</label>
<label>
	Salle n° <input type="number" bind:value={movieAd.room} style="width: 4.5ch;" />
</label>
<label>
	je suis rentré le <input type="datetime-local" bind:value={movieAd.start} />
</label>
<label>
	et je suis sorti à <input type="time" bind:value={movieAd.end} />
	{#if movieAd.start && movieAd.end}
		({Momento.diffMinutes(movieAd.start, movieAd.end)} minutes)
	{/if}
</label>

<style lang="scss">
	.head {
		display: flex;

		& > :global(*:first-child) {
			flex: 1;
		}
	}

	button {
		cursor: pointer;

		:global(svg) {
			width: 1.5em;
		}

		input[type="checkbox"] {
			accent-color: rgb(26, 153, 26);
		}
	}
</style>
