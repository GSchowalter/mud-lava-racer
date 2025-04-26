import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        let { screenWidth, screenHeight } = this.sys.canvas;

        this.add.grid(500, 500, 500, 500, 16, 16, 0x000000, 0.5, 0x000000, 0.5);

        EventBus.emit('current-scene-ready', this);
    }

    update ()
    {
        if (!this.player || !this.cursors) return;

        // Tile size for movement
        const TILE_SIZE = 16;

        // Check for input and move the player
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.player.x -= TILE_SIZE;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.player.x += TILE_SIZE;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.player.y -= TILE_SIZE;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.player.y += TILE_SIZE;
        }
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }

    
}
