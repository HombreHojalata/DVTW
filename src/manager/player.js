import Phaser from 'phaser';

export default class Player {
    constructor(money, energy, corruption, popularity){
        this.money = money;
        this.energy = energy;
        this.corruption = corruption;
        this.popularity = popularity;
    }

    updateMoney(amount){
        this.money += amount;
    }

    getMoney(){ return this.money; }
    getEnergy(){ return this.energy; }
    getCorruption(){ return this.corruption; }
    getPopularity(){ return this.popularity; }
}