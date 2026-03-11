import Phaser from 'phaser'
import cargaPantalla from '../assets/sprites/PrototipoCargaPantalla.png'
import iniPantalla from '../assets/sprites/PrototipoIniPantalla.png'
import worldMap from '../assets/sprites/mapTemplate.png'
import presidente from '../assets/sprites/presidente.png'

// BLACK MARKET ASSETS
import vendedor from '../assets/sprites/Vendedor.png'
import prensa_icon from '../assets/sprites/marketIcons/prensa.png'
import hotel_icon from '../assets/sprites/marketIcons/hotel.png'

//PROTOTYPE ASSETS, TO BE REPLACED
import testSahar from '../assets/sprites/test1.png'
import missionIconPng from '../assets/sprites/missionIcon2.png'
import configurationIcon from '../assets/sprites/configurationIcon.png'
import closeIcon from '../assets/sprites/closeIcon.png'
import district from '../assets/sprites/prototipoDistrict.png'
import blackMarket from '../assets/sprites/prototipoBlackMarket.png'

/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    //this.load.setPath('assets/sprites/');

    this.load.image('carga', cargaPantalla);
    this.load.image('inicio', iniPantalla);
    this.load.image('map', worldMap);
    this.load.image('presidente', presidente);
    //PROTOTYPE ASSETS, TO BE REPLACED
    this.load.image('testSahar', testSahar);
    this.load.image('missionIcon', missionIconPng);
    this.load.image('configurationIcon', configurationIcon);
    this.load.image('closeIcon', closeIcon);
    this.load.image('district', district);
    this.load.image('blackMarket', blackMarket);
    this.load.image('vendedor', vendedor);
    this.load.image('pensa_icon', prensa_icon);
    this.load.image('hotel_icon', hotel_icon);
  }

  create() {
    this.add.image(750, 375, 'carga');                                                                //WE CAN ADD MUSIC AND LOADING BAR HERE
    this.add.text(0, 0, "Boot");

    // Crear la barra de carga
    const barWidth = 600;
    const barHeight = 30;
    const barX = this.cameras.main.centerX - barWidth / 2;
    const barY = this.cameras.main.centerY + 300;

    // Fondo de la barra
    const barBg = this.add.graphics();
    barBg.fillStyle(0x000000, 0.5);
    barBg.fillRect(barX, barY, barWidth, barHeight);

    // Barra de progreso
    const progressBar = this.add.graphics();
    progressBar.fillStyle(0xffff00, 1);

    this.tweens.add({
      targets: { width: 0 },
      width: barWidth,
      duration: 1500, //1.5 SECONDS
      ease: 'Linear',
      onUpdate: (tween) => {
        progressBar.clear();
        progressBar.fillStyle(0xffff00, 1);
        progressBar.fillRect(barX, barY, tween.getValue(), barHeight);
      },
      onComplete: () => {
        this.scene.remove('carga');
        this.scene.start('intro');
      }
    });
  }
}
