import District from './district';
import SpecialBuilding from '../building/specialBuildingSahar.js';

export default class DistrictSahar extends District {
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building, 
        opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    createSceneList(){
        const list = [];
        list.push('districtSaharScene1', 'districtSaharScene2');
        return list;
    }
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingSahar',"RESTAURANTE BAMBI",180000,3,11,0);}
};