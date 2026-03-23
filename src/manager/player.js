
export default class Player {
    constructor(money, energy, corruption, popularity, PNGpresident){
        this.money = money;
        this.energy = energy;
        this.corruption = corruption;
        this.popularity = popularity;
        this.PNGpresident = PNGpresident;
    }

    spawnPresident(scene) {return scene.add.image(120, 150, this.PNGpresident).setDisplaySize(200, 350);}
    getMoney(){ return this.money; }
    updateMoney(amount){ 
        if(this.money + amount < 0) this.money = 0;
        else this.money += amount;
    }
    getEnergy(){ return this.energy; }
    updateEnergy(amount){ this.energy += amount;}
    getCorruption(){ return this.corruption; }
    updateCorruption(amount){ this.corruption += amount; }
    getPopularity(){ return this.popularity; }
    updatePopularity(amount){ this.popularity += amount; }
}