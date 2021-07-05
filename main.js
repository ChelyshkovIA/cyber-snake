import { View } from "./view.js";
import { Model } from "./model.js";
import { Controller } from "./controller.js";

new Controller(new View(), new Model()).start("container");