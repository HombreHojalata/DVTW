import MissionManager from './manager/missionManager.js'
import Player from './manager/player.js';
import Day from './manager/day.js';
import Map from './map/map.js'


export default class gameManager{
    constructor(scene){
        this.scene = scene;
        this.player = new Player(700000, 100, 100, 0, 0, 'photoNormal');
        this.day = new Day(0);
        this.missionManager = new MissionManager(this.scene,this.player);
        this.map = new Map('map',null,null);
        this.player.updatePopularity(this.map.getPopularity());
    }
    // GETTERS
    getPlayer(){return this.player};
    getMap(){return this.map};
    getDay(){return this.day};
    // MISSIONS
    getMission(scene){
        this.missionL = this.missionManager.getMission(this.map, this.day);
        if(this.missionL.getDistrict() != "NULL") {
            if(this.missionL.itIsEvent() && this.day.getNumberOfEvents() < 2) {
                if(this.missionL.isMinigame() && this.day.getNumberOfMinigames() < 2){
                    this.missionL.createMissionButton(scene);
                    this.day.incrementNumberOfMinigames();
                    this.missionL.createMissionButton(scene);
                }
                else if(this.missionL.isMinigame() && this.day.getNumberOfMinigames() >= 2){
                    return this.getMission(scene);
                }
                else if(!this.missionL.isMinigame()){
                    this.missionL.createMissionButton(scene);
                    this.day.incrementNumberOfEvents();
                }               
            }
            else if(!this.missionL.itIsEvent()) {
                this.missionL.createMissionButton(scene);
            }
            else{
                return this.getMission(scene);
            }
        }
        return this.missionL;
    }
    removeMission(scene,mission, option, district){
        district.updateSatisfaction(option.popularity);
        this.player.updateEnergy(option.energy);
        this.player.updateCorruption(option.corruption);
        this.player.updateMoney(option.money);
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
        //this.scene.refreshHUD();
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
    spawnAssets(tutorial){ 
        this.mapImg = this.map.spawnMap(this.scene);
        this.districtList = this.map.spawnDistricts(this.scene,tutorial);
        this.presidente = this.player.spawnPresident(this.scene);
    }
    spawnConfigurationButton(){
        this.configButton = this.scene.add.image(1370, 60,'configurationIcon').setOrigin(0.5).setInteractive({ useHandCursor: true }).setScale(1.3).setDepth(20); 
        this.configButton.on('pointerover', () => {
            this.scene.tweens.add({
                targets: this.configButton,
                scale: 1.5,
                duration: 80,
                ease: 'Power2'
            });
        });
        this.configButton.on('pointerout', () => {
            this.scene.tweens.add({
                targets: this.configButton,
                scale: 1.3,
                duration: 80,
                ease: 'Power2'
            });
        });
        this.configButton.on('pointerup', () => {
            this.scene.scene.stop();
            this.scene.scene.start('configurationScene', { returnScene: 'gameScene'});
        });
        return this.configButton;
    }
    spawnMissionButton(){
        if(this.scene.registry.has('missionList')){
            let list = this.scene.registry.get('missionList');
            list.forEach(mission => {mission.createMissionButton(this.scene)});
        }
    }
    // UPDATES 
    nextDay() {
        this.day = new Day(this.day.dayNumber);
        this.player.setEnergy(this.player.getMaxEnergy());
        this.player.updateMoney(this.map.getMoneyGenerated());
    }
}