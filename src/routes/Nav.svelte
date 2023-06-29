<script>
	import { page } from "$app/stores";

	/**
	 * @type {typeof links[number]=}
	 */
	export let current;

	const links = [
		{
			href: "/posts",
			icon: "fa-image",
			title: "Affiches"
		},
		{
			href: "/fa",
			icon: "fa-film",
			title: "Films Annonces"
		},
		{
			href: "/led",
			icon: "fa-tablet",
			title: "LED"
		},
		{
			href: "/comments",
			icon: "fa-comment",
			title: "Remarques"
		},
		{
			href: "/",
			icon: "fa-book",
			title: "Dictionnaire"
		}
	];

	$: current = links.find((l) => l.href === $page.url.pathname);
</script>

<nav>
	{#each links as link (link.href)}
		<a aria-current={current === link ? "page" : undefined} href={link.href}>
			<i class="fa {link.icon}" />
		</a>
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
		flex-direction: column;
		justify-content: center;

		padding: 2rem;

		border-right: 1px solid var(--primary-50);
		gap: 1rem;

		a {
			display: flex;
			justify-content: center;
			align-items: center;

			font-size: 1.5rem;

			border-radius: 1rem;
			$size: 3rem;
			width: $size;
			height: $size;

			transition-property: scale;

			&[aria-current="page"] {
				pointer-events: none;
				background-color: var(--primary-100);
				color: var(--on-primary-100);
			}

			&:active {
				scale: 0.9;
			}
		}
	}
</style>
