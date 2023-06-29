<script context="module">
	import { backOut } from "svelte/easing";
	import { writable } from "svelte/store";
	import { fly } from "svelte/transition";

	/**
	 * @typedef {{
	 *  title: string;
	 *  component: typeof import("svelte").SvelteComponent;
	 *  props?: any;
	 * }} StackItem
	 */
	const makeStack = () => {
		const { subscribe, update } = writable(/** @type {StackItem[]} */ ([]));

		return {
			subscribe,
			/**
			 * @param {StackItem["title"]} title
			 * @param {StackItem["component"]} component
			 * @param {StackItem["props"]} props
			 */
			push(title, component, props = {}) {
				update((v) => {
					v.push({ title, component, props });
					return v;
				});
			},

			pop() {
				update((v) => {
					v.pop();
					return v;
				});
			},

			clear() {
				update((v) => {
					v.length = 0;
					return v;
				});
			}
		};
	};

	export const stack = makeStack();
</script>

<script>
	$: canGoBack = $stack.length > 1;
	$: current = $stack[$stack.length - 1];
</script>

{#if current}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<aside transition:fly={{ x: 300, duration: 200 }}>
		<header>
			<h1 class:can-go-back={canGoBack} on:click={canGoBack ? stack.pop : undefined}>
				<i class="fa fa-chevron-left" />
				{current.title}
			</h1>

			<i class="fa fa-xmark" on:click={stack.clear} />
		</header>
		{#key current.component}
			<div
				in:fly={{ y: -20, easing: backOut, delay: canGoBack ? 0 : 200, duration: 300 }}
				class="body"
			>
				<svelte:component this={current.component} {...current.props} />
			</div>
		{/key}
	</aside>
{/if}

<style lang="scss">
	aside {
		position: fixed;

		z-index: 50;

		top: 0;
		right: 0;
		bottom: 0;

		backdrop-filter: blur(30px);
		box-shadow: 0 0 2rem -1.75rem var(--primary-400);

		width: max(65%, 35rem);
		max-width: 100vw;

		display: grid;
		grid-template-rows: auto 1fr;

		background-color: rgba(white, 0.7);

		header {
			border-bottom: 1px solid var(--primary-50);
			padding: 1rem;
			padding-right: 2rem;
			padding-top: 4rem;

			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 3rem;

			h1 {
				display: flex;
				align-items: center;

				padding: 0.5rem 1.25rem;
				padding-right: 1.5rem;

				text-transform: uppercase;
				letter-spacing: 0.2rem;
				font-weight: 700;
				font-size: 2rem;
				border-radius: 2rem;

				i.fa-chevron-left {
					width: 0;
					margin-right: 0;
					opacity: 0;

					font-size: 0.8em;

					transition-property: width, margin-right, opacity;
				}

				&.can-go-back {
					cursor: pointer;
					transition-property: background-color;

					i.fa-chevron-left {
						width: 1.5rem;
						margin-right: 0.5rem;
						opacity: 0.5;
					}

					&:hover {
						background-color: var(--primary-50);
					}
				}
			}

			i.fa-xmark {
				cursor: pointer;
				font-size: 1.5rem;

				width: 2.5rem;
				height: 2.5rem;

				background-color: var(--primary-50);
				color: var(--primary-700);
				opacity: 0.5;

				display: flex;
				justify-content: center;
				align-items: center;

				border-radius: 50%;

				transition-property: opacity, scale;

				&:hover {
					opacity: 1;
				}

				&:active {
					scale: 0.9;
				}
			}
		}

		.body {
			padding: 2rem;
			overflow: auto;
		}
	}
</style>
