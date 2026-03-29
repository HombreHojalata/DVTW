import MissionManager from './manager/missionManager.js'
import Player from './manager/player.js';
import Day from './manager/day.js';
import Map from './map/map.js'


export default class gameManager{
    constructor(scene,game){
        this.player = new Player(1000000, 100, 100, 20, 80 , 'presidente' , 'presidente');
        this.day=new Day(0);
        this.missionManager = new MissionManager(scene,this.player);
        this.map = new Map('map',null,null);
    }
    // GETTERS
    getPlayer(){return this.player};
    getMap(){return this.map};
    getDay(){return this.day};
    // MISSIONS
    getMission(scene){
        this.missionL = this.missionManager.getMission();
        if(this.missionL.getDistrict() != "NULL") this.missionL.createMissionButton(scene);
        return this.missionL;
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
    // ASSETS - BUTTONS
    spawnAssets(scene){
        this.mapImg = this.map.spawnMap(scene);
        this.districtList = this.map.spawnDistricts(scene);
        this.presidente = this.player.spawnPresident(scene);
    }
    spawnConfigurationButton(scene){
        this.configButton = scene.add.image(1450,20,'configurationIcon').setOrigin(1, 0).setInteractive({ useHandCursor: true }); 
        this.configButton.on('pointerover', () => {this.configButton.setScale(1.2);});
        this.configButton.on('pointerout', () => {this.configButton.setScale(1);});
        this.configButton.on('pointerup', () => {
            scene.scene.stop();
            scene.scene.start('configurationScene', { scene: 'game'});
        });
        return this.configButton;
    }
    spawnMissionButton(scene){
        if(scene.registry.has('missionList')){
            let list = scene.registry.get('missionList');
            list.forEach(mission => {mission.createMissionButton(scene)});
        }
    }
    // UPDATES 
    nextDay() {
        this.day = new Day(this.day);
        this.player.setEnergy(this.player.getMaxEnergy());
    }
}