import MissionManager from './manager/missionManager.js'
import Player from './manager/player.js';
import Day from './manager/day.js';
import Map from './map/map.js'


export default class gameManager{
    constructor(scene){
        this.scene = scene;
        this.player = new Player(700000, 100, 100, 0, 0 , 'presidente' , 'presidente');
        this.day=new Day(0);
        this.missionManager = new MissionManager(scene,this.player);
        this.map = new Map('map',null,null);
        this.player.updatePopularity(this.map.getPopularity());
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
    removeMission(scene,mission, option, district){
        district.updateSatisfaction(option.popularity);
        this.player.updateEnergy(option.energy);
        this.player.updateCorruption(option.corruption);
        this.player.updateMoney(-option.money);
        this.removeMissionFromId(scene,mission.getName());
        this.day.addDecision(mission.getName() + ": " + option.description);
        this.day.updateResources(-option.money, option.energy, option.corruption, 0);
        this.missionManager.rmMission(mission);
        // UPDATE POPULARITY
        let newPopularity = this.map.getPopularity();
        let oldPopularity = this.player.getPopularity();
        this.player.updatePopularity(newPopularity);
        this.day.updateResources(0, 0, 0, newPopularity - oldPopularity);
        //Refresh UI
        this.scene.refreshHUD();
    }
    deleteAllMissions(scene){
        this.missionManager.deleteAllMissions();
        scene.registry.set('missionList', []);
    }
    removeMissionFromId(scene,name){
        let missions = scene.registry.get('missionList');
        missions = missions.filter(m => m.getName() !== name);
        scene.registry.set('missionList', missions);
    }
    // ASSETS - BUTTONS
    spawnAssets(scene,tutorial){
        this.mapImg = this.map.spawnMap(scene);
        this.districtList = this.map.spawnDistricts(scene,tutorial);
        this.presidente = this.player.spawnPresident(scene);
    }
    spawnConfigurationButton(scene){
        this.configButton = scene.add.image(1450,20,'configurationIcon').setOrigin(1, 0).setInteractive({ useHandCursor: true }); 
        this.configButton.on('pointerover', () => {this.configButton.setScale(1.2);});
        this.configButton.on('pointerout', () => {this.configButton.setScale(1);});
        this.configButton.on('pointerup', () => {
            scene.scene.stop();
            scene.scene.start('configurationScene', { returnScene: 'gameScene'});
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
        this.player.updateMoney(this.map.getMoneyGenerated());
    }
}