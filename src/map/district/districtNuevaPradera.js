import District from './district';

export default class DistrictNuevaPradera extends District {
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, special_building,
         opositors, parameters, parameters_multipliers, PNGwithOutSpecial, PNGwithSpecial, posX, posY ) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, special_building,
             opositors, parameters, parameters_multipliers, PNGwithOutSpecial, PNGwithSpecial, posX, posY );
    }
};