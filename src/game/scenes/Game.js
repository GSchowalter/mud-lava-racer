import { EventBus } from '../EventBus';
import Phaser, { Scene } from 'phaser';
import { Player } from '../dungeon/Player';
import { DungeonBoard } from '../dungeon/DungeonBoard';
import themeManager from '../../config/ThemeManager.js';
import { GridConstants } from '../../config/Grid.config.js';

/**
 * Represents the main game scene in the Mud Lava Racer game.
 * Manages the player, dungeon board, and game state.
 */
export class Game extends Scene {
    /**
     * Initializes the Game scene.
     */
    constructor() {
        super('Game');

        /**
         * The player's previous position on the grid.
         * @type {number[]}
         */
        this.oldPlayerPosition = [0, 0];

        /**
         * Indicates whether the player has moved.
         * @type {boolean}
         */
        this.playerMoved = false;

        /**
         * The player's state.
         * @type {Player}
         */
        this.playerState = new Player();

        /**
         * The dungeon board state.
         * @type {DungeonBoard}
         */
        this.dungeonBoardState = new DungeonBoard();
    }

    /**
     * Called when the scene is created. Sets up the game environment, event listeners, and player.
     */
    create() {
        let screenWidth = this.game.canvas.width;
        let screenHeight = this.game.canvas.height;

        // Get theme colors from ThemeManager
        const theme = themeManager.getTheme();

        // Set the background color
        this.cameras.main.setBackgroundColor(theme.backgroundColor);

        // Draw the grid and player
        this.drawGrid(screenWidth, screenHeight, theme);
        this.drawPlayer(screenWidth, screenHeight, theme);

        // Register event listeners
        EventBus.on('move-player', (direction) => this.handleMovePlayer(direction));
        EventBus.on('reset', () => this.reset());
        EventBus.on('retry', () => this.retry());

        // Register keyboard keys
        this.keys = this.input.keyboard.addKeys('LEFT,RIGHT,UP,DOWN,W,A,S,D,G,L');

        // Notify that the scene is ready
        EventBus.emit('current-scene-ready', this);
    }

