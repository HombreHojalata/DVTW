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
        list.push('districtGuineaScene1', 'districtGuineaScene2');
        return list;
    }
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingGuinea',"TEATRO MAGNO",300000,4,20,0);}
};