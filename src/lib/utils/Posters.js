import { Sheet } from "./Sheet";

export class Posters extends Sheet {
	constructor() {
		super("AFFICHES");
		this.rows.push([
			"SEMAINE",
			"CODE ENQ.",
			"VILLE",
			"CIRCUIT",
			"COMPLEXE",
			"AFFICHE FILM",
			"POSITIONNEMENT",
			"FORMAT"
		]);
	}

	/**
	 *
	 * @param {typeof import("$lib/stores").init} $datas
	 */
	build($datas) {
		const posters = $datas.posters.map((poster) => {
			const title = $datas.titles.find((t) => t._id === poster.titleId);

			return [
				$datas.week,
				$datas.code,
				$datas.city.toUpperCase(),
				$datas.circuit.toUpperCase(),
				$datas.name.toUpperCase(),
				title.name.toUpperCase(),
				poster.location.toUpperCase(),
				poster.type.toUpperCase()
			].map((v, i) => this.count(v, i));
		});
		this.rows.push(...posters);
	}
}
