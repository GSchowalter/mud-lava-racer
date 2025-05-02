import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { GameConstants } from '../../config/Game.config';

/**
 * Represents the Win scene in the game.
 * The Win scene is displayed when the player successfully completes the game.
 */
export class Win extends Scene {
    /**
     * Initializes the Win scene.
     */
    constructor() {
        super('Win');
    }

    /**
     * Creates the Win scene.
     * Sets up the background, displays the "You Win!" message, and emits a scene-ready event.
     */
    create() {
        // Set the background color to green
        this.cameras.main.setBackgroundColor(0x00ff00);

        // Add a semi-transparent background image
        this.add.image(512, 384, 'background').setAlpha(0.5);

        // Add the "You Win!" text
        this.add.text(GameConstants.windowHeight / 2, GameConstants.windowWidth / 2, 'You Win!', {
            fontFamily: 'Arial Black',
            fontSize: 64,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5, 0.5).setDepth(100);

        // Emit an event to indicate the scene is ready
        EventBus.emit('current-scene-ready', this);
    }

    /**
     * Changes the current scene to the Main Menu.
     */
    changeScene() {
        this.scene.start('MainMenu');
    }

    /**
     * Starts the Main Menu scene and resets the game state.
     * Emits a reset event before transitioning to the Main Menu.
     */
    start() {
        EventBus.emit('reset');
        this.scene.start('MainMenu');
    }

    /**
     * Resets the game state and transitions to the Main Menu scene.
     * Emits a reset event before transitioning.
     */
    reset() {
        EventBus.emit('reset');
        this.scene.start('MainMenu');
    }
}