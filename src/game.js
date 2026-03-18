import Boot from './boot.js';
import Intro from './intro.js';
import Configuration from './configuration.js';
import Level from './level.js';
import DistrictScene from './districtScene.js';
import BlackMarket from './market/blackmarket.js';
import End from './end.js';
import Phaser from 'phaser';

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
    scene: [Boot, Intro, Configuration, Level, DistrictScene, BlackMarket, End],
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
