import { Sheet } from "./Sheet";

export class Posters extends Sheet {
	// wchs = [10.17, 8.33, 14.83, 8.83, 22.5, 61.83, 19.83, 18.33];

	constructor() {
		super("AFFICHES");
		const s = { font: { bold: true }, alignment: { horizontal: "center" } };
		this.rows.push([
			{ v: "SEMAINE", s },
			{ v: "CODE ENQ.", s },
			{ v: "VILLE", s },
			{ v: "CIRCUIT", s },
			{ v: "COMPLEXE", s },
			{ v: "AFFICHE FILM", s },
			{ v: "POSITIONNEMENT", s },
			{ v: "FORMAT", s }
		]);
	}

	/**
	 *
	 * @param {typeof import("$lib/stores").init} $datas
	 */
	build($datas) {
		const posters = $datas.posters.map((poster) => {
			const title = $datas.titles.find((t) => t._id === poster.titleId);

			const s = { alignment: { horizontal: "center" } };

			return [
				{ v: $datas.week, s },
				{ v: $datas.code, s },
				{ v: $datas.city.toUpperCase(), s },
				{ v: $datas.circuit.toUpperCase(), s },
				{ v: $datas.name.toUpperCase(), s },
				title.name.toUpperCase(),
				{ v: poster.location.toUpperCase(), s },
				{ v: poster.type.toUpperCase(), s }
			].map((v, i) => this.count(v, i));
		});
		this.rows.push(...posters);
	}
}
