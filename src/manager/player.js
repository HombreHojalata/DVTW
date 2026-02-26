import Phaser from 'phaser';


export default class Player extends Phaser.Player{
    constructor(){
        this.money = 0;
        this.energy = 100;
        this.corruption = 0;
        this.popularity = 0;
    }

    
}