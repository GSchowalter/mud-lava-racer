import { GridConstants } from "../../config/Grid.config";
import { EventBus } from "../EventBus.js";

/**
 * Represents the player in the game.
 */
class Player {
    /**
     * Creates a new Player instance.
     */
    constructor() {
        /**
         * The player's position on the grid as [x, y].
         * @type {number[]}
         */
        this.position = [0, 0];

        /**
         * The player's health.
         * @type {number}
         */
        this.health = 200;

        /**
         * The player's remaining moves.
         * @type {number}
         */
        this.moves = 4500;
    }

    /**
     * Gets the player's current position.
     * @returns {number[]} The player's position as [x, y].
     */
    getPosition() {
        return [this.position[0], this.position[1]];
    }

    /**
     * Sets the player's position.
     * @param {number} x - The x-coordinate of the player's position.
     * @param {number} y - The y-coordinate of the player's position.
     */
    setPosition(x, y) {
        this.position = [x, y];
    }

    /**
     * Gets the player's current health.
     * @returns {number} The player's health.
     */
    getHealth() {
        return this.health;
    }

    /**
     * Sets the player's health.
     * @param {number} health - The new health value.
     */
    setHealth(health) {
        this.health = health;
    }

    /**
     * Gets the player's remaining moves.
     * @returns {number} The player's remaining moves.
     */
    getMoves() {
        return this.moves;
    }

    /**
     * Sets the player's remaining moves.
     * @param {number} moves - The new moves value.
     */
    setMoves(moves) {
        this.moves = moves;
    }

    /**
     * Updates the player's status based on the given space.
     * @param {Object} space - The space object containing health and moves adjustments.
     * @param {number} space.healthHit - The health adjustment.
     * @param {number} space.movesHit - The moves adjustment.
     */
    updateStatus(space) {
        this.health += space.healthHit;
        this.moves += space.movesHit;
        EventBus.emit('player-state-changed', this);
    }

    /**
     * Moves the player one step to the left.
     */
    moveLeft() {
        if (this.position[0] > 0) {
            this.position[0] -= 1;
        }
    }

    /**
     * Moves the player one step to the right.
     */
    moveRight() {
        if (this.position[0] < 49) {
            this.position[0] += 1;
        }
    }

    /**
     * Moves the player one step up.
     */
    moveUp() {
        if (this.position[1] > 0) {
            this.position[1] -= 1;
        }
    }

    /**
     * Moves the player one step down.
     */
    moveDown() {
        if (this.position[1] < 49) {
            this.position[1] += 1;
        }
    }

    /**
     * Calculates the player's sprite position on the canvas.
     * @param {number} canvasWidth - The width of the canvas.
     * @param {number} canvasHeight - The height of the canvas.
     * @returns {number[]} The player's sprite position as [x, y].
     */
    getSpritePosition(canvasWidth, canvasHeight) {
        const currentPosition = this.getPosition();
        const playerSpritePositionX = ((canvasWidth / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * currentPosition[0])) + (GridConstants.gridCellDimension / 2);
        const playerSpritePositionY = ((canvasHeight / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * currentPosition[1])) + (GridConstants.gridCellDimension / 2);
        return [playerSpritePositionX, playerSpritePositionY];
    }

    /**
     * Resets the player's state to the initial values.
     */
    reset() {
        console.log("Player reset");
        this.setPosition(0, 0);
        this.setHealth(200);
        this.setMoves(4500);
        EventBus.emit('player-state-changed', this);
    }
}

export { Player };