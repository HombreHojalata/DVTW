export default class Map {
    constructor(mapSiluete, JSONwithOutSpecial, JSONwithSpecial, districtList) {
        this.mapSiluete = mapSiluete;
        this.JSONwithOutSpecial = JSONwithOutSpecial;
        this.JSONwithSpecial = JSONwithSpecial;
        this.districts = districtList;
        this.districtsKey = districtList ? Object.keys(districtList) : [];
    }

    spawnMap(scene){
        return scene.add.image(0,-10, this.mapSiluete).setOrigin(0);
    }
    spawnDistricts(scene) {
        for (let key of this.districtsKey)
            this.districts[key].spawnDistrict(scene);
        
    }
    swapDistrictsPNG(scene, key) {
        if(this.districtsKey.includes(key))
            this.districts[key].swapDistrict(scene);
    }

    getDistricts(key) {
        return this.districts[key];
    }
    selectDistrict(key) {
        if(this.districtsKey.includes(key)) {
            return this.districts[key];
        }
    }
    modifyDistrict(key, value) {
        if(this.districtsKey.includes(key)) {
            this.districts[key].increaseBoostedPopulation(value);
        }
    }
}