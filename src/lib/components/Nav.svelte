<script>
	import { base } from "$app/paths";

	import { page } from "$app/stores";

	const links = {
		"/dico": "Dico",
		"/posters": "Affiches",
		"/movieAds": "Films Annonces",
		"/leds": "LEDs",
		"/settings": "Paramètres"
	};
</script>

<nav>
	{#each Object.keys(links) as href}
		<a class:current={$page.url.pathname === href} href={`${base}${href}`}>{links[href]}</a>
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-around;
	}

	a {
		display: flex;
		align-items: center;
		justify-content: center;

		text-align: center;

		padding: 1em 2em;
		flex: 1;
		color: black;
		text-decoration: none;

		border-bottom: 1px solid #eee;

		transition-property: background-color;

		&:hover {
			background-color: #eee;
		}

		&.current {
			border-bottom-color: currentColor;
		}
	}
</style>
