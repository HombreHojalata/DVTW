import BuildingCinema from "../building/buildingCinema.js";
import BuildingComercialCenter from "../building/buildingComercialCenter.js";
import BuildingFactory from "../building/buildingFactory.js";
import BuildingHospital from "../building/buildingHospital.js";
import BuildingHotel from "../building/buildingHotel.js";
import BuildingHouse from "../building/buildingHouse.js";
import BuildingPark from "../building/buildingPark.js";

export default class District {
    constructor(name, desc, population,populationIncrease, satisfaction, 
        district_building ,buildings, space_building, 
        is_special_built, special_building, opositors, 
        PNGwithOutSpecial, PNGwithSpecial, posX, posY) {

        this.name = name;                                                                                       // Name of the district
        this.desc = desc;                                                                                       // Description of the district                              
        this.population = population;                                                                           // Population of the district    
        this.populationIncrease = populationIncrease;                                                           // Population increase of the district
        this.satisfaction = satisfaction;                                                                       // Satisfaction of the population in the district
        this.district_building = this.createBuildings(district_building);                                       // District building that can be built in the district
        this.building_list = this.createBuildings(buildings);                                                   // List of buildings built in the district
        this.space_building = space_building;                                                                   // Space where buildings its posible in the district
        this.is_special_built = is_special_built;                                                               // Is the special building built in this district
        this.special_building = special_building;                                                               // Special building that can be built in the district
        this.opositors = opositors;                                                                             // Opositors that can be found in the district
        this.PNGwithOutSpecial = PNGwithOutSpecial;                                                             // PNG of the district without the special building
        this.PNGwithSpecial = PNGwithSpecial;                                                                   // PNG of the district with the special building         
        this.scene_list = this.createSceneList();                                                               // List of scenes for each districtScene
        this.posX = posX;                                                                                       // Position X of the district in the map
        this.posY = posY;                                                                                       // Position Y of the district in the map
        this.taxes = 50;                                                                                        // Percentage 0-100
        this.security = 50;
        this.workSchedule = 50;
        this.cleaning = 50;
    }

    // ASSETS
    spawnDistrict(scene){
        this.texture = this.is_special_built ? this.PNGwithSpecial : this.PNGwithOutSpecial;
        const button = scene.add.image(this.posX, this.posY, this.texture).setOrigin(0).setScale(1)
            .setInteractive({
                useHandCursor: true,
                pixelPerfect: true
            });
        const outline = scene.add.graphics();
        outline.lineStyle(3, 0xcccccc, 1);
        outline.setDepth(10);
        outline.setPosition(-5, -10);
        if(this.polygonPts && this.polygonPts.length > 0){
            outline.beginPath();
            outline.moveTo(this.polygonPts[0].x, this.polygonPts[0].y);
            for(let i = 1; i < this.polygonPts.length; i++)
                outline.lineTo(this.polygonPts[i].x, this.polygonPts[i].y);
            outline.closePath();
            outline.strokePath();
        }
        outline.setVisible(false);
        button.on('pointerover', () => {outline.setVisible(true);});
        button.on('pointerout', () => {outline.setVisible(false);});
        button.on('pointerup', () => {
            scene.updateDistrictFooter(this);
            scene.scene.pause('gameScene');
            scene.scene.launch('districtScene', { district: this});
        });
        return button;
    }
    getPNGwithOutSpecial() {return this.PNGwithOutSpecial;}
    getPNGwithSpecial() {return this.PNGwithSpecial;}
    // SCENES
    getSceneList() {return this.scene_list}
    createSceneList(){throw new Error('createSceneList() debe implementarse en la subclase');}
    
    getName() {return this.name;}
    getDescription() {return this.desc;}
    getOpositors() {return this.opositors;}
    //getPosX() {return this.posX;}
    //getPosY() {return this.posY;}

