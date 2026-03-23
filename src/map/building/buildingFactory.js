import Building from './building';

export default class BuildingFactory extends Building {
    constructor(PNGBuilding,name,coste,beneficio,satisfaccion,poblacion) {
        super(PNGBuilding,name,coste,beneficio,satisfaccion,poblacion);
    }   
};