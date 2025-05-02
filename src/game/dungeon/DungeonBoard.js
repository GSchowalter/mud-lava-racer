import { BlankSpace, LavaSpace, MudSpace, SpeederSpace, SpaceStatuses, GoalSpace, StartSpace } from "./SpaceStatuses.js";
import { GridConstants } from "../../config/Grid.config.js";

/**
 * Represents the dungeon board in the game.
 * The dungeon board is a grid of spaces, each with different properties and effects on the player.
 */
class DungeonBoard {
    /**
     * The number of rows in the dungeon board.
     * @type {number}
     */
    boardRows;

    /**
     * The number of columns in the dungeon board.
     * @type {number}
     */
    boardCols;

    /**
     * The 2D array representing the dungeon board.
     * Each cell contains a space object (e.g., BlankSpace, LavaSpace).
     * @type {Array<Array<SpaceStatuses>>}
     */
    board;

    /**
     * Creates a new DungeonBoard instance.
     * Initializes the board with an easy random layout and places the start and goal spaces.
     */
    constructor() {
        this.boardRows = GridConstants.gridCells;
        this.boardCols = GridConstants.gridCells;
        this.generateEasyRandomBoard();
        this.addGoal(this.boardRows - 1, this.boardCols - 1);
        this.addStart(0, 0);
    }

    /**
     * Adds a goal space at the specified coordinates.
     * @param {number} x - The x-coordinate of the goal space.
     * @param {number} y - The y-coordinate of the goal space.
     */
    addGoal(x, y) {
        if (this.board[x][y] instanceof SpaceStatuses) {
            this.board[x][y] = new GoalSpace();
        } else {
            console.error("Cannot place goal space on non-space tile.");
        }
    }

    /**
     * Adds a start space at the specified coordinates.
     * @param {number} x - The x-coordinate of the start space.
     * @param {number} y - The y-coordinate of the start space.
     */
    addStart(x, y) {
        if (this.board[x][y] instanceof SpaceStatuses) {
            this.board[x][y] = new StartSpace();
        } else {
            console.error("Cannot place start space on non-space tile.");
        }
    }

    /**
     * Generates a dungeon board with an easy random layout.
     * The board is biased towards BlankSpace tiles.
     */
    generateEasyRandomBoard() {
        this.board = Array.from({ length: this.boardRows }, () => Array(this.boardCols).fill(null));

        for (let row = 0; row < this.boardRows; row++) {
            for (let col = 0; col < this.boardCols; col++) {
                const randomNum = Math.floor(Math.random() * 10); // Bias towards BlankSpace
                switch (randomNum) {
                    case 0:
                        this.board[row][col] = new BlankSpace();
                        break;
                    case 1:
                        this.board[row][col] = new SpeederSpace();
                        break;
                    case 2:
                        this.board[row][col] = new LavaSpace();
                        break;
                    case 3:
                        this.board[row][col] = new MudSpace();
                        break;
                    default:
                        this.board[row][col] = new BlankSpace(); // Default to BlankSpace
                }
            }
        }
    }

    /**
     * Generates a dungeon board with a true random layout.
     * Each tile is randomly assigned a space type.
     */
    generateTrueRandomBoard() {
        this.board = Array.from({ length: this.boardRows }, () => Array(this.boardCols).fill(null));

        for (let row = 0; row < this.boardRows; row++) {
            for (let col = 0; col < this.boardCols; col++) {
                const randomNum = Math.floor(Math.random() * 4);
                switch (randomNum) {
                    case 0:
                        this.board[row][col] = new BlankSpace();
                        break;
                    case 1:
                        this.board[row][col] = new SpeederSpace();
                        break;
                    case 2:
                        this.board[row][col] = new LavaSpace();
                        break;
                    case 3:
                        this.board[row][col] = new MudSpace();
                        break;
                }
            }
        }
    }

    /**
     * Resets the dungeon board to its initial state.
     * Generates a new easy random layout and places the start and goal spaces.
     */
    reset() {
        this.generateEasyRandomBoard();
        this.addGoal(this.boardRows - 1, this.boardCols - 1);
        this.addStart(0, 0);
    }

    /**
     * Gets the space at the specified coordinates.
     * @param {number} x - The x-coordinate of the space.
     * @param {number} y - The y-coordinate of the space.
     * @returns {SpaceStatuses} The space at the specified coordinates.
     */
    getSpace(x, y) {
        return this.board[x][y];
    }

    /**
     * Gets the entire dungeon board.
     * @returns {Array<Array<SpaceStatuses>>} The 2D array representing the dungeon board.
     */
    getSpaces() {
        return this.board;
    }

    /**
     * Iterates over all spaces in the dungeon board.
     * Yields each space along with its position.
     * @yields {Object} An object containing the position and space.
     * @yields {Object.position} The position of the space as { x, y }.
     * @yields {Object.space} The space object at the position.
     */
    *[Symbol.iterator]() {
        for (let row = 0; row < this.boardRows; row++) {
            for (let col = 0; col < this.boardCols; col++) {
                yield { position: { x: row, y: col }, space: this.board[row][col] };
            }
        }
    }
}

export { DungeonBoard };