import District from './district';
import SpecialBuilding from '../building/specialBuildingGuinea.js';

export default class DistrictGuinea extends District {
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    createSceneList(){
        const list = [];
        list.push('districtGuineaScene1');
        return list;
    }
    // VALUES NEED TO CHANGEPNGBuilding,name,cost,income,satisfaction,population
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingGuinea',this.special_building,300000,4,20,0);}
};