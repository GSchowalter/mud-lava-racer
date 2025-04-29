import { EventBus } from '../EventBus';
import Phaser, { Scene } from 'phaser';
import { Player } from '../dungeon/Player';
import { DungeonBoard } from '../dungeon/DungeonBoard';

export class Game extends Scene
{
    dungeonBoard;

    playerStatusText;
    playerSprite;
    playerState;
    oldPlayerPosition;
    playerMoved;

    GRID_DIMENSION;
    GRID_CELL_DIMENSION;

    constructor ()
    {
        super('Game');

        this.GRID_DIMENSION = 700;
        this.GRID_CELL_DIMENSION = this.GRID_DIMENSION / 50;

        this.oldPlayerPosition = [0, 0];
        this.playerMoved = false;
    }

    create ()
    {
        // Set the background color
        this.cameras.main.setBackgroundColor(0xe6fffe); // Light green

        let screenWidth = this.game.canvas.width;
        let screenHeight = this.game.canvas.height;

        const GRID_POSITION_X = screenWidth / 2;
        const GRID_POSITION_Y = screenHeight / 2;
        const GRID_COLOR = 0x000000;
        const GRID_ALPHA = 0.5; 

        this.add.grid(
            GRID_POSITION_X, GRID_POSITION_Y,
            this.GRID_DIMENSION, this.GRID_DIMENSION,
            this.GRID_CELL_DIMENSION, this.GRID_CELL_DIMENSION,
            GRID_COLOR, GRID_ALPHA,
            0x000000, 0x000000
        ).setOrigin(0.5, 0.5);

        this.playerState = new Player();
        const PLAYER_SPRITE_POSITION_X = ((screenWidth / 2) - (this.GRID_DIMENSION / 2) + (this.GRID_CELL_DIMENSION * this.playerState.getPosition()[0])) + (this.GRID_CELL_DIMENSION / 2);
        const PLAYER_SPRITE_POSITION_Y = ((screenHeight / 2) - (this.GRID_DIMENSION / 2) + (this.GRID_CELL_DIMENSION * this.playerState.getPosition()[1])) + (this.GRID_CELL_DIMENSION / 2);
        const PLAYER_SPRITE_SCALE = 0.5;

        this.playerSprite = this.add.sprite(PLAYER_SPRITE_POSITION_X, PLAYER_SPRITE_POSITION_Y, 'knight').setScale(PLAYER_SPRITE_SCALE).setDepth(1000);

        const PLAYER_STATUS_POSITION_X = screenWidth / 8;
        const PLAYER_STATUS_POSITION_Y = screenHeight / 2;

        this.playerStatusText = this.add.text(
            PLAYER_STATUS_POSITION_X, PLAYER_STATUS_POSITION_Y,
            `Player Status: \nHealth: ${this.playerState.getHealth()}\nMoves: ${this.playerState.getMoves()}`, 
            {
                fontFamily: 'Arial Black', fontSize: 12, color: '#ffffff',
                stroke: '#000000', strokeThickness: 2,
                align: 'left'
            }
        ).setOrigin(0.5, 0.5);

        // Register keys
        this.keys = this.input.keyboard.addKeys('LEFT,RIGHT,UP,DOWN');

        // Initialize the dungeon board state
        this.dungeonBoard = new DungeonBoard();

        // Add status spaces to the dungeon board
        for (const { position, space } of this.dungeonBoard) {
            let spaceStatus = space;
            let x = position.x;
            let y = position.y;
            this.add.rectangle(
                ((screenWidth / 2) - (this.GRID_DIMENSION / 2) + (this.GRID_CELL_DIMENSION * x)) + (this.GRID_CELL_DIMENSION / 2),
                ((screenHeight / 2) - (this.GRID_DIMENSION / 2) + (this.GRID_CELL_DIMENSION * y)) + (this.GRID_CELL_DIMENSION / 2),
                this.GRID_CELL_DIMENSION, this.GRID_CELL_DIMENSION,
                spaceStatus.color
            ).setOrigin(0.5, 0.5).setAlpha(0.5);
        }

        // Add start and goal
        this.dungeonBoard.addStart(0, 0);
        this.dungeonBoard.addGoal(49, 49);

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        let keyPressed = false;

        // check for key presses
        if (Phaser.Input.Keyboard.JustDown(this.keys.LEFT)) {
            this.playerState.moveLeft();
            keyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.RIGHT)) {
            this.playerState.moveRight();
            keyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.UP)) {
            this.playerState.moveUp();
            keyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.DOWN)) {
            this.playerState.moveDown();
            keyPressed = true;
        }

        if(keyPressed) {
            console.log("key pressed");
            this.playerMoved = this.oldPlayerPosition[0] !== this.playerState.getPosition()[0] || this.oldPlayerPosition[1] !== this.playerState.getPosition()[1];
            console.log("playerMoved: ", this.playerMoved);
            console.log("player position", this.playerState.getPosition());
            console.log("oldPlayerPosition: ", this.oldPlayerPosition);
            if (this.playerMoved) {

                this.oldPlayerPosition = this.playerState.getPosition();
                this.updatePlayerState();
                this.updatePlayerSpritePosition();
                this.updatePlayerStatusText(); 
            }
        }
    }

    updatePlayerState() {
        // Update the player state based on new space status and position
        // TODO - check if player is dead
        // TODO - check if player has no moves left
        // TODO - check if player has won
        // TODO - don't update if player is at the edge of the board

        // TODO - IDEA - if a player wins turn all specialty pieces into a game of life simulation
        // TODO - IDEA - if a player dies invert board colors
        let playerPosition = this.playerState.getPosition();
        let currentSpace = this.dungeonBoard.getSpace(playerPosition[0], playerPosition[1]);
        if (currentSpace.getSpaceName() === "Goal") {
            this.win();
        }
        this.playerState.updateStatus(currentSpace);
    }

    updatePlayerSpritePosition() {
        const PLAYER_SPRITE_POSITION_X = ((this.game.canvas.width / 2) - (this.GRID_DIMENSION / 2) + (this.GRID_CELL_DIMENSION * this.playerState.getPosition()[0])) + (this.GRID_CELL_DIMENSION / 2);
        const PLAYER_SPRITE_POSITION_Y = ((this.game.canvas.height / 2) - (this.GRID_DIMENSION / 2) + (this.GRID_CELL_DIMENSION * this.playerState.getPosition()[1])) + (this.GRID_CELL_DIMENSION / 2);
        this.playerSprite.setPosition(PLAYER_SPRITE_POSITION_X, PLAYER_SPRITE_POSITION_Y);
    }
    
    updatePlayerStatusText() {
        const PLAYER_STATUS_POSITION_X = this.game.canvas.width / 8;
        const PLAYER_STATUS_POSITION_Y = this.game.canvas.height / 2;
        this.playerStatusText.setText(`Player Status: \nHealth: ${this.playerState.getHealth()}\nMoves: ${this.playerState.getMoves()}\nPosition: [${this.playerState.getPosition()[0]}, ${this.playerState.getPosition()[1]}]`);
    }   

    win() {
        this.scene.start('Win');
    }


    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
