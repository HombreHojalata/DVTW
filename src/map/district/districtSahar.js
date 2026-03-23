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
        list.push('districtSaharScene1');
        return list;
    }
    // VALUES NEED TO CHANGE
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingSahar',this.special_building,50000,40000,0,100);}
};