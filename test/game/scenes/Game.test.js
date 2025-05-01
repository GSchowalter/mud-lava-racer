import { Game } from "../../../src/game/scenes/Game.js";
import assert from "assert";

const game = new Game();
assert(game instanceof Game, "Game should be an instance of Game class");