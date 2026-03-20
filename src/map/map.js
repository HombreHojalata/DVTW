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
            false, 10,
            'districtBorrascal', 'districtBorrascalSpecial', 0, 0
        );
        const EL_NIDO = new DistrictElNido(
            "EL_NIDO", "Any", 500, 8, 40,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["HOSPITAL"], 4,
            false, 10,
            'districtElNido', 'districtElNidoSpecial', 0, 0
        );
        const GUINEA = new DistrictGuinea(
            "GUINEA", "Any", 700, 14, 30,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["COMERCIAL"], 4,
            false, 10,
            'districtGuinea', 'districtGuineaSpecial', 0, 0
        );
        const NUEVA_PRADERA = new DistrictNuevaPradera(
            "NUEVA_PRADERA", "Any", 1400, 18, 5,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["CINEMA"], 4,
            false, 10, 
            'districtNuevaPradera', 'districtNuevaPraderaSpecial', 0, 0
        )
        const SAHAR = new DistrictSahar(
            "SAHAR", "En el extrarradio de la ciudad se extiende el distrito de Sahar, una larga explanada bajo el sol. Los reptiles y animales deserticos de esta zona viven en condiciones humildes, pero un presidente no se debe preocupar por problemas tan insignificantes como ese. Es mucho mas interesante todo el terreno de construcion.",600, 20, 15,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], [], 2,
            false, 10,
            'districtSahar', 'districtSaharSpecial', -10, -25
        );
        const SOMOSAGUA = new DistrictSomosagua(
            "SOMOSAGUA", "Any", 800, 12, 10,
            ["CINEMA","COMERCIAL","FACTORY","HOSPITAL","HOTEL","HOUSE","PARK"], ["FACTORY"], 4,
            false, 10,
            'districtSomosagua', 'districtSomosaguaSpecial', 0, 0
        );
        const districtArray = [
            BORRASCAL,
            EL_NIDO,
            GUINEA,
            NUEVA_PRADERA,
            SAHAR,
            SOMOSAGUA
        ];
        return districtArray;
    }
    spawnMap(scene){return scene.add.image(0,-10, this.mapSiluete).setOrigin(0);}
    spawnDistricts(scene){this.districtList.forEach(d => d.spawnDistrict(scene));}
    /*getDistricts(key) {return this.districtMap[key];}
    selectDistrict(key) {
        if(this.districtsKey.includes(key)) {
            return this.districts[key];
        }
    }*/             //SHOULD BE WITH GEO...
    modifyDistrict(key, value) {
        if(this.districtsKey.includes(key))
            this.districtList[key].increaseBoostedPopulation(value);
    }
    generateDistrictsMoney() {
        let money = 0;
        this.districtList.forEach(d => money += d.generateMoneyFromBuildings());
        return money;
    }
}