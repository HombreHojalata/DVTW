import District from './district';
import SpecialBuilding from '../building/specialBuildingNuevaPradera.js';

export default class DistrictNuevaPradera extends District {
    constructor(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, satisfaction, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    createSceneList(){
        const list = [];
        list.push('districtNuevaPraderaScene1', 'districtNuevaPraderaScene2');
        return list;
    }
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingNuevaPradera',"ENPAWIRE",330000,3,17);}
};