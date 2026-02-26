import Phaser from 'phaser';


class EventManager{
    constructor(){
        this.player = new Player();
        this.events = this.loadEvents();
        this.missions = this.loadMissions();
        this.story = new Story();//Aqui se asigna una de las historias de forma aleatoria.
        this.day=new day();
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


    loadEvents(){
        //Aqui se cargan los eventos.
    }
    loadMissions(){
        //Aqui se cargan las misiones.
    }

}