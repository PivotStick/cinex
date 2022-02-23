<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	import Icon from '$lib/components/Icon.svelte';
	import { datas } from '$lib/stores';
</script>

<svelte:head>
	<title>{import.meta.env.APP_NAME} - LEDs</title>
</svelte:head>

<main>
	<ul>
		{#each $datas.leds as led, i}
			<li>
				<h1 contenteditable="true" bind:textContent={led.title} />
				<label>
					nombre dans le hall
					<input type="number" bind:value={led.hall} />
				</label>
				<label>
					nombre dans les couloirs
					<input type="number" bind:value={led.hallways} />
				</label>
				<label>
					nombre en exterieur
					<input type="number" bind:value={led.outdoors} />
				</label>
				<button
					on:click={() => {
						goto(`${base}/leds/${i}`);
					}}
				>
					<Icon name="eye" />
				</button>
			</li>
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
		list-style: none;
		gap: 1em;
	}

	li {
		border: 1px solid #eee;
		padding: 1em;
	}

	button {
		& > :global(svg) {
			width: 2em;
		}
	}
</style>
