class Player {
    constructor() {
        this.position = [0, 0];
        this.health = 200;
        this.moves = 4500;
    }

    move(space) {
        this.health -= space.Health;
        this.moves -= space.Moves;
    }
}