import Phaser from 'phaser'

import image from '../assets/sprites/Cine1Real.png'
import fabrica from '../assets/sprites/Fabrica.png'
import cargaPantalla from '../assets/sprites/PrototipoCargaPantalla.png'
import iniPantalla from '../assets/sprites/PrototipoIniPantalla.png'

/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    //this.load.setPath('assets/sprites/');
    this.load.image('cine1real', image);
    this.load.image('fabrica', fabrica);
    this.load.image('carga', cargaPantalla);
    this.load.image('inicio', iniPantalla);
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.add.image(750, 375, 'carga');
    this.time.delayedCall(5000, () => {
      this.add.image(750, 375, 'inicio');
      let button = this.add.text(750, 450, 'Nueva Partida', { fontSize: '32px', fill: '#000' });
      button.setInteractive();
      button.on('pointerdown', () => { this.scene.start('level'); });
    });
  }
}