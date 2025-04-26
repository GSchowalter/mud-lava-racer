import { SpaceStatuses } from SpaceStatuses
import { Player } from Player

class DungeonBoard {
    
    BOARD_ROWS = 50;
    BOARD_COLS = 50;

    constructor() {
        this.board = Array.from(Array(this.BOARD_ROWS), () => new Array(this.BOARD_COLS).fill(SpaceStatuses.Blank));
        this.player = new Player();
        console.log("Dungeon Board constructed");
    }

    getSpace(x, y) {
        return this.board[x][y];
    }
    
}