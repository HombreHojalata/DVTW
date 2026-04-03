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

        // Texto
        this.scene.add.text(500, 30,`TOTAL "${this.populationTotal}", AFAVOR "${this.popularity}", NEUTRAL-CONTRA "${this.neutralOppositors}"`,{
            fontSize: '20px',
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            color: '#000000'
        });

        // Calcular porcentajes
        this.popularityPercent = (this.popularity / this.populationTotal) * 100;
        this.neutralPercent = (this.neutralOppositors / this.populationTotal) * 100;

        // Configuración de barra
        const barWidth = 400;
        const barHeight = 30;
        const x = 500;
        const y = 80;

        this.graphics = this.scene.add.graphics();

        // Fondo (gris)
        this.graphics.fillStyle(0xcccccc, 1);
        this.graphics.fillRect(x, y, barWidth, barHeight);

        // Parte popularidad (verde)
        this.graphics.fillStyle(0x00ff00, 1);
        this.graphics.fillRect(
            x,
            y,
            barWidth * (this.popularityPercent / 100),
            barHeight
        );

        // Parte neutral/opositores (rojo)
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillRect(
            x + barWidth * (this.popularityPercent / 100),
            y,
            barWidth * (this.neutralPercent / 100),
            barHeight
        );

        // Texto de porcentaje
        this.scene.add.text(x, y + 40,
            `A favor: ${this.popularityPercent.toFixed(2)}% | Neutral/Contra: ${this.neutralPercent.toFixed(2)}%`,
            { fontSize: '16px', color: '#000' }
        );
    }

    refresh() {
        const opinionBarWidth = this.barWidth;

        const popularity = Phaser.Math.Clamp(this.player.getPopularity(), 0, 100);
        const oppositors = Phaser.Math.Clamp(this.map.getTotalPopulation()-this.map.getPopularity(), 0, 100);

        const alliesWidth = opinionBarWidth * (popularity / 100);
        const oppositorsWidth = opinionBarWidth * (oppositors / 100);

        if (this.opinionAllies) {
            this.opinionAllies.width = alliesWidth;
        }

        if (this.opinionOppositors) {
            this.opinionOppositors.x = this.barX + alliesWidth;
            this.opinionOppositors.width = oppositorsWidth;
        }

        if (this.opinionPercentText) {
            this.opinionPercentText.setText(Math.floor(popularity) + '%');
        }
    }
}