    //POPULATION
    getPopulation() {return this.population;}
    increasePopulationCicle(){this.population += this.populationIncrease;}
    increasePopulation(value) {
        if(this.population += value <= 0) this.population = 0;
        else this.population += value;
    }
    increasePopulationPercetange(value){
        if(this.populationIncrease += value <= 0) this.populationIncrease = 0;
        else this.populationIncrease += value;
    }
    getPopulationIncrease() {return this.populationIncrease;}
    //SATISFACTION
    getSatisfaction() {return this.satisfaction;}
    updateSatisfaction(satisfaction) {this.satisfaction += satisfaction;}
    //DISTRICT PERCENTAGE
    getTaxesPercentage() {return this.taxes;}
    getSecurityPercentage() {return this.security;}
    getWorkSchedulePercentage() {return this.workSchedule;}
    getCleaningPercentage() {return this.cleaning;}
    addTaxesPercentage(quantity){
        if((quantity+this.taxes)>=100) this.taxes = 100;                                            //THIS TWO IF,ELSE WE DONT REALLY NEED IT 
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
    //BUILDINGS
    getBuildingsList() {return this.district_building;}         
    getBuildingsBuilt() {return this.building_list;}
    getSpaceBuilding() {return this.space_building;}
    isSpecialBuildingBuilt() {return this.is_special_built;}
    getSpecialBuilding() {throw new Error('createSceneList() debe implementarse en la subclase');}
    canBuildMore() {return this.building_list.length < this.space_building;}
    createBuildings(buildings){
        const buildingList = [];
        for(let i = 0 ; i < buildings.length; i++){
            if(buildings[i] === "CINEMA") buildingList.push(new BuildingCinema('buildingCinema',"CINEMA",10000,5000,5,0));
            else if(buildings[i] === "COMERCIAL") buildingList.push(new BuildingComercialCenter('buildingComercialCenter',"COMERCIAL",30000,20000,10,0));
            else if(buildings[i] === "FACTORY") buildingList.push(new BuildingFactory('buildingFactory',"FACTORY",50000,30000,-5,0));
            else if(buildings[i] === "HOSPITAL") buildingList.push(new BuildingHospital('buildingHospital',"HOSPITAL",60000,40000,5,20));
            else if(buildings[i] === "HOTEL") buildingList.push(new BuildingHotel('buildingHotel',"HOTEL",20000,10000,5,5));
            else if(buildings[i] === "HOUSE") buildingList.push(new BuildingHouse('buildingHouse',"HOUSE",5000,500,5,5));
            else if(buildings[i] === "PARK") buildingList.push(new BuildingPark('buildingPark',"PARK",10000,1000,15,0));
        }
        return buildingList;
    }
    addBuilding(building) {
        if (this.district_building.includes(building)) {
            if(this.building_list.length < this.space_building)
                this.building_list.push(building);
                //if(building === "CINEMA") building_list.push(new BuildingCinema('buildingCinema',"CINEMA",10000,5000,5,0,0));
                //else if(building === "COMERCIAL") building_list.push(new BuildingComercialCenter('buildingComercialCenter',"COMERCIAL",30000,20000,10,0,0));
                //else if(building === "FACTORY") building_list.push(new BuildingFactory('buildingFactory',"FACTORY",50000,30000,-5,0,0));
                //else if(building === "HOSPITAL") building_list.push(new BuildingHospital('buildingHospital',"HOSPITAL",60000,40000,5,0,20));
                //else if(building === "HOTEL") building_list.push(new BuildingHotel('buildingHotel',"HOTEL",20000,10000,5,0,5));
                //else if(building === "HOUSE") building_list.push(new BuildingHouse('buildingHouse',"HOUSE",5000,500,5,0,5));
                //else if(building === "PARK") building_list.push(new BuildingPark('buildingPark',"PARK",10000,1000,15,0,0));
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
        if (!this.is_special_built && this.special_building === building.getName()) {
            if(this.building_list.length < this.space_building){
                this.building_list.push(building); 
                this.is_special_built = true;
            }
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