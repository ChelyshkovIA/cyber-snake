export class Controller {
	constructor(view, model) {
		this.View  = view;
		this.Model = model;
	}

	start(gameContainerId) {
		this.Model.importStyles("snake/styles/main.css");
		this.View.renderGameField(gameContainerId);
	}
}