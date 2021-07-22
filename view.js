import {CONST} from "./const.js";

export class View {
	renderGameField(containerId, sizeX = 10, sizeY = 10) {
		const container = document.getElementById(containerId);
		if (!container) {
			this.isGameFieldExists = false;
			return;
		}

		this.isGameFieldExists = true;
		this.gameField = container;

		let markup = document.createElement("section");
		markup.className = "game-section";
		markup.innerHTML = `<div class="header">
			<h1 class="header-text">SNAKE</h1>
		</div>`;

		const gameField = document.createElement("div");
		gameField.className = "game-field";

		for (let i = 0; i < sizeX; i++) {
			const row = document.createElement("div");
			row.className = "row";

			for (let j = 0; j < sizeY; j++) {
				const square = document.createElement("div");
				square.className = "cell";
				row.append(square);
			}

			gameField.append(row);
		}

		markup.append(gameField);
		this.gameField.append(markup);
	}

	clearGameField() {
		this.gameField.querySelectorAll(".cell").forEach(cell => cell.className = "cell");
	}

	getCellsByCoords(coordsArr) {
		const rows = this.gameField.querySelectorAll(`.${CONST.CSS_CLASSES.ROW}`);
		return coordsArr.map(cellCoords => {
			const row = rows[cellCoords.x];
			return row.querySelectorAll(`.${CONST.CSS_CLASSES.CELL}`)[cellCoords.y];
		});
	}

	getCellByCoords(coordsObj) {
		const rows = this.gameField.querySelectorAll(`.${CONST.CSS_CLASSES.ROW}`);
		const row = rows[coordsObj.y];
		return row.querySelectorAll(`.${CONST.CSS_CLASSES.CELL}`)[coordsObj.x];
	}

	drawSquare(cell, squareType) {
		cell.classList.add(`${CONST.CSS_CLASSES.CELL}--${squareType}`);
	}

	hideSquare(cell) {
		cell.className = CONST.CSS_CLASSES.CELL;
	}
}