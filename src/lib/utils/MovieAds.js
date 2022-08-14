import { Momento } from "./Momento";
import { Sheet } from "./Sheet";

export class MovieAds extends Sheet {
	// wchs = [7.5, 6.33, 16, 9, 17.17, 5.5, 34.17, 4.5, 60.33, 8.33, 5.83, 6, 10.33, 8.83];

	constructor() {
		super("FA");
		const s = { font: { bold: true }, alignment: { horizontal: "center" } };
		this.rows.push([
			{ v: "N°SEMAINE", s },
			{ v: "CODE ENQ.", s },
			{ v: "VILLE", s },
			{ v: "CIRCUIT", s },
			{ v: "COMPLEXE", s },
			{ v: "N° DE SALLE", s },
			{ v: "SEANCE/FILM", s },
			{ v: "2D/3D", s },
			{ v: "AVANT SEANCE", s },
			{ v: "CONTENU", s },
			{ v: "ORDRE", s },
			{ v: "DUREE AVANT SEANCE", s },
			{ v: "DATE", s },
			{ v: "HORAIRE", s }
		]);
	}

	/**
	 *
	 * @param {typeof import("$lib/stores").init} $datas
	 */
	build($datas) {
		const movieAds = $datas.movieAds.flatMap((session) => {
			const flatten = session.ads.reduce((a, c) => {
				const title = $datas.titles.find((t) => t._id === c.titleId);
				if (c.group) {
					a.push(
						{ name: title.group.start, type: title.type },
						...c.group.ads.map((titleId) => {
							const { ...t } = $datas.titles.find((t) => t._id === titleId) || {
								_id: titleId,
								name: "???",
								type: "???"
							};

							if (t.type.toUpperCase() !== title.group.suffix.toUpperCase())
								t.type += ` ${title.group.suffix}`;

							t.type = t.type;

							return t;
						}),
						{ name: title.group.end, type: title.type }
					);
				} else a.push(title);

				return a;
			}, []);

			const duration = Momento.diffMinutes(session.start, session.end);
			const formatter = new Intl.DateTimeFormat("fr-FR", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit"
			});
			const [start, time] = formatter.format(new Date(session.start)).split(", ");

			const s = { alignment: { horizontal: "center" } };
			return flatten.map((ad, i) =>
				[
					{ v: $datas.week, s },
					{ v: $datas.code, s },
					{ v: $datas.city.toUpperCase(), s },
					{ v: $datas.circuit.toUpperCase(), s },
					{ v: $datas.name.toUpperCase(), s },
					{ v: session.room, s },
					session.film.toUpperCase(),
					{ v: session.dimension.toUpperCase(), s },
					ad.name.toUpperCase(),
					{ v: ad.type.toUpperCase(), s },
					{ v: i + 1, s },
					{ v: duration, s },
					{ v: start.toUpperCase(), s },
					{ v: time.toUpperCase().replace(":", "H"), s }
				].map((v, i) => this.count(v, i))
			);
		});
		this.rows.push(...movieAds);
	}
}
