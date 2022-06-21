/**
 * @param {HTMLElement} node
 * @param {boolean} condition
 */
export const intoView = (node, condition) => {
	const update = (c) => {
		if (c) node.scrollIntoView({ block: "center", behavior: "smooth" });
	};

	update(condition);
	return { update };
};
