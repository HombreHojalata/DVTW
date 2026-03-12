import Phaser from 'phaser';
import Player from './player.js';
import Story from './story.js';
import Mission from './mission.js';
import Day from './day.js';


export default class missionManager{
    constructor(){
        this.player = new Player();
        this.regularMissions = [];
        this.upMoneyMissions = [];
        this.upPopularityMissions = [];
        this.downPopularityMissions = [];
        this.downMoneyMissions = [];
        this.downCorruptionMissions = [];
        this.story = new Story();//Aqui se asigna una de las historias de forma aleatoria.
        this.day=new Day();
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

        if(moneyDiff > popularityDiff && moneyDiff > corruptionDiff && this.espectedResources.money/moneyDiff > 2){
            if(playerMoney > this.espectedResources.money){
                return this.downMoneyMissions[Math.floor(Math.random() * this.downMoneyMissions.length)];
            }else{
                return this.upMoneyMissions[Math.floor(Math.random() * this.upMoneyMissions.length)];
            }
        }else if(popularityDiff > corruptionDiff && this.espectedResources.popularity/popularityDiff > 2){
            if(playerPopularity > this.espectedResources.popularity){
                return this.downPopularityMissions[Math.floor(Math.random() * this.downPopularityMissions.length)];
            }else{
                return this.upPopularityMissions[Math.floor(Math.random() * this.upPopularityMissions.length)];
            }
        }else if(playerCorruption > this.espectedResources.corruption && this.espectedResources.corruption/corruptionDiff > 2){
            return this.downCorruptionMissions[Math.floor(Math.random() * this.downCorruptionMissions.length)];
        }
        else{
            return this.regularMissions[Math.floor(Math.random() * this.regularMissions.length)];
        }
    }

    finishDay(){
        dayFisished = this.day;
        this.day = new day(this.day);
        return dayFisished.getDaySummary();    
    }


    async loadMissions(){


        const response = await fetch("DVTW/files/regularMissions.json");
        const missionsData = await response.json();
        missionsData.forEach(m => {
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

        const responseUM = await fetch("DVTW/files/upMoney.json");
        const missionsDataUM = await responseUM.json();
        missionsDataUM.forEach(m => {
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

        const responseUP = await fetch("DVTW/files/upPopularity.json");
        const missionsDataUP = await responseUP.json();
        missionsDataUP.forEach(m => {
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

        const responseDP = await fetch("DVTW/files/downPopularity.json");
        const missionsDataDP = await responseDP.json();
        missionsDataDP.forEach(m => {
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

        const responseDM = await fetch("DVTW/files/downMoney.json");
        const missionsDataDM = await responseDM.json();
        missionsDataDM.forEach(m => {
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

        const responseDC = await fetch("DVTW/files/downCorruption.json");
        const missionsDataDC = await responseDC.json();
        missionsDataDC.forEach(m => {
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
    }
}