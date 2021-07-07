export class View {
	_getMarkup() {
		return `
		<section class="game-section">
			<div class="header">
				<h1 class="header-text">SNAKE</h1>
			</div>

			<div class="game-field">
				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>

				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>

				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>

				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>

				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>

				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>

				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>

				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>

				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>
			</div>
		</section>
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

		this.gameField.innerHTML = this._getMarkup();
	}
}