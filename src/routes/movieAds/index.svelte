<script>
	import { v4 } from "uuid";
	import { flip } from "svelte/animate";
	import { crossfade, scale } from "svelte/transition";
	import { datas } from "$lib/stores";
	import MovieAd from "$lib/components/MovieAd.svelte";

	const dimensions = ["2D", "3D"];

	const [send, receive] = crossfade({
		fallback: scale
	});
</script>

<svelte:head>
	<title>{import.meta.env.APP_NAME} - Films Annonces</title>
</svelte:head>

<main>
	<h2>À faire</h2>
	<ul>
		{#each $datas.movieAds.filter((m) => !m.done) as movieAd (movieAd._id)}
			<li
				animate:flip
				out:send|local={{ key: movieAd._id }}
				in:receive|local={{ key: movieAd._id }}
			>
				<MovieAd bind:movieAd {dimensions} />
			</li>
		{:else}
			<li>Aucun...</li>
		{/each}
		<button
			on:click={() => {
				const last = $datas.movieAds[$datas.movieAds.length - 1];
				$datas.movieAds = [
					...$datas.movieAds,
					{
						_id: v4(),
						film: "",
						start: last?.start || "",
						end: last?.end || "",
						dimension: dimensions[0],
						room: 1,
						done: false,
						ads: []
					}
				];
			}}
		>
			Ajouter
		</button>
	</ul>
	<h2>Terminés</h2>
	<ul>
		{#each $datas.movieAds.filter((m) => m.done) as movieAd (movieAd._id)}
			<li
				animate:flip
				out:send|local={{ key: movieAd._id }}
				in:receive|local={{ key: movieAd._id }}
			>
				<MovieAd bind:movieAd {dimensions} />
			</li>
		{:else}
			<li>Aucun...</li>
		{/each}
	</ul>
</main>

<style lang="scss">
	main {
		padding: 4vw;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 1em;

		list-style: none;
		margin-bottom: 2em;
	}

	h2 {
		margin-bottom: 0.75em;
	}

	li {
		border: 1px solid #eee;
		background-color: white;
		padding: 1em;
	}
</style>
