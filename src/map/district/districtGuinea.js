import District from './district';

export default class DistrictGuinea extends District {
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, special_building,
         opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, special_building,
             opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
    createSceneList(){
        const list = [];
        list.push('districtGuineaScene1');
        return list;
    }
};