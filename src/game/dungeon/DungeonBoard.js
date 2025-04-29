import { BlankSpace, LavaSpace, MudSpace, SpeederSpace, SpaceStatuses, GoalSpace } from "./SpaceStatuses.js"

class DungeonBoard {
    
    BOARD_ROWS = 50;
    BOARD_COLS = 50;

    constructor() {
        this.generateEasyRandomBoard();
        this.addGoal(49, 49);
        this.addStart(0, 0);
    }

    addGoal(x, y) {
        /// Add a goal space at the specified coordinates
        if (this.board[x][y] instanceof SpaceStatuses) {
            this.board[x][y] = new GoalSpace();
        } else {
            console.error("Cannot place goal space on non-space tile.");
        }
    }

    addStart(x, y) {
        /// Add a start space at the specified coordinates
        if (this.board[x][y] instanceof SpaceStatuses) {
            this.board[x][y] = new SpaceStatuses();
        } else {
            console.error("Cannot place start space on non-space tile.");
        }
    }
    
    generateEasyRandomBoard() {
        // Initialize the board with null values
        this.board = Array.from({ length: this.BOARD_ROWS }, () => Array(this.BOARD_COLS).fill(null));

        // Fill board with random spaces with a bias towards BlankSpace
        for (let row = 0; row < this.BOARD_ROWS; row++) {
            for (let col = 0; col < this.BOARD_COLS; col++) {
                const randomNum = Math.floor(Math.random() * 10); // 10 to increase the chance of BlankSpace
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

    generateTrueRandomBoard() {
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