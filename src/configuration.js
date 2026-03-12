import Phaser from 'phaser';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Configuration extends Phaser.Scene {
    constructor() {
        super({ key: 'configuration' });
    }

    init(data) {
        this.returnScene = (data && (data.from || data.fromScene || data.returnScene)) || null;
    }

    create() {
        console.log("CONFIGURACIÓN");

        const width = Number(this.sys.game.config.width);
        const height = Number(this.sys.game.config.height);

        const bgRed = 0xa52a2a;
        const darkRed = 0x7e1f1f;
        const navy = 0x13293d;
        const cream = '#f4efe6';
        const gold = '#f0c24b';
        const softWhite = '#f8f4ee';

        this.add.rectangle(width / 2, height / 2, width, height, bgRed);

        this.add.text(width / 2, 95, 'Opciones', {
            fontSize: '64px',
            fontStyle: 'bold',
            color: softWhite,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(width / 2, 175, 'Sr. Presidente, ajuste aquí sus preferencias de mandato:', {
            fontSize: '24px',
            color: softWhite,
            fontFamily: 'Courier'
        }).setOrigin(0.5);

        const panelY = 430;
        const panelWidth = 610;
        const panelHeight = 330;
        const leftPanelX = width / 2 - 320;
        const rightPanelX = width / 2 + 320;

        const drawPanel = (x, y, w, h, fillColor) => {
            const g = this.add.graphics();
            g.fillStyle(fillColor, 0.28);
            g.fillRoundedRect(x - w / 2, y - h / 2, w, h, 20);
            g.lineStyle(3, 0xf4efe6, 1);
            g.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 20);
        };

        drawPanel(leftPanelX, panelY, panelWidth, panelHeight, darkRed);
        drawPanel(rightPanelX, panelY, panelWidth, panelHeight, navy);

        this.add.text(leftPanelX, panelY - 110, 'AUDIO', {
            fontSize: '34px',
            fontStyle: 'bold',
            color: gold,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(rightPanelX, panelY - 110, 'PARTIDA', {
            fontSize: '34px',
            fontStyle: 'bold',
            color: gold,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        const createOptionRow = (x, y, label, valueText, valueColor) => {
            this.add.text(x - 165, y, label, {
                fontSize: '24px',
                color: softWhite,
                fontFamily: 'Courier'
            }).setOrigin(0, 0.5);

            const valueBg = this.add.rectangle(x + 165, y, 150, 42, 0x000000, 0.35)
                .setStrokeStyle(2, 0xf4efe6);

            const value = this.add.text(x + 165, y, valueText, {
                fontSize: '20px',
                color: valueColor,
                fontStyle: 'bold',
                fontFamily: 'Arial'
            }).setOrigin(0.5);

            return { valueBg, value };
        };

        createOptionRow(leftPanelX, panelY - 25, 'Música', 'ON', '#7CFF7A');
        createOptionRow(leftPanelX, panelY + 45, 'Sonido', 'ON', '#7CFF7A');

        createOptionRow(rightPanelX, panelY - 25, 'Dificultad', 'NORMAL', gold);
        createOptionRow(rightPanelX, panelY + 45, 'Mandato', 'ESTÁNDAR', gold);

        const createButton = (x, y, text, baseColor, hoverColor) => {
            const rect = this.add.rectangle(x, y, 190, 58, baseColor)
                .setStrokeStyle(3, 0xf4efe6)
                .setInteractive({ useHandCursor: true });

            const label = this.add.text(x, y, text, {
                fontSize: '24px',
                fontStyle: 'bold',
                color: softWhite,
                fontFamily: 'Arial'
            }).setOrigin(0.5);

            rect.on('pointerover', () => rect.setFillStyle(hoverColor));
            rect.on('pointerout', () => rect.setFillStyle(baseColor));

            return { rect, label };
        };

        const backBtn = createButton(width / 2 - 130, height - 90, 'BACK', navy, 0x1d3f5c);
        const saveBtn = createButton(width / 2 + 130, height - 90, 'SAVE', darkRed, 0x9c2d2d);

        backBtn.rect.on('pointerup', () => {
            if (this.returnScene) this.scene.start(this.returnScene);
            else this.scene.start('intro');
        });

        saveBtn.rect.on('pointerup', () => {
            if (this.returnScene) this.scene.start(this.returnScene);
            else this.scene.start('intro');
        });

        this.add.text(width / 2, height - 28, 'QUACKINGTON DC — INTERNAL PRESIDENTIAL SETTINGS', {
            fontSize: '14px',
            color: '#f0d9d9',
            fontFamily: 'Courier'
        }).setOrigin(0.5);
    }
}