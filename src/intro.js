import DistrictBorrascal from './map/districtBorrascal.js';
import Phaser from 'phaser';
import cine1realImg from '../assets/sprites/Cine1Real.png';
import fabricaImg from '../assets/sprites/Fabrica.png';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Intro extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'intro' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        console.log("INTRO");
        
    }
}
