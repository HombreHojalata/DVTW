export default class Building {
    constructor(PNGBuilding,name,cost,income,satisfaction) {
        this.PNGBuilding = PNGBuilding;
        this.name = name;
        this.cost = cost;
        this.income = income;
        this.satisfaction = satisfaction;
    }
    getName(){return this.name;}
    getBuildingInfo(){return `Este edificio cuesta ${this.cost} y genera:\nBeneficio: ${this.income}, Satisfaccion: ${this.satisfaction}\nEl beneficio es lo que genera de dinero por cada ciclo de energia\nLa satisfaccion es lo cuan feliz hace a los habitantes`;}
    getBuildingCost(){return this.cost};
    getBuildingIncome(){return this.income;}
    getBuildingSatisfaction(){return this.satisfaction;}
    getBuildingPNG(){return this.PNGBuilding;}
}