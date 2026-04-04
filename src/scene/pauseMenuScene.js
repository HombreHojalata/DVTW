import Phaser from 'phaser';

export default class PauseMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseScene' });
    }

    init(data) {
        this.returnScene = data?.returnScene || 'gameScene';
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // make bg transparent
        this.add.rectangle(0, 0, width, height, 0x000000, 0.55).setOrigin(0);

        
        const panel = this.add.rectangle(width / 2, height / 2, 500, 420, 0x1d2b53, 0.95)
            .setStrokeStyle(4, 0xf0c24b);

        this.add.text(width / 2, height / 2 - 150, 'OPTIONS', {
            fontSize: '36px',
            color: '#f8f4ee',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const makeButton = (x, y, text, callback) => {
            const btn = this.add.rectangle(x, y, 260, 55, 0x3a506b, 1)
                .setStrokeStyle(2, 0xf0c24b)
                .setInteractive({ useHandCursor: true });

            const label = this.add.text(x, y, text, {
                fontSize: '24px',
                color: '#f8f4ee'
            }).setOrigin(0.5);

            btn.on('pointerover', () => btn.setFillStyle(0x4f6d8c));
            btn.on('pointerout', () => btn.setFillStyle(0x3a506b));
            btn.on('pointerup', callback);

            return { btn, label };
        };

        makeButton(width / 2, height / 2 - 40, 'Resume', () => {
            this.scene.resume(this.returnScene);
            this.scene.stop();
        });

        makeButton(width / 2, height / 2 + 40, 'Audio Settings', () => {
        this.scene.stop(); // stop PauseScene first
        this.scene.launch('configurationScene', {
            returnScene: this.returnScene,
            openedFromPause: true
        });
        this.scene.bringToTop('configurationScene');
    });

        makeButton(width / 2, height / 2 + 120, 'Exit to Main Menu', () => {
            this.scene.stop(this.returnScene);
            this.scene.start('introScene');
        });

        // Esc key to closee the menu
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.resume(this.returnScene);
            this.scene.stop();
        });
    }
}