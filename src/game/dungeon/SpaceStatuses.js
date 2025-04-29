class SpaceStatuses {
    constructor(){
        this.spaceName = "Default";
        this.healthHit = 0;
        this.movesHit = 0;
        this.color = 0x000000; // Default color (black)
    }
    getSpaceName() {
        return this.spaceName;
    }
}

class BlankSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Blank";
        this.healthHit = 0;
        this.movesHit = -1;
        this.color = 0xFFFFFF;
    }
}

class SpeederSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Speeder";
        this.healthHit = -5;
        this.movesHit = 0;
        this.color = 0x008223;
    }
}

class LavaSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Lava";
        this.healthHit = -50;
        this.movesHit = -10;
        this.color = 0xdb2114;
    }
}

class MudSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Mud";
        this.healthHit = -50;
        this.movesHit = -10;
        this.color = 0x452a28;
    }
}

class StartSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Start";
        this.healthHit = 0;
        this.movesHit = 0;
        this.color = 0x0000FF; // Blue
    }
}

class GoalSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Goal";
        this.healthHit = 0;
        this.movesHit = 0;
        this.color = 0x00FF00; // Green
    }
}

export {BlankSpace, SpeederSpace, LavaSpace, MudSpace, SpaceStatuses, StartSpace, GoalSpace};