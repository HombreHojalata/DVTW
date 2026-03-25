
export default class Player {
    constructor(money, maxEnergy, energy, corruption, popularity, PNGpresident){
        this.money = money;
        this.maxEnergy = maxEnergy;
        this.energy = energy;
        this.corruption = corruption;
        this.popularity = popularity;
        this.PNGpresident = PNGpresident;
    }

    spawnPresident(scene) {return scene.add.image(120, 150, this.PNGpresident).setDisplaySize(200, 350).setDepth(5);}
    getMoney(){ return this.money; }
    updateMoney(amount){ 
        if(this.money + amount < 0) this.money = 0;
        else this.money += amount;
    }
    getMaxEnergy() { return this.maxEnergy; }
    updateMaxEnergy(amount) { this.maxEnergy += amount; }
    getEnergy(){ return this.energy; }
    setEnergy(amount) { this.energy = amount };
    updateEnergy(amount){ this.energy += amount;}
    getCorruption(){ return this.corruption; }
    updateCorruption(amount){ this.corruption += amount; }
    getPopularity(){ return this.popularity; }
    updatePopularity(amount){ this.popularity += amount; }
}