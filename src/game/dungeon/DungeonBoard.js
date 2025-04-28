import { Player } from "./Player.js"
import { BlankSpace, LavaSpace, MudSpace, SpeederSpace, SpaceStatuses } from "./SpaceStatuses.js"

class DungeonBoard {
    
    BOARD_ROWS = 50;
    BOARD_COLS = 50;

    constructor() {
        this.generateRandomBoard();
        this.player = new Player();
        console.log("Dungeon Board constructed");
    }

    generateRandomBoard() {
        // Initialize the board with null values
        this.board = Array.from({ length: this.BOARD_ROWS }, () => Array(this.BOARD_COLS).fill(null));

        // Fill the board with random spaces
        for (let row = 0; row < this.BOARD_ROWS; row++) {
            for (let col = 0; col < this.BOARD_COLS; col++) {
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

    getSpace(x, y) {
        return this.board[x][y];
    }

    getSpaces() {
        return this.board;
    }

    // Define an iterator for the DungeonBoard that yields each space and its position
    // This abstracts the logic of iterating over the 2d array board
    *[Symbol.iterator]() {
        for (let row = 0; row < this.BOARD_ROWS; row++) {
            for (let col = 0; col < this.BOARD_COLS; col++) {
                yield { position: { x: row, y: col }, space: this.board[row][col] };
            }
        }
    }
    
}

export { DungeonBoard }