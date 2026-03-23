import Building from './building';

export default class BuildingFactory extends Building {
    constructor(PNGBuilding,coste,beneficio,satisfaccion,poblacion) {
        super(PNGBuilding,coste,beneficio,satisfaccion,poblacion);
    }   
};