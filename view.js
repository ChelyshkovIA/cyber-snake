export class View {
	_getMarkup(text) {
		return `
			<h1>${text}</h1>
		`;
	}

	renderGameField(containerId) {
		const container = document.getElementById(containerId);
		if (!container) {
			this.isGameFieldExists = false;
			return;
		}

		this.isGameFieldExists = true;
		this.gameField = container;

		var mainSection = document.createElement("section");
		mainSection.innerHTML = this._getMarkup("welcome to snake");
		container.append(mainSection);
	}
}