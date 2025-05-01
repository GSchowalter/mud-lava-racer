import { EventBus } from '../EventBus';
import Phaser, { Scene } from 'phaser';
import { Player } from '../dungeon/Player';
import { DungeonBoard } from '../dungeon/DungeonBoard';
import themeManager from '../../config/ThemeManager.js';
import { GridConstants } from '../../config/Grid.config.js';

export class Game extends Scene {
    dungeonBoardState;
    playerStatusText;
    playerSprite;
    playerState;
    oldPlayerPosition;
    playerMoved;
    keyPressed;

    constructor() {
        super('Game');
        this.oldPlayerPosition = [0, 0];
        this.playerMoved = false;

        // Initialize player state and dungeon board
        this.playerState = new Player();
        this.dungeonBoardState = new DungeonBoard();
    }

    create() {
        let screenWidth = this.game.canvas.width;
        let screenHeight = this.game.canvas.height;

        // Get theme colors from ThemeManager
        const theme = themeManager.getTheme();

        // Set the background color
        this.cameras.main.setBackgroundColor(theme.backgroundColor);

        // Draw the grid
        this.drawGrid(screenWidth, screenHeight, theme);

        // Draw player sprite
        this.drawPlayer(screenWidth, screenHeight, theme);

        // Draw player status box. For debugging purposes only
        // this.drawPlayerStatus(screenWidth, screenHeight, theme);

        
        EventBus.on('move-player', (direction) => {
            this.handleMovePlayer(direction)
        });

        EventBus.on('reset', () => {
            console.log('reset listener in Game scene');
            this.reset();
        });

        EventBus.on('retry', () => {
            console.log('retry listener in Game scene');
            this.retry();
        });

        console.log("event listeners added in Game scene");

        // Register keys
        this.keys = this.input.keyboard.addKeys('LEFT,RIGHT,UP,DOWN');

        console.log("Player sprite exists", this.playerSprite);

        EventBus.emit('current-scene-ready', this);
    }

    handleMovePlayer(direction) {
        let isKeyPressed = false;
        console.log("Player sprite exists in handleMovePlayer", this.playerSprite);

        // Move based on the direction received
        if (direction === "left") {
            this.playerState.moveLeft();
            isKeyPressed = true;
        } else if (direction === "right") {
            this.playerState.moveRight();
            isKeyPressed = true;
        } else if (direction === "up") {
            this.playerState.moveUp();
            isKeyPressed = true;
        } else if (direction === "down") {
            this.playerState.moveDown();
            isKeyPressed = true;
        }

        if (isKeyPressed) {
            this.updateState();
        }
    }

