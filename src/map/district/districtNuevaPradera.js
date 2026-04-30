import District from './district';
import SpecialBuilding from '../building/specialBuildingNuevaPradera.js';

export default class DistrictNuevaPradera extends District {
    constructor(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    getSceneNormal() {return 'districtNuevaPraderaSceneNormal';}
    getSceneSpecial() {return 'districtNuevaPraderaSceneSpecial';}
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingNuevaPradera',"ENPAWIRE",330000,3,17);}
};