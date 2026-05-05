import District from './district';
import SpecialBuilding from '../building/specialBuildingNuevaPradera.js';

export default class DistrictNuevaPradera extends District {
    constructor(name, desc, population, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
        
        this.addTaxesPercentage(41);        //19
        this.addSecurityPercentage(14);     //4
        this.addWorkSchedule(8);            //0
        this.addCleaningPercentage(10);     //0
        this.updateAfterModifyPercentage();

    }
    getSceneNormal() {return 'districtNuevaPraderaSceneNormal';}
    getSceneSpecial() {return 'districtNuevaPraderaSceneSpecial';}
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingNuevaPradera',"ENPAWIRE",330000,3,17);}
};