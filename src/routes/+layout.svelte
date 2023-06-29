<script>
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import "../app.scss";

	import { fly } from "svelte/transition";
	import { backOut } from "svelte/easing";

	import Nav from "./Nav.svelte";
	import SidebarStack from "./SidebarStack.svelte";
	import Snackbars, { snacks } from "./Snackbars.svelte";
	import { onMount } from "svelte";

	/**
	 * @type {Nav["$$prop_def"]["current"]}
	 */
	let current;

	onMount(() => {
		const messages = [
			"Coucou !",
			"Et c'est reparti 😎",
			"Aller let's go en 10min",
			"J'suis sûr il est dimanche là",
			"Hello :p"
		];

		const i = Math.floor(Math.random() * messages.length);

		snacks.success("", messages[i]);
	});
</script>

<SidebarStack />
<Snackbars />

<div class="layout">
	<Nav bind:current />
	<main>
		{#key current}
			<div class="title" in:fly={{ x: -20, easing: backOut, duration: 300 }}>
				<h1>{current?.title || "Cinex"}</h1>
			</div>
			<div class="body" in:fly={{ x: -25, easing: backOut, delay: 25, duration: 400 }}>
				<slot />
			</div>
		{/key}
	</main>
</div>

<style lang="scss">
	.layout {
		display: grid;
		grid-template-columns: auto 1fr;
		height: 100vh;

		main {
			overflow: auto;
			padding: 2rem 3rem;

			.title {
				font-size: 3rem;
				font-weight: 900;
				margin-bottom: 2rem;
			}
		}
	}
</style>
