import MissionManager from './manager/missionManager.js'
import Player from './manager/player.js';
import Day from './manager/day.js';
import Map from './map/map.js'


export default class gameManager{
    constructor(scene,game){
        this.scene = scene;
        this.game = game;
        this.player = new Player(1000000, 100, 100, 20, 80 , 'presidente' , 'presidente');
        this.day=new Day(0);
        this.missionManager = new MissionManager(scene,this.player);
        this.map = new Map('map',null,null);
    }
    getPlayer(){return this.player};
    getMap(){return this.map};
    getDay(){return this.day};
    getMission(){
        this.missionL = this.missionManager.getMission();
        if(this.missionL.getDistrict() != "NULL"){
            this.icon = this.missionL.itIsCorrupt() ? 'missionCorruptIcon' : 'missionIcon';
            this.missionButton = this.scene.add.image(this.missionL.getPos()[0],this.missionL.getPos()[1],this.icon).setOrigin(0).setInteractive({ useHandCursor: true }); 
            this.missionButton.on('pointerover', () => {this.missionButton.setScale(1.1);});
            this.missionButton.on('pointerout', () => {this.missionButton.setScale(1);});
            this.missionButton.on('pointerup', () => {
                this.scene.scene.pause('gameScene');
                this.scene.scene.launch('missionScene', { mission: this.missionL});
            });
            this.missionL.setMissionButton(this.missionButton);
        }
    }
    removeMission(mission, option, district){
            district.increasePopulation(option.popularity);
            this.player.updateEnergy(option.energy);
            this.player.updateCorruption(option.corruption);
            this.player.updateMoney(-option.money);
            let MissionButton = mission.getMisionButton();
            MissionButton.destroy();
            this.day.addDecision(mission.getName() + ": " + option.description);
            this.day.updateResources(-option.money, option.energy, option.corruption, option.popularity);
            this.missionManager.rmMission(mission);
    }
    deleteAllMissions(){
        this.missionManager.deleteAllMissions();
    }
    spawnAssets(scene){
        this.mapImg = this.map.spawnMap(scene);
        this.districtList = this.map.spawnDistricts(scene);
        this.presidente = this.player.spawnPresident(scene);
    }
    nextDay() {
        this.day = new Day(this.day);
        this.player.setEnergy(this.player.getMaxEnergy());
    }

}