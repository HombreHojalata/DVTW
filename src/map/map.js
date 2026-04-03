import DistrictBorrascal from './district/districtBorrascal.js';
import DistrictElNido from './district/districtElNido.js';
import DistrictGuinea from './district/districtGuinea.js';
import DistrictNuevaPradera from './district/districtNuevaPradera.js';
import DistrictSahar from './district/districtSahar.js';
import DistrictSomosagua from './district/districtSomosagua.js';

export default class Map {
    constructor(mapSiluete, JSONwithOutSpecial, JSONwithSpecial) {
        this.mapSiluete = mapSiluete;
        this.JSONwithOutSpecial = JSONwithOutSpecial;
        this.JSONwithSpecial = JSONwithSpecial;
        this.districtList = this.createList();
    }
    createList(){
        //(name, desc, 
        //population,populationIncrease, satisfaction, moneyGenerated,
        //district_building ,buildings, space_building, 
        //is_special_built, special_building, 
        //PNGwithOutSpecial, PNGwithSpecial, posX, posY)
        const BORRASCAL = new DistrictBorrascal(
            "BORRASCAL", "Aquí es donde los presupuestos públicos se congelan. Sin embargo, a pesar de ello el distrito de Borrascal es famoso por sus laboratorios e investigaciones. Una pena que sean demasiado caras.", 
            7000, 1000, 20, 1,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["HOTEL"], 5,
            false, "CENTER_INVESTI",
            'districtBorrascal', 'districtBorrascalSpecial', -15, -13
        );
        const EL_NIDO = new DistrictElNido(
            "EL_NIDO", "Donde el aire es puro y los impuestos son bajos. El Nido es el lujoso hogar de la aristocracia emplumada, y están muy acostumbrados a gastar su dinero en comercios de alto standing.", 
            10000, 2000, 31, 2,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["HOSPITAL"], 3,
            false, "COPITOLIO",
            'districtElNido', 'districtElNidoSpecial', -17, -18
        );
        const GUINEA = new DistrictGuinea(
            "GUINEA", "Un paraíso artificial constuido para que turítas de todo el mundo vengan a finjir amor por la naturaleza. Los festivales de Guinea son conocidos por su importancia cultural, y su gran beneficio.", 
            6500, 1500, 17, 1.5,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["COMERCIAL"], 4,
            false, "TEATRE", 
            'districtGuinea', 'districtGuineaSpecial', -10, -15
        );
        const NUEVA_PRADERA = new DistrictNuevaPradera(
            "NUEVA_PRADERA", "El hogar ideal para la clase media, llena de vallas blancas y gente obediente de las normal. Nueva Pradera es un distrito fácil de ignorar, pero hay que tener cuidado con decepcionar a sus muchos vecinos.", 
            14000, 3000, 8, 1,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["CINEMA"], 5,
            false, "ENPAWIRE",
            'districtNuevaPradera', 'districtNuevaPraderaSpecial', -17, -19
        )
        const SAHAR = new DistrictSahar(
            "SAHAR", "Una explanada bajo el sol olvidada por la clase alta, pero no por el recaudador de impuestos. Sahar el sitio ideal para contruir para las grandes empresas, es lo bueno de los barrios porbes: no hay nadie importante que pueda quejarse.",
            2000, 500, 5, 0.5,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], [], 6,
            false, "RESTAURANT", 
            'districtSahar', 'districtSaharSpecial', -10, -17
        );
        const SOMOSAGUA = new DistrictSomosagua(
            "SOMOSAGUA", "La zona industrial de la ciudad: si el agua huele a azufre, es que el progreso va bien. Los vecinos de Somosagua están acostumbrados a la contaminación, por lo que no se quejarán mucho si ampliamos el número de fábricas.", 
            4000, 1000, 24, 2,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["FACTORY"], 4,
            false, "INDUSTRY",
            'districtSomosagua', 'districtSomosaguaSpecial', -17, -17
        );
        const districtArray = [
            BORRASCAL,
            GUINEA,
            SAHAR,
            SOMOSAGUA,
            EL_NIDO,
            NUEVA_PRADERA,
        ];
        return districtArray;
    }
    spawnMap(scene){return scene.add.image(0, -10, this.mapSiluete).setOrigin(0);}
    //spawnDistricts(scene){this.districtList.forEach(d => d.spawnDistrict(scene,true));}
    spawnDistricts(scene){
        const cutouts = scene.cache.json.get('mapCutout');
        let tiledObj = [];
        if(cutouts && cutouts.layers){
            const objLayer = cutouts.layers.find(layer => layer.type === 'objectgroup');
            if(objLayer)
                tiledObj = objLayer.objects;
        }
        this.districtList.forEach(d => {
            const shape = tiledObj.find(obj => obj.name.toLowerCase() === d.getName().toLowerCase());
            if(shape && shape.polygon)
                d.polygonPts = shape.polygon.map(pt => {
                    return {x: pt.x + shape.x, y: pt.y + shape.y};
                });
            d.spawnDistrict(scene);
        });
    }
    getDistrictByName(name) {return this.districtList.find(d => d.getName() === name) || null;}
    // UPDATE DATA
    updateDistricts() {this.districtList.forEach(d => d.updateDistrict());}
    getTotalPopulation(){
        let totalPopulation = 0;
        totalPopulation += this.getDistrictByName("BORRASCAL").getPopulation();
        totalPopulation += this.getDistrictByName("EL_NIDO").getPopulation();
        totalPopulation += this.getDistrictByName("GUINEA").getPopulation();
        totalPopulation += this.getDistrictByName("NUEVA_PRADERA").getPopulation();
        totalPopulation += this.getDistrictByName("SAHAR").getPopulation();
        totalPopulation += this.getDistrictByName("SOMOSAGUA").getPopulation();
        return totalPopulation;
    }
    getPopularity(){
        let totalPopularity = 0;
        totalPopularity += this.getDistrictByName("BORRASCAL").getPopulation() * this.getDistrictByName("BORRASCAL").getSatisfaction() / 100;
        totalPopularity += this.getDistrictByName("EL_NIDO").getPopulation() * this.getDistrictByName("EL_NIDO").getSatisfaction() / 100;
        totalPopularity += this.getDistrictByName("GUINEA").getPopulation() * this.getDistrictByName("GUINEA").getSatisfaction() / 100;
        totalPopularity += this.getDistrictByName("NUEVA_PRADERA").getPopulation() * this.getDistrictByName("NUEVA_PRADERA").getSatisfaction() / 100;
        totalPopularity += this.getDistrictByName("SAHAR").getPopulation() * this.getDistrictByName("SAHAR").getSatisfaction() / 100;
        totalPopularity += this.getDistrictByName("SOMOSAGUA").getPopulation() * this.getDistrictByName("SOMOSAGUA").getSatisfaction() / 100;
        return totalPopularity;
    }
    getMoneyGenerated(){
        let totalMoneyGenerated = 0;
        totalMoneyGenerated += this.getDistrictByName("BORRASCAL").getMoneyGenerated();
        totalMoneyGenerated += this.getDistrictByName("EL_NIDO").getMoneyGenerated();
        totalMoneyGenerated += this.getDistrictByName("GUINEA").getMoneyGenerated();
        totalMoneyGenerated += this.getDistrictByName("NUEVA_PRADERA").getMoneyGenerated();
        totalMoneyGenerated += this.getDistrictByName("SAHAR").getMoneyGenerated();
        totalMoneyGenerated += this.getDistrictByName("SOMOSAGUA").getMoneyGenerated();
        return totalMoneyGenerated;
    }
}