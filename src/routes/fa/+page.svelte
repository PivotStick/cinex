<script>
	import { backOut } from "svelte/easing";
	import { scale, slide } from "svelte/transition";
	import { stack } from "../SidebarStack.svelte";
	import FaEditorSidebar from "./FAEditorSidebar.svelte";

	const createFilm = () => ({
		id: crypto.randomUUID(),
		name: "",
		begin: "",
		end: "15:00",
		room: "1",
		done: false
	});

	const addFilm = () => {
		films.unshift(createFilm());
		films = films;
	};

	/**
	 * @param {typeof films[number]} film
	 */
	const removeFilm = (film) => {
		films = films.filter((f) => f !== film);
	};

	const sort = () => {
		films = films.sort((a, b) => {
			return -1;
		});
	};

	let films = Array(7)
		.fill(undefined)
		.map((_, i) => createFilm());
</script>

<ul>
	{#each films as film, i (film.id)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li in:slide={{ easing: backOut, delay: i * 20 }} class:done={film.done}>
			<i
				class="btn fa {film.done ? 'fa-check' : 'fa-file-pen'}"
				on:click={() => {
					film.done = !film.done;
				}}
			/>
			<input type="text" bind:value={film.name} placeholder="Nom du film" class="name" />
			<label>
				je suis rentré le
				<input type="datetime-local" bind:value={film.begin} />
			</label>
			<label>
				et je suis sorti à
				<input type="time" bind:value={film.end} />
			</label>
			<label>
				en salle
				<input type="text" bind:value={film.room} class="room" />
			</label>
			<i class="fa fa-trash btn" on:click={() => removeFilm(film)} />
			<i
				class="fa fa-pen btn"
				on:click|preventDefault={() => {
					const date = new Date(film.begin);
					const formatter = Intl.DateTimeFormat("fr", {
						hour: "2-digit",
						minute: "2-digit"
					});

					stack.push(`${film.name} ${formatter.format(date)} - ${film.end}`, FaEditorSidebar, {
						film
					});
				}}
			/>
		</li>
	{/each}
</ul>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="buttons">
	<i class="fa fa-plus btn" on:click={addFilm} />
	<button class="sort" on:click={sort}>Mettre dans l'ordre chronologique</button>
</div>

<style lang="scss">
	.buttons {
		display: flex;
		gap: 1rem;
		margin-top: 2.5rem;
	}

	ul {
		display: grid;
		gap: 1rem;
	}

	li {
		display: flex;
		align-items: center;
		gap: 1rem;

		label {
			display: inherit;
			align-items: inherit;
			gap: inherit;
		}

		.name {
			flex: 1;
			min-width: none;
		}

		.room {
			width: 3rem;
			min-width: 0;
		}

		&.done {
			opacity: 0.5;
		}
	}
</style>
