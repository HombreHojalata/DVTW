import District from './district';
import SpecialBuilding from '../building/specialBuildingElNido.js';

export default class DistrictElNido extends District {
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    createSceneList(){
        const list = [];
        list.push('districtElNidoScene1');
        return list;
    }
    // VALUES NEED TO CHANGE PNGBuilding,name,cost,income,satisfaction,population
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingElNido',this.special_building,270000,120000,20,2000);}
};