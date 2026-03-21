export default class Building {
    constructor(PNGBuilding,name,coste,beneficio,satisfaccion,poblacion) {
        this.name = name;
        this.PNGBuilding = PNGBuilding;
        this.coste = coste;
        this.beneficio = beneficio;
        this.satisfaccion = satisfaccion;
        this.poblacion = poblacion;
    }
    getName(){return this.name;}
    getBuildingPNG(){return this.PNGBuilding;}
    getBuildingInfo(){return `Este edificio genera:\nBeneficio - ${this.beneficio}, Satisfaccion - ${this.satisfaccion}, Poblacion - ${this.poblacion} `;}
    getBuildingPrice(){return this.coste};
}