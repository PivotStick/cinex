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
	 * @param {import("xlsx").WorkSheet} ws
	 */
	format(ws) {
		ws['!cols'] = this.wchs.map((wch) => ({ wch }));
		return ws;
	}
}
