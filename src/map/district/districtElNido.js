import District from './district';
import SpecialBuilding from '../building/specialBuildingElNido.js';

export default class DistrictElNido extends District {
    constructor(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    getSceneNormal() {return 'districtElNidoSceneNormal';}
    getSceneSpecial() {return 'districtElNidoSceneSpecial';}
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingElNido',"COPITOLIO",270000,4,15);}
};