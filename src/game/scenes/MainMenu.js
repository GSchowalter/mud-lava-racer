import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import themeManager from '../../config/ThemeManager.js';
import { MenuConstants } from '../../config/Menu.config.js';

export class MainMenu extends Scene {
    logoTween;

    constructor() {
        super('MainMenu');
    }

    create() {
        // Get theme colors from ThemeManager
        const theme = themeManager.getTheme();
        
        // Set the background color
        this.cameras.main.setBackgroundColor(theme.backgroundColor);

        this.add.text(MenuConstants.titlePosition[0], MenuConstants.titlePosition[1],MenuConstants.titleText, {
                fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            }).setDepth(100).setOrigin(0.5);

        this.add.text(MenuConstants.startPosition[0], MenuConstants.startPosition[1], MenuConstants.startText, {
            fontFamily: 'Arial Black', fontSize: MenuConstants.startFontSize, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        if (this.logoTween) {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('Game');
    }

    start() {
        this.scene.start('Game');
    }

    moveLogo(reactCallback) {
        if (this.logoTween) {
            if (this.logoTween.isPlaying()) {
                this.logoTween.pause();
            }
            else {
                this.logoTween.play();
            }
        }
        else {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (reactCallback) {
                        reactCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}
