<script>
	import { page } from "$app/stores";
</script>

<main>
	<h1>Erreur {$page.status} 🤔</h1>
	<pre>{$page.error.message}</pre>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
