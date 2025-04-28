import { Player } from "./Player.js"
import { BlankSpace, LavaSpace, SpaceStatuses } from "./SpaceStatuses.js"

class DungeonBoard {
    
    BOARD_ROWS = 50;
    BOARD_COLS = 50;

    constructor() {
        this.board = Array.from(Array(this.BOARD_ROWS), () => new Array(this.BOARD_COLS).fill(new LavaSpace));
        this.player = new Player();
        console.log("Dungeon Board constructed");
    }

    getSpace(x, y) {
        return this.board[x][y];
    }
    
}

export { DungeonBoard }