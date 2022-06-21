export class Regex {
	static escape(string) {
		return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	}
}
