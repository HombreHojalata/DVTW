import District from './district';

export default class DistrictBorrascal extends District{
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, built_buildings, space_building, special_building,
         opositors, parameters, parameters_multipliers, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, built_buildings, space_building, special_building,
             opositors, parameters, parameters_multipliers, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    
    spawnDistrict(scene){
        const button = scene.add.image(this.posX, this.posY, this.PNGwithOutSpecial)
            .setOrigin(0)
            .setScale(0.5)
            .setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            button.setScale(0.8);
        });

        button.on('pointerout', () => {
            button.setScale(0.5);
        });

        button.on('pointerup', () => {

            scene.updateDistrictFooter(this);

            // Crear container en (700,350)
            const container = scene.add.container(700, 350);

            // Background negro
            const bg = scene.add.rectangle(0, 0, 400, 300, 0x000000)
                .setOrigin(0.5);

            // Imagen del distrito
            const img = scene.add.image(0, 0, 'district')
                .setOrigin(0.5)
                .setScale(0.8);

            // Añadir al container
            container.add([bg, img]);
        });

        return button;
    }
};
