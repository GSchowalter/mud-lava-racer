import { Scene } from 'phaser';
import { PreloaderConstants } from '../../config/Preloder.config';

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
        this.add.rectangle(PreloaderConstants.barPosition[0], PreloaderConstants.barPosition[1], 468, 32).setStrokeStyle(1, 0xffffff)
            .setOrigin(0.5, 0.5)
            .setDepth(100);

        // Add the loading bar
        const bar = this.add.rectangle(PreloaderConstants.barPosition[0] - 230, PreloaderConstants.barPosition[1], 4, 28, 0xffffff)
            .setOrigin(0, 0.5)
            .setDepth(100);

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
