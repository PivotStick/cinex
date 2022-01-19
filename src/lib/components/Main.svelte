<main>
	<slot />

	<form on:submit|preventDefault>
		<slot name="form" />
	</form>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-rows: var(--rows);
		height: 100%;
		overflow-y: hidden;
	}

	form {
		display: flex;
		border-top: 1px solid currentColor;

		& > :global(*) {
			flex: 1;
			height: 100%;
			border: none !important;
		}

		:global(button) {
			:global(svg) {
				width: 2em;
			}
		}
	}
</style>
