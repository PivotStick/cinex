<script>
	import { v4 } from 'uuid';
	import { datas } from '$lib/stores';
	import { Momento } from '$lib/utils/Momento';
	import Icon from '$lib/components/Icon.svelte';
	import Search from '$lib/components/Search.svelte';

	const dimensions = ['2D', '3D'];
</script>

<svelte:head>
	<title>{import.meta.env.APP_NAME} - Films Annonces</title>
</svelte:head>

<main>
	<ul>
		{#each $datas.movieAds as movieAd (movieAd._id)}
			<li>
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
					<a href="/movieAds/{movieAd._id}">
						<button>
							<Icon name="eye" />
						</button>
					</a>
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
			</li>
		{/each}
		<button
			on:click={() => {
				const last = $datas.movieAds[$datas.movieAds.length - 1];
				$datas.movieAds = [
					...$datas.movieAds,
					{
						_id: v4(),
						film: '',
						start: last?.start || '',
						end: last?.end || '',
						dimension: dimensions[0],
						room: 1,
						ads: []
					}
				];
			}}
		>
			Ajouter
		</button>
	</ul>
</main>

<style lang="scss">
	main {
		padding: 4vw;
	}

	button {
		cursor: pointer;

		:global(svg) {
			width: 1.5em;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 1em;

		list-style: none;
	}

	li {
		border: 1px solid #eee;
		padding: 1em;

		.head {
			display: flex;

			& > :global(*:first-child) {
				flex: 1;
			}
		}
	}
</style>
