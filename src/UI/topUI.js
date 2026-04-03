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
        this.populationTotal = this.map.getTotalPopulation();
        this.popularity = this.map.getPopularity();
        this.neutralOppositors = this.populationTotal - this.popularity;

        // Calcular porcentajes
        this.popularityPercent = (this.popularity / this.populationTotal) * 100;
        this.neutralPercent = (this.neutralOppositors / this.populationTotal) * 100;

        // Configuración de barra
        const barWidth = 400;
        const barHeight = 30;
        const x = 500;
        const y = 80;

        this.graphics = this.scene.add.graphics();
        this.graphics.fillStyle(0xcccccc, 1);
        this.graphics.fillRect(x, y, barWidth, barHeight);

        this.graphics.fillStyle(0x67d683, 1);                           //VOTOS A FAVOR
        this.graphics.fillRect(
            x,
            y,
            barWidth * (this.popularityPercent / 100),
            barHeight
        );
        this.graphics.fillStyle(0xb94848, 1);                           //NEUTRAL - OPPOSITORS
        this.graphics.fillRect(
            x + barWidth * (this.popularityPercent / 100),
            y,
            barWidth * (this.neutralPercent / 100),
            barHeight
        );
    }
    // NO HACE FALTA
    /*
    refresh() {
 
        this.graphics.fillStyle(0x67d683, 1);                           //VOTOS A FAVOR
        this.graphics.fillRect(
            x,
            y,
            barWidth * (this.popularityPercent / 100),
            barHeight
        );
        this.graphics.fillStyle(0xb94848, 1);                           //NEUTRAL - OPPOSITORS
        this.graphics.fillRect(
            x + barWidth * (this.popularityPercent / 100),
            y,
            barWidth * (this.neutralPercent / 100),
            barHeight
        );
    }*/
}