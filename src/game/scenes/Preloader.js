import { Scene } from 'phaser';

/**
 * Represents the Preloader scene in the game.
 * The Preloader scene is responsible for displaying a loading bar and preloading assets for the game.
 */
export class Preloader extends Scene {
    /**
     * Initializes the Preloader scene.
     */
    constructor() {
        super('Preloader');
    }

    /**
     * Initializes the Preloader scene by setting up the loading bar and background.
     * This method is called before the `preload` method.
     */
    init() {
        // Add the background image
        this.add.image(512, 384, 'background');

        // Add a border for the loading bar
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        // Add the loading bar
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        // Update the loading bar width based on the loading progress
        this.load.on('progress', (progress) => {
            bar.width = 4 + (460 * progress);
        });
    }

    /**
     * Preloads assets required for the game.
     * This method sets the asset path and loads the necessary assets.
     */
    preload() {
        this.load.setPath('assets');
        this.load.image('knight', 'knight.png');
    }

    /**
     * Creates the Preloader scene and transitions to the MainMenu scene.
     */
    create() {
        this.scene.start('MainMenu');
    }
}
