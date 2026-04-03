import District from './district';
import SpecialBuilding from '../building/specialBuildingBorrascal.js';

export default class DistrictBorrascal extends District{
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    createSceneList(){
        const list = [];
        list.push('districtBorrascalScene1');
        return list;
    }
    // VALUES NEED TO CHANGEPNGBuilding,name,cost,income,satisfaction,population
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingBorrascal',this.special_building,240000,4,10,0);}
};
