
export default class Player {
    constructor(money, maxEnergy, energy, corruption, popularity, PNGpresident) {
        this.money = money;
        this.maxEnergy = maxEnergy;
        this.energy = energy;
        this.corruption = corruption;
        this.popularity = popularity;
        this.PNGpresident = PNGpresident;

        // COSAS PARA EL MERCADO NEGRO
        this.hotelDiscount = 0;
        this.globalIncomeMultiplier = 1.0;
        this.missionMultiplier = 1;
    }

    spawnPresident(scene) {return scene.add.image(15, 15, this.PNGpresident).setDisplaySize(224, 287).setOrigin(0).setDepth(19);}
    getMoney(){ return this.money; }
    updateMoney(amount){this.money += amount;}
    getMaxEnergy() { return this.maxEnergy; }
    updateMaxEnergy(amount) { this.maxEnergy += amount; }
    getEnergy(){ return this.energy; }
    setEnergy(amount) { this.energy = amount };
    updateEnergy(amount){ this.energy += amount;}
    getCorruption(){ return this.corruption; }
    updateCorruption(amount){ this.corruption += amount; }
    getPopularity(){ return this.popularity; }
    updatePopularity(amount){ this.popularity = amount; }

    // EFECTOS DEL MERCADO NEGRO
    addHotelDiscount(amount) { this.hotelDiscount += amount; }
    addGlobalIncomeMultiplier(amount) { this.globalIncomeMultiplier += amount; }
    activateMissionMultiplier(value) { this.missionMultiplier = value;}
}