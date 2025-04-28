class SpaceStatuses {
    constructor(){

    }
}

class BlankSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Blank";
        this.healthHit = 0;
        this.movesHit = -1;
        
    }
}

class SpeederSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Speeder";
        this.healthHit = -5;
        this.movesHit = 0;
    }
        
}

class LavaSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Lava";
        this.healthHit = -50;
        this.movesHit = -10;
        
    }
}

class MudSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Mud";
        this.healthHit = -50;
        this.movesHit = -10;
    }
}

export {BlankSpace, SpeederSpace, LavaSpace, MudSpace, SpaceStatuses}