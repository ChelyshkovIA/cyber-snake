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

	CENTER_COORDS = {x: 9, y: 4}

	MOVE_STATE = false;
	MAIN_DIRECTION = this.DIRECTIONS.TOP;
	MAIN_SPEED = this.SPEED_TYPES.FAST;
	SNAKE_HEAD_COORDS;
	SNAKE_COORDS;

	/**
	 * THIS IS MAIN GAME METHOD WHICH STARTS THE GAME.
	 * @param {string} gameContainerId Container ID for game.
	 */
	async start(gameContainerId) {
		this.Model.importStyles("snake/styles/main.css");
		this.View.renderGameField(gameContainerId, 20, 20);
		this.updateSnakeCoords();

		this.drawSnake();

		document.addEventListener("keyup", event => this.changeDirection(event));
		document.addEventListener("keyup", event => this.startMoving(event));
	}

	async startMoving(event) {
		if (event.code === "Enter" && !this.MOVE_STATE) {
			this.MOVE_STATE = true;
			await this.generateMoving();
		}
	}

	drawSnake() {
		Object.assign([], this.SNAKE_COORDS)
		.map(snakeCoord => this.View.getCellByCoords(snakeCoord))
		.forEach(snakeCell => this.View.drawSquare(snakeCell, this.CELL_TYPES.SNAKE));
	}

	async move() {
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

		await this.renderSnake();
	}

	renderSnake() {
		this.SNAKE_COORDS.push(Object.assign({}, this.SNAKE_HEAD_COORDS));
		const snakeTailCoords = this.SNAKE_COORDS.shift();
		const snakeHeadCoords = Object.assign({}, this.SNAKE_HEAD_COORDS);

		const snakeTailCell = this.View.getCellByCoords(snakeTailCoords);
		const snakeHeadCell = this.View.getCellByCoords(snakeHeadCoords);
		
		this.View.drawSquare(snakeHeadCell, this.CELL_TYPES.SNAKE);

		return new Promise((r) => {
			setTimeout(() => {
				this.View.hideSquare(snakeTailCell);
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
				this.View.clearGameField();
				this.updateSnakeCoords();
				this.drawSnake();
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

	updateSnakeCoords() {
		this.SNAKE_COORDS = [{x: 4, y: 4}, {x: 5, y: 4}, {x:6, y: 4}, {x:7, y: 4}, {x:8, y: 4}, {x:9, y: 4}];
		this.SNAKE_HEAD_COORDS = {x: 9, y: 4};
	}
}