    update() {
        let isKeyPressed = false;

        // check for key presses
        if (Phaser.Input.Keyboard.JustDown(this.keys.LEFT)) {
            this.playerState.moveLeft();
            isKeyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.RIGHT)) {
            this.playerState.moveRight();
            isKeyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.UP)) {
            this.playerState.moveUp();
            isKeyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.DOWN)) {
            this.playerState.moveDown();
            isKeyPressed = true;
        }

        if (isKeyPressed) {
            this.updateState();
        }
    }

    updateState() {
        console.log("player sprite exists in updateState", this.playerSprite)
        this.playerMoved = this.oldPlayerPosition[0] !== this.playerState.getPosition()[0] || this.oldPlayerPosition[1] !== this.playerState.getPosition()[1];
        if (this.playerMoved) {
            this.oldPlayerPosition = this.playerState.getPosition();
            this.updatePlayerState();
            this.updatePlayerSpritePosition();
            // this.updatePlayerStatusText();
        }
    }

    updatePlayerState() {
        // Update the player state based on new space status and position
        let playerPosition = this.playerState.getPosition();
        let currentSpace = this.dungeonBoardState.getSpace(playerPosition[0], playerPosition[1]);

        // Check if the player has reached the goal space
        if (currentSpace.getSpaceName() === "Goal") {
            this.win();
        }

        // Update player state with space effect
        this.playerState.updateStatus(currentSpace);

        // Check if player is dead or out of moves
        if (this.playerState.getHealth() <= 0 || this.playerState.getMoves() <= 0) {
            this.lose();
        }
    }

    updatePlayerSpritePosition() {
        const playerSpritePositionX = ((this.game.canvas.width / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * this.playerState.getPosition()[0])) + (GridConstants.gridCellDimension / 2);
        const playerSpritePositionY = ((this.game.canvas.height / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * this.playerState.getPosition()[1])) + (GridConstants.gridCellDimension / 2);
        console.log("Update Player sprite position:", playerSpritePositionX, playerSpritePositionY);
        console.log("player sprite", this.playerSprite);
        this.playerSprite.setPosition(playerSpritePositionX, playerSpritePositionY);
    }

    updatePlayerStatusText() {
        this.playerStatusText.setText(`Player Status: \nHealth: ${this.playerState.getHealth()}\nMoves: ${this.playerState.getMoves()}\nPosition: [${this.playerState.getPosition()[0]}, ${this.playerState.getPosition()[1]}]`);
    }

    win() {
        this.reset();
        this.scene.start('Win');
    }

    lose() {
        this.retry();
        this.removeListeners();
        this.scene.start('GameOver');
    }

    removeListeners() {
        // Remove listeners
        EventBus.removeListener('move-player');
        EventBus.removeListener('reset');
        EventBus.removeListener('retry');
        console.log("Listeners removed");
    }

    reset() {
        console.log("Full reset function in game scene");
        this.removeListeners();

        this.playerState.reset();
        this.dungeonBoardState.reset();
        this.updateState();
    }

    retry() {
        console.log("Retry function in Game scene");
        // Reset player state
        this.playerState.reset();
        this.updateState();
    }

    changeScene() {
        this.scene.start('GameOver');
    }

    // Draw functiions
    drawGrid(screenWidth, screenHeight, theme) {
        const gridPositionX = screenWidth / 2;
        const gridPositionY = screenHeight / 2;
        const gridColor = theme.gridColor;
        const gridAlpha = theme.gridAlpha;
        const gridOutlineFillColor = theme.gridOutlineFillColor;
        const gridOutlineAlpha = theme.gridOutlineAlpha;

        this.add.grid(
            gridPositionX, gridPositionY,
            GridConstants.gridDimension, GridConstants.gridDimension,
            GridConstants.gridCellDimension, GridConstants.gridCellDimension,
            gridColor, gridAlpha,
            gridOutlineFillColor, gridOutlineAlpha
        ).setOrigin(0.5, 0.5);


        // Add colored rectangles corresponding to the status of each dungeon space
        for (const { position, space } of this.dungeonBoardState) {
            let spaceStatus = space;
            let { spritePositionX, spritePositionY } = this.getGridSpritePosition([position.x, position.y]);
            this.add.rectangle(
                spritePositionX,
                spritePositionY,
                GridConstants.gridCellDimension, GridConstants.gridCellDimension,
                spaceStatus.color
            ).setOrigin(0.5, 0.5).setAlpha(0.5);
        }
    }

    drawPlayer(screenWidth, screenHeight) {
        const playerPosition = this.playerState.getSpritePosition(screenWidth, screenHeight);
        const playerSpriteScale = 0.5;
        this.playerSprite = this.add.sprite(playerPosition[0], playerPosition[1], 'knight').setScale(playerSpriteScale).setDepth(1000);
        console.log("Player sprite created:", this.playerSprite);
    }

    drawPlayerStatus(screenWidth, screenHeight) {
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
    }

    //Utilty fnuctions
    getGridSpritePosition(boardPosition) {
        const gridPositionX = ((this.game.canvas.width / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * boardPosition[0])) + (GridConstants.gridCellDimension / 2);
        const gridPositionY = ((this.game.canvas.height / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * boardPosition[1])) + (GridConstants.gridCellDimension / 2);
        return { spritePositionX: gridPositionX, spritePositionY: gridPositionY };
    }

}