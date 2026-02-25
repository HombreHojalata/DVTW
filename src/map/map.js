export default class Map {
    constructor(districtList) {
        this.districts = districtList;
        this.districtsKey = districtList ? Object.keys(districtList) : [];
    }

    getDistricts(key) {
        return this.districts[key];
    }
    modifyDistrict(key, value) {
        if(this.districtsKey.includes(key)) {
            this.districts[key].increaseBoostedPopulation(value);
        }
    }
}