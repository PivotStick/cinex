import XLSX from 'xlsx';
import { downloadFile } from '../functions/downloadFile';

export class ResultMaker {
	constructor(filename, $datas) {
		this.filename = filename;
		this.$datas = $datas;
		this.wb = XLSX.utils.book_new();
		this.wb.Props = { CreatedDate: new Date() };
	}

	setSheet(sheet) {
		sheet.build(this.$datas);
		this.wb.SheetNames.push(sheet.name);
		this.wb.Sheets[sheet.name] = sheet.format(XLSX.utils.aoa_to_sheet(sheet.rows));

		const border = { style: 'thin', color: { auto: 1 } };
		const r = /^[A-Z]+\d+$/;

		Object.keys(this.wb.Sheets[sheet.name]).forEach((ref) => {
			if (!r.test(ref)) return;
			const cell = this.wb.Sheets[sheet.name][ref];
			cell.t = `<t>${cell.v}</t>`;
			cell.s = {
				font: {
					name: 'Arial'
				},
				alignment: {
					vertical: 'center'
				},
				border: {
					top: border,
					bottom: border,
					left: border,
					right: border
				}
			};
		});
	}

	s2ab(s) {
		let buffer = new ArrayBuffer(s.length); //convert s to arrayBuffer
		let view = new Uint8Array(buffer); //create uint8array as viewer
		for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
		return buffer;
	}

	download() {
		const wbout = XLSX.write(this.wb, { bookType: 'xlsx', type: 'binary' });
		const blob = new Blob([this.s2ab(wbout)], {
			type: 'application/octet-stream'
		});

		downloadFile(blob, this.filename + '.xlsx');
	}
}
