import DistrictBorrascal from './map/districtBorrascal.js';
import Phaser from 'phaser';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'level' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        const d = new DistrictBorrascal("Borrascal","Any",1000,100,["Parque","Jardin"],2,["Hotel"],10,["Satisfacción","Peligro"],[1,1.5]);
        this.add.text(500, 250, d.getName() + d.getDescription());
        this.add.image(400, 300, 'cine1real');
        this.spawn();
    }

        /**
         * Genera una estrella en una de las bases del escenario
         * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
         * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
         */
        spawn(from = null) {
            Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
        }
    }
