import { GridConstants } from "../../config/Grid";

class Player {
    constructor() {
        this.position = [0, 0];
        this.health = 200;
        this.moves = 4500;
    }

    getPosition() {
        return [this.position[0], this.position[1]];
    }

    setPosition(x, y) {
        this.position = [x, y];
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = health;
    }

    getMoves() {
        return this.moves;
    }

    setMoves(moves) {
        this.moves = moves;
    }

    updateStatus(space) {
        this.health += space.healthHit;
        this.moves += space.movesHit;
    }

    moveLeft() {
        if (this.position[0] > 0) {
            this.position[0] -= 1;
        }
    }
    moveRight() {
        if (this.position[0] < 49) {
            this.position[0] += 1;
        }
    }
    moveUp() {
        if (this.position[1] > 0) {
            this.position[1] -= 1;
        }
    }
    moveDown() {
        if (this.position[1] < 49) {
            this.position[1] += 1;
        }
    }

    getSpritePosition(canvasWidth, canvasHeight) {
        const currentPosition = this.getPosition();
        const playerSpritePositionX = ((canvasWidth / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * currentPosition[0])) + (GridConstants.gridCellDimension / 2);
        const playerSpritePositionY = ((canvasHeight / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * currentPosition[1])) + (GridConstants.gridCellDimension / 2);
        return [playerSpritePositionX, playerSpritePositionY];
    }
}

export { Player };