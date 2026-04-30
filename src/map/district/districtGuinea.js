import District from './district';
import SpecialBuilding from '../building/specialBuildingGuinea.js';

export default class DistrictGuinea extends District {
    constructor(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    getSceneNormal() {return 'districtGuineaSceneNormal';}
    getSceneSpecial() {return 'districtGuineaSceneSpecial';}
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingGuinea',"TEATRO MAGNO",300000,4,20);}
};