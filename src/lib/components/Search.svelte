<script>
	import { Regex } from "$lib/utils/Regex";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	/**
	 * @type {svelte.JSX.HTMLAttributes<HTMLLabelElement>["style"]}
	 */
	export let style = undefined;
	/**
	 * @type {{ label: string, value: any }[]}
	 */
	export let options = [];
	/**
	 * @type {HTMLInputElement}
	 */
	export let input = undefined;
	export let query = "";
	export let value = undefined;
	export let bottom = false;
	export let focused = false;

	/**
	 * @param {HTMLElement} node
	 * @param {boolean} condition
	 */
	const intoView = (node, condition) => {
		const update = (c) => {
			if (c) node.scrollIntoView({ block: "nearest" });
		};

		update(condition);

		return { update };
	};

	const select = (i) => {
		const option = filtered[i];

		query = option.label;
		value = option.value;
	};

	let index = 0;

	$: regex = new RegExp(Regex.escape(query), "gi");
	$: filtered = options.filter((option) => option.label.match(regex));
	$: if (filtered.length === 1) {
		value = filtered[0].value;
	}
	$: {
		if (index < 0) index = 0;
		if (index > filtered.length - 1) index = filtered.length - 1;
	}
</script>

<label {style}>
	<input
		type="search"
		bind:this={input}
		bind:value={query}
		on:focus={() => (focused = true)}
		on:blur={() => (focused = false)}
		on:keydown={(e) => {
			switch (e.key) {
				case "ArrowUp":
					index--;
					break;

				case "ArrowDown":
					index++;
					break;

				case "Enter":
				case "Tab":
					if (!filtered[index]) dispatch("notfound");
					else select(index);
					break;
			}
		}}
		{...$$restProps}
	/>
	<datalist class:bottom>
		{#each filtered as option, i}
			<option class:current={i === index} use:intoView={i === index} on:mousedown={() => select(i)}>
				{option.label}
			</option>
		{:else}
			...
		{/each}
	</datalist>
</label>

<style lang="scss">
	datalist {
		position: absolute;

		left: -1px;

		background-color: white;
		border: 1px solid currentColor;

		max-height: 15em;
		overflow-y: auto;
		z-index: 99999;

		&:not(.bottom) {
			border-bottom: none;
			bottom: 100%;
		}

		&.bottom {
			border-top: none;
			top: 100%;
		}
	}

	option {
		cursor: pointer;
		text-transform: uppercase;
		padding: 0.5em;

		&.current,
		&:hover {
			color: white;
			background-color: black;
		}
	}

	label {
		position: relative;
		display: block;
		border: 1px solid transparent;

		&:hover {
			border-color: rgba(black, 0.15);
		}

		&:focus-within {
			border-color: currentColor;

			datalist {
				display: block;
			}
		}

		input {
			border: none;
			width: 100%;
			height: 100%;
		}
	}
</style>
