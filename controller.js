export class Controller {
	constructor(view, model) {
		this.View  = view;
		this.Model = model;
	}

	CELL_TYPES = {
		SNAKE: "snake",
		FOOD: "food"
	}

	hardcodedCoords = [
		{x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2},
		{x: 4, y: 3},
		{x: 4, y: 4}, {x: 3, y: 4}, {x: 2, y: 4},
		{x: 2, y: 3}
	]

	start(gameContainerId) {
		this.Model.importStyles("snake/styles/main.css");
		this.View.renderGameField(gameContainerId);

		this.drawSnake();
	}

	async drawSnake() {
		const cellArr = this.View.getCellsByCoords(this.hardcodedCoords);
		for (let i = 0; i < cellArr.length; i++) {
			this.View.drawSquare(cellArr[i], this.CELL_TYPES.SNAKE);
			await new Promise((r) => {
				setTimeout(() => {r()}, 100);
			});
		}
	}
}