import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../dungeon/Player';
import { DungeonBoard } from '../dungeon/DungeonBoard';

export class Game extends Scene
{
    dungeonBoard;

    playerStatusText;
    playerSprite;
    playerState;

    keyDown;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        let screenWidth = this.game.canvas.width;
        let screenHeight = this.game.canvas.height;

        const GRID_POSITION_X = screenWidth / 2;
        const GRID_POSITION_Y = screenHeight / 2;
        const GRID_WIDTH = 500;
        const GRID_HEIGHT = 500;
        const GRID_CELL_DIMENSION = 10;
        const GRID_COLOR = 0x000000;
        const GRID_ALPHA = 0.5; 

        this.add.grid(
            GRID_POSITION_X, GRID_POSITION_Y,
            GRID_WIDTH, GRID_HEIGHT,
            GRID_CELL_DIMENSION, GRID_CELL_DIMENSION,
            GRID_COLOR, GRID_ALPHA,
            0x000000, 0x000000
        ).setOrigin(0.5, 0.5);


        this.playerState = new Player();
        const PLAYER_SPRITE_POSITION_X = ((screenWidth / 2) - (this.GRID_WIDTH / 2) + (GRID_CELL_DIMENSION * this.playerState.getPosition()[0])) + (GRID_CELL_DIMENSION / 2);
        const PLAYER_SPRITE_POSITION_Y = ((screenHeight / 2) - (this.GRID_HEIGHT / 2) + (GRID_CELL_DIMENSION * this.playerState.getPosition()[1])) + (GRID_CELL_DIMENSION / 2);
        const PLAYER_SPRITE_SCALE = 0.125;

        this.playerSprite = this.add.sprite(PLAYER_SPRITE_POSITION_X, PLAYER_SPRITE_POSITION_Y, 'star').setScale(PLAYER_SPRITE_SCALE);

        const PLAYER_STATUS_POSITION_X = screenWidth / 8;
        const PLAYER_STATUS_POSITION_Y = screenHeight / 2;

        this.playerStatusText = this.add.text(
            PLAYER_STATUS_POSITION_X, PLAYER_STATUS_POSITION_Y,
            `Player Status: \nHealth: ${this.playerState.getHealth()}\nMoves: ${this.playerState.getMoves()}`, 
            {
                fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
                stroke: '#000000', strokeThickness: 4,
                align: 'left'
            }
        ).setOrigin(0.5, 0.5);

        // Register keys
        this.keys = this.input.keyboard.addKeys('LEFT,RIGHT,UP,DOWN');

        this.dungeonBoard = new DungeonBoard();

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        let keyPressed = false;
        // check for key presses
        if (this.keys.LEFT.isDown) {
            this.playerState.moveLeft();
            keyPressed = true;
        } else if (this.keys.RIGHT.isDown) {
            this.playerState.moveRight();
            keyPressed = true;
        } else if (this.keys.UP.isDown) {
            this.playerState.moveUp();
            keyPressed = true;
        } else if (this.keys.DOWN.isDown) {
            this.playerState.moveDown();
            keyPressed = true;
        }

        if(keyPressed) {
            this.updatePlayerSpritePosition();
            this.updatePlayerStatusText();  
        }

    }

    updatePlayerSpritePosition() {
        const GRID_CELL_DIMENSION = 10;
        const PLAYER_SPRITE_POSITION_X = ((this.game.canvas.width / 2) - (500 / 2) + (GRID_CELL_DIMENSION * this.playerState.getPosition()[0])) + (GRID_CELL_DIMENSION / 2);
        const PLAYER_SPRITE_POSITION_Y = ((this.game.canvas.height / 2) - (500 / 2) + (GRID_CELL_DIMENSION * this.playerState.getPosition()[1])) + (GRID_CELL_DIMENSION / 2);
        this.playerSprite.setPosition(PLAYER_SPRITE_POSITION_X, PLAYER_SPRITE_POSITION_Y);

        //TODO seperate into an update state function
        let playerPosition = this.playerState.getPosition();
        let currentSpace = this.dungeonBoard.getSpace(playerPosition[0], playerPosition[1]);
        this.playerState.updateStatus(currentSpace);
    }
    
    updatePlayerStatusText() {
        const PLAYER_STATUS_POSITION_X = this.game.canvas.width / 8;
        const PLAYER_STATUS_POSITION_Y = this.game.canvas.height / 2;
        this.playerStatusText.setText(`Player Status: \nHealth: ${this.playerState.getHealth()}\nMoves: ${this.playerState.getMoves()}\nPosition: [${this.playerState.getPosition()[0]}, ${this.playerState.getPosition()[1]}]`);
    }   

    changeScene ()
    {
        this.scene.start('GameOver');
    }

    
}
