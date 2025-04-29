import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Win } from './scenes/Win';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { GameConstants } from '../config/Game.config';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
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

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
