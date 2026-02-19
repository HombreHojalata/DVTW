import Phaser from 'phaser'
import Base from './base.js';

export default class District extends Phaser.GameObjects.Sprite{
    constructor(name, desc, population, satisfaction, buildings, space_building, special_building, opositors, parameters, parameters_multipliers) {
        if (new.target === District) {
            throw new TypeError("Cannot instantiate abstract class District");
        }
        this.name = name;                                                                                       // Name of the district
        this.desc = desc;                                                                                       // Description of the district                              
        this.population = population;                                                                           // Population of the district    
        this.satisfaction = satisfaction;                                                                       // Satisfaction of the population in the district
        this.buildings = buildings;                                                                             // List of buildings that can be built in the district
        this.space_building = space_building;                                                                   // Space where buildings its posible in the district
        this.special_building = special_building;                                                               // Special building that can be built in the district
        this.oppositors = opositors;                                                                            // Opositors that can be found in the district
        this.parameters = parameters;                                                                           // List of parameters that can be affected by the district   
        this.parameters_multipliers = parameters_multipliers;                                                   // List of multipliers for the parameters that can be affected by the district
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.desc;
    }

    getPopulationDensity() {
        return this.population;
    }

    getInfo() {
        throw new Error("getInfo() must be implemented");
    }
}

module.exports = District;