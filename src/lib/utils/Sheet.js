import { utils } from "xlsx-js-style";

export class Sheet {
	rows = [];
	wchs = [];

	constructor(name) {
		this.name = name;
	}

	build($datas) {}

	count(value, index) {
		const count = `${value}`.length * 1.5;
		this.wchs[index] = (this.wchs[index] || 0) < count ? count : this.wchs[index];

		return value;
	}

	/**
	 * @param {import("xlsx-js-style").WorkSheet} ws
	 */
	format(ws) {
		ws["!cols"] = this.wchs.map((wch) => ({ wch }));
		return ws;
	}

	toWorkSheet() {
		return utils.aoa_to_sheet(this.rows);
	}
}
