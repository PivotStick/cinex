import { utils } from "xlsx-js-style";
import { Sheet } from "./Sheet";

export class LED extends Sheet {
	blockWidth = 3;
	margin = 1;

	left = [];
	right = [];

	constructor() {
		super("LED");
	}

	/**
	 *
	 * @param {import("$lib/stores").Init} $datas
	 */
	build($datas) {
		const border = { style: "medium", color: { theme: 1 } };
		/**
		 * @param  {...("left" | "right" | "top" | "bottom")} sides
		 */
		const borderFor = (...sides) => ({
			border: sides.reduce((a, side) => {
				a[side] = border;
				return a;
			}, {})
		});

		$datas.leds.forEach((led) => {
			this[led.title.startsWith("panneaux") ? "left" : "right"].push(
				[
					{ v: led.title, s: borderFor("top", "left") },
					{ v: "nombre dans le hall", s: borderFor("top") },
					{ v: led.hall || "-", s: borderFor("top", "right") }
				],
				[
					{ v: "", s: borderFor("left") },
					{ v: "nombre dans les couloirs" },
					{ v: led.hallways || "-", s: borderFor("right") }
				],
				[
					{ v: led.subTitle, s: borderFor("bottom", "left") },
					{ v: "nombre en exterieur", s: borderFor("bottom") },
					{ v: led.outdoors || "-", s: borderFor("bottom", "right") }
				],
				...led.films.map((_id) => [$datas.titles.find((t) => t._id === _id).name])
			);
		});
	}

	format(ws) {
		ws["!cols"] = [{ width: 50 }, { width: 25 }, , , { width: 50 }, { width: 25 }];
		return ws;
	}

	toWorkSheet() {
		const sheet = utils.aoa_to_sheet(this.left);

		utils.sheet_add_aoa(sheet, this.right, {
			origin: utils.decode_cell("E1")
		});

		return sheet;
	}
}
