<script>
	import { slide } from "svelte/transition";
	import { page } from "$app/stores";
	import { datas } from "$lib/stores";
	import { intoView } from "$lib/actions/intoView";

	import Icon from "$lib/components/Icon.svelte";
	import Main from "$lib/components/Main.svelte";
	import Search from "$lib/components/Search.svelte";
	import { v4 } from "uuid";
	import { goto } from "$app/navigation";

	$: i = $datas.movieAds.findIndex((m) => m._id === $page.params._id);
	$: ads = $datas.movieAds[i].ads;

	/**
	 * @type {HTMLInputElement}
	 */
	let input;
	let focused = false;
	let query = "";
	/**
	 * @type {import('$lib/stores').Title}
	 */
	let title;
</script>

<Main
	--rows="auto 1fr auto"
	on:submit={() => {
		const last = ads[ads.length - 1];
		if (last?.group && !last.group.closed) {
			if (last.titleId === title._id) {
				last.group.closed = true;
			} else {
				last.group.ads.push(title._id);
			}
		} else {
			$datas.movieAds[i].ads.push({
				titleId: title._id,
				group: title.group
					? {
							ads: [],
							closed: false
					  }
					: undefined
			});
		}
		$datas.movieAds[i].ads = $datas.movieAds[i].ads;
		query = "";
		title = undefined;
		input.focus();
	}}
>
	<h1 in:slide>
		{$datas.movieAds[i].film}
		<button
			on:click={() => {
				$datas.movieAds[i].done = true;
				goto("/movieAds");
			}}>Finir</button
		>
	</h1>

	<ul class:focused>
		{#each ads as ad, index}
			{#if ad.group}
				{@const adTitleIndex = $datas.titles.findIndex((t) => t._id === ad.titleId)}
				<li class="group" use:intoView={index === ads.length - 1 && !ad.group.ads.length}>
					<input type="text" bind:value={$datas.titles[adTitleIndex].group.start} />
					<input type="text" bind:value={$datas.titles[adTitleIndex].type} />
					<input
						type="text"
						style="opacity: 0;"
						bind:value={$datas.titles[adTitleIndex].group.suffix}
					/>
					<button
						on:click={() => {
							$datas.movieAds[i].ads = $datas.movieAds[i].ads.filter((a) => a !== ad);
						}}
					>
						<Icon name="trash" />
					</button>
				</li>
				{#each ad.group.ads as titleId, _index}
					{@const titleIndex = $datas.titles.findIndex((t) => t._id === titleId)}
					{@const sameType =
						$datas.titles[titleIndex].type.toUpperCase().trim() ===
						$datas.titles[adTitleIndex].group.suffix.toUpperCase().trim()}
					<li
						class="group"
						use:intoView={index === ads.length - 1 && _index === ad.group.ads.length - 1}
					>
						<input type="text" bind:value={$datas.titles[titleIndex].name} />
						<input type="text" bind:value={$datas.titles[titleIndex].type} />
						<input
							type="text"
							bind:value={$datas.titles[adTitleIndex].group.suffix}
							style="opacity: {!sameType ? 1 : 0.25}; text-decoration: {!sameType
								? 'none'
								: 'line-through'}"
						/>
						<button
							on:click={() => {
								ad.group.ads = ad.group.ads.filter((a, _i) => _i !== _index);
							}}><Icon name="trash" /></button
						>
					</li>
				{/each}
				{#if ad.group.closed}
					<li class="group" use:intoView={index === ads.length - 1}>
						<input type="text" bind:value={$datas.titles[adTitleIndex].group.end} />
						<input type="text" bind:value={$datas.titles[adTitleIndex].type} />
						<input
							type="text"
							style="opacity: 0;"
							bind:value={$datas.titles[adTitleIndex].group.suffix}
						/>
						<button
							disabled={ads[index + 1]}
							on:click={() => {
								ad.group.closed = false;
							}}><Icon name="trash" /></button
						>
					</li>
				{/if}
			{:else}
				<li use:intoView={index === ads.length - 1}>
					<input
						type="text"
						placeholder="Nom"
						bind:value={$datas.titles[$datas.titles.findIndex((t) => t._id === ad.titleId)].name}
					/>
					<input
						type="text"
						placeholder="Type"
						bind:value={$datas.titles[$datas.titles.findIndex((t) => t._id === ad.titleId)].type}
					/>
					<button
						on:click={() => {
							$datas.movieAds[i].ads = $datas.movieAds[i].ads.filter((a) => a !== ad);
						}}
					>
						<Icon name="trash" />
					</button>
				</li>
			{/if}
		{/each}
	</ul>

	<svelte:fragment slot="form">
		<Search
			bind:input
			bind:query
			bind:focused
			on:notfound={() => {
				$datas.titles.unshift({
					_id: v4(),
					name: query,
					type: "pub"
				});
				$datas.titles = $datas.titles;
			}}
			bind:value={title}
			placeholder="Nom"
			options={$datas.titles.map((m) => ({
				label: m.name,
				value: m
			}))}
		/>
		{#if title}
			<input
				type="text"
				placeholder="Type"
				bind:value={$datas.titles[$datas.titles.findIndex((t) => t._id === title._id)].type}
			/>
		{:else}
			<input type="text" placeholder="???" disabled />
		{/if}
		<button><Icon name="plus" /></button>
	</svelte:fragment>
</Main>

<style lang="scss">
	h1 {
		padding: 0.5em;
		text-align: center;
		text-transform: uppercase;
		font-weight: 900;
		border-bottom: 1px solid #eee;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
	}

	ul {
		overflow-y: auto;
		padding-top: 1em;

		&.focused {
			padding-bottom: 16em;
		}
	}

	li {
		display: flex;

		&.group {
			background-color: rgb(54, 121, 228);
			color: white;
		}

		&:not(.group) {
			& > *:nth-child(2) {
				flex: 2;
			}
		}

		button {
			:global(svg) {
				height: 2em;
			}
		}

		& > * {
			flex: 1;
		}
	}
</style>
