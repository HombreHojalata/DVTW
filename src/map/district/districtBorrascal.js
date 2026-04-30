    import District from './district';
import SpecialBuilding from '../building/specialBuildingBorrascal.js';

export default class DistrictBorrascal extends District{
    constructor(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    getSceneNormal() {return 'districtBorrascalSceneNormal';}
    getSceneSpecial() {return 'districtBorrascalSceneSpecial';}
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingBorrascal',"CENTRO DE INVESTIGACIÓN",240000,4,10);}
};
