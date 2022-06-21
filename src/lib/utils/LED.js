import { Sheet } from "./Sheet";

export class LED extends Sheet {
	blockWidth = 3;
	margin = 1;

	constructor() {
		super("LED");
	}

	/**
	 *
	 * @param {typeof import("$lib/stores").init} $datas
	 */
	build($datas) {
		$datas.leds.forEach((led) => {
			this.rows.push(
				[led.title, "nombre dans le hall", led.hall || "-"],
				[, "nombre dans les couloirs", led.hallways || "-"],
				[led.subTitle, "nombre en exterieur", led.outdoors || "-"],
				...led.films.map((_id) => [$datas.titles.find((t) => t._id === _id).name])
			);
		});
	}

	format(ws) {
		ws["!cols"] = [{ width: 50 }, { width: 25 }];

		return ws;
	}
}
