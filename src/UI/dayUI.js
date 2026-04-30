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

    // this.x + this.barWidth / 2, this.y + this.barHeight / 2
    create() {
        this.graphics = this.scene.add.graphics().setDepth(22);

        const rectWidth = 100;
        const rectHeight = 40;
        const rectX = 130 - rectWidth / 2;
        const rectY = 292 - rectHeight / 2;
        const radius = 12;

        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRoundedRect(rectX, rectY, rectWidth, rectHeight, radius);

        this.dayText = this.scene.add.text(130, 292, 'DÍA ' + this.gameManager.getDay().getDayNumber(), {
            fontSize: '22px',
            fontFamily: 'Times New Romans',
            fontStyle: 'bold',
            color: '#000000',
            stroke: '#ffffff',
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(23);
    }
}