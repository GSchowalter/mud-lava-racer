import { EventBus } from '../EventBus';
import Phaser, { Scene } from 'phaser';
import { Player } from '../dungeon/Player';
import { DungeonBoard } from '../dungeon/DungeonBoard';
import themeManager from '../../config/ThemeManager';

export class Game extends Scene
{
    dungeonBoard;

    playerStatusText;
    playerSprite;
    playerState;
    oldPlayerPosition;
    playerMoved;

    gridDimension;
    gridCellDimension;

    constructor ()
    {
        super('Game');

        this.gridDimension = 700;
        this.gridCellDimension = this.gridDimension / 50;

        this.oldPlayerPosition = [0, 0];
        this.playerMoved = false;
    }

    create ()
    {
        // Get theme colors from ThemeManager
        const theme = themeManager.getTheme();

        // Set the background color
        this.cameras.main.setBackgroundColor(theme.backgroundColor);

        let screenWidth = this.game.canvas.width;
        let screenHeight = this.game.canvas.height;

        const gridPositionX = screenWidth / 2;
        const gridPositionY = screenHeight / 2;
        const gridColor = theme.gridColor;
        const gridAlpha = theme.gridAlpha; 
        const gridOutlineFillColor = theme.gridOutlineFillColor;
        const gridOutlineAlpha = theme.gridOutlineAlpha;

        this.add.grid(
            gridPositionX, gridPositionY,
            this.gridDimension, this.gridDimension,
            this.gridCellDimension, this.gridCellDimension,
            gridColor, gridAlpha,
            gridOutlineFillColor, gridOutlineAlpha
        ).setOrigin(0.5, 0.5);

        this.playerState = new Player();
        const playerSpritePositionX = ((screenWidth / 2) - (this.gridDimension / 2) + (this.gridCellDimension * this.playerState.getPosition()[0])) + (this.gridCellDimension / 2);
        const playerSpritePositionY = ((screenHeight / 2) - (this.gridDimension / 2) + (this.gridCellDimension * this.playerState.getPosition()[1])) + (this.gridCellDimension / 2);
        const playerSpriteScale = 0.5;

        this.playerSprite = this.add.sprite(playerSpritePositionX, playerSpritePositionY, 'knight').setScale(playerSpriteScale).setDepth(1000);

        const plaerStatusPositionX = screenWidth / 12;
        const playerStatusPositionY = screenHeight / 2;

        this.playerStatusText = this.add.text(
            plaerStatusPositionX, playerStatusPositionY,
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

        // Add start and goal
        this.dungeonBoard.addStart(0, 0);
        this.dungeonBoard.addGoal(49, 49);

        // Add status spaces to the dungeon board
        for (const { position, space } of this.dungeonBoard) {
            let spaceStatus = space;
            let x = position.x;
            let y = position.y;
            this.add.rectangle(
                ((screenWidth / 2) - (this.gridDimension / 2) + (this.gridCellDimension * x)) + (this.gridCellDimension / 2),
                ((screenHeight / 2) - (this.gridDimension / 2) + (this.gridCellDimension * y)) + (this.gridCellDimension / 2),
                this.gridCellDimension, this.gridCellDimension,
                spaceStatus.color
            ).setOrigin(0.5, 0.5).setAlpha(0.5);
        }

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

        // TODO - IDEA - if a player wins turn all specialty pieces into a game of life simulation
        // TODO - IDEA - if a player dies invert board colors
        let playerPosition = this.playerState.getPosition();
        let currentSpace = this.dungeonBoard.getSpace(playerPosition[0], playerPosition[1]);
        if (currentSpace.getSpaceName() === "Goal") {
            this.win();
        }
        this.playerState.updateStatus(currentSpace);
        if (this.playerState.getHealth() <= 0) {
            this.lose();
        }
        if (this.playerState.getMoves() <= 0) {
            this.lose();
        }
    }

    updatePlayerSpritePosition() {
        const playerSpritePositionX = ((this.game.canvas.width / 2) - (this.gridDimension / 2) + (this.gridCellDimension * this.playerState.getPosition()[0])) + (this.gridCellDimension / 2);
        const playerSpritePositionY = ((this.game.canvas.height / 2) - (this.gridDimension / 2) + (this.gridCellDimension * this.playerState.getPosition()[1])) + (this.gridCellDimension / 2);
        this.playerSprite.setPosition(playerSpritePositionX, playerSpritePositionY);
    }
    
    updatePlayerStatusText() {
        this.playerStatusText.setText(`Player Status: \nHealth: ${this.playerState.getHealth()}\nMoves: ${this.playerState.getMoves()}\nPosition: [${this.playerState.getPosition()[0]}, ${this.playerState.getPosition()[1]}]`);
    }   

    win() {
        this.scene.start('Win');
    }

    lose() {
        this.scene.start('GameOver');
    }

    changeScene () {
        this.scene.start('GameOver');
    }
}
