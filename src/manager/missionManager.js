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
        if(moneyDiff > popularityDiff && moneyDiff > corruptionDiff && this.espectedResources.money/moneyDiff > 2){
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
                this.districtsWithMissions[districtIndex] = true;
            }
            else {
                districtIndex=-1;
            }
        }
        if(districtIndex == -1){
            missionSelected.district = "null";
        }
        else if(districtIndex == 0){
            missionSelected.district = "Borrascal";
        }
        else if(districtIndex == 1){
            missionSelected.district = "El Nido";
        }
        else if(districtIndex == 2){
            missionSelected.district = "Guinea";
        }
        else if(districtIndex == 3){
            missionSelected.district = "Nueva Pradera";
        }
        else if(districtIndex == 4){
            missionSelected.district = "Sahar";
        }
        else{//districtIndex == 5
            missionSelected.district = "Somosagua";
        }
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

        
    }
}