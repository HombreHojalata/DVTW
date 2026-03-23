import MissionManager from './manager/missionManager.js'
import Player from './manager/player.js';
import Day from './manager/day.js';
import Map from './map/map.js'


export default class gameManager{
    constructor(scene,game){
        this.scene = scene;
        this.game = game;
        this.player = new Player(1000000, 100, 20, 80 , 'presidente' , 'presidente');
        this.day=new Day(0);
        this.missionManager = new MissionManager(scene,this.player);
        this.map = new Map('map',null,null);
    }
    getPlayer(){return this.player};
    getMap(){return this.map};
    getDay(){return this.day};
    getMission(){return this.missionManager.getMission();}
    spawnAssets(scene){
        this.mapImg = this.map.spawnMap(scene);
        this.districtList = this.map.spawnDistricts(scene);
        this.presidente = this.player.spawnPresident(scene);
    }

}