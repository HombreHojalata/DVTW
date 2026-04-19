import Phaser from 'phaser';

export default class dayUI {
    constructor(scene) {
        this.scene = scene;
        this.gameManager = this.scene.registry.get("gameManager");

        this.x = 300;
        this.y = 20;
        this.barWidth = 880;
        this.barHeight = 75;

        this.create();
    }

    create() {
        this.graphics = this.scene.add.graphics().setDepth(21);
        this.dayText = this.scene.add.text(this.x + this.barWidth / 2, this.y + this.barHeight / 2, 'DÍA' + this.gameManager.getDay().getDayNumber(), {
            fontSize: '50px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#000000',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(23);
    }
}