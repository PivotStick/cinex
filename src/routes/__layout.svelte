<script>
	import Nav from '$lib/components/Nav.svelte';
</script>

<svelte:head>
	<title>{import.meta.env.APP_NAME}</title>
</svelte:head>

<Nav />
<slot />

<style global lang="scss">
	*,
	*::after,
	*::before {
		margin: 0;
		padding: 0;

		box-sizing: border-box;
		transition: none cubic-bezier(0, 0.25, 0.5, 1) 400ms;
	}

	:root {
		font-family: 'Nunito', sans-serif;
	}

	body {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100vh;
	}

	input {
		text-transform: uppercase;
		padding: 0.25em;
		border: 1px solid transparent;
		outline: none;
		font: inherit;
		color: inherit;
		background: none;

		&:hover {
			border-color: rgba(black, 0.15);
		}

		&:focus {
			border-color: currentColor;
		}
	}

	button {
		cursor: pointer;
		border: none;
		padding: 0.5em;

		&:hover {
			background-color: rgba(black, 0.15);
		}

		&:disabled {
			pointer-events: none;
		}
	}
</style>
