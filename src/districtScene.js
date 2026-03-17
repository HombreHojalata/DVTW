import Phaser from 'phaser';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class DistrictScene extends Phaser.Scene {
    constructor() {
        super({ key: 'districtScene' });
    }

    init(data) {
        this.district = data.district;
    }
       
    create() {
        const baseWidth = this.scale.width;
        const baseHeight = this.scale.height;

        const newWidth = baseWidth * 0.9;
        const newHeight = baseHeight * 0.85;

        const offsetX = (baseWidth - newWidth) / 2;
        const offsetY = (baseHeight - newHeight) / 2 - 50;
        this.cameras.main.setViewport(offsetX, offsetY, newWidth, newHeight);

        console.log(this.district);

        const districtName = this.district.getName();

        const centerX = newWidth / 2;
        const centerY = newHeight / 2;

        if (districtName === "BORRASCAL") this.add.image(centerX, centerY, 'district').setScale(0.9);
        else if (districtName === "EL_NIDO") this.add.image(centerX, centerY, 'district').setScale(0.9);
        else if (districtName === "GUINEA") this.add.image(centerX, centerY, 'district').setScale(0.9);
        else if (districtName === "NUEVA_PRADERA") this.add.image(centerX, centerY, 'district').setScale(0.9);
        else if (districtName === "SAHAR") this.add.image(centerX, centerY, 'district').setScale(0.9);
        else if (districtName === "SOMOSAGUA") this.add.image(centerX, centerY, 'district').setScale(0.9);

        this.closeIcon = this.add.image(1200, 100, 'closeIcon').setOrigin(0).setScale(1).setInteractive({ useHandCursor: true });
        this.closeIcon.on('pointerover', () => {this.closeIcon.setScale(1.1);});
        this.closeIcon.on('pointerout', () => {this.closeIcon.setScale(1);});
        this.closeIcon.on('pointerup', () => {
            this.closeIcon.destroy();
            this.scene.stop();
            this.scene.resume('level');
        });
    }
}