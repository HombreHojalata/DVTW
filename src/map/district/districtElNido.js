import District from './district';
import SpecialBuilding from '../building/specialBuildingElNido.js';

export default class DistrictElNido extends District {
    constructor(name, desc, population, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );

        this.addTaxesPercentage(34);        //16
        this.addSecurityPercentage(14);     //4
        this.addWorkSchedule(6);            //2
        this.addCleaningPercentage(12);     //2
        this.updateAfterModifyPercentage();
    }
    getSceneNormal() {return 'districtElNidoSceneNormal';}
    getSceneSpecial() {return 'districtElNidoSceneSpecial';}
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingElNido',"COPITOLIO",270000,4,15);}
};