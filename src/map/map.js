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
        const BORRASCAL = new DistrictBorrascal(
            "BORRASCAL", "Any", 1000, 10, 100,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["HOTEL"], 4,
            false, "CENTER_INVESTI", 10,
            'districtBorrascal', 'districtBorrascalSpecial', -15, -13
        );
        const EL_NIDO = new DistrictElNido(
            "EL_NIDO", "Any", 500, 8, 40,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["HOSPITAL"], 4,
            false, "COPITOLIO",10,
            'districtElNido', 'districtElNidoSpecial', -17, -18
        );
        const GUINEA = new DistrictGuinea(
            "GUINEA", "Any", 700, 14, 30,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["COMERCIAL"], 4,
            false, "TEATRE", 10,
            'districtGuinea', 'districtGuineaSpecial', -10, -15
        );
        const NUEVA_PRADERA = new DistrictNuevaPradera(
            "NUEVA_PRADERA", "Any", 1400, 18, 5,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["CINEMA"], 4,
            false, "ENPAWIRE", 10, 
            'districtNuevaPradera', 'districtNuevaPraderaSpecial', -17, -19
        )
        const SAHAR = new DistrictSahar(
            "SAHAR", "En el extrarradio de la ciudad se extiende el distrito de Sahar, una larga explanada bajo el sol. Los reptiles y animales deserticos de esta zona viven en condiciones humildes, pero un presidente no se debe preocupar por problemas tan insignificantes como ese. Es mucho mas interesante todo el terreno de construcion.",600, 20, 15,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], [], 2,
            false, "RESTAURANT", 10,
            'districtSahar', 'districtSaharSpecial', -10, -17
        );
        const SOMOSAGUA = new DistrictSomosagua(
            "SOMOSAGUA", "Any", 800, 12, 10,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["FACTORY"], 4,
            false, "INDUSTRY", 10,
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
    spawnMap(scene){return scene.add.image(0,-10, this.mapSiluete).setOrigin(0);}
    spawnDistricts(scene){this.districtList.forEach(d => d.spawnDistrict(scene,true));}
    getDistrictByName(name) {return this.districtList.find(d => d.getName() === name) || null;}

    /*generateDistrictsMoney() {
        let money = 0;
        this.districtList.forEach(d => money += d.generateMoneyFromBuildings());
        return money;
    }*/
}