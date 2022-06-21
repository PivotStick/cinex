import { Momento } from "./Momento";
import { Sheet } from "./Sheet";

export class MovieAds extends Sheet {
	constructor() {
		super("FA");
		this.rows.push([
			"N°SEMAINE",
			"CODE ENQ.",
			"VILLE",
			"CIRCUIT",
			"COMPLEXE",
			"N° DE SALLE",
			"SEANCE/FILM",
			"2D/3D",
			"AVANT SEANCE",
			"CONTENU",
			"ORDRE",
			"DUREE AVANT SEANCE",
			"DATE",
			"HORAIRE"
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
							const { ...t } = $datas.titles.find((t) => t._id === titleId);
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

			return flatten.map((ad, i) =>
				[
					$datas.week,
					$datas.code,
					$datas.city.toUpperCase(),
					$datas.circuit.toUpperCase(),
					$datas.name.toUpperCase(),
					session.room,
					session.film.toUpperCase(),
					session.dimension.toUpperCase(),
					ad.name.toUpperCase(),
					ad.type.toUpperCase(),
					i + 1,
					duration,
					start.toUpperCase(),
					time.toUpperCase()
				].map((v, i) => this.count(v, i))
			);
		});
		this.rows.push(...movieAds);
	}
}
