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
        console.log("CONFIGURATION");
        this.add.text(0, 0, "Configuration");
        //NEED TO CHECK THIS OUT, IT WORKS BUT IT'S NOT THE BEST WAY TO DO IT, WE CAN CREATE A BUTTON CLASS TO REUSE IT IN THE GAME
        const back = this.add.text(10, 40, 'Back', { fontSize: '20px', backgroundColor: '#000', padding: { x: 8, y: 4 }, color: '#fff' }).setInteractive({ useHandCursor: true });
        back.on('pointerover', () => back.setStyle({ backgroundColor: '#444' }));
        back.on('pointerout', () => back.setStyle({ backgroundColor: '#000' }));
        back.on('pointerup', () => {
            if (this.returnScene) this.scene.start(this.returnScene);
            else this.scene.start('intro');
        });
    }
}
