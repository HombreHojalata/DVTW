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

        this.loadMissions();
    }

    


    getEvent(){
        //Aqui se devuelve un evento de forma aleatoria, dependiendo de la historia que se haya cargado.
        return this.events[0];//Devolver el evento propicio para los recursos del jugador.
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