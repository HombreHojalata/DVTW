import Phaser from 'phaser';

export default class topUI {
    constructor(scene) {
        this.scene = scene;
        this.gameManager = this.scene.registry.get("gameManager");
        this.player = this.gameManager.getPlayer();
        this.map = this.gameManager.getMap();
        this.create();
    }

    create() {
        // ATRIBUTES
        this.populationTotal = this.map.getTotalPopulation();
        this.popularity = this.map.getPopularity();
        this.neutralOppositors = this.populationTotal - this.popularity;
        // PERCENTAGES
        this.popularityPercent = (this.popularity / this.populationTotal) * 100;
        this.neutralPercent = (this.neutralOppositors / this.populationTotal) * 100;
        // BAR DATA
        const x = 300;
        const y = 20;

        const barWidth = 878;
        const barHeight = 80;   

        const barX = x + 100;
        const barY = y + 50;

        this.graphics = this.scene.add.graphics().setDepth(21);
        this.graphics.fillRect(x, y, barWidth, barHeight);

        this.graphics.fillStyle(0x67d683, 1); // VOTOS A FAVOR
        this.graphics.fillRect(
            x,
            y,
            barWidth * (this.popularityPercent / 100),
            barHeight
        );
        this.graphics.fillStyle(0xb94848, 1); // NEUTRAL - OPPOSITORS
        this.graphics.fillRect(
            x + barWidth * (this.popularityPercent / 100),
            y,
            barWidth * (this.neutralPercent / 100),
            barHeight
        );
        this.frame = this.scene.add.image(x - 10, y, 'popularityBar').setOrigin(0).setDepth(22);

        const textStyle = {
            fontSize: '35px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#1f1f1f',
            strokeThickness: 4
        };

        this.greenText = this.scene.add.text(x + 20, y + 18, `${Math.round(this.popularityPercent)}%`, textStyle).setDepth(23);
        this.redText = this.scene.add.text(x + barWidth - 70, y + 18, `${Math.round(this.neutralPercent)}%`, textStyle).setStyle({ align: 'right' }).setDepth(23);

        this.blocker = this.scene.add.zone(x - 10, y, barWidth + 20, barHeight).setOrigin(0).setInteractive();
    }
}