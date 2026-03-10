import Boot from './boot.js';
import Intro from './intro.js';
import Configuration from './configuration.js';
import Level from './level.js';
import End from './end.js';
import Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.esm.js';

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
    scene: [Boot, Intro, Configuration, Level, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
};

new Phaser.Game(config);
