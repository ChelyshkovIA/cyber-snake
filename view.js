export class View {
	cssClasses = {
		ROW: "row",
		CELL: "cell"
	}

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

	getCellsByCoords(coordsArr) {
		const rows = this.gameField.querySelectorAll(`.${this.cssClasses.ROW}`);
		return coordsArr.map(cellCoords => {
			const row = rows[cellCoords.x];
			return row.querySelectorAll(`.${this.cssClasses.CELL}`)[cellCoords.y];
		});
	}

	getCellByCoords(coordsObj) {
		const rows = this.gameField.querySelectorAll(`.${this.cssClasses.ROW}`);
		const row = rows[coordsObj.y];
		return row.querySelectorAll(`.${this.cssClasses.CELL}`)[coordsObj.x];
	}

	drawSquare(cell, squareType) {
		cell.classList.add(`${this.cssClasses.CELL}--${squareType}`);
	}

	hideSquare(cell) {
		cell.className = this.cssClasses.CELL;
	}
}