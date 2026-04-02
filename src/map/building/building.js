export default class Building {
    constructor(PNGBuilding,name,cost,income,satisfaction,populationIncrease) {
        this.PNGBuilding = PNGBuilding;
        this.name = name;
        this.cost = cost;
        this.income = income;
        this.satisfaction = satisfaction;
        this.populationIncrease = populationIncrease;
    }
    getName(){return this.name;}
    getBuildingInfo(){return `Este edificio "${this.name}" genera:\nBeneficio - ${this.income}, Satisfaccion - ${this.satisfaction}, Poblacion - ${this.populationIncrease} `;}
    getBuildingCost(){return this.cost};
    getBuildingIncome(){return this.income;}
    getBuildingSatisfaction(){return this.satisfaction;}
    getBuildingPopulationIncrease(){return this.populationIncrease;}
    getBuildingPNG(){return this.PNGBuilding;}
}