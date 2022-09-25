<script>
	import { datas } from '$lib/stores';
	import { read, utils } from 'xlsx-js-style';

	const KEY = 'TITRE FRANCAIS';

	/**
	 * @param {File} file
	 */
	const load = async (file) => {
		const buffer = await file.arrayBuffer();
		if (file.type === 'application/json') {
			// @ts-ignore
			console.log(buffer);
			// $datas = JSON.parse(reader.result);
			return;
		}

		const book = read(buffer);

		const name = book.SheetNames[0];
		const json = utils.sheet_to_json(book.Sheets[name]);

		json.forEach((row) => {
			if (!row[KEY]) return;
			const name = String(row[KEY]).toUpperCase().trim();
			if ($datas.titles.find((t) => t.name.toUpperCase().trim() === name)) return;

			$datas.titles.push({
				_id: crypto.randomUUID(),
				name,
				type: 'pub'
			});
		});

		$datas.titles = $datas.titles;
	};
</script>

<label>
	<p>Charger un Dico <b>(ça va chercher la colonne <i>"{KEY}"</i>)</b></p>
	<input
		type="file"
		on:change={async (e) => {
			const i = e.currentTarget;
			if (i.files !== null) {
				const file = i.files.item(0);
				if (file) {
					await load(file);
				}
				i.value = '';
			}
		}}
	/>
</label>

<style>
	label {
		display: block;
		border: 1px solid #ddd;
		border-radius: 1em;
		padding: 1em;
		width: 100%;

		text-align: center;
	}
</style>
