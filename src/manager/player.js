import Phaser from 'phaser';

export default class Player {
    constructor(money, energy, corruption, popularity){
        this.money = money;
        this.energy = energy;
        this.corruption = corruption;
        this.popularity = popularity;
    }

    getMoney(){ return this.money; }
    updateMoney(amount){ this.money += amount;}
    getEnergy(){ return this.energy; }
    updateEnergy(amount){ this.energy += amount;}
    getCorruption(){ return this.corruption; }
    updateCorruption(amount){ this.corruption += amount; }
    getPopularity(){ return this.popularity; }
    updatePopularity(amount){ this.popularity += amount; }
}