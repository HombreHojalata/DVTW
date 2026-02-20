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
        console.log("LEVEL");
        const d = new DistrictBorrascal("Borrascal","Any",1000,100,["Parque","Jardin"],2,["Hotel"],10,["Satisfacción","Peligro"],[1,1.5]);
        this.add.text(500, 250, d.getName() + " - " + d.getDescription());
        
        // Crear contenedor para las imágenes
        let mapDiv = document.createElement('div');
        mapDiv.className = 'map';
        
        // Primera imagen
        let img1 = document.createElement('img');
        img1.src = cine1realImg;
        img1.className = 'game-image';
        img1.style.left = '150px';
        img1.style.top = '50px';
        mapDiv.appendChild(img1);
        
        // Segunda imagen
        let img2 = document.createElement('img');
        img2.src = fabricaImg;
        img2.className = 'game-image';
        img2.style.left = '0px';
        img2.style.top = '0px';
        mapDiv.appendChild(img2);
        
        this.add.dom(750, 375, mapDiv);
    }
}
