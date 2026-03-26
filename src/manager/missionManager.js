import Story from './story.js';
import Mission from './mission.js';



export default class missionManager{
    constructor(scene,player){
        this.scene = scene;
        this.player = player;
        this.regularMissions = [];
        this.upMoneyMissions = [];
        this.upPopularityMissions = [];
        this.downPopularityMissions = [];
        this.downMoneyMissions = [];
        this.downCorruptionMissions = [];
        this.activeMissions = [];
        this.minigameMissions=[];
        this.story = new Story();//Aqui se asigna una de las historias de forma aleatoria.
        this.districtsWithMissions=[false,false,false,false,false,false];

        this.espectedResources = {
            money: 400,
            corruption: 30,
            popularity: 51
        }
        this.loadMissions();
    }

    


    getMission(){
        const playerMoney = this.player.getMoney();
        const playerPopularity = this.player.getPopularity();
        const playerCorruption = this.player.getCorruption();

        const moneyDiff = Math.abs(playerMoney - this.espectedResources.money)/15;
        const popularityDiff = Math.abs(playerPopularity - this.espectedResources.popularity)/7;
        const corruptionDiff = playerCorruption - this.espectedResources.corruption;
        let missionSelected = null;
        if(this.minigameMissions.length > 0 ){
            missionSelected = this.minigameMissions[Math.floor(Math.random() * this.minigameMissions.length)];
            this.minigameMissions = this.minigameMissions.filter(m => m !== missionSelected);
        }
        else if(moneyDiff > popularityDiff && moneyDiff > corruptionDiff && this.espectedResources.money/moneyDiff > 2){
            if(playerMoney > this.espectedResources.money){
                missionSelected = this.downMoneyMissions[Math.floor(Math.random() * this.downMoneyMissions.length)];
            }else{
                missionSelected = this.upMoneyMissions[Math.floor(Math.random() * this.upMoneyMissions.length)];
            }
        }else if(popularityDiff > corruptionDiff && this.espectedResources.popularity/popularityDiff > 2){
            if(playerPopularity > this.espectedResources.popularity){
                missionSelected = this.downPopularityMissions[Math.floor(Math.random() * this.downPopularityMissions.length)];
            }else{
                missionSelected = this.upPopularityMissions[Math.floor(Math.random() * this.upPopularityMissions.length)];
            }
        }else if(playerCorruption > this.espectedResources.corruption && this.espectedResources.corruption/corruptionDiff > 2){
            missionSelected = this.downCorruptionMissions[Math.floor(Math.random() * this.downCorruptionMissions.length)];
        }
        else{
            missionSelected = this.regularMissions[Math.floor(Math.random() * this.regularMissions.length)];
        }
        let districtIndex = Math.floor(Math.random() * 6);
        if(this.districtsWithMissions[districtIndex]){
            if(!this.districtsWithMissions[0] || !this.districtsWithMissions[1] || !this.districtsWithMissions[2] || !this.districtsWithMissions[3] || !this.districtsWithMissions[4] || !this.districtsWithMissions[5]){
                while(this.districtsWithMissions[districtIndex]){
                    districtIndex = Math.floor(Math.random() * 6);
                }
                
            }
            else {
                districtIndex=-1;
            }
        }
        this.districtsWithMissions[districtIndex] = true;
        if(districtIndex == -1){
            missionSelected.setDistrict("NULL");
            missionSelected.setPos(0, 0);
        }
        else if(districtIndex == 0){
            missionSelected.setDistrict("BORRASCAL");
            missionSelected.setPos(1160, 150);
        }
        else if(districtIndex == 1){
            missionSelected.setDistrict("EL_NIDO");
            missionSelected.setPos(680, 390);
        }
        else if(districtIndex == 2){
            missionSelected.setDistrict("GUINEA");
            missionSelected.setPos(250, 200);
        }
        else if(districtIndex == 3){
            missionSelected.setDistrict("NUEVA_PRADERA");
            missionSelected.setPos(1020, 540);
        }
        else if(districtIndex == 4){
            missionSelected.setDistrict("SAHAR");
            missionSelected.setPos(350, 450);
        }
        else{//districtIndex == 5
            missionSelected.setDistrict("SOMOSAGUA");
            missionSelected.setPos(800, 160);
        }
        this.activeMissions.push(missionSelected);
        return missionSelected;
    }

    finishDay(){
        dayFisished = this.day;
        this.day = new day(this.day);
        return dayFisished.getDaySummary();    
    }


    async loadMissions(){


        const regularMissionData = this.scene.cache.json.get('regularMissions');

        regularMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.regularMissions.push(mission);
    });

    const upMoneyMissionData = this.scene.cache.json.get('upMoney');

        upMoneyMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.upMoneyMissions.push(mission);
    });

    const upPopularityMissionData = this.scene.cache.json.get('upPopularity');

        upPopularityMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.upPopularityMissions.push(mission);
    });

    const downCorruptionMissionData = this.scene.cache.json.get('downCorruption');

        downCorruptionMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.downCorruptionMissions.push(mission);
    });

    const downPopularityMissionData = this.scene.cache.json.get('downPopularity');

        downPopularityMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.downPopularityMissions.push(mission);
    });
    const downMoneyMissionData = this.scene.cache.json.get('downMoney');

        downMoneyMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.downMoneyMissions.push(mission);
    });
    const minigameMissionData = this.scene.cache.json.get('minigameMoney');

        minigameMissionData.forEach(m => {
        const mission = new Mission(
            m.name,
            m.description,
            m.event,
            m.corrupt,
            m.minigame
        );

        m.options.forEach(o => {
            mission.addOption(
                o.probability,
                o.description,
                o.energy,
                o.money,
                o.corruption,
                o.popularity
            );
        });

        this.minigameMissions.push(mission);
    });
        
    }
    rmMission(mission){
        const districtName = mission.getDistrict(); 
        if(districtName == "BORRASCAL"){
            this.districtsWithMissions[0] = false;
        }
        else if(districtName == "EL_NIDO"){
            this.districtsWithMissions[1] = false;
        }
        else if(districtName == "GUINEA"){
            this.districtsWithMissions[2] = false;
        }
        else if(districtName == "NUEVA_PRADERA"){
            this.districtsWithMissions[3] = false;
        }
        else if(districtName == "SAHAR"){
            this.districtsWithMissions[4] = false;
        }
        else{//districtName == "SOMOSAGUA"
            this.districtsWithMissions[5] = false;
        }
        if(mission.isMinigame()){
            this.minigameMissions = this.minigameMissions.filter(m => m !== mission);
        }
        this.activeMissions = this.activeMissions.filter(m => m !== mission);
    }
    deleteAllMissions(){
        this.activeMissions = [];
        this.districtsWithMissions=[false,false,false,false,false,false];
    }
}