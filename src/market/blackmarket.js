import Phaser from 'phaser';

export default class BlackMarket extends Phaser.Scene {
    constructor() {
        super({ key: 'blackmarket' });
    }

    create() {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;
        const rojo = '#be1e2d';
        
        this.add.rectangle(0, 0, gameWidth, gameHeight, rojo, 0.9).setOrigin(0);
        this.player = this.registry.get('player');

        this.add.text(gameWidth / 2, 100, 'MERCADO NEGRO', { 
            fontSize: '40px', 
            fontFamily: 'Climate Crisis',
            color: '#ffcc00' 
        }).setOrigin(0.5);

        const backButton = this.add.text(750, 600, '=> VOLVER AL MAPA', { 
            fontSize: '30px', 
            fontFamily: 'Courier New',
            backgroundColor: '#000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        backButton.on('pointerup', () => {
            this.scene.start('level');
        });
    }
}