import Phaser from 'phaser';
import Player from './player.js';
import Story from './story.js';
import Mission from './mission.js';
import Day from './day.js';


export default class missionManager{
    constructor(){
        this.player = new Player();
        this.regularMissions = [];
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

        /*console.log("Number of missions:", this.missions.length);

        this.missions.forEach(m => {
            console.log("----");
            console.log("Mission:", m.name);
            console.log("Description:", m.description);

            m.options.forEach(o => {
                console.log("Option:", o.description, "Probability:", o.probability);
            });
        });*/
    }
}