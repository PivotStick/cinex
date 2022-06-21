import { utils, writeFile } from "xlsx-js-style";

export class ResultMaker {
	constructor(filename, $datas) {
		this.filename = filename;
		this.$datas = $datas;
		this.wb = utils.book_new();
		this.wb.Props = { CreatedDate: new Date() };
	}

	/**
	 * @param {import("./Sheet").Sheet} sheet
	 */
	setSheet(sheet) {
		sheet.build(this.$datas);
		utils.book_append_sheet(this.wb, sheet.format(sheet.toWorkSheet()), sheet.name);

		const border = { style: "thin", color: { auto: 1 } };
		const r = /^[A-Z]+\d+$/;
		const s = this.wb.Sheets[sheet.name];

		Object.keys(s).forEach((ref) => {
			if (!r.test(ref)) return;
			const cell = s[ref];
			cell.s = {
				...(cell.s || {}),
				font: {
					name: "Arial",
					sz: 12,
					...(cell.s?.font || {})
				},
				alignment: {
					vertical: "center",
					...(cell.s?.alignment || {})
				},
				border: {
					top: border,
					bottom: border,
					left: border,
					right: border,
					...(cell.s?.border || {})
				}
			};
		});
	}

	download() {
		writeFile(this.wb, this.filename + ".xlsx");
	}
}
