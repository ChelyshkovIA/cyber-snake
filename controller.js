import { CONST } from "./const.js";

export class Controller {
	constructor(view, model) {
		this.View  = view;
		this.Model = model;
	}

	MOVE_STATE = false;
	MAIN_DIRECTION = CONST.DIRECTIONS.TOP;
	MAIN_SPEED = CONST.SPEED_TYPES.FAST;
	SNAKE_HEAD_COORDS = Object.assign({}, CONST.DEFAULT_SNAKE_HEAD_COORDS);
	SNAKE_COORDS = Object.assign([], CONST.DEFAULT_SNAKE_COORDS);

	/**
	 * THIS IS THE MAIN GAME METHOD WHICH STARTS THE GAME.
	 * @param {string} gameContainerId Container ID for game.
	 */
	async start(gameContainerId) {
		this.Model.importStyles("snake/styles/main.css");
		this.View.renderGameField(gameContainerId, 20, 20);

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
		.forEach(snakeCell => this.View.drawSquare(snakeCell, CONST.CELL_TYPES.SNAKE));
	}

	async move() {
		switch (this.MAIN_DIRECTION) {
			case CONST.DIRECTIONS.TOP:
				--this.SNAKE_HEAD_COORDS.y;
				break;
			case CONST.DIRECTIONS.BOTTOM:
				++this.SNAKE_HEAD_COORDS.y;
				break;
			case CONST.DIRECTIONS.LEFT:
				--this.SNAKE_HEAD_COORDS.x;
				break;
			case CONST.DIRECTIONS.RIGHT:
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
		
		this.View.drawSquare(snakeHeadCell, CONST.CELL_TYPES.SNAKE);

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
				this.MAIN_DIRECTION = CONST.DIRECTIONS.TOP;
				break;
			case "ArrowDown":
				this.MAIN_DIRECTION = CONST.DIRECTIONS.BOTTOM;
				break;
			case "ArrowLeft":
				this.MAIN_DIRECTION = CONST.DIRECTIONS.LEFT;
				break;
			case "ArrowRight":
				this.MAIN_DIRECTION = CONST.DIRECTIONS.RIGHT;
				break;
			default:
				return;
		}
	}

	updateSnakeCoords() {
		this.SNAKE_COORDS = Object.assign([], CONST.DEFAULT_SNAKE_COORDS);
		this.SNAKE_HEAD_COORDS = Object.assign({}, CONST.DEFAULT_SNAKE_HEAD_COORDS);
	}
}