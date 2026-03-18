import Phaser from 'phaser';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'intro' });
    }

    create() {
        console.log("INTRO");
        this.add.text(0, 0, "Intro");
        this.add.image(0, 0, 'inicio').setOrigin(0);

        const createMenuButton = (x, y, text, callback) => {
            const width = 300;
            const height = 62;

            const shadow = this.add.rectangle(x + 4, y + 5, width, height, 0x000000, 0.18).setOrigin(0.5);
            const bg = this.add.rectangle(x, y, width, height, 0xf7f2ea, 0.82)
                .setOrigin(0.5)
                .setStrokeStyle(3, 0x263b63)
                .setInteractive({ useHandCursor: true });

            const label = this.add.text(x, y, text, {
                fontSize: '28px',
                fontStyle: 'bold',
                color: '#26304a',
                fontFamily: 'Georgia'
            }).setOrigin(0.5);

            bg.on('pointerover', () => {
                bg.setFillStyle(0xfff7df, 0.95);
                bg.setStrokeStyle(3, 0xb68a2f);
                label.setColor('#1b2340');
                bg.setScale(1.03);
                label.setScale(1.03);
                shadow.setAlpha(0.28);
            });

            bg.on('pointerout', () => {
                bg.setFillStyle(0xf7f2ea, 0.82);
                bg.setStrokeStyle(3, 0x263b63);
                label.setColor('#26304a');
                bg.setScale(1);
                label.setScale(1);
                shadow.setAlpha(0.18);
            });

            bg.on('pointerdown', () => {
                bg.setScale(0.98);
                label.setScale(0.98);
            });

            bg.on('pointerup', () => {
                bg.setScale(1.03);
                label.setScale(1.03);
                callback();
            });

            return { shadow, bg, label };
        };

        createMenuButton(1120, 470, 'Nueva Partida', () => {
            this.scene.start('level');
        });

        createMenuButton(1120, 560, 'Opciones', () => {
            this.scene.remove('inicio');
            this.scene.start('configuration');
        });
    }
}