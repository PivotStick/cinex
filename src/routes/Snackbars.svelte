<script context="module">
	import { backOut } from "svelte/easing";
	import { writable } from "svelte/store";
	import { slide } from "svelte/transition";

	/**
	 * @typedef {{
	 *  id: string;
	 *  type: "danger" | "info" | "warning" | "success";
	 *  title: string;
	 *  message: string;
	 * }} Snack
	 */
	export const snacks = (() => {
		const { subscribe, update } = writable(
			/**
			 * @type {Snack[]}
			 */
			([])
		);

		/**
		 * @type {number=}
		 */
		let interval = undefined;

		/**
		 * @param {Omit<Snack, "id">} snack
		 */
		function push(snack) {
			update((value) => {
				const v = {
					id: crypto.randomUUID(),
					...snack
				};

				value.push(v);

				return value;
			});

			if (!interval) {
				interval = setInterval(() => {
					update((value) => {
						value.shift();
						if (!value.length) {
							clearInterval(interval);
							interval = undefined;
						}
						return value;
					});
				}, 6000);
			}
		}

		return {
			subscribe,
			info: (message = "", title = "Infos") => push({ message, title, type: "info" }),
			success: (message = "", title = "Succès !") => push({ message, title, type: "success" }),
			danger: (message = "Petit problème", title = "Error") =>
				push({ message, title, type: "danger" }),
			warn: (message = "", title = "Attention !") => push({ message, title, type: "warning" }),

			/**
			 * @param {Snack} snack
			 */
			remove: (snack) => update((v) => v.filter((s) => s !== snack))
		};
	})();

	const icons = {
		info: "fa-info",
		success: "fa-check",
		danger: "fa-ban",
		warning: "fa-exclamation"
	};
</script>

<ul>
	{#each $snacks as snack (snack.id)}
		<li transition:slide={{ easing: backOut }}>
			<h1>
				<div class="type">
					<i class="fa {icons[snack.type]}" />
				</div>
				{snack.title}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="remove">
					<i class="fa fa-xmark" on:click={() => snacks.remove(snack)} />
				</div>
			</h1>
			{#if snack.message}
				<p>{snack.message}</p>
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		position: fixed;

		bottom: 0;
		right: 0;

		padding: 2rem;

		display: grid;
		z-index: 100;

		li {
			box-shadow: 0 0.25rem 1.25rem -0.5rem var(--primary-600);
			color: var(--primary-700);

			background-color: white;
			padding: 1rem;
			border-radius: 0.75rem;
			min-width: max(25vw, 15rem);

			margin-top: 1rem;

			h1 {
				display: flex;
				align-items: center;
				gap: 0.75rem;

				font-size: 1.5rem;
				font-weight: 600;

				.type {
					$size: 1.5rem;
					border-radius: 50%;

					width: $size;
					height: $size;
					font-size: 0.75rem;

					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;

					background-color: var(--primary-800);
					color: var(--on-primary-800);
				}

				.remove {
					cursor: pointer;

					font-size: 1.25rem;
					margin-left: auto;
					opacity: 0.5;

					align-self: flex-start;

					transition-property: opacity, scale;

					&:hover {
						opacity: 1;
					}

					&:active {
						scale: 0.9;
					}
				}
			}

			p {
				margin-top: 1rem;
			}
		}
	}
</style>
