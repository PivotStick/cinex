<script>
	import { datas } from '$lib/stores';
	import { LED } from '$lib/utils/LED';
	import { MovieAds } from '$lib/utils/MovieAds';
	import { Posters } from '$lib/utils/Posters';
	import { Remarks } from '$lib/utils/Remarks';
	import { ResultMaker } from '$lib/utils/ResultMaker';

	const generateAndDownload = () => {
		const result = new ResultMaker(`${$datas.name} SEMAINE ${$datas.week}`, $datas);

		result.setSheet(new Posters());
		result.setSheet(new MovieAds());
		result.setSheet(new LED());
		result.setSheet(new Remarks());

		result.download();
	};
</script>

<svelte:head>
	<title>{import.meta.env.APP_NAME} - Paramètres</title>
</svelte:head>

<main>
	<label>
		Code enquêteur
		<input type="text" bind:value={$datas.code} />
	</label>
	<label>
		Semaine n°
		<input type="number" bind:value={$datas.week} />
	</label>
	<label>
		Nom du cinéma
		<input type="text" bind:value={$datas.name} />
	</label>
	<label>
		Ville
		<input type="text" bind:value={$datas.city} />
	</label>
	<label>
		Circuit
		<input type="text" bind:value={$datas.circuit} />
	</label>

	<button on:click={generateAndDownload}>Télécharger le tableau</button>
</main>

<style>
	main {
		display: grid;
		padding: 4vw;
	}
</style>
