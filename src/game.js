import Phaser from 'phaser';

import Boot from './boot.js';
import IntroScene from './scene/introScene.js';
import ConfigurationScene from './scene/configurationScene.js';
import GameScene from './scene/gameScene.js';
import DistrictScene from './scene/districtScene.js';
import DistrictStoreScene from './scene/districtStoreScene.js';
import MissionScene from './scene/missionScene.js';
import BlackMarketScene from './scene/blackMarketScene.js';
import FinishScene from './scene/finishScene.js';
import WordleMiniGame from './minigames/scene/wordleScene.js';

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
    scene: [Boot, IntroScene, ConfigurationScene, GameScene, DistrictScene, DistrictStoreScene, MissionScene, BlackMarketScene, FinishScene, WordleMiniGame],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
};
new Phaser.Game(config);
