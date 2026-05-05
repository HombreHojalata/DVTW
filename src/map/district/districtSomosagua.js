import District from './district';
import SpecialBuilding from '../building/specialBuildingSomosagua.js';

export default class DistrictSomosagua extends District {
    constructor(name, desc, population, district_building, buildings, space_building, is_special_built, special_building, 
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );

        this.addTaxesPercentage(36);        //14
        this.addSecurityPercentage(17);     //7
        this.addWorkSchedule(10);           //-2
        this.addCleaningPercentage(9);      //-1
        this.updateAfterModifyPercentage();

    }
    getSceneNormal() {return 'districtSomosaguaSceneNormal';}
    getSceneSpecial() {return 'districtSomosaguaSceneSpecial';}
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingSomosagua',"FÁBRICA MUNDO JUPI",420000,5,-20);}
};