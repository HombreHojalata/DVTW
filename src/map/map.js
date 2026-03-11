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
    selectDistrict(key) {
        if(this.districtsKey.includes(key)) {
            return this.districts[key];
        }
    }
    modifyDistrict(key, value) {
        if(this.districtsKey.includes(key)) {
            this.districtList[key].increaseBoostedPopulation(value);
        }
    }
    generateDistrictsMoney() {
        let money = 0;
        for(let key of this.districtsKey) money += this.districtList[key].generateMoneyFromBuildings();
        return money;
    }
}