<script>
	import { v4 } from "uuid";
	import { datas } from "$lib/stores";
	import { Regex } from "$lib/utils/Regex";

	import DicoItem from "$lib/components/DicoItem.svelte";
	import Dico from "$lib/components/Dico.svelte";

	/**
	 * @type {HTMLInputElement}
	 */
	let input;
	let body = {
		name: "",
		type: "pub"
	};

	const add = () => {
		$datas.titles = [
			{
				...body,
				_id: v4()
			},
			...$datas.titles
		];

		body.name = "";
		input.focus();
	};

	$: regex = new RegExp(Regex.escape(body.name), "gi");
	$: sliced = $datas.titles.slice(0, 50);
</script>

<svelte:head>
	<title>{import.meta.env.APP_NAME} - Dico</title>
</svelte:head>

<main>
	<Dico />
	<p>{sliced.length} / {$datas.titles.length}</p>
	<form on:submit|preventDefault={add}>
		<input type="text" bind:value={body.name} placeholder="Nom" bind:this={input} />
		<input type="text" bind:value={body.type} placeholder="Type" />
		<button>+</button>
	</form>
	<ul>
		{#each sliced as title (title._id)}
			{#if title.name.match(regex)}
				<DicoItem bind:title />
			{/if}
		{/each}
	</ul>
</main>

<style lang="scss">
	main {
		padding: 4vw;
		overflow-y: auto;
	}

	ul > :global(li),
	form {
		display: flex;

		& > :global(input) {
			flex: 1;
		}

		& > :global(button) {
			width: 2em;
		}
	}

	p {
		margin: 1em 0;
	}

	ul {
		list-style: none;
		margin-top: 1em;
	}
</style>