    /**
     * Handles player movement based on the given direction.
     * @param {string} direction - The direction to move the player ('left', 'right', 'up', 'down').
     */
    handleMovePlayer(direction) {
        let isKeyPressed = false;

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

    /**
     * Called on every game update. Handles keyboard input for player movement.
     */
    update() {
        let isKeyPressed = false;

        if (Phaser.Input.Keyboard.JustDown(this.keys.LEFT) || Phaser.Input.Keyboard.JustDown(this.keys.A)) {
            this.playerState.moveLeft();
            isKeyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.RIGHT) || Phaser.Input.Keyboard.JustDown(this.keys.D)) {
            this.playerState.moveRight();
            isKeyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.UP) || Phaser.Input.Keyboard.JustDown(this.keys.W)) {
            this.playerState.moveUp();
            isKeyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.DOWN) || Phaser.Input.Keyboard.JustDown(this.keys.S)) {
            this.playerState.moveDown();
            isKeyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.G)) {
            this.win();
            isKeyPressed = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.L)) {
            this.lose();
            isKeyPressed = true;
        }

        if (isKeyPressed) {
            this.updateState();
        }
    }

    /**
     * Updates the game state, including the player's position and status.
     */
    updateState() {
        this.playerMoved = this.oldPlayerPosition[0] !== this.playerState.getPosition()[0] || this.oldPlayerPosition[1] !== this.playerState.getPosition()[1];
        if (this.playerMoved) {
            this.oldPlayerPosition = this.playerState.getPosition();
            this.updatePlayerState();
            this.updatePlayerSpritePosition();
        }
    }

    /**
     * Updates the player's state based on the current space on the dungeon board.
     */
    updatePlayerState() {
        let playerPosition = this.playerState.getPosition();
        let currentSpace = this.dungeonBoardState.getSpace(playerPosition[0], playerPosition[1]);

        if (currentSpace.getSpaceName() === "Goal") {
            this.win();
        }

        this.playerState.updateStatus(currentSpace);

        if (this.playerState.getHealth() <= 0 || this.playerState.getMoves() <= 0) {
            this.lose();
        }
    }

    /**
     * Updates the player's sprite position on the canvas.
     */
    updatePlayerSpritePosition() {
        const playerSpritePositionX = ((this.game.canvas.width / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * this.playerState.getPosition()[0])) + (GridConstants.gridCellDimension / 2);
        const playerSpritePositionY = ((this.game.canvas.height / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * this.playerState.getPosition()[1])) + (GridConstants.gridCellDimension / 2);
        this.playerSprite.setPosition(playerSpritePositionX, playerSpritePositionY);
    }

    /**
     * Resets the game state and player to their initial values.
     */
    reset() {
        this.removeListeners();
        this.playerState.reset();
        this.dungeonBoardState.reset();
        this.updateState();
    }

    /**
     * Retries the game by resetting the player state.
     */
    retry() {
        this.playerState.reset();
        this.updateState();
    }

    /**
     * Handles the win condition by transitioning to the Win scene.
     */
    win() {
        this.reset();
        this.scene.start('Win');
    }

    /**
     * Handles the lose condition by transitioning to the GameOver scene.
     */
    lose() {
        this.retry();
        this.removeListeners();
        this.scene.start('GameOver');
    }

    /**
     * Removes all event listeners from the EventBus.
     */
    removeListeners() {
        EventBus.removeListener('move-player');
        EventBus.removeListener('reset');
        EventBus.removeListener('retry');
    }

    /**
     * Draws the dungeon grid on the canvas.
     * @param {number} screenWidth - The width of the screen.
     * @param {number} screenHeight - The height of the screen.
     * @param {Object} theme - The theme object containing grid colors and styles.
     */
    drawGrid(screenWidth, screenHeight, theme) {
        const gridPositionX = screenWidth / 2;
        const gridPositionY = screenHeight / 2;

        this.add.grid(
            gridPositionX, gridPositionY,
            GridConstants.gridDimension, GridConstants.gridDimension,
            GridConstants.gridCellDimension, GridConstants.gridCellDimension,
            theme.gridColor, theme.gridAlpha,
            theme.gridOutlineFillColor, theme.gridOutlineAlpha
        ).setOrigin(0.5, 0.5);

        for (const { position, space } of this.dungeonBoardState) {
            let { spritePositionX, spritePositionY } = this.getGridSpritePosition([position.x, position.y]);
            this.add.rectangle(
                spritePositionX,
                spritePositionY,
                GridConstants.gridCellDimension, GridConstants.gridCellDimension,
                space.color
            ).setOrigin(0.5, 0.5).setAlpha(0.5);
        }
    }

    /**
     * Draws the player's sprite on the canvas.
     * @param {number} screenWidth - The width of the screen.
     * @param {number} screenHeight - The height of the screen.
     */
    drawPlayer(screenWidth, screenHeight) {
        const playerPosition = this.playerState.getSpritePosition(screenWidth, screenHeight);
        const playerSpriteScale = 0.5;
        this.playerSprite = this.add.sprite(playerPosition[0], playerPosition[1], 'knight').setScale(playerSpriteScale).setDepth(1000);
    }

    /**
     * Calculates the sprite position on the grid for a given board position.
     * @param {number[]} boardPosition - The board position as [x, y].
     * @returns {Object} The sprite position as { spritePositionX, spritePositionY }.
     */
    getGridSpritePosition(boardPosition) {
        const gridPositionX = ((this.game.canvas.width / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * boardPosition[0])) + (GridConstants.gridCellDimension / 2);
        const gridPositionY = ((this.game.canvas.height / 2) - (GridConstants.gridDimension / 2) + (GridConstants.gridCellDimension * boardPosition[1])) + (GridConstants.gridCellDimension / 2);
        return { spritePositionX: gridPositionX, spritePositionY: gridPositionY };
    }
}