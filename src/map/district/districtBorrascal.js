    import District from './district';
import SpecialBuilding from '../building/specialBuildingBorrascal.js';

export default class DistrictBorrascal extends District{
    constructor(name, desc, population, district_building, buildings, space_building, is_special_built, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, district_building, buildings, space_building, is_special_built, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );

        this.addTaxesPercentage(43);        //7
        this.addSecurityPercentage(14);     //4
        this.addWorkSchedule(6);            //2
        this.addCleaningPercentage(12);     //2
        this.updateAfterModifyPercentage();
    }
    getSceneNormal() {return 'districtBorrascalSceneNormal';}
    getSceneSpecial() {return 'districtBorrascalSceneSpecial';}
    getSpecialBuilding() {return new SpecialBuilding('specialBuildingBorrascal',"CENTRO DE INVESTIGACIÓN",240000,4,10);}
};
