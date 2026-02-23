import Phaser from 'phaser';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Intro extends Phaser.Scene {
    constructor() {
        super({ key: 'intro' });
    }

    create() {
        console.log("INTRO");
        this.add.text(0, 0, "Intro");
        this.add.image(750, 375, 'inicio');
        let buttonInitGame = this.add.text(1000, 450, 'New Game', { fontSize: '32px', fill: '#000' });
        buttonInitGame.setInteractive();
        buttonInitGame.on('pointerdown', () => { this.scene.start('level'); });
        let buttonConfiguration = this.add.text(1000, 500, 'Configuration', { fontSize: '32px', fill: '#000' });
        buttonConfiguration.setInteractive();
        buttonConfiguration.on('pointerdown', () => { 
            this.scene.remove('inicio');
            this.scene.start('configuration'); 
        })
    }
}
