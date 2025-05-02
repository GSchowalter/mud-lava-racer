import { SpaceConstants } from "../../config/Space.config";

/**
 * Represents the base class for different types of spaces in the game.
 */
class SpaceStatuses {
    /**
     * Creates a new SpaceStatuses instance.
     */
    constructor() {
        /**
         * The name of the space.
         * @type {string}
         */
        this.spaceName = "Default";

        /**
         * The health impact of the space.
         * @type {number}
         */
        this.healthHit = 0;

        /**
         * The moves impact of the space.
         * @type {number}
         */
        this.movesHit = 0;

        /**
         * The color of the space, represented as a hexadecimal value.
         * @type {number}
         */
        this.color = SpaceConstants.blankSpaceColor; // White
    }

    /**
     * Gets the color of the space.
     * @returns {number} The color of the space.
     */
    getColor() {
        return this.color;
    }

    /**
     * Sets the color of the space.
     * @param {number} color - The new color of the space.
     */
    getSpaceName() {
        return this.spaceName;
    }
}

/**
 * Represents a blank space in the game.
 * A blank space has no health impact and reduces moves by 1.
 */
class BlankSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Blank";
        this.healthHit = 0;
        this.movesHit = -1;
    }
}

/**
 * Represents a speeder space in the game.
 * A speeder space reduces health by 5 but has no moves impact.
 */
class SpeederSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Speeder";
        this.healthHit = -5;
        this.movesHit = 0;
        this.color = SpaceConstants.speederSpaceColor;
    }
}

/**
 * Represents a lava space in the game.
 * A lava space reduces health by 50 and moves by 10.
 */
class LavaSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Lava";
        this.healthHit = -50;
        this.movesHit = -10;
        this.color = SpaceConstants.lavaSpaceColor;
    }
}

/**
 * Represents a mud space in the game.
 * A mud space reduces health by 50 and moves by 10.
 */
class MudSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Mud";
        this.healthHit = -10;
        this.movesHit = -5;
        this.color = SpaceConstants.mudSpaceColor;
    }
}

/**
 * Represents the starting space in the game.
 * A start space has no health or moves impact.
 */
class StartSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Start";
        this.healthHit = 0;
        this.movesHit = 0;
    }
}

/**
 * Represents the goal space in the game.
 * A goal space has no health or moves impact.
 */
class GoalSpace extends SpaceStatuses {
    constructor() {
        super();
        this.spaceName = "Goal";
        this.healthHit = 0;
        this.movesHit = 0;
        this.color = SpaceConstants.goalSpaceColor;
    }
}

export { BlankSpace, SpeederSpace, LavaSpace, MudSpace, SpaceStatuses, StartSpace, GoalSpace };