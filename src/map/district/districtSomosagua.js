import District from './district';
import SpecialBuilding from '../building/specialBuildingSomosagua.js';

export default class DistrictSomosagua extends District {
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building, 
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    createSceneList(){
        const list = [];
        list.push('districtSomosaguaScene1');
        return list;
    }
    // VALUES NEED TO CHANGEPNGBuilding,name,cost,income,satisfaction,population
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingSomosagua',this.special_building,420000,5,-20,0);}
};