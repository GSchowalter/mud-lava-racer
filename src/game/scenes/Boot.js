import { Scene } from 'phaser';

/**
 * Represents the Boot scene in the game.
 * The Boot scene is responsible for loading minimal assets and transitioning to the Preloader scene.
 */
export class Boot extends Scene {
    /**
     * Initializes the Boot scene.
     */
    constructor() {
        super('Boot');
    }

    /**
     * Preloads minimal assets required for the game.
     * This method loads the background image used in subsequent scenes.
     */
    preload() {
        this.load.image('background', 'assets/bg.png');
    }

    /**
     * Creates the Boot scene and transitions to the Preloader scene.
     */
    create() {
        this.scene.start('Preloader');
    }
}
