
export default class District {
    constructor(name, desc, population,populationIncrease, satisfaction, district_building ,buildings, space_building, special_building, opositors, PNGwithOutSpecial, PNGwithSpecial, posX, posY) {
        if (new.target === District) {
            throw new TypeError("Cannot instantiate abstract class District");
        }
        
        this.name = name;                                                                                       // Name of the district
        this.desc = desc;                                                                                       // Description of the district                              
        this.population = population;                                                                           // Population of the district    
        this.populationIncrease = populationIncrease;                                                           // Population increase of the district
        this.satisfaction = satisfaction;                                                                       // Satisfaction of the population in the district
        this.district_building = district_building;                                                             // District building that can be built in the district
        this.buildings = buildings;                                                                             // List of buildings built in the district
        this.space_building = space_building;                                                                   // Space where buildings its posible in the district
        this.special_building = special_building;                                                               // Special building that can be built in the district
        this.oppositors = opositors;                                                                            // Opositors that can be found in the district
        this.PNGwithOutSpecial = PNGwithOutSpecial;                                                             // PNG of the district without the special building
        this.PNGwithSpecial = PNGwithSpecial;                                                                   // PNG of the district with the special building         
        this.posX = posX;                                                                                       // Position X of the district in the map
        this.posY = posY;                                                                                       // Position Y of the district in the map
        this.taxes = 50;                                                                                        // Percentage 0-100
        this.security = 50;
        this.workSchedule = 50;
        this.cleaning = 50;
        
        /*COMO JAVA
        String name;
        String desc;
        int population;
        int populationIncrease;
        int satisfaction;
        List<Building> district_building;
        List<Building> buildings;
        int space_building;
        boolean special_building;
        int opositors;
        List<String> parameters;
        List<Double> parameters_multipliers;
        String PNGwithOutSpecial;
        String PNGwithSpecial;
        int posX;
        int posY;
        */
    
    }
    spawnDistrict(scene){
        const button = scene.add.image(this.posX, this.posY, this.PNGwithOutSpecial)
            .setOrigin(0)
            .setScale(1)
            .setInteractive({ useHandCursor: true });
        button.on('pointerover', () => {button.setScale(1.01);});
        button.on('pointerout', () => {button.setScale(1);});
        button.on('pointerup', () => {          // MODIFICAR EL TEXTO DEL FOOTER CON LA DESCRIPCION DEL DISTRITO
            scene.updateDistrictFooter(this);
            scene.scene.pause('level');
            scene.scene.launch('districtScene', { district: this });
            scene.scene.bringToTop('districtScene');
        });
        return button;
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
    getPNGwithOutSpecial() {return this.PNGwithOutSpecial;}
    getPNGwithSpecial() {return this.PNGwithSpecial;}
    getPosX() {return this.posX;}
    getPosY() {return this.posY;}


    increaseNormalPopulation() {this.population += this.populationIncrease;}
    increaseBoostedPopulation(populationIncrease) {this.population += populationIncrease;}
    decreaseBoostedPopulation(populationDecrease) {                             
        this.population -= populationDecrease;
        if(this.population < 0) {
            this.population = 0;
        }
    }
    increasePopulationIncrease(populationIncrease) {this.populationIncrease += populationIncrease;}
    modifySatisfaction(satisfaction) {this.satisfaction += satisfaction;}

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

    swapDistrict(scene) {
        if(this.special_building) return scene.add.image(this.posX, this.posY, this.PNGwithSpecial).setOrigin(0).setScale(0.6);
        else return scene.add.image(this.posX, this.posY, this.PNGwithOutSpecial).setOrigin(0).setScale(0.6);
    }
    //DISTRICT PERCENTAGE
    getTaxesPercentage() {return this.taxes;}
    getSecurityPercentage() {return this.security;}
    getWorkSchedulePercentage() {return this.workSchedule;}
    getCleaningPercentage() {return this.cleaning;}

    addTaxesPercentage(quantity){
        if((quantity+this.taxes)>=100) this.taxes = 100;
        else if((quantity+this.taxes)<=0) this.taxes = 0;
        else this.taxes+=quantity;
    }
    addSecurityPercentage(quantity){
        if((quantity+this.security)>=100) this.security = 100;
        else if((quantity+this.security)<=0) this.security = 0;
        else this.security+=quantity;
    }
    addWorkSchedulePercentage(quantity){
        if((quantity+this.workSchedule)>=100) this.workSchedule = 100;
        else if((quantity+this.workSchedule)<=0) this.workSchedule = 0;
        else this.workSchedule+=quantity;
    }
    addCleaningPercentage(quantity){
        if((quantity+this.cleaning)>=100) this.cleaning = 100;
        else if((quantity+this.cleaning)<=0) this.cleaning = 0;
        else this.cleaning+=quantity;
    }

}