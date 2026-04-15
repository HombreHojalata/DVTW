import Phaser from 'phaser';

export default class topUI {
    constructor(scene) {
        this.scene = scene;
        this.gameManager = this.scene.registry.get("gameManager");
        this.player = this.gameManager.getPlayer();
        this.map = this.gameManager.getMap();

        this.x = 300;
        this.y = 20;
        this.barWidth = 880;
        this.barHeight = 75;

        this.create();
    }

    create() {
        this.graphics = this.scene.add.graphics().setDepth(21);
        this.frame = this.scene.add.image(this.x - 10, this.y - 5, 'popularityBar').setOrigin(0).setDepth(22);

        const textStyle = {
            fontSize: '35px',
            fontFamily: 'Handjet',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#1f1f1f',
            strokeThickness: 4
        };

        this.greenText = this.scene.add.text(this.x + 20, this.y + 13, '', textStyle).setDepth(23);
        this.redText = this.scene.add.text(this.x + this.barWidth - 70, this.y + 13, '', textStyle).setStyle({ align: 'right' }).setDepth(23);

        this.blocker = this.scene.add.zone(this.x - 10, this.y, this.barWidth + 20, this.barHeight).setOrigin(0).setInteractive();

        this.refresh();



        this.graphics.fillRect(this.x, this.y, this.barWidth, this.barHeight);

        this.graphics.fillStyle(0x67d683, 1); // VOTOS A FAVOR
        this.graphics.fillRect(
            this.x,
            this.y,
            this.barWidth * (this.popularityPercent / 100),
            this.barHeight
        );
        this.graphics.fillStyle(0xb94848, 1); // NEUTRAL - OPPOSITORS
        this.graphics.fillRect(
            this.x + this.barWidth * (this.popularityPercent / 100),
            this.y,
            this.barWidth * (this.neutralPercent / 100),
            this.barHeight
        );
    }

    refresh() {
        // ATRIBUTES
        this.populationTotal = this.map.getTotalPopulation();
        this.popularity = this.map.getPopularity();
        this.neutralOppositors = this.populationTotal - this.popularity;

        // PERCENTAGES
        this.popularityPercent = (this.popularity / this.populationTotal) * 100;
        this.neutralPercent = (this.neutralOppositors / this.populationTotal) * 100;

        // TEXTS
        this.greenText.setText(`${Math.round(this.popularityPercent)}%`);
        this.redText.setText(`${Math.round(this.neutralPercent)}%`);

        this.graphics.clear();

        this.graphics.fillStyle(0x67d683, 1); // VOTOS A FAVOR
        const favorWidth = this.barWidth * (this.popularityPercent / 100);
        this.graphics.fillRect(this.x, this.y, favorWidth, this.barHeight);

        this.graphics.fillStyle(0xb94848, 1); // VOTOS EN CONTRA
        const neutralWidth = this.barWidth * (this.neutralPercent / 100);
        this.graphics.fillRect(this.x + favorWidth, this.y, neutralWidth, this.barHeight);
    }
}