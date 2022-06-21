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
			border: sides.reduce(
				(a, side) => {
					a[side] = border;
					return a;
				},
				{ top: undefined, left: undefined, bottom: undefined, right: undefined }
			)
		});

		$datas.leds.forEach((led) => {
			this[led.title.startsWith("panneaux") ? "left" : "right"].push(
				[
					{ v: led.title, s: { ...borderFor("top", "left"), font: { bold: true } } },
					{ v: "nombre dans le hall", s: borderFor("top") },
					{ v: led.hall || "-", s: borderFor("top", "right") }
				],
				[
					{ v: "", s: borderFor("left") },
					{ v: "nombre dans les couloirs", s: borderFor() },
					{ v: led.hallways || "-", s: borderFor("right") }
				],
				[
					{ v: led.subTitle, s: { ...borderFor("left"), font: { italic: true } } },
					{ v: "nombre en exterieur", s: borderFor("bottom") },
					{ v: led.outdoors || "-", s: borderFor("bottom", "right") }
				],
				...led.films
					.reduce((a, film, i) => {
						a[i] = film;
						return a;
					}, Array(5).fill())
					.map((_id, i, a) => {
						const b = {
							left: border,
							right: border
						};

						if (!_id) {
							b.bottom = b.top = { style: "hair", color: { theme: 1 } };
						}

						if (i === a.length - 1) {
							b.bottom = border;
						}

						return [
							{
								v: _id ? $datas.titles.find((t) => t._id === _id).name?.toUpperCase() : "",
								s: { border: b }
							}
						];
					}),
				[]
			);
		});
	}

	format(ws) {
		ws["!cols"] = [
			{ wpx: 438 },
			{ wpx: 168 },
			{ wpx: 58 },
			,
			{ wpx: 438 },
			{ wpx: 168 },
			{ wpx: 58 }
		];
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
