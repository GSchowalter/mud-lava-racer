import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Win } from './scenes/Win';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { GameConstants } from '../config/Game.config';

/**
 * Phaser game configuration object.
 * Defines the settings for the Phaser game, including dimensions, scaling, and scenes.
 * 
 * @type {Object}
 * @property {number} type - The rendering context (Phaser.AUTO, Phaser.CANVAS, or Phaser.WEBGL).
 * @property {number} width - The width of the game window.
 * @property {number} height - The height of the game window.
 * @property {string} parent - The DOM element ID where the game will be embedded.
 * @property {string} backgroundColor - The background color of the game.
 * @property {Object} scale - The scaling configuration for the game.
 * @property {string} scale.mode - The scaling mode (e.g., Phaser.Scale.FIT).
 * @property {string} scale.autoCenter - The auto-centering mode (e.g., Phaser.Scale.CENTER_BOTH).
 * @property {number} scale.width - The width of the game window for scaling.
 * @property {number} scale.height - The height of the game window for scaling.
 * @property {Array} scene - The list of scenes to include in the game.
 */
const config = {
    type: Phaser.AUTO,
    width: GameConstants.windowWidth,
    height: GameConstants.windowHeight,
    parent: 'game-container',
    backgroundColor: GameConstants.backgroundColor,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GameConstants.windowWidth,
        height: GameConstants.windowHeight
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        Win,
        GameOver
    ]
};

/**
 * Initializes and starts the Phaser game.
 * 
 * @param {string} parent - The DOM element ID where the game will be embedded.
 * @returns {Phaser.Game} The initialized Phaser game instance.
 */
const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
};

export default StartGame;
