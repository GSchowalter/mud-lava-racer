import { EventBus } from '../EventBus.js';
import { Scene } from 'phaser';
import themeManager from '../../config/ThemeManager.js';
import { MenuConstants } from '../../config/Menu.config.js';

/**
 * Represents the Main Menu scene in the game.
 * The Main Menu scene is displayed at the start of the game and allows the player to begin the game.
 */
export class MainMenu extends Scene {
    /**
     * Initializes the Main Menu scene.
     */
    constructor() {
        super('MainMenu');
    }

    /**
     * Creates the Main Menu scene.
     * Sets up the background, displays the title and start text, and emits a scene-ready event.
     */
    create() {
        // Get theme colors from ThemeManager
        const theme = themeManager.getTheme();

        // Set the background color
        this.cameras.main.setBackgroundColor(theme.backgroundColor);

        // Add the title text
        this.add.text(MenuConstants.titlePosition[0], MenuConstants.titlePosition[1], MenuConstants.titleText, {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5, 0.5);

        // Add the start text
        this.add.text(MenuConstants.startPosition[0], MenuConstants.startPosition[1], MenuConstants.startText, {
            fontFamily: 'Arial Black',
            fontSize: MenuConstants.startFontSize,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5, 0.5);

        // Emit an event to indicate the scene is ready
        EventBus.emit('current-scene-ready', this);
    }

    /**
     * Starts the Game scene.
     */
    start() {
        this.scene.start('Game');
    }
}
