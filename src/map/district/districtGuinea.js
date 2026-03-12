import District from './district';

export default class DistrictGuinea extends District {
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, built_buildings, space_building, special_building,
         opositors, parameters, parameters_multipliers, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, built_buildings, space_building, special_building,
             opositors, parameters, parameters_multipliers, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    spawnDistrict(scene){
         const button = scene.add.image(this.posX, this.posY, this.PNGwithOutSpecial)
            .setOrigin(0)
            .setScale(1)
            .setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            button.setScale(1.01);
        });

        button.on('pointerout', () => {
            button.setScale(1);
        });

        button.on('pointerup', () => {          // MODIFICAR EL TEXTO DEL FOOTER CON LA DESCRIPCION DEL DISTRITO
            scene.updateDistrictFooter(this);
            scene.add.image(150,50,'testSahar').setOrigin(0).setScale(0.8);
        });

        return button;
    }
};