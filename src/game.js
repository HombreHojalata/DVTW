import Boot from './boot.js';
import IntroScene from './scene/introScene.js';
import ConfigurationScene from './scene/configurationScene.js';
import GameScene from './scene/gameScene.js';
import DistrictScene from './scene/districtScene.js';
import BlackMarketScene from './scene/blackMarketScene.js';
import FinishScene from './scene/finishScene.js';

console.log("antes");
import Phaser from 'phaser';
console.log("despues");
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 850,
    parent: 'juego',
    scale: {
        //mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    dom: {
        createContainer: true
    },
    scene: [Boot, IntroScene, ConfigurationScene, GameScene, DistrictScene, BlackMarketScene, FinishScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
};
console.log("carga el juego?");
new Phaser.Game(config);
