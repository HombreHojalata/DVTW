import District from './district';
import SpecialBuilding from '../building/specialBuildingSahar.js';

export default class DistrictSahar extends District {
    constructor(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building, 
        opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    getSceneNormal() {return 'districtSaharSceneNormal';}
    getSceneSpecial() {return 'districtSaharSceneSpecial';}
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingSahar',"RESTAURANTE BAMBI",180000,3,11);}
};