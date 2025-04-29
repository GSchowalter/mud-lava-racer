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
        console.log("Update status");
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
}

export { Player };