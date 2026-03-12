import Player from './manager/player.js';
import Day from './manager/day.js';


export default class missionManager{
    constructor(){
        this.player = new Player();
        this.day=new Day();
        this.missionManager = new missionManager();
    }
}