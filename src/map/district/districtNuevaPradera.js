import District from './district';
import SpecialBuilding from '../building/specialBuildingNuevaPradera.js';

export default class DistrictNuevaPradera extends District {
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    createSceneList(){
        const list = [];
        list.push('districtNuevaPraderaScene1', 'districtNuevaPraderaScene2');
        return list;
    }
    // VALUES NEED TO CHANGE
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingNuevaPradera',this.special_building,330000,3,17,0);}
};