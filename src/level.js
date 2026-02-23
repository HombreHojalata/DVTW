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
    constructor() {
        super({ key: 'level' });
    }

    init(data) {
        //TO PREPARE ALL THE DISTRICT HERE
        this.fromScene = data && data.from ? data.from : null;
        //THIS FOR ALL THE DISTRICTS, WE CAN CREATE A MAP TO STORE THEM ALL IN THE REGISTRY, SO WE CAN ACCESS THEM FROM ANY SCENE
        const stored = this.registry.get('borrascal');
        if (!stored) {
            const borrascal = new DistrictBorrascal(
                "Borrascal", "Any", 1000, 10, 100,
                ["Casino"], ["Parque", "Jardin"], 2,
                ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5]
            );
            this.registry.set('borrascal', borrascal);
        }
    }

    create() {
        console.log("LEVEL");
        this.add.text(0, 0, "Level");
        this.d = this.registry.get('borrascal');                                                                                  //WE WILL NEED TO CREATE 1 OF THIS FOR EACH DISTRICT, AND THEN CREATE A MAP TO STORE THEM ALL IN THE REGISTRY, SO WE CAN ACCESS THEM FROM ANY SCENE
        this.add.text(0, 50, this.d.getName() + " - " + this.d.getDescription());
        this.populationText = this.add.text(0, 100, "Población: " + this.d.getPopulationDensity());
        this.populationIncreaseText = this.add.text(0, 150, "Aumento de población: " + this.d.getPopulationIncrease());
        this.satisfactionText = this.add.text(0, 200, "Satisfacción: " + this.d.getSatisfaction());

        const configBtn = this.add.text(200, 0, 'Configuration', { fontSize: '18px', backgroundColor: '#0066cc', padding: { x: 8, y: 4 }, color: '#fff' }).setInteractive({ useHandCursor: true });
        configBtn.on('pointerover', () => configBtn.setStyle({ backgroundColor: '#005bb5' }));
        configBtn.on('pointerout', () => configBtn.setStyle({ backgroundColor: '#0066cc' }));
        configBtn.on('pointerup', () => {
            this.scene.start('configuration', { from: 'level' });
        });

        const increaseBtn = this.add.text(200, 50, '+ Population', { fontSize: '18px', backgroundColor: '#228822', padding: { x: 8, y: 4 }, color: '#fff' }).setInteractive({ useHandCursor: true });
        increaseBtn.on('pointerover', () => increaseBtn.setStyle({ backgroundColor: '#1f7a1f' }));
        increaseBtn.on('pointerout', () => increaseBtn.setStyle({ backgroundColor: '#228822' }));
        increaseBtn.on('pointerup', () => {
            this.d.increaseBoostedPopulation(1000);
            //this.registry.set('district', this.d);
            this.populationText.setText('Población: ' + this.d.getPopulationDensity());
        });
        const decreaseBtn = this.add.text(200, 100, '- Population', { fontSize: '18px', backgroundColor: '#882222', padding: { x: 8, y: 4 }, color: '#fff' }).setInteractive({ useHandCursor: true });
        decreaseBtn.on('pointerover', () => decreaseBtn.setStyle({ backgroundColor: '#7a1f1f' }));
        decreaseBtn.on('pointerout', () => decreaseBtn.setStyle({ backgroundColor: '#882222' }));
        decreaseBtn.on('pointerup', () => {
            this.d.decreaseBoostedPopulation(1000);
            //this.registry.set('district', this.d);
            this.populationText.setText('Población: ' + this.d.getPopulationDensity());
        });
        
        const mapImg = this.add.image(350, 100, 'map').setOrigin(0).setScale(0.3);
        const cineImg = this.add.image(mapImg.x + 500, mapImg.y + 70, 'cine1real').setOrigin(0).setScale(0.07);
        const fabricaImg = this.add.image(mapImg.x + 150, mapImg.y + 180, 'fabrica').setOrigin(0).setScale(0.07);
    }
}
