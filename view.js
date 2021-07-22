import {CONST} from "./const.js";

export class View {
	/**
	 * Renders game in document container.
	 * @param {string} containerId Document container ID.
	 * @param {number} sizeX Snake field height (squares).
	 * @param {number} sizeY Snake field width (squares).
	 * @returns {void} 
	 */
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

	/**
	 * Clears snake game field.
	 * @returns {void}
	 */
	clearGameField() {
		this.gameField.querySelectorAll(".cell").forEach(cell => cell.className = "cell");
	}

	/**
	 * Returns cells array by coordinates array.
	 * @param {Object[]} coordsArr Coordinates array.
	 * @param {number} coordsArr[i].x X-coordinate.
	 * @param {number} coordsArr[i].y Y-coordinate.
	 * @returns {Object[]} Array of cells.
	 */
	getCellsByCoords(coordsArr) {
		const rows = this.gameField.querySelectorAll(`.${CONST.CSS_CLASSES.ROW}`);
		return coordsArr.map(cellCoords => {
			const row = rows[cellCoords.x];
			return row.querySelectorAll(`.${CONST.CSS_CLASSES.CELL}`)[cellCoords.y];
		});
	}

	/**
	 * Returns cell by coordinates.
	 * @param {Object} coordsObj Coordinates.
	 * @param {number} coordsObj.x X-coordinate.
	 * @param {number} coordsObj.y Y-coordinate.
	 * @returns {Object}
	 */
	getCellByCoords(coordsObj) {
		const rows = this.gameField.querySelectorAll(`.${CONST.CSS_CLASSES.ROW}`);
		const row = rows[coordsObj.y];
		return row.querySelectorAll(`.${CONST.CSS_CLASSES.CELL}`)[coordsObj.x];
	}

	/**
	 * Draws square on the snake game field by type.
	 * @param {Object} cell Cell element.
	 * @param {string} squareType Square type. Coming from CONST.CELL_TYPES constants.
	 * @returns {void}
	 */
	drawSquare(cell, squareType) {
		cell.classList.add(`${CONST.CSS_CLASSES.CELL}--${squareType}`);
	}

	/**
	 * Hides square on the snake game field.
	 * @param {Object} cell Cell element on.
	 */
	hideSquare(cell) {
		cell.className = CONST.CSS_CLASSES.CELL;
	}
}