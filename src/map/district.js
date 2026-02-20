export default class District {
    
    constructor(name, desc, population,populationIncrease, satisfaction, district_building ,buildings, space_building, special_building, opositors, parameters, parameters_multipliers) {
        if (new.target === District) {
            throw new TypeError("Cannot instantiate abstract class District");
        }
        this.name = name;                                                                                       // Name of the district
        this.desc = desc;                                                                                       // Description of the district                              
        this.population = population;                                                                           // Population of the district    
        this.populationIncrease = populationIncrease;                                                           // Population increase of the district
        this.satisfaction = satisfaction;                                                                       // Satisfaction of the population in the district
        this.district_building = district_building;                                                             // District building that can be built in the district
        this.buildings = buildings;                                                                             // List of buildings that can be built in the district
        this.space_building = space_building;                                                                   // Space where buildings its posible in the district
        this.special_building = special_building;                                                               // Special building that can be built in the district
        this.oppositors = opositors;                                                                            // Opositors that can be found in the district
        this.parameters = parameters;                                                                           // List of parameters that can be affected by the district   
        this.parameters_multipliers = parameters_multipliers;                                                   // List of multipliers for the parameters that can be affected by the district
        /*COMO JAVA
        String name;
        String desc;
        int population;
        int populationIncrease;
        int satisfaction;
        List<Building> district_building;
        List<Building> buildings;
        int space_building;
        Building special_building;
        int opositors;
        List<String> parameters;
        List<Double> parameters_multipliers;
        */
    
    }
    getName() {return this.name;}
    getDescription() {return this.desc;}
    getPopulationDensity() {return this.population;}
    getPopulationIncrease() {return this.populationIncrease;}
    getSatisfaction() {return this.satisfaction;}
    getBuildings() {return this.buildings;}
    getSpaceBuilding() {return this.space_building;}
    getSpecialBuilding() {return this.special_building;}
    getOpositors() {return this.oppositors;}
    getParameters() {return this.parameters;}
    getParametersMultipliers() {return this.parameters_multipliers;}

    getInfo() {throw new Error("getInfo() must be implemented");}

    increaseNormalPopulation() {
        this.population += this.populationIncrease;
    }
    increaseBoostedPopulation(populationIncrease) {
        this.population += populationIncrease;
    }
    increasePopulationIncrease(populationIncrease) {
        this.populationIncrease += populationIncrease;
    }
    modifySatisfaction(satisfaction) {                                                          //COULD BE NEGATIVE OR POSITIVE
        this.satisfaction += satisfaction;
    }

    addBuilding(building) {
        if (this.buildings.includes(building)) {
            if(this.district_building.length < this.space_building)
                this.district_building.push(building);
            else{
                console.log("You can't add more buildings. No more space in the district.");
                throw new Error("No more space in the district.");
            }
        }else{
            console.log("This building doesn't exist in this district.");
            throw new Error("This building doesn't exist in this district.");
        }
    }
    addSpecialBuilding(building) {
        if (this.special_building === building) {
            if(this.district_building.length < this.space_building)
            this.district_building.push(building); 
            else{
                console.log("You can't add more buildings. No more space in the district.");
                throw new Error("No more space in the district.");
            }
        }
        else{
            console.log("This building can't be built in this district.");
            throw new Error("This building can't be built in this district.");
        }
    }
}