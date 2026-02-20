import District from './district';

class DistrictBorrascal extends District {
    constructor(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, special_building, opositors, parameters, parameters_multipliers) {
        super(name, desc, population, populationIncrease, satisfaction, district_building, buildings, space_building, special_building, opositors, parameters, parameters_multipliers);
    }
}

export default DistrictBorrascal;