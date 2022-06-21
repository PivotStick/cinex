export class Momento {
	/**
	 * @param {Date} date1
	 * @param {string} time
	 */
	static diffMinutes(date1, time) {
		const [hours, minutes] = time.split(":").map(Number);
		date1 = new Date(date1);
		const date2 = new Date(date1);

		date2.setHours(hours, minutes, 0, 0);

		return Math.round((date2 - date1) / 1000 / 60);
	}

	static diff(date1, date2) {
		const ms = Math.abs(date1 - date2);
		const days = Math.floor(ms / (1000 * 60 * 60 * 24));
		const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
		const minutes = Math.floor(ms / (1000 * 60)) % 60;
		const seconds = Math.floor(ms / 1000) % 60;

		return {
			days,
			hours,
			minutes,
			seconds,
			ms
		};
	}
}
