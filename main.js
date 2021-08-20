import { View } from "./view.js";
import { Model } from "./model.js";
import { Controller } from "./controller.js";

<<<<<<< HEAD
=======
/**
 * THE MAIN GAME FUNCTION.
 * To start game just call this function and set game container ID as first parameter.
 * @param {string} containerId 
 * @returns {void}
 */
>>>>>>> 5e4484c5b9e106d1f9c346a20f2e7f9fa31250f5
export function importGame(containerId) {
	new Controller(new View(), new Model()).start(containerId);
}