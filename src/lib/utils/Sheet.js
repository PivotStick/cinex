import { utils } from "xlsx-js-style";

export class Sheet {
	rows = [];
	wchs = [];

	constructor(name) {
		this.name = name;
	}

	build($datas) {}

	count(value, index) {
		const count = `${value}`.length;
		const n = this.wchs[index] || 0;
		this.wchs[index] = n < count ? count : n;

		return value;
	}

	/**
	 * @param {import("xlsx-js-style").WorkSheet} ws
	 */
	format(ws) {
		ws["!cols"] = this.wchs.map((wch) => ({ wch }));
		ws["!rows"] = this.rows.map((_) => ({ hpx: 30 }));
		return ws;
	}

	toWorkSheet() {
		return utils.aoa_to_sheet(this.rows);
	}
}
