export default class Building {
    constructor(PNGBuilding,name,cost,income,satisfaction) {
        this.PNGBuilding = PNGBuilding;
        this.name = name;
        this.cost = cost;
        this.income = income;
        this.satisfaction = satisfaction;
    }
    getName(){return this.name;}
    getBuildingInfo(population,taxes){
        const generatedIncome = Math.round(this.income * population * (taxes / 100));
        return ` Edificio: ${this.name}\n Coste:  ${this.cost}$\n Genera: ${generatedIncome}$ \n Satisfaccion: ${this.satisfaction}`;
    }
    getBuildingCost(){return this.cost};
    getBuildingIncome(){return this.income;}
    getBuildingSatisfaction(){return this.satisfaction;}
    getBuildingPNG(){return this.PNGBuilding;}
}