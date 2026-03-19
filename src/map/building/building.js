export default class Building {
    constructor(PNGBuilding,coste,beneficio,satisfaccion,poblacion) {
        this.PNGBuilding = PNGBuilding;
        this.coste = coste;
        this.beneficio = beneficio;
        this.satisfaccion = satisfaccion;
        this.poblacion = poblacion;
    }

    getBuildingPNG(){return this.PNGBuilding;}
}