import District from './district';
import SpecialBuilding from '../building/specialBuildingElNido.js';

export default class DistrictElNido extends District {
    constructor(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    createSceneList(){
        const list = [];
        list.push('districtElNidoScene1', 'districtElNidoScene2');
        return list;
    }
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingElNido',"COPITOLIO",270000,4,15);}
};