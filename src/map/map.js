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
            ["Casino"], [], 2,
            ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
            'districtBorrascal', 'districtBorrascalSpecial', 1200, 150
        );
        const EL_NIDO = new DistrictElNido(
            "EL_NIDO", "Any", 500, 8, 40,
            ["Casino"], [], 2,
            ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
            'districtElNido', 'districtElNidoSpecial', 800, 400
        );
        const GUINEA = new DistrictGuinea(
            "GUINEA", "Any", 700, 14, 30,
            ["Casino"], ["Parque", "Jardin"], 2,
            ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
            //'districtGuinea', 'districtGuineaSpecial', 62, 103
            'districtGuineaSpecial', 'districtGuineaSpecial', 62, 103
        );
        const NUEVA_PRADERA = new DistrictNuevaPradera(
            "NUEVA_PRADERA", "Any", 1400, 18, 5,
            ["Casino"], [], 2,
            ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
            'districtNuevaPradera', 'districtNuevaPraderaSpecial', 900, 550
        );
        const SAHAR = new DistrictSahar(
            "SAHAR", "Any", 600, 20, 15,
            //BUILDINGS LIST, BUILDINGS BUILT
            ["Casino"], [], 2,
            ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
            'districtSahar', 'districtSaharSpecial', 182, 280
        );
        const SOMOSAGUA = new DistrictSomosagua(
            "SOMOSAGUA", "Any", 800, 12, 10,
            ["Casino"], [], 2,
            ["Hotel"], 10, ["Satisfacción", "Peligro"], [1, 1.5],
            'districtSomosagua', 'districtSomosaguaSpecial', 700, 200
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
        if(this.districtsKey.includes(key)) {
            this.districtList[key].increaseBoostedPopulation(value);
        }
    }
    generateDistrictsMoney() {
        let money = 0;
        this.districtList.forEach(d => money += d.generateMoneyFromBuildings());
        return money;
    }
}