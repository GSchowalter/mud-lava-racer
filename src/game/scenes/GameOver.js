import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../dungeon/Player';
import { GameConstants } from '../../config/Game.config';

/**
 * Represents the Game Over scene in the game.
 * The Game Over scene is displayed when the player loses the game.
 */
export class GameOver extends Scene {
    /**
     * Initializes the Game Over scene.
     */
    constructor() {
        super('GameOver');
    }

    /**
     * Creates the Game Over scene.
     * Sets up the background, displays the "Game Over" message, and emits a scene-ready event.
     */
    create() {
        // Set the background color to red
        this.cameras.main.setBackgroundColor(0xff0000);

        // Add a semi-transparent background image
        this.add.image(GameConstants.windowHeight / 2, GameConstants.windowWidth / 2, 'background').setAlpha(0.5);

        // Add the "Game Over" text
        this.add.text(GameConstants.windowHeight / 2, GameConstants.windowWidth / 2, 'Game Over', {
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
     * Starts the Main Menu scene and resets the game state.
     * Emits a reset event before transitioning to the Main Menu.
     */
    start() {
        EventBus.emit('reset');
        this.scene.start('MainMenu');
    }

    /**
     * Resets the game state and switches back to the Game scene.
     * This allows the player to retry on the same board without resetting the entire game.
     */
    reset() {
        console.log("GameOver reset");
        this.scene.switch('Game');
    }
}
