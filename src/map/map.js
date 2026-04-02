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
            "BORRASCAL", "", 
            7000, 1000, 34, 5000,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["HOTEL"], 5,
            false, "CENTER_INVESTI",
            'districtBorrascal', 'districtBorrascalSpecial', -15, -13
        );
        const EL_NIDO = new DistrictElNido(
            "EL_NIDO", "Any", 
            10000, 2000, 55, 10000,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["HOSPITAL"], 3,
            false, "COPITOLIO",
            'districtElNido', 'districtElNidoSpecial', -17, -18
        );
        const GUINEA = new DistrictGuinea(
            "GUINEA", "Any", 
            6500, 1500, 30, 7000,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["COMERCIAL"], 4,
            false, "TEATRE", 
            'districtGuinea', 'districtGuineaSpecial', -10, -15
        );
        const NUEVA_PRADERA = new DistrictNuevaPradera(
            "NUEVA_PRADERA", "Any", 
            14000, 3000, 14, 5000,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["CINEMA"], 5,
            false, "ENPAWIRE",
            'districtNuevaPradera', 'districtNuevaPraderaSpecial', -17, -19
        )
        const SAHAR = new DistrictSahar(
            "SAHAR", "En el extrarradio de la ciudad se extiende el distrito de Sahar, una larga explanada bajo el sol. Los reptiles y animales deserticos de esta zona viven en condiciones humildes, pero un presidente no se debe preocupar por problemas tan insignificantes como ese. Es mucho mas interesante todo el terreno de construcion.",
            2000, 500, 5, 1000,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], [], 6,
            false, "RESTAURANT", 
            'districtSahar', 'districtSaharSpecial', -10, -17
        );
        const SOMOSAGUA = new DistrictSomosagua(
            "SOMOSAGUA", "Any", 
            4000, 1000, 45, 10000,
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
}