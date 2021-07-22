export class Controller {
	constructor(view, model) {
		this.View  = view;
		this.Model = model;
	}

	CELL_TYPES = {
		SNAKE: "snake",
		FOOD: "food"
	}

	DIRECTIONS = {
		TOP: "TOP",
		BOTTOM: "BOTTOM",
		LEFT: "LEFT",
		RIGHT: "RIGHT"
	}

	SPEED_TYPES = {
		VERY_SLOW: 1000,
		SLOW: 500,
		MEDIUM: 200,
		FAST: 150,
		SUPER_FAST: 100,
		NIGHTMARE: 50
	}

	CENTER_COORDS = {x: 4, y: 4}

	MOVE_STATE = false;
	MAIN_DIRECTION = this.DIRECTIONS.TOP;
	MAIN_SPEED = this.SPEED_TYPES.FAST;
	SNAKE_HEAD_COORDS = Object.assign({}, this.CENTER_COORDS);

	async start(gameContainerId) {
		this.Model.importStyles("snake/styles/main.css");
		this.View.renderGameField(gameContainerId);

		document.addEventListener("keyup", (event) => {this.changeDirection(event)});
		
		document.addEventListener("keyup", async (event) => {
			if (event.code === "Enter" && !this.MOVE_STATE) {
				this.MOVE_STATE = true;
				await this.generateMoving();
			}
		});
	}

	async drawSnake() {
		const cellArr = this.View.getCellsByCoords(this.snakeCoords);
		for (let i = 0; i < cellArr.length; i++) {
			this.View.drawSquare(cellArr[i], this.CELL_TYPES.SNAKE);
			await new Promise((r) => {
				setTimeout(() => {r()}, this.MAIN_SPEED);
			});
		}
	}

	move() {
		switch (this.MAIN_DIRECTION) {
			case this.DIRECTIONS.TOP:
				--this.SNAKE_HEAD_COORDS.y;
				break;
			case this.DIRECTIONS.BOTTOM:
				++this.SNAKE_HEAD_COORDS.y;
				break;
			case this.DIRECTIONS.LEFT:
				--this.SNAKE_HEAD_COORDS.x;
				break;
			case this.DIRECTIONS.RIGHT:
				++this.SNAKE_HEAD_COORDS.x;
				break;
			default: return;
		}

		const cell = this.View.getCellByCoords(this.SNAKE_HEAD_COORDS);
		this.View.drawSquare(cell, this.CELL_TYPES.SNAKE);

		return new Promise((r) => {
			setTimeout(() => {
				this.View.hideSquare(cell);
				r();
			}, this.MAIN_SPEED);
		});
	}

	async generateMoving() {
		let isCorrectMove = true;

		while(isCorrectMove) {
			try {
				await this.move();
			} catch {
				isCorrectMove = false;
				this.SNAKE_HEAD_COORDS = Object.assign({}, this.CENTER_COORDS);
				this.MOVE_STATE = false;
			}
		}
	}

	changeDirection(event) {
		switch (event.code) {
			case "ArrowUp":
				this.MAIN_DIRECTION = this.DIRECTIONS.TOP;
				break;
			case "ArrowDown":
				this.MAIN_DIRECTION = this.DIRECTIONS.BOTTOM;
				break;
			case "ArrowLeft":
				this.MAIN_DIRECTION = this.DIRECTIONS.LEFT;
				break;
			case "ArrowRight":
				this.MAIN_DIRECTION = this.DIRECTIONS.RIGHT;
				break;
			default:
				return;
		}
	}
}