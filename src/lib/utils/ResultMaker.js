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
		this.wb.SheetNames.push(sheet.name);
		utils.book_append_sheet(this.wb, sheet.format(sheet.toWorkSheet()), sheet.name);

		const border = { style: "thin", color: { auto: 1 } };
		const r = /^[A-Z]+\d+$/;

		this.wb.Props.Object.keys(this.wb.Sheets[sheet.name]).forEach((ref) => {
			if (!r.test(ref)) return;
			const cell = this.wb.Sheets[sheet.name][ref];
			cell.s = {
				font: {
					name: "Arial"
				},
				alignment: {
					vertical: "center"
				},
				...(cell.s || {}),
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
