import { View } from "./view.js";
import { Model } from "./model.js";
import { Controller } from "./controller.js";

export function importGame(containerId) {
	new Controller(new View(), new Model()).start(containerId);
}