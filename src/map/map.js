export default class Map {
    constructor(mapSiluete, JSONwithOutSpecial, JSONwithSpecial, districtList) {
        this.mapSiluete = mapSiluete;
        this.JSONwithOutSpecial = JSONwithOutSpecial;
        this.JSONwithSpecial = JSONwithSpecial;
        this.districtList = districtList;
        this.districtsKey = districtList ? Object.keys(districtList) : [];
    }

    spawnMap(scene){
        return scene.add.image(0,-10, this.mapSiluete).setOrigin(0);
    }

    getDistricts(key) {
        return this.districtList[key];
    }
    modifyDistrict(key, value) {
        if(this.districtsKey.includes(key)) {
            this.districtList[key].increaseBoostedPopulation(value);
        }
    }
}