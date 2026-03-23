export default class Building {
    constructor(PNGBuilding,name,cost,income,satisfaction,population) {
        this.PNGBuilding = PNGBuilding;
        this.name = name;
        this.cost = cost;
        this.income = income;
        this.satisfaction = satisfaction;
        this.population = population;
    }
    getName(){return this.name;}
    getBuildingInfo(){return `Este edificio "${this.name}" genera:\nBeneficio - ${this.income}, Satisfaccion - ${this.satisfaction}, Poblacion - ${this.population} `;}
    getBuildingCost(){return this.cost};
    getBuildingIncome(){return this.income;}
    getBuildingSatisfaction(){return this.satisfaction;}
    getBuildingPopulation(){return this.population;}
    getBuildingPNG(){return this.PNGBuilding;}
}