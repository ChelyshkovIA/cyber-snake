export class Model {
	/**
	 * Constants prop
	 */
	CONST = {
		LOCAL_STYLES_PATH: "cyber-snake/styles/main.css",
		FONT_STYLES_PATH: "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
	}
	/**
	 * Imports styles to the document.
	 * @param {string} href Value for "href" attribute.
	 * @returns {void}
	 */
	importStyles(href) {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = href;
		document.head.append(link);
	}